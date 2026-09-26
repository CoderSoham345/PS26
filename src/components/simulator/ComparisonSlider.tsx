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
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center space-x-2">
          <Sliders className="w-3.5 h-3.5 text-[#087F5B]" />
          <span className="font-bold text-[#17221D]">
            {t('comparisonSlider', currentLang)}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] font-bold">
          <span className="text-[#DC3545] flex items-center space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>{habitation.name} (Before: {100 - split}%)</span>
          </span>
          <span className="text-[#087F5B] flex items-center space-x-1">
            <span>{site.name} (After: {split}%)</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="w-full h-2 bg-[#E8EFEB] rounded-lg appearance-none cursor-pointer accent-[#087F5B]"
        />
      </div>

      <div className="flex justify-between text-[10px] text-[#66736D] mt-1.5 font-mono">
        <span>◀ 100% Vulnerable Slope & Red Zone</span>
        <span>Transition Neutral (50%)</span>
        <span>100% Planned Resilient Settlement ▶</span>
      </div>
    </div>
  );
};
