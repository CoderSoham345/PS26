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
    <div className="space-y-6 pb-12 animate-fadeIn text-[#F8FAFC]">
      {/* Top Banner / Hero */}
      <div className="bg-[#111827] border border-[#1E293B] p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-[#10B981]/30">
              Maharashtra • 5 District Pilot
            </span>
            <span className="text-[10px] text-[#94A3B8] font-medium">State Disaster Management Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight">DISASTERGUARD</h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl">
            AI-Powered GIS Decision Support Platform for Proactive Disaster Relocation & Resilience Intelligence in <strong className="text-[#34D399]">{currentDistrictData.name} District</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigate('simulator')}
            className="px-5 py-3 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#34D399] hover:to-[#10B981] text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Open AI Simulator</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Dark GIS Command Theme) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Pilot Districts</span>
            <div className="p-2 bg-[#10B981]/15 text-[#10B981] rounded-xl border border-[#10B981]/30">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F8FAFC] font-mono">{metrics?.districtsCovered || 5} / 5</div>
          <div className="text-[11px] text-[#34D399] font-semibold mt-1">Raigad, Ratnagiri, Pune, Satara, Sindhudurg</div>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Vulnerable Habitations</span>
            <div className="p-2 bg-[#EF4444]/15 text-[#EF4444] rounded-xl border border-[#EF4444]/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#EF4444] font-mono">{metrics?.vulnerableHabitations || 84}</div>
          <div className="text-[11px] text-[#94A3B8] mt-1">{currentDistrictData.name}: {districtVillages.length} priority habitations</div>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Population Exposed</span>
            <div className="p-2 bg-[#0EA5E9]/15 text-[#0EA5E9] rounded-xl border border-[#0EA5E9]/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#F8FAFC] font-mono">{(metrics?.populationExposed || 32450).toLocaleString()}</div>
          <div className="text-[11px] text-[#0EA5E9] font-semibold mt-1">High slope & flood exposure</div>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Candidate Safe Sites</span>
            <div className="p-2 bg-[#10B981]/15 text-[#10B981] rounded-xl border border-[#10B981]/30">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#34D399] font-mono">{currentDistrictData.relocationSites.length} Active</div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-1">Plateau & terrace locations</div>
        </div>
      </div>

      {/* Target Villages List in Selected District */}
      <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-[#F8FAFC]">
              {currentDistrictData.name} Target Habitations (4)
            </h3>
            <p className="text-xs text-[#94A3B8]">Modelled high-risk habitations prioritized for relocation</p>
          </div>
          <button
            onClick={() => onNavigate('simulator')}
            className="text-xs font-bold text-[#34D399] hover:underline flex items-center space-x-1"
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
              className="bg-[#0B0F17] hover:bg-[#16202B] border border-[#1E293B] hover:border-[#10B981]/60 p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-black text-[#F8FAFC] group-hover:text-[#34D399] transition-colors">{v.name}</h4>
                  <span className="text-[10px] text-[#64748B]">({v.taluka} Taluka)</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#94A3B8] mt-1">
                  <span>Hazard: <strong className="text-[#EF4444]">{v.primaryHazard}</strong></span>
                  <span>•</span>
                  <span>Pop: <strong className="text-[#F8FAFC]">{v.population}</strong></span>
                  <span>•</span>
                  <span>Slope: <strong className="text-[#F8FAFC]">{v.terrainSlope}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-black text-[#EF4444] bg-[#EF4444]/15 px-2.5 py-1 rounded-lg border border-[#EF4444]/30">
                  {v.riskScore}/100
                </span>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#34D399] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
