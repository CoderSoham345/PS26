import React, { useState } from 'react';
import { RefreshCw, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface RehabilitationSimulatorViewProps {
  habitation: Habitation;
  site: RelocationSite;
}

export const RehabilitationSimulatorView: React.FC<RehabilitationSimulatorViewProps> = ({
  habitation,
  site
}) => {
  const [stage, setStage] = useState<'before' | 'relocation' | 'after'>('before');

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Signature Simulator • {habitation.district} District
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">AI Rehabilitation & City Transformation Simulator</h1>
          <p className="text-xs text-slate-600">Visualizing habitation transition from {habitation.name} to {site.name}</p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F6F9F7] p-1.5 rounded-xl border border-[#DCE7E1]">
          {(['before', 'relocation', 'after'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                stage === s ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#DCE7E1] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#17221D] uppercase tracking-wider">
              {stage === 'before' && `BEFORE: Vulnerable Habitation (${habitation.name})`}
              {stage === 'relocation' && `RELOCATION: Population Resettlement Animation`}
              {stage === 'after' && `AFTER: Safe Resilient Settlement (${site.name})`}
            </h2>
            <span className="text-xs text-[#087F5B] font-mono font-bold">District Pilot Scenario</span>
          </div>

          <div className="relative h-96 rounded-xl bg-[#F6F9F7] border border-[#DCE7E1] overflow-hidden flex items-center justify-center p-6">
            {stage === 'before' && (
              <div className="absolute inset-0 p-8 flex flex-col justify-between bg-red-50/50">
                <div className="flex justify-between items-start">
                  <div className="bg-red-100 border border-red-300 px-3 py-1.5 rounded-xl text-xs text-red-700 font-bold flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
                    <span>High Hazard Zone ({habitation.terrainSlope})</span>
                  </div>
                  <div className="text-right text-xs text-slate-600">
                    <div>Population: {habitation.population}</div>
                    <div>Access: {habitation.accessibility}</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-sm font-bold text-[#17221D]">Vulnerable Housing Stock on Unstable Regolith</div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">Repeated monsoon saturation events threaten {habitation.households} households with severe hazard risks.</p>
                </div>

                <div className="flex justify-center space-x-2 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  <span>Exposure: 100%</span>
                  <span>•</span>
                  <span>Primary Hazard: {habitation.primaryHazard}</span>
                </div>
              </div>
            )}

            {stage === 'relocation' && (
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center space-y-6 bg-teal-50/50">
                <div className="w-16 h-16 rounded-full bg-[#E7F6EF] border border-[#087F5B]/30 flex items-center justify-center text-[#087F5B] animate-spin">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#17221D] mb-1">Executing Resettlement Logistics</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Relocating <strong className="text-[#087F5B]">{habitation.population} residents</strong> from {habitation.name} to {site.name} ({site.distanceFromSourceKm} km transit corridor).
                  </p>
                </div>
                <div className="w-full max-w-sm bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#087F5B] h-full rounded-full animate-pulse" style={{ width: '85%' }} />
                </div>
              </div>
            )}

            {stage === 'after' && (
              <div className="absolute inset-0 p-8 flex flex-col justify-between bg-emerald-50/50">
                <div className="flex justify-between items-start">
                  <div className="bg-[#E7F6EF] border border-[#087F5B]/30 px-3 py-1.5 rounded-xl text-xs text-[#087F5B] font-bold flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                    <span>Geotechnically Approved Safe Settlement</span>
                  </div>
                  <div className="text-right text-xs text-[#087F5B] font-bold">
                    Suitability Score: {site.suitabilityScore}/100
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-sm font-bold text-[#17221D]">Resilient Housing Clusters & All-Weather Road Access</div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">Equipped with reliable water supply, solar microgrids, primary health sub-centre, and disaster-resistant structural frames.</p>
                </div>

                <div className="flex justify-center space-x-4 text-[11px] text-[#087F5B] uppercase tracking-widest font-bold">
                  <span>Exposure: 0%</span>
                  <span>•</span>
                  <span>Emergency Access: Optimal</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-[#17221D] mb-4">Simulated Indicator Delta</h2>
            
            <div className="space-y-4">
              {[
                { label: 'Population Exposure', before: '100% Exposed', after: '0% Exposed', delta: '-100%' },
                { label: 'Emergency Accessibility', before: 'Poor (Single Ridge)', after: 'Optimal (Dual Highway)', delta: '+85%' },
                { label: 'Hazard Exposure', before: 'Very High', after: 'Low (Stable Plateau)', delta: '-92%' },
                { label: 'Infrastructure Access', before: 'Deficient', after: 'Fully Compliant', delta: '+100%' },
              ].map((ind, i) => (
                <div key={i} className="p-3.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#17221D]">{ind.label}</span>
                    <span className="text-xs font-mono font-bold text-[#087F5B]">{ind.delta}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Before: {ind.before}</span>
                    <span>After: {ind.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#DCE7E1] text-[11px] text-slate-500 text-center font-medium">
            Simulated planning scenario validated by DisasterGuard AI Engine.
          </div>
        </div>
      </div>
    </div>
  );
};
