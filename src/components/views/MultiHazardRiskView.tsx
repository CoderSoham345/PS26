import React from 'react';
import { Activity, ShieldAlert, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Habitation } from '../../types';

interface MultiHazardRiskViewProps {
  selectedVillage: Habitation;
  onNavigateToRedZone: () => void;
  onNavigateToPlanner: () => void;
}

export const MultiHazardRiskView: React.FC<MultiHazardRiskViewProps> = ({
  selectedVillage,
  onNavigateToRedZone,
  onNavigateToPlanner
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {selectedVillage.district} District • Multi-Hazard Model
            </span>
            <span className="text-[10px] text-slate-500">Telemetry Assessment</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Multi-Hazard Risk Analysis: {selectedVillage.name}</h1>
          <p className="text-xs text-slate-600">Taluka: {selectedVillage.taluka} | Slope: {selectedVillage.terrainSlope} | Soil: {selectedVillage.soilType}</p>
        </div>
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-2.5 rounded-xl text-center">
          <div className="text-2xl font-black text-red-600 font-mono">{selectedVillage.riskScore} / 100</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold">Composite Risk Index</div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#17221D] uppercase tracking-wider">AI Hazard Reasoning & Vulnerability Factors</h2>
          
          <div className="bg-[#E7F6EF] border border-[#087F5B]/30 p-4 rounded-xl">
            <h3 className="text-xs font-bold text-[#087F5B] mb-1">Model Reasoning for {selectedVillage.name}</h3>
            <p className="text-xs text-[#17221D] leading-relaxed">
              {selectedVillage.aiReasoning}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase">Red Zone Trigger Conditions</div>
            {selectedVillage.redZoneConditions.map((cond, i) => (
              <div key={i} className="p-3 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl flex items-start space-x-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">{cond}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17221D] mb-4">Infrastructure Exposure</h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                <span className="text-slate-600">Population Exposed:</span>
                <strong className="text-[#17221D] font-mono">{selectedVillage.population}</strong>
              </div>
              <div className="flex justify-between p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                <span className="text-slate-600">Households:</span>
                <strong className="text-[#17221D] font-mono">{selectedVillage.households}</strong>
              </div>
              <div className="flex justify-between p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                <span className="text-slate-600">Primary Schools:</span>
                <strong className="text-[#17221D] font-mono">{selectedVillage.infrastructureExposure.schools}</strong>
              </div>
              <div className="flex justify-between p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
                <span className="text-slate-600">Healthcare Centres:</span>
                <strong className="text-[#17221D] font-mono">{selectedVillage.infrastructureExposure.hospitals}</strong>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#DCE7E1]">
            <button
              onClick={onNavigateToRedZone}
              className="w-full py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm"
            >
              <span>Inspect Red Zone Boundary</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToPlanner}
              className="w-full py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
            >
              <span>Proceed to Relocation Planner</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
