import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Habitation } from '../../types';

interface RelocationPrioritizationViewProps {
  habitations: Habitation[];
  onSelectForSafeSite: (v: Habitation) => void;
}

export const RelocationPrioritizationView: React.FC<RelocationPrioritizationViewProps> = ({
  habitations,
  onSelectForSafeSite
}) => {
  const priorityTiers = ['IMMEDIATE', 'SHORT_TERM', 'MEDIUM_TERM', 'MONITOR'];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17221D] mb-1">AI Relocation Prioritization Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-600">Explainable multi-tier relocation scheduling based on exposure and vulnerability</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-600">Monitored Habitations: <strong className="text-[#087F5B]">{habitations.length}</strong></span>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {priorityTiers.map((tier) => {
          const tierHabitations = habitations.filter(h => h.relocationPriority === tier);
          if (tierHabitations.length === 0) return null;

          const tierColor = tier === 'IMMEDIATE' 
            ? 'border-red-200 bg-red-50 text-red-700' 
            : tier === 'SHORT_TERM' 
            ? 'border-orange-200 bg-orange-50 text-orange-700' 
            : 'border-yellow-200 bg-yellow-50 text-yellow-800';

          return (
            <div key={tier} className="bg-white border border-[#DCE7E1] rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCE7E1] flex-wrap gap-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black border ${tierColor}`}>
                    {tier} PRIORITY
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{tierHabitations.length} habitations scheduled</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {tierHabitations.map((hab) => (
                  <div key={hab.id} className="bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm sm:text-base font-bold text-[#17221D]">{hab.name}</h3>
                        <span className="text-xs font-mono font-bold text-red-600">{hab.riskScore} / 100 Score</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">District: {hab.district} | Population: {hab.population} residents</p>

                      <div className="bg-[#E7F6EF] border border-[#087F5B]/30 rounded-xl p-3 mb-4">
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#087F5B] mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Priority Justification</span>
                        </div>
                        <p className="text-[11px] text-[#17221D] leading-relaxed">
                          {hab.aiReasoning}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 border-t border-[#DCE7E1] gap-2.5">
                      <div className="text-[10px] text-slate-500 font-mono">Primary Hazard: <span className="text-[#087F5B] font-bold">{hab.primaryHazard}</span></div>
                      <button
                        onClick={() => onSelectForSafeSite(hab)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow-sm min-h-[44px] cursor-pointer"
                      >
                        <span>Find Safe Sites</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
