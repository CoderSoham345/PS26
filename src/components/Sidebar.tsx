import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Activity, 
  FileText, 
  Database, 
  HelpCircle,
  Home,
  LogOut,
  X,
  Shield
} from 'lucide-react';
import { Language, t } from '../lib/i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthorityView: boolean;
  currentLang: Language;
  onSwitchRole: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isAuthorityView,
  currentLang,
  onSwitchRole,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const authorityNavItems = [
    { id: 'overview', label: t('authOverview', currentLang), icon: LayoutDashboard },
    { id: 'gis-map', label: t('authGisMap', currentLang), icon: Map },
    { id: 'habitations', label: t('authHabitations', currentLang), icon: Users, badge: '20' },
    { id: 'multi-hazard', label: t('authMultiHazard', currentLang), icon: AlertTriangle },
    { id: 'red-zones', label: t('authRedZones', currentLang), icon: ShieldAlert },
    { id: 'relocation-prioritization', label: t('authPlanner', currentLang), icon: Compass },
    { id: 'safe-sites', label: t('authSafeSites', currentLang), icon: ShieldCheck },
    { id: 'carrying-capacity', label: t('authCapacity', currentLang), icon: Layers },
    { 
      id: 'simulator', 
      label: t('authSimulator', currentLang), 
      icon: Activity, 
      isHero: true 
    },
    { id: 'reports', label: t('authReports', currentLang), icon: FileText },
    { id: 'data-sources', label: t('authSources', currentLang), icon: Database },
    { id: 'help', label: t('authHelp', currentLang), icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* 1. DESKTOP PERMANENT SIDEBAR (Hidden on mobile <768px, visible on md:flex) */}
      <aside className="hidden md:flex w-[230px] bg-[#FFFFFF] border-r border-[#DCE7E1] flex-col justify-between shrink-0 select-none z-20 min-h-[calc(100vh-4rem)]">
        {/* Navigation List */}
        <div className="py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-black text-[#66736D] uppercase tracking-wider">
            GIS Navigation
          </div>

          {authorityNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#E7F6EF] text-[#07543F] font-bold border-l-4 border-[#087F5B] rounded-l-none pl-2.5 shadow-2xs'
                    : 'text-[#66736D] hover:text-[#17221D] hover:bg-[#F6F9F7] border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-[#087F5B]' : 'text-[#66736D] group-hover:text-[#17221D]'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20">
                    {item.badge}
                  </span>
                )}

                {item.isHero && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Switch / Status Card */}
        <div className="p-3 border-t border-[#DCE7E1]">
          <div className="bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl p-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-[#66736D] font-bold">GIS Mode:</span>
              <span className="text-[#087F5B] font-mono font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="text-[10px] text-[#66736D] leading-tight truncate">
              SDMA Command Hub
            </div>
            <button
              onClick={onSwitchRole}
              className="mt-2 w-full flex items-center justify-center space-x-1.5 py-1.5 bg-white hover:bg-[#E7F6EF] text-[#07543F] text-[11px] font-bold rounded-lg border border-[#DCE7E1] hover:border-[#B8E5D2] transition-colors shadow-2xs cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-[#087F5B]" />
              <span>Switch Portal</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE SLIDE-IN NAVIGATION DRAWER & BACKDROP */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Semi-transparent Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div className="relative z-50 w-[82vw] max-w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between border-r border-[#DCE7E1] animate-fadeIn">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#DCE7E1] flex items-center justify-between bg-[#F6F9F7]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#07543F] leading-tight">सुरक्षित धरा</div>
                  <div className="text-[10px] font-black tracking-wider text-[#087F5B] uppercase">SURAKSHIT DHARA</div>
                </div>
              </div>

              <button
                onClick={onCloseMobile}
                aria-label="Close Navigation Drawer"
                className="p-2 rounded-xl text-[#66736D] hover:text-[#17221D] hover:bg-[#E7F6EF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5 text-[#07543F]" />
              </button>
            </div>

            {/* Navigation List Items (Thumb-friendly touch targets min 44px) */}
            <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
              <div className="px-3 pb-1 text-[10px] font-black text-[#66736D] uppercase tracking-wider">
                Select GIS Module
              </div>

              {authorityNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group min-h-[44px] cursor-pointer ${
                      isActive
                        ? 'bg-[#E7F6EF] text-[#07543F] font-black border-l-4 border-[#087F5B] rounded-l-none pl-3 shadow-2xs'
                        : 'text-[#66736D] hover:text-[#17221D] hover:bg-[#F6F9F7] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#087F5B]' : 'text-[#66736D]'
                      }`} />
                      <span className="truncate text-xs">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20">
                        {item.badge}
                      </span>
                    )}

                    {item.isHero && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Drawer Bottom Controls */}
            <div className="p-3 border-t border-[#DCE7E1] bg-[#F6F9F7]">
              <div className="text-[10px] text-[#66736D] font-bold mb-1 flex items-center justify-between">
                <span>SDMA Command Hub</span>
                <span className="text-[#087F5B] font-mono font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-pulse" />
                  <span>LIVE</span>
                </span>
              </div>
              <button
                onClick={() => {
                  onSwitchRole();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-white hover:bg-[#E7F6EF] text-[#07543F] text-xs font-bold rounded-xl border border-[#DCE7E1] transition-colors shadow-2xs min-h-[44px] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Switch Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

