import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft, Building, Layers, Eye, Sparkles } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface CommunityRelocationViewProps {
  selectedVillage: Habitation;
  relocationSites: RelocationSite[];
  onNavigate: (tab: string) => void;
  onSelectSite?: (s: RelocationSite) => void;
}

export const CommunityRelocationView: React.FC<CommunityRelocationViewProps> = ({
  selectedVillage,
  relocationSites,
  onNavigate,
  onSelectSite
}) => {
  const [showCalculation, setShowCalculation] = useState(false);
  const [sliderStage, setSliderStage] = useState<'before' | 'relocation' | 'after'>('before');
  const topTwoSites = relocationSites.slice(0, 2);
  const primarySite = topTwoSites[0] || {
    name: 'Safe Plateau Sector 2',
    suitabilityScore: 92,
    distanceFromSourceKm: 2.8,
    estimatedCapacity: 1200,
    landslideRisk: 'Low',
    roadAccess: 'All-weather Paved',
    waterAvailability: 'Reliable Borewell & Pipeline',
    hospitalDistanceKm: 3.5,
    schoolDistanceKm: 1.2
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 animate-fadeIn">
      <button
        onClick={() => onNavigate('my-village')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F5B] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Village</span>
      </button>

      {/* Hero Interactive Before -> Relocation -> After Slider */}
      <div className="bg-gradient-to-br from-[#087F5B] to-[#07543F] text-white p-8 rounded-3xl shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
              Visual Resettlement Journey
            </span>
            <h1 className="text-2xl font-black mt-2">Transformation for {selectedVillage.name}</h1>
            <p className="text-xs text-emerald-100 mt-1">
              Explore how moving from the high-risk hazard zone to <strong className="text-white">{primarySite.name}</strong> ensures community safety and long-term prosperity.
            </p>
          </div>

          {/* Stage Buttons */}
          <div className="flex bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setSliderStage('before')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderStage === 'before'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              1. Before (High Risk)
            </button>
            <button
              onClick={() => setSliderStage('relocation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderStage === 'relocation'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              2. Relocation Site
            </button>
            <button
              onClick={() => setSliderStage('after')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderStage === 'after'
                  ? 'bg-white text-[#087F5B] shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              3. After (Resilient)
            </button>
          </div>
        </div>

        {/* Dynamic Stage Display Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4">
          {sliderStage === 'before' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-red-300 font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <span>Current State: High Vulnerability Zone ({selectedVillage.primaryHazard} Hazard - Score: {selectedVillage.riskScore}/100)</span>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Currently, {selectedVillage.population} residents live in steep slopes prone to heavy monsoon saturation. Emergency vehicles face difficult terrain access, and recurring boulder slips threaten residential areas.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Risk Level</div>
                  <div className="font-extrabold text-red-300">High / Red Zone</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Emergency Access</div>
                  <div className="font-extrabold">Restricted (Kaccha road)</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Flood Exposure</div>
                  <div className="font-extrabold">Seasonal River Surge</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Population at Risk</div>
                  <div className="font-extrabold">{selectedVillage.population} residents</div>
                </div>
              </div>
            </div>
          )}

          {sliderStage === 'relocation' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Proposed Safe Site: {primarySite.name} ({primarySite.distanceFromSourceKm} km away)</span>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Located on a stable plateau with geological clearance. Features all-weather paved road connectivity, sustainable groundwater sources, and proximity to regional healthcare and education facilities.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Suitability Score</div>
                  <div className="font-extrabold text-amber-300">{primarySite.suitabilityScore}/100 (Optimal)</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Carrying Capacity</div>
                  <div className="font-extrabold">{primarySite.estimatedCapacity} people</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Water Supply</div>
                  <div className="font-extrabold">{primarySite.waterAvailability}</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="text-emerald-200">Hospital Proximity</div>
                  <div className="font-extrabold">{primarySite.hospitalDistanceKm} km</div>
                </div>
              </div>
            </div>
          )}

          {sliderStage === 'after' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-emerald-200 font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>Future Resilient Habitation: Complete Community Security</span>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Fully planned modern habitation featuring reinforced disaster-resistant housing, solar microgrids, community resilience center, reliable piped water, and secure livelihood connectivity.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-white/15 p-3 rounded-xl">
                  <div className="text-emerald-200">Disaster Safety</div>
                  <div className="font-extrabold text-white">100% Protected</div>
                </div>
                <div className="bg-white/15 p-3 rounded-xl">
                  <div className="text-emerald-200">Housing Standard</div>
                  <div className="font-extrabold text-white">All-Weather Pucca</div>
                </div>
                <div className="bg-white/15 p-3 rounded-xl">
                  <div className="text-emerald-200">Community Facilities</div>
                  <div className="font-extrabold text-white">School & Health Hub</div>
                </div>
                <div className="bg-white/15 p-3 rounded-xl">
                  <div className="text-emerald-200">Livelihood Continuity</div>
                  <div className="font-extrabold text-white">Maintained (Within 3km)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#DCE7E1] p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">Candidate Relocation Sites</span>
          <h2 className="text-xl font-extrabold text-[#17221D] mt-1">Available Safe Locations for {selectedVillage.name}</h2>
          <p className="text-xs text-slate-600 mt-1">
            Compare evaluated safe zones and review carrying capacity and accessibility.
          </p>
        </div>

        {/* Top 2 Sites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topTwoSites.map((site, idx) => (
            <div key={site.id} className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl flex flex-col justify-between shadow-sm space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#E7F6EF] text-[#087F5B] rounded-lg text-xs font-black border border-[#087F5B]/30">
                    SITE {idx + 1} OPTION
                  </span>
                  <span className="text-xs font-mono font-bold text-[#087F5B]">Suitability: {site.suitabilityScore}/100</span>
                </div>

                <h3 className="text-base font-bold text-[#17221D] mb-1">{site.name}</h3>
                <p className="text-xs text-slate-600 mb-4">Distance from village: <strong className="text-[#17221D]">{site.distanceFromSourceKm} km</strong></p>

                <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-[#DCE7E1]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Population Capacity:</span>
                    <strong className="text-[#087F5B] font-mono">{site.estimatedCapacity} people</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hazard Level:</span>
                    <span className="font-semibold text-[#087F5B]">🟢 {site.landslideRisk} Hazard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Road Access:</span>
                    <span className="font-semibold text-[#17221D]">{site.roadAccess}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Water Availability:</span>
                    <span className="font-semibold text-[#17221D]">{site.waterAvailability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hospital Distance:</span>
                    <span className="font-semibold text-[#17221D]">{site.hospitalDistanceKm} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">School Distance:</span>
                    <span className="font-semibold text-[#17221D]">{site.schoolDistanceKm} km</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectSite) onSelectSite(site);
                  onNavigate('safe-site-workspace');
                }}
                className="w-full py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 shadow-sm"
              >
                <span>Explore Proposed Site</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Carrying Capacity Summary & Calculation Toggle */}
        <div className="bg-[#E7F6EF] border border-[#087F5B]/30 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#17221D]">Safe Site Capacity vs Village Population</h3>
              <p className="text-xs text-slate-600">Village Population: <strong className="text-[#17221D]">{selectedVillage.population}</strong> | Selected Site Capacity: <strong className="text-[#087F5B]">{topTwoSites[0]?.estimatedCapacity || 1200}</strong></p>
            </div>
            <span className="px-3 py-1 bg-white text-[#087F5B] font-bold text-xs rounded-lg border border-[#087F5B]/30">🟢 Capacity Available</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowCalculation(!showCalculation)}
              className="text-xs font-bold text-[#087F5B] hover:underline flex items-center space-x-1"
            >
              <span>{showCalculation ? 'Hide Calculation Details' : '[ HOW WAS THIS CALCULATED? ]'}</span>
            </button>
          </div>

          {showCalculation && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-[#DCE7E1] text-xs space-y-2 text-slate-700 animate-fadeIn">
              <div className="font-bold text-[#17221D] mb-2">Prototype Carrying Capacity Breakdown (Site 1):</div>
              <div className="flex justify-between"><span>Available Land:</span> <span className="font-mono">20.5 hectares</span></div>
              <div className="flex justify-between"><span>Suitable Development Area (60%):</span> <span className="font-mono">12.3 hectares</span></div>
              <div className="flex justify-between"><span>Residential Allocation:</span> <span className="font-mono">7.2 hectares</span></div>
              <div className="flex justify-between"><span>Road Network & Utilities:</span> <span className="font-mono">2.1 hectares</span></div>
              <div className="flex justify-between"><span>Open Space & Community:</span> <span className="font-mono">1.8 hectares</span></div>
              <div className="flex justify-between"><span>Emergency Buffer:</span> <span className="font-mono">1.2 hectares</span></div>
              <p className="text-[10px] text-slate-500 italic pt-2">Note: Prototype planning estimate — not an approved development plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

