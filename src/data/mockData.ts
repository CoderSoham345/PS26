import { PILOT_DISTRICTS, MOCK_DATA_SOURCES } from './pilotData';
import { SystemMetrics } from '../types';

export const MAHARASHTRA_DISTRICTS = [
  'Raigad',
  'Ratnagiri',
  'Pune',
  'Satara',
  'Sindhudurg'
];

export const SYSTEM_METRICS: SystemMetrics = {
  districtsCovered: 5,
  vulnerableHabitations: 340,
  populationExposed: 128550,
  highRiskHabitations: 96,
  potentialRelocationSites: 156,
  sitesWithSufficientCapacity: 133
};

// Default export helpers for backwards compatibility
export const MOCK_HABITATIONS = Object.values(PILOT_DISTRICTS).flatMap(d => d.targetVillages);
export const MOCK_RELOCATION_SITES = Object.values(PILOT_DISTRICTS).flatMap(d => d.relocationSites);
export { MOCK_DATA_SOURCES, PILOT_DISTRICTS };
