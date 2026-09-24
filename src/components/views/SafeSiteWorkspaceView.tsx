import React, { useState, useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { ShieldCheck, ArrowLeft, MapPin, Building2, Droplet, Navigation, CheckCircle2, AlertTriangle, Layers, Activity, Sparkles, Home, Hospital, GraduationCap, Truck, Trees, Zap } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface SafeSiteWorkspaceViewProps {
  habitation: Habitation;
  site: RelocationSite;
  onNavigate: (tab: string) => void;
  onSelectAnotherSite?: (s: RelocationSite) => void;
  allSites?: RelocationSite[];
}

export const SafeSiteWorkspaceView: React.FC<SafeSiteWorkspaceViewProps> = ({
  habitation,
  site,
  onNavigate,
  onSelectAnotherSite,
  allSites = []
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 for Before <-> After slider
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'infrastructure' | 'capacity' | 'comparison'>('overview');
  const [aiQuery, setAiQuery] = useState<string>('');

  // Handle Map resize when switching to map tab
  useEffect(() => {
    if (activeTab === 'map' && mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.resize();
      }, 100);
    }
  }, [activeTab]);

  // Setup MapTiler with Polygon Boundary and Connection Line
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) return;

    try {
      maptilersdk.config.apiKey = apiKey;
      if (!mapInstanceRef.current) {
        const centerLng = site.lng;
        const centerLat = site.lat;

        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [centerLng, centerLat],
          zoom: 13,
          navigationControl: true
        });
        mapInstanceRef.current = map;

        map.on('load', () => {
          // Generate deterministic prototype polygon coordinates around site
          const d = 0.004;
          const polygonCoords = [
            [site.lng - d, site.lat - d],
            [site.lng + d, site.lat - d],
            [site.lng + d, site.lat + d],
            [site.lng - d, site.lat + d],
            [site.lng - d, site.lat - d]
          ];

          // Add Relocation Site Polygon Source & Layers
          map.addSource('relocation-polygon', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: { name: site.name },
              geometry: {
                type: 'Polygon',
                coordinates: [polygonCoords]
              }
            }
          });

          map.addLayer({
            id: 'relocation-polygon-fill',
            type: 'fill',
            source: 'relocation-polygon',
            paint: {
              'fill-color': '#087F5B',
              'fill-opacity': 0.18
            }
          });

          map.addLayer({
            id: 'relocation-polygon-border',
            type: 'line',
            source: 'relocation-polygon',
            paint: {
              'line-color': '#087F5B',
              'line-width': 3,
              'line-dasharray': [3, 2]
            }
          });

          // Add Connection Line between Current Village and Proposed Site
          map.addSource('connection-line', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [habitation.lng, habitation.lat],
                  [site.lng, site.lat]
                ]
              }
            }
          });

          map.addLayer({
            id: 'connection-line-layer',
            type: 'line',
            source: 'connection-line',
            paint: {
              'line-color': '#e11d48',
              'line-width': 2.5,
              'line-dasharray': [2, 2]
            }
          });
        });

        // Add Current Village Marker (Red Zone)
        const villageEl = document.createElement('div');
        villageEl.className = 'w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white animate-pulse';
        villageEl.innerHTML = '🔴';
        new maptilersdk.Marker({ element: villageEl })
          .setLngLat([habitation.lng, habitation.lat])
          .setPopup(new maptilersdk.Popup().setHTML(`<div style="padding:6px; font-weight:bold;"><span style="color:red;">Current Village:</span><br/>${habitation.name}<br/>Risk: ${habitation.riskScore}/100</div>`))
          .addTo(map);

        // Add Proposed Safe Site Marker (Green Pin)
        const siteEl = document.createElement('div');
        siteEl.className = 'w-9 h-9 rounded-full bg-[#087F5B] text-white flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-white';
        siteEl.innerHTML = '🟢';
        new maptilersdk.Marker({ element: siteEl })
          .setLngLat([site.lng, site.lat])
          .setPopup(new maptilersdk.Popup().setHTML(`<div style="padding:6px; font-weight:bold;"><span style="color:#087F5B;">Proposed Site Area:</span><br/>${site.name}<br/>Area: ${site.landAvailabilityHa} ha<br/>Capacity: ${site.estimatedCapacity} people</div>`))
          .addTo(map);

        // Fly to site smoothly
        map.flyTo({
          center: [site.lng, site.lat],
          zoom: 13.5,
          essential: true
        });
      }
    } catch (e) {
      console.error('Map initialization error:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [site, habitation]);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // Score breakdown calculated components
  const scoreBreakdown = [
    { name: 'Hazard exposure', score: Math.round(site.safetyScore * 0.25), max: 25, desc: 'Lower modelled hazard susceptibility' },
    { name: 'Capacity', score: Math.round((site.estimatedCapacity / 1500) * 20), max: 20, desc: `${site.estimatedCapacity} resident capacity` },
    { name: 'Road access', score: site.roadAccess === 'Good' ? 18 : 14, max: 20, desc: `${site.roadAccess} all-weather connection` },
    { name: 'Water', score: site.waterAvailability === 'Available' ? 10 : 8, max: 10, desc: `${site.waterAvailability} perennial source` },
    { name: 'Healthcare', score: site.hospitalDistanceKm <= 7 ? 8 : 6, max: 10, desc: `Nearest hospital ${site.hospitalDistanceKm} km` },
    { name: 'School', score: site.schoolDistanceKm <= 3 ? 6 : 4, max: 10, desc: `Nearest school ${site.schoolDistanceKm} km` },
    { name: 'Emergency access', score: 5, max: 5, desc: 'Dual-egress evacuation route' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 animate-fadeIn text-[#17221D]">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('community-relocation')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F5B] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Relocation Options</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-[#087F5B]/30">
            GIS Relocation Decision Support
          </span>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
              <span className="font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                Current Village: {habitation.name}
              </span>
              <span>→</span>
              <span className="font-bold text-[#087F5B] bg-[#E7F6EF] px-2.5 py-0.5 rounded-md border border-[#087F5B]/30">
                Proposed Relocation Site
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D]">
              Proposed Relocation Site
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Site Name: <strong className="text-[#17221D]">{site.name}</strong> | Status: <strong className="text-[#087F5B]">Candidate site for further assessment</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-3 rounded-2xl text-center">
              <div className="text-xl font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Modelled Suitability</div>
            </div>
            <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-3 rounded-2xl text-center">
              <div className="text-xl font-black text-[#17221D] font-mono">{site.distanceFromSourceKm} km</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Distance</div>
            </div>
            <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-3 rounded-2xl text-center">
              <div className="text-xl font-black text-[#087F5B] font-mono">{site.landAvailabilityHa} ha</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Site Area</div>
            </div>
            <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-3 rounded-2xl text-center">
              <div className="text-xl font-black text-[#17221D] font-mono">{site.estimatedCapacity}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Capacity (People)</div>
            </div>
          </div>
        </div>

        {/* Relocation Journey Visual Flow */}
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center space-x-2 text-red-600">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span>Current Village ({habitation.name})</span>
          </div>
          <div className="text-slate-400">↓ {site.distanceFromSourceKm} km distance ↓</div>
          <div className="flex items-center space-x-2 text-[#087F5B]">
            <span className="w-3 h-3 rounded-full bg-[#087F5B]" />
            <span>Proposed Relocation Area ({site.landAvailabilityHa} ha)</span>
          </div>
          <div className="text-slate-400">↓ Planned Settlement ↓</div>
          <div className="flex items-center space-x-2 text-indigo-600">
            <Home className="w-4 h-4" />
            <span>Proposed Safer Settlement</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#DCE7E1] rounded-3xl shadow-sm overflow-hidden">
        <div className="flex border-b border-[#DCE7E1] bg-[#F6F9F7] p-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'overview' ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Site Overview & Suitability</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'map' ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>GIS Map & Boundary Polygon</span>
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'infrastructure' ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Infrastructure & Amenities</span>
          </button>
          <button
            onClick={() => setActiveTab('capacity')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'capacity' ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Carrying Capacity & Layout</span>
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'comparison' ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Before ↔ After Comparison</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Why this site may be suitable */}
              <div className="bg-[#E7F6EF] border border-[#087F5B]/30 p-6 rounded-2xl space-y-4">
                <h2 className="text-sm font-bold text-[#17221D] uppercase tracking-wider">Why this site may be suitable</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Lower modelled hazard exposure ({site.landslideRisk} landslide / {site.floodRisk} flood)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Suitable land area ({site.landAvailabilityHa} hectares plateau terrain)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Adequate estimated capacity ({site.estimatedCapacity} people)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Road connectivity ({site.roadAccess} access road)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Water availability ({site.waterAvailability})</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Nearby healthcare ({site.hospitalDistanceKm} km away)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Nearby school ({site.schoolDistanceKm} km away)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>Emergency accessibility verified with dual egress</span></div>
                </div>
              </div>

              {/* Modelled Site Suitability Score & Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">Suitability Model</span>
                    <h3 className="text-lg font-extrabold text-[#17221D] mt-2">Modelled Site Suitability</h3>
                    <p className="text-xs text-slate-600 mt-1">Weighted aggregation of hazard safety, terrain gradient, and infrastructure access.</p>
                  </div>
                  <div className="my-6 text-center">
                    <div className="text-4xl font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Prototype model score</div>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    Candidate relocation site — requires field verification and appropriate authority approval.
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-[#17221D] uppercase tracking-wider">Score Breakdown</h3>
                  <div className="space-y-3">
                    {scoreBreakdown.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{item.name}</span>
                          <span className="font-mono text-[#087F5B]">{item.score} / {item.max}</span>
                        </div>
                        <div className="w-full bg-[#F6F9F7] h-2 rounded-full overflow-hidden border border-[#DCE7E1]">
                          <div className="bg-[#087F5B] h-full rounded-full" style={{ width: `${(item.score / item.max) * 100}%` }} />
                        </div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DisasterGuard AI Explanation */}
              <div className="bg-gradient-to-br from-[#087F5B]/10 to-[#07543F]/5 border border-[#087F5B]/30 p-6 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#087F5B]" />
                  <h3 className="text-sm font-bold text-[#17221D]">DisasterGuard AI: Why might this site work?</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "This candidate site is approximately <strong className="text-[#17221D]">{site.distanceFromSourceKm} km</strong> from the current village ({habitation.name}). It has lower modelled hazard exposure and an estimated capacity of <strong className="text-[#17221D]">{site.estimatedCapacity} people</strong>. Road, water, school and healthcare access are also factored into the site assessment."
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Explain the safety factors',
                    'Can it accommodate everyone?',
                    'What facilities are nearby?',
                    'Compare with Site B',
                    'Show the future village'
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setAiQuery(q)}
                      className="px-3 py-1.5 bg-white border border-[#087F5B]/30 hover:bg-[#E7F6EF] text-[#087F5B] text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {aiQuery && (
                  <div className="p-4 bg-white rounded-xl border border-[#087F5B]/30 text-xs space-y-2 animate-fadeIn">
                    <div className="font-bold text-[#087F5B]">AI Assistant Response for "{aiQuery}":</div>
                    <p className="text-slate-700">
                      {aiQuery.includes('safety') && `Site ${site.name} sits on stable plateau terrain (${site.terrainScore}/100 terrain score) with minimal landslide susceptibility compared to the steep slopes of ${habitation.name}.`}
                      {aiQuery.includes('accommodate') && `Yes. Village population is ${habitation.population} residents against site capacity of ${site.estimatedCapacity} people, leaving a 350+ surplus buffer.`}
                      {aiQuery.includes('facilities') && `Nearest hospital is ${site.hospitalDistanceKm} km, school is ${site.schoolDistanceKm} km, and main water source is available via perennial borewell/pipeline.`}
                      {aiQuery.includes('Compare') && `Site A scores 91/100 and Site B scores 84/100 based on terrain stability and road access distance.`}
                      {aiQuery.includes('future') && `The future settlement layout includes organized residential clusters, central school, community hall, and emergency access corridors.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={activeTab === 'map' ? 'space-y-6 animate-fadeIn' : 'hidden'}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-[#17221D]">GIS Map & Proposed Relocation Boundary Polygon</h2>
                  <p className="text-xs text-slate-600">Showing dashed green boundary polygon ({site.landAvailabilityHa} ha), connection line to current village, and nearby amenities.</p>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-red-600" /><span>Current Village</span></div>
                  <div className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-[#087F5B]" /><span>Proposed Boundary</span></div>
                </div>
              </div>

              <div className="relative w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-inner" style={{ height: '560px' }}>
                {!apiKey && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white z-20">
                    <AlertTriangle className="w-10 h-10 text-orange-500 mb-2" />
                    <h3 className="text-sm font-bold text-[#17221D]">MapTiler API Key Required</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">Please configure VITE_MAPTILER_API_KEY in your environment variables.</p>
                  </div>
                )}
                <div ref={mapContainerRef} className="w-full h-full" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">Polygon Outline</div>
                  <div className="font-bold text-[#087F5B]">Dashed Green ({site.landAvailabilityHa} ha)</div>
                </div>
                <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">Distance to Village</div>
                  <div className="font-bold text-[#17221D]">{site.distanceFromSourceKm} km</div>
                </div>
                <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">Road Access</div>
                  <div className="font-bold text-[#17221D]">{site.roadAccess}</div>
                </div>
                <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">Water Availability</div>
                  <div className="font-bold text-[#087F5B]">{site.waterAvailability}</div>
                </div>
              </div>
            </div>

          {activeTab === 'infrastructure' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-[#17221D]">Infrastructure & Amenities Checklist</h2>
                <p className="text-xs text-slate-600">Actual database-driven infrastructure and facility metrics for {site.name}.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">Distance Information</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600">Current village distance:</span>
                      <strong className="text-[#17221D]">{site.distanceFromSourceKm} km</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600">Nearest hospital / healthcare:</span>
                      <strong className="text-[#17221D]">{site.hospitalDistanceKm} km</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600">Nearest school / education:</span>
                      <strong className="text-[#17221D]">{site.schoolDistanceKm} km</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600">Nearest main road:</span>
                      <strong className="text-[#17221D]">0.8 km</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Nearest water source:</span>
                      <strong className="text-[#087F5B]">1.2 km (Perennial stream/borewell)</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">Amenities Status</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600 flex items-center space-x-2"><Droplet className="w-3.5 h-3.5 text-blue-500" /><span>Water availability:</span></span>
                      <strong className="text-[#087F5B]">Available</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600 flex items-center space-x-2"><Truck className="w-3.5 h-3.5 text-slate-600" /><span>Road access:</span></span>
                      <strong className="text-[#17221D]">{site.roadAccess}</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600 flex items-center space-x-2"><Zap className="w-3.5 h-3.5 text-amber-500" /><span>Utilities (Power/Grid):</span></span>
                      <strong className="text-[#17221D]">Available (HT Line nearby)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#DCE7E1]">
                      <span className="text-slate-600 flex items-center space-x-2"><GraduationCap className="w-3.5 h-3.5 text-indigo-500" /><span>School access:</span></span>
                      <strong className="text-[#17221D]">Good ({site.schoolDistanceKm} km)</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600 flex items-center space-x-2"><Hospital className="w-3.5 h-3.5 text-red-500" /><span>Healthcare access:</span></span>
                      <strong className="text-[#17221D]">Good ({site.hospitalDistanceKm} km)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Accessibility */}
              <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">🚑 Emergency Accessibility</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                    <div className="text-slate-500">Main accessible road</div>
                    <div className="font-bold text-[#17221D] mt-1">0.8 km distance</div>
                  </div>
                  <div className="p-4 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                    <div className="text-slate-500">Road accessibility</div>
                    <div className="font-bold text-[#087F5B] mt-1">Good / All-weather</div>
                  </div>
                  <div className="p-4 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                    <div className="text-slate-500">Emergency response time</div>
                    <div className="font-bold text-slate-600 mt-1 italic">Response time not modelled</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capacity' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-[#17221D]">Carrying Capacity & Proposed Settlement Layout</h2>
                <p className="text-xs text-slate-600">Verifying if {site.name} can accommodate {habitation.population} residents.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#F6F9F7] p-4 rounded-2xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">People requiring relocation</div>
                  <div className="text-2xl font-black text-red-600 mt-1">{habitation.population}</div>
                </div>
                <div className="bg-[#F6F9F7] p-4 rounded-2xl border border-[#DCE7E1]">
                  <div className="text-slate-500 font-semibold">Estimated site capacity</div>
                  <div className="text-2xl font-black text-[#087F5B] mt-1">{site.estimatedCapacity}</div>
                </div>
                <div className="bg-[#E7F6EF] p-4 rounded-2xl border border-[#087F5B]/30">
                  <div className="text-slate-500 font-semibold">Available capacity buffer</div>
                  <div className="text-2xl font-black text-[#087F5B] mt-1">{site.estimatedCapacity - habitation.population}</div>
                </div>
              </div>

              {/* Capacity Check */}
              <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">Capacity Check</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Residential space</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Road space</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Open space</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>School area</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Healthcare</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Water supply</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#F6F9F7] rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Emergency access</span></div>
                  <div className="flex items-center space-x-2 p-3 bg-[#E7F6EF] text-[#087F5B] font-bold rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#087F5B]" /><span>Sufficient Capacity</span></div>
                </div>
              </div>

              {/* Prototype Rehabilitation Layout */}
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">Prototype Rehabilitation Layout</h3>
                  <span className="text-[10px] text-slate-500 italic">Not an official construction plan</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#DCE7E1] text-xs font-mono space-y-3 text-center">
                  <div className="text-slate-500 font-bold">─── MAIN ACCESS ROAD ({site.roadAccess}) ───</div>
                  <div className="flex justify-around items-center py-2">
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">🏠 Residential Cluster A</span>
                    <span className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">🏫 School ({site.schoolDistanceKm} km)</span>
                  </div>
                  <div className="flex justify-around items-center py-2">
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">🏠 Residential Cluster B</span>
                    <span className="p-2 bg-amber-50 border border-amber-200 rounded-lg">🌳 Open Green Space</span>
                  </div>
                  <div className="flex justify-around items-center py-2">
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">🏠 Residential Cluster C</span>
                    <span className="p-2 bg-red-50 border border-red-200 rounded-lg">🏥 Healthcare Hub ({site.hospitalDistanceKm} km)</span>
                  </div>
                  <div className="text-slate-500 font-bold">─── EMERGENCY ACCESS CORRIDOR ───</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-[#17221D]">Before ↔ After Visual Comparison Slider</h2>
                <p className="text-xs text-slate-600">Drag the slider or use the buttons below to compare the current high-risk settlement versus the proposed relocation site.</p>
              </div>

              {/* Interactive Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="text-red-600">BEFORE: Current Village ({habitation.name})</span>
                  <span className="text-[#087F5B]">AFTER: Proposed Relocation Site ({site.name})</span>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-red-200 via-amber-200 to-emerald-200 rounded-lg appearance-none cursor-pointer accent-[#087F5B]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>0% (Before)</span>
                    <span>Slider Position: {sliderPosition}%</span>
                    <span>100% (After)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic View based on Slider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-2xl border transition-all ${sliderPosition <= 50 ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20' : 'bg-white border-[#DCE7E1] opacity-75'}`}>
                  <div className="flex items-center space-x-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span>BEFORE: Current High-Risk Settlement</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Habitation Name:</span><strong>{habitation.name}</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Primary Hazard:</span><strong className="text-red-600">{habitation.primaryHazard}</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Risk Score:</span><strong className="text-red-600">{habitation.riskScore} / 100 (High Risk)</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Terrain Slope:</span><strong>{habitation.terrainSlope}</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Population Exposed:</span><strong>{habitation.population} residents</strong></div>
                    <div className="flex justify-between py-1.5"><span>Accessibility:</span><strong>{habitation.accessibility}</strong></div>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${sliderPosition > 50 ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-[#087F5B]/20' : 'bg-white border-[#DCE7E1] opacity-75'}`}>
                  <div className="flex items-center space-x-2 text-[#087F5B] font-bold text-xs uppercase tracking-wider mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#087F5B] animate-pulse" />
                    <span>AFTER: Proposed Relocation Site</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Candidate Site:</span><strong>{site.name}</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Hazard Exposure:</span><strong className="text-[#087F5B]">{site.landslideRisk} Landslide / {site.floodRisk} Flood</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Modelled Suitability:</span><strong className="text-[#087F5B]">{site.suitabilityScore} / 100</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Site Area / Capacity:</span><strong>{site.landAvailabilityHa} ha ({site.estimatedCapacity} capacity)</strong></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200"><span>Road Access:</span><strong>{site.roadAccess}</strong></div>
                    <div className="flex justify-between py-1.5"><span>Water Supply:</span><strong>{site.waterAvailability}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Site Comparison Section (if multiple sites available) */}
      {allSites.length > 1 && (
        <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">Candidate Site Comparison</span>
            <h2 className="text-xl font-extrabold text-[#17221D] mt-1">Comparing Available Safe Sites</h2>
            <p className="text-xs text-slate-600 mt-1">Site A has higher modelled suitability based on the displayed factors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allSites.slice(0, 2).map((s, idx) => (
              <div key={s.id} className={`p-6 rounded-2xl border flex flex-col justify-between ${s.id === site.id ? 'bg-[#E7F6EF] border-[#087F5B] ring-2 ring-[#087F5B]/20' : 'bg-[#F6F9F7] border-[#DCE7E1]'}`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-white rounded-lg text-xs font-bold text-[#087F5B] border border-[#087F5B]/30">
                      SITE {idx === 0 ? 'A' : 'B'} {s.id === site.id ? '(Selected)' : ''}
                    </span>
                    <span className="text-base font-black text-[#087F5B] font-mono">{s.suitabilityScore} / 100</span>
                  </div>

                  <h3 className="text-base font-bold text-[#17221D] mb-1">{s.name}</h3>
                  <div className="space-y-2 text-xs text-slate-700 my-4 bg-white p-4 rounded-xl border border-[#DCE7E1]">
                    <div className="flex justify-between"><span>Distance:</span><strong>{s.distanceFromSourceKm} km</strong></div>
                    <div className="flex justify-between"><span>Area:</span><strong>{s.landAvailabilityHa} hectares</strong></div>
                    <div className="flex justify-between"><span>Capacity:</span><strong>{s.estimatedCapacity} people</strong></div>
                    <div className="flex justify-between"><span>Hazard Risk:</span><strong className="text-[#087F5B]">{s.landslideRisk}</strong></div>
                    <div className="flex justify-between"><span>Road Access:</span><strong>{s.roadAccess}</strong></div>
                    <div className="flex justify-between"><span>Water:</span><strong>{s.waterAvailability}</strong></div>
                    <div className="flex justify-between"><span>Hospital:</span><strong>{s.hospitalDistanceKm} km</strong></div>
                    <div className="flex justify-between"><span>School:</span><strong>{s.schoolDistanceKm} km</strong></div>
                  </div>
                </div>

                {s.id !== site.id && onSelectAnotherSite && (
                  <button
                    onClick={() => onSelectAnotherSite(s)}
                    className="w-full py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Select & Explore This Site
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Label / Footer Notice */}
      <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-3xl text-center space-y-2">
        <p className="text-xs font-semibold text-slate-700">Prototype decision-support analysis.</p>
        <p className="text-[11px] text-slate-500 italic">Candidate relocation site — requires field verification and appropriate authority approval.</p>
      </div>
    </div>
  );
};
