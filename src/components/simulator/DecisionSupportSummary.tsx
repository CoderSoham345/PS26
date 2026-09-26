import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t } from '../../lib/i18n';

interface DecisionSupportSummaryProps {
  habitation: Habitation;
  site: RelocationSite;
  stage: 'before' | 'relocation' | 'after';
  currentLang: Language;
}

export const DecisionSupportSummary: React.FC<DecisionSupportSummaryProps> = ({
  habitation,
  site,
  stage,
  currentLang
}) => {
  return (
    <div className="bg-white border border-[#DCE7E1] p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8EFEB]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#17221D]">
              {t('decisionSupportSummary', currentLang)}
            </h3>
            <span className="text-[10px] text-[#66736D]">
              {habitation.name} ({habitation.district}) → {site.name}
            </span>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
          {t('aiGenerated', currentLang)}
        </span>
      </div>

      {/* 4 Core Decision Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Section 1: WHY RELOCATE? */}
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#DC3545] font-bold text-[11px] uppercase tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whyRelocate', currentLang)}</span>
          </div>
          <p className="text-[#66736D] leading-relaxed text-[11px]">
            {habitation.name} has a modelled risk index of <strong className="text-[#DC3545]">{habitation.riskScore}/100</strong> with severe {habitation.primaryHazard.toLowerCase()} susceptibility, steep slope gradient ({habitation.terrainSlope}), and {habitation.historicalEventsCount} historical disaster occurrences threatening {habitation.population} residents across {habitation.households} households.
          </p>
        </div>

        {/* Section 2: WHY THIS SITE? */}
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#087F5B] font-bold text-[11px] uppercase tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whyThisSite', currentLang)}</span>
          </div>
          <p className="text-[#66736D] leading-relaxed text-[11px]">
            {site.name} scores <strong className="text-[#087F5B]">{site.suitabilityScore}/100</strong> suitability with {site.landAvailabilityHa} ha of stable basaltic terrain. Situated {site.distanceFromSourceKm} km away, it offers {site.roadAccess.toLowerCase()} road connectivity, zero flood inundation risk, and estimated carrying capacity for {site.estimatedCapacity} persons.
          </p>
        </div>

        {/* Section 3: WHAT CHANGES AFTER RELOCATION? */}
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#0284C7] font-bold text-[11px] uppercase tracking-wide">
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whatChangesAfter', currentLang)}</span>
          </div>
          <p className="text-[#66736D] leading-relaxed text-[11px]">
            Transition from hazardous scarp living to planned community clusters with permanent ZP model schooling, emergency triage PHC clinic ({site.hospitalDistanceKm} km), reliable potable water, and guaranteed 4-lane arterial road egress during Sahyadri monsoon deluges.
          </p>
        </div>

        {/* Section 4: LIMITATIONS */}
        <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#D97706] font-bold text-[11px] uppercase tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{t('limitations', currentLang)}</span>
          </div>
          <p className="text-[#66736D] leading-relaxed text-[11px]">
            Modelled decision-support output based on pilot district GIS layers. Not an official statutory land acquisition or relocation gazette. Detailed borehole geotechnical and Gram Sabha cadastral approvals remain mandatory before execution.
          </p>
        </div>
      </div>
    </div>
  );
};
