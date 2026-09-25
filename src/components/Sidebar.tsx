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
    <aside className="w-72 bg-white border-r border-[#DCE7E1] flex flex-col h-screen sticky top-0 z-40 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#DCE7E1] flex items-center space-x-3 bg-[#F6F9F7]">
        <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center shadow-md">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-wider text-[#17221D] flex items-center space-x-1.5">
            <span>DISASTER</span>
            <span className="text-[#087F5B]">GUARD</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-wide">
            {isAuthorityView ? 'Authority / Admin Experience' : 'Community / Resident Experience'}
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#E7F6EF] text-[#087F5B] border border-[#087F5B]/30 shadow-sm'
                  : 'text-slate-600 hover:bg-[#F6F9F7] hover:text-[#17221D] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-[#087F5B] text-white' : 'bg-[#F6F9F7] text-slate-500 group-hover:text-[#17221D]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] bg-[#087F5B] text-white px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  {item.count}
                </span>
              )}
              {item.urgent && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Switch Experience Footer Button */}
      <div className="p-4 border-t border-[#DCE7E1] bg-[#F6F9F7]">
        <button
          onClick={onSwitchRole}
          className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#DCE7E1] text-[#17221D] rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#087F5B]" />
          <span>Switch Experience / Role</span>
        </button>
      </div>
    </aside>
  );
};
