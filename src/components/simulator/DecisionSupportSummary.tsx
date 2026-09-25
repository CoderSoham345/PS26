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
    <div className="bg-[#111827] border border-[#1E293B] p-5 rounded-2xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F8FAFC]">
              {t('decisionSupportSummary', currentLang)}
            </h3>
            <span className="text-[10px] text-[#64748B]">
              {habitation.name} ({habitation.district}) → {site.name}
            </span>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
          {t('aiGenerated', currentLang)}
        </span>
      </div>

      {/* 4 Core Decision Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Section 1: WHY RELOCATE? */}
        <div className="bg-[#0B0F17] border border-[#1E293B] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#EF4444] font-bold text-[11px] uppercase tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whyRelocate', currentLang)}</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed text-[11px]">
            {habitation.name} has a modelled risk index of <strong className="text-[#EF4444]">{habitation.riskScore}/100</strong> with severe {habitation.primaryHazard.toLowerCase()} susceptibility, steep slope gradient ({habitation.terrainSlope}), and {habitation.historicalEventsCount} historical disaster occurrences threatening {habitation.population} residents across {habitation.households} households.
          </p>
        </div>

        {/* Section 2: WHY THIS SITE? */}
        <div className="bg-[#0B0F17] border border-[#1E293B] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#10B981] font-bold text-[11px] uppercase tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whyThisSite', currentLang)}</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed text-[11px]">
            {site.name} scores <strong className="text-[#34D399]">{site.suitabilityScore}/100</strong> suitability with {site.landAvailabilityHa} ha of stable basaltic terrain. Situated {site.distanceFromSourceKm} km away, it offers {site.roadAccess.toLowerCase()} road connectivity, zero flood inundation risk, and estimated carrying capacity for {site.estimatedCapacity} persons.
          </p>
        </div>

        {/* Section 3: WHAT CHANGES AFTER RELOCATION? */}
        <div className="bg-[#0B0F17] border border-[#1E293B] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#0EA5E9] font-bold text-[11px] uppercase tracking-wide">
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span>{t('whatChangesAfter', currentLang)}</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed text-[11px]">
            Transition from hazardous scarp living to planned community clusters with permanent ZP model schooling, emergency triage PHC clinic ({site.hospitalDistanceKm} km), reliable potable water, and guaranteed 4-lane arterial road egress during Sahyadri monsoon deluges.
          </p>
        </div>

        {/* Section 4: LIMITATIONS */}
        <div className="bg-[#0B0F17] border border-[#1E293B] p-3.5 rounded-xl space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[#F59E0B] font-bold text-[11px] uppercase tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{t('limitations', currentLang)}</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed text-[11px]">
            Modelled decision-support output based on pilot district GIS layers. Not an official statutory land acquisition or relocation gazette. Detailed borehole geotechnical and Gram Sabha cadastral approvals remain mandatory before execution.
          </p>
        </div>
      </div>
    </div>
  );
};
