import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { RelocationSite, Habitation } from '../../types';

interface CarryingCapacityViewProps {
  site: RelocationSite;
  habitations: Habitation[];
  onNavigateToSimulator: () => void;
}

export const CarryingCapacityView: React.FC<CarryingCapacityViewProps> = ({
  site,
  habitations,
  onNavigateToSimulator
}) => {
  const [targetHab, setTargetHab] = useState<Habitation>(habitations[0]);
  const [availableLandHa, setAvailableLandHa] = useState<number>(site.landAvailabilityHa);
  const [buildablePct, setBuildablePct] = useState<number>(60);
  const [housingDensityUnitsPerHa, setHousingDensityUnitsPerHa] = useState<number>(25);

  const suitableAreaHa = (availableLandHa * buildablePct) / 100;
  const estimatedHousingUnits = Math.round(suitableAreaHa * housingDensityUnitsPerHa);
  const populationPerUnit = 4.2;
  const estimatedPopulationCapacity = Math.round(estimatedHousingUnits * populationPerUnit);
  const isSufficient = estimatedPopulationCapacity >= targetHab.population;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Carrying Capacity Audit
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Carrying Capacity Assessment: {site.name}</h1>
          <p className="text-xs text-slate-600">Evaluate land usability, housing units, water, and infrastructure capacity for incoming resettled populations</p>
        </div>
        <div className={`px-4 py-2.5 rounded-xl border flex items-center space-x-2 ${
          isSufficient ? 'bg-[#E7F6EF] border-[#087F5B]/40 text-[#087F5B]' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {isSufficient ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span className="text-xs font-bold uppercase tracking-wider">{isSufficient ? 'CAPACITY SUFFICIENT' : 'CAPACITY INSUFFICIENT'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#17221D] mb-2">Capacity Planning Parameters</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Resettlement Habitation</label>
            <select
              value={targetHab.id}
              onChange={(e) => {
                const h = habitations.find(v => v.id === e.target.value);
                if (h) setTargetHab(h);
              }}
              className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-3 py-2 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
            >
              {habitations.map(h => (
                <option key={h.id} value={h.id}>{h.name} ({h.population} residents)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Available Land Area: {availableLandHa} ha</label>
            <input
              type="range"
              min="5"
              max="60"
              value={availableLandHa}
              onChange={(e) => setAvailableLandHa(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Buildable Area Percentage: {buildablePct}%</label>
            <input
              type="range"
              min="30"
              max="90"
              value={buildablePct}
              onChange={(e) => setBuildablePct(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Housing Density: {housingDensityUnitsPerHa} units/ha</label>
            <input
              type="range"
              min="15"
              max="45"
              value={housingDensityUnitsPerHa}
              onChange={(e) => setHousingDensityUnitsPerHa(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17221D] mb-4">Carrying Capacity Audit Summary</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-[11px] text-slate-500 mb-1">Suitable Area</div>
                <div className="text-xl font-bold font-mono text-[#087F5B]">{suitableAreaHa.toFixed(1)} ha</div>
              </div>
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-[11px] text-slate-500 mb-1">Housing Units</div>
                <div className="text-xl font-bold font-mono text-[#17221D]">{estimatedHousingUnits} units</div>
              </div>
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-[11px] text-slate-500 mb-1">Population Capacity</div>
                <div className="text-xl font-bold font-mono text-[#087F5B]">{estimatedPopulationCapacity} people</div>
              </div>
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-[11px] text-slate-500 mb-1">Incoming Population</div>
                <div className="text-xl font-bold font-mono text-orange-600">{targetHab.population} people</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Infrastructure Capacity Checklist</div>
              {[
                { item: 'Water Capacity (Perennial Aquifer / Borewells)', status: 'Sufficient (180 LPCD)', ok: true },
                { item: 'Road & Arterial Connectivity', status: 'Sufficient (7m approach road)', ok: true },
                { item: 'Healthcare Capacity (PHC / Sub-Centre)', status: 'Requires Sub-Centre Upgrade', ok: false },
                { item: 'Education Capacity (Primary School)', status: 'Sufficient (Capacity for 350 children)', ok: true },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-700">{c.item}</span>
                  <span className={`font-bold ${c.ok ? 'text-[#087F5B]' : 'text-orange-600'}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#DCE7E1] flex justify-end">
            <button
              onClick={onNavigateToSimulator}
              className="px-6 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Run Rehabilitation Simulator (Before / After)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
