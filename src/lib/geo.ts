import { Habitation, RelocationSite } from '../types';

export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Generate a deterministic polygon around a point (e.g., Red Zone or Planning Boundary)
function generatePolygonRing(centerLng: number, centerLat: number, radiusKm: number, points = 16, seed = 1): number[][] {
  const coordinates: number[][] = [];
  const kmToDegLat = 1 / 110.574;
  const kmToDegLng = 1 / (111.32 * Math.cos(deg2rad(centerLat)));

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    // Deterministic irregularity based on angle and seed
    const variance = 1 + 0.18 * Math.sin(angle * 3 + seed) + 0.12 * Math.cos(angle * 2 + seed);
    const r = radiusKm * variance;
    const lng = centerLng + r * kmToDegLng * Math.cos(angle);
    const lat = centerLat + r * kmToDegLat * Math.sin(angle);
    coordinates.push([Number(lng.toFixed(6)), Number(lat.toFixed(6))]);
  }
  return coordinates;
}

// Generate Modelled Red Zone GeoJSON
export function generateModelledRedZoneGeoJson(village: Habitation) {
  const radiusKm = 0.5 + (village.riskScore / 100) * 0.7; // ~0.85km to 1.2km localized to hazard zone
  const calculatedAreaSqKm = Math.round(Math.PI * radiusKm * radiusKm * 10) / 10;
  const calculatedAreaHa = Math.round(calculatedAreaSqKm * 100);

  // 1. If village already has boundaryGeoJson directly from Supabase, return it with enriched properties
  if (village.boundaryGeoJson) {
    if (village.boundaryGeoJson.type === 'FeatureCollection') {
      return village.boundaryGeoJson;
    }
    if (village.boundaryGeoJson.type === 'Feature') {
      return {
        type: 'FeatureCollection' as const,
        features: [village.boundaryGeoJson]
      };
    }
    if (village.boundaryGeoJson.type === 'Polygon' || village.boundaryGeoJson.type === 'MultiPolygon') {
      return {
        type: 'FeatureCollection' as const,
        features: [{
          type: 'Feature' as const,
          id: `redzone-${village.id}`,
          properties: {
            type: 'modelled_red_zone',
            id: village.id,
            village: village.name,
            villageName: village.name,
            district: village.district,
            taluka: village.taluka,
            riskScore: village.riskScore,
            riskLevel: village.riskScore >= 80 ? 'Very High' : 'High',
            primaryHazard: village.primaryHazard,
            population: village.population,
            households: village.households,
            roadsExposedKm: village.infrastructureExposure?.roadsKm || 3.2,
            schools: village.infrastructureExposure?.schools || 0,
            hospitals: village.infrastructureExposure?.hospitals || 0,
            areaSqKm: calculatedAreaSqKm,
            areaHectares: calculatedAreaHa,
            disclaimer: 'Prototype decision-support analysis — not an official statutory designation.'
          },
          geometry: village.boundaryGeoJson
        }]
      };
    }
  }

  // 2. If village has polygonCoordinates provided
  if (village.polygonCoordinates && village.polygonCoordinates.length >= 3) {
    const coords = [...village.polygonCoordinates];
    if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
      coords.push(coords[0]);
    }
    return {
      type: 'FeatureCollection' as const,
      features: [{
        type: 'Feature' as const,
        id: `redzone-${village.id}`,
        properties: {
          type: 'modelled_red_zone',
          id: village.id,
          village: village.name,
          villageName: village.name,
          district: village.district,
          taluka: village.taluka,
          riskScore: village.riskScore,
          riskLevel: village.riskScore >= 80 ? 'Very High' : 'High',
          primaryHazard: village.primaryHazard,
          population: village.population,
          households: village.households,
          roadsExposedKm: village.infrastructureExposure?.roadsKm || 3.2,
          schools: village.infrastructureExposure?.schools || 0,
          hospitals: village.infrastructureExposure?.hospitals || 0,
          areaSqKm: calculatedAreaSqKm,
          areaHectares: calculatedAreaHa,
          disclaimer: 'Prototype decision-support analysis — not an official statutory designation.'
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [coords]
        }
      }]
    };
  }

  // 3. Otherwise, generate deterministic prototype polygon localized to affected habitation/hazard area
  const seed = (village.name.charCodeAt(0) * 7 + village.riskScore) % 10;
  const ring = generatePolygonRing(village.lng, village.lat, radiusKm, 24, seed);

  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        id: `redzone-${village.id}`,
        properties: {
          type: 'modelled_red_zone',
          id: village.id,
          village: village.name,
          villageName: village.name,
          district: village.district,
          taluka: village.taluka,
          riskScore: village.riskScore,
          riskLevel: village.riskScore >= 80 ? 'Very High' : 'High',
          primaryHazard: village.primaryHazard,
          population: village.population,
          households: village.households,
          roadsExposedKm: village.infrastructureExposure?.roadsKm || 3.2,
          schools: village.infrastructureExposure?.schools || 0,
          hospitals: village.infrastructureExposure?.hospitals || 0,
          areaSqKm: calculatedAreaSqKm,
          areaHectares: calculatedAreaHa,
          disclaimer: 'Prototype decision-support analysis — not an official statutory designation.'
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [ring]
        }
      }
    ]
  };
}

