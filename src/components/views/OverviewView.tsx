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
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-[#087F5B]/20">
              Maharashtra • 5 District Pilot
            </span>
            <span className="text-[10px] text-slate-500 font-medium">State Disaster Management Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17221D] tracking-tight">DISASTERGUARD</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            AI-Powered GIS Decision Support Platform for Proactive Disaster Relocation & Resilience Intelligence in <strong className="text-[#087F5B]">{currentDistrictData.name} District</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigate('gis-map')}
            className="px-5 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Live GIS Map</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (White + Green Theme) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilot Districts</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#17221D] font-mono">{metrics.districtsCovered} / 5</div>
          <div className="text-[11px] text-[#087F5B] font-semibold mt-1">Raigad, Ratnagiri, Pune, Satara, Sindhudurg</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Habitations</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#17221D] font-mono">{districtVillages.length} Active</div>
          <div className="text-[11px] text-slate-500 mt-1">Verified pilot cluster locations</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Population Exposed</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#17221D] font-mono">
            {districtVillages.reduce((acc, v) => acc + v.population, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-orange-600 font-semibold mt-1">High monsoon sensitivity</div>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Safe Relocation Sites</span>
            <div className="p-2 bg-[#E7F6EF] text-[#087F5B] rounded-xl">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#087F5B] font-mono">{currentDistrictData.relocationSites.length} Ready</div>
          <div className="text-[11px] text-[#087F5B] font-semibold mt-1">Geotechnically surveyed</div>
        </div>
      </div>

      {/* Target Villages Grid for Selected District */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#17221D]">Target Habitations ({selectedDistrict})</h2>
            <p className="text-xs text-slate-500">Exactly 4 primary target villages analyzed for this pilot district</p>
          </div>
          <button
            onClick={() => onNavigate('habitations')}
            className="text-xs font-bold text-[#087F5B] hover:underline flex items-center space-x-1"
          >
            <span>View All Habitations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {districtVillages.map((village) => (
            <div key={village.id} className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2 py-0.5 rounded font-bold">
                    {village.id}
                  </span>
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                    village.riskScore >= 85 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}>
                    Risk: {village.riskScore}/100
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#17221D] mb-1">{village.name}</h3>
                <p className="text-xs text-slate-500 mb-4">Taluka: {village.taluka} | Pop: {village.population}</p>

                <div className="bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1] mb-4 text-xs space-y-1">
                  <div className="text-slate-600">Primary Hazard: <strong className="text-[#087F5B]">{village.primaryHazard}</strong></div>
                  <div className="text-slate-600">Terrain Slope: <strong className="text-[#17221D]">{village.terrainSlope}</strong></div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('multihazard')}
                className="w-full py-2 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
              >
                <span>Inspect Hazard & Red Zone</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
