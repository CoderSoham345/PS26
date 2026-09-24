import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Habitation } from '../../types';

interface ScenarioSimulationViewProps {
  habitation: Habitation;
  onNavigateToReport: () => void;
}

export const ScenarioSimulationView: React.FC<ScenarioSimulationViewProps> = ({
  habitation,
  onNavigateToReport
}) => {
  const [rainfallDelta, setRainfallDelta] = useState<number>(20);
  const [popGrowth, setPopGrowth] = useState<number>(10);
  const [landDelta, setLandDelta] = useState<number>(-10);

  const adjustedRiskScore = Math.min(100, Math.round(habitation.riskScore * (1 + (rainfallDelta * 0.005) + (popGrowth * 0.002))));
  const adjustedAffectedPop = Math.round(habitation.population * (1 + (popGrowth / 100)));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              What-If Climate Scenario Modeling
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Scenario Simulation: {habitation.name}</h1>
          <p className="text-xs text-slate-600">Modify rainfall anomaly, population growth, and land availability parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-[#17221D] mb-2">Simulation Parameters</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Rainfall Intensity Increase: +{rainfallDelta}%</label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={rainfallDelta}
              onChange={(e) => setRainfallDelta(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Population Growth Rate: +{popGrowth}%</label>
            <input
              type="range"
              min="0"
              max="25"
              step="5"
              value={popGrowth}
              onChange={(e) => setPopGrowth(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Available Land Adjustment: {landDelta}%</label>
            <input
              type="range"
              min="-30"
              max="0"
              step="5"
              value={landDelta}
              onChange={(e) => setLandDelta(Number(e.target.value))}
              className="w-full accent-[#087F5B] cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17221D] mb-4">Projected Scenario Impact</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">Baseline vs Projected Risk</div>
                <div className="text-2xl font-black font-mono text-red-600">{habitation.riskScore} → {adjustedRiskScore}</div>
              </div>
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">Affected Population</div>
                <div className="text-2xl font-black font-mono text-[#087F5B]">{adjustedAffectedPop} residents</div>
              </div>
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-4 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">Relocation Urgency</div>
                <div className="text-xs font-bold text-red-600 mt-2 uppercase tracking-wider">IMMEDIATE ESCALATION</div>
              </div>
            </div>

            <div className="p-4 bg-[#E7F6EF] border border-[#087F5B]/30 rounded-xl mb-6">
              <div className="text-xs font-bold text-[#087F5B] mb-1">AI Scenario Interpretation</div>
              <p className="text-xs text-[#17221D] leading-relaxed">
                A +{rainfallDelta}% increase in monsoon rainfall coupled with a +{popGrowth}% population surge pushes {habitation.name} past critical slope saturation thresholds in {habitation.district} district.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DCE7E1] flex justify-end">
            <button
              onClick={onNavigateToReport}
              className="px-6 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Generate Authority Relocation Report</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
