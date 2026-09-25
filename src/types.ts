export type RiskLevel = 'IMMEDIATE' | 'SHORT_TERM' | 'MEDIUM_TERM' | 'MONITOR';

export type HazardType = 'Landslide' | 'Flood' | 'Coastal Erosion' | 'Extreme Rainfall' | 'Seismic Hazard' | 'Multi-Hazard';

export interface Habitation {
  id: string;
  name: string;
  district: string;
  taluka: string;
  lat: number;
  lng: number;
  population: number;
  households: number;
  primaryHazard: HazardType;
  riskScore: number; // 0-100
  historicalEventsCount: number;
  accessibility: 'Poor' | 'Moderate' | 'Good';
  relocationPriority: RiskLevel;
  status: 'Assessment Required' | 'Red Zone Declared' | 'Site Selected' | 'Relocation Planned' | 'In Progress';
  terrainSlope: string;
  soilType: string;
  elevation: string;
  lastDisasterYear: number;
  infrastructureExposure: {
    schools: number;
    hospitals: number;
    roadsKm: number;
    powerSubstations: number;
  };
  redZoneConditions: string[];
  aiReasoning: string;
  boundaryGeoJson?: any;
  polygonCoordinates?: number[][];
}

export interface RelocationSite {
  id: string;
  name: string;
  district: string;
  taluka: string;
  lat: number;
  lng: number;
  distanceFromSourceKm: number;
  suitabilityScore: number; // 0-100
  estimatedCapacity: number;
  landslideRisk: 'Low' | 'Moderate' | 'High';
  floodRisk: 'Low' | 'Moderate' | 'High';
  roadAccess: 'Poor' | 'Moderate' | 'Good';
  waterAvailability: 'Scarce' | 'Moderate' | 'Available' | 'Abundant';
  hospitalDistanceKm: number;
  schoolDistanceKm: number;
  safetyScore: number;
  terrainScore: number;
  landAvailabilityHa: number;
  status: 'Candidate Site' | 'Preliminary Surveyed' | 'Geotechnically Approved' | 'Development Ready';
  boundaryGeoJson?: any;
  polygonCoordinates?: number[][];
}

export interface DataSource {
  id: string;
  source: string;
  dataset: string;
  lastUpdated: string;
  coverage: string;
  purpose: string;
  dataQuality: string;
  status: 'Official' | 'Open Data' | 'Derived' | 'Prototype' | 'Simulated';
}

export interface SimulationParams {
  rainfallIncreasePct: number; // e.g. 0, 10, 20, 30
  populationGrowthPct: number; // e.g. 0, 5, 10
  availableLandDeltaPct: number; // e.g. 0, -10, -20
}

export interface SystemMetrics {
  districtsCovered: number;
  vulnerableHabitations: number;
  populationExposed: number;
  highRiskHabitations: number;
  potentialRelocationSites: number;
  sitesWithSufficientCapacity: number;
}
