import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginPortalView } from './components/LoginPortalView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { AIAssistantModal } from './components/AIAssistantModal';

// Community Views
import { CommunityHomeView } from './components/views/CommunityHomeView';
import { CommunityVillageView } from './components/views/CommunityVillageView';
import { CommunityRiskView } from './components/views/CommunityRiskView';
import { CommunityRelocationView } from './components/views/CommunityRelocationView';
import { CommunityMapView } from './components/views/CommunityMapView';
import { CommunityHelpView } from './components/views/CommunityHelpView';
import { SafeSiteWorkspaceView } from './components/views/SafeSiteWorkspaceView';

// Authority Views
import { OverviewView } from './components/views/OverviewView';
import { LiveGisMapView } from './components/views/LiveGisMapView';
import { VulnerableHabitationsView } from './components/views/VulnerableHabitationsView';
import { MultiHazardRiskView } from './components/views/MultiHazardRiskView';
import { RedZoneView } from './components/views/RedZoneView';
import { RelocationPrioritizationView } from './components/views/RelocationPrioritizationView';
import { SafeSiteFinderView } from './components/views/SafeSiteFinderView';
import { SiteSuitabilityView } from './components/views/SiteSuitabilityView';
import { CarryingCapacityView } from './components/views/CarryingCapacityView';
import { RehabilitationSimulatorView } from './components/views/RehabilitationSimulatorView';
import { ScenarioSimulationView } from './components/views/ScenarioSimulationView';
import { AuthorityReportView } from './components/views/AuthorityReportView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { SettingsView } from './components/views/SettingsView';

