import React, { useState } from 'react';
import { Shield, Users, LayoutDashboard, Settings, Globe, ArrowRight, Lock, Mail, Phone, CheckCircle2 } from 'lucide-react';
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
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('Raigad');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePortalLogin = (e: React.FormEvent, role: 'community' | 'authority' | 'admin') => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role, district);
    }, 600);
  };

  const handleDemoLogin = (role: 'community' | 'authority' | 'admin') => {
    onLoginSuccess(role, district);
  };

  return (
    <div className="min-h-screen bg-[#F6F9F7] text-[#17221D] flex flex-col justify-between p-4 sm:p-8 font-sans select-none">
      {/* Top Header */}
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
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Maharashtra Disaster Management Platform</p>
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

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full py-8 space-y-8 animate-fadeIn">
        {activePortal === 'select' && (
          <div className="space-y-8 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              <span className="px-3.5 py-1 bg-[#E7F6EF] text-[#087F5B] rounded-full text-xs font-extrabold uppercase tracking-widest border border-[#087F5B]/30">
                {t('aiDecisionSupport', currentLang)}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
                {t('selectPortal', currentLang)}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('selectPortalDesc', currentLang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Community Portal Card */}
              <div 
                onClick={() => setActivePortal('community')}
                className="bg-white border border-[#DCE7E1] hover:border-[#087F5B] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17221D]">{t('communityResident', currentLang)}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t('communityResidentDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#DCE7E1] text-xs font-bold text-[#087F5B]">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Authority Portal Card */}
              <div 
                onClick={() => setActivePortal('authority')}
                className="bg-white border border-[#DCE7E1] hover:border-[#087F5B] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17221D]">{t('authorityMgmt', currentLang)}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t('authorityMgmtDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#DCE7E1] text-xs font-bold text-[#087F5B]">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Admin Portal Card */}
              <div 
                onClick={() => setActivePortal('admin')}
                className="bg-white border border-[#DCE7E1] hover:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#17221D]">{t('adminSystem', currentLang)}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {t('adminSystemDesc', currentLang)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#DCE7E1] text-xs font-bold text-slate-900">
                  <span>{t('accessPortal', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Login Form */}
        {activePortal === 'community' && (
          <div className="max-w-md mx-auto bg-white border border-[#DCE7E1] p-8 rounded-3xl shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-emerald-100 text-[#087F5B] px-2.5 py-1 rounded-lg font-extrabold uppercase">Community Portal</span>
                <h2 className="text-xl font-black text-[#17221D] mt-1">Resident Login</h2>
              </div>
              <button
                onClick={() => setActivePortal('select')}
                className="text-xs font-bold text-slate-500 hover:text-[#087F5B]"
              >
                ← Back
              </button>
            </div>

            <form onSubmit={(e) => handlePortalLogin(e, 'community')} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Mobile Number / Email</label>
                <input
                  type="text"
                  required
                  placeholder="Enter mobile or email..."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Pilot District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs font-bold text-[#087F5B] focus:outline-none focus:border-[#087F5B] cursor-pointer"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d} District</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
              >
                {loading ? 'Authenticating...' : 'Login to Community Portal'}
              </button>

              <div className="pt-2 flex items-center justify-between text-[11px]">
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered mobile/email.'); }} className="text-[#087F5B] font-semibold hover:underline">Forgot Password?</a>
                <a href="#register" onClick={(e) => { e.preventDefault(); alert('Resident registration request submitted to village panchayat.'); }} className="text-slate-600 font-semibold hover:underline">Register / Request Access</a>
              </div>
            </form>

            <div className="pt-4 border-t border-[#DCE7E1]">
              <button
                type="button"
                onClick={() => handleDemoLogin('community')}
                className="w-full py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] text-xs font-bold rounded-xl transition-colors border border-[#087F5B]/30"
              >
                ⚡ Quick Demo Login (Community)
              </button>
            </div>
          </div>
        )}

        {/* Authority Login Form */}
        {activePortal === 'authority' && (
          <div className="max-w-md mx-auto bg-white border border-[#DCE7E1] p-8 rounded-3xl shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg font-extrabold uppercase">Authority Portal</span>
                <h2 className="text-xl font-black text-[#17221D] mt-1">Official Login</h2>
              </div>
              <button
                onClick={() => setActivePortal('select')}
                className="text-xs font-bold text-slate-500 hover:text-[#087F5B]"
              >
                ← Back
              </button>
            </div>

            <form onSubmit={(e) => handlePortalLogin(e, 'authority')} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Official Email / User ID</label>
                <input
                  type="text"
                  required
                  placeholder="officer@maharashtra.gov.in"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Jurisdiction District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs font-bold text-[#087F5B] focus:outline-none focus:border-[#087F5B] cursor-pointer"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d} District</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
              >
                {loading ? 'Authenticating...' : 'Authority Login'}
              </button>
            </form>

            <div className="pt-4 border-t border-[#DCE7E1]">
              <button
                type="button"
                onClick={() => handleDemoLogin('authority')}
                className="w-full py-2.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] text-xs font-bold rounded-xl transition-colors border border-[#087F5B]/30"
              >
                ⚡ Quick Demo Login (Authority)
              </button>
            </div>
          </div>
        )}

        {/* Admin Login Form */}
        {activePortal === 'admin' && (
          <div className="max-w-md mx-auto bg-white border border-slate-300 p-8 rounded-3xl shadow-lg space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-lg font-extrabold uppercase">System Admin</span>
                <h2 className="text-xl font-black text-[#17221D] mt-1">Admin Login</h2>
              </div>
              <button
                onClick={() => setActivePortal('select')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                ← Back
              </button>
            </div>

            <form onSubmit={(e) => handlePortalLogin(e, 'admin')} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Admin ID / Email</label>
                <input
                  type="text"
                  required
                  placeholder="admin@disasterguard.gov.in"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Admin Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F6F9F7] border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#17221D] focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
              >
                {loading ? 'Authenticating...' : 'System Admin Login'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-300"
              >
                ⚡ Quick Demo Login (Admin)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-[11px] text-slate-500 pt-6 border-t border-[#DCE7E1]">
        Maharashtra State Disaster Management Authority (SDMA) • Secure Role-Based Access Control (RBAC).
      </div>
    </div>
  );
};
