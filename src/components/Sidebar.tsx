import React, { useEffect } from 'react';
import { 
  LogOut, 
  X, 
  Shield, 
  Menu
} from 'lucide-react';
import { Language } from '../lib/i18n';
import { getResolvedNavigationItems } from '../data/navigationConfig';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthorityView: boolean;
  currentLang: Language;
  onSwitchRole: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isAuthorityView,
  currentLang,
  onSwitchRole,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile
}) => {
  // Prevent body scrolling / horizontal overflow while mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen && onCloseMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  // Single unified navigation items array for all viewports
  const navigationItems = getResolvedNavigationItems(currentLang);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP / TABLET GIS SIDEBAR (Visible for screens > 768px)
          - >= 1024px: Expandable / Collapsible (260px <-> 72px)
          - 769–1023px: Compact / Collapsed by default (72px)
          - Smooth 300ms transition without distorting main content / map
          ======================================================== */}
      <aside 
        style={{ width: isCollapsed ? '72px' : '260px' }}
        className="hidden md:flex transition-[width] duration-300 ease-in-out shrink-0 bg-[#FFFFFF] border-r border-[#DCE7E1] flex-col justify-between select-none z-20 min-h-[calc(100vh-4rem)] overflow-x-hidden"
        aria-label="GIS Main Navigation"
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Top Brand / Collapse Header Row */}
          <div className={`border-b border-[#DCE7E1] bg-[#F6F9F7] flex items-center h-14 sm:h-16 shrink-0 transition-all ${
            isCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
          }`}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="w-8 h-8 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-2xs shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-black text-[#07543F] leading-tight">सुरक्षित धरा</div>
                    <div className="text-[9px] font-black tracking-wider text-[#087F5B] uppercase">SURAKSHIT DHARA</div>
                  </div>
                </div>

                {onToggleCollapse && (
                  <button
                    onClick={onToggleCollapse}
                    aria-label="Collapse navigation"
                    title="Collapse sidebar"
                    className="p-2 rounded-xl text-[#66736D] hover:text-[#07543F] hover:bg-[#E7F6EF] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                  >
                    <Menu className="w-5 h-5 text-[#087F5B]" />
                  </button>
                )}
              </>
            ) : (
              onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  aria-label="Open navigation"
                  title="Expand sidebar"
                  className="p-2 rounded-xl text-[#07543F] hover:bg-[#E7F6EF] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Menu className="w-6 h-6 text-[#087F5B]" />
                </button>
              )
            )}
          </div>

          {/* Section Heading (visible when expanded) */}
          {!isCollapsed && (
            <div className="px-4 pt-3.5 pb-1 text-[10px] font-black text-[#66736D] uppercase tracking-wider truncate">
              GIS Navigation
            </div>
          )}

          {/* Navigation Item List */}
          <div className="py-2 px-2 space-y-1 overflow-y-auto flex-1 overscroll-contain">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              if (isCollapsed) {
                // COLLAPSED ITEM: Centered icon, tooltips, active highlight
                return (
                  <div key={item.id} className="relative group flex justify-center">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      aria-label={item.label}
                      title={item.label}
                      className={`w-12 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all relative cursor-pointer ${
                        isActive
                          ? 'bg-[#E7F6EF] text-[#087F5B] border-l-4 border-[#087F5B] rounded-l-none shadow-2xs font-bold'
                          : 'text-[#66736D] hover:text-[#17221D] hover:bg-[#F6F9F7]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#087F5B]' : 'text-[#66736D] group-hover:text-[#17221D]'
                      }`} />

                      {/* Small badge dot if item has badge */}
                      {item.badge && !isActive && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DC3545]" />
                      )}

                      {/* Hero beacon if hero tab */}
                      {item.isHero && !isActive && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#087F5B] animate-ping" />
                      )}
                    </button>

                    {/* Desktop Tooltip */}
                    <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#17221D] text-white text-xs font-semibold rounded-lg whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      <div className="flex items-center space-x-1.5">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#DC3545] text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {/* Arrow */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#17221D]" />
                    </div>
                  </div>
                );
              }

              // EXPANDED ITEM: Full label, icon, badge, active indicator
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer min-h-[44px] ${
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
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20 shrink-0">
                      {item.badge}
                    </span>
                  )}

                  {item.isHero && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-ping shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Switch / Status Card */}
        <div className={`p-2.5 border-t border-[#DCE7E1] ${isCollapsed ? 'flex justify-center' : ''}`}>
          {!isCollapsed ? (
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
                className="mt-2 w-full flex items-center justify-center space-x-1.5 py-2 bg-white hover:bg-[#E7F6EF] text-[#07543F] text-[11px] font-bold rounded-lg border border-[#DCE7E1] hover:border-[#B8E5D2] transition-colors shadow-2xs cursor-pointer min-h-[44px]"
              >
                <LogOut className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Switch Portal</span>
              </button>
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={onSwitchRole}
                aria-label="Switch Portal"
                title="Switch Portal"
                className="w-12 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#F6F9F7] hover:bg-[#E7F6EF] text-[#07543F] border border-[#DCE7E1] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#087F5B]" />
              </button>
              <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#17221D] text-white text-xs font-semibold rounded-lg whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Switch Portal
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================
          2. MOBILE TRUE OVERLAY NAVIGATION DRAWER (Screens <= 768px)
          - Does NOT push content horizontally
          - Backdrop z-index: 90
          - Drawer z-index: 100
          - Close button z-index: 110
          - Width: min(320px, 85vw)
          - Vertically scrollable on small screens
          - Same navigation items, active state, and routes
          ======================================================== */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-[90] md:hidden flex pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Semi-transparent Backdrop (z-index 90): Clicking closes drawer */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container (z-index 100): Overlays content without pushing */}
          <div 
            className="relative z-[100] bg-white h-full max-h-screen shadow-2xl flex flex-col justify-between border-r border-[#DCE7E1] animate-slideInLeft overflow-hidden"
            style={{ width: 'min(320px, 85vw)', maxWidth: '85vw' }}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#DCE7E1] flex items-center justify-between bg-[#F6F9F7] shrink-0">
              <div className="flex items-center space-x-2.5 truncate">
                <div className="w-8 h-8 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-sm font-black text-[#07543F] leading-tight">सुरक्षित धरा</div>
                  <div className="text-[10px] font-black tracking-wider text-[#087F5B] uppercase">SURAKSHIT DHARA</div>
                </div>
              </div>

              {/* Close Button (z-index 110): Minimum 44px touch target */}
              <button
                onClick={onCloseMobile}
                aria-label="Close navigation"
                className="relative z-[110] p-2.5 rounded-xl text-[#66736D] hover:text-[#17221D] hover:bg-[#E7F6EF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer -mr-1 shrink-0"
              >
                <X className="w-5 h-5 text-[#07543F]" />
              </button>
            </div>

            {/* Navigation List: Vertically scrollable, 44px min touch target */}
            <div className="flex-1 overflow-y-auto overscroll-contain py-3 px-2 space-y-1">
              <div className="px-3 pb-1 text-[10px] font-black text-[#66736D] uppercase tracking-wider">
                Select GIS Module
              </div>

              {navigationItems.map((item) => {
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
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20 shrink-0">
                        {item.badge}
                      </span>
                    )}

                    {item.isHero && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-ping shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Drawer Bottom Controls */}
            <div className="p-3 border-t border-[#DCE7E1] bg-[#F6F9F7] shrink-0">
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
