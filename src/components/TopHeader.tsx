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
    <header className="h-16 bg-[#FFFFFF] border-b border-[#DCE7E1] px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0 shadow-[0_2px_10px_rgba(7,84,63,0.04)] text-[#17221D]">
      {/* Left Branding */}
      <div className="flex items-center space-x-2.5 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#087F5B] flex items-center justify-center shadow-sm">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-baseline space-x-1.5 leading-tight">
            <span className="text-sm font-black tracking-tight text-[#07543F]">सुरक्षित धरा</span>
            <span className="text-[11px] font-black tracking-wider text-[#087F5B] hidden sm:inline uppercase">
              SURAKSHIT DHARA
            </span>
          </div>
          <p className="text-[9px] font-bold text-[#66736D] tracking-wide truncate max-w-[240px] hidden md:block">
            AI + GIS Disaster Risk & Safe Settlement Intelligence
          </p>
        </div>
      </div>

      {/* Center Dynamic Selectors: District, Village, Candidate Site */}
      <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto scrollbar-none py-1">
        {/* District Selector (Light Green Background) */}
        <div className="flex items-center space-x-1.5 bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl px-2.5 py-1.5 text-xs transition-colors">
          <span className="text-[10px] uppercase font-bold text-[#07543F] hidden md:inline">
            {t('district', currentLang)}:
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="bg-transparent text-[#07543F] font-bold focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {districts.map((d) => (
              <option key={d} value={d} className="bg-white text-[#17221D]">
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Village Selector */}
        <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#DCE7E1] hover:border-[#DC3545]/50 rounded-xl px-2.5 py-1.5 text-xs transition-colors shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#66736D] hidden md:inline">
            {t('village', currentLang)}:
          </span>
          <select
            value={selectedVillage?.id || ''}
            onChange={(e) => {
              const v = villages.find((item) => item.id === e.target.value);
              if (v) onVillageChange(v);
            }}
            className="bg-transparent text-[#DC3545] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[130px] sm:max-w-[170px] truncate"
          >
            {villages.map((v) => (
              <option key={v.id} value={v.id} className="bg-white text-[#17221D]">
                {v.name} ({v.riskScore})
              </option>
            ))}
          </select>
        </div>

        {/* Candidate Site Selector */}
        <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#DCE7E1] hover:border-[#087F5B]/50 rounded-xl px-2.5 py-1.5 text-xs transition-colors shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#66736D] hidden md:inline">
            {t('candidateSite', currentLang)}:
          </span>
          <select
            value={selectedSite?.id || ''}
            onChange={(e) => {
              const s = candidateSites.find((item) => item.id === e.target.value);
              if (s) onSiteChange(s);
            }}
            className="bg-transparent text-[#087F5B] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[130px] sm:max-w-[180px] truncate"
          >
            {candidateSites.map((s) => (
              <option key={s.id} value={s.id} className="bg-white text-[#17221D]">
                {s.name} ({s.suitabilityScore} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls: Language, Mode Badge, Gemini AI */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Language Selector Dropdown (White background, green border) */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-label="Select Language"
            className="flex items-center space-x-1.5 bg-[#FFFFFF] hover:bg-[#F6F9F7] border border-[#087F5B] text-[#087F5B] px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
            <span className="font-bold">{languages.find(l => l.code === currentLang)?.label.split(' ')[0] || 'EN'}</span>
            <ChevronDown className="w-3 h-3 text-[#087F5B]" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-[#DCE7E1] rounded-xl shadow-xl py-1.5 z-50 animate-fadeIn">
              <div className="px-3 py-1 text-[10px] font-bold text-[#66736D] uppercase tracking-wider">
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
                      ? 'bg-[#E7F6EF] text-[#07543F] font-bold'
                      : 'text-[#17221D] hover:bg-[#F6F9F7]'
                  }`}
                >
                  <span>{l.label}</span>
                  {currentLang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Authority / Admin Mode Toggle / Badge */}
        <button
          onClick={onSwitchRole}
          title="Switch User Role Portal"
          className="hidden lg:flex items-center space-x-1.5 bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] px-3 py-1.5 rounded-xl text-xs font-bold text-[#07543F] transition-colors"
        >
          <UserCheck className="w-3.5 h-3.5 text-[#087F5B]" />
          <span>
            {userRole === 'admin'
              ? t('adminMode', currentLang)
              : userRole === 'authority'
              ? t('authorityMode', currentLang)
              : t('communityMode', currentLang)}
          </span>
        </button>

        {/* Gemini AI Trigger Button (AI Status Green Dot + Primary Green) */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center space-x-2 bg-[#087F5B] hover:bg-[#07543F] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer min-h-[36px]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">✦ Gemini AI</span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>
    </header>
  );
};
