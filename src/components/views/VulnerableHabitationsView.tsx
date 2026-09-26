import React, { useState } from 'react';
import { Users, Search, MapPin, ChevronRight, ShieldAlert, Filter, Activity, Compass } from 'lucide-react';
import { Habitation } from '../../types';

interface VulnerableHabitationsViewProps {
  habitations: Habitation[];
  selectedDistrict: string;
  onSelectVillage: (v: Habitation) => void;
  onNavigateToMap: () => void;
}

export const VulnerableHabitationsView: React.FC<VulnerableHabitationsViewProps> = ({
  habitations,
  selectedDistrict,
  onSelectVillage,
  onNavigateToMap
}) => {
  const [hazardFilter, setHazardFilter] = useState<string>('All');

  const filtered = habitations.filter(h => {
    if (hazardFilter !== 'All' && h.primaryHazard !== hazardFilter) return false;
    return true;
  });

  const hazardOptions = ['All', 'Landslide', 'Flood', 'Coastal Erosion', 'Extreme Rainfall', 'Seismic Hazard'];

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-fadeIn w-full max-w-full">
      {/* 1. Header with Responsive Typography and Full-width Button on Mobile */}
      <div className="bg-white border border-[#DCE7E1] p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border border-[#B8E5D2]">
              {selectedDistrict} District • {habitations.length} Target Habitations
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Pilot Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] leading-tight">
            Vulnerable Habitations Registry
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Proactive multi-hazard risk tracking and priority classification
          </p>
        </div>

        <button
          onClick={onNavigateToMap}
          className="w-full md:w-auto h-12 px-5 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm shrink-0 min-h-[48px] cursor-pointer"
        >
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">View on Live GIS Map</span>
        </button>
      </div>

      {/* 2. Responsive Full-Width Hazard Filter Bar with Touch-Friendly Chips */}
      <div className="bg-white border border-[#DCE7E1] p-3.5 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-full overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-4 h-4 text-[#087F5B]" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Hazard:</span>
        </div>

        {/* Scrollable chip row - touch targets min 44px */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0 w-full">
          {hazardOptions.map((h) => (
            <button
              key={h}
              onClick={() => setHazardFilter(h)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer ${
                hazardFilter === h
                  ? 'bg-[#E7F6EF] border-[#087F5B] text-[#087F5B] shadow-2xs font-extrabold'
                  : 'bg-[#F6F9F7] border-[#DCE7E1] text-slate-600 hover:bg-slate-100'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MOBILE HABITATIONS CARDS (Visible on mobile <768px, hidden on desktop) */}
      <div className="block md:hidden space-y-3.5 w-full">
        {filtered.map((hab) => (
          <div
            key={hab.id}
            className="bg-white border border-[#DCE7E1] rounded-2xl p-4 shadow-sm space-y-3 w-full box-border"
          >
            <div className="flex items-start justify-between gap-2 border-b border-[#E8EFEB] pb-2.5">
              <div>
                <h3 className="text-base font-black text-[#17221D]">{hab.name}</h3>
                <span className="text-xs text-slate-500">{hab.taluka} Taluka, {hab.district}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${
                hab.relocationPriority === 'IMMEDIATE'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}>
                {hab.relocationPriority} PRIORITY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#F6F9F7] p-3 rounded-xl border border-[#DCE7E1]">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Risk Score</span>
                <strong className="text-sm font-mono font-black text-red-600">{hab.riskScore} / 100</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Hazard Type</span>
                <strong className="text-xs font-bold text-[#087F5B] truncate block">{hab.primaryHazard}</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Population</span>
                <strong className="text-xs text-[#17221D]">{hab.population} residents</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Terrain Slope</span>
                <strong className="text-xs text-slate-700">{hab.terrainSlope}</strong>
              </div>
            </div>

            <button
              onClick={() => onSelectVillage(hab)}
              className="w-full h-11 py-2 bg-[#E7F6EF] hover:bg-[#087F5B] text-[#087F5B] hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 min-h-[44px] cursor-pointer"
            >
              <span>View Details & Simulate Relocation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white border border-[#DCE7E1] rounded-2xl p-6 text-center text-slate-500 text-xs">
            No habitations found matching the selected hazard filter.
          </div>
        )}
      </div>

      {/* 4. DESKTOP HABITATIONS TABLE (Hidden on mobile <768px, visible on md+) */}
      <div className="hidden md:block bg-white border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DCE7E1] bg-[#F6F9F7] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Habitation Name</th>
                <th className="py-3.5 px-4">Taluka</th>
                <th className="py-3.5 px-4">Population</th>
                <th className="py-3.5 px-4">Primary Hazard</th>
                <th className="py-3.5 px-4">Risk Score</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE7E1] text-xs">
              {filtered.map((hab) => (
                <tr key={hab.id} className="hover:bg-[#F6F9F7]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#17221D]">{hab.name}</td>
                  <td className="py-4 px-4 text-slate-600">{hab.taluka}</td>
                  <td className="py-4 px-4 font-mono text-slate-700">{hab.population}</td>
                  <td className="py-4 px-4 font-semibold text-[#087F5B]">{hab.primaryHazard}</td>
                  <td className="py-4 px-4 font-mono font-bold text-red-600">{hab.riskScore} / 100</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      hab.relocationPriority === 'IMMEDIATE' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      {hab.relocationPriority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onSelectVillage(hab)}
                      className="px-3.5 py-2 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] font-bold text-xs rounded-xl transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

