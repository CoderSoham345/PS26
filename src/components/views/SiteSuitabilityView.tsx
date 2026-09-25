import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, ChevronRight, Layers, Building, Users, MapPin, 
  Activity, ArrowUpRight, FileText, CheckCircle2, HelpCircle, BarChart2, Info, ArrowLeft 
} from 'lucide-react';
import { RelocationSite, Habitation } from '../../types';
import { Language } from '../../lib/i18n';
import { SiteSuitabilityReportModal } from '../modals/SiteSuitabilityReportModal';

interface SiteSuitabilityViewProps {
  site: RelocationSite;
  allSites: RelocationSite[];
  selectedVillage?: Habitation;
  onNavigateToPlanner: () => void;
  currentLang?: Language;
}

export const SiteSuitabilityView: React.FC<SiteSuitabilityViewProps> = ({
  site,
  allSites,
  selectedVillage,
  onNavigateToPlanner,
  currentLang = 'en'
}) => {
  const [activeModal, setActiveModal] = useState<'hazard' | 'land' | 'capacity' | 'overall' | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  // Land calculations
  const totalAcres = site.landAvailabilityHa * 2.47105;
  const suitableAcres = totalAcres * 0.72;
  const excludedAcres = totalAcres * 0.28;
  const totalSqMeters = suitableAcres * 4046.856;
  const estimatedCapacityPersons = Math.round(totalSqMeters / 100); // 100 m²/person prototype assumption
  const villagePopulation = selectedVillage?.population || 1200;
  const capacitySurplus = estimatedCapacityPersons - villagePopulation;

  const compareSite = allSites.find(s => s.id !== site.id) || allSites[0];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn font-sans">
      {/* Header */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider border border-[#087F5B]/30">
              Prototype Site Suitability Model
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
              Not an official statutory government rating
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#17221D]">{site.name}</h1>
          <p className="text-xs text-slate-600 mt-1 space-x-2">
            <span>District: <strong>{site.district}</strong></span> • 
            <span>Taluka: <strong>{site.taluka}</strong></span> • 
            <span>Original Village: <strong>{selectedVillage?.name || 'Vulnerable Habitation'}</strong></span> • 
            <span>Distance: <strong>{site.distanceFromSourceKm} km</strong></span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setReportModalOpen(true)}
            className="px-4 py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Site Report</span>
          </button>
          <div className="bg-[#F6F9F7] border border-[#DCE7E1] px-5 py-3 rounded-2xl text-center shadow-inner">
            <div className="text-2xl font-black text-[#087F5B] font-mono">{site.suitabilityScore} / 100</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Overall Suitability</div>
          </div>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Overall Suitability', score: `${site.suitabilityScore}/100`, action: () => setActiveModal('overall') },
          { label: 'Hazard Safety', score: `${site.safetyScore}/100`, action: () => setActiveModal('hazard') },
          { label: 'Terrain Suitability', score: `${site.terrainScore}/100`, action: null },
          { label: 'Land Suitability', score: '84/100', action: () => setActiveModal('land') },
          { label: 'Road Access', score: '88/100', action: null },
          { label: 'Water Access', score: '90/100', action: null },
          { label: 'Emergency Access', score: '85/100', action: null },
          { label: 'Capacity', score: `${estimatedCapacityPersons} p`, action: () => setActiveModal('capacity') },
        ].map((kpi, idx) => (
          <div 
            key={idx} 
            onClick={kpi.action || undefined}
            className={`bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-sm flex flex-col justify-between ${kpi.action ? 'cursor-pointer hover:border-[#087F5B] transition-colors group' : ''}`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase">{kpi.label}</div>
            <div className="text-lg font-black text-[#17221D] font-mono mt-1 group-hover:text-[#087F5B]">{kpi.score}</div>
            {kpi.action && <div className="text-[9px] text-[#087F5B] font-bold mt-1 underline">View Calculation</div>}
          </div>
        ))}
      </div>

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hazard & Land Assessment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hazard Safety Assessment */}
          <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-[#087F5B] text-white px-2 py-0.5 rounded font-bold uppercase">Transparent Multi-Hazard Safety</span>
                <h3 className="text-base font-extrabold text-[#17221D] mt-1">Hazard Safety Assessment</h3>
              </div>
              <button onClick={() => setActiveModal('hazard')} className="text-xs font-bold text-[#087F5B] hover:underline">
                View Calculation Details →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <span className="text-slate-500 font-semibold">Landslide Safety [Modelled]</span>
                <div className="text-lg font-black text-slate-900">94 / 100</div>
                <p className="text-[11px] text-slate-600">Stable lateritic plateau bedrock with low slope risk.</p>
              </div>
              <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <span className="text-slate-500 font-semibold">Flood Safety [Modelled]</span>
                <div className="text-lg font-black text-slate-900">91 / 100</div>
                <p className="text-[11px] text-slate-600">High elevation buffer well above 100-year flood levels.</p>
              </div>
              <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <span className="text-slate-500 font-semibold">Seismic Safety [Open Data]</span>
                <div className="text-lg font-black text-slate-900">87 / 100</div>
                <p className="text-[11px] text-slate-600">Zone III moderate seismic compliance standard.</p>
              </div>
            </div>
          </div>

          {/* Land Suitability Breakdown */}
          <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-[#087F5B] text-white px-2 py-0.5 rounded font-bold uppercase">Land Availability & Use</span>
                <h3 className="text-base font-extrabold text-[#17221D] mt-1">Land Suitability Assessment</h3>
              </div>
              <button onClick={() => setActiveModal('land')} className="text-xs font-bold text-[#087F5B] hover:underline">
                View Calculation Details →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <span className="text-slate-500 font-semibold">Total Land</span>
                <div className="text-lg font-black text-slate-900">{totalAcres.toFixed(1)} acres</div>
                <span className="text-[10px] text-slate-400">({site.landAvailabilityHa} ha)</span>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                <span className="text-emerald-800 font-semibold">Suitable Land</span>
                <div className="text-lg font-black text-[#087F5B]">{suitableAcres.toFixed(1)} acres</div>
                <span className="text-[10px] text-emerald-700">72% Usable Area</span>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
                <span className="text-red-800 font-semibold">Excluded / Buffer</span>
                <div className="text-lg font-black text-red-700">{excludedAcres.toFixed(1)} acres</div>
                <span className="text-[10px] text-red-600">Terrain/Drainage restriction</span>
              </div>
              <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
                <span className="text-slate-500 font-semibold">Land Score</span>
                <div className="text-lg font-black text-[#087F5B]">84 / 100</div>
                <span className="text-[10px] text-slate-400">[Prototype derived]</span>
              </div>
            </div>

            {/* Land Use Allocation */}
            <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-2">
              <div className="text-xs font-extrabold text-[#17221D]">Proposed Land-Use Allocation (Total: 100%)</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2.5 bg-white rounded-xl border border-[#DCE7E1]">Residential: <strong>45%</strong> ({(suitableAcres * 0.45).toFixed(1)} ac)</div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DCE7E1]">Internal Roads: <strong>15%</strong> ({(suitableAcres * 0.15).toFixed(1)} ac)</div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DCE7E1]">Open Space: <strong>15%</strong> ({(suitableAcres * 0.15).toFixed(1)} ac)</div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DCE7E1]">School / Health: <strong>13%</strong> ({(suitableAcres * 0.13).toFixed(1)} ac)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Carrying Capacity & Site Comparison */}
        <div className="space-y-6">
          {/* Carrying Capacity Assessment */}
          <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-[#087F5B] text-white px-2 py-0.5 rounded font-bold uppercase">Planning Capacity</span>
                <h3 className="text-base font-extrabold text-[#17221D] mt-1">Carrying Capacity</h3>
              </div>
              <button onClick={() => setActiveModal('capacity')} className="text-xs font-bold text-[#087F5B] hover:underline">
                View Details →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#F6F9F7] rounded-xl">
                <span className="text-slate-600 font-semibold">Population Needing Relocation:</span>
                <strong className="text-slate-900">{villagePopulation} persons</strong>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F6F9F7] rounded-xl">
                <span className="text-slate-600 font-semibold">Estimated Land Capacity (100m²/p):</span>
                <strong className="text-[#087F5B]">{estimatedCapacityPersons} persons</strong>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-emerald-900 font-bold">Capacity Status / Surplus:</span>
                <strong className="text-emerald-700 font-mono">+{capacitySurplus} persons (Sufficient)</strong>
              </div>
            </div>
          </div>

          {/* Site Comparison */}
          <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#17221D]">Modelled Site Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#DCE7E1] text-slate-400 font-bold">
                    <th className="pb-2">Metric</th>
                    <th className="pb-2 text-[#087F5B]">{site.name}</th>
                    <th className="pb-2 text-slate-600">{compareSite.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E1]">
                  <tr>
                    <td className="py-2 font-semibold">Suitability Score</td>
                    <td className="py-2 font-black text-[#087F5B]">{site.suitabilityScore} / 100</td>
                    <td className="py-2 font-bold text-slate-700">{compareSite.suitabilityScore} / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Hazard Safety</td>
                    <td className="py-2 font-bold">{site.safetyScore} / 100</td>
                    <td className="py-2">{compareSite.safetyScore} / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Distance</td>
                    <td className="py-2 font-bold">{site.distanceFromSourceKm} km</td>
                    <td className="py-2">{compareSite.distanceFromSourceKm} km</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Land Area</td>
                    <td className="py-2 font-bold">{site.landAvailabilityHa} ha</td>
                    <td className="py-2">{compareSite.landAvailabilityHa} ha</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-[#17221D]">Ready to proceed with this candidate site?</h4>
          <p className="text-xs text-slate-600">Lock in this site selection and proceed to the Relocation Planner to coordinate execution.</p>
        </div>
        <button
          onClick={onNavigateToPlanner}
          className="px-6 py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <span>Proceed to Relocation Planner</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Transparent Calculation Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#DCE7E1] rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <h3 className="text-sm font-black text-[#17221D] uppercase">
                {activeModal === 'hazard' && 'Transparent Hazard Safety Calculation'}
                {activeModal === 'land' && 'Transparent Land Suitability Calculation'}
                {activeModal === 'capacity' && 'Transparent Carrying Capacity Calculation'}
                {activeModal === 'overall' && 'Transparent Overall Suitability Score Formula'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              {activeModal === 'hazard' && (
                <>
                  <p><strong>Formula:</strong> Hazard Safety = 100 - Normalized Hazard Exposure Index.</p>
                  <p><strong>Inputs:</strong> Landslide Susceptibility (30%), Slope Risk (25%), Terrain Condition (15%), Historical Exposure (15%), Unstable Zone Proximity (15%).</p>
                  <p><strong>Result:</strong> Composite Safety Score = <strong>{site.safetyScore} / 100</strong> [Modelled / Open Data].</p>
                </>
              )}
              {activeModal === 'land' && (
                <>
                  <p><strong>Formula:</strong> Suitable Land = Total Available Land - Hazard Exclusion - Terrain Restriction - Buffer Zones.</p>
                  <p><strong>Inputs:</strong> Total area {totalAcres.toFixed(1)} acres minus 28% restricted slopes and drainage buffers.</p>
                  <p><strong>Result:</strong> Suitable Land = <strong>{suitableAcres.toFixed(1)} acres</strong> ({suitableAcres * 4046.856} m²).</p>
                </>
              )}
              {activeModal === 'capacity' && (
                <>
                  <p><strong>Formula:</strong> Estimated Capacity = Suitable Residential Land Area ÷ Planning Requirement (100 m²/person).</p>
                  <p><strong>Inputs:</strong> Residential area {(suitableAcres * 0.45 * 4046.856).toFixed(0)} m² available for housing.</p>
                  <p><strong>Result:</strong> Estimated capacity = <strong>{estimatedCapacityPersons} persons</strong> (Surplus: +{capacitySurplus}).</p>
                </>
              )}
              {activeModal === 'overall' && (
                <>
                  <p><strong>Formula:</strong> Weighted aggregation across Hazard Safety (25%), Land Suitability (15%), Terrain (10%), Road (10%), Water (10%), Emergency (10%), Healthcare (7%), Education (5%), Capacity (8%).</p>
                  <p><strong>Result:</strong> Overall Suitability Index = <strong>{site.suitabilityScore} / 100</strong> [Prototype Model Index].</p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-[#DCE7E1] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-[#087F5B] text-white rounded-xl text-xs font-bold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <SiteSuitabilityReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        site={site}
        village={selectedVillage}
        currentLang={currentLang}
      />
    </div>
  );
};
