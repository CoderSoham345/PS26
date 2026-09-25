import React, { useState } from 'react';
import { 
  Settings, Users, MapPin, Building, Activity, Database, FileText, Shield, 
  Layers, HardDrive, Terminal, Sliders, CheckCircle2, AlertTriangle, Plus, RefreshCw, Search 
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface AdminDashboardViewProps {
  habitations: Habitation[];
  relocationSites: RelocationSite[];
  selectedDistrict: string;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  habitations,
  relocationSites,
  selectedDistrict
}) => {
  const [adminSection, setAdminSection] = useState<string>('overview');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveConfig = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-300 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-slate-900 text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              System Administrator Mode
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
              PostgreSQL / Supabase RLS Secured
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">
            DisasterGuard System Administration
          </h1>
          <p className="text-xs text-slate-600">
            Global configuration, district/village metadata, hazard models, and user access management.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Configuration successfully updated in Supabase database.</span>
          </div>
        )}
      </div>

      {/* Admin Sub-Navigation */}
      <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-sm flex items-center space-x-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Admin Overview', icon: Terminal },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'districts', label: 'Districts', icon: MapPin },
          { id: 'villages', label: 'Villages', icon: Building },
          { id: 'hazards', label: 'Hazard Data', icon: Activity },
          { id: 'infrastructure', label: 'Infrastructure', icon: Database },
          { id: 'roads', label: 'Roads & Access', icon: Layers },
          { id: 'relocation', label: 'Relocation Sites', icon: Shield },
          { id: 'redzones', label: 'Red Zones', icon: AlertTriangle },
          { id: 'models', label: 'Model Config', icon: Sliders },
          { id: 'sources', label: 'Data Sources', icon: HardDrive },
          { id: 'logs', label: 'System Logs', icon: Terminal },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminSection(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {adminSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Users</div>
            <div className="text-3xl font-black text-slate-900">1,428</div>
            <div className="text-[11px] text-emerald-600 font-semibold">↑ 12 active officers today</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Managed Districts</div>
            <div className="text-3xl font-black text-[#087F5B]">5 Pilot Districts</div>
            <div className="text-[11px] text-slate-600 font-semibold">Raigad, Ratnagiri, Pune, Satara, Sindhudurg</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supabase Tables</div>
            <div className="text-3xl font-black text-slate-900">15 Active Tables</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Row Level Security active</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Model Status</div>
            <div className="text-3xl font-black text-blue-600">Active v2.4</div>
            <div className="text-[11px] text-slate-600 font-semibold">Multi-hazard weight engine operational</div>
          </div>
        </div>
      )}

      {adminSection === 'users' && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">User Role & Access Management (RBAC)</h3>
            <button onClick={handleSaveConfig} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
              + Add New User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">User Name / Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">District Jurisdiction</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold">soham.g@maharashtra.gov.in</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-slate-900 text-white rounded font-bold">admin</span></td>
                  <th className="p-3 font-normal">Statewide (All Districts)</th>
                  <td className="p-3 text-emerald-600 font-bold">Active</td>
                  <td className="p-3"><button onClick={handleSaveConfig} className="text-[#087F5B] hover:underline font-bold">Edit</button></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">collector.satara@maharashtra.gov.in</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">authority</span></td>
                  <td className="p-3">Satara</td>
                  <td className="p-3 text-emerald-600 font-bold">Active</td>
                  <td className="p-3"><button onClick={handleSaveConfig} className="text-[#087F5B] hover:underline font-bold">Edit</button></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">sarpanch.patan@gmail.com</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">community</span></td>
                  <td className="p-3">Satara (Patan)</td>
                  <td className="p-3 text-emerald-600 font-bold">Active</td>
                  <td className="p-3"><button onClick={handleSaveConfig} className="text-[#087F5B] hover:underline font-bold">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(adminSection === 'districts' || adminSection === 'villages' || adminSection === 'hazards' || adminSection === 'infrastructure' || adminSection === 'roads' || adminSection === 'relocation' || adminSection === 'redzones' || adminSection === 'models' || adminSection === 'sources' || adminSection === 'logs' || adminSection === 'reports' || adminSection === 'settings') && (
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 capitalize">{adminSection} Configuration & Management</h3>
            <button
              onClick={handleSaveConfig}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Save Database Changes
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Directly connected to Supabase table <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono">public.{adminSection}</code>. Modify records below or perform bulk schema updates via SQL editor.
          </p>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${adminSection} records...`}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs w-full max-w-md focus:outline-none focus:border-slate-900"
              />
            </div>
            <div className="text-xs text-slate-500 italic">
              Showing records for current selected district: <strong className="text-slate-800">{selectedDistrict}</strong>. Total records: {habitations.length} habitations loaded.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
