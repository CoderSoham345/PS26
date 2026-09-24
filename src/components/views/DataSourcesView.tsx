import React from 'react';
import { DataSource } from '../../types';

interface DataSourcesViewProps {
  sources: DataSource[];
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ sources }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Official':
        return <span className="bg-[#E7F6EF] text-[#087F5B] border border-[#087F5B]/30 px-2.5 py-1 rounded-full text-[10px] font-bold">Official</span>;
      case 'Open Data':
        return <span className="bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full text-[10px] font-bold">Open Data</span>;
      case 'Derived':
        return <span className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-2.5 py-1 rounded-full text-[10px] font-bold">Derived</span>;
      default:
        return <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full text-[10px] font-bold">Prototype</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Data Transparency & Provenance
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">Data Sources & GIS Provenance</h1>
          <p className="text-xs text-slate-600">Transparent registry of government datasets, satellite DEM models, and meteorological streams for the 5-district pilot</p>
        </div>
      </div>

      <div className="bg-white border border-[#DCE7E1] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DCE7E1] bg-[#F6F9F7] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Source Agency</th>
                <th className="py-3.5 px-4">Dataset Title</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4">Coverage</th>
                <th className="py-3.5 px-4">Purpose</th>
                <th className="py-3.5 px-4">Quality</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE7E1] text-xs">
              {sources.map((ds) => (
                <tr key={ds.id} className="hover:bg-[#F6F9F7]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#17221D]">{ds.source}</td>
                  <td className="py-4 px-4 text-slate-700">{ds.dataset}</td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{ds.lastUpdated}</td>
                  <td className="py-4 px-4 text-slate-700">{ds.coverage}</td>
                  <td className="py-4 px-4 text-slate-500">{ds.purpose}</td>
                  <td className="py-4 px-4">
                    <span className="text-[#087F5B] font-bold">{ds.dataQuality}</span>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(ds.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