// Generate 200m Hazard Danger Buffer GeoJSON
export function generateRedZoneBufferGeoJson(village: Habitation) {
  const radiusKm = 0.5 + (village.riskScore / 100) * 0.7 + 0.2; // 200m buffer envelope beyond red zone
  const seed = (village.name.charCodeAt(0) * 7 + village.riskScore) % 10;
  const ring = generatePolygonRing(village.lng, village.lat, radiusKm, 24, seed);

  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        id: `redzone-buffer-${village.id}`,
        properties: {
          type: 'danger_buffer',
          id: `buffer-${village.id}`,
          village: village.name,
          bufferDistance: '200m Hazard Danger Envelope',
          riskScore: village.riskScore
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [ring]
        }
      }
    ]
  };
}

// Calculate bounding box for any GeoJSON FeatureCollection
export function calculateGeoJsonBounds(geoJson: any): [[number, number], [number, number]] {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  function traverse(coords: any) {
    if (!Array.isArray(coords)) return;
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      const [lng, lat] = coords;
      if (lng < minLng) minLng = lng;
      if (lat < minLat) minLat = lat;
      if (lng > maxLng) maxLng = lng;
      if (lat > maxLat) maxLat = lat;
      return;
    }
    coords.forEach(traverse);
  }

  if (geoJson.features) {
    geoJson.features.forEach((f: any) => {
      if (f.geometry && f.geometry.coordinates) {
        traverse(f.geometry.coordinates);
      }
    });
  } else if (geoJson.geometry && geoJson.geometry.coordinates) {
    traverse(geoJson.geometry.coordinates);
  } else if (geoJson.coordinates) {
    traverse(geoJson.coordinates);
  }

  if (minLng === Infinity) {
    return [[73.0, 18.0], [74.0, 19.0]];
  }

  return [[minLng, minLat], [maxLng, maxLat]];
}

