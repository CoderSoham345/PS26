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
            <div className="flex items-baseline space-x-2">
              <span className="text-base font-black tracking-tight text-[#07543F]">सुरक्षित धरा</span>
              <span className="text-xs font-black tracking-wider text-[#087F5B] uppercase">SURAKSHIT DHARA</span>
            </div>
            <p className="text-[10px] font-bold text-[#66736D] tracking-wide">
              AI + GIS Disaster Risk & Safe Settlement Intelligence
            </p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2 bg-white border border-[#DCE7E1] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
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
          <span className="px-3.5 py-1 bg-[#E7F6EF] text-[#07543F] rounded-full text-xs font-extrabold uppercase tracking-widest border border-[#B8E5D2]">
            AI-Powered GIS Decision Support
          </span>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#07543F] tracking-tight">
              सुरक्षित धरा में आपका स्वागत है
            </h2>
            <p className="text-lg font-black text-[#087F5B]">
              Welcome to SURAKSHIT DHARA
            </p>
            <p className="text-xs font-semibold text-[#66736D]">
              "जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।" • "Identify Risk. Build a Safer Future."
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#66736D] max-w-xl mx-auto leading-relaxed pt-1">
            Prototype decision-support intelligence for Maharashtra disaster risk assessment, safe site identification, and resilient settlement planning.
          </p>
        </div>

        <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-6">
          {/* Step 1: Select Experience */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-[#66736D]">
              1. Select Your Experience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('community')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 min-h-[110px] cursor-pointer ${
                  selectedRole === 'community'
                    ? 'bg-[#E7F6EF] border-[#087F5B] shadow-sm ring-2 ring-[#087F5B]/20'
                    : 'bg-[#F6F9F7] border-[#DCE7E1] hover:border-[#B8E5D2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${selectedRole === 'community' ? 'bg-[#087F5B] text-white' : 'bg-white text-[#66736D] shadow-2xs border border-[#DCE7E1]'}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRole === 'community' ? 'border-[#087F5B] bg-[#087F5B]' : 'border-[#DCE7E1]'}`}>
                    {selectedRole === 'community' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#17221D]">Community / Resident</div>
                  <div className="text-[11px] text-[#66736D] mt-0.5">Village risk, relocation options & emergency guidance</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('authority')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 min-h-[110px] cursor-pointer ${
                  selectedRole === 'authority'
                    ? 'bg-[#087F5B] text-white border-[#07543F] shadow-sm ring-2 ring-[#087F5B]/20'
                    : 'bg-[#F6F9F7] border-[#DCE7E1] hover:border-[#B8E5D2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${selectedRole === 'authority' ? 'bg-white text-[#087F5B]' : 'bg-white text-[#66736D] shadow-2xs border border-[#DCE7E1]'}`}>
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRole === 'authority' ? 'border-white bg-white text-[#087F5B]' : 'border-[#DCE7E1]'}`}>
                    {selectedRole === 'authority' && <span className="w-1.5 h-1.5 bg-[#087F5B] rounded-full" />}
                  </span>
                </div>
                <div>
                  <div className={`text-sm font-extrabold ${selectedRole === 'authority' ? 'text-white' : 'text-[#17221D]'}`}>Authority / Admin</div>
                  <div className={`text-[11px] mt-0.5 ${selectedRole === 'authority' ? 'text-emerald-100' : 'text-[#66736D]'}`}>Multi-hazard analysis, red zones & relocation planning</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Select Pilot District */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-[#66736D]">
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
            className="w-full py-4 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer"
          >
            <span>Open {district} {selectedRole === 'community' ? 'Community' : 'Authority'} Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#66736D] pt-6 border-t border-[#DCE7E1] gap-2 text-center sm:text-left">
        <p>सुरक्षित धरा • AI + GIS Disaster Risk & Safe Settlement Intelligence</p>
        <p>सुरक्षित धरा is a prototype decision-support platform and is not an official government emergency service.</p>
      </div>
    </div>
  );
};
