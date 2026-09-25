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

export interface SettlementFacility {
  id: string;
  type: 'residential' | 'road' | 'school' | 'healthcare' | 'open_space' | 'water' | 'utility' | 'emergency';
  name: string;
  lat: number;
  lng: number;
  areaAcres: number;
}

export function generateDeterministicLayout(centerLat: number, centerLng: number, totalAcres: number): SettlementFacility[] {
  const facilities: SettlementFacility[] = [];
  const latOffset = 0.0025;
  const lngOffset = 0.0025;

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    facilities.push({
      id: `res-${i}`,
      type: 'residential',
      name: `Residential Cluster Sector ${i + 1}`,
      lat: centerLat + Math.sin(angle) * latOffset,
      lng: centerLng + Math.cos(angle) * lngOffset,
      areaAcres: Math.round(totalAcres * 0.11 * 10) / 10
    });
  }

  facilities.push({
    id: 'school-1',
    type: 'school',
    name: 'Planned Community School & Evacuation Centre',
    lat: centerLat + latOffset * 0.8,
    lng: centerLng - lngOffset * 0.5,
    areaAcres: Math.round(totalAcres * 0.08 * 10) / 10
  });

  facilities.push({
    id: 'health-1',
    type: 'healthcare',
    name: 'Primary Health Sub-Centre',
    lat: centerLat - latOffset * 0.8,
    lng: centerLng + lngOffset * 0.5,
    areaAcres: Math.round(totalAcres * 0.05 * 10) / 10
  });

  facilities.push({
    id: 'open-1',
    type: 'open_space',
    name: 'Central Assembly & Disaster Evacuation Ground',
    lat: centerLat,
    lng: centerLng,
    areaAcres: Math.round(totalAcres * 0.15 * 10) / 10
  });

  facilities.push({
    id: 'water-1',
    type: 'water',
    name: 'Overhead Water Tank & Purification Plant',
    lat: centerLat + latOffset * 1.1,
    lng: centerLng + lngOffset * 1.1,
    areaAcres: Math.round(totalAcres * 0.04 * 10) / 10
  });

  return facilities;
}
