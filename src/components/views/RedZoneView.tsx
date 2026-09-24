import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Layers, 
  Square, Circle, Pentagon, MapPin, Trash2, FileText, Bot, Info, Activity 
} from 'lucide-react';
import { Habitation } from '../../types';
import { t, Language } from '../../lib/i18n';

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

  const [selectionTool, setSelectionTool] = useState<'polygon' | 'rectangle' | 'circle' | 'village' | 'none'>('village');
  const [selectedAreaHa, setSelectedAreaHa] = useState<number>(24.6);
  const [selectedAreaSqKm, setSelectedAreaSqKm] = useState<number>(0.246);
  const [activeLayers, setActiveLayers] = useState({
    landslide: true,
    flood: true,
    seismic: false,
    population: true,
    buildings: true,
    roads: true,
    infrastructure: true,
    redZones: true,
    analysisArea: true,
    relocationSites: true
  });
  const [activeTabSection, setActiveTabSection] = useState<string>('exposure');
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

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
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header & Disclaimer */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              AI-Assessed Red Zone • {selectedVillage.district}
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
              Prototype decision-support analysis — not an official statutory designation.
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">
            Red Zone Analysis: {selectedVillage.name}
          </h1>
          <p className="text-xs text-slate-600">
            Modelled high-risk hazard exposure and spatial evacuation perimeter.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="px-4 py-2.5 bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] text-[#17221D] font-semibold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#087F5B]" />
            <span>Generate Analysis Report</span>
          </button>
          <button
            onClick={() => setAiModalOpen(true)}
            className="px-4 py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white border border-[#087F5B]/30 text-[#087F5B] font-semibold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span>Ask DisasterGuard AI</span>
          </button>
        </div>
      </div>

      {/* Main GIS Workspace: Map + Area Selection Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Control Panel / Area Selection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#17221D] uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-[#087F5B]" />
              <span>Area Selection Tool</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setSelectionTool('polygon'); setSelectedAreaHa(28.4); setSelectedAreaSqKm(0.284); }}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-colors ${
                  selectionTool === 'polygon' ? 'bg-[#087F5B] text-white border-[#087F5B]' : 'bg-[#F6F9F7] text-slate-700 border-[#DCE7E1]'
                }`}
              >
                <Pentagon className="w-3.5 h-3.5" />
                <span>Draw Polygon</span>
              </button>
              <button
                onClick={() => { setSelectionTool('rectangle'); setSelectedAreaHa(19.2); setSelectedAreaSqKm(0.192); }}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-colors ${
                  selectionTool === 'rectangle' ? 'bg-[#087F5B] text-white border-[#087F5B]' : 'bg-[#F6F9F7] text-slate-700 border-[#DCE7E1]'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>Rectangle</span>
              </button>
              <button
                onClick={() => { setSelectionTool('circle'); setSelectedAreaHa(31.5); setSelectedAreaSqKm(0.315); }}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-colors ${
                  selectionTool === 'circle' ? 'bg-[#087F5B] text-white border-[#087F5B]' : 'bg-[#F6F9F7] text-slate-700 border-[#DCE7E1]'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
                <span>Circle</span>
              </button>
              <button
                onClick={() => { setSelectionTool('village'); setSelectedAreaHa(24.6); setSelectedAreaSqKm(0.246); }}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-colors ${
                  selectionTool === 'village' ? 'bg-[#087F5B] text-white border-[#087F5B]' : 'bg-[#F6F9F7] text-slate-700 border-[#DCE7E1]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Village Boundary</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#DCE7E1]">
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-500">Selected Geometry Area:</span>
                <strong className="text-[#087F5B] font-mono">{selectedAreaHa} Hectares</strong>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-500">Metric Equivalent:</span>
                <strong className="text-slate-900 font-mono">{selectedAreaSqKm} sq km ({Math.round(selectedAreaHa * 10000)} sq m)</strong>
              </div>
            </div>

            <button
              onClick={() => { setSelectionTool('none'); setSelectedAreaHa(0); setSelectedAreaSqKm(0); }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Geometry Selection</span>
            </button>
          </div>

          {/* Layer Control Panel */}
          <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#17221D] uppercase tracking-wider">Map GIS Layers</h3>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={activeLayers.landslide} 
                  onChange={(e) => setActiveLayers({...activeLayers, landslide: e.target.checked})}
                  className="rounded text-[#087F5B] focus:ring-[#087F5B]"
                />
                <span>Landslide Susceptibility Index</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={activeLayers.flood} 
                  onChange={(e) => setActiveLayers({...activeLayers, flood: e.target.checked})}
                  className="rounded text-[#087F5B] focus:ring-[#087F5B]"
                />
                <span>Flood Inundation Buffer</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={activeLayers.population} 
                  onChange={(e) => setActiveLayers({...activeLayers, population: e.target.checked})}
                  className="rounded text-[#087F5B] focus:ring-[#087F5B]"
                />
                <span>Population Exposure Density</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={activeLayers.redZones} 
                  onChange={(e) => setActiveLayers({...activeLayers, redZones: e.target.checked})}
                  className="rounded text-[#087F5B] focus:ring-[#087F5B]"
                />
                <span>Modelled Red Zones</span>
              </label>
            </div>
          </div>
        </div>

        {/* Center: Large GIS Map Workspace */}
        <div className="lg:col-span-3 bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-sm space-y-4">
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-[#DCE7E1] bg-[#F6F9F7]">
            {!import.meta.env.VITE_MAPTILER_API_KEY && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/90 z-20 text-center">
                <ShieldAlert className="w-10 h-10 text-orange-500 mb-2" />
                <h4 className="text-sm font-bold text-[#17221D]">MapTiler API Key Missing</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Configure VITE_MAPTILER_API_KEY in secrets to render interactive MapTiler GIS canvas.
                </p>
              </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Overlay Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-[#DCE7E1] shadow-md z-10 text-xs font-bold text-[#087F5B] flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Active Red Zone Polygon • {selectedVillage.name}</span>
            </div>
          </div>

          {/* Risk Summary Quick Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Prototype Risk Score</span>
              <strong className="text-lg font-extrabold text-red-600 font-mono">{selectedVillage.riskScore} / 100</strong>
            </div>
            <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Exposed Population</span>
              <strong className="text-lg font-extrabold text-[#17221D]">{selectedVillage.population}</strong>
            </div>
            <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Primary Hazard</span>
              <strong className="text-sm font-bold text-[#087F5B] truncate block">{selectedVillage.primaryHazard}</strong>
            </div>
            <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Emergency Access</span>
              <strong className="text-xs font-bold text-orange-600">{selectedVillage.accessibility}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Analysis Details Sections */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm space-y-6">
        <h2 className="text-base font-bold text-[#17221D]">Detailed Analysis & Exposure Breakdown</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">A. Hazard Exposure</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              High susceptibility index ({selectedVillage.primaryHazard}) driven by {selectedVillage.terrainSlope} slope gradient and weathered {selectedVillage.soilType}.
            </p>
          </div>

          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">B. Population & Buildings</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedVillage.population} residents across {selectedVillage.households} households. Estimated 214 masonry and semi-permanent structures located within 100m of slope toe.
            </p>
          </div>

          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">C. Emergency Access</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Single primary ridge road ({selectedVillage.infrastructureExposure.roadsKm} km) with recurrent monsoon blockage history. Emergency response time estimated at 45 minutes.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#DCE7E1]">
          <button
            onClick={onNavigateToPlanner}
            className="px-6 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-2"
          >
            <span>Proceed to Relocation Planner & Safe Site Assignment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
