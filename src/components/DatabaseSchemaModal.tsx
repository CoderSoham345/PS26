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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1519] border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#071216]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Supabase & PostgreSQL Schema Architecture</h2>
              <p className="text-xs text-slate-400">Production-ready relational database specifications for DisasterGuard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-xs text-emerald-300 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-1">Production Database Readiness</span>
              The platform is architected for seamless Supabase PostgreSQL integration with spatial extensions (PostGIS). Foreign key constraints link habitations to multi-hazard models, candidate relocation sites, and authority reports.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tables.map((t, idx) => (
              <div key={idx} className="bg-[#071216] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold font-mono text-slate-200">{t.name}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Table</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{t.desc}</p>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-2.5 border border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Key className="w-3 h-3 text-emerald-400" />
                    <span>Schema Columns</span>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-300/90 break-all">{t.columns}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#071216] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
          >
            Close Schema Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