// Generate Candidate Site Planning Boundary GeoJSON
export function generatePlanningBoundaryGeoJson(site: RelocationSite) {
  // 1. If site already has boundaryGeoJson directly from Supabase, return it!
  if (site.boundaryGeoJson) {
    if (site.boundaryGeoJson.type === 'FeatureCollection') {
      return site.boundaryGeoJson;
    }
    if (site.boundaryGeoJson.type === 'Feature') {
      return {
        type: 'FeatureCollection' as const,
        features: [site.boundaryGeoJson]
      };
    }
    if (site.boundaryGeoJson.type === 'Polygon' || site.boundaryGeoJson.type === 'MultiPolygon') {
      return {
        type: 'FeatureCollection' as const,
        features: [{
          type: 'Feature' as const,
          id: `planning-boundary-${site.id}`,
          properties: {
            id: site.id,
            name: site.name,
            subtext: 'Proposed Planning Area',
            landAvailabilityHa: site.landAvailabilityHa,
            capacity: site.estimatedCapacity,
            suitabilityScore: site.suitabilityScore,
            status: site.status,
            color: '#10B981',
            borderColor: '#34D399'
          },
          geometry: site.boundaryGeoJson
        }]
      };
    }
  }

  // 2. If site has explicit polygonCoordinates
  if (site.polygonCoordinates && site.polygonCoordinates.length > 2) {
    return {
      type: 'FeatureCollection' as const,
      features: [{
        type: 'Feature' as const,
        id: `planning-boundary-${site.id}`,
        properties: {
          id: site.id,
          name: site.name,
          subtext: 'Proposed Planning Area',
          landAvailabilityHa: site.landAvailabilityHa,
          capacity: site.estimatedCapacity,
          suitabilityScore: site.suitabilityScore,
          status: site.status,
          color: '#10B981',
          borderColor: '#34D399'
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [site.polygonCoordinates]
        }
      }]
    };
  }

  // 3. Realistic deterministic polygon centered on [site.lng, site.lat]
  // Sized comfortably to encompass all internal rehabilitation facilities (~0.55 - 0.65 km radius)
  const areaKm2 = (site.landAvailabilityHa || 25) / 100;
  const radiusKm = Math.max(0.55, Math.sqrt(areaKm2 / Math.PI) * 1.55);
  const seed = (site.name.charCodeAt(0) * 13 + site.estimatedCapacity) % 10;
  const ring = generatePolygonRing(site.lng, site.lat, radiusKm, 18, seed);

  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        id: `planning-boundary-${site.id}`,
        properties: {
          id: site.id,
          name: site.name,
          subtext: 'Proposed Planning Area',
          landAvailabilityHa: site.landAvailabilityHa,
          capacity: site.estimatedCapacity,
          suitabilityScore: site.suitabilityScore,
          status: site.status,
          color: '#10B981',
          borderColor: '#34D399'
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [ring]
        }
      }
    ]
  };
}

// Generate Relocation Route GeoJSON connecting village to site
export function generateRelocationRouteGeoJson(village: Habitation, site: RelocationSite) {
  const distanceKm = calculateHaversineDistance(village.lat, village.lng, site.lat, site.lng);
  
  // Create a realistic multi-segment curved path between village and candidate site
  const steps = 10;
  const coordinates: [number, number][] = [];
  const deltaLng = site.lng - village.lng;
  const deltaLat = site.lat - village.lat;

  // Deterministic curvature perpendicular to direct line
  const midSeed = (village.lat * 100 + site.lng * 100) % 2 === 0 ? 0.0035 : -0.0035;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const curveOffset = Math.sin(t * Math.PI) * midSeed;
    const lng = village.lng + deltaLng * t + curveOffset;
    const lat = village.lat + deltaLat * t - curveOffset * 0.5;
    coordinates.push([Number(lng.toFixed(6)), Number(lat.toFixed(6))]);
  }

  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        id: `route-${village.id}-${site.id}`,
        properties: {
          villageName: village.name,
          siteName: site.name,
          distanceKm: distanceKm,
          distanceLabel: `Approx. straight-line distance: ${distanceKm} km`,
          accessibility: site.roadAccess,
          evacuationTimeMins: Math.round(distanceKm * 2.8 + 10)
        },
        geometry: {
          type: 'LineString' as const,
          coordinates: coordinates
        }
      }
    ]
  };
}

