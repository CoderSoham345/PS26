import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { MapPin, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Habitation } from '../../types';

interface CommunityMapViewProps {
  selectedVillage: Habitation;
  onNavigate: (tab: string) => void;
}

export const CommunityMapView: React.FC<CommunityMapViewProps> = ({ selectedVillage, onNavigate }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);

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
          center: [selectedVillage.lng, selectedVillage.lat],
          zoom: 13,
          navigationControl: true
        });
        mapInstanceRef.current = map;

        // Add marker for village
        const el = document.createElement('div');
        el.className = 'w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white';
        el.innerText = '📍';

        new maptilersdk.Marker({ element: el })
          .setLngLat([selectedVillage.lng, selectedVillage.lat])
          .setPopup(new maptilersdk.Popup().setHTML(`<div style="padding:4px; font-weight:bold;">${selectedVillage.name}<br/>Risk: ${selectedVillage.riskScore}/100</div>`))
          .addTo(map);
      }
    } catch (e) {
      console.error('Map error:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedVillage]);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-6 animate-fadeIn">
      <button
        onClick={() => onNavigate('my-village')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F5B] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Village</span>
      </button>

      <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">Simplified Community Map</span>
          <h1 className="text-xl font-extrabold text-[#17221D]">{selectedVillage.name} & Surrounding Facilities</h1>
          <p className="text-xs text-slate-600">Showing My Village, Risk Area, Main Roads, Hospital, School, and Relocation Area.</p>
        </div>

        <div className="relative w-full h-[450px] bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-sm">
          {!apiKey && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white z-20">
              <ShieldAlert className="w-10 h-10 text-orange-500 mb-2" />
              <h3 className="text-sm font-bold text-[#17221D]">MapTiler API Key Required</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">Please configure VITE_MAPTILER_API_KEY in your environment variables.</p>
            </div>
          )}
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <span className="font-semibold text-slate-700">My Village (Risk)</span>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#087F5B]" />
            <span className="font-semibold text-slate-700">Relocation Area</span>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-semibold text-slate-700">Hospital / School</span>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-slate-500" />
            <span className="font-semibold text-slate-700">Main Roads</span>
          </div>
        </div>
      </div>
    </div>
  );
};
