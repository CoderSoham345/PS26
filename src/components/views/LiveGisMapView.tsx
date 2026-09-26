import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { Search, Layers, Navigation, ShieldAlert, MapPin, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Habitation } from '../../types';
import { PILOT_DISTRICTS } from '../../data/pilotData';

interface LiveGisMapViewProps {
  selectedDistrict: string;
  setSelectedDistrict: (d: string) => void;
  habitations: Habitation[];
  onSelectVillageForMultiHazard: (v: Habitation) => void;
}

export const LiveGisMapView: React.FC<LiveGisMapViewProps> = ({
  selectedDistrict,
  setSelectedDistrict,
  habitations,
  onSelectVillageForMultiHazard
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);
  const markersRef = useRef<maptilersdk.Marker[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState<Habitation | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    hazards: true,
    roads: true,
    redZones: true,
    relocationSites: true
  });

  const currentDistrictData = PILOT_DISTRICTS[selectedDistrict.toLowerCase()] || PILOT_DISTRICTS['raigad'];
  const districtVillages = currentDistrictData.targetVillages;

  // Initialize MapTiler map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) {
      return; // Handled by fallback UI
    }

    try {
      maptilersdk.config.apiKey = apiKey;

      if (!mapInstanceRef.current) {
        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.STREETS,
          center: currentDistrictData.center,
          zoom: currentDistrictData.zoom,
          navigationControl: true
        });

        mapInstanceRef.current = map;
      }
    } catch (e) {
      console.error('MapTiler initialization error:', e);
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
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center and markers on district or layer change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Fly to district center
    map.flyTo({
      center: currentDistrictData.center,
      zoom: currentDistrictData.zoom,
      speed: 1.2
    });

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add target village markers
    districtVillages.forEach((village) => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg cursor-pointer transition-transform hover:scale-110';
      
      const riskColor = village.riskScore >= 85 ? 'bg-red-600 text-white' : village.riskScore >= 75 ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-slate-950';
      el.style.backgroundColor = village.riskScore >= 85 ? '#DC2626' : village.riskScore >= 75 ? '#F97316' : '#EAB308';
      el.className = `w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white cursor-pointer ${riskColor}`;
      el.innerText = village.id.replace(/^[A-Z]+-/, '');

      el.addEventListener('click', () => {
        setSelectedVillage(village);
        map.flyTo({ center: [village.lng, village.lat], zoom: 13, speed: 1.2 });
      });

      const marker = new maptilersdk.Marker({ element: el })
        .setLngLat([village.lng, village.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

  }, [selectedDistrict, activeLayers]);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 w-full box-border">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-[#E7F6EF] text-[#087F5B] p-2 rounded-xl shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-[#17221D] truncate">Live GIS Command Map ({selectedDistrict})</h1>
            <p className="text-xs text-slate-500 truncate">Pilot 5-District Real-time Hazard & Habitation Surveillance</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* District Selector */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#17221D] focus:outline-none focus:border-[#087F5B] min-h-[44px] cursor-pointer"
          >
            {Object.keys(PILOT_DISTRICTS).map((key) => {
              const d = PILOT_DISTRICTS[key];
              return (
                <option key={d.id} value={d.name}>{d.name} District</option>
              );
            })}
          </select>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search location or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B] min-h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[48vh] min-h-[320px] max-h-[550px] md:h-[600px] md:max-h-none bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-sm">
        {!apiKey ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/90 z-20">
            <ShieldAlert className="w-12 h-12 text-orange-500 mb-3" />
            <h3 className="text-base font-bold text-[#17221D]">Map Service Unavailable</h3>
            <p className="text-xs text-slate-500 max-w-md mt-1">
              Add <code className="bg-[#E7F6EF] px-1.5 py-0.5 rounded text-[#087F5B] font-mono">VITE_MAPTILER_API_KEY</code> to your environment variables to enable live MapTiler maps.
            </p>
          </div>
        ) : null}

        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Legend */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur border border-[#DCE7E1] p-2.5 sm:p-3 rounded-xl shadow-lg z-10 text-[10px] sm:text-[11px] space-y-1.5 max-w-[160px] sm:max-w-none">
          <div className="font-bold text-[#17221D] mb-1">Target Habitation Risk</div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-600 inline-block shrink-0" />
            <span className="text-slate-600 truncate">Very High (85+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-orange-500 inline-block shrink-0" />
            <span className="text-slate-600 truncate">High (75-84)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 inline-block shrink-0" />
            <span className="text-slate-600 truncate">Moderate (&lt;75)</span>
          </div>
        </div>

        {/* Target Villages Quick Switcher */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur border border-[#DCE7E1] p-3 sm:p-4 rounded-xl shadow-lg z-10 max-w-[180px] sm:max-w-xs">
          <h4 className="text-[11px] sm:text-xs font-bold text-[#17221D] mb-1.5 sm:mb-2 uppercase tracking-wider truncate">
            {selectedDistrict} Villages (4)
          </h4>
          <div className="space-y-1">
            {districtVillages.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVillage(v);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo({ center: [v.lng, v.lat], zoom: 13, speed: 1.2 });
                  }
                }}
                className="w-full text-left px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-[#E7F6EF] text-xs font-medium text-[#17221D] flex items-center justify-between transition-colors min-h-[36px] cursor-pointer"
              >
                <span className="truncate text-[11px] sm:text-xs">{v.name}</span>
                <span className="font-mono font-bold text-[#087F5B] text-[10px] sm:text-xs ml-1">{v.riskScore}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Village Popup / Bottom Sheet */}
        {selectedVillage && (
          <div className="absolute bottom-3 right-3 left-3 sm:bottom-4 sm:right-4 sm:left-4 md:left-auto md:w-96 bg-white border border-[#DCE7E1] p-4 sm:p-5 rounded-2xl shadow-2xl z-20 animate-fadeIn">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#E7F6EF] text-[#087F5B] text-[10px] font-bold uppercase">
                {selectedVillage.district} • {selectedVillage.taluka}
              </span>
              <button
                onClick={() => setSelectedVillage(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-[#17221D] mb-1">{selectedVillage.name}</h3>
            <p className="text-xs text-slate-500 mb-3 sm:mb-4">Primary Hazard: <strong className="text-[#087F5B]">{selectedVillage.primaryHazard}</strong></p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs bg-[#F6F9F7] p-2.5 sm:p-3 rounded-xl border border-[#DCE7E1]">
              <div>
                <span className="text-slate-500 block text-[10px]">Population</span>
                <strong className="text-[#17221D]">{selectedVillage.population} residents</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Risk Score</span>
                <strong className="text-red-600 font-mono">{selectedVillage.riskScore} / 100</strong>
              </div>
            </div>

            <button
              onClick={() => onSelectVillageForMultiHazard(selectedVillage)}
              className="w-full py-3 sm:py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-md min-h-[44px] cursor-pointer"
            >
              <span>View Multi-Hazard Analysis & Red Zone</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
