import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  Building2, 
  ShieldCheck, 
  LifeBuoy, 
  MapPin, 
  ExternalLink, 
  Shield, 
  Users, 
  Phone, 
  CloudRain, 
  Droplets, 
  Waves, 
  Activity, 
  Landmark, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Habitation } from '../../types';
import { Language, t } from '../../lib/i18n';
import { 
  OFFICIAL_GOVERNMENT_RESOURCES, 
  VERIFIED_DISTRICT_CONTACTS, 
  SDMA_DIRECTORY_URLS,
  OfficialResource
} from '../../data/governmentResources';

interface CommunityHelpViewProps {
  selectedVillage?: Habitation;
  selectedDistrict?: string;
  onDistrictChange?: (district: string) => void;
  onNavigate?: (tab: string) => void;
  currentLang: Language;
}

export const CommunityHelpView: React.FC<CommunityHelpViewProps> = ({
  selectedVillage,
  selectedDistrict = 'Raigad',
  onDistrictChange,
  onNavigate,
  currentLang
}) => {
  const [activeDistrictKey, setActiveDistrictKey] = useState<string>(() => {
    return selectedDistrict ? selectedDistrict.toLowerCase() : 'raigad';
  });

  // Sync state if selectedDistrict prop updates
  React.useEffect(() => {
    if (selectedDistrict) {
      setActiveDistrictKey(selectedDistrict.toLowerCase());
    }
  }, [selectedDistrict]);

  const handleDistrictSelect = (districtKey: string) => {
    setActiveDistrictKey(districtKey);
    if (onDistrictChange) {
      // Capitalize for app state
      const cap = districtKey.charAt(0).toUpperCase() + districtKey.slice(1);
      onDistrictChange(cap);
    }
  };

  const currentDistrictContact = VERIFIED_DISTRICT_CONTACTS[activeDistrictKey] || VERIFIED_DISTRICT_CONTACTS['raigad'];
  const districtDirectoryUrl = SDMA_DIRECTORY_URLS[currentLang] || SDMA_DIRECTORY_URLS['en'];

  // Categorize official resources
  const emergencyHelplines = OFFICIAL_GOVERNMENT_RESOURCES.filter(r => r.category === 'emergency');
  const maharashtraResources = OFFICIAL_GOVERNMENT_RESOURCES.filter(r => r.category === 'maharashtra');
  const nationalResources = OFFICIAL_GOVERNMENT_RESOURCES.filter(r => r.category === 'national');
  const warningResources = OFFICIAL_GOVERNMENT_RESOURCES.filter(r => r.category === 'warning');
  const citizenResources = OFFICIAL_GOVERNMENT_RESOURCES.filter(r => r.category === 'citizen');

  // Render resource localized text helper
  const getResourceName = (res: OfficialResource) => {
    if (currentLang === 'mr' && res.nameMr) return res.nameMr;
    if (currentLang === 'hi' && res.nameHi) return res.nameHi;
    return res.name;
  };

  const getResourceDesc = (res: OfficialResource) => {
    if (currentLang === 'mr' && res.descriptionMr) return res.descriptionMr;
    if (currentLang === 'hi' && res.descriptionHi) return res.descriptionHi;
    return res.description;
  };

  const getResourceBtnText = (res: OfficialResource) => {
    if (currentLang === 'mr' && res.buttonTextMr) return res.buttonTextMr;
    if (currentLang === 'hi' && res.buttonTextHi) return res.buttonTextHi;
    return res.buttonText;
  };

  const getResourceBadge = (res: OfficialResource) => {
    if (currentLang === 'mr' && res.badgeMr) return res.badgeMr;
    if (currentLang === 'hi' && res.badgeHi) return res.badgeHi;
    return res.badge;
  };

  // Icon selector
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'PhoneCall': return <PhoneCall className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'LifeBuoy': return <LifeBuoy className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Phone': return <Phone className={className} />;
      case 'CloudRain': return <CloudRain className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9F7] text-[#17221D] font-sans -m-4 lg:-m-6 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="space-y-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('simulator')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#087F5B] hover:text-[#07543F] bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] px-3 py-1.5 rounded-xl shadow-xs transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Command Center</span>
            </button>
          )}

          <div className="bg-gradient-to-r from-[#087F5B] via-[#07543F] to-[#043d2e] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>OFFICIAL PUBLIC SERVICE DIRECTORY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                {t('helpHeaderTitle', currentLang)}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                {t('helpHeaderSubtitle', currentLang)}
                {selectedVillage && (
                  <span className="block mt-1 text-emerald-200 font-medium">
                    Current Village Context: <strong className="text-white">{selectedVillage.name}</strong> ({selectedVillage.district})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            1. EMERGENCY NOW (4 CARDS)
        ======================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#DCE7E1] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#17221D] flex items-center space-x-2">
                <span className="text-2xl">🚨</span>
                <span>{t('emergencyNowTitle', currentLang)}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
                {t('emergencyNowSubtitle', currentLang)}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#DC3545] bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
              24×7 Rapid Response
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyHelplines.map((item) => {
              const isSeoc = item.id === 'emergency-seoc';
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] hover:bg-[#F1FAF6] rounded-2xl p-5 shadow-[0_4px_18px_rgba(7,84,63,0.06)] transition-all duration-200 flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs ${
                        isSeoc ? 'bg-[#E7F6EF] text-[#087F5B]' : 'bg-red-50 text-[#DC3545]'
                      }`}>
                        {renderIcon(item.iconName, 'w-5 h-5')}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isSeoc 
                          ? 'bg-[#E7F6EF] text-[#087F5B] border-[#B8E5D2]' 
                          : 'bg-red-50 text-[#DC3545] border-red-200'
                      }`}>
                        {getResourceBadge(item)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-[#66736D]">
                        {getResourceName(item)}
                      </h3>
                      <div className={`text-2xl sm:text-3xl font-mono font-black mt-1 tracking-tight ${
                        isSeoc ? 'text-[#087F5B] text-lg sm:text-xl' : 'text-[#DC3545]'
                      }`}>
                        {item.phone}
                      </div>
                      <p className="text-xs text-[#66736D] mt-1.5 leading-snug">
                        {getResourceDesc(item)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={item.telUri}
                    className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-all min-h-[44px] ${
                      isSeoc
                        ? 'bg-[#087F5B] hover:bg-[#07543F] text-white shadow-emerald-900/10'
                        : 'bg-[#DC3545] hover:bg-[#b02a37] text-white shadow-red-900/10'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>📞 {getResourceBtnText(item)}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            2. MAHARASHTRA GOVERNMENT — OFFICIAL DISASTER SERVICES
        ======================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE7E1] pb-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">🇮🇳</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087F5B] bg-[#E7F6EF] border border-[#B8E5D2] px-2.5 py-0.5 rounded-md">
                  {t('officialGovBadge', currentLang)}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#17221D]">
                {t('mhGovTitle', currentLang)}
              </h2>
              <p className="text-xs sm:text-sm text-[#66736D]">
                {t('mhGovSubtitle', currentLang)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maharashtraResources.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] hover:bg-[#F1FAF6] rounded-2xl p-6 shadow-[0_4px_18px_rgba(7,84,63,0.06)] transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center shadow-xs">
                      {renderIcon(item.iconName, 'w-6 h-6')}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
                      {getResourceBadge(item)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#17221D] leading-snug">
                      {getResourceName(item)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66736D] mt-2 leading-relaxed">
                      {getResourceDesc(item)}
                    </p>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#087F5B] hover:bg-[#07543F] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors min-h-[44px]"
                >
                  <span>{getResourceBtnText(item)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            3. DISTRICT EMERGENCY CONTACT DIRECTORY & DYNAMIC DISTRICT
        ======================================================== */}
        <section className="bg-white border border-[#DCE7E1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE7E1] pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#17221D]">
                  {t('districtContactsTitle', currentLang)}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#66736D] max-w-2xl leading-relaxed">
                {t('districtContactsSubtitle', currentLang)}
              </p>
            </div>

            <a
              href={districtDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#087F5B] hover:bg-[#07543F] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors min-h-[44px] shrink-0"
            >
              <span>{t('viewDistrictContacts', currentLang)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* District Selector Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66736D]">
                {t('selectedDistrictLabel', currentLang)}: <strong className="text-[#087F5B]">{currentDistrictContact.district}</strong>
              </label>
              <span className="text-[10px] text-[#66736D]">5 Pilot Districts</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(VERIFIED_DISTRICT_CONTACTS).map((dKey) => {
                const isSelected = activeDistrictKey === dKey;
                const dData = VERIFIED_DISTRICT_CONTACTS[dKey];
                return (
                  <button
                    key={dKey}
                    onClick={() => handleDistrictSelect(dKey)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#087F5B] text-white shadow-sm'
                        : 'bg-[#F6F9F7] text-[#17221D] hover:bg-[#E7F6EF] border border-[#DCE7E1]'
                    }`}
                  >
                    <span>{currentLang === 'mr' ? dData.districtMr : currentLang === 'hi' ? dData.districtHi : dData.district}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* District Emergency Contact Card */}
          <div className="bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE7E1] pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#087F5B] tracking-wider">
                  {currentDistrictContact.district.toUpperCase()} DISTRICT
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#17221D]">
                  {currentDistrictContact.district} District Emergency Operations
                </h4>
                {currentDistrictContact.notes && (
                  <p className="text-xs text-[#66736D] mt-0.5">{currentDistrictContact.notes}</p>
                )}
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] bg-[#E7F6EF] border border-[#B8E5D2] px-2.5 py-1 rounded-md self-start sm:self-auto">
                Verified SDMA Directory Data
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Collector Office */}
              <div className="bg-white border border-[#DCE7E1] rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#66736D] block">
                    {t('collectorLabel', currentLang)}
                  </span>
                  <div className="text-lg font-mono font-black text-[#17221D] mt-1">
                    {currentDistrictContact.collectorPhone}
                  </div>
                  <span className="text-[10px] text-[#66736D]">Direct District Magistrate Helpline</span>
                </div>
                <a
                  href={currentDistrictContact.collectorTel}
                  className="inline-flex items-center justify-center space-x-1.5 bg-[#E7F6EF] hover:bg-[#B8E5D2] text-[#087F5B] font-bold text-xs py-2 px-3 rounded-lg transition-colors min-h-[44px]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Collector: {currentDistrictContact.collectorPhone}</span>
                </a>
              </div>

              {/* DEOC */}
              <div className="bg-white border border-[#DCE7E1] rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#66736D] block">
                    {t('deocLabel', currentLang)}
                  </span>
                  <div className="text-lg font-mono font-black text-[#087F5B] mt-1">
                    {currentDistrictContact.deocPhone}
                  </div>
                  <span className="text-[10px] text-[#66736D]">24×7 District Control & Response</span>
                </div>
                <a
                  href={currentDistrictContact.deocTel}
                  className="inline-flex items-center justify-center space-x-1.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors min-h-[44px]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call DEOC: {currentDistrictContact.deocPhone}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[11px] text-[#66736D] border-t border-[#DCE7E1]">
              <div className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
                <span>{t('directoryAuthoritativeNotice', currentLang)}</span>
              </div>
              <a
                href={districtDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#087F5B] hover:underline inline-flex items-center space-x-1"
              >
                <span>{t('viewOfficialDistrictContacts', currentLang)}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. NATIONAL DISASTER MANAGEMENT (NDMA, NDRF, 112 INDIA)
        ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#DCE7E1] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#17221D] flex items-center space-x-2">
              <span className="text-lg">🇮🇳</span>
              <span>{t('nationalMgmtTitle', currentLang)}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nationalResources.map((item) => {
              const is112 = item.id === '112-india';
              return (
                <div
                  key={item.id}
                  className={`bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] hover:bg-[#F1FAF6] rounded-2xl p-5 shadow-[0_4px_18px_rgba(7,84,63,0.06)] transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    is112 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center shadow-xs">
                        {renderIcon(item.iconName, 'w-5 h-5')}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
                        {getResourceBadge(item)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-black text-[#17221D]">
                        {getResourceName(item)}
                      </h3>
                      <p className="text-xs text-[#66736D] mt-1.5 leading-relaxed">
                        {getResourceDesc(item)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {is112 && (
                      <a
                        href="tel:112"
                        className="w-full flex items-center justify-center space-x-2 bg-[#DC3545] hover:bg-[#b02a37] text-white py-2 px-3 rounded-xl font-bold text-xs transition-colors min-h-[44px]"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>CALL 112 (TOLL-FREE)</span>
                      </a>
                    )}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-[#087F5B] hover:bg-[#07543F] text-white py-2 px-3 rounded-xl font-bold text-xs transition-colors min-h-[44px]"
                    >
                      <span>{getResourceBtnText(item)}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            5. HAZARD & EARLY WARNING RESOURCES (IMD, CWC, INCOIS, NCS)
        ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#DCE7E1] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#17221D] flex items-center space-x-2">
              <span className="text-lg">🌦️</span>
              <span>{t('hazardEarlyWarningTitle', currentLang)}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#66736D] mt-0.5">
              {t('hazardEarlyWarningSubtitle', currentLang)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {warningResources.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] hover:bg-[#F1FAF6] rounded-2xl p-5 shadow-[0_4px_18px_rgba(7,84,63,0.06)] transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center shadow-xs">
                      {renderIcon(item.iconName, 'w-5 h-5')}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
                      {getResourceBadge(item)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#17221D] leading-snug">
                      {getResourceName(item)}
                    </h3>
                    <p className="text-xs text-[#66736D] mt-1.5 leading-relaxed line-clamp-3">
                      {getResourceDesc(item)}
                    </p>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1.5 bg-[#087F5B] hover:bg-[#07543F] text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-colors min-h-[44px]"
                >
                  <span>{getResourceBtnText(item)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. MAHARASHTRA CITIZEN SERVICES (AAPLE SARKAR)
        ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#DCE7E1] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#17221D] flex items-center space-x-2">
              <span className="text-lg">🏛️</span>
              <span>{t('citizenServicesTitle', currentLang)}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {citizenResources.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] hover:bg-[#F1FAF6] rounded-2xl p-6 shadow-[0_4px_18px_rgba(7,84,63,0.06)] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center shadow-xs shrink-0">
                    {renderIcon(item.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-[#17221D]">
                        {getResourceName(item)}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E7F6EF] text-[#087F5B] border border-[#B8E5D2]">
                        {getResourceBadge(item)}
                      </span>
                    </div>
                    <p className="text-xs text-[#66736D] mt-1 leading-relaxed">
                      {getResourceDesc(item)}
                    </p>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#087F5B] hover:bg-[#07543F] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors min-h-[44px] shrink-0"
                >
                  <span>{getResourceBtnText(item)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            7. SAFETY / LOCAL DISASTER GUIDANCE
        ======================================================== */}
        <section className="bg-white border border-[#DCE7E1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-6">
          <div className="flex items-center space-x-2 border-b border-[#DCE7E1] pb-3">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-lg font-black text-[#17221D]">
              {t('localGuidanceTitle', currentLang)}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-2">
              <div className="text-xs font-black text-[#087F5B] uppercase tracking-wider">
                {t('landslideGuidance', currentLang)}
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                {t('landslideDesc', currentLang)}
              </p>
            </div>
            <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-2">
              <div className="text-xs font-black text-[#087F5B] uppercase tracking-wider">
                {t('floodGuidance', currentLang)}
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                {t('floodDesc', currentLang)}
              </p>
            </div>
            <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-2">
              <div className="text-xs font-black text-[#087F5B] uppercase tracking-wider">
                {t('evacuationGuidance', currentLang)}
              </div>
              <p className="text-xs text-[#66736D] leading-relaxed">
                {t('evacuationDesc', currentLang)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#E7F6EF] border border-[#B8E5D2] rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#17221D] space-y-1">
              <div className="font-bold">{t('needHelp', currentLang)}</div>
              <div>• {t('evacuatePrompt', currentLang)}</div>
              <div>• {t('avoidFloods', currentLang)}</div>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. PAGE FOOTER & OFFICIAL VERIFICATION NOTICE
        ======================================================== */}
        <footer className="bg-white border border-[#DCE7E1] rounded-2xl p-6 sm:p-8 space-y-5 text-center shadow-xs">
          <div className="max-w-3xl mx-auto space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#087F5B]">
              {t('officialSourcesTitle', currentLang)}
            </h4>
            <p className="text-xs text-[#66736D] leading-relaxed">
              {t('officialSourcesDesc', currentLang)}
            </p>
          </div>

          {/* Official Resources Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-2">
            {[
              'Maharashtra SDMA',
              'Relief & Rehabilitation Department',
              'District Emergency Contacts',
              'NDMA',
              'NDRF',
              'IMD',
              'CWC',
              'INCOIS',
              'NCS',
              '112 India',
              'Aaple Sarkar'
            ].map((sourceName) => (
              <span
                key={sourceName}
                className="px-2.5 py-1 rounded-lg bg-[#F6F9F7] border border-[#DCE7E1] text-[11px] font-medium text-[#17221D]"
              >
                {sourceName}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-[#DCE7E1] space-y-1.5 max-w-2xl mx-auto">
            <div className="text-[11px] font-bold text-[#087F5B] flex items-center justify-center space-x-1">
              <span>✓</span>
              <span>{t('verifiedGovNotice', currentLang)}</span>
            </div>
            <div className="text-[11px] text-[#66736D] italic">
              {t('prototypePlatformDisclaimer', currentLang)}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
