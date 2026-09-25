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
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 shadow-xl space-y-3">
        {/* Stage Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#1E293B]">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">
            {stage === 'before'
              ? t('stage1Before', currentLang)
              : stage === 'relocation'
              ? t('stage2Relocation', currentLang)
              : t('stage3After', currentLang)}
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
            stage === 'before'
              ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
              : stage === 'relocation'
              ? 'bg-[#0EA5E9]/20 text-[#0EA5E9] border border-[#0EA5E9]/30'
              : 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30'
          }`}>
            {stage.toUpperCase()}
          </span>
        </div>

        {/* BEFORE STAGE VIEW: VILLAGE RISK PROFILE */}
        {stage === 'before' && (
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Current Village:</span>
              <strong className="text-[#F8FAFC] font-black">{habitation.name}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">{t('riskLevel', currentLang)}:</span>
              <span className="font-mono font-bold text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded border border-[#EF4444]/30">
                {habitation.riskScore} / 100 ({translateRiskLevel(habitation.relocationPriority, currentLang)})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">{t('population', currentLang)}:</span>
              <span className="font-mono text-[#F8FAFC]">{habitation.population} residents</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">{t('households', currentLang)}:</span>
              <span className="font-mono text-[#F8FAFC]">{habitation.households} households</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">{t('primaryHazards', currentLang)}:</span>
              <span className="text-[#EF4444] font-bold">{translateHazardType(habitation.primaryHazard, currentLang)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">{t('redZoneArea', currentLang)}:</span>
              <span className="font-mono text-[#F8FAFC]">1.85 sq.km (Slope {habitation.terrainSlope})</span>
            </div>

            <div className="pt-2 border-t border-[#1E293B]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold mb-1">
                {t('infrastructureAtRisk', currentLang)}:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-[#0B0F17] p-2 rounded-xl border border-[#1E293B]">
                <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Schools: <strong className="text-[#F8FAFC]">{habitation.infrastructureExposure.schools}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                  <Heart className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>PHCs: <strong className="text-[#F8FAFC]">{habitation.infrastructureExposure.hospitals}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                  <Truck className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Roads: <strong className="text-[#F8FAFC]">{habitation.infrastructureExposure.roadsKm} km</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>History: <strong className="text-[#F8FAFC]">{habitation.historicalEventsCount} events</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RELOCATION STAGE VIEW: FROM -> TO LOGISTICS */}
        {stage === 'relocation' && (
          <div className="space-y-2.5 text-xs">
            <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-[#1E293B] space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#64748B] uppercase font-bold">FROM:</span>
                <span className="text-[#EF4444] font-bold">{habitation.name} (Vulnerable)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#64748B] uppercase font-bold">TO:</span>
                <span className="text-[#10B981] font-bold">{site.name} (Safe Site)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Direct Distance:</span>
              <span className="font-mono text-[#0EA5E9] font-bold">{distanceKm} km (approx. straight-line)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Route Connectivity:</span>
              <span className="text-[#34D399] font-bold">{site.roadAccess} All-Weather Access</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Estimated Transit Time:</span>
              <span className="font-mono text-[#F8FAFC]">18 - 25 minutes</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">Site Readiness:</span>
              <span className="text-[#10B981] font-bold">{site.status}</span>
            </div>

            <div className="p-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl text-[10px] text-[#94A3B8] leading-tight">
              Transit corridor uses arterial State Highway bypass, avoiding active ghat landslide scars.
            </div>
          </div>
        )}

        {/* AFTER STAGE VIEW: PROPOSED REHABILITATION SETTLEMENT BREAKDOWN */}
        {stage === 'after' && (
          <div className="space-y-2 text-xs">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-[#10B981]">
              {t('proposedRehabilitation', currentLang)}
            </h5>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('residentialArea', currentLang)}</span>
                <strong className="text-[#10B981]">Clusters A & B (11.2 ha)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('roads', currentLang)}</span>
                <strong className="text-[#F8FAFC]">4-Lane Spine + Rings (14m)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('openSpace', currentLang)}</span>
                <strong className="text-[#34D399]">Central Safe Park (4.8 ac)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('school', currentLang)}</span>
                <strong className="text-blue-400">ZP Model School (280 cap)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('healthcare', currentLang)}</span>
                <strong className="text-[#EF4444]">Primary Health Centre (12 bed)</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('communityFacility', currentLang)}</span>
                <strong className="text-purple-400">Panchayat & Satellite Node</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('waterUtilities', currentLang)}</span>
                <strong className="text-cyan-400">250k L Reservoir & Solar Grid</strong>
              </div>

              <div className="flex items-center justify-between bg-[#0B0F17] p-1.5 rounded-lg border border-[#1E293B]">
                <span className="text-[#94A3B8]">{t('emergencyFacility', currentLang)}</span>
                <strong className="text-amber-400">Disaster Response Outpost</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 2: CANDIDATE SITE EVALUATION & ADVANTAGES */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#1E293B]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
              {t('candidateSite', currentLang)}
            </span>
            <h4 className="text-sm font-black text-[#10B981] truncate max-w-[190px]">
              {site.name}
            </h4>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-[#64748B] block">
              Suitability
            </span>
            <span className="text-sm font-mono font-black text-[#34D399]">
              {site.suitabilityScore} / 100
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#0B0F17] p-2 rounded-xl border border-[#1E293B]">
            <span className="text-[9px] text-[#64748B] uppercase block">{t('distance', currentLang)}</span>
            <strong className="text-[#F8FAFC] font-mono">{site.distanceFromSourceKm} km</strong>
          </div>
          <div className="bg-[#0B0F17] p-2 rounded-xl border border-[#1E293B]">
            <span className="text-[9px] text-[#64748B] uppercase block">{t('availableLand', currentLang)}</span>
            <strong className="text-[#F8FAFC] font-mono">{site.landAvailabilityHa} ha</strong>
          </div>
          <div className="bg-[#0B0F17] p-2 rounded-xl border border-[#1E293B]">
            <span className="text-[9px] text-[#64748B] uppercase block">{t('suitableArea', currentLang)}</span>
            <strong className="text-[#34D399] font-mono">{Math.round(site.landAvailabilityHa * 0.88)} ha</strong>
          </div>
          <div className="bg-[#0B0F17] p-2 rounded-xl border border-[#1E293B]">
            <span className="text-[9px] text-[#64748B] uppercase block">{t('estimatedCapacity', currentLang)}</span>
            <strong className="text-[#10B981] font-mono">{site.estimatedCapacity} persons</strong>
          </div>
        </div>

        {/* KEY SITE ADVANTAGES (Dynamically evaluated) */}
        <div className="pt-2 border-t border-[#1E293B] space-y-1.5">
          <h5 className="text-[10px] font-black uppercase tracking-wider text-[#F8FAFC]">
            {t('keySiteAdvantages', currentLang)}
          </h5>

          <div className="space-y-1 text-xs">
            {siteAdvantages.map((adv, idx) => (
              <div 
                key={idx}
                className="flex items-center space-x-2 text-[11px]"
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                  adv.active ? 'bg-[#10B981]/20 text-[#34D399]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                }`}>
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={adv.active ? 'text-[#94A3B8]' : 'text-[#64748B] line-through'}>
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
