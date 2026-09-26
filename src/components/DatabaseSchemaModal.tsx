import React from 'react';
import { Database, X, Table, Key, ShieldCheck } from 'lucide-react';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tables = [
    { name: 'villages', desc: 'Stores administrative boundary, coordinates, population, and taluka info.', columns: 'id, name, district, taluka, lat, lng, population, households, terrain_slope, soil_type' },
    { name: 'hazards', desc: 'Multi-hazard susceptibility index and historical occurrences.', columns: 'id, village_id, hazard_type, susceptibility_score, historical_events_count, last_event_year' },
    { name: 'risk_scores', desc: 'Composite model risk scores and vulnerability ratings.', columns: 'id, village_id, composite_score, hazard_intensity, vulnerability_index, infrastructure_exposure' },
    { name: 'red_zones', desc: 'AI-assessed red zone polygons and declaration conditions.', columns: 'id, village_id, polygon_coords, declaration_status, slope_condition, flood_exposure_m' },
    { name: 'relocation_sites', desc: 'Candidate safe relocation sites with capacity and proximity.', columns: 'id, name, district, lat, lng, distance_km, estimated_capacity, suitability_score, water_availability' },
    { name: 'simulation_scenarios', desc: 'Rehabilitation simulator before/after parameters and outcomes.', columns: 'id, village_id, rainfall_delta_pct, pop_growth_pct, before_exposure, after_exposure, status' },
    { name: 'data_sources', desc: 'Traceability and metadata for official and open data sources.', columns: 'id, source_name, dataset_title, last_updated, data_quality, status_label' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#17221D]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#DCE7E1] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-[#17221D]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DCE7E1] flex items-center justify-between bg-[#E7F6EF]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white text-[#087F5B] border border-[#B8E5D2] shadow-2xs">
              <Database className="w-5 h-5 text-[#087F5B]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#07543F]">Supabase & PostgreSQL Schema Architecture</h2>
              <p className="text-xs text-[#66736D]">Production-ready relational database specifications for सुरक्षित धरा (SURAKSHIT DHARA)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 rounded-lg text-[#66736D] hover:text-[#17221D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F6F9F7]">
          <div className="bg-white border border-[#B8E5D2] rounded-xl p-4 text-xs text-[#07543F] flex items-start space-x-3 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-1">Production Database Readiness</span>
              The platform is architected for seamless Supabase PostgreSQL integration with spatial extensions (PostGIS). Foreign key constraints link habitations to multi-hazard models, candidate relocation sites, and authority reports.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tables.map((t, idx) => (
              <div key={idx} className="bg-white border border-[#DCE7E1] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-[#087F5B]" />
                      <span className="text-xs font-bold font-mono text-[#07543F]">{t.name}</span>
                    </div>
                    <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2] px-2 py-0.5 rounded-full font-bold">Table</span>
                  </div>
                  <p className="text-xs text-[#66736D] mb-3">{t.desc}</p>
                </div>
                <div className="bg-[#F6F9F7] rounded-lg p-2.5 border border-[#DCE7E1]">
                  <div className="text-[10px] font-semibold text-[#66736D] uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Key className="w-3 h-3 text-[#087F5B]" />
                    <span>Schema Columns</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#07543F] break-all">{t.columns}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#DCE7E1] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#087F5B] hover:bg-[#07543F] text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs"
          >
            Close Schema Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
