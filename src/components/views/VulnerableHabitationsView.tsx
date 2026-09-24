import React, { useState } from 'react';
import { Users, Search, MapPin, ChevronRight, ShieldAlert, Filter } from 'lucide-react';
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

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {selectedDistrict} District • 4 Target Habitations
            </span>
            <span className="text-[10px] text-slate-500">Pilot Registry</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Vulnerable Habitations Registry</h1>
          <p className="text-xs text-slate-600">Proactive multi-hazard risk tracking and priority classification</p>
        </div>

        <button
          onClick={onNavigateToMap}
          className="px-4 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
        >
          <MapPin className="w-4 h-4" />
          <span>View on Live GIS Map</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-sm flex items-center space-x-3">
        <Filter className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-700">Filter Hazard:</span>
        {['All', 'Landslide', 'Flood', 'Coastal Erosion', 'Extreme Rainfall', 'Seismic Hazard'].map((h) => (
          <button
            key={h}
            onClick={() => setHazardFilter(h)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${
              hazardFilter === h ? 'bg-[#E7F6EF] border-[#087F5B]/50 text-[#087F5B]' : 'bg-[#F6F9F7] border-[#DCE7E1] text-slate-600 hover:bg-slate-100'
            }`}
          >
            {h}
          </button>
        ))}
      </div>

      {/* Habitations Table / Cards */}
      <div className="bg-white border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
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
                      className="px-3 py-1.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] font-bold text-xs rounded-xl transition-colors inline-flex items-center space-x-1"
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
