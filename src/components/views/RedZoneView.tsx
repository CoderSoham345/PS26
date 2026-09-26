import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Layers, 
  MapPin, FileText, Bot, Activity, ArrowUpRight, TrendingDown, TrendingUp, 
  Building, Users, ShieldCheck, Waves, Mountain, Compass, Maximize2, RotateCcw,
  Eye, EyeOff, Info, AlertOctagon, HelpCircle
} from 'lucide-react';
import { Habitation } from '../../types';
import { Language } from '../../lib/i18n';
import { RedZoneReportModal } from '../modals/RedZoneReportModal';
import { 
  generateModelledRedZoneGeoJson, 
  generateRedZoneBufferGeoJson, 
  calculateGeoJsonBounds 
} from '../../lib/geo';

interface RedZoneViewProps {
  selectedVillage: Habitation;
  onNavigateToPlanner: () => void;
  currentLang?: Language;
}

export const RedZoneView: React.FC<RedZoneViewProps> = ({ 
  selectedVillage, 
  onNavigateToPlanner,
  currentLang = 'en' 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);
  const markerRef = useRef<maptilersdk.Marker | null>(null);
  const popupRef = useRef<maptilersdk.Popup | null>(null);

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [mapStyleType, setMapStyleType] = useState<'streets' | 'satellite' | 'topo'>('streets');
  const [showBuffer, setShowBuffer] = useState<boolean>(true);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Derived metrics for Modelled Red Zone
  const radiusKm = 0.5 + (selectedVillage.riskScore / 100) * 0.7;
  const areaSqKm = Math.round(Math.PI * radiusKm * radiusKm * 10) / 10;
  const areaHectares = Math.round(areaSqKm * 100);
  const bufferAreaSqKm = Math.round(Math.PI * (radiusKm + 0.2) * (radiusKm + 0.2) * 10) / 10;
  const roadsExposed = selectedVillage.infrastructureExposure?.roadsKm || 3.2;
  const schoolsExposed = selectedVillage.infrastructureExposure?.schools || 0;
  const hospitalsExposed = selectedVillage.infrastructureExposure?.hospitals || 0;

  // Helper to build custom HTML element for Red Zone Badge Marker
  const createBadgeElement = (village: Habitation) => {
    const el = document.createElement('div');
    el.className = 'redzone-badge-marker group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 select-none';
    el.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(8px); border: 2.5px solid #DC3545; box-shadow: 0 10px 25px -5px rgba(220, 53, 69, 0.4), 0 8px 10px -6px rgba(0,0,0,0.1); border-radius: 14px; padding: 6px 12px; text-align: center; min-width: 130px;">
        <div style="font-size: 8.5px; font-weight: 900; letter-spacing: 0.08em; color: #B91C1C; text-transform: uppercase; line-height: 1.2;">
          AI-MODELLED RED ZONE
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 5px; margin-top: 2px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #DC3545; display: inline-block; box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);"></span>
          <span style="font-size: 13px; font-weight: 900; color: #17221D; letter-spacing: -0.01em;">${village.name}</span>
        </div>
        <div style="font-size: 9px; font-weight: 700; color: #DC3545; margin-top: 2px;">
          Risk: ${village.riskScore}/100 • ${village.primaryHazard}
        </div>
      </div>
    `;
    return el;
  };

  // Helper to construct popup HTML
  const buildPopupHtml = (village: Habitation) => {
    return `
      <div style="font-family: inherit; padding: 4px; color: #17221D; max-width: 260px;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #DCE7E1; padding-bottom: 6px; margin-bottom: 8px;">
          <span style="font-size: 9px; font-weight: 900; color: #DC3545; text-transform: uppercase; letter-spacing: 0.05em; background: #FEE2E2; padding: 2px 6px; border-radius: 6px;">
            AI-Modelled Red Zone
          </span>
          <span style="font-size: 11px; font-weight: 900; color: #B91C1C;">
            ${village.riskScore}/100
          </span>
        </div>
        <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #17221D;">
          ${village.name} (${village.taluka})
        </h4>
        <p style="font-size: 10px; color: #64748B; margin: 0 0 8px 0; line-height: 1.3;">
          Primary Hazard: <strong>${village.primaryHazard}</strong> • Priority: <strong>${village.relocationPriority}</strong>
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 6px; font-size: 10px; margin-bottom: 8px;">
          <div><span style="color: #64748B;">Population:</span><br/><strong>${village.population} residents</strong></div>
          <div><span style="color: #64748B;">Houses:</span><br/><strong>${village.households} units</strong></div>
          <div><span style="color: #64748B;">Area:</span><br/><strong>${areaSqKm} km² (${areaHectares} Ha)</strong></div>
          <div><span style="color: #64748B;">Roads Exposed:</span><br/><strong>${roadsExposed} km</strong></div>
        </div>
        <p style="font-size: 8.5px; color: #94A3B8; font-style: italic; margin: 0; line-height: 1.2;">
          Prototype decision-support analysis — not an official statutory designation.
        </p>
      </div>
    `;
  };

  // Setup / Re-add GeoJSON layers to the map
  const addRedZoneLayers = (map: maptilersdk.Map, village: Habitation) => {
    try {
      const redZoneGeoJson = generateModelledRedZoneGeoJson(village);
      const bufferGeoJson = generateRedZoneBufferGeoJson(village);

      // 1. Buffer Source & Layers
      if (map.getSource('redzone-buffer-source')) {
        (map.getSource('redzone-buffer-source') as any).setData(bufferGeoJson);
      } else {
        map.addSource('redzone-buffer-source', {
          type: 'geojson',
          data: bufferGeoJson
        });

        map.addLayer({
          id: 'redzone-buffer-fill',
          type: 'fill',
          source: 'redzone-buffer-source',
          paint: {
            'fill-color': '#F59E0B',
            'fill-opacity': 0.08
          }
        });

        map.addLayer({
          id: 'redzone-buffer-line',
          type: 'line',
          source: 'redzone-buffer-source',
          paint: {
            'line-color': '#D97706',
            'line-width': 1.6,
            'line-dasharray': [3, 2],
            'line-opacity': 0.55
          }
        });
      }

      // 2. Core Modelled Red Zone Source & Layers
      if (map.getSource('redzone-source')) {
        (map.getSource('redzone-source') as any).setData(redZoneGeoJson);
      } else {
        map.addSource('redzone-source', {
          type: 'geojson',
          data: redZoneGeoJson
        });

        // Layer 1: Glow / Halo for high visibility
        map.addLayer({
          id: 'redzone-glow',
          type: 'line',
          source: 'redzone-source',
          paint: {
            'line-color': '#EF4444',
            'line-width': 8,
            'line-opacity': 0.35,
            'line-blur': 3
          }
        });

        // Layer 2: Semi-transparent Red Fill (Fill: rgba(220, 53, 69, 0.25))
        map.addLayer({
          id: 'redzone-fill',
          type: 'fill',
          source: 'redzone-source',
          paint: {
            'fill-color': '#DC3545',
            'fill-opacity': 0.25
          }
        });

        // Layer 3: Solid Red Boundary (Boundary: #DC3545, approx 2-4px width)
        map.addLayer({
          id: 'redzone-line',
          type: 'line',
          source: 'redzone-source',
          paint: {
            'line-color': '#DC3545',
            'line-width': 3,
            'line-opacity': 0.95
          }
        });

        // Interactive hover & click
        map.on('mouseenter', 'redzone-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'redzone-fill', () => {
          map.getCanvas().style.cursor = '';
        });

        map.on('click', 'redzone-fill', (e) => {
          if (!popupRef.current) {
            popupRef.current = new maptilersdk.Popup({
              offset: 15,
              closeButton: true,
              maxWidth: '280px'
            });
          }
          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(buildPopupHtml(village))
            .addTo(map);
        });
      }

      // 3. Add or update Centroid Marker Badge
      if (!markerRef.current) {
        const badgeEl = createBadgeElement(village);
        badgeEl.addEventListener('click', () => {
          if (!popupRef.current) {
            popupRef.current = new maptilersdk.Popup({
              offset: 25,
              closeButton: true,
              maxWidth: '280px'
            });
          }
          popupRef.current
            .setLngLat([village.lng, village.lat])
            .setHTML(buildPopupHtml(village))
            .addTo(map);
        });

        markerRef.current = new maptilersdk.Marker({ element: badgeEl })
          .setLngLat([village.lng, village.lat])
          .addTo(map);
      } else {
        markerRef.current.setLngLat([village.lng, village.lat]);
        const currentElement = markerRef.current.getElement();
        if (currentElement) {
          const newEl = createBadgeElement(village);
          currentElement.innerHTML = newEl.innerHTML;
        }
      }

      // 4. Fit map bounds to encompass the red zone polygon
      const bounds = calculateGeoJsonBounds(redZoneGeoJson);
      map.fitBounds(bounds, {
        padding: { top: 70, bottom: 50, left: 60, right: 60 },
        maxZoom: 15,
        duration: 1000
      });
    } catch (err) {
      console.error('Error adding red zone layers:', err);
    }
  };

  // Initialize MapTiler map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) return;

    try {
      maptilersdk.config.apiKey = apiKey;
      
      const styleUrl = 
        mapStyleType === 'satellite' 
          ? maptilersdk.MapStyle.SATELLITE 
          : mapStyleType === 'topo' 
          ? maptilersdk.MapStyle.OUTDOOR 
          : maptilersdk.MapStyle.STREETS;

      if (!mapInstanceRef.current) {
        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: styleUrl,
          center: [selectedVillage.lng, selectedVillage.lat],
          zoom: 14,
          navigationControl: true
        });

        map.on('load', () => {
          setMapLoaded(true);
          addRedZoneLayers(map, selectedVillage);
        });

        mapInstanceRef.current = map;
      }
    } catch (e) {
      console.warn('Map initialization warning:', e);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle selectedVillage change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (map.isStyleLoaded()) {
      addRedZoneLayers(map, selectedVillage);
    } else {
      map.once('load', () => {
        addRedZoneLayers(map, selectedVillage);
      });
    }
  }, [selectedVillage]);

  // Handle Map Style Switch
  const handleStyleChange = (type: 'streets' | 'satellite' | 'topo') => {
    setMapStyleType(type);
    const map = mapInstanceRef.current;
    if (!map) return;

    const styleUrl = 
      type === 'satellite' 
        ? maptilersdk.MapStyle.SATELLITE 
        : type === 'topo' 
        ? maptilersdk.MapStyle.OUTDOOR 
        : maptilersdk.MapStyle.STREETS;

    map.setStyle(styleUrl);
    map.once('style.load', () => {
      addRedZoneLayers(map, selectedVillage);
    });
  };

  // Toggle Buffer Visibility
  const toggleBuffer = () => {
    const next = !showBuffer;
    setShowBuffer(next);
    const map = mapInstanceRef.current;
    if (!map) return;
    if (map.getLayer('redzone-buffer-fill')) {
      map.setLayoutProperty('redzone-buffer-fill', 'visibility', next ? 'visible' : 'none');
    }
    if (map.getLayer('redzone-buffer-line')) {
      map.setLayoutProperty('redzone-buffer-line', 'visibility', next ? 'visible' : 'none');
    }
  };

  // Fit bounds to Red Zone
  const handleFitRedZone = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const redZoneGeoJson = generateModelledRedZoneGeoJson(selectedVillage);
    const bounds = calculateGeoJsonBounds(redZoneGeoJson);
    map.fitBounds(bounds, {
      padding: { top: 70, bottom: 50, left: 60, right: 60 },
      maxZoom: 15,
      duration: 800
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-fadeIn font-sans w-full max-w-full">
      {/* 1. Header & Disclaimer Banner */}
      <div className="bg-white border border-[#DCE7E1] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1.5">
            <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              AI-MODELLED RED ZONE • {selectedVillage.district.toUpperCase()}
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
              Prototype decision-support analysis — not an official statutory designation.
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#17221D] tracking-tight">
            Red Zone Spatial Analysis: {selectedVillage.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Analytical high-hazard perimeter, geomorphological triggers, and demographic vulnerability inspector.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setReportModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm min-h-[44px] cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Analysis Report</span>
          </button>
          <button
            onClick={onNavigateToPlanner}
            className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white border border-[#087F5B]/30 text-[#087F5B] font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm min-h-[44px] cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Proceed to Relocation Priority →</span>
          </button>
        </div>
      </div>

      {/* 2. Dual-Pane Workspace Layout (MapTiler GIS Map + Analytical Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">
        {/* Left Panel: Interactive MapTiler GIS Map (Col Span 7 on desktop) */}
        <div className="lg:col-span-7 bg-white border border-[#DCE7E1] rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden flex flex-col h-[480px] sm:h-[550px] lg:h-[720px] relative w-full">
          {/* Map canvas */}
          <div ref={mapContainerRef} className="flex-1 w-full h-full" />

          {/* Map Controls: Style Switcher & Recenter (Top-Right) */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex flex-col items-end gap-1.5">
            {/* Style switcher pills */}
            <div className="bg-white/95 backdrop-blur-md border border-[#DCE7E1] p-1 rounded-xl shadow-md flex items-center gap-1 text-[10px] font-bold">
              <button
                onClick={() => handleStyleChange('streets')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  mapStyleType === 'streets' 
                    ? 'bg-[#087F5B] text-white' 
                    : 'text-[#17221D] hover:bg-slate-100'
                }`}
              >
                Streets
              </button>
              <button
                onClick={() => handleStyleChange('satellite')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  mapStyleType === 'satellite' 
                    ? 'bg-[#087F5B] text-white' 
                    : 'text-[#17221D] hover:bg-slate-100'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => handleStyleChange('topo')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  mapStyleType === 'topo' 
                    ? 'bg-[#087F5B] text-white' 
                    : 'text-[#17221D] hover:bg-slate-100'
                }`}
              >
                Terrain/Topo
              </button>
            </div>

            {/* Recenter & Buffer buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleBuffer}
                title="Toggle 200m Danger Buffer"
                className={`p-2 rounded-xl text-xs font-bold border shadow-md backdrop-blur-md transition-colors flex items-center gap-1 cursor-pointer ${
                  showBuffer 
                    ? 'bg-amber-50 border-amber-300 text-amber-900' 
                    : 'bg-white/90 border-[#DCE7E1] text-slate-600'
                }`}
              >
                {showBuffer ? <Eye className="w-3.5 h-3.5 text-amber-700" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="text-[10px] hidden sm:inline">200m Buffer</span>
              </button>
              <button
                onClick={handleFitRedZone}
                title="Recenter on Red Zone Boundary"
                className="p-2 bg-white/95 hover:bg-slate-100 border border-[#DCE7E1] rounded-xl text-slate-800 shadow-md backdrop-blur-md transition-colors flex items-center gap-1 text-[10px] font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#087F5B]" />
                <span className="hidden sm:inline">Fit Zone</span>
              </button>
            </div>
          </div>

          {/* Floating Map Legend (Top-Left) */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md border border-[#DCE7E1] p-3 rounded-2xl shadow-lg text-[10px] sm:text-[11px] space-y-2 z-10 max-w-[240px] pointer-events-auto">
            <div className="font-black text-[#17221D] flex items-center justify-between border-b border-slate-100 pb-1">
              <span>Active GIS Overlays</span>
              <span className="text-[9px] text-[#DC3545] font-black uppercase">Live</span>
            </div>
            
            {/* Red Zone Polygon legend entry */}
            <div className="flex items-center space-x-2">
              <span 
                className="w-4 h-3 rounded border-2 border-[#DC3545] inline-block shrink-0" 
                style={{ backgroundColor: 'rgba(220, 53, 69, 0.25)' }}
              />
              <span className="font-bold text-slate-900 truncate">Modelled Red Zone Polygon</span>
            </div>

            {/* 200m Buffer legend entry */}
            {showBuffer && (
              <div className="flex items-center space-x-2">
                <span 
                  className="w-4 h-3 rounded border border-dashed border-[#D97706] inline-block shrink-0" 
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                />
                <span className="text-slate-700 truncate">200m Hazard Danger Envelope</span>
              </div>
            )}

            {/* Centroid Hotspot */}
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block shrink-0" />
              <span className="text-slate-700 truncate">{selectedVillage.name} Hazard Centroid</span>
            </div>
          </div>

          {/* Bottom Map Notification / Guidance */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-4 sm:right-4 bg-white/90 backdrop-blur-md border border-[#DCE7E1] px-3 py-1.5 rounded-xl text-[10px] text-slate-600 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-1.5 truncate">
              <Info className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
              <span className="truncate">
                Click anywhere inside the <strong className="text-red-700">Red Zone Polygon</strong> to inspect geocoded exposure details.
              </span>
            </div>
            <span className="font-mono text-[9px] font-bold text-slate-500 shrink-0 hidden sm:inline ml-2">
              Area: ~{areaSqKm} km² ({areaHectares} Ha)
            </span>
          </div>
        </div>

        {/* Right Panel: Analytical Inspector & Geotechnical Evidence (Col Span 5 on desktop) */}
        <div className="lg:col-span-5 bg-white border border-[#DCE7E1] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between space-y-5 sm:space-y-6 w-full overflow-y-auto max-h-none lg:max-h-[720px]">
          <div className="space-y-5">
            {/* Risk Composite Score Card */}
            <div className="p-4 bg-gradient-to-br from-red-50 to-rose-100/60 border border-red-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-red-600 text-white px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                  Critically High Risk
                </span>
                <span className="text-2xl font-black text-red-700 font-mono">
                  {selectedVillage.riskScore} <span className="text-xs text-red-500 font-normal">/ 100</span>
                </span>
              </div>
              <h3 className="text-sm font-black text-red-950">
                AI-Assessed Modelled Red Zone Perimeter
              </h3>
              <p className="text-[11px] text-red-900 leading-relaxed font-medium">
                Prototype decision-support boundary calculated from digital elevation models (DEM), slope gradients, historical debris flows, and drainage corridors.
              </p>
            </div>

            {/* SECTION 1: WHERE IS THE RED ZONE? */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-black text-[#17221D] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#087F5B]" />
                <span>1. Where is the Red Zone?</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Centroid Coordinates</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {selectedVillage.lat.toFixed(4)}°N, {selectedVillage.lng.toFixed(4)}°E
                  </span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Taluka / District</span>
                  <span className="font-bold text-slate-800 text-[11px] truncate block">
                    {selectedVillage.taluka}, {selectedVillage.district}
                  </span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Elevation & Slope</span>
                  <span className="font-bold text-slate-800 text-[11px]">
                    {selectedVillage.elevation || '310m'} • {selectedVillage.terrainSlope || '35° Scarp'}
                  </span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Soil & Regolith</span>
                  <span className="font-bold text-slate-800 text-[11px] truncate block">
                    {selectedVillage.soilType || 'Lateritic Weathered'}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2: WHY IS IT CLASSIFIED AS RED ZONE? */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-black text-[#17221D] uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#DC3545]" />
                <span>2. Why is it classified as Red Zone?</span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Specific Trigger Conditions */}
                <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl space-y-1.5">
                  <div className="text-[10px] font-black text-red-900 uppercase tracking-wide">
                    Multi-Hazard Trigger Conditions:
                  </div>
                  <ul className="space-y-1 text-[11px] text-red-800">
                    {selectedVillage.redZoneConditions && selectedVillage.redZoneConditions.length > 0 ? (
                      selectedVillage.redZoneConditions.map((cond, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                          <span>{cond}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                          <span>Critical slope gradient &gt; 35° with active shear plane weakness</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                          <span>Direct exposure to high-velocity monsoon runoff & debris flow</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                          <span>Single access road cutoff during flash torrent conditions</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* AI Reasoning summary */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 leading-relaxed">
                  <strong className="text-[#07543F] font-bold">AI Geotechnical Diagnosis: </strong>
                  {selectedVillage.aiReasoning || 
                    `${selectedVillage.name} exhibits severe geomorphological instability characterized by loose lateritic overburden on basalt bedrock. Historical events (${selectedVillage.historicalEventsCount} recorded) indicate repeat failure during intense rainfall events.`}
                </div>
              </div>
            </div>

            {/* SECTION 3: WHAT AREA IS AFFECTED? */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-black text-[#17221D] uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#087F5B]" />
                <span>3. What Area is Affected?</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Modelled Red Zone Core</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-base font-black text-[#DC3545]">{areaSqKm}</span>
                    <span className="text-[10px] text-slate-600">km² ({areaHectares} Ha)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">200m Danger Envelope</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-base font-black text-amber-700">{bufferAreaSqKm}</span>
                    <span className="text-[10px] text-slate-600">km² buffer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: HOW MANY PEOPLE / BUILDINGS / ROADS EXPOSED? */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-black text-[#17221D] uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#087F5B]" />
                <span>4. How Many People, Buildings & Roads are Exposed?</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Residents</span>
                  <span className="text-sm font-black text-slate-900 mt-0.5 block">{selectedVillage.population}</span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Structures</span>
                  <span className="text-sm font-black text-slate-900 mt-0.5 block">{selectedVillage.households}</span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Roads Exposed</span>
                  <span className="text-sm font-black text-slate-900 mt-0.5 block">{roadsExposed} km</span>
                </div>
                <div className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Public Assets</span>
                  <span className="text-sm font-black text-slate-900 mt-0.5 block">
                    {schoolsExposed + hospitalsExposed} facilities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 border-t border-[#DCE7E1] space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-slate-600">Relocation Recommendation:</span>
              <span className="font-black text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase text-[10px]">
                {selectedVillage.relocationPriority} Priority
              </span>
            </div>

            <button
              onClick={onNavigateToPlanner}
              className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
            >
              <span>Proceed to Relocation Priority</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <RedZoneReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        selectedVillage={selectedVillage}
        currentLang={currentLang}
      />
    </div>
  );
};
