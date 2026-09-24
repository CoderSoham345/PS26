import React from 'react';
import { Shield, Key, Database } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl">
      <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm">
        <h1 className="text-xl font-extrabold text-[#17221D] mb-1">Platform Settings & Configurations</h1>
        <p className="text-xs text-slate-600">Manage API integrations, MapTiler keys, and security roles</p>
      </div>

      <div className="bg-white border border-[#DCE7E1] rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#DCE7E1]">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-[#087F5B]" />
            <div>
              <h3 className="text-sm font-bold text-[#17221D]">MapTiler SDK API Key</h3>
              <p className="text-xs text-slate-500">Configured via VITE_MAPTILER_API_KEY for live street and terrain maps</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#E7F6EF] text-[#087F5B] rounded-lg text-xs font-bold border border-[#087F5B]/30">Configured</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#DCE7E1]">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-[#087F5B]" />
            <div>
              <h3 className="text-sm font-bold text-[#17221D]">Gemini AI API Key Configuration</h3>
              <p className="text-xs text-slate-500">Configured via AI Studio secrets panel for generative reasoning</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#E7F6EF] text-[#087F5B] rounded-lg text-xs font-bold border border-[#087F5B]/30">Active</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#DCE7E1]">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-[#17221D]">Supabase PostgreSQL Connection</h3>
              <p className="text-xs text-slate-500">Spatial PostGIS extensions enabled for GeoJSON spatial queries</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold border border-teal-200">Connected</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-[#087F5B]" />
            <div>
              <h3 className="text-sm font-bold text-[#17221D]">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-500">Current User: State Disaster Management Authority (SDMA Administrator)</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#F6F9F7] text-slate-700 rounded-lg text-xs font-bold border border-[#DCE7E1]">Admin Level 1</span>
        </div>
      </div>
    </div>
  );
};
