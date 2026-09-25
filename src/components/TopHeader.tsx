import React, { useState } from 'react';
import { Shield, Globe, ChevronDown, Sparkles, UserCheck } from 'lucide-react';
import { Language, t } from '../lib/i18n';
import { Habitation, RelocationSite } from '../types';

interface TopHeaderProps {
  currentLang: Language;
  setLang: (lang: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  districts: string[];
  villages: Habitation[];
  selectedVillage: Habitation;
  onVillageChange: (village: Habitation) => void;
  candidateSites: RelocationSite[];
  selectedSite: RelocationSite;
  onSiteChange: (site: RelocationSite) => void;
  userRole: 'authority' | 'admin' | 'community';
  onSwitchRole: () => void;
  onOpenAiChat: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentLang,
  setLang,
  selectedDistrict,
  onDistrictChange,
  districts,
  villages,
  selectedVillage,
  onVillageChange,
  candidateSites,
  selectedSite,
  onSiteChange,
  userRole,
  onSwitchRole,
  onOpenAiChat
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
  ];

  return (
    <header className="h-16 bg-[#0B0F17] border-b border-[#1E293B] px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0 shadow-xl text-[#F8FAFC]">
      {/* Left Branding */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-[#34D399]/40">
          <Shield className="w-5 h-5 text-slate-950" />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center space-x-1.5 leading-none">
            <span className="text-sm font-black tracking-wider text-[#F8FAFC]">DISASTER</span>
            <span className="text-sm font-black tracking-wider text-[#10B981]">GUARD</span>
          </div>
          <p className="text-[9px] font-bold text-[#64748B] tracking-wider uppercase mt-0.5">
            {t('subtitle', currentLang)}
          </p>
        </div>
      </div>

      {/* Center Dynamic Selectors: District, Village, Candidate Site */}
      <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto scrollbar-none py-1">
        {/* District Selector */}
        <div className="flex items-center space-x-1.5 bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/50 rounded-xl px-2.5 py-1.5 text-xs transition-colors">
          <span className="text-[10px] uppercase font-bold text-[#64748B] hidden md:inline">
            {t('district', currentLang)}:
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="bg-transparent text-[#F8FAFC] font-bold focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {districts.map((d) => (
              <option key={d} value={d} className="bg-[#111827] text-[#F8FAFC]">
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Village Selector */}
        <div className="flex items-center space-x-1.5 bg-[#111827] border border-[#1E293B] hover:border-[#EF4444]/50 rounded-xl px-2.5 py-1.5 text-xs transition-colors">
          <span className="text-[10px] uppercase font-bold text-[#64748B] hidden md:inline">
            {t('village', currentLang)}:
          </span>
          <select
            value={selectedVillage?.id || ''}
            onChange={(e) => {
              const v = villages.find((item) => item.id === e.target.value);
              if (v) onVillageChange(v);
            }}
            className="bg-transparent text-[#EF4444] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[130px] sm:max-w-[170px] truncate"
          >
            {villages.map((v) => (
              <option key={v.id} value={v.id} className="bg-[#111827] text-[#F8FAFC]">
                {v.name} ({v.riskScore})
              </option>
            ))}
          </select>
        </div>

        {/* Candidate Site Selector */}
        <div className="flex items-center space-x-1.5 bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/50 rounded-xl px-2.5 py-1.5 text-xs transition-colors">
          <span className="text-[10px] uppercase font-bold text-[#64748B] hidden md:inline">
            {t('candidateSite', currentLang)}:
          </span>
          <select
            value={selectedSite?.id || ''}
            onChange={(e) => {
              const s = candidateSites.find((item) => item.id === e.target.value);
              if (s) onSiteChange(s);
            }}
            className="bg-transparent text-[#10B981] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[130px] sm:max-w-[180px] truncate"
          >
            {candidateSites.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#111827] text-[#F8FAFC]">
                {s.name} ({s.suitabilityScore} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls: Language, Mode Badge, Gemini AI */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-label="Select Language"
            className="flex items-center space-x-1.5 bg-[#111827] hover:bg-[#16202B] border border-[#1E293B] px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="font-bold">{languages.find(l => l.code === currentLang)?.label.split(' ')[0] || 'EN'}</span>
            <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn">
              <div className="px-3 py-1 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                {t('language', currentLang)}
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    currentLang === l.code
                      ? 'bg-[#10B981]/20 text-[#34D399] font-bold'
                      : 'text-[#94A3B8] hover:bg-[#16202B] hover:text-[#F8FAFC]'
                  }`}
                >
                  <span>{l.label}</span>
                  {currentLang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Authority / Admin Mode Toggle / Badge */}
        <button
          onClick={onSwitchRole}
          title="Switch User Role Portal"
          className="hidden lg:flex items-center space-x-1.5 bg-[#16202B] hover:bg-[#1E293B] border border-[#1E293B] px-3 py-1.5 rounded-xl text-xs font-bold text-[#34D399] transition-colors"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>
            {userRole === 'admin'
              ? t('adminMode', currentLang)
              : userRole === 'authority'
              ? t('authorityMode', currentLang)
              : t('communityMode', currentLang)}
          </span>
        </button>

        {/* Gemini AI Trigger Button */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#34D399] hover:to-[#10B981] text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
          <span className="hidden sm:inline">✦ Gemini AI</span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>
    </header>
  );
};
