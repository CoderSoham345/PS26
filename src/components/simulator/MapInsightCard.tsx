import React from 'react';
import { Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t } from '../../lib/i18n';

interface MapInsightCardProps {
  habitation: Habitation;
  site: RelocationSite;
  stage: 'before' | 'relocation' | 'after';
  currentLang: Language;
}

export const MapInsightCard: React.FC<MapInsightCardProps> = ({
  habitation,
  site,
  stage,
  currentLang
}) => {
  // Generate dynamic contextual insight based on current state
  const getDynamicInsight = () => {
    if (stage === 'before') {
      return `The selected village (${habitation.name}, ${habitation.district}) overlaps a modelled high-risk ${habitation.primaryHazard.toLowerCase()} area (Score: ${habitation.riskScore}/100) on a ${habitation.terrainSlope} slope. Historical disaster events (${habitation.historicalEventsCount} occurrences) and severe access constraints justify proactive resettlement priority.`;
    }
    if (stage === 'relocation') {
      return `Proposed relocation transit routes ${habitation.name} residents across ${site.distanceFromSourceKm} km to ${site.name}. The candidate site is safely situated outside all modelled flood and landslide contours with ${site.roadAccess.toLowerCase()} road connectivity and an estimated carrying capacity of ${site.estimatedCapacity} persons.`;
    }
    return `In the proposed after-rehabilitation settlement at ${site.name}, ${site.landAvailabilityHa} hectares of geotechnically stable plateau ground accommodate two residential clusters, a dedicated ZP model school & evacuation shelter, a primary health clinic, and a 4-lane access spine while completely preserving the original vulnerable hazard zone as a restricted buffer.`;
  };

  return (
    <div className="bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Left: Dynamic Insight */}
      <div className="flex items-start space-x-3 flex-1">
        <div className="p-2 rounded-xl bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2] shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-black uppercase text-[#17221D] tracking-wider">
              {t('mapInsight', currentLang)}
            </h3>
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2] px-2 py-0.5 rounded font-mono font-bold">
              Dynamic Spatial Telemetry
            </span>
          </div>
          <p className="text-xs text-[#66736D] mt-1 leading-relaxed">
            {getDynamicInsight()}
          </p>
        </div>
      </div>

      {/* Right: Red Warning Card (Mandatory prototype disclaimer) */}
      <div className="bg-red-50 border border-red-200 p-3 rounded-xl max-w-sm shrink-0 flex items-start space-x-2.5">
        <AlertTriangle className="w-4 h-4 text-[#DC3545] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[11px] font-black uppercase text-[#DC3545] tracking-wide">
            {t('modelledAnalysis', currentLang)}
          </h4>
          <p className="text-[10px] text-[#66736D] leading-tight mt-0.5">
            {t('modelledAnalysisSub', currentLang)}
          </p>
        </div>
      </div>
    </div>
  );
};