// Generate After-Rehabilitation Settlement Layout GeoJSON
// Deterministic geometry based on site.lat, site.lng, capacity, and landAvailability
export function generateRehabilitationGeoJson(site: RelocationSite, originalVillage: Habitation) {
  const cLng = site.lng;
  const cLat = site.lat;
  const kmToDegLat = 1 / 110.574;
  const kmToDegLng = 1 / (111.32 * Math.cos(deg2rad(cLat)));

  // Generate deterministic polygon box
  function createBox(centerOffsetLngKm: number, centerOffsetLatKm: number, widthKm: number, heightKm: number): number[][] {
    const x0 = cLng + (centerOffsetLngKm - widthKm / 2) * kmToDegLng;
    const x1 = cLng + (centerOffsetLngKm + widthKm / 2) * kmToDegLng;
    const y0 = cLat + (centerOffsetLatKm - heightKm / 2) * kmToDegLat;
    const y1 = cLat + (centerOffsetLatKm + heightKm / 2) * kmToDegLat;

    return [
      [Number(x0.toFixed(6)), Number(y0.toFixed(6))],
      [Number(x1.toFixed(6)), Number(y0.toFixed(6))],
      [Number(x1.toFixed(6)), Number(y1.toFixed(6))],
      [Number(x0.toFixed(6)), Number(y1.toFixed(6))],
      [Number(x0.toFixed(6)), Number(y0.toFixed(6))]
    ];
  }

  const features: any[] = [];

  // 1. Residential Cluster A
  features.push({
    type: 'Feature',
    id: 'res-cluster-a',
    properties: {
      type: 'residential',
      category: 'Residential Area',
      name: 'Residential Cluster A',
      units: Math.round((site.estimatedCapacity || 1200) * 0.55 / 4.5),
      population: Math.round((site.estimatedCapacity || 1200) * 0.55),
      color: '#10B981',
      description: 'Single-storey resilient basalt-core homesteads with solar rooftops'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(-0.16, 0.12, 0.22, 0.16)]
    }
  });

  // 2. Residential Cluster B
  features.push({
    type: 'Feature',
    id: 'res-cluster-b',
    properties: {
      type: 'residential',
      category: 'Residential Area',
      name: 'Residential Cluster B',
      units: Math.round((site.estimatedCapacity || 1200) * 0.45 / 4.5),
      population: Math.round((site.estimatedCapacity || 1200) * 0.45),
      color: '#059669',
      description: 'Cluster housing with integrated rainwater retention & kitchen gardens'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(0.18, 0.10, 0.24, 0.15)]
    }
  });

  // 3. Central Assembly & Open Space (Evacuation Green)
  features.push({
    type: 'Feature',
    id: 'open-space',
    properties: {
      type: 'open_space',
      category: 'Open Space',
      name: 'Central Assembly Ground & Safe Evacuation Park',
      areaAcres: 4.8,
      color: '#34D399',
      description: 'Helipad-capable assembly field, sports turf, and shaded community park'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(0.01, -0.01, 0.16, 0.12)]
    }
  });

  // 4. Primary Health Centre & Clinic
  features.push({
    type: 'Feature',
    id: 'health-centre',
    properties: {
      type: 'healthcare',
      category: 'Healthcare',
      name: 'Primary Health Sub-Centre (PHC)',
      beds: 12,
      color: '#EF4444',
      description: '24/7 emergency triage, maternity wing, ambulance bay & cold chain'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(-0.19, -0.15, 0.12, 0.10)]
    }
  });

  // 5. Zilla Parishad Model School & Cyclone/Shelter Hall
  features.push({
    type: 'Feature',
    id: 'school-hall',
    properties: {
      type: 'school',
      category: 'School',
      name: 'Zilla Parishad Resilient School & Multipurpose Shelter',
      capacityStudents: 280,
      color: '#3B82F6',
      description: 'Dual-use educational complex and designated Category-1 disaster shelter'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(0.19, -0.14, 0.14, 0.11)]
    }
  });

  // 6. Community Centre & Panchayat Bhawan
  features.push({
    type: 'Feature',
    id: 'community-centre',
    properties: {
      type: 'community',
      category: 'Community Facility',
      name: 'Panchayat Disaster Information & Community Centre',
      color: '#8B5CF6',
      description: 'Citizen welfare office, satellite emergency telecom node & public hall'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(-0.02, -0.16, 0.12, 0.08)]
    }
  });

  // 7. Water Filtration & Solar Utility Substation
  features.push({
    type: 'Feature',
    id: 'water-utility',
    properties: {
      type: 'utilities',
      category: 'Water / Utilities',
      name: 'Overhead Reservoir & Solar-Microgrid Substation',
      tankCapacityLiters: '250,000 L',
      color: '#06B6D4',
      description: 'Elevated dual-pump water tower with RO filtration and solar battery bank'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(-0.28, 0.22, 0.10, 0.08)]
    }
  });

  // 8. Emergency Services & Fire/Civil Defense Outpost
  features.push({
    type: 'Feature',
    id: 'emergency-facility',
    properties: {
      type: 'emergency',
      category: 'Emergency Facility',
      name: 'Disaster Rapid Response Outpost & Equipment Depot',
      color: '#F59E0B',
      description: 'Search & rescue cache, inflatable boat depot, and first responder vehicles'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [createBox(0.28, 0.24, 0.10, 0.08)]
    }
  });

  // 9. Main Access Road & Internal Spine
  features.push({
    type: 'Feature',
    id: 'main-access-road',
    properties: {
      type: 'road',
      category: 'Roads',
      name: 'Main 4-Lane Resilient Access Corridor',
      widthMeters: 14,
      color: '#F8FAFC',
      description: 'Reinforced concrete all-weather access road connecting to regional highway'
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [Number((cLng - 0.35 * kmToDegLng).toFixed(6)), Number(cLat.toFixed(6))],
        [Number((cLng - 0.05 * kmToDegLng).toFixed(6)), Number(cLat.toFixed(6))],
        [Number(cLng.toFixed(6)), Number(cLat.toFixed(6))],
        [Number((cLng + 0.35 * kmToDegLng).toFixed(6)), Number(cLat.toFixed(6))]
      ]
    }
  });

  features.push({
    type: 'Feature',
    id: 'internal-road-north-south',
    properties: {
      type: 'road',
      category: 'Roads',
      name: 'Central Boulevard & Internal Ring',
      widthMeters: 9,
      color: '#94A3B8',
      description: 'Internal paved street network linking clusters, school, and health centre'
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [Number(cLng.toFixed(6)), Number((cLat + 0.28 * kmToDegLat).toFixed(6))],
        [Number(cLng.toFixed(6)), Number((cLat - 0.25 * kmToDegLat).toFixed(6))]
      ]
    }
  });

  // 10. PRESERVED ORIGINAL RED ZONE (Critical constraint: must remain visible in AFTER stage)
  const redZoneRing = generatePolygonRing(originalVillage.lng, originalVillage.lat, 0.7 + (originalVillage.riskScore / 100) * 0.5, 18, 3);
  features.push({
    type: 'Feature',
    id: `preserved-redzone-${originalVillage.id}`,
    properties: {
      type: 'restricted_zone',
      category: 'Original Hazard Zone',
      name: 'ORIGINAL HIGH-RISK / RESTRICTED AREA',
      subtext: 'Prohibited for future residential habitation — ecological restoration buffer',
      originalVillage: originalVillage.name,
      color: '#EF4444'
    },
    geometry: {
      type: 'Polygon',
      coordinates: [redZoneRing]
    }
  });

  return {
    type: 'FeatureCollection' as const,
    features: features
  };
}

