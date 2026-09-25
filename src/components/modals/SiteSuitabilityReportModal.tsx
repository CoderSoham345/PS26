import React from 'react';
import { X, FileText, Download, Printer, CheckCircle2, ShieldAlert, Building, Users, MapPin, Activity } from 'lucide-react';
import { RelocationSite, Habitation } from '../../types';
import { Language } from '../../lib/i18n';

interface SiteSuitabilityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: RelocationSite;
  village?: Habitation;
  currentLang: Language;
}

export const SiteSuitabilityReportModal: React.FC<SiteSuitabilityReportModalProps> = ({
  isOpen,
  onClose,
  site,
  village,
  currentLang
}) => {
  if (!isOpen) return null;

  const handlePrint = () => window.print();
  const handleDownload = () => alert('Downloading Site Suitability & Carrying Capacity Assessment Report PDF...');

  const totalAcres = site.landAvailabilityHa * 2.47105;
  const suitableAcres = totalAcres * 0.72;
  const excludedAcres = totalAcres * 0.28;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#DCE7E1] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-[#DCE7E1] bg-[#F6F9F7] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#17221D]">Site Suitability & Carrying Capacity Assessment Report</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Maharashtra Disaster Management Authority (SDMA)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrint} className="px-3 py-1.5 bg-white border border-[#DCE7E1] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-1">
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button onClick={handleDownload} className="px-3 py-1.5 bg-[#087F5B] text-white rounded-xl text-xs font-bold hover:bg-[#07543F] flex items-center space-x-1 shadow-sm">
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 text-xs text-slate-700 leading-relaxed font-sans">
          <div className="text-center space-y-2 pb-6 border-b border-slate-200">
            <span className="px-3 py-1 bg-emerald-100 text-[#087F5B] rounded-full font-bold uppercase tracking-widest text-[10px]">
              Prototype Site Assessment Report
            </span>
            <h1 className="text-2xl font-black text-[#17221D]">PROTOTYPE SITE SUITABILITY & CARRYING CAPACITY ASSESSMENT</h1>
            <div className="text-slate-500 font-medium">
              Candidate Site: <strong className="text-slate-900">{site.name}</strong> | District: <strong className="text-slate-900">{site.district}</strong> | Taluka: <strong className="text-slate-900">{site.taluka}</strong> | Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">1. Site Summary</h3>
            <p>
              Candidate relocation site <strong>{site.name}</strong> is situated {site.distanceFromSourceKm} km from the vulnerable habitation ({village?.name || 'Original Village'}). It provides a total area of {site.landAvailabilityHa} hectares ({totalAcres.toFixed(1)} acres) with an overall prototype suitability score of <strong>{site.suitabilityScore} / 100</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">2. Hazard Assessment</h3>
            <p>Multi-hazard safety index is calculated at <strong>{site.safetyScore} / 100</strong>, reflecting robust landslide resistance and adequate flood elevation buffer.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">3. Land Suitability & Breakdown</h3>
            <p>
              Total area: {totalAcres.toFixed(1)} acres ({site.landAvailabilityHa} ha). Suitable land: {suitableAcres.toFixed(1)} acres (72%). Excluded/Restricted terrain and hazard buffers: {excludedAcres.toFixed(1)} acres (28%).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">4. Carrying Capacity Assessment</h3>
            <p>
              Based on the prototype planning assumption of 100 m²/person, the suitable land capacity is estimated at approximately {Math.round((suitableAcres * 4046.856) / 100)} persons, supporting the relocation requirements of the target habitation.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">5. Limitations & Field Verification</h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
              <strong>Disclaimer:</strong> This assessment is generated from prototype model calculations and does not constitute a legally binding statutory land allocation or official government approval. Detailed field verification (geotechnical, legal, drainage) is required prior to implementation.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DCE7E1] bg-[#F6F9F7] flex items-center justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2.5 bg-white border border-[#DCE7E1] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50">
            Close Report
          </button>
          <button onClick={handleDownload} className="px-5 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1.5">
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
