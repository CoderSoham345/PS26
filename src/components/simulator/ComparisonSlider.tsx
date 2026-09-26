import React from 'react';
import { Sliders, ArrowLeft, ArrowRight } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t } from '../../lib/i18n';

interface ComparisonSliderProps {
  habitation: Habitation;
  site: RelocationSite;
  split: number;
  setSplit: (val: number) => void;
  currentLang: Language;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  habitation,
  site,
  split,
  setSplit,
  currentLang
}) => {
  return (
    <div className="bg-white border border-[#DCE7E1] p-3.5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs mb-2">
        <div className="flex items-center space-x-2">
          <Sliders className="w-3.5 h-3.5 text-[#087F5B]" />
          <span className="font-bold text-[#17221D]">
            {t('comparisonSlider', currentLang)}
          </span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 text-[10px] sm:text-[11px] font-bold">
          <span className="text-[#DC3545] flex items-center space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>{habitation.name} ({100 - split}%)</span>
          </span>
          <span className="text-[#087F5B] flex items-center space-x-1">
            <span>{site.name} ({split}%)</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="relative flex items-center py-1">
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="w-full h-2.5 bg-[#E8EFEB] rounded-lg appearance-none cursor-pointer accent-[#087F5B]"
        />
      </div>

      <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-[#66736D] mt-1 font-mono">
        <span className="truncate max-w-[45%]">◀ Before (Red Zone)</span>
        <span className="hidden sm:inline">Neutral (50%)</span>
        <span className="truncate max-w-[45%] text-right">After (Planned) ▶</span>
      </div>
    </div>
  );
};
