import React from 'react';
import { AlertTriangle, ChevronRight, ArrowLeft } from 'lucide-react';
import { Habitation } from '../../types';

interface CommunityRiskViewProps {
  selectedVillage: Habitation;
  onNavigate: (tab: string) => void;
}

export const CommunityRiskView: React.FC<CommunityRiskViewProps> = ({ selectedVillage, onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 animate-fadeIn">
      <button
        onClick={() => onNavigate('my-village')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F5B] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Village</span>
      </button>

      <div className="bg-white border border-[#DCE7E1] p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">Prototype Risk Factors</span>
          <h1 className="text-2xl font-extrabold text-[#17221D] mt-1">Why is {selectedVillage.name} at risk?</h1>
          <p className="text-xs text-slate-600 mt-1">
            Based on prototype multi-hazard modelling combining terrain slope, soil regolith saturation, historical events, and emergency accessibility.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-[#17221D] mb-1">Primary Hazard: {selectedVillage.primaryHazard}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedVillage.aiReasoning}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-[#17221D] mb-1">Terrain & Slope Condition ({selectedVillage.terrainSlope})</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Soil type ({selectedVillage.soilType}) at elevation {selectedVillage.elevation} is vulnerable to heavy monsoon saturation and slope failure.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-[#17221D] mb-1">Emergency Access: {selectedVillage.accessibility}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Road connectivity is limited, affecting evacuation response times during extreme weather events.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#DCE7E1] flex justify-end">
          <button
            onClick={() => onNavigate('community-relocation')}
            className="px-6 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1 shadow-sm"
          >
            <span>View Safe Relocation Areas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
