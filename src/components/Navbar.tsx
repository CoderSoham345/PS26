import React, { useState } from 'react';
import { Search, Globe, ChevronDown, UserCheck, LayoutDashboard, RefreshCw, Sparkles } from 'lucide-react';
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
    <header className="h-16 bg-[#111827] border-b border-[#1E293B] px-6 flex items-center justify-between z-30 sticky top-0 shadow-lg text-[#F8FAFC]">
      {/* Search & District Selector */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl">
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search district, village, hazard, or shelter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16202B] border border-[#1E293B] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#10B981] transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#94A3B8] hidden md:inline">Pilot District:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[#16202B] border border-[#1E293B] rounded-xl px-3 py-2 text-xs font-bold text-[#10B981] focus:outline-none focus:border-[#10B981] cursor-pointer"
          >
            {districts.map(d => (
              <option key={d} value={d} className="bg-[#111827] text-[#F8FAFC]">
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
          className="hidden md:flex items-center space-x-1.5 bg-[#16202B] hover:bg-[#1E293B] border border-[#1E293B] text-[#F8FAFC] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Switch Experience</span>
        </button>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center space-x-1.5 bg-[#10B981]/20 hover:bg-[#10B981] hover:text-slate-950 border border-[#10B981]/40 text-[#10B981] px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Gemini AI</span>
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-1.5 bg-[#16202B] border border-[#1E293B] hover:border-slate-700 text-[#F8FAFC] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="uppercase">{currentLang}</span>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Select Language</div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-[#16202B] transition-colors ${currentLang === l.code ? 'text-[#10B981] font-bold bg-[#16202B]' : 'text-[#94A3B8]'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile / Role Indicator */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#1E293B]">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] font-bold text-xs">
            {isAuthorityView ? <LayoutDashboard className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#F8FAFC]">
              {isAuthorityView ? 'Authority Mode' : 'Community Mode'}
            </div>
            <div className="text-[10px] text-[#10B981] font-medium">
              {isAuthorityView ? 'State/District Admin' : 'Resident Experience'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
