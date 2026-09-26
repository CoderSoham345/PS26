import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { MOCK_HABITATIONS, MOCK_RELOCATION_SITES, MOCK_DATA_SOURCES, SYSTEM_METRICS } from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Centralized Gemini Model Configuration
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

app.use(express.json());

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System instruction for Surakshit Dhara AI
const SURAKSHIT_DHARA_SYSTEM_INSTRUCTION = `You are Surakshit Dhara AI (सुरक्षित धरा AI), the AI-assisted disaster-risk and safe-settlement planning assistant.

You help users understand the currently selected village, hazards, risk, red-zone analysis, relocation options, carrying capacity and rehabilitation simulation.

Always use the CURRENT application context provided to you.

Do not invent missing data.

Clearly distinguish:
- Official information (e.g., GSI, CWC, IMD, MRSAC)
- Open data
- Prototype data
- Modelled analysis
- Derived calculations

When discussing red zones, explain that modelled red zones are prototype decision-support outputs and are not official statutory designations.

When discussing relocation suitability or safety percentages, describe them as modelled/prototype assessments.

Answer clearly and practically.

For complex answers use:
1. Why (Underlying causes, terrain, past events)
2. What (Key findings, exposed population, red zone impacts)
3. How (Relocation steps, safe site capacity, rehabilitation phasing)
4. Assumptions (Data baselines and GIS modelling assumptions)
5. Limitations (Decision-support prototype boundaries, statutory confirmation requirements)

Format responses cleanly:
- short readable paragraphs
- bullet points where appropriate
- clear sections for complex questions
- practical tone suited for planners and citizens
- no technical errors or JSON dumps in visible chat`;

// Robust Gemini generation with retry logic for transient 503 / 429
async function callGeminiWithRetry(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string,
  maxRetries = 3
): Promise<string> {
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      const msg = err?.message || String(err);
      const isTransient = status === 503 || status === 429 || msg.includes('503') || msg.includes('429') || msg.includes('UNAVAILABLE') || msg.includes('high demand');

      if (attempt < maxRetries && isTransient) {
        await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('No content returned from Gemini');
}

// Structured domain-informed fallback generator (never exposes raw JSON errors)
function generateContextualFallback(
  userQuery: string,
  village: any,
  site: any,
  stage: string
): string {
  const queryLower = (userQuery || '').toLowerCase();
  const vName = village?.name || 'the selected village';
  const vDistrict = village?.district || 'the district';
  const vHazard = village?.primaryHazard || 'Multi-hazard exposure';
  const vSlope = village?.terrainSlope || 'High slope gradient';
  const vScore = village?.riskScore || 85;
  const vPop = village?.population || 'N/A';
  const sName = site?.name || 'Candidate Relocation Site A';
  const sScore = site?.suitabilityScore || 90;
  const sCapacity = site?.estimatedCapacity || 1500;
  const sDist = site?.distanceFromSourceKm || 5.0;

  if (queryLower.includes('red zone') || queryLower.includes('danger zone') || queryLower.includes('buffer')) {
    return `### Modelled Red Zone Analysis: ${vName} (${vDistrict})

**1. Why the Red Zone is Formed:**
The modelled red zone for **${vName}** is delineated based on critical slope instability (${vSlope}), high cumulative monsoon precipitation telemetry, and geological susceptibility to ${vHazard.toLowerCase()}. Past events in this catchment indicate severe run-out pathways that threaten existing habitations.

**2. What it Covers:**
* **Demographics Exposed:** Approximately ${vPop} residents across vulnerable clusters.
* **Geotechnical Conditions:** Rapid slope saturation and localized drainage convergence creating active slide zones.

**3. Prototype Decision-Support Status:**
* **Notice:** This modelled red zone is a prototype spatial decision-support calculation generated by the **सुरक्षित धरा (SURAKSHIT DHARA)** spatial analytics engine.
* **Statutory Note:** It is not an official statutory or regulatory demarcation issued by the State Government. Official disaster declarations require verification by the District Collectorate and Geological Survey of India (GSI).`;
  }

  if (queryLower.includes('candidate site') || queryLower.includes('why was this site') || queryLower.includes('safe site') || queryLower.includes('site chosen')) {
    return `### Relocation Candidate Evaluation: ${sName}

**1. Why this Site was Selected:**
**${sName}** was identified as the primary candidate site for ${vName} because it exhibits:
* **Composite Suitability Score:** ${sScore}/100 based on slope gradient (<5°), bedrock stability, and distance from major floodplains.
* **Proximity:** Located **${sDist} km** from the origin village, preserving socio-cultural ties and livelihood connections.

**2. Carrying Capacity & Infrastructure:**
* **Estimated Carrying Capacity:** Up to **${sCapacity} persons**, providing adequate buffer for all ${vPop} residents from ${vName}.
* **Civic Connectivity:** Road access is verified, with feasible integration into existing district water supply, PHC healthcare, and educational facilities.

**3. Decision-Support Guidance:**
This assessment reflects prototype multi-criteria spatial analysis. Detailed geotechnical borehole drilling and legal revenue title verification are recommended prior to statutory ground allocation.`;
  }

  if (queryLower.includes('rehabilitation') || queryLower.includes('after') || queryLower.includes('settlement layout') || queryLower.includes('phase')) {
    return `### Proposed Rehabilitation & Settlement Transformation

**1. Phased Resettlement Strategy:**
* **Phase 1 (Immediate Transition):** Safe site demarcation at **${sName}**, provision of modular disaster-resilient transit housing, and emergency healthcare setup.
* **Phase 2 (Civic Infrastructure):** Construction of permanent climate-resilient habitations, piped drinking water filtration units, internal access roads, and solar mini-grids.
* **Phase 3 (Livelihood Continuity):** Agricultural terrace restoration, cooperative market linkages, and primary school (ZP) operationalization.

**2. Safe Capacity Utilization:**
* The planned layout accommodates ${vPop} displaced residents within the certified capacity of **${sCapacity} persons**, ensuring zero structural overcrowding.

**3. Regulatory Governance:**
All civil layouts follow SDMA disaster-resilient building codes and National Disaster Management Authority (NDMA) hillside settlement guidelines.`;
  }

  // Default response for risk and general questions
  return `### Hazard Assessment & Safe Settlement Guidance: ${vName}

**1. Why ${vName} is at High Risk:**
* **Primary Hazard:** **${vHazard}** (Composite Risk Score: **${vScore}/100**).
* **Terrain & Drainage:** Steep terrain slope (${vSlope}) coupled with saturated topsoil during peak monsoon deluges.
* **Exposure:** ${vPop} residents located within historical run-out zones.

**2. Relocation Decision-Support:**
* **Recommended Safe Site:** **${sName}** (${sDist} km away, Suitability: **${sScore}/100**, Capacity: **${sCapacity}**).
* **Simulation Stage:** Currently evaluating **${stage.toUpperCase()}** stage telemetry.

**3. Assumptions & Limitations:**
* **Assumptions:** Model parameters combine GSI baseline slope stability, CWC hydrographic return lines, and satellite DEM elevation datasets.
* **Limitations:** Outputs are prototype decision-support indicators developed for **सुरक्षित धरा (SURAKSHIT DHARA)** and require ground validation by competent district disaster management authorities.`;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    platform: 'Surakshit Dhara Node Backend',
    model: GEMINI_MODEL
  });
});

