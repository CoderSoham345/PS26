import React, { useState, useRef, useEffect } from 'react';
import { Shield, Globe, ChevronDown, Sparkles, UserCheck, Menu, Check } from 'lucide-react';
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
  onToggleMobileMenu?: () => void;
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
  onOpenAiChat,
  onToggleMobileMenu
}) => {
  const [showDesktopLangMenu, setShowDesktopLangMenu] = useState(false);
  const desktopLangRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी (Marathi)', short: 'MR' },
    { code: 'hi', label: 'हिन्दी (Hindi)', short: 'HI' },
  ];

  // Close desktop language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopLangRef.current && !desktopLangRef.current.contains(event.target as Node)) {
        setShowDesktopLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="sticky top-0 z-30 w-full max-w-full bg-white shadow-[0_2px_10px_rgba(7,84,63,0.06)] border-b border-[#DCE7E1]">
      {/* ========================================================
          ROW 1: TOP MAIN APP BAR (~56px - 64px)
          Desktop (xl+): Displays Logo, Selectors, Lang, Role, AI
          Mobile / Tablet (<xl): Displays [☰] [Shield] Surakshit Dhara  [AI]
          ======================================================== */}
      <header className="h-14 sm:h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between text-[#17221D] w-full max-w-full">
        {/* Left: Mobile Menu Button + App Branding */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0 min-w-0">
          {/* Mobile Hamburger Drawer Toggle (Mobile only < md) */}
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              aria-label="Toggle Navigation Drawer"
              className="md:hidden p-2 rounded-xl text-[#07543F] hover:bg-[#E7F6EF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -ml-1 cursor-pointer"
            >
              <Menu className="w-6 h-6 text-[#087F5B]" />
            </button>
          )}

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#087F5B] flex items-center justify-center shadow-sm shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          <div className="truncate">
            <div className="flex items-baseline space-x-1.5 leading-tight">
              <span className="text-sm sm:text-base font-black tracking-tight text-[#07543F]">
                सुरक्षित धरा
              </span>
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-[#087F5B] uppercase hidden xs:inline sm:inline">
                SURAKSHIT DHARA
              </span>
            </div>
            <p className="text-[9px] font-bold text-[#66736D] tracking-wide truncate max-w-[240px] hidden 2xl:block">
              AI + GIS Disaster Risk & Safe Settlement Intelligence
            </p>
          </div>
        </div>

        {/* Center: Full Desktop Horizontal Controls (Visible ONLY on xl+ screens >= 1280px) */}
        <div className="hidden xl:flex items-center space-x-2.5 2xl:space-x-3 shrink-0">
          {/* District Selector */}
          <div className="flex items-center space-x-1.5 bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl px-2.5 py-1.5 text-xs transition-colors">
            <span className="text-[10px] uppercase font-bold text-[#07543F]">
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
            <span className="text-[10px] uppercase font-bold text-[#66736D]">
              {t('village', currentLang)}:
            </span>
            <select
              value={selectedVillage?.id || ''}
              onChange={(e) => {
                const v = villages.find((item) => item.id === e.target.value);
                if (v) onVillageChange(v);
              }}
              className="bg-transparent text-[#DC3545] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[140px] truncate"
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
            <span className="text-[10px] uppercase font-bold text-[#66736D]">
              {t('candidateSite', currentLang)}:
            </span>
            <select
              value={selectedSite?.id || ''}
              onChange={(e) => {
                const s = candidateSites.find((item) => item.id === e.target.value);
                if (s) onSiteChange(s);
              }}
              className="bg-transparent text-[#087F5B] font-bold focus:outline-none cursor-pointer pr-1 text-xs max-w-[150px] truncate"
            >
              {candidateSites.map((s) => (
                <option key={s.id} value={s.id} className="bg-white text-[#17221D]">
                  {s.name} ({s.suitabilityScore} pts)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Desktop Language Selector (Visible on xl+ screens) */}
          <div className="relative hidden xl:block z-40" ref={desktopLangRef}>
            <button
              onClick={() => setShowDesktopLangMenu(!showDesktopLangMenu)}
              aria-label="Select Language"
              className="flex items-center space-x-1.5 bg-[#FFFFFF] hover:bg-[#F6F9F7] border border-[#087F5B] text-[#087F5B] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-2xs min-h-[38px] cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#087F5B]" />
              <span>{currentLangObj.label.split(' ')[0]}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#087F5B] transition-transform ${showDesktopLangMenu ? 'rotate-180' : ''}`} />
            </button>

            {showDesktopLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DCE7E1] rounded-2xl shadow-xl py-1.5 z-50 animate-fadeIn">
                <div className="px-3.5 py-1.5 text-[10px] font-black text-[#66736D] uppercase tracking-wider border-b border-slate-100">
                  Select Language / भाषा
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowDesktopLangMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors min-h-[40px] cursor-pointer ${
                      currentLang === l.code
                        ? 'bg-[#E7F6EF] text-[#07543F] font-black'
                        : 'text-[#17221D] hover:bg-[#F6F9F7] font-semibold'
                    }`}
                  >
                    <span>{l.label}</span>
                    {currentLang === l.code && <Check className="w-3.5 h-3.5 text-[#087F5B]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Role Switcher Button (Desktop & Tablet) */}
          <button
            onClick={onSwitchRole}
            title="Switch User Role Portal"
            className="hidden sm:flex items-center space-x-1.5 bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-[#07543F] transition-colors min-h-[44px] sm:min-h-[38px] cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#087F5B]" />
            <span className="hidden md:inline">
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
            aria-label="Open Gemini AI Assistant"
            className="flex items-center space-x-1.5 bg-[#087F5B] hover:bg-[#07543F] text-white px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer min-h-[44px] sm:min-h-[38px] shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="hidden xs:inline sm:inline">✦ Gemini AI</span>
            <span className="xs:hidden font-mono font-black">AI</span>
          </button>
        </div>
      </header>

      {/* ========================================================
          RESPONSIVE CONTROLS BAR (< xl screens, width < 1280px)
          Always visible, clean, never clips, never overflows!
          ROW 2: [District] [Village]
          ROW 3: [Candidate Site] [🌐 Language ▼]
          On Tablet (640px - 1279px): Clean 4-column responsive grid
          ======================================================== */}
      <div className="xl:hidden bg-[#F6F9F7] border-t border-[#DCE7E1] px-3 py-2 sm:px-4 sm:py-2.5 w-full max-w-full box-border">
        {/* Mobile View (< 640px): 2 Clean Rows of 2 columns each */}
        <div className="sm:hidden space-y-2 w-full max-w-full">
          {/* ROW 2: District + Village */}
          <div className="grid grid-cols-2 gap-2 w-full">
            {/* District */}
            <div className="bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl px-2.5 py-1 flex flex-col justify-center min-h-[44px] min-w-0">
              <span className="text-[9px] font-black uppercase text-[#07543F] leading-tight block">
                {t('district', currentLang)}
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="w-full bg-transparent text-[#07543F] font-bold text-xs focus:outline-none cursor-pointer truncate"
              >
                {districts.map((d) => (
                  <option key={d} value={d} className="bg-white text-[#17221D]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Village */}
            <div className="bg-white border border-[#DCE7E1] rounded-xl px-2.5 py-1 flex flex-col justify-center min-h-[44px] min-w-0">
              <span className="text-[9px] font-black uppercase text-[#DC3545] leading-tight block">
                {t('village', currentLang)}
              </span>
              <select
                value={selectedVillage?.id || ''}
                onChange={(e) => {
                  const v = villages.find((item) => item.id === e.target.value);
                  if (v) onVillageChange(v);
                }}
                className="w-full bg-transparent text-[#DC3545] font-bold text-xs focus:outline-none cursor-pointer truncate"
              >
                {villages.map((v) => (
                  <option key={v.id} value={v.id} className="bg-white text-[#17221D]">
                    {v.name} ({v.riskScore})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ROW 3: Candidate Site + Language Selector (ALWAYS VISIBLE & FULLY CLICKABLE) */}
          <div className="grid grid-cols-2 gap-2 w-full">
            {/* Candidate Site */}
            <div className="bg-white border border-[#DCE7E1] rounded-xl px-2.5 py-1 flex flex-col justify-center min-h-[44px] min-w-0">
              <span className="text-[9px] font-black uppercase text-[#087F5B] leading-tight block">
                {t('candidateSite', currentLang)}
              </span>
              <select
                value={selectedSite?.id || ''}
                onChange={(e) => {
                  const s = candidateSites.find((item) => item.id === e.target.value);
                  if (s) onSiteChange(s);
                }}
                className="w-full bg-transparent text-[#087F5B] font-bold text-xs focus:outline-none cursor-pointer truncate"
              >
                {candidateSites.map((s) => (
                  <option key={s.id} value={s.id} className="bg-white text-[#17221D]">
                    {s.name} ({s.suitabilityScore} pts)
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector: Minimum 44px touch target, prominent, high z-index, never clipped! */}
            <div className="bg-white border-2 border-[#087F5B] rounded-xl px-2.5 py-1 flex flex-col justify-center min-h-[44px] min-w-0 shadow-2xs relative z-40">
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3 text-[#087F5B] shrink-0" />
                <span className="text-[9px] font-black uppercase text-[#087F5B] leading-tight block truncate">
                  {t('language', currentLang)}
                </span>
              </div>
              <select
                value={currentLang}
                onChange={(e) => setLang(e.target.value as Language)}
                aria-label="Select Interface Language"
                className="w-full bg-transparent text-[#07543F] font-black text-xs focus:outline-none cursor-pointer truncate mt-0.5"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white text-[#17221D] font-bold">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tablet / Medium Screens (640px - 1279px): Single 4-column balanced grid */}
        <div className="hidden sm:grid grid-cols-4 gap-2.5 w-full">
          {/* Column 1: District */}
          <div className="bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl px-3 py-1.5 flex flex-col justify-center min-h-[44px] min-w-0">
            <span className="text-[9px] font-black uppercase text-[#07543F] block">
              {t('district', currentLang)}
            </span>
            <select
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="w-full bg-transparent text-[#07543F] font-bold text-xs focus:outline-none cursor-pointer truncate"
            >
              {districts.map((d) => (
                <option key={d} value={d} className="bg-white text-[#17221D]">
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Column 2: Village */}
          <div className="bg-white border border-[#DCE7E1] rounded-xl px-3 py-1.5 flex flex-col justify-center min-h-[44px] min-w-0">
            <span className="text-[9px] font-black uppercase text-[#DC3545] block">
              {t('village', currentLang)}
            </span>
            <select
              value={selectedVillage?.id || ''}
              onChange={(e) => {
                const v = villages.find((item) => item.id === e.target.value);
                if (v) onVillageChange(v);
              }}
              className="w-full bg-transparent text-[#DC3545] font-bold text-xs focus:outline-none cursor-pointer truncate"
            >
              {villages.map((v) => (
                <option key={v.id} value={v.id} className="bg-white text-[#17221D]">
                  {v.name} ({v.riskScore}/100)
                </option>
              ))}
            </select>
          </div>

          {/* Column 3: Candidate Site */}
          <div className="bg-white border border-[#DCE7E1] rounded-xl px-3 py-1.5 flex flex-col justify-center min-h-[44px] min-w-0">
            <span className="text-[9px] font-black uppercase text-[#087F5B] block">
              {t('candidateSite', currentLang)}
            </span>
            <select
              value={selectedSite?.id || ''}
              onChange={(e) => {
                const s = candidateSites.find((item) => item.id === e.target.value);
                if (s) onSiteChange(s);
              }}
              className="w-full bg-transparent text-[#087F5B] font-bold text-xs focus:outline-none cursor-pointer truncate"
            >
              {candidateSites.map((s) => (
                <option key={s.id} value={s.id} className="bg-white text-[#17221D]">
                  {s.name} ({s.suitabilityScore} pts)
                </option>
              ))}
            </select>
          </div>

          {/* Column 4: Language Selector */}
          <div className="bg-white border-2 border-[#087F5B] rounded-xl px-3 py-1.5 flex flex-col justify-center min-h-[44px] min-w-0 shadow-2xs relative z-40">
            <div className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
              <span className="text-[9px] font-black uppercase text-[#087F5B] block">
                {t('language', currentLang)}
              </span>
            </div>
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value as Language)}
              aria-label="Select Interface Language"
              className="w-full bg-transparent text-[#07543F] font-black text-xs focus:outline-none cursor-pointer truncate"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-[#17221D] font-bold">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
