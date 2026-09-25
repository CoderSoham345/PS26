import React from 'react';
import {
  Home,
  UserCheck,
  AlertTriangle,
  ArrowUpRight,
  Map,
  HelpCircle,
  LayoutDashboard,
  Users,
  Activity,
  ShieldCheck,
  Building,
  RefreshCw,
  FileText,
  Database,
  Settings,
  Shield
} from 'lucide-react';
import { Language, t } from '../lib/i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthorityView: boolean;
  currentLang: Language;
  onSwitchRole: () => void;
}

interface SidebarItem {
  id: string;
  labelKey: string;
  icon: any;
  badge?: string;
  count?: number;
  urgent?: boolean;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isAuthorityView,
  currentLang,
  onSwitchRole
}) => {
  const communityItems: SidebarItem[] = [
    { id: 'community-home', labelKey: 'commHome', icon: Home },
    { id: 'my-village', labelKey: 'commVillage', icon: UserCheck },
    { id: 'community-risk', labelKey: 'commRisk', icon: AlertTriangle },
    { id: 'community-relocation', labelKey: 'commRelocation', icon: ArrowUpRight },
    { id: 'community-map', labelKey: 'commMap', icon: Map },
    { id: 'community-help', labelKey: 'commHelp', icon: HelpCircle },
  ];

  const authorityItems: SidebarItem[] = [
    { id: 'overview', labelKey: 'authOverview', icon: LayoutDashboard },
    { id: 'gis-map', labelKey: 'authGisMap', icon: Map, badge: 'Live' },
    { id: 'habitations', labelKey: 'authHabitations', icon: Users, count: 20 },
    { id: 'multihazard', labelKey: 'authMultiHazard', icon: Activity },
    { id: 'redzones', labelKey: 'authRedZones', icon: AlertTriangle, urgent: true },
    { id: 'prioritization', labelKey: 'authPlanner', icon: ArrowUpRight },
    { id: 'safesites', labelKey: 'authSafeSites', icon: ShieldCheck },
    { id: 'capacity', labelKey: 'authCapacity', icon: Building },
    { id: 'simulator', labelKey: 'authSimulator', icon: RefreshCw, highlight: true },
    { id: 'reports', labelKey: 'authReports', icon: FileText },
    { id: 'sources', labelKey: 'authSources', icon: Database },
    { id: 'settings', labelKey: 'authSettings', icon: Settings },
  ];

  const currentItems = isAuthorityView ? authorityItems : communityItems;

  return (
    <aside className="w-64 bg-[#111827] border-r border-[#1E293B] flex flex-col h-screen sticky top-0 z-40 select-none shadow-xl text-[#F8FAFC]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1E293B] flex items-center space-x-3 bg-[#0B0F17]">
        <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center shadow-lg">
          <Shield className="w-5 h-5 text-slate-950 font-black" />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-wider text-[#F8FAFC] flex items-center space-x-1.5">
            <span>DISASTER</span>
            <span className="text-[#10B981]">GUARD</span>
          </h1>
          <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wide">
            {isAuthorityView ? 'Authority / Admin' : 'Community Mode'}
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-[#1E293B]">
        <div className="px-3 pb-2 text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
          {isAuthorityView ? 'Advanced GIS Modules' : t('communityView', currentLang)}
        </div>

        {currentItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const label = t(item.labelKey, currentLang);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#10B981] text-slate-950 shadow-md font-bold'
                  : 'text-[#94A3B8] hover:bg-[#16202B] hover:text-[#F8FAFC] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-950 text-[#10B981]' : 'bg-[#16202B] text-[#94A3B8] group-hover:text-[#F8FAFC]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{label}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-slate-950 text-[#10B981]' : 'bg-[#10B981] text-slate-950'}`}>
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-slate-950 text-[#10B981]' : 'bg-[#16202B] text-[#94A3B8]'}`}>
                  {item.count}
                </span>
              )}
              {item.urgent && (
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Switch Experience Footer Button */}
      <div className="p-4 border-t border-[#1E293B] bg-[#0B0F17]">
        <button
          onClick={onSwitchRole}
          className="w-full py-2.5 px-3 bg-[#16202B] hover:bg-[#1E293B] text-[#F8FAFC] rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 border border-[#1E293B] shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Switch Experience / Role</span>
        </button>
      </div>
    </aside>
  );
};
