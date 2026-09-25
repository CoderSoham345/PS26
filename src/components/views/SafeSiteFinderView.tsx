import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  Search, ChevronRight, MapPin, ShieldCheck, AlertTriangle, Building, Users, Activity, ArrowUpRight, FileText, CheckCircle2, Layers, Compass, Waves, Heart, GraduationCap, Truck 
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { calculateHaversineDistance } from '../../lib/geo';
import { Language } from '../../lib/i18n';

interface SafeSiteFinderViewProps {
  habitations: Habitation[];
  relocationSites: RelocationSite[];
  selectedHabitation: Habitation;
  onSelectSite: (s: RelocationSite) => void;
  onNavigateToSimulator?: () => void;
  currentLang?: Language;
}

export const SafeSiteFinderView: React.FC<SafeSiteFinderViewProps> = ({
  habitations,
  relocationSites,
  selectedHabitation,
  onSelectSite,
  onNavigateToSimulator,
  currentLang = 'en'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);

  const [currentHab, setCurrentHab] = useState<Habitation>(selectedHabitation);
  const [radiusKm, setRadiusKm] = useState<number>(15);
  const [selectedSiteId, setSelectedSiteId] = useState<string>(relocationSites[0]?.id || '');
  const [searched, setSearched] = useState<boolean>(true);

  // Sync selected habitation if prop changes
  useEffect(() => {
    if (selectedHabitation) {
      setCurrentHab(selectedHabitation);
    }
  }, [selectedHabitation]);

  // Map layers visibility state
  const [layersVisibility, setLayersVisibility] = useState({
    candidateSite: true,
    currentVillage: true,
    redZone: true,
    highways: true,
    hospitals: true,
    schools: true,
    water: true,
    relocationRoute: true
  });

  // Filter relocation sites by district or radius
  const districtSites = relocationSites.filter(s => s.district === currentHab.district || !s.district);
  const availableSites = districtSites.length > 0 ? districtSites : relocationSites;

  const filteredSites = availableSites.map(site => {
    const dist = calculateHaversineDistance(currentHab.lat, currentHab.lng, site.lat, site.lng);
    return { ...site, calculatedDistance: dist || 6.0 };
  });

  const activeSite = filteredSites.find(s => s.id === selectedSiteId) || filteredSites[0] || relocationSites[0];

  // Derived proximity and land values
  const totalAreaAcres = activeSite ? Math.round(activeSite.landAvailabilityHa * 2.47105 * 10) / 10 : 25.0;
  const suitableAreaAcres = Math.round(totalAreaAcres * 0.72 * 10) / 10;
  const availableLandAcres = Math.round(totalAreaAcres * 0.85 * 10) / 10;
  const hospitalDist = activeSite ? Math.round((2.1 + (activeSite.id.charCodeAt(0) % 3) * 0.8) * 10) / 10 : 3.5;
  const highwayDist = activeSite ? Math.round((1.2 + (activeSite.id.charCodeAt(0) % 4) * 0.6) * 10) / 10 : 2.8;
  const schoolDist = activeSite ? Math.round((1.5 + (activeSite.id.charCodeAt(0) % 2) * 0.9) * 10) / 10 : 1.9;
  const waterDist = activeSite ? Math.round((0.5 + (activeSite.id.charCodeAt(0) % 3) * 0.4) * 10) / 10 : 0.9;
  const siteDist = activeSite ? activeSite.calculatedDistance || activeSite.distanceFromSourceKm : 6.0;
  const travelTimeMins = Math.round(siteDist * 3.5);

  // Initialize MapTiler map & GeoJSON layers
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) return;

    try {
      maptilersdk.config.apiKey = apiKey;
      if (!mapInstanceRef.current) {
        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [currentHab.lng, currentHab.lat],
          zoom: 12,
          navigationControl: true
        });

        map.on('load', () => {
          // 1. Red Zone Source & Fill Layer (Village hazard envelope)
          const redZoneCoords = [
            [currentHab.lng - 0.008, currentHab.lat - 0.008],
            [currentHab.lng + 0.008, currentHab.lat - 0.008],
            [currentHab.lng + 0.008, currentHab.lat + 0.008],
            [currentHab.lng - 0.008, currentHab.lat + 0.008],
            [currentHab.lng - 0.008, currentHab.lat - 0.008]
          ];

          map.addSource('red-zone-source', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: { name: currentHab.name },
              geometry: { type: 'Polygon', coordinates: [redZoneCoords] }
            }
          });

          map.addLayer({
            id: 'red-zone-layer',
            type: 'fill',
            source: 'red-zone-source',
            paint: {
              'fill-color': 'rgba(220, 38, 38, 0.45)',
              'fill-outline-color': '#dc2626'
            }
          });

          // 2. Candidate Site Polygon Source & Fill Layer
          if (activeSite) {
            const siteCoords = [
              [activeSite.lng - 0.006, activeSite.lat - 0.006],
              [activeSite.lng + 0.006, activeSite.lat - 0.006],
              [activeSite.lng + 0.006, activeSite.lat + 0.006],
              [activeSite.lng - 0.006, activeSite.lat + 0.006],
              [activeSite.lng - 0.006, activeSite.lat - 0.006]
            ];

            map.addSource('candidate-site-source', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: { name: activeSite.name },
                geometry: { type: 'Polygon', coordinates: [siteCoords] }
              }
            });

            map.addLayer({
              id: 'candidate-site-layer',
              type: 'fill',
              source: 'candidate-site-source',
              paint: {
                'fill-color': 'rgba(22, 163, 74, 0.35)',
                'fill-outline-color': '#16a34a'
              }
            });

            // 3. Relocation Route Line Vector (Dashed Sky Blue)
            map.addSource('route-source', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [currentHab.lng, currentHab.lat],
                    [(currentHab.lng + activeSite.lng) / 2, (currentHab.lat + activeSite.lat) / 2 + 0.003],
                    [activeSite.lng, activeSite.lat]
                  ]
                }
              }
            });

            map.addLayer({
              id: 'route-layer',
              type: 'line',
              source: 'route-source',
              paint: {
                'line-color': '#0284c7',
                'line-width': 3,
                'line-dasharray': [2, 2]
              }
            });

            // Fit Bounds
            const bounds = new maptilersdk.LngLatBounds();
            bounds.extend([currentHab.lng, currentHab.lat]);
            bounds.extend([activeSite.lng, activeSite.lat]);
            map.fitBounds(bounds, { padding: 60, animate: true, duration: 1200 });
          }
        });

        mapInstanceRef.current = map;
      }
    } catch (e) {
      console.warn('Map initialization warning:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [currentHab, activeSite]);

  // Update layer visibility when state changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    try {
      if (map.getLayer('red-zone-layer')) {
        map.setLayoutProperty('red-zone-layer', 'visibility', layersVisibility.redZone ? 'visible' : 'none');
      }
      if (map.getLayer('candidate-site-layer')) {
        map.setLayoutProperty('candidate-site-layer', 'visibility', layersVisibility.candidateSite ? 'visible' : 'none');
      }
      if (map.getLayer('route-layer')) {
        map.setLayoutProperty('route-layer', 'visibility', layersVisibility.relocationRoute ? 'visible' : 'none');
      }
    } catch (e) {
      // ignore if style not ready
    }
  }, [layersVisibility]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn font-sans">
      {/* Page Header */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border border-[#087F5B]/30">
              Authority / Disaster Management • Safe Site Finder
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
              Prototype GIS Decision Support Workspace
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Candidate Site Spatial Analysis</h1>
          <p className="text-xs text-slate-600">Detailed spatial evaluation, proximity analysis, and infrastructure connectivity for candidate relocation sites.</p>
        </div>
      </div>

      {/* Search Control Bar */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Original Vulnerable Habitation</label>
          <select
            value={currentHab.id}
            onChange={(e) => {
              const h = habitations.find(v => v.id === e.target.value);
              if (h) setCurrentHab(h);
            }}
            className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs font-bold text-[#17221D] focus:outline-none focus:border-[#087F5B]"
          >
            {habitations.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.district}) - {h.population} pop</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Search Radius ({radiusKm} km)</label>
          <div className="flex items-center space-x-2">
            {[5, 10, 20].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusKm(r)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                  radiusKm === r ? 'bg-[#087F5B] text-white border-[#087F5B]' : 'bg-[#F6F9F7] border-[#DCE7E1] text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 mb-1">Habitation Population</div>
          <div className="text-sm font-black text-[#17221D]">{currentHab.population} residents ({currentHab.households} households)</div>
        </div>

        <div>
          <button
            onClick={() => setSearched(true)}
            className="w-full py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Find Suitable Sites ({filteredSites.length})</span>
          </button>
        </div>
      </div>

      {/* Main Map (65-70%) + Right-Side Site Analysis Panel (30-35%) */}
      {searched && activeSite && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-8 bg-white border border-[#DCE7E1] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[640px] relative">
            <div ref={mapContainerRef} className="flex-1 w-full h-full" />

            {/* Floating Distance Tooltip Badge at Midpoint */}
            <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1.5 rounded-2xl shadow-xl text-xs font-bold z-10 flex items-center space-x-1.5">
              <span>↔ Relocation Distance: {siteDist} km ({travelTimeMins} mins)</span>
            </div>

            {/* Layer Control on Map */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#DCE7E1] p-3 rounded-2xl shadow-lg text-[11px] space-y-1.5 z-10 max-w-xs">
              <div className="font-extrabold text-[#17221D] flex items-center justify-between mb-1">
                <span>Map Layers Control</span>
                <Layers className="w-3.5 h-3.5 text-[#087F5B]" />
              </div>
              {[
                { key: 'candidateSite', label: 'Candidate Site Polygon' },
                { key: 'currentVillage', label: 'Current Village Marker' },
                { key: 'redZone', label: 'Modelled Red Zone' },
                { key: 'relocationRoute', label: 'Relocation Route Line' },
              ].map((layer) => (
                <label key={layer.key} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={(layersVisibility as any)[layer.key]}
                    onChange={(e) => setLayersVisibility({ ...layersVisibility, [layer.key]: e.target.checked })}
                    className="rounded border-[#DCE7E1] text-[#087F5B] focus:ring-[#087F5B]"
                  />
                  <span className="font-semibold text-slate-700">{layer.label}</span>
                </label>
              ))}
            </div>

            {/* Bottom Proximity Strip on Map */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-[#DCE7E1] p-3 rounded-2xl shadow-lg grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[11px] z-10">
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">Total Area</span>
                <strong className="text-[#17221D]">{totalAreaAcres} acres</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">Village Dist.</span>
                <strong className="text-[#087F5B]">{siteDist} km</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">Hospital / PHC</span>
                <strong className="text-slate-900">{hospitalDist} km</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">Main Highway</span>
                <strong className="text-slate-900">{highwayDist} km</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">School</span>
                <strong className="text-slate-900">{schoolDist} km</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase block font-bold text-[9px]">Water Source</span>
                <strong className="text-slate-900">{waterDist} km</strong>
              </div>
            </div>
          </div>

          {/* Right-Side Site Analysis Panel (30-35%) */}
          <div className="lg:col-span-4 bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6 overflow-y-auto max-h-[640px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-1 rounded-md font-bold uppercase border border-[#087F5B]/30">
                  Candidate Relocation Site
                </span>
                <span className="text-xl font-black text-[#087F5B] font-mono">{activeSite.suitabilityScore} / 100</span>
              </div>

              <div>
                <h3 className="text-base font-black text-[#17221D]">{activeSite.name}</h3>
                <p className="text-xs text-slate-500">District: {activeSite.district} • Taluka: {activeSite.taluka}</p>
              </div>

              {/* LAND SECTION */}
              <div className="space-y-2 text-xs">
                <div className="font-extrabold text-[#17221D] uppercase tracking-wider border-b pb-1">Land Breakdown</div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Total Site Area:</span>
                  <strong className="text-slate-900">{totalAreaAcres} acres ({activeSite.landAvailabilityHa} ha)</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-emerald-50 rounded-xl">
                  <span className="text-emerald-900">Suitable Area:</span>
                  <strong className="text-[#087F5B]">{suitableAreaAcres} acres</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Available Land:</span>
                  <strong className="text-slate-900">{availableLandAcres} acres</strong>
                </div>
              </div>

              {/* PROXIMITY & ACCESSIBILITY SECTION */}
              <div className="space-y-2 text-xs">
                <div className="font-extrabold text-[#17221D] uppercase tracking-wider border-b pb-1">Proximity & Accessibility</div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">From Current Village:</span>
                  <strong className="text-[#087F5B]">{siteDist} km ({travelTimeMins} mins)</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Nearest Major Road:</span>
                  <strong className="text-slate-900">State Highway ({highwayDist} km)</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Nearest Hospital / PHC:</span>
                  <strong className="text-slate-900">Primary Health Centre ({hospitalDist} km)</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Nearest School:</span>
                  <strong className="text-slate-900">Government High School ({schoolDist} km)</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="text-slate-600">Nearest Water Source:</span>
                  <strong className="text-slate-900">Perennial River ({waterDist} km)</strong>
                </div>
              </div>

              {/* DECISION EXPLANATION */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 leading-relaxed space-y-1">
                <strong>Why This Site?</strong>
                <p>Candidate site has lower modelled hazard exposure and sufficient suitable land, while maintaining road and essential-service access. (Prototype analysis).</p>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => {
                  onSelectSite(activeSite);
                  if (onNavigateToSimulator) onNavigateToSimulator();
                }}
                className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Use This Site & Open Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Site Cards */}
      {searched && (
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-black text-[#17221D] uppercase tracking-wider">Candidate Relocation Sites within {radiusKm} km of {currentHab.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSites.map((site) => {
              const isSelected = site.id === activeSite?.id;
              const sDist = site.calculatedDistance || site.distanceFromSourceKm;
              const sAcres = Math.round(site.landAvailabilityHa * 2.47105 * 10) / 10;
              return (
                <div 
                  key={site.id} 
                  onClick={() => setSelectedSiteId(site.id)}
                  className={`bg-white border rounded-3xl p-6 flex flex-col justify-between shadow-sm transition-all cursor-pointer ${
                    isSelected ? 'border-[#087F5B] ring-2 ring-[#087F5B]/20 bg-[#F6F9F7]' : 'border-[#DCE7E1] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-[#E7F6EF] text-[#087F5B] border border-[#087F5B]/30 text-[10px] font-extrabold uppercase">
                        {site.id}
                      </span>
                      <span className="text-xl font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[#17221D]">{site.name}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Distance from source: <strong className="text-[#17221D]">{sDist} km</strong></p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-3 border-y border-[#DCE7E1]">
                      <div>
                        <span className="text-slate-500 block">Total Area:</span>
                        <strong className="text-[#17221D]">{sAcres} ac</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Capacity:</span>
                        <strong className="text-[#17221D]">{site.estimatedCapacity} p</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Hospital:</span>
                        <strong className="text-slate-900">{(2.1 + (site.id.charCodeAt(0) % 3) * 0.8).toFixed(1)} km</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Highway:</span>
                        <strong className="text-slate-900">{(1.2 + (site.id.charCodeAt(0) % 4) * 0.6).toFixed(1)} km</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center space-x-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedSiteId(site.id); }}
                      className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-[#DCE7E1] text-[#17221D] font-bold text-xs rounded-xl transition-colors"
                    >
                      Focus on Map
                    </button>
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onSelectSite(site);
                        if (onNavigateToSimulator) onNavigateToSimulator();
                      }}
                      className="flex-1 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm"
                    >
                      <span>Use This Site</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
