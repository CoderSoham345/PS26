import React, { useState } from 'react';
import { Shield, Users, LayoutDashboard, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, t } from '../lib/i18n';

interface LoginPortalViewProps {
  onLoginSuccess: (role: 'community' | 'authority' | 'admin', district: string, village?: string) => void;
  currentLang: Language;
  setLang: (lang: string) => void;
  districts: string[];
}

export const LoginPortalView: React.FC<LoginPortalViewProps> = ({
  onLoginSuccess,
  currentLang,
  setLang,
  districts
}) => {
  const [activePortal, setActivePortal] = useState<'select' | 'community' | 'authority' | 'admin'>('select');
  const [district, setDistrict] = useState('Raigad');
  const [loading, setLoading] = useState(false);

  const handlePortalLogin = (e: React.FormEvent, role: 'community' | 'authority' | 'admin') => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role, district);
    }, 400);
  };

  const handleQuickLogin = (role: 'community' | 'authority' | 'admin') => {
    onLoginSuccess(role, district);
  };

  return (
    <div className="min-h-screen bg-[#F6F9F7] text-[#17221D] flex flex-col justify-between p-4 sm:p-8 font-sans select-none">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#DCE7E1]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center shadow-sm">
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

        {/* Persistent Language selector on Portal Page */}
        <div className="flex items-center space-x-2 bg-white border border-[#DCE7E1] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-[#17221D] font-bold focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-white text-[#17221D]">English</option>
            <option value="mr" className="bg-white text-[#17221D]">मराठी (Marathi)</option>
            <option value="hi" className="bg-white text-[#17221D]">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full py-8 space-y-8 animate-fadeIn">
        {activePortal === 'select' && (
          <div className="space-y-8 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              <span className="px-3.5 py-1 bg-[#E7F6EF] text-[#07543F] rounded-full text-xs font-black uppercase tracking-widest border border-[#B8E5D2]">
                {t('aiDecisionSupport', currentLang)}
              </span>
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-[#07543F] tracking-tight">
                  सुरक्षित धरा में आपका स्वागत है
                </h2>
                <p className="text-lg font-bold text-[#087F5B]">
                  Welcome to SURAKSHIT DHARA
                </p>
                <p className="text-xs font-semibold text-[#66736D]">
                  "जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।" • "Identify Risk. Build a Safer Future."
                </p>
              </div>
              <p className="text-sm text-[#66736D] leading-relaxed pt-2">
                {t('selectPortalDesc', currentLang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Community Portal Card */}
              <div 
                onClick={() => setActivePortal('community')}
                className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-6 rounded-3xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] hover:bg-[#F6F9F7] transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center group-hover:bg-[#087F5B] group-hover:text-white transition-colors border border-[#B8E5D2]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17221D]">{t('communityResident', currentLang)}</h3>
                    <p className="text-xs text-[#66736D] mt-1 leading-relaxed">
                      {t('communityResidentDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#087F5B] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>

              {/* Authority Portal Card (Highlighted Default) */}
              <div 
                onClick={() => setActivePortal('authority')}
                className="bg-white border-2 border-[#087F5B] p-6 rounded-3xl shadow-[0_6px_22px_rgba(7,84,63,0.1)] relative transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="absolute -top-3 right-6 bg-[#087F5B] text-white font-black text-[9px] uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm">
                  GIS Command Center
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#087F5B] text-white flex items-center justify-center shadow-sm">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#07543F]">{t('authorityMgmt', currentLang)}</h3>
                    <p className="text-xs text-[#66736D] mt-1 leading-relaxed">
                      {t('authorityMgmtDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#087F5B] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>

              {/* Admin Portal Card */}
              <div 
                onClick={() => setActivePortal('admin')}
                className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-6 rounded-3xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] hover:bg-[#F6F9F7] transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center group-hover:bg-[#087F5B] group-hover:text-white transition-colors border border-[#B8E5D2]">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17221D]">{t('adminSystem', currentLang)}</h3>
                    <p className="text-xs text-[#66736D] mt-1 leading-relaxed">
                      {t('adminSystemDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#087F5B] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portal Authentication / District Confirmation */}
        {activePortal !== 'select' && (
          <div className="max-w-md mx-auto bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-6 animate-fadeIn">
            <button
              onClick={() => setActivePortal('select')}
              className="text-xs font-bold text-[#66736D] hover:text-[#17221D] transition-colors"
            >
              ← Back to Portal Selection
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#087F5B] tracking-wider block">
                Authorized Access
              </span>
              <h3 className="text-xl font-black text-[#17221D] mt-0.5">
                {activePortal === 'authority'
                  ? t('authorityMgmt', currentLang)
                  : activePortal === 'admin'
                  ? t('adminSystem', currentLang)
                  : t('communityResident', currentLang)}
              </h3>
            </div>

            <form onSubmit={(e) => handlePortalLogin(e, activePortal)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#66736D] mb-1">
                  Select Target Pilot District:
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-3.5 py-2.5 text-xs text-[#17221D] font-bold focus:outline-none focus:border-[#087F5B]"
                >
                  {districts.map((d) => (
                    <option key={d} value={d} className="bg-white text-[#17221D]">
                      {d} District
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Enter GIS Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin(activePortal)}
                className="w-full py-2 bg-white hover:bg-[#E7F6EF] text-[#087F5B] font-semibold text-xs rounded-xl border border-[#087F5B] transition-colors"
              >
                One-Click Quick Access
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-[#DCE7E1] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#66736D] gap-2">
        <p>सुरक्षित धरा • AI + GIS Disaster Risk & Safe Settlement Intelligence</p>
        <p>सुरक्षित धरा is a prototype decision-support platform and is not an official government emergency service.</p>
      </div>
    </div>
  );
};
