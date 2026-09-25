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
  LogOut
} from 'lucide-react';
import { Language, t } from '../lib/i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthorityView: boolean;
  currentLang: Language;
  onSwitchRole: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isAuthorityView,
  currentLang,
  onSwitchRole
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

  return (
    <aside className="w-[230px] bg-[#0F1720] border-r border-[#1E293B] flex flex-col justify-between shrink-0 select-none z-20 min-h-[calc(100vh-4rem)]">
      {/* Navigation List */}
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-black text-[#64748B] uppercase tracking-wider">
          GIS Navigation
        </div>

        {authorityNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#10B981]/25 to-[#047857]/15 text-[#34D399] border border-[#10B981]/40 shadow-sm shadow-emerald-950/40'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#16202B] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-[#10B981]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
                  {item.badge}
                </span>
              )}

              {item.isHero && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Switch / Status Card */}
      <div className="p-3 border-t border-[#1E293B]">
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-[#64748B] font-bold">GIS Mode:</span>
            <span className="text-[#34D399] font-mono font-bold">ONLINE</span>
          </div>
          <div className="text-[10px] text-[#94A3B8] leading-tight truncate">
            SDMA Command Hub
          </div>
          <button
            onClick={onSwitchRole}
            className="mt-2 w-full flex items-center justify-center space-x-1.5 py-1.5 bg-[#16202B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] text-[11px] font-bold rounded-lg border border-[#1E293B] transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Switch Portal</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
