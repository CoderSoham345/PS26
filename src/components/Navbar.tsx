import React, { useState } from 'react';
import { Search, Globe, ChevronDown, UserCheck, LayoutDashboard, RefreshCw } from 'lucide-react';
import { Language } from '../lib/i18n';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  districts: string[];
  onOpenAiAssistant: () => void;
  isAuthorityView: boolean;
  onSwitchRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  setLang,
  selectedDistrict,
  setSelectedDistrict,
  districts,
  onOpenAiAssistant,
  isAuthorityView,
  onSwitchRole
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिन्दी)' },
    { code: 'mr', label: 'Marathi (मराठी)' },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#DCE7E1] px-6 flex items-center justify-between z-30 sticky top-0 shadow-sm">
      {/* Search & District Selector */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl">
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search district, village, hazard, or shelter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl pl-9 pr-4 py-2 text-xs text-[#17221D] placeholder-slate-400 focus:outline-none focus:border-[#087F5B] transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 hidden md:inline">Pilot District:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-3 py-2 text-xs font-bold text-[#087F5B] focus:outline-none focus:border-[#087F5B] cursor-pointer"
          >
            {districts.map(d => (
              <option key={d} value={d}>
                {d} District
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Switch Experience Button */}
        <button
          onClick={onSwitchRole}
          title="Switch Experience / Role"
          className="hidden md:flex items-center space-x-1.5 bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] text-[#17221D] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#087F5B]" />
          <span>Switch Experience</span>
        </button>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center space-x-1.5 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white border border-[#087F5B]/30 text-[#087F5B] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-pulse" />
          <span>Gemini AI</span>
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-1.5 bg-[#F6F9F7] border border-[#DCE7E1] hover:border-slate-300 text-[#17221D] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase">{currentLang}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DCE7E1] rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Language</div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-[#F6F9F7] transition-colors ${currentLang === l.code ? 'text-[#087F5B] font-bold bg-[#E7F6EF]' : 'text-slate-700'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile / Role Indicator */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#DCE7E1]">
          <div className="w-8 h-8 rounded-full bg-[#E7F6EF] border border-[#087F5B]/30 flex items-center justify-center text-[#087F5B] font-bold text-xs">
            {isAuthorityView ? <LayoutDashboard className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#17221D]">
              {isAuthorityView ? 'Authority / Admin' : 'Community / Resident'}
            </div>
            <div className="text-[10px] text-[#087F5B] font-medium">
              {isAuthorityView ? 'State/District Admin' : 'Resident Experience'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