// Infrastructure Annotations data
export function getInfrastructureAnnotations(village: Habitation, site: RelocationSite) {
  return [
    {
      id: 'road-nh',
      type: 'highway',
      name: 'NH-66 Coastal / Ghat Arterial Highway',
      subtext: 'Primary National Highway Corridor',
      lat: (village.lat + site.lat) / 2 + 0.008,
      lng: (village.lng + site.lng) / 2 - 0.012,
      distanceFromSiteKm: 1.8,
      status: 'All-Weather Operational'
    },
    {
      id: 'hosp-phc',
      type: 'hospital',
      name: `${site.taluka} Sub-District Hospital & Trauma Centre`,
      subtext: `${site.hospitalDistanceKm} km from Candidate Site`,
      lat: site.lat - 0.016,
      lng: site.lng + 0.018,
      distanceFromSiteKm: site.hospitalDistanceKm,
      status: 'Emergency Equipped'
    },
    {
      id: 'school-zp',
      type: 'school',
      name: 'Zilla Parishad Higher Secondary School',
      subtext: `${site.schoolDistanceKm} km from Candidate Site`,
      lat: site.lat + 0.014,
      lng: site.lng - 0.015,
      distanceFromSiteKm: site.schoolDistanceKm,
      status: 'Active Primary & Secondary'
    },
    {
      id: 'water-source',
      type: 'water',
      name: 'Perennial Gravity Reservoir & Treatment Canal',
      subtext: `1.8 km from Candidate Site`,
      lat: site.lat + 0.022,
      lng: site.lng + 0.025,
      distanceFromSiteKm: 1.8,
      status: `${site.waterAvailability} Water Supply`
    }
  ];
}

