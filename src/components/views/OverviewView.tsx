import React from 'react';
import { ShieldAlert, Users, Building, MapPin, ArrowUpRight, ChevronRight, Activity, Sparkles, Navigation } from 'lucide-react';
import { PILOT_DISTRICTS } from '../../data/pilotData';
import { Habitation } from '../../types';

interface OverviewViewProps {
  metrics: any;
  habitations: Habitation[];
  onNavigate: (tab: string) => void;
  selectedDistrict: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  habitations,
  onNavigate,
  selectedDistrict
}) => {
  const currentDistrictData = PILOT_DISTRICTS[selectedDistrict.toLowerCase()] || PILOT_DISTRICTS['raigad'];
  const districtVillages = currentDistrictData.targetVillages;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn text-[#17221D]">
      {/* Top Banner / Hero */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-[#B8E5D2]">
              Maharashtra • 5 District Pilot
            </span>
            <span className="text-[10px] text-[#66736D] font-medium">State Disaster Management Authority</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#07543F] tracking-tight">सुरक्षित धरा</h1>
            <span className="text-base sm:text-lg font-black text-[#087F5B] uppercase tracking-wider">SURAKSHIT DHARA</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#087F5B] mt-0.5">
            AI + GIS Disaster Risk & Safe Settlement Intelligence
          </p>
          <p className="text-xs sm:text-sm text-[#66736D] mt-1 max-w-xl">
            Proactive Disaster Relocation & Resilience Intelligence in <strong className="text-[#087F5B]">{currentDistrictData.name} District</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigate('simulator')}
            className="px-5 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Open AI Simulator</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (White + Green Theme) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#66736D] uppercase tracking-wider">Pilot Districts</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl border border-[#B8E5D2]">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#07543F] font-mono">{metrics?.districtsCovered || 5} / 5</div>
          <div className="text-[11px] text-[#087F5B] font-semibold mt-1">Raigad, Ratnagiri, Pune, Satara, Sindhudurg</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#66736D] uppercase tracking-wider">Vulnerable Habitations</span>
            <div className="p-2 bg-red-50 text-[#DC3545] rounded-xl border border-red-200">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#DC3545] font-mono">{metrics?.vulnerableHabitations || 84}</div>
          <div className="text-[11px] text-[#66736D] mt-1">{currentDistrictData.name}: {districtVillages.length} priority habitations</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#66736D] uppercase tracking-wider">Population Exposed</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl border border-[#B8E5D2]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#07543F] font-mono">{(metrics?.populationExposed || 32450).toLocaleString()}</div>
          <div className="text-[11px] text-[#087F5B] font-semibold mt-1">High slope & flood exposure</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#66736D] uppercase tracking-wider">Candidate Safe Sites</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl border border-[#B8E5D2]">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#07543F] font-mono">{currentDistrictData.relocationSites.length} Active</div>
          <div className="text-[11px] text-[#087F5B] font-semibold mt-1">Plateau & terrace locations</div>
        </div>
      </div>

      {/* Target Villages List in Selected District */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)]">
        <div className="flex items-center justify-between mb-4 border-b border-[#E8EFEB] pb-3">
          <div>
            <h3 className="text-base font-black text-[#17221D]">
              {currentDistrictData.name} Target Habitations (4)
            </h3>
            <p className="text-xs text-[#66736D]">Modelled high-risk habitations prioritized for relocation</p>
          </div>
          <button
            onClick={() => onNavigate('simulator')}
            className="text-xs font-bold text-[#087F5B] hover:underline flex items-center space-x-1"
          >
            <span>Simulate Relocation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {districtVillages.map((v) => (
            <div
              key={v.id}
              onClick={() => onNavigate('simulator')}
              className="bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] hover:border-[#B8E5D2] p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-black text-[#17221D] group-hover:text-[#087F5B] transition-colors">{v.name}</h4>
                  <span className="text-[10px] text-[#66736D]">({v.taluka} Taluka)</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#66736D] mt-1">
                  <span>Hazard: <strong className="text-[#DC3545]">{v.primaryHazard}</strong></span>
                  <span>•</span>
                  <span>Pop: <strong className="text-[#17221D]">{v.population}</strong></span>
                  <span>•</span>
                  <span>Slope: <strong className="text-[#17221D]">{v.terrainSlope}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-black text-[#DC3545] bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                  {v.riskScore}/100
                </span>
                <ChevronRight className="w-4 h-4 text-[#66736D] group-hover:text-[#087F5B] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
