import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Language, t } from '../lib/i18n';
import { NAVIGATION_ITEMS_CONFIG } from '../data/navigationConfig';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentLang
}) => {
  const bottomNavIds = ['overview', 'gis-map', 'habitations', 'simulator', 'help'];
  
  const navItems = bottomNavIds.map(id => {
    const config = NAVIGATION_ITEMS_CONFIG.find(item => item.id === id);
    if (!config) return null;
    return {
      id,
      label: t(config.translationKey, currentLang) || config.fallbackLabel,
      icon: config.icon
    };
  }).filter((item): item is { id: string; label: string; icon: LucideIcon } => item !== null);

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-md border-t border-[#DCE7E1] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around px-1 pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all min-h-[48px] cursor-pointer ${
              isActive
                ? 'text-[#087F5B] font-black'
                : 'text-[#66736D] hover:text-[#17221D]'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${
              isActive ? 'bg-[#E7F6EF] scale-110' : ''
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5 leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