import { SYSTEM_METRICS, MAHARASHTRA_DISTRICTS, PILOT_DISTRICTS } from './data/mockData';
import { Habitation, RelocationSite } from './types';
import { fetchDistrictData } from './lib/supabase';
import { Language, t } from './lib/i18n';
import { Home, UserCheck, AlertTriangle, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<'community' | 'authority' | 'admin' | null>(null);
  const [activeTab, setActiveTab] = useState<string>('community-home');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Raigad');
  const [currentLang, setCurrentLang] = useState<string>('en');

  const [currentDistrictData, setCurrentDistrictData] = useState(PILOT_DISTRICTS['raigad']);

  const [selectedVillage, setSelectedVillage] = useState<Habitation>(currentDistrictData.targetVillages[0]);
  const [selectedSite, setSelectedSite] = useState<RelocationSite>(currentDistrictData.relocationSites[0]);

  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);

  // When district changes, fetch from Supabase (or fallback) and update villages and sites
  useEffect(() => {
    let isMounted = true;
    async function load() {
      const dData = await fetchDistrictData(selectedDistrict);
      if (isMounted && dData) {
        setCurrentDistrictData(dData);
        if (dData.targetVillages && dData.targetVillages.length > 0) {
          setSelectedVillage(dData.targetVillages[0]);
        }
        if (dData.relocationSites && dData.relocationSites.length > 0) {
          setSelectedSite(dData.relocationSites[0]);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [selectedDistrict]);

  const handleLoginSuccess = (role: 'community' | 'authority' | 'admin', district: string) => {
    setSelectedDistrict(district);
    setUserRole(role);
    if (role === 'community') setActiveTab('community-home');
    else if (role === 'authority') setActiveTab('overview');
    else if (role === 'admin') setActiveTab('overview');
  };

  if (!userRole) {
    return (
      <LoginPortalView
        onLoginSuccess={handleLoginSuccess}
        currentLang={currentLang as Language}
        setLang={setCurrentLang}
        districts={MAHARASHTRA_DISTRICTS}
      />
    );
  }

  const isAuthorityView = userRole === 'authority';
  const isAdminView = userRole === 'admin';

  return (
    <div className="flex min-h-screen bg-[#F6F9F7] text-[#17221D] font-sans">
      {/* Left Sidebar (Only for Community or Authority, or Admin sidebar) */}
      {!isAdminView && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAuthorityView={isAuthorityView}
          currentLang={currentLang as Language}
          onSwitchRole={() => setUserRole(null)}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Navbar
          currentLang={currentLang as Language}
          setLang={setCurrentLang}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          districts={MAHARASHTRA_DISTRICTS}
          onOpenAiAssistant={() => setAiModalOpen(true)}
          isAuthorityView={isAuthorityView || isAdminView}
          onSwitchRole={() => setUserRole(null)}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Admin Dashboard */}
          {isAdminView && (
            <AdminDashboardView
              habitations={currentDistrictData.targetVillages}
              relocationSites={currentDistrictData.relocationSites}
              selectedDistrict={selectedDistrict}
            />
          )}

          {/* Community Experience */}
          {userRole === 'community' && (
            <>
              {activeTab === 'community-home' && (
                <CommunityHomeView
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  selectedVillage={selectedVillage}
                  setSelectedVillage={setSelectedVillage}
                  onNavigate={setActiveTab}
                  currentLang={currentLang}
                  setLang={setCurrentLang}
                  onSwitchToAuthority={() => {
                    setUserRole('authority');
                    setActiveTab('overview');
                  }}
                />
              )}

              {activeTab === 'my-village' && (
                <CommunityVillageView
                  selectedVillage={selectedVillage}
                  onNavigate={setActiveTab}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'community-risk' && (
                <CommunityRiskView
                  selectedVillage={selectedVillage}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'community-relocation' && (
                <CommunityRelocationView
                  selectedVillage={selectedVillage}
                  relocationSites={currentDistrictData.relocationSites}
                  onNavigate={setActiveTab}
                  onSelectSite={(s) => setSelectedSite(s)}
                />
              )}

              {activeTab === 'safe-site-workspace' && (
                <SafeSiteWorkspaceView
                  habitation={selectedVillage}
                  site={selectedSite}
                  onNavigate={setActiveTab}
                  allSites={currentDistrictData.relocationSites}
                />
              )}

              {activeTab === 'community-map' && (
                <CommunityMapView
                  selectedVillage={selectedVillage}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'community-help' && (
                <CommunityHelpView
                  selectedVillage={selectedVillage}
                  onNavigate={setActiveTab}
                  currentLang={currentLang as Language}
                />
              )}
            </>
          )}

          {/* Authority Experience */}
          {isAuthorityView && (
            <>
              {activeTab === 'overview' && (
                <OverviewView
                  metrics={SYSTEM_METRICS}
                  habitations={currentDistrictData.targetVillages}
                  onNavigate={setActiveTab}
                  selectedDistrict={selectedDistrict}
                />
              )}

              {activeTab === 'gis-map' && (
                <LiveGisMapView
                  habitations={currentDistrictData.targetVillages}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  onSelectVillageForMultiHazard={(v) => {
                    setSelectedVillage(v);
                    setActiveTab('multihazard');
                  }}
                />
              )}

              {activeTab === 'habitations' && (
                <VulnerableHabitationsView
                  habitations={currentDistrictData.targetVillages}
                  selectedDistrict={selectedDistrict}
                  onSelectVillage={(v) => {
                    setSelectedVillage(v);
                    setActiveTab('multihazard');
                  }}
                  onNavigateToMap={() => setActiveTab('gis-map')}
                />
              )}

              {activeTab === 'multihazard' && (
                <MultiHazardRiskView
                  selectedVillage={selectedVillage}
                  onNavigateToRedZone={() => setActiveTab('redzones')}
                  onNavigateToPlanner={() => setActiveTab('prioritization')}
                />
              )}

              {activeTab === 'redzones' && (
                <RedZoneView
                  selectedVillage={selectedVillage}
                  onNavigateToPlanner={() => setActiveTab('prioritization')}
                  currentLang={currentLang as Language}
                />
              )}

              {activeTab === 'prioritization' && (
                <RelocationPrioritizationView
                  habitations={currentDistrictData.targetVillages}
                  onSelectForSafeSite={(v) => {
                    setSelectedVillage(v);
                    setActiveTab('safesites');
                  }}
                />
              )}

              {activeTab === 'safesites' && (
                <SafeSiteFinderView
                  habitations={currentDistrictData.targetVillages}
                  relocationSites={currentDistrictData.relocationSites}
                  selectedHabitation={selectedVillage}
                  onSelectSite={(s) => setSelectedSite(s)}
                  onNavigateToSimulator={() => setActiveTab('simulator')}
                />
              )}

              {activeTab === 'suitability' && (
                <SiteSuitabilityView
                  site={selectedSite}
                  allSites={currentDistrictData.relocationSites}
                  selectedVillage={selectedVillage}
                  onNavigateToPlanner={() => setActiveTab('prioritization')}
                  currentLang={currentLang as Language}
                />
              )}

              {activeTab === 'capacity' && (
                <CarryingCapacityView
                  site={selectedSite}
                  habitations={currentDistrictData.targetVillages}
                  onNavigateToSimulator={() => setActiveTab('simulator')}
                />
              )}

              {activeTab === 'simulator' && (
                <RehabilitationSimulatorView
                  habitation={selectedVillage}
                  site={selectedSite}
                />
              )}

              {activeTab === 'scenario' && (
                <ScenarioSimulationView
                  habitation={selectedVillage}
                  onNavigateToReport={() => setActiveTab('reports')}
                />
              )}

              {activeTab === 'reports' && (
                <AuthorityReportView
                  habitation={selectedVillage}
                  site={selectedSite}
                />
              )}

              {activeTab === 'sources' && (
                <DataSourcesView
                  sources={[]}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView />
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation for Community View */}
      {userRole === 'community' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#DCE7E1] flex md:hidden items-center justify-around py-2 shadow-lg">
          {[
            { id: 'community-home', labelKey: 'commHome', icon: Home },
            { id: 'my-village', labelKey: 'commVillage', icon: UserCheck },
            { id: 'community-risk', labelKey: 'commRisk', icon: AlertTriangle },
            { id: 'community-relocation', labelKey: 'commRelocation', icon: ArrowUpRight },
            { id: 'community-help', labelKey: 'commHelp', icon: HelpCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 text-[10px] font-bold transition-colors ${
                  isActive ? 'text-[#087F5B]' : 'text-slate-500 hover:text-[#17221D]'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="truncate max-w-[64px]">{t(item.labelKey, currentLang as Language)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} habitations={currentDistrictData.targetVillages} />
    </div>
  );
}
