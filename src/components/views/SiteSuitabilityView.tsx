import React from 'react';
import { ChevronRight } from 'lucide-react';
import { RelocationSite } from '../../types';

interface SiteSuitabilityViewProps {
  site: RelocationSite;
  onNavigateToCapacity: () => void;
}

export const SiteSuitabilityView: React.FC<SiteSuitabilityViewProps> = ({ site, onNavigateToCapacity }) => {
  const criteria = [
    { name: 'Hazard Safety', score: site.safetyScore, desc: 'Low landslide susceptibility and secure elevation buffer' },
    { name: 'Terrain Suitability', score: site.terrainScore, desc: 'Stable plateau gradient (<12°) suitable for mass housing' },
    { name: 'Road Accessibility', score: 88, desc: 'Direct connection to state/district arterial highway' },
    { name: 'Water Availability', score: 90, desc: 'Reliable groundwater table and perennial stream proximity' },
    { name: 'Healthcare Accessibility', score: 82, desc: `Nearest primary health centre within ${site.hospitalDistanceKm} km` },
    { name: 'Education Accessibility', score: 79, desc: `Secondary school located within ${site.schoolDistanceKm} km` },
    { name: 'Emergency Access', score: 85, desc: 'Dual-egress escape route verified' },
    { name: 'Population Capacity', score: 92, desc: `Ample land area (${site.landAvailabilityHa} ha) for housing and amenities` },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Site Suitability Index
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">{site.name}</h1>
          <p className="text-xs text-slate-600">District: {site.district} | Taluka: {site.taluka} | Status: {site.status}</p>
        </div>
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-4 py-2.5 rounded-xl text-center">
          <div className="text-2xl font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold">Overall Suitability</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {criteria.map((c, i) => (
          <div key={i} className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#17221D]">{c.name}</span>
                <span className="text-sm font-black font-mono text-[#087F5B]">{c.score}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
            <div className="w-full bg-[#F6F9F7] border border-[#DCE7E1] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#087F5B] h-full rounded-full" style={{ width: `${c.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-sm font-bold text-[#17221D] mb-1">Transparent Calculation Formula</h2>
          <p className="text-xs text-slate-600">Suitability Index is calculated via weighted aggregation of safety, terrain stability, water security, and infrastructure connectivity.</p>
        </div>
        <button
          onClick={onNavigateToCapacity}
          className="px-6 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors shrink-0 flex items-center space-x-2 shadow-sm"
        >
          <span>Proceed to Carrying Capacity Assessment</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
