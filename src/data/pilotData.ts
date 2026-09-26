import { Habitation, RelocationSite, DataSource, SystemMetrics } from '../types';

export interface DistrictPilotData {
  id: string;
  name: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  metrics: {
    vulnerableHabitations: number;
    populationExposed: number;
    highRiskHabitations: number;
    potentialRelocationSites: number;
    sitesWithSufficientCapacity: number;
  };
  targetVillages: Habitation[];
  relocationSites: RelocationSite[];
  hazardBreakdown: { name: string; count: number; percentage: string; color: string }[];
  recentChanges: { id: string; date: string; village: string; change: string; type: 'increase' | 'positive' | 'neutral' }[];
}

export const PILOT_DISTRICTS: Record<string, DistrictPilotData> = {
  raigad: {
    id: 'raigad',
    name: 'Raigad',
    center: [73.4146, 18.0905],
    zoom: 10,
    metrics: {
      vulnerableHabitations: 84,
      populationExposed: 32450,
      highRiskHabitations: 24,
      potentialRelocationSites: 38,
      sitesWithSufficientCapacity: 32
    },
    targetVillages: [
      {
        id: 'RG-01',
        name: 'Khalapur',
        district: 'Raigad',
        taluka: 'Khalapur',
        lat: 18.8288,
        lng: 73.2847,
        population: 890,
        households: 185,
        primaryHazard: 'Landslide',
        riskScore: 88,
        historicalEventsCount: 4,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '35° (Critical Escarpment)',
        soilType: 'Lateritic Weathered Regolith',
        elevation: '310m',
        lastDisasterYear: 2023,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 3.2, powerSubstations: 0 },
        redZoneConditions: [
          'High debris flow and landslide susceptibility (>0.85 index)',
          'Severe slope instability adjacent to steep Western Ghats scarp',
          'Historical slope failure during 2023 monsoon cloudburst',
          'Single evacuation road vulnerable to road cutting collapses'
        ],
        aiReasoning: 'Raigad / Khalapur has high modelled landslide exposure, significant population vulnerability, and limited emergency accessibility. Monsoon soil saturation severely elevates relocation urgency (88/100).'
      },
      {
        id: 'RG-02',
        name: 'Matheran',
        district: 'Raigad',
        taluka: 'Karjat',
        lat: 18.9866,
        lng: 73.2679,
        population: 740,
        households: 155,
        primaryHazard: 'Landslide',
        riskScore: 84,
        historicalEventsCount: 5,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Assessment Required',
        terrainSlope: '32° (Steep Plateau Rim)',
        soilType: 'Basaltic Colluvium',
        elevation: '800m',
        lastDisasterYear: 2022,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 2.4, powerSubstations: 0 },
        redZoneConditions: [
          'Critical cliff-edge rockfall hazard and escarpment slumping',
          'Toe-erosion during extreme episodic rainfall events'
        ],
        aiReasoning: 'Raigad / Matheran rim settlement exhibits acute rockfall risks and isolation during peak monsoon downpours.'
      },
      {
        id: 'RG-03',
        name: 'Karjat',
        district: 'Raigad',
        taluka: 'Karjat',
        lat: 18.9100,
        lng: 73.3283,
        population: 1120,
        households: 235,
        primaryHazard: 'Flood',
        riskScore: 78,
        historicalEventsCount: 4,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '6° (Riverbank Basin)',
        soilType: 'Alluvial Loam',
        elevation: '55m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 5.6, powerSubstations: 1 },
        redZoneConditions: [
          'Ulhas river floodplain backwater inundation exceeding 2.8m',
          'Flash flood convergence from Matheran ridge streams'
        ],
        aiReasoning: 'Raigad / Karjat riverside settlement experiences frequent seasonal flooding during intense catchment rainfall.'
      },
      {
        id: 'RG-04',
        name: 'Mahad',
        district: 'Raigad',
        taluka: 'Mahad',
        lat: 18.0827,
        lng: 73.4226,
        population: 950,
        households: 210,
        primaryHazard: 'Multi-Hazard',
        riskScore: 91,
        historicalEventsCount: 6,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '28° (Valley Scarp)',
        soilType: 'Saturated Basaltic Silt',
        elevation: '42m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 4.8, powerSubstations: 1 },
        redZoneConditions: [
          'Savitri river basin catastrophic inundation combined with hillside debris flow',
          'Historical 2021 deluge submergence level exceeded 4 meters',
          'Critical structural damage history across 70% of residential structures'
        ],
        aiReasoning: 'Raigad / Mahad exhibits concurrent extreme riverine flood exposure and perimeter hill slope instability, making comprehensive relocation to an elevated plateau vital.'
      }
    ],
    relocationSites: [
      {
        id: 'RG-SITE-A',
        name: 'Site A - Khopoli Foothills Plateau',
        district: 'Raigad',
        taluka: 'Khalapur',
        lat: 18.8120,
        lng: 73.3400,
        distanceFromSourceKm: 6.2,
        suitabilityScore: 92,
        estimatedCapacity: 1850,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 5.4,
        schoolDistanceKm: 2.2,
        safetyScore: 96,
        terrainScore: 92,
        landAvailabilityHa: 26.5,
        status: 'Development Ready'
      },
      {
        id: 'RG-SITE-B',
        name: 'Site B - Khalapur Ridge Safe Sector',
        district: 'Raigad',
        taluka: 'Khalapur',
        lat: 18.8550,
        lng: 73.3100,
        distanceFromSourceKm: 4.1,
        suitabilityScore: 88,
        estimatedCapacity: 1200,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Moderate',
        hospitalDistanceKm: 6.8,
        schoolDistanceKm: 2.9,
        safetyScore: 90,
        terrainScore: 86,
        landAvailabilityHa: 19.5,
        status: 'Geotechnically Approved'
      },
      {
        id: 'RG-SITE-C',
        name: 'Site C - Mahad Tableland Safe Zone',
        district: 'Raigad',
        taluka: 'Mahad',
        lat: 18.1150,
        lng: 73.4520,
        distanceFromSourceKm: 7.5,
        suitabilityScore: 90,
        estimatedCapacity: 1600,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 6.1,
        schoolDistanceKm: 2.8,
        safetyScore: 94,
        terrainScore: 90,
        landAvailabilityHa: 24.5,
        status: 'Development Ready'
      }
    ],
    hazardBreakdown: [
      { name: 'Landslide', count: 48, percentage: '57%', color: 'bg-emerald-600' },
      { name: 'Flood', count: 22, percentage: '26%', color: 'bg-teal-600' },
      { name: 'Extreme Rainfall', count: 14, percentage: '17%', color: 'bg-emerald-500' }
    ],
    recentChanges: [
      { id: 'RC-RG1', date: '2026-09-18', village: 'Mahad', change: 'Raigad risk score elevated to 91 after monsoon catchment saturation survey', type: 'increase' },
      { id: 'RC-RG2', date: '2026-09-10', village: 'Khalapur', change: 'Candidate Site A geotechnically cleared for 1,600 capacity resettlement', type: 'positive' }
    ]
  },

  ratnagiri: {
    id: 'ratnagiri',
    name: 'Ratnagiri',
    center: [73.5218, 17.5255],
    zoom: 10,
    metrics: {
      vulnerableHabitations: 76,
      populationExposed: 28900,
      highRiskHabitations: 21,
      potentialRelocationSites: 34,
      sitesWithSufficientCapacity: 29
    },
    targetVillages: [
      {
        id: 'RT-01',
        name: 'Chiplun',
        district: 'Ratnagiri',
        taluka: 'Chiplun',
        lat: 17.5323,
        lng: 73.5177,
        population: 2600,
        households: 540,
        primaryHazard: 'Flood',
        riskScore: 89,
        historicalEventsCount: 6,
        accessibility: 'Moderate',
        relocationPriority: 'IMMEDIATE',
        status: 'Relocation Planned',
        terrainSlope: '2° (Vashishti Basin Floor)',
        soilType: 'Alluvial Silt',
        elevation: '16m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 4, hospitals: 2, roadsKm: 9.2, powerSubstations: 1 },
        redZoneConditions: [
          'Vashishti river tidal bowl topography prone to sudden backwater inundation',
          'Submergence depths exceed 3.8m during peak high tide + cloudburst',
          'Catastrophic 2021 flood inundated 80% of town infrastructure'
        ],
        aiReasoning: 'Ratnagiri / Chiplun basin convergence and tidal locking during Vashishti river overflows create catastrophic submergence risks requiring systematic relocation to elevated terraces.'
      },
      {
        id: 'RT-02',
        name: 'Khed',
        district: 'Ratnagiri',
        taluka: 'Khed',
        lat: 17.7210,
        lng: 73.3850,
        population: 1350,
        households: 280,
        primaryHazard: 'Flood',
        riskScore: 82,
        historicalEventsCount: 4,
        accessibility: 'Moderate',
        relocationPriority: 'IMMEDIATE',
        status: 'Assessment Required',
        terrainSlope: '4° (Jagbudi Riverbank)',
        soilType: 'Alluvial Loam',
        elevation: '25m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 5.1, powerSubstations: 0 },
        redZoneConditions: [
          'Jagbudi river overflow with flash flood warnings',
          'Critical arterial highway blockage during high water crests'
        ],
        aiReasoning: 'Ratnagiri / Khed is severely impacted by Jagbudi river surges during torrential Konkan downpours.'
      },
      {
        id: 'RT-03',
        name: 'Dapoli',
        district: 'Ratnagiri',
        taluka: 'Dapoli',
        lat: 17.7600,
        lng: 73.1800,
        population: 820,
        households: 170,
        primaryHazard: 'Coastal Erosion',
        riskScore: 79,
        historicalEventsCount: 3,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '8° (Coastal Scarp)',
        soilType: 'Sandy Laterite',
        elevation: '85m',
        lastDisasterYear: 2023,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 4.0, powerSubstations: 0 },
        redZoneConditions: [
          'Active coastal wave cutting and bluff failure during Arabian Sea storm surges',
          'High monsoon windward exposure with localized slope slides'
        ],
        aiReasoning: 'Ratnagiri / Dapoli faces continuous coastal bluff erosion and cyclonic wind exposure.'
      },
      {
        id: 'RT-04',
        name: 'Rajapur',
        district: 'Ratnagiri',
        taluka: 'Rajapur',
        lat: 16.6500,
        lng: 73.5300,
        population: 710,
        households: 150,
        primaryHazard: 'Flood',
        riskScore: 76,
        historicalEventsCount: 4,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '5° (Kodal River Estuary)',
        soilType: 'Alluvial Sand',
        elevation: '18m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 3.5, powerSubstations: 0 },
        redZoneConditions: [
          'Estuarine tidal backwater surge during extreme monsoon downpours',
          'Market and riverside habitation inundation during spring tides'
        ],
        aiReasoning: 'Ratnagiri / Rajapur estuarine zone is susceptible to recurring flash floods and tidal backwaters.'
      }
    ],
    relocationSites: [
      {
        id: 'RT-SITE-A',
        name: 'Chiplun East Terrace (Site A)',
        district: 'Ratnagiri',
        taluka: 'Chiplun',
        lat: 17.5500,
        lng: 73.5600,
        distanceFromSourceKm: 5.1,
        suitabilityScore: 89,
        estimatedCapacity: 2200,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 4.5,
        schoolDistanceKm: 2.0,
        safetyScore: 92,
        terrainScore: 88,
        landAvailabilityHa: 28.0,
        status: 'Development Ready'
      },
      {
        id: 'RT-SITE-B',
        name: 'Khed Highland Sector (Site B)',
        district: 'Ratnagiri',
        taluka: 'Khed',
        lat: 17.7500,
        lng: 73.4100,
        distanceFromSourceKm: 3.8,
        suitabilityScore: 86,
        estimatedCapacity: 1200,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Moderate',
        hospitalDistanceKm: 5.2,
        schoolDistanceKm: 1.8,
        safetyScore: 90,
        terrainScore: 85,
        landAvailabilityHa: 19.5,
        status: 'Geotechnically Approved'
      }
    ],
    hazardBreakdown: [
      { name: 'Flood', count: 38, percentage: '50%', color: 'bg-emerald-600' },
      { name: 'Coastal Erosion', count: 24, percentage: '31%', color: 'bg-teal-600' },
      { name: 'Landslide', count: 14, percentage: '19%', color: 'bg-emerald-500' }
    ],
    recentChanges: [
      { id: 'RC-RT1', date: '2026-09-15', village: 'Chiplun', change: 'Ratnagiri flood hazard boundary updated based on tidal gauge calibrations', type: 'neutral' }
    ]
  },

  pune: {
    id: 'pune',
    name: 'Pune',
    center: [73.6892, 18.5204],
    zoom: 10,
    metrics: {
      vulnerableHabitations: 68,
      populationExposed: 24100,
      highRiskHabitations: 19,
      potentialRelocationSites: 30,
      sitesWithSufficientCapacity: 26
    },
    targetVillages: [
      {
        id: 'PN-01',
        name: 'Bhor',
        district: 'Pune',
        taluka: 'Bhor',
        lat: 18.1500,
        lng: 73.8500,
        population: 820,
        households: 175,
        primaryHazard: 'Landslide',
        riskScore: 86,
        historicalEventsCount: 4,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '31° (Western Ghats Valley)',
        soilType: 'Weathered Basaltic Colluvium',
        elevation: '610m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 3.2, powerSubstations: 0 },
        redZoneConditions: [
          'Steep valley wall saturation during cloudburst anomalies',
          'Debris flow track crossing primary access road'
        ],
        aiReasoning: 'Pune / Bhor valley slopes exhibit severe saturation risks during peak Sahyadri monsoon spells, necessitating planned plateau relocation.'
      },
      {
        id: 'PN-02',
        name: 'Mulshi',
        district: 'Pune',
        taluka: 'Mulshi',
        lat: 18.5000,
        lng: 73.5000,
        population: 940,
        households: 200,
        primaryHazard: 'Landslide',
        riskScore: 84,
        historicalEventsCount: 3,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Assessment Required',
        terrainSlope: '33° (Dam Catchment Escarpment)',
        soilType: 'Lateritic Basalt',
        elevation: '640m',
        lastDisasterYear: 2022,
        infrastructureExposure: { schools: 2, hospitals: 0, roadsKm: 4.0, powerSubstations: 0 },
        redZoneConditions: [
          'High rainfall catchment slope failure zone',
          'Dam backwater reservoir isolation during spillway operation'
        ],
        aiReasoning: 'Pune / Mulshi steep catchment slopes face rockfall and debris slides coupled with reservoir backwater access cutoffs.'
      },
      {
        id: 'PN-03',
        name: 'Maval',
        district: 'Pune',
        taluka: 'Maval',
        lat: 18.7500,
        lng: 73.4800,
        population: 1100,
        households: 230,
        primaryHazard: 'Landslide',
        riskScore: 81,
        historicalEventsCount: 3,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '27° (Ghat Ridge)',
        soilType: 'Basaltic Regolith',
        elevation: '620m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 4.8, powerSubstations: 0 },
        redZoneConditions: [
          'Highway cutting slope slippage and localized mudslides',
          'Heavy monsoon drainage channel overflow'
        ],
        aiReasoning: 'Pune / Maval ghat fringe settlement is exposed to progressive slope destabilization along highway corridors.'
      },
      {
        id: 'PN-04',
        name: 'Velhe',
        district: 'Pune',
        taluka: 'Velhe',
        lat: 18.2900,
        lng: 73.6300,
        population: 680,
        households: 140,
        primaryHazard: 'Landslide',
        riskScore: 88,
        historicalEventsCount: 4,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '34° (Torna Ridge Base)',
        soilType: 'Laterite Colluvium',
        elevation: '720m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 2.6, powerSubstations: 0 },
        redZoneConditions: [
          'Extreme slope gradient and intense precipitation zone (>3500mm annually)',
          'History of catastrophic debris flows cutting off valley villages'
        ],
        aiReasoning: 'Pune / Velhe foothill settlement is situated in a high-risk debris avalanche zone requiring immediate relocation prioritization.'
      }
    ],
    relocationSites: [
      {
        id: 'PN-SITE-A',
        name: 'Bhor Terrace Safe Sector (Site A)',
        district: 'Pune',
        taluka: 'Bhor',
        lat: 18.1800,
        lng: 73.8900,
        distanceFromSourceKm: 4.5,
        suitabilityScore: 92,
        estimatedCapacity: 1500,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 4.8,
        schoolDistanceKm: 2.1,
        safetyScore: 94,
        terrainScore: 91,
        landAvailabilityHa: 21.0,
        status: 'Development Ready'
      },
      {
        id: 'PN-SITE-B',
        name: 'Mulshi Ridge Safe Zone (Site B)',
        district: 'Pune',
        taluka: 'Mulshi',
        lat: 18.5300,
        lng: 73.5400,
        distanceFromSourceKm: 5.2,
        suitabilityScore: 88,
        estimatedCapacity: 1150,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Moderate',
        hospitalDistanceKm: 5.5,
        schoolDistanceKm: 2.4,
        safetyScore: 91,
        terrainScore: 86,
        landAvailabilityHa: 17.5,
        status: 'Geotechnically Approved'
      }
    ],
    hazardBreakdown: [
      { name: 'Landslide', count: 42, percentage: '62%', color: 'bg-emerald-600' },
      { name: 'Flood', count: 18, percentage: '26%', color: 'bg-teal-600' },
      { name: 'Extreme Rainfall', count: 8, percentage: '12%', color: 'bg-emerald-500' }
    ],
    recentChanges: [
      { id: 'RC-PN1', date: '2026-09-02', village: 'Velhe', change: 'Candidate Site A geotechnically cleared for 1,500 capacity resettlement', type: 'positive' }
    ]
  },

  satara: {
    id: 'satara',
    name: 'Satara',
    center: [73.8996, 17.3734],
    zoom: 10,
    metrics: {
      vulnerableHabitations: 64,
      populationExposed: 22800,
      highRiskHabitations: 17,
      potentialRelocationSites: 28,
      sitesWithSufficientCapacity: 24
    },
    targetVillages: [
      {
        id: 'ST-01',
        name: 'Mahabaleshwar',
        district: 'Satara',
        taluka: 'Mahabaleshwar',
        lat: 17.9200,
        lng: 73.6500,
        population: 690,
        households: 145,
        primaryHazard: 'Landslide',
        riskScore: 87,
        historicalEventsCount: 5,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '36° (Vertical Escarpment)',
        soilType: 'Laterite Regolith',
        elevation: '1250m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 2.1, powerSubstations: 0 },
        redZoneConditions: [
          'High cumulative rainfall (>5000mm) triggering rotational slope slips',
          'Cliff-edge rockfall path intersecting habitation core'
        ],
        aiReasoning: 'Satara / Mahabaleshwar scarp edge habitations experience critical slope failure and road subsidence during intense monsoon bursts.'
      },
      {
        id: 'ST-02',
        name: 'Patan',
        district: 'Satara',
        taluka: 'Patan',
        lat: 17.3734,
        lng: 73.8996,
        population: 1050,
        households: 220,
        primaryHazard: 'Multi-Hazard',
        riskScore: 92,
        historicalEventsCount: 6,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '32° (Koyna Valley Scarp)',
        soilType: 'Saturated Basaltic Clay',
        elevation: '580m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 4.8, powerSubstations: 0 },
        redZoneConditions: [
          'Multiple catastrophic landslide scars (Ambeghar, Mirgaon 2021 disaster corridor)',
          'High Koyna seismic zone III/IV active fault line proximity'
        ],
        aiReasoning: 'Satara / Patan valley corridor has tragic historical evidence of simultaneous debris avalanches following cloudbursts. Immediate planned relocation is paramount.'
      },
      {
        id: 'ST-03',
        name: 'Jawali',
        district: 'Satara',
        taluka: 'Jawali',
        lat: 17.7100,
        lng: 73.7800,
        population: 780,
        households: 160,
        primaryHazard: 'Landslide',
        riskScore: 83,
        historicalEventsCount: 4,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Assessment Required',
        terrainSlope: '29° (Dense Forest Hillside)',
        soilType: 'Lateritic Loam',
        elevation: '710m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 3.5, powerSubstations: 0 },
        redZoneConditions: [
          'Valley head slope subsidence and retrogressive escarpment cracks',
          'Egress road cut off during continuous 48-hour rainfall events'
        ],
        aiReasoning: 'Satara / Jawali deep forest valley habitations face isolation and recurring hillside slippage during monsoons.'
      },
      {
        id: 'ST-04',
        name: 'Khatav',
        district: 'Satara',
        taluka: 'Khatav',
        lat: 17.6500,
        lng: 74.3200,
        population: 860,
        households: 180,
        primaryHazard: 'Flood',
        riskScore: 72,
        historicalEventsCount: 3,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '4° (Yerla River Basin)',
        soilType: 'Black Cotton / Alluvium',
        elevation: '680m',
        lastDisasterYear: 2019,
        infrastructureExposure: { schools: 2, hospitals: 0, roadsKm: 4.2, powerSubstations: 0 },
        redZoneConditions: [
          'Yerla river flash flood submergence during sudden upper catchment cloudbursts'
        ],
        aiReasoning: 'Satara / Khatav low-lying basin settlement suffers from flash flood inundation across agricultural and residential zones.'
      }
    ],
    relocationSites: [
      {
        id: 'ST-SITE-A',
        name: 'Patan Safe Plateau (Site A)',
        district: 'Satara',
        taluka: 'Patan',
        lat: 17.3900,
        lng: 73.9400,
        distanceFromSourceKm: 5.5,
        suitabilityScore: 90,
        estimatedCapacity: 1800,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 5.0,
        schoolDistanceKm: 2.2,
        safetyScore: 94,
        terrainScore: 89,
        landAvailabilityHa: 23.0,
        status: 'Development Ready'
      },
      {
        id: 'ST-SITE-B',
        name: 'Panchgani Foothills Safe Site (Site B)',
        district: 'Satara',
        taluka: 'Mahabaleshwar',
        lat: 17.9300,
        lng: 73.8000,
        distanceFromSourceKm: 6.2,
        suitabilityScore: 87,
        estimatedCapacity: 1200,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Moderate',
        hospitalDistanceKm: 4.2,
        schoolDistanceKm: 1.9,
        safetyScore: 90,
        terrainScore: 86,
        landAvailabilityHa: 19.0,
        status: 'Geotechnically Approved'
      }
    ],
    hazardBreakdown: [
      { name: 'Landslide', count: 34, percentage: '53%', color: 'bg-emerald-600' },
      { name: 'Extreme Rainfall', count: 18, percentage: '28%', color: 'bg-teal-600' },
      { name: 'Flood', count: 12, percentage: '19%', color: 'bg-emerald-500' }
    ],
    recentChanges: [
      { id: 'RC-ST1', date: '2026-09-12', village: 'Patan', change: 'Satara district geological survey completed for candidate plateau zone', type: 'positive' }
    ]
  },

  sindhudurg: {
    id: 'sindhudurg',
    name: 'Sindhudurg',
    center: [73.8170, 16.1026],
    zoom: 10,
    metrics: {
      vulnerableHabitations: 58,
      populationExposed: 19500,
      highRiskHabitations: 14,
      potentialRelocationSites: 26,
      sitesWithSufficientCapacity: 22
    },
    targetVillages: [
      {
        id: 'SD-01',
        name: 'Sawantwadi',
        district: 'Sindhudurg',
        taluka: 'Sawantwadi',
        lat: 15.9000,
        lng: 73.8100,
        population: 980,
        households: 210,
        primaryHazard: 'Landslide',
        riskScore: 85,
        historicalEventsCount: 4,
        accessibility: 'Poor',
        relocationPriority: 'IMMEDIATE',
        status: 'Red Zone Declared',
        terrainSlope: '30° (Sahyadri Foothills)',
        soilType: 'Deep Porous Laterite',
        elevation: '130m',
        lastDisasterYear: 2022,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 3.8, powerSubstations: 0 },
        redZoneConditions: [
          'High water table saturation leading to rapid laterite piping and slumping',
          'History of road collapses along Amboli ghat approach'
        ],
        aiReasoning: 'Sindhudurg / Sawantwadi foothill village exhibits severe soil piping and slope instability during extended monsoon deluges.'
      },
      {
        id: 'SD-02',
        name: 'Kudal',
        district: 'Sindhudurg',
        taluka: 'Kudal',
        lat: 16.0100,
        lng: 73.6800,
        population: 890,
        households: 190,
        primaryHazard: 'Flood',
        riskScore: 78,
        historicalEventsCount: 4,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '4° (Karli River Basin)',
        soilType: 'Alluvial Silt',
        elevation: '32m',
        lastDisasterYear: 2021,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 4.6, powerSubstations: 0 },
        redZoneConditions: [
          'Karli river bank inundation during high tide plus heavy catchment rainfall',
          'Low-lying residential clusters submerged for 48+ hours'
        ],
        aiReasoning: 'Sindhudurg / Kudal riverside settlements experience recurring submergence from Karli river spates.'
      },
      {
        id: 'SD-03',
        name: 'Malvan',
        district: 'Sindhudurg',
        taluka: 'Malvan',
        lat: 16.0590,
        lng: 73.4680,
        population: 1350,
        households: 290,
        primaryHazard: 'Coastal Erosion',
        riskScore: 84,
        historicalEventsCount: 5,
        accessibility: 'Moderate',
        relocationPriority: 'IMMEDIATE',
        status: 'Relocation Planned',
        terrainSlope: '3° (Arabian Sea Shoreline)',
        soilType: 'Sandy Marine Deposit',
        elevation: '4m',
        lastDisasterYear: 2023,
        infrastructureExposure: { schools: 2, hospitals: 1, roadsKm: 5.2, powerSubstations: 1 },
        redZoneConditions: [
          'High Arabian Sea storm surge vulnerability and coastal sand spit erosion',
          'Saltwater intrusion into local freshwater aquifers and beach retreat (>2.1m/yr)'
        ],
        aiReasoning: 'Sindhudurg / Malvan coastal frontline settlement faces severe tidal encroachment, high-energy wave erosion, and storm surges requiring planned inland resettlement.'
      },
      {
        id: 'SD-04',
        name: 'Vengurla',
        district: 'Sindhudurg',
        taluka: 'Vengurla',
        lat: 15.8600,
        lng: 73.6300,
        population: 860,
        households: 185,
        primaryHazard: 'Coastal Erosion',
        riskScore: 80,
        historicalEventsCount: 4,
        accessibility: 'Moderate',
        relocationPriority: 'SHORT_TERM',
        status: 'Assessment Required',
        terrainSlope: '6° (Coastal Cliff Edge)',
        soilType: 'Laterite Sandstone',
        elevation: '18m',
        lastDisasterYear: 2023,
        infrastructureExposure: { schools: 1, hospitals: 0, roadsKm: 3.4, powerSubstations: 0 },
        redZoneConditions: [
          'Wave scour at base of laterite coastal headlands',
          'Localized cliff collapses during cyclonic activity'
        ],
        aiReasoning: 'Sindhudurg / Vengurla cliffhead settlement requires preventative setback and relocation to stable inland ground.'
      }
    ],
    relocationSites: [
      {
        id: 'SD-SITE-A',
        name: 'Sawantwadi High Plateau (Site A)',
        district: 'Sindhudurg',
        taluka: 'Sawantwadi',
        lat: 15.9300,
        lng: 73.8500,
        distanceFromSourceKm: 5.1,
        suitabilityScore: 91,
        estimatedCapacity: 1700,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Available',
        hospitalDistanceKm: 4.0,
        schoolDistanceKm: 1.8,
        safetyScore: 95,
        terrainScore: 90,
        landAvailabilityHa: 22.5,
        status: 'Development Ready'
      },
      {
        id: 'SD-SITE-B',
        name: 'Kudal Safe Inland Terrace (Site B)',
        district: 'Sindhudurg',
        taluka: 'Kudal',
        lat: 16.0400,
        lng: 73.7200,
        distanceFromSourceKm: 4.8,
        suitabilityScore: 88,
        estimatedCapacity: 1300,
        landslideRisk: 'Low',
        floodRisk: 'Low',
        roadAccess: 'Good',
        waterAvailability: 'Moderate',
        hospitalDistanceKm: 3.5,
        schoolDistanceKm: 1.5,
        safetyScore: 92,
        terrainScore: 87,
        landAvailabilityHa: 18.0,
        status: 'Geotechnically Approved'
      }
    ],
    hazardBreakdown: [
      { name: 'Coastal Erosion', count: 26, percentage: '45%', color: 'bg-emerald-600' },
      { name: 'Landslide', count: 20, percentage: '34%', color: 'bg-teal-600' },
      { name: 'Flood', count: 12, percentage: '21%', color: 'bg-emerald-500' }
    ],
    recentChanges: [
      { id: 'RC-SD1', date: '2026-09-08', village: 'Malvan', change: 'Candidate Site A cleared for 1,700 capacity coastal retreat relocation', type: 'positive' }
    ]
  }
};

