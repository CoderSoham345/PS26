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
  LucideIcon 
} from 'lucide-react';
import { Language, t } from '../lib/i18n';

export interface NavigationConfigItem {
  id: string;
  translationKey: string;
  fallbackLabel: string;
  icon: LucideIcon;
  badge?: string;
  isHero?: boolean;
}

/**
 * Single Unified Navigation Configuration for Surakshit Dhara
 * Used across:
 * - Desktop expanded sidebar (>= 1024px)
 * - Desktop / Tablet collapsed sidebar (769px - 1023px)
 * - Mobile overlay drawer (<= 768px)
 */
export const NAVIGATION_ITEMS_CONFIG: NavigationConfigItem[] = [
  {
    id: 'overview',
    translationKey: 'authOverview',
    fallbackLabel: 'Overview',
    icon: LayoutDashboard
  },
  {
    id: 'gis-map',
    translationKey: 'authGisMap',
    fallbackLabel: 'Live GIS Map',
    icon: Map
  },
  {
    id: 'habitations',
    translationKey: 'authHabitations',
    fallbackLabel: 'Vulnerable Habitations',
    icon: Users,
    badge: '20'
  },
  {
    id: 'multi-hazard',
    translationKey: 'authMultiHazard',
    fallbackLabel: 'Multi-Hazard Risk',
    icon: AlertTriangle
  },
  {
    id: 'red-zones',
    translationKey: 'authRedZones',
    fallbackLabel: 'Red Zone Analysis',
    icon: ShieldAlert
  },
  {
    id: 'relocation-prioritization',
    translationKey: 'authPlanner',
    fallbackLabel: 'Relocation Planner',
    icon: Compass
  },
  {
    id: 'safe-sites',
    translationKey: 'authSafeSites',
    fallbackLabel: 'Safe Site Finder',
    icon: ShieldCheck
  },
  {
    id: 'carrying-capacity',
    translationKey: 'authCapacity',
    fallbackLabel: 'Carrying Capacity',
    icon: Layers
  },
  {
    id: 'simulator',
    translationKey: 'authSimulator',
    fallbackLabel: 'Rehabilitation Simulator',
    icon: Activity,
    isHero: true
  },
  {
    id: 'reports',
    translationKey: 'authReports',
    fallbackLabel: 'Reports',
    icon: FileText
  },
  {
    id: 'data-sources',
    translationKey: 'authSources',
    fallbackLabel: 'Data & Sources',
    icon: Database
  },
  {
    id: 'help',
    translationKey: 'authHelp',
    fallbackLabel: 'Help & Helpline',
    icon: HelpCircle
  }
];

export interface ResolvedNavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  isHero?: boolean;
}

/**
 * Returns localized navigation items matching the current application language.
 */
export function getResolvedNavigationItems(lang: Language): ResolvedNavigationItem[] {
  return NAVIGATION_ITEMS_CONFIG.map(item => ({
    id: item.id,
    label: t(item.translationKey, lang) || item.fallbackLabel,
    icon: item.icon,
    badge: item.badge,
    isHero: item.isHero
  }));
}
