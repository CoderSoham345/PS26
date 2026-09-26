import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Building, 
  Users, 
  Activity, 
  Check, 
  Clock, 
  Truck, 
  Heart, 
  GraduationCap, 
  Droplet, 
  Home, 
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t, translateHazardType, translateRiskLevel } from '../../lib/i18n';
import { calculateHaversineDistance } from '../../lib/geo';

interface AnalyticsPanelProps {
  habitation: Habitation;
  site: RelocationSite;
  stage: 'before' | 'relocation' | 'after';
  currentLang: Language;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  habitation,
  site,
  stage,
  currentLang
}) => {
  const distanceKm = calculateHaversineDistance(habitation.lat, habitation.lng, site.lat, site.lng);

  // Dynamic Site Advantages calculation based on actual attributes
  const siteAdvantages = [
    { label: t('roadAccessibilityAdv', currentLang), active: site.roadAccess === 'Good' || site.roadAccess === 'Moderate' },
    { label: t('hazardExposureAdv', currentLang), active: site.landslideRisk === 'Low' && site.floodRisk === 'Low' },
    { label: t('waterAccessAdv', currentLang), active: site.waterAvailability === 'Available' || site.waterAvailability === 'Abundant' },
    { label: t('healthcareAccessAdv', currentLang), active: site.hospitalDistanceKm < 10 },
    { label: t('schoolAccessAdv', currentLang), active: site.schoolDistanceKm < 5 },
    { label: t('suitableLandAdv', currentLang), active: site.terrainScore >= 80 },
    { label: t('emergencyAccessAdv', currentLang), active: site.safetyScore >= 85 }
  ];

  return (
    <aside className="w-full lg:w-[320px] xl:w-[350px] shrink-0 space-y-4 select-none">
      {/* CARD 1: STAGE-SPECIFIC ADAPTIVE CARD */}
      <div className="bg-white border border-[#DCE7E1] rounded-2xl p-4 shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-3">
        {/* Stage Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8EFEB]">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#66736D]">
            {stage === 'before'
              ? t('stage1Before', currentLang)
              : stage === 'relocation'
              ? t('stage2Relocation', currentLang)
              : t('stage3After', currentLang)}
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
            stage === 'before'
              ? 'bg-red-50 text-[#DC3545] border-red-200'
              : stage === 'relocation'
              ? 'bg-sky-50 text-[#0284C7] border-sky-200'
              : 'bg-[#E7F6EF] text-[#087F5B] border-[#B8E5D2]'
          }`}>
            {stage.toUpperCase()}
          </span>
        </div>

        {/* BEFORE STAGE VIEW: VILLAGE RISK PROFILE */}
        {stage === 'before' && (
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">Current Village:</span>
              <strong className="text-[#17221D] font-black">{habitation.name}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">{t('riskLevel', currentLang)}:</span>
              <span className="font-mono font-bold text-[#DC3545] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {habitation.riskScore} / 100 ({translateRiskLevel(habitation.relocationPriority, currentLang)})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">{t('population', currentLang)}:</span>
              <span className="font-mono text-[#17221D] font-bold">{habitation.population} residents</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">{t('households', currentLang)}:</span>
              <span className="font-mono text-[#17221D] font-bold">{habitation.households} households</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">{t('primaryHazards', currentLang)}:</span>
              <span className="text-[#DC3545] font-bold">{translateHazardType(habitation.primaryHazard, currentLang)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">{t('redZoneArea', currentLang)}:</span>
              <span className="font-mono text-[#17221D] font-semibold">1.85 sq.km (Slope {habitation.terrainSlope})</span>
            </div>

            <div className="pt-2 border-t border-[#E8EFEB]">
              <span className="text-[#66736D] block text-[10px] uppercase font-bold mb-1">
                {t('infrastructureAtRisk', currentLang)}:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-[#F6F9F7] p-2 rounded-xl border border-[#DCE7E1]">
                <div className="flex items-center space-x-1.5 text-[#66736D]">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Schools: <strong className="text-[#17221D]">{habitation.infrastructureExposure.schools}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#66736D]">
                  <Heart className="w-3.5 h-3.5 text-[#DC3545]" />
                  <span>PHCs: <strong className="text-[#17221D]">{habitation.infrastructureExposure.hospitals}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#66736D]">
                  <Truck className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Roads: <strong className="text-[#17221D]">{habitation.infrastructureExposure.roadsKm} km</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#66736D]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#DC3545]" />
                  <span>History: <strong className="text-[#17221D]">{habitation.historicalEventsCount} events</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RELOCATION STAGE VIEW: FROM -> TO LOGISTICS */}
        {stage === 'relocation' && (
          <div className="space-y-2.5 text-xs">
            <div className="bg-[#F6F9F7] p-2.5 rounded-xl border border-[#DCE7E1] space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#66736D] uppercase font-bold">FROM:</span>
                <span className="text-[#DC3545] font-bold">{habitation.name} (Vulnerable)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#66736D] uppercase font-bold">TO:</span>
                <span className="text-[#087F5B] font-bold">{site.name} (Safe Site)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">Direct Distance:</span>
              <span className="font-mono text-[#0284C7] font-bold">{distanceKm} km (straight-line)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">Route Connectivity:</span>
              <span className="text-[#087F5B] font-bold">{site.roadAccess} All-Weather Access</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">Estimated Transit Time:</span>
              <span className="font-mono text-[#17221D] font-bold">18 - 25 minutes</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#66736D]">Site Readiness:</span>
              <span className="text-[#087F5B] font-bold">{site.status}</span>
            </div>

            <div className="p-2 bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl text-[10px] text-[#07543F] leading-tight">
              Transit corridor uses arterial State Highway bypass, avoiding active ghat landslide scars.
            </div>
          </div>
        )}

        {/* AFTER STAGE VIEW: PROPOSED REHABILITATION SETTLEMENT BREAKDOWN */}
        {stage === 'after' && (
          <div className="space-y-2 text-xs">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-[#087F5B]">
              {t('proposedRehabilitation', currentLang)}
            </h5>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('residentialArea', currentLang)}</span>
                <strong className="text-[#087F5B]">Clusters A & B (11.2 ha)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('roads', currentLang)}</span>
                <strong className="text-[#17221D]">4-Lane Spine + Rings (14m)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('openSpace', currentLang)}</span>
                <strong className="text-[#087F5B]">Central Safe Park (4.8 ac)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('school', currentLang)}</span>
                <strong className="text-blue-600">ZP Model School (280 cap)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('healthcare', currentLang)}</span>
                <strong className="text-[#DC3545]">Primary Health Centre (12 bed)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('communityFacility', currentLang)}</span>
                <strong className="text-purple-700">Panchayat & Satellite Node</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('waterUtilities', currentLang)}</span>
                <strong className="text-cyan-700">250k L Reservoir & Solar Grid</strong>
              </div>

              <div className="flex items-center justify-between bg-[#F6F9F7] p-1.5 rounded-lg border border-[#DCE7E1]">
                <span className="text-[#66736D]">{t('emergencyFacility', currentLang)}</span>
                <strong className="text-amber-700">Disaster Response Outpost</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 2: CANDIDATE SITE EVALUATION & ADVANTAGES */}
      <div className="bg-white border border-[#DCE7E1] rounded-2xl p-4 shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8EFEB]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#66736D] block">
              {t('candidateSite', currentLang)}
            </span>
            <h4 className="text-sm font-black text-[#087F5B] truncate max-w-[190px]">
              {site.name}
            </h4>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-[#66736D] block">
              Suitability
            </span>
            <span className="text-sm font-mono font-black text-[#07543F]">
              {site.suitabilityScore} / 100
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#F6F9F7] p-2 rounded-xl border border-[#DCE7E1]">
            <span className="text-[9px] text-[#66736D] uppercase block">{t('distance', currentLang)}</span>
            <strong className="text-[#17221D] font-mono">{site.distanceFromSourceKm} km</strong>
          </div>
          <div className="bg-[#F6F9F7] p-2 rounded-xl border border-[#DCE7E1]">
            <span className="text-[9px] text-[#66736D] uppercase block">{t('availableLand', currentLang)}</span>
            <strong className="text-[#17221D] font-mono">{site.landAvailabilityHa} ha</strong>
          </div>
          <div className="bg-[#F6F9F7] p-2 rounded-xl border border-[#DCE7E1]">
            <span className="text-[9px] text-[#66736D] uppercase block">{t('suitableArea', currentLang)}</span>
            <strong className="text-[#087F5B] font-mono">{Math.round(site.landAvailabilityHa * 0.88)} ha</strong>
          </div>
          <div className="bg-[#F6F9F7] p-2 rounded-xl border border-[#DCE7E1]">
            <span className="text-[9px] text-[#66736D] uppercase block">{t('estimatedCapacity', currentLang)}</span>
            <strong className="text-[#07543F] font-mono font-black">{site.estimatedCapacity} persons</strong>
          </div>
        </div>

        {/* KEY SITE ADVANTAGES (Dynamically evaluated) */}
        <div className="pt-2 border-t border-[#E8EFEB] space-y-1.5">
          <h5 className="text-[10px] font-black uppercase tracking-wider text-[#17221D]">
            {t('keySiteAdvantages', currentLang)}
          </h5>

          <div className="space-y-1 text-xs">
            {siteAdvantages.map((adv, idx) => (
              <div 
                key={idx}
                className="flex items-center space-x-2 text-[11px]"
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                  adv.active ? 'bg-[#E7F6EF] text-[#087F5B]' : 'bg-red-50 text-[#DC3545]'
                }`}>
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={adv.active ? 'text-[#17221D]' : 'text-[#66736D] line-through'}>
                  {adv.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
