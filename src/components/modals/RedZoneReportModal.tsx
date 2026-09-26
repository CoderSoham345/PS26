import React from 'react';
import { X, FileText, Download, Printer, ShieldAlert, CheckCircle2, AlertTriangle, Building, Users, MapPin, Activity } from 'lucide-react';
import { Habitation } from '../../types';
import { Language } from '../../lib/i18n';

interface RedZoneReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVillage: Habitation;
  currentLang: Language;
}

export const RedZoneReportModal: React.FC<RedZoneReportModalProps> = ({
  isOpen,
  onClose,
  selectedVillage,
  currentLang
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    alert('PDF report generation initiated. Downloading Red_Zone_Analysis_Report_' + selectedVillage.name + '.pdf');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#DCE7E1] rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-6 border-b border-[#DCE7E1] bg-[#F6F9F7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black text-[#17221D] truncate">Red Zone Decision-Support Report</h2>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate">Maharashtra Disaster Management Authority (SDMA)</p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 bg-white border border-[#DCE7E1] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-1 min-h-[38px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-2.5 sm:px-3 py-1.5 bg-[#087F5B] text-white rounded-xl text-xs font-bold hover:bg-[#07543F] flex items-center space-x-1 shadow-sm min-h-[38px] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-200 text-slate-500 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
              aria-label="Close report"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 text-xs text-slate-700 leading-relaxed font-sans">
          {/* Title Banner */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-200">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Prototype Decision-Support Report
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <h1 className="text-2xl font-black text-[#07543F]">सुरक्षित धरा</h1>
              <span className="text-lg font-black text-[#087F5B] uppercase tracking-wider">SURAKSHIT DHARA</span>
              <span className="text-lg font-bold text-[#17221D]">• RED ZONE ANALYSIS</span>
            </div>
            <div className="text-slate-500 font-medium">
              District: <strong className="text-slate-900">{selectedVillage.district}</strong> | Habitation: <strong className="text-slate-900">{selectedVillage.name}</strong> ({selectedVillage.taluka} Taluka) | Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* 1. Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">1. Executive Summary</h3>
            <p>
              This decision-support report synthesizes multi-hazard spatial modeling, terrain constraints, and historical vulnerability indicators for <strong>{selectedVillage.name}</strong> in {selectedVillage.district} District. The AI-driven assessment identifies significant exposure to {selectedVillage.primaryHazard.toLowerCase()} hazards, warranting priority relocation and structural mitigation measures.
            </p>
          </div>

          {/* 2. Red Zone Identification */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">2. Red Zone Identification</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F6F9F7] rounded-2xl">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Modelled Area</span>
                <strong className="text-sm text-slate-900">24.6 Hectares</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Primary Hazard</span>
                <strong className="text-sm text-red-600">{selectedVillage.primaryHazard}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Risk Score</span>
                <strong className="text-sm text-slate-900">{selectedVillage.riskScore} / 100</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Priority Status</span>
                <strong className="text-sm text-[#087F5B]">{selectedVillage.relocationPriority}</strong>
              </div>
            </div>
          </div>

          {/* 3. Hazard Analysis */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">3. Hazard Analysis</h3>
            <p>
              Geospatial buffers indicate acute susceptibility due to steep lateritic terrain slopes ({selectedVillage.terrainSlope}) and high cumulative seasonal rainfall during monsoon events.
            </p>
          </div>

          {/* 4. Historical Disaster Context */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">4. Historical Disaster Context</h3>
            <p>
              Historical records indicate {selectedVillage.historicalEventsCount} significant slope failure / flooding events recorded since {selectedVillage.lastDisasterYear}, demonstrating chronic recurrence and escalating vulnerability.
            </p>
          </div>

          {/* 5. Population & Asset Exposure */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">5. Population & Asset Exposure</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Population Exposed:</strong> {selectedVillage.population} residents across {selectedVillage.households} households.</li>
              <li><strong>Infrastructure Exposure:</strong> {selectedVillage.infrastructureExposure.schools} schools, {selectedVillage.infrastructureExposure.hospitals} hospitals, and {selectedVillage.infrastructureExposure.roadsKm} km of primary access roads.</li>
            </ul>
          </div>

          {/* 6. Emergency Access */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">6. Emergency Access & Evacuation Constraints</h3>
            <p>
              Current road accessibility is rated as <strong>{selectedVillage.accessibility}</strong>, posing acute bottlenecks during heavy downpours when landslide debris obstructs valley routes.
            </p>
          </div>

          {/* 7. Red Zone Map Representation */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">7. Red Zone Spatial Perimeter</h3>
            <div className="p-4 bg-slate-100 rounded-2xl text-center text-slate-600 font-semibold">
              [ MapTiler GIS Vector Red Zone Polygon Rendered for {selectedVillage.name} ]
            </div>
          </div>

          {/* 8. Model Methodology */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">8. Model Methodology & Weights</h3>
            <p>
              The composite risk index is calculated using weighted multi-criteria evaluation: Hazard Exposure (35%), Historical Frequency (20%), Population Exposure (15%), Terrain Slope (15%), Emergency Access (10%), and Infrastructure Exposure (5%).
            </p>
          </div>

          {/* 9. Relocation Implication */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">9. Relocation Implications</h3>
            <p>
              Immediate transition to verified candidate relocation plateaus within a 5 km radius is recommended to achieve zero life-loss vulnerability.
            </p>
          </div>

          {/* 10. Limitations */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">10. Limitations & Statutory Notice</h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
              <strong>Disclaimer:</strong> This report is generated from prototype/modelled data and is intended for decision-support demonstration. It does not constitute an official statutory declaration of a red zone by the Government of Maharashtra.
            </div>
          </div>

          {/* 11. Data Sources */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">11. Data Sources & Provenance</h3>
            <p>Derived from GSI landslide inventories, IMD precipitation grids, Census demographics, and MapTiler spatial terrain layers via Supabase PostgreSQL backend.</p>
          </div>

          {/* 12. Recommended Next Assessment Steps */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#17221D] uppercase tracking-wider border-b pb-1">12. Recommended Next Assessment Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
                <span>Field geotechnical verification</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
                <span>Detailed hazard mapping & community consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#DCE7E1] bg-[#F6F9F7] flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-[#DCE7E1] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Close Report
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-5 py-2.5 bg-[#087F5B] hover:bg-[#07543F] text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