export const MOCK_DATA_SOURCES: DataSource[] = [
  {
    id: 'src-1',
    source: 'Geological Survey of India (GSI)',
    dataset: 'National Landslide Susceptibility Mapping (NLSM)',
    lastUpdated: '2025-11-15',
    coverage: 'Western Ghats & Konkan, Maharashtra',
    purpose: 'Baseline high-resolution slope instability modeling',
    dataQuality: '98.5% Validation Score',
    status: 'Official'
  },
  {
    id: 'src-2',
    source: 'Central Water Commission (CWC)',
    dataset: 'River Flood Hydrographs & 100-Yr Return Flood Lines',
    lastUpdated: '2026-01-10',
    coverage: 'Savitri, Vashishti, Krishna & Ulhas Basins',
    purpose: 'Flood risk level & backwater inundation modeling',
    dataQuality: 'High Precision Gauge Network',
    status: 'Official'
  },
  {
    id: 'src-3',
    source: 'Maharashtra Remote Sensing Application Centre (MRSAC)',
    dataset: 'High-Resolution LiDAR DEM & Village Cadastral GIS',
    lastUpdated: '2025-12-05',
    coverage: 'Pilot Districts (Raigad, Ratnagiri, Pune, Satara, Sindhudurg)',
    purpose: 'Slope gradient calculation & red-zone buffer definition',
    dataQuality: '0.5m Spatial Precision',
    status: 'Official'
  },
  {
    id: 'src-4',
    source: 'India Meteorological Department (IMD)',
    dataset: 'Doppler Radar Precipitation & Monsoon Nowcasts',
    lastUpdated: 'Real-time (15 min interval)',
    coverage: 'Maharashtra Coastal & Ghat Radars',
    purpose: 'Extreme cloudburst anomaly warnings',
    dataQuality: 'Calibrated Precipitation Telemetry',
    status: 'Official'
  },
  {
    id: 'src-5',
    source: 'सुरक्षित धरा (SURAKSHIT DHARA) Spatial ML Engine',
    dataset: 'Composite Multi-Hazard Relocation Suitability Matrix',
    lastUpdated: '2026-09-24',
    coverage: '20 Target Villages & Candidate Relocation Zones',
    purpose: 'Deterministic decision-support scoring & capacity estimation',
    dataQuality: 'Prototype Algorithmic Output',
    status: 'Derived'
  }
];
