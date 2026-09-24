import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface SafeSiteFinderViewProps {
  habitations: Habitation[];
  relocationSites: RelocationSite[];
  selectedHabitation: Habitation;
  onSelectSite: (s: RelocationSite) => void;
}

export const SafeSiteFinderView: React.FC<SafeSiteFinderViewProps> = ({
  habitations,
  relocationSites,
  selectedHabitation,
  onSelectSite
}) => {
  const [currentHab, setCurrentHab] = useState<Habitation>(selectedHabitation);
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [searched, setSearched] = useState<boolean>(true);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Safe Relocation Site Finder
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Candidate Site Search</h1>
          <p className="text-xs text-slate-600">Scan candidate plateau and terrace zones within search radius for geotechnical suitability</p>
        </div>
      </div>

      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Original Vulnerable Habitation</label>
          <select
            value={currentHab.id}
            onChange={(e) => {
              const h = habitations.find(v => v.id === e.target.value);
              if (h) setCurrentHab(h);
            }}
            className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-2.5 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
          >
            {habitations.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.district}) - {h.population} pop</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Search Radius</label>
          <div className="flex items-center space-x-3">
            {[5, 10, 20].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusKm(r)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  radiusKm === r ? 'bg-[#E7F6EF] border-[#087F5B]/50 text-[#087F5B]' : 'bg-[#F6F9F7] border-[#DCE7E1] text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setSearched(true)}
            className="w-full py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Find Suitable Sites</span>
          </button>
        </div>
      </div>

      {searched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#17221D] uppercase tracking-wider">Candidate Sites within {radiusKm} km of {currentHab.name}</h2>
            <span className="text-xs text-[#087F5B] font-bold">{relocationSites.length} verified candidate locations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relocationSites.map((site) => (
              <div key={site.id} className="bg-white border border-[#DCE7E1] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#E7F6EF] text-[#087F5B] border border-[#087F5B]/30 text-[10px] font-bold">
                      {site.id}
                    </span>
                    <span className="text-lg font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</span>
                  </div>

                  <h3 className="text-base font-bold text-[#17221D] mb-1">{site.name}</h3>
                  <p className="text-xs text-slate-600 mb-4">Distance from source: <strong className="text-[#17221D]">{site.distanceFromSourceKm} km</strong></p>

                  <div className="space-y-2.5 text-xs text-slate-700 mb-6 border-y border-[#DCE7E1] py-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Capacity:</span>
                      <span className="font-bold text-[#17221D]">{site.estimatedCapacity} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Landslide / Flood Risk:</span>
                      <span className="font-semibold text-[#087F5B]">{site.landslideRisk} / {site.floodRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Road Access:</span>
                      <span className="font-semibold text-[#17221D]">{site.roadAccess}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Water Availability:</span>
                      <span className="font-semibold text-[#17221D]">{site.waterAvailability}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSite(site)}
                  className="w-full py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm"
                >
                  <span>View Suitability & Carrying Capacity</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