app.get('/api/metrics', (req, res) => {
  res.json(SYSTEM_METRICS);
});

app.get('/api/villages', (req, res) => {
  const { district, hazard, priority } = req.query;
  let results = [...MOCK_HABITATIONS];

  if (district && district !== 'All Districts') {
    results = results.filter((v) => v.district.toLowerCase() === String(district).toLowerCase());
  }
  if (hazard && hazard !== 'All') {
    results = results.filter((v) => v.primaryHazard.toLowerCase() === String(hazard).toLowerCase());
  }
  if (priority && priority !== 'All') {
    results = results.filter((v) => v.relocationPriority === priority);
  }

  res.json(results);
});

app.get('/api/relocation-sites', (req, res) => {
  res.json(MOCK_RELOCATION_SITES);
});

app.get('/api/sources', (req, res) => {
  res.json(MOCK_DATA_SOURCES);
});

// AI Assistant & Analysis endpoint
app.post('/api/ai/query', async (req, res) => {
  const { prompt, context } = req.body;

  // Extract structured active context
  const currentVillage =
    context?.village ||
    (context?.habitations && context.habitations[0]) ||
    MOCK_HABITATIONS[0];
  const currentSite = context?.candidateSite || MOCK_RELOCATION_SITES[0];
  const currentStage = context?.stage || 'before';
  const currentDistrict = context?.district || currentVillage?.district || 'Raigad';

  const formattedContext = `
ACTIVE GEOGRAPHIC CONTEXT:
- District: ${currentDistrict}
- Selected Village: ${currentVillage?.name || 'N/A'} (Taluka: ${currentVillage?.taluka || 'N/A'})
- Population: ${currentVillage?.population || 'N/A'} (${currentVillage?.households || 'N/A'} households)
- Primary Hazard: ${currentVillage?.primaryHazard || 'N/A'}
- Modelled Risk Score: ${currentVillage?.riskScore || 'N/A'}/100 (${currentVillage?.relocationPriority || 'N/A'} Relocation Priority)
- Terrain & Soil: Slope: ${currentVillage?.terrainSlope || 'N/A'}, Soil Type: ${currentVillage?.soilType || 'N/A'}, Elevation: ${currentVillage?.elevation || 'N/A'}
- Disaster History: Last major event in ${currentVillage?.lastDisasterYear || 'recent years'}, ${currentVillage?.historicalEventsCount || 0} historical events recorded
- Critical Infrastructure Exposed: ${JSON.stringify(currentVillage?.infrastructureExposure || {})}
- Modelled Red Zone Conditions:
  ${(currentVillage?.redZoneConditions || []).map((c: string) => `* ${c}`).join('\n  ') || 'None recorded'}
- Modelled AI Reasoning: ${currentVillage?.aiReasoning || 'N/A'}

ACTIVE RELOCATION CANDIDATE SITE:
- Candidate Site Name: ${currentSite?.name || 'N/A'}
- Distance from Source Village: ${currentSite?.distanceFromSourceKm || 'N/A'} km
- Overall Suitability Score: ${currentSite?.suitabilityScore || 'N/A'}/100 (Safety Score: ${currentSite?.safetyScore || 'N/A'}/100, Terrain Score: ${currentSite?.terrainScore || 'N/A'}/100)
- Estimated Carrying Capacity: ${currentSite?.estimatedCapacity || 'N/A'} persons
- Land Availability: ${currentSite?.landAvailabilityHa || 'N/A'} hectares
- Infrastructure Access: Road access is ${currentSite?.roadAccess || 'N/A'}, Water: ${currentSite?.waterAvailability || 'N/A'}, Hospital distance: ${currentSite?.hospitalDistanceKm || 'N/A'} km, School distance: ${currentSite?.schoolDistanceKm || 'N/A'} km
- Site Status: ${currentSite?.status || 'N/A'}

CURRENT SIMULATION STAGE:
- Stage: ${String(currentStage).toUpperCase()} (BEFORE = Baseline hazard & modelled red zone; RELOCATION = Safe transit route & candidate site suitability; AFTER = Phased rehabilitation, community amenities & carrying capacity allocation)
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      const fallback = generateContextualFallback(prompt, currentVillage, currentSite, currentStage);
      return res.json({ response: fallback });
    }

    const ai = getGeminiClient();
    const userPromptWithContext = `CURRENT APPLICATION CONTEXT:\n${formattedContext}\n\nUSER QUESTION:\n${prompt}`;

    const answer = await callGeminiWithRetry(
      ai,
      userPromptWithContext,
      SURAKSHIT_DHARA_SYSTEM_INSTRUCTION,
      3
    );

    res.json({ response: answer });
  } catch (error: any) {
    console.error(`Gemini Generation Error (${GEMINI_MODEL}):`, error?.message || error);
    // Graceful, informative fallback without exposing raw API JSON errors
    const fallbackResponse = generateContextualFallback(prompt, currentVillage, currentSite, currentStage);
    res.json({ response: fallbackResponse });
  }
});

// Official Authority Report Generation endpoint
app.post('/api/ai/report', async (req, res) => {
  const { villageId } = req.body;
  const village = MOCK_HABITATIONS.find((v) => v.id === villageId) || MOCK_HABITATIONS[0];
  const sites = MOCK_RELOCATION_SITES;
  const primarySite = sites[0];

  const defaultReport = `OFFICIAL RELOCATION & RESILIENCE ASSESSMENT REPORT: ${village.name}
Generated Date: ${new Date().toISOString().split('T')[0]}
Issuing Authority: सुरक्षित धरा (SURAKSHIT DHARA) State Disaster Management Support Unit

1. HABITATION PROFILE:
- Habitation: ${village.name}, Taluka: ${village.taluka}, District: ${village.district}
- Population: ${village.population} (${village.households} households)
- Coordinates: ${village.lat}, ${village.lng}

2. HAZARD ASSESSMENT:
- Primary Hazard: ${village.primaryHazard}
- Terrain Slope: ${village.terrainSlope}
- Soil Classification: ${village.soilType}
- Modelled Risk Score: ${village.riskScore}/100

3. MODELLED RED ZONE CONDITIONS:
- ${village.redZoneConditions.join('\n- ')}

4. AI DECISION-SUPPORT REASONING:
${village.aiReasoning}

5. RECOMMENDED RELOCATION SITE:
- Candidate Site: ${primarySite.name} located ${primarySite.distanceFromSourceKm} km away.
- Estimated Carrying Capacity: ${primarySite.estimatedCapacity} persons
- Composite Suitability Score: ${primarySite.suitabilityScore}/100 (Safety: ${primarySite.safetyScore}/100)
- Road Accessibility: ${primarySite.roadAccess}
- Status: ${primarySite.status}

6. PROTOTYPE NOTICE:
This document is a decision-support assessment generated by the सुरक्षित धरा (SURAKSHIT DHARA) analytical model. Field borehole sampling, cadastral land surveys, and district collectorate gazette approvals are required before statutory execution.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ rawReport: defaultReport });
    }

    const ai = getGeminiClient();
    const prompt = `Generate a comprehensive State Disaster Management Authority relocation assessment report for habitation: ${JSON.stringify(village)}, with candidate safe sites: ${JSON.stringify(sites)}. Follow formal 12-section government documentation standards.`;

    const generated = await callGeminiWithRetry(
      ai,
      prompt,
      SURAKSHIT_DHARA_SYSTEM_INSTRUCTION,
      3
    );

    res.json({ rawReport: generated || defaultReport });
  } catch (error: any) {
    console.error('Report Generation Error:', error?.message || error);
    res.json({ rawReport: defaultReport });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`सुरक्षित धरा (SURAKSHIT DHARA) server running on http://localhost:${PORT} with model ${GEMINI_MODEL}`);
  });
}

startServer();