export interface FacilityPoint {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  lng: number;
  lat: number;
  specs: string;
}

export function getRehabilitationFacilityPoints(site: RelocationSite): FacilityPoint[] {
  const cLng = site.lng;
  const cLat = site.lat;
  const kmToDegLat = 1 / 110.574;
  const kmToDegLng = 1 / (111.32 * Math.cos(deg2rad(cLat)));

  return [
    {
      id: 'facility-res-a',
      name: 'Residential Cluster A',
      category: 'Residential Zone',
      icon: '🏠',
      color: '#10B981',
      lng: Number((cLng - 0.16 * kmToDegLng).toFixed(6)),
      lat: Number((cLat + 0.12 * kmToDegLat).toFixed(6)),
      specs: `${Math.round((site.estimatedCapacity || 1200) * 0.55 / 4.5)} Units • Resilient Homesteads`
    },
    {
      id: 'facility-res-b',
      name: 'Residential Cluster B',
      category: 'Residential Zone',
      icon: '🏡',
      color: '#059669',
      lng: Number((cLng + 0.18 * kmToDegLng).toFixed(6)),
      lat: Number((cLat + 0.10 * kmToDegLat).toFixed(6)),
      specs: `${Math.round((site.estimatedCapacity || 1200) * 0.45 / 4.5)} Units • Rainwater Harvesters`
    },
    {
      id: 'facility-health',
      name: 'Primary Health Sub-Centre (PHC)',
      category: 'Healthcare',
      icon: '🏥',
      color: '#EF4444',
      lng: Number((cLng - 0.19 * kmToDegLng).toFixed(6)),
      lat: Number((cLat - 0.15 * kmToDegLat).toFixed(6)),
      specs: '12 Beds • 24/7 Triage & Cold Chain'
    },
    {
      id: 'facility-school',
      name: 'ZP Resilient School & Multipurpose Shelter',
      category: 'School / Shelter',
      icon: '🏫',
      color: '#3B82F6',
      lng: Number((cLng + 0.19 * kmToDegLng).toFixed(6)),
      lat: Number((cLat - 0.14 * kmToDegLat).toFixed(6)),
      specs: 'Capacity 280 • Dual-Use Cyclone Shelter'
    },
    {
      id: 'facility-assembly',
      name: 'Central Assembly Ground & Safe Evacuation Park',
      category: 'Open Space',
      icon: '🌳',
      color: '#34D399',
      lng: Number((cLng + 0.01 * kmToDegLng).toFixed(6)),
      lat: Number((cLat - 0.01 * kmToDegLat).toFixed(6)),
      specs: '4.8 Acres • Helipad Capable Evacuation Field'
    },
    {
      id: 'facility-water',
      name: 'Overhead Reservoir & Solar Substation',
      category: 'Utilities',
      icon: '💧',
      color: '#06B6D4',
      lng: Number((cLng - 0.28 * kmToDegLng).toFixed(6)),
      lat: Number((cLat + 0.22 * kmToDegLat).toFixed(6)),
      specs: '250,000 L Tank • RO Filtration & Microgrid'
    },
    {
      id: 'facility-emergency',
      name: 'Disaster Rapid Response Depot',
      category: 'Emergency Depot',
      icon: '🚒',
      color: '#F59E0B',
      lng: Number((cLng + 0.28 * kmToDegLng).toFixed(6)),
      lat: Number((cLat + 0.24 * kmToDegLat).toFixed(6)),
      specs: 'Emergency Inflatable Boats & Rescue Cache'
    }
  ];
}
