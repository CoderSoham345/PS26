import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Layers, 
  MapPin, FileText, Bot, Activity, ArrowUpRight, TrendingDown, TrendingUp, Building, Users, ShieldCheck, Waves, Mountain, Compass 
} from 'lucide-react';
import { Habitation } from '../../types';
import { Language } from '../../lib/i18n';
import { RedZoneReportModal } from '../modals/RedZoneReportModal';

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

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [selectedHazardLayer, setSelectedHazardLayer] = useState<'landslide' | 'flood' | 'isolation'>('landslide');

  // Initialize MapTiler map
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
          zoom: 14,
          navigationControl: true
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
  }, [selectedVillage]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn font-sans">
      {/* Header & Disclaimer */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              AI-ASSESSED HIGH-RISK AREA (MODELLED RED ZONE) • {selectedVillage.district}
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
              Prototype decision-support layer — not an official statutory order.
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">
            Red Zone Analysis: {selectedVillage.name} ({selectedVillage.taluka} Taluka)
          </h1>
          <p className="text-xs text-slate-600">
            High-density GIS spatial hazard exposure and dynamic risk inspector.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="px-4 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Analysis Report</span>
          </button>
          <button
            onClick={onNavigateToPlanner}
            className="px-4 py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white border border-[#087F5B]/30 text-[#087F5B] font-bold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Proceed to Relocation Priority →</span>
          </button>
        </div>
      </div>

      {/* Dual-Pane Workspace Layout (70% Map / 30% Analytical Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel (70% Canvas: Interactive MapTiler GIS Map) */}
        <div className="lg:col-span-8 bg-white border border-[#DCE7E1] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[600px] relative">
          <div ref={mapContainerRef} className="flex-1 w-full h-full" />

          {/* Map Overlay Badge & Layer Toggle */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#DCE7E1] p-3 rounded-2xl shadow-lg text-[11px] space-y-2 z-10">
            <div className="font-bold text-[#17221D]">Active GIS Overlays</div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse inline-block" />
              <span>High-Risk Red Zone Polygon</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span>200m Hazard Danger Buffer</span>
            </div>
          </div>
        </div>

        {/* Right Panel (30% Sidebar: Red Zone Evidence & Dynamic Risk Inspector) */}
        <div className="lg:col-span-4 bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6 overflow-y-auto max-h-[600px]">
          <div className="space-y-6">
            {/* Red Zone Summary Banner */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase">Critically High Risk</span>
                <span className="text-xl font-black text-red-700 font-mono">88 / 100</span>
              </div>
              <h3 className="text-sm font-black text-red-900">AI-Assessed High-Risk Area</h3>
              <p className="text-[11px] text-red-800 leading-relaxed">
                Prototype decision-support layer — indicates severe multi-hazard vulnerability.
              </p>
            </div>

            {/* Multi-Hazard Breakdown Cards */}
            <div className="space-y-3">
              <div className="text-xs font-black text-[#17221D] uppercase tracking-wider">Multi-Hazard Breakdown</div>

              <div className="p-3.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#17221D]">
                  <span className="flex items-center space-x-1.5">
                    <Mountain className="w-4 h-4 text-amber-600" />
                    <span>Landslide Risk</span>
                  </span>
                  <span className="text-red-600 font-mono">Critical</span>
                </div>
                <p className="text-[11px] text-slate-600">Slope Angle &gt; 38°, Soil Saturation 82%, Rain Anomaly +45mm/hr.</p>
              </div>

              <div className="p-3.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#17221D]">
                  <span className="flex items-center space-x-1.5">
                    <Waves className="w-4 h-4 text-blue-600" />
                    <span>Flash Flood Risk</span>
                  </span>
                  <span className="text-amber-600 font-mono">High</span>
                </div>
                <p className="text-[11px] text-slate-600">Proximity to drainage line &lt; 120m, Elevation Drop 140m.</p>
              </div>

              <div className="p-3.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#17221D]">
                  <span className="flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-red-600" />
                    <span>Isolation Risk</span>
                  </span>
                  <span className="text-red-600 font-mono">Severe</span>
                </div>
                <p className="text-[11px] text-slate-600">Single road egress cut off during heavy monsoon events.</p>
              </div>
            </div>

            {/* Exposed Assets & Demographics */}
            <div className="space-y-3 pt-2 border-t border-[#DCE7E1]">
              <div className="text-xs font-black text-[#17221D] uppercase tracking-wider">Exposed Assets & Demographics</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F6F9F7] rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase block">Population Exposed</span>
                  <strong className="text-sm text-slate-900">{selectedVillage.population} residents</strong>
                </div>
                <div className="p-3 bg-[#F6F9F7] rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase block">Unstable Structures</span>
                  <strong className="text-sm text-slate-900">{selectedVillage.households} houses</strong>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed">
              <strong>AI Reasoning:</strong> This village is inside a high-risk landslide zone due to steep slope gradients and historical soil movement during heavy rainfall.
            </div>
          </div>

          <button
            onClick={onNavigateToPlanner}
            className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Proceed to Relocation Priority</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
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
