import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { Sidebar } from './components/Sidebar';
import { LoginPortalView } from './components/LoginPortalView';
import { DisasterGuardChatbot } from './components/chat/DisasterGuardChatbot';

// Authority Views
import { RehabilitationSimulatorView } from './components/views/RehabilitationSimulatorView';
import { OverviewView } from './components/views/OverviewView';
import { LiveGisMapView } from './components/views/LiveGisMapView';
import { VulnerableHabitationsView } from './components/views/VulnerableHabitationsView';
import { MultiHazardRiskView } from './components/views/MultiHazardRiskView';
import { RedZoneView } from './components/views/RedZoneView';
import { RelocationPrioritizationView } from './components/views/RelocationPrioritizationView';
import { SafeSiteFinderView } from './components/views/SafeSiteFinderView';
import { CarryingCapacityView } from './components/views/CarryingCapacityView';
import { AuthorityReportView } from './components/views/AuthorityReportView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { CommunityHelpView } from './components/views/CommunityHelpView';
import { SettingsView } from './components/views/SettingsView';

import { MAHARASHTRA_DISTRICTS, PILOT_DISTRICTS, MOCK_DATA_SOURCES } from './data/mockData';
import { Habitation, RelocationSite } from './types';
import { fetchDistrictData } from './lib/supabase';
import { Language, t } from './lib/i18n';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<'authority' | 'admin' | 'community' | null>('authority');
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Raigad');
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('disasterguard_language') as Language) || 'en';
  });

  // Language persistence without resetting application state
  useEffect(() => {
    localStorage.setItem('disasterguard_language', currentLang);
  }, [currentLang]);

  // District Pilot Dataset State
  const [currentDistrictData, setCurrentDistrictData] = useState(() => PILOT_DISTRICTS['raigad']);

  // Dynamic Selected Village and Candidate Safe Site
  const [selectedVillage, setSelectedVillage] = useState<Habitation>(
    PILOT_DISTRICTS['raigad'].targetVillages[0]
  );
  const [selectedSite, setSelectedSite] = useState<RelocationSite>(
    PILOT_DISTRICTS['raigad'].relocationSites[0]
  );

  // Centralized Simulation Stage State: BEFORE / RELOCATION / AFTER
  const [simulationStage, setSimulationStage] = useState<'before' | 'relocation' | 'after'>('before');

  // Centralized Map Layer Visibility State
  const [layersVisibility, setLayersVisibility] = useState({
    modelledRedZone: true,
    hazardZones: true,
    landslideRisk: true,
    floodRisk: true,
    currentVillage: true,
    candidateSite: true,
    relocationRoute: true,
    planningBoundary: true,
    proposedRehabilitation: true,
    majorRoads: true,
    roadNetwork: true,
    hospitalPhc: true,
    school: true,
    waterSource: true,
    contours: true,
    riverWater: true,
    villageBoundary: true,
    satelliteImagery: true
  });

  // Chatbot Drawer State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // When selected district changes: fetch from Supabase (or fallback), reset village & site
  const handleDistrictChange = async (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    const normalized = newDistrict.toLowerCase();
    const dData = (await fetchDistrictData(newDistrict)) || PILOT_DISTRICTS[normalized] || PILOT_DISTRICTS['raigad'];

    setCurrentDistrictData(dData);
    if (dData.targetVillages && dData.targetVillages.length > 0) {
      setSelectedVillage(dData.targetVillages[0]);
    }
    if (dData.relocationSites && dData.relocationSites.length > 0) {
      setSelectedSite(dData.relocationSites[0]);
    }
  };

  const handleVillageChange = (village: Habitation) => {
    setSelectedVillage(village);
  };

  const handleSiteChange = (site: RelocationSite) => {
    setSelectedSite(site);
  };

  const handleLoginSuccess = (role: 'community' | 'authority' | 'admin', district: string) => {
    setUserRole(role);
    handleDistrictChange(district);
    setActiveTab('simulator');
  };

  // If user is at login portal
  if (!userRole) {
    return (
      <LoginPortalView
        onLoginSuccess={handleLoginSuccess}
        currentLang={currentLang}
        setLang={(l) => setCurrentLang(l as Language)}
        districts={MAHARASHTRA_DISTRICTS}
      />
    );
  }

  const isAuthorityView = userRole === 'authority' || userRole === 'admin';

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F9F7] text-[#17221D] font-sans antialiased selection:bg-[#087F5B] selection:text-white">
      {/* 1. TOP GLOBAL HEADER */}
      <TopHeader
        currentLang={currentLang}
        setLang={(l) => setCurrentLang(l as Language)}
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        districts={MAHARASHTRA_DISTRICTS}
        villages={currentDistrictData.targetVillages}
        selectedVillage={selectedVillage}
        onVillageChange={handleVillageChange}
        candidateSites={currentDistrictData.relocationSites}
        selectedSite={selectedSite}
        onSiteChange={handleSiteChange}
        userRole={userRole}
        onSwitchRole={() => setUserRole(null)}
        onOpenAiChat={() => setIsChatOpen(true)}
      />

      {/* 2. BODY COMPOSITION: LEFT SIDEBAR + MAIN WORKSPACE */}
      <div className="flex-1 flex min-w-0">
        {/* Left Sidebar (220-240px compact dark vertical navigation) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAuthorityView={isAuthorityView}
          currentLang={currentLang}
          onSwitchRole={() => setUserRole(null)}
        />

        {/* Main GIS Command Workspace */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-w-0 max-w-full">
          {/* Default Hero: Rehabilitation Simulator */}
          {activeTab === 'simulator' && (
            <RehabilitationSimulatorView
              habitation={selectedVillage}
              site={selectedSite}
              allSites={currentDistrictData.relocationSites}
              currentLang={currentLang}
              onSelectSite={handleSiteChange}
              stage={simulationStage}
              setStage={setSimulationStage}
              layersVisibility={layersVisibility}
              setLayersVisibility={setLayersVisibility}
            />
          )}

          {/* Other Authority Tabs (Accessible from sidebar) */}
          {activeTab === 'overview' && (
            <OverviewView
              metrics={currentDistrictData.metrics}
              habitations={currentDistrictData.targetVillages}
              onNavigate={setActiveTab}
              selectedDistrict={selectedDistrict}
            />
          )}

          {activeTab === 'gis-map' && (
            <LiveGisMapView
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={handleDistrictChange}
              habitations={currentDistrictData.targetVillages}
              onSelectVillageForMultiHazard={(v) => {
                setSelectedVillage(v);
                setActiveTab('simulator');
              }}
            />
          )}

          {activeTab === 'habitations' && (
            <VulnerableHabitationsView
              habitations={currentDistrictData.targetVillages}
              selectedDistrict={selectedDistrict}
              onSelectVillage={(v: Habitation) => {
                setSelectedVillage(v);
                setActiveTab('simulator');
              }}
              onNavigateToMap={() => setActiveTab('simulator')}
            />
          )}

          {activeTab === 'multi-hazard' && (
            <MultiHazardRiskView
              selectedVillage={selectedVillage}
              onNavigateToRedZone={() => setActiveTab('red-zones')}
              onNavigateToPlanner={() => setActiveTab('relocation-prioritization')}
            />
          )}

          {activeTab === 'red-zones' && (
            <RedZoneView
              selectedVillage={selectedVillage}
              onNavigateToPlanner={() => setActiveTab('relocation-prioritization')}
              currentLang={currentLang}
            />
          )}

          {activeTab === 'relocation-prioritization' && (
            <RelocationPrioritizationView
              habitations={currentDistrictData.targetVillages}
              onSelectForSafeSite={(v: Habitation) => {
                setSelectedVillage(v);
                setActiveTab('simulator');
              }}
            />
          )}

          {activeTab === 'safe-sites' && (
            <SafeSiteFinderView
              habitations={currentDistrictData.targetVillages}
              relocationSites={currentDistrictData.relocationSites}
              selectedHabitation={selectedVillage}
              onSelectSite={(s) => {
                setSelectedSite(s);
                setActiveTab('simulator');
              }}
              onNavigateToSimulator={() => setActiveTab('simulator')}
              currentLang={currentLang}
            />
          )}

          {activeTab === 'carrying-capacity' && (
            <CarryingCapacityView
              site={selectedSite}
              habitations={currentDistrictData.targetVillages}
              onNavigateToSimulator={() => setActiveTab('simulator')}
            />
          )}

          {activeTab === 'reports' && (
            <AuthorityReportView
              habitation={selectedVillage}
              site={selectedSite}
            />
          )}

          {activeTab === 'data-sources' && (
            <DataSourcesView sources={MOCK_DATA_SOURCES} />
          )}

          {activeTab === 'help' && (
            <CommunityHelpView
              selectedVillage={selectedVillage}
              selectedDistrict={selectedDistrict}
              onDistrictChange={handleDistrictChange}
              onNavigate={setActiveTab}
              currentLang={currentLang}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Floating Bottom-Right Chatbot Trigger Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        aria-label="Open सुरक्षित धरा AI"
        className="fixed bottom-6 right-6 z-40 bg-white hover:bg-[#F6F9F7] border-2 border-[#087F5B] text-[#17221D] px-4 py-2.5 rounded-full shadow-[0_6px_22px_rgba(7,84,63,0.18)] flex items-center space-x-2.5 transition-all hover:scale-105 group cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-[#087F5B] flex items-center justify-center text-white shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-black tracking-wide block leading-none text-[#07543F]">
            सुरक्षित धरा AI
          </span>
          <span className="text-[9px] text-[#087F5B] font-bold block">SURAKSHIT DHARA AI</span>
        </div>
      </button>

      {/* DisasterGuard Grounded AI Chatbot Drawer */}
      <DisasterGuardChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        habitation={selectedVillage}
        site={selectedSite}
        allSites={currentDistrictData.relocationSites}
        stage={simulationStage}
        setStage={setSimulationStage}
        setLayersVisibility={setLayersVisibility}
        currentLang={currentLang}
      />
    </div>
  );
}
