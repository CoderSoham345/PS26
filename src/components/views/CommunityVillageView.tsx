import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle, MapPin, Users, Activity } from 'lucide-react';
import { Habitation } from '../../types';

interface CommunityVillageViewProps {
  selectedVillage: Habitation;
  onNavigate: (tab: string) => void;
  currentLang: string;
}

export const CommunityVillageView: React.FC<CommunityVillageViewProps> = ({
  selectedVillage,
  onNavigate,
  currentLang
}) => {
  const [showWhy, setShowWhy] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const getRiskBadge = (score: number) => {
    if (score >= 85) return { label: '🔴 VERY HIGH RISK', bg: 'bg-red-50 border-red-200 text-red-700' };
    if (score >= 75) return { label: '🟠 HIGH RISK', bg: 'bg-orange-50 border-orange-200 text-orange-700' };
    if (score >= 65) return { label: '🟡 MODERATE RISK', bg: 'bg-yellow-50 border-yellow-200 text-yellow-800' };
    return { label: '🟢 LOWER RISK', bg: 'bg-[#E7F6EF] border-[#087F5B]/30 text-[#087F5B]' };
  };

  const risk = getRiskBadge(selectedVillage.riskScore);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 animate-fadeIn">
      {/* Header card */}
      <div className="bg-white border border-[#DCE7E1] p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {selectedVillage.district} District • Taluka: {selectedVillage.taluka}
          </span>
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-black border ${risk.bg}`}>
            {risk.label}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] mb-2">{selectedVillage.name}</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your village is currently classified as a <strong className="text-[#17221D]">{risk.label.replace(/^[🔴🟠🟡🟢]\s+/, '')}</strong> area by the prototype multi-hazard assessment model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#DCE7E1]">
          <div className="p-4 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-3">
            <Users className="w-5 h-5 text-[#087F5B]" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Total Population</div>
              <div className="text-base font-bold text-[#17221D]">{selectedVillage.population} residents ({selectedVillage.households} households)</div>
            </div>
          </div>
          <div className="p-4 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1] flex items-center space-x-3">
            <Activity className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Primary Hazard</div>
              <div className="text-base font-bold text-[#17221D]">{selectedVillage.primaryHazard} ({selectedVillage.terrainSlope})</div>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('community-risk')}
            className="p-4 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] font-bold text-sm rounded-2xl transition-colors border border-[#087F5B]/30 flex items-center justify-between group shadow-sm"
          >
            <span className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>[ WHY? ] (Understand Risks)</span>
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('community-help')}
            className="p-4 bg-[#F6F9F7] hover:bg-slate-200 text-[#17221D] font-bold text-sm rounded-2xl transition-colors border border-[#DCE7E1] flex items-center justify-between group shadow-sm"
          >
            <span className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#087F5B]" />
              <span>[ WHAT SHOULD I DO? ]</span>
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#DCE7E1]">
          <button
            onClick={() => onNavigate('community-relocation')}
            className="text-xs font-bold text-[#087F5B] hover:underline flex items-center space-x-1"
          >
            <span>View Safe Relocation Options & Capacity</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('community-map')}
            className="text-xs font-bold text-slate-700 hover:underline flex items-center space-x-1"
          >
            <MapPin className="w-4 h-4 text-[#087F5B]" />
            <span>View Simple Village Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
