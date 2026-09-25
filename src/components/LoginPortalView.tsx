import React, { useState } from 'react';
import { Shield, Users, LayoutDashboard, Globe, ArrowRight, Lock, Mail, Phone, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] flex flex-col justify-between p-4 sm:p-8 font-sans select-none">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#1E293B]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center shadow-lg border border-[#34D399]/40">
            <Shield className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wider text-[#F8FAFC] flex items-center space-x-1.5">
              <span>DISASTER</span>
              <span className="text-[#10B981]">GUARD</span>
            </h1>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
              {t('subtitle', currentLang)}
            </p>
          </div>
        </div>

        {/* Persistent Language selector on Portal Page */}
        <div className="flex items-center space-x-2 bg-[#111827] border border-[#1E293B] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm">
          <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-[#F8FAFC] font-bold focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-[#111827] text-[#F8FAFC]">English</option>
            <option value="mr" className="bg-[#111827] text-[#F8FAFC]">मराठी (Marathi)</option>
            <option value="hi" className="bg-[#111827] text-[#F8FAFC]">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full py-8 space-y-8 animate-fadeIn">
        {activePortal === 'select' && (
          <div className="space-y-8 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              <span className="px-3.5 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-xs font-black uppercase tracking-widest border border-[#10B981]/30">
                {t('aiDecisionSupport', currentLang)}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] tracking-tight">
                {t('selectPortal', currentLang)}
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {t('selectPortalDesc', currentLang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Community Portal Card */}
              <div 
                onClick={() => setActivePortal('community')}
                className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981] p-6 rounded-3xl shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-slate-950 transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">{t('communityResident', currentLang)}</h3>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                      {t('communityResidentDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#10B981] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>

              {/* Authority Portal Card (Highlighted Default) */}
              <div 
                onClick={() => setActivePortal('authority')}
                className="bg-[#16202B] border-2 border-[#10B981] p-6 rounded-3xl shadow-2xl relative transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="absolute -top-3 right-6 bg-[#10B981] text-slate-950 font-black text-[9px] uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  GIS Command Center
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-slate-950 flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">{t('authorityMgmt', currentLang)}</h3>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                      {t('authorityMgmtDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#34D399] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>

              {/* Admin Portal Card */}
              <div 
                onClick={() => setActivePortal('admin')}
                className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981] p-6 rounded-3xl shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-slate-950 transition-colors">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">{t('adminSystem', currentLang)}</h3>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                      {t('adminSystemDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#10B981] group-hover:translate-x-1 transition-transform">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portal Authentication / District Confirmation */}
        {activePortal !== 'select' && (
          <div className="max-w-md mx-auto bg-[#111827] border border-[#1E293B] p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 animate-fadeIn">
            <button
              onClick={() => setActivePortal('select')}
              className="text-xs font-bold text-[#64748B] hover:text-[#F8FAFC] transition-colors"
            >
              ← Back to Portal Selection
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#10B981] tracking-wider block">
                Authorized Access
              </span>
              <h3 className="text-xl font-black text-[#F8FAFC] mt-0.5">
                {activePortal === 'authority'
                  ? t('authorityMgmt', currentLang)
                  : activePortal === 'admin'
                  ? t('adminSystem', currentLang)
                  : t('communityResident', currentLang)}
              </h3>
            </div>

            <form onSubmit={(e) => handlePortalLogin(e, activePortal)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                  Select Target Pilot District:
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#16202B] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-[#F8FAFC] font-bold focus:outline-none focus:border-[#10B981]"
                >
                  {districts.map((d) => (
                    <option key={d} value={d} className="bg-[#111827] text-[#F8FAFC]">
                      {d} District
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#34D399] hover:to-[#10B981] text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center space-x-2"
              >
                <span>Enter GIS Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin(activePortal)}
                className="w-full py-2 bg-[#16202B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-semibold text-xs rounded-xl border border-[#1E293B] transition-colors"
              >
                One-Click Quick Access
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] gap-2">
        <p>DisasterGuard • Maharashtra State Disaster Management Decision Support Platform</p>
        <p>{t('disclaimer', currentLang)}</p>
      </div>
    </div>
  );
};
