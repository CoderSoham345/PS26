import React, { useState } from 'react';
import { Shield, Users, LayoutDashboard, MapPin, Globe, ArrowRight } from 'lucide-react';
import { Language, t } from '../lib/i18n';

interface LandingViewProps {
  onStart: (role: 'community' | 'authority', district: string) => void;
  currentLang: Language;
  setLang: (lang: string) => void;
  districts: string[];
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, currentLang, setLang, districts }) => {
  const [selectedRole, setSelectedRole] = useState<'community' | 'authority'>('community');
  const [district, setDistrict] = useState<string>('Raigad');

  return (
    <div className="min-h-screen bg-[#F6F9F7] text-[#17221D] flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#DCE7E1]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center shadow-md">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wider text-[#17221D] flex items-center space-x-1.5">
              <span>DISASTER</span>
              <span className="text-[#087F5B]">GUARD</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Maharashtra Disaster Management</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2 bg-white border border-[#DCE7E1] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-[#17221D] font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>

      {/* Main Hero & Selection */}
      <div className="max-w-3xl mx-auto w-full py-8 space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 bg-[#E7F6EF] text-[#087F5B] rounded-full text-xs font-extrabold uppercase tracking-widest border border-[#087F5B]/30">
            AI-Powered Decision Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
            Maharashtra Disaster Risk & Relocation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Prototype for Maharashtra disaster-management decision support and community resilience planning.
          </p>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          {/* Step 1: Select Experience */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500">
              1. Select Your Experience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('community')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 min-h-[110px] ${
                  selectedRole === 'community'
                    ? 'bg-[#E7F6EF] border-[#087F5B] shadow-sm ring-2 ring-[#087F5B]/20'
                    : 'bg-[#F6F9F7] border-[#DCE7E1] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${selectedRole === 'community' ? 'bg-[#087F5B] text-white' : 'bg-white text-slate-600 shadow-sm'}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRole === 'community' ? 'border-[#087F5B] bg-[#087F5B]' : 'border-slate-300'}`}>
                    {selectedRole === 'community' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#17221D]">Community / Resident</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Village risk, relocation options & emergency guidance</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('authority')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 min-h-[110px] ${
                  selectedRole === 'authority'
                    ? 'bg-[#087F5B] text-white border-[#07543F] shadow-sm ring-2 ring-[#087F5B]/20'
                    : 'bg-[#F6F9F7] border-[#DCE7E1] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${selectedRole === 'authority' ? 'bg-white text-[#087F5B]' : 'bg-white text-slate-600 shadow-sm'}`}>
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRole === 'authority' ? 'border-white bg-white text-[#087F5B]' : 'border-slate-300'}`}>
                    {selectedRole === 'authority' && <span className="w-1.5 h-1.5 bg-[#087F5B] rounded-full" />}
                  </span>
                </div>
                <div>
                  <div className={`text-sm font-extrabold ${selectedRole === 'authority' ? 'text-white' : 'text-[#17221D]'}`}>Authority / Admin</div>
                  <div className={`text-[11px] mt-0.5 ${selectedRole === 'authority' ? 'text-emerald-100' : 'text-slate-600'}`}>Multi-hazard analysis, red zones & relocation planning</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Select Pilot District */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500">
              2. Select Pilot District
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F5B]" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl pl-11 pr-4 py-3.5 text-xs font-bold text-[#17221D] focus:outline-none focus:border-[#087F5B] transition-colors cursor-pointer"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d} District (Maharashtra)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onStart(selectedRole, district)}
            className="w-full py-4 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 min-h-[48px]"
          >
            <span>Open {district} {selectedRole === 'community' ? 'Community' : 'Authority'} Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-[11px] text-slate-500 pt-6 border-t border-[#DCE7E1]">
        Prototype decision-support analysis — Maharashtra State Disaster Management Authority (SDMA) framework.
      </div>
    </div>
  );
};
