import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { MOCK_HABITATIONS, MOCK_RELOCATION_SITES, MOCK_DATA_SOURCES, SYSTEM_METRICS } from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'DisasterGuard Node Backend' });
});

app.get('/api/metrics', (req, res) => {
  res.json(SYSTEM_METRICS);
});

app.get('/api/villages', (req, res) => {
  const { district, hazard, priority } = req.query;
  let results = [...MOCK_HABITATIONS];

  if (district && district !== 'All Districts') {
    results = results.filter(v => v.district.toLowerCase() === String(district).toLowerCase());
  }
  if (hazard && hazard !== 'All') {
    results = results.filter(v => v.primaryHazard.toLowerCase() === String(hazard).toLowerCase());
  }
  if (priority && priority !== 'All') {
    results = results.filter(v => v.relocationPriority === priority);
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
  try {
    const { prompt, context } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        response: `[Simulated AI Response - GEMINI_API_KEY not configured]: Based on DisasterGuard model analysis for Maharashtra, habitations in Raigad and Ratnagiri districts with steep slope gradients (>30°) and recurring cloudburst histories (such as Talien Wadi / Village A) require IMMEDIATE relocation priority (Score 87/100). Please configure your Gemini API key in settings for live generative reasoning.`
      });
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are DisasterGuard AI, an expert GIS decision-support assistant for State Disaster Management Authorities in India (specifically Maharashtra). 
    You analyze multi-hazard risks (landslides, floods, coastal erosion, seismic hazards), calculate relocation priorities, evaluate candidate safe sites, and assess carrying capacities.
    Always ground your answers in professional disaster management terminology, maintain a serious government enterprise tone, and never invent official government statistics (always label model estimates clearly as prototype/simulated data).
    
    Context data available: ${JSON.stringify(context || { metrics: SYSTEM_METRICS, sampleHabitations: MOCK_HABITATIONS.slice(0, 3) })}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nUser Question: ' + prompt }] }
      ]
    });

    res.json({ response: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('AI Query Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process AI query' });
  }
});

app.post('/api/ai/report', async (req, res) => {
  try {
    const { villageId } = req.body;
    const village = MOCK_HABITATIONS.find(v => v.id === villageId) || MOCK_HABITATIONS[0];
    const sites = MOCK_RELOCATION_SITES;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        rawReport: `OFFICIAL RELOCATION & RESILIENCE ASSESSMENT REPORT: ${village.name}\nGenerated Date: ${new Date().toISOString().split('T')[0]}\n\n1. HABITATION PROFILE:\n- Habitation: ${village.name}, Taluka: ${village.taluka}, District: ${village.district}.\n- Population: ${village.population} (${village.households} households).\n- Coordinates: ${village.lat}, ${village.lng}.\n\n2. HAZARD ASSESSMENT:\n- Primary Hazard: ${village.primaryHazard}.\n- Terrain Slope: ${village.terrainSlope}.\n- Soil: ${village.soilType}.\n\n3. RED ZONE CONDITIONS:\n- ${village.redZoneConditions.join('\n- ')}\n\n4. AI RELOCATION REASONING:\n${village.aiReasoning}\n\n5. RECOMMENDED RELOCATION SITE:\n- Primary Candidate Site: ${sites[0].name} located ${sites[0].distanceFromSourceKm} km away. Estimated capacity: ${sites[0].estimatedCapacity} persons.`
      });
    }

    const ai = getGeminiClient();
    const prompt = `Generate a comprehensive State Disaster Management Authority relocation assessment report for habitation: ${JSON.stringify(village)}, with candidate sites: ${JSON.stringify(sites)}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    res.json({ rawReport: response.text });
  } catch (error: any) {
    console.error('Report Generation Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate report' });
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
    console.log(`DisasterGuard server running on http://localhost:${PORT}`);
  });
}

startServer();
