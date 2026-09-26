import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  Activity, 
  HelpCircle 
} from 'lucide-react';
import { Language, t } from '../lib/i18n';

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
  const navItems = [
    {
      id: 'overview',
      label: currentLang === 'mr' ? 'गृह' : currentLang === 'hi' ? 'होम' : 'Home',
      icon: LayoutDashboard
    },
    {
      id: 'gis-map',
      label: currentLang === 'mr' ? 'नकाशा' : currentLang === 'hi' ? 'मानचित्र' : 'Map',
      icon: Map
    },
    {
      id: 'habitations',
      label: currentLang === 'mr' ? 'धोका' : currentLang === 'hi' ? 'जोखिम' : 'Risk',
      icon: AlertTriangle
    },
    {
      id: 'simulator',
      label: currentLang === 'mr' ? 'पुनर्वसन' : currentLang === 'hi' ? 'पुनर्वास' : 'Relocation',
      icon: Activity
    },
    {
      id: 'help',
      label: currentLang === 'mr' ? 'मदत' : currentLang === 'hi' ? 'सहायता' : 'Help',
      icon: HelpCircle
    }
  ];

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
