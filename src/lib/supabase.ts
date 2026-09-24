import { supabase } from './supabaseClient';
import { PILOT_DISTRICTS } from '../data/pilotData';
import { Habitation, RelocationSite } from '../types';

export { supabase };

/**
 * Fetch district data dynamically from Supabase database tables:
 * district_disaster_overview, villages, ai_village_dashboard, relocation_sites, etc.
 */
export async function fetchDistrictData(districtName: string) {
  const normalized = districtName.toLowerCase();
  const base = PILOT_DISTRICTS[normalized] || PILOT_DISTRICTS['raigad'];

  if (!supabase) {
    return base;
  }

  try {
    // 1. Fetch district overview / villages
    const { data: villagesData, error: villagesError } = await supabase
      .from('villages')
      .select('*')
      .ilike('district', districtName);

    // 2. Fetch AI Village Dashboard records
    const { data: dashboardData, error: dashError } = await supabase
      .from('ai_village_dashboard')
      .select('*')
      .ilike('district', districtName);

    // 3. Fetch relocation sites for district
    const { data: sitesData, error: sitesError } = await supabase
      .from('relocation_sites')
      .select('*')
      .ilike('district', districtName);

    let targetVillages: Habitation[] = [];

    if (!dashError && dashboardData && dashboardData.length > 0) {
      targetVillages = dashboardData.map((row: any, idx: number) => ({
        id: row.village_id || row.id || `V-${idx}`,
        name: row.village_name || row.name || 'Unknown Village',
        district: row.district || districtName,
        taluka: row.taluka || 'Default Taluka',
        lat: row.lat || row.latitude || 18.0905,
        lng: row.lng || row.longitude || 73.4146,
        population: row.population || 500,
        households: row.households || 100,
        primaryHazard: row.primary_hazard || row.primaryHazard || 'Landslide',
        riskScore: row.risk_score || row.riskScore || 75,
        historicalEventsCount: row.historical_events_count || 3,
        accessibility: row.accessibility || 'Moderate',
        relocationPriority: row.relocation_priority || 'IMMEDIATE',
        status: row.status || 'Assessment Required',
        terrainSlope: row.terrain_slope || '25°',
        soilType: row.soil_type || 'Lateritic',
        elevation: row.elevation || '250m',
        lastDisasterYear: row.last_disaster_year || 2021,
        infrastructureExposure: row.infrastructure_exposure || { schools: 1, hospitals: 0, roadsKm: 3.0, powerSubstations: 0 },
        redZoneConditions: row.red_zone_conditions || ['High hazard zone susceptibility'],
        aiReasoning: row.ai_reasoning || 'Modelled exposure and historical vulnerability index.'
      }));
    } else if (!villagesError && villagesData && villagesData.length > 0) {
      targetVillages = villagesData.map((row: any, idx: number) => ({
        id: row.id || `V-${idx}`,
        name: row.name || 'Unknown Village',
        district: row.district || districtName,
        taluka: row.taluka || 'Default Taluka',
        lat: row.latitude || row.lat || 18.0905,
        lng: row.longitude || row.lng || 73.4146,
        population: row.population || 500,
        households: row.households || 100,
        primaryHazard: row.hazard_type || row.primary_hazard || 'Landslide',
        riskScore: row.risk_score || 75,
        historicalEventsCount: row.historical_events_count || 3,
        accessibility: row.accessibility || 'Moderate',
        relocationPriority: row.relocation_priority || 'IMMEDIATE',
        status: row.status || 'Assessment Required',
        terrainSlope: row.terrain_slope || '25°',
        soilType: row.soil_type || 'Lateritic',
        elevation: row.elevation || '250m',
        lastDisasterYear: row.last_disaster_year || 2021,
        infrastructureExposure: row.infrastructure_exposure || { schools: 1, hospitals: 0, roadsKm: 3.0, powerSubstations: 0 },
        redZoneConditions: row.red_zone_conditions || ['High hazard zone susceptibility'],
        aiReasoning: row.ai_reasoning || 'Modelled exposure and historical vulnerability index.'
      }));
    }

    let relocationSites: RelocationSite[] = base.relocationSites;
    if (!sitesError && sitesData && sitesData.length > 0) {
      relocationSites = sitesData.map((row: any, idx: number) => ({
        id: row.id || `SITE-${idx}`,
        name: row.name || row.site_name || 'Candidate Safe Site',
        district: row.district || districtName,
        taluka: row.taluka || 'Default Taluka',
        lat: row.latitude || row.lat || 18.1150,
        lng: row.longitude || row.lng || 73.4520,
        distanceFromSourceKm: row.distance_from_source_km || row.distance || 4.2,
        suitabilityScore: row.suitability_score || row.suitability || 91,
        estimatedCapacity: row.estimated_capacity || row.capacity || 1200,
        landslideRisk: row.landslide_risk || 'Low',
        floodRisk: row.flood_risk || 'Low',
        roadAccess: row.road_access || 'Good',
        waterAvailability: row.water_availability || 'Available',
        hospitalDistanceKm: row.hospital_distance_km || 6.1,
        schoolDistanceKm: row.school_distance_km || 2.8,
        safetyScore: row.safety_score || 95,
        terrainScore: row.terrain_score || 91,
        landAvailabilityHa: row.land_availability_ha || row.land || 20.5,
        status: row.status || 'Development Ready'
      }));
    }

    return {
      ...base,
      targetVillages: targetVillages.length > 0 ? targetVillages : base.targetVillages,
      relocationSites: relocationSites.length > 0 ? relocationSites : base.relocationSites
    };
  } catch (err) {
    console.warn('Supabase fetch query warning, using local pilot fallback:', err);
  }

  return base;
}
