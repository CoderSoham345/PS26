export type Language = 'en' | 'mr' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'DisasterGuard',
    subtitle: 'AI-Powered GIS Decision Support Platform',
    disclaimer: 'Prototype decision-support analysis — not an official statutory designation.',
    communityView: 'Community View',
    authorityView: 'Authority View',
    district: 'District',
    village: 'Village',
    searchPlaceholder: 'Search villages, hazards, or sites...',
    aiAssistant: 'DisasterGuard AI',
    databaseSchema: 'Database Schema',
    language: 'Language',
    
    // Navigation - Community
    commHome: 'Home',
    commVillage: 'My Village',
    commRisk: 'Risk Information',
    commMap: 'Simple Map',
    commRelocation: 'Relocation Options',
    commHelp: 'Help & Helpline',
    
    // Navigation - Authority
    authOverview: 'Overview Dashboard',
    authGisMap: 'Live GIS Map',
    authHabitations: 'Vulnerable Habitations',
    authMultiHazard: 'Multi-Hazard Risk',
    authRedZones: 'Red Zone Analysis',
    authPlanner: 'Relocation Planner',
    authSafeSites: 'Safe Site Finder',
    authSuitability: 'Site Suitability',
    authCapacity: 'Carrying Capacity',
    authSimulator: 'Rehabilitation Simulator',
    authScenario: 'Scenario Simulation',
    authReports: 'Decision Reports',
    authSources: 'Data & Sources',
    authSettings: 'Settings',

    // Help & Helpline page
    helpTitle: 'Help & Emergency Helpline',
    helpSubtitle: 'Essential emergency services, local disaster guidance, and preparedness protocols for community residents.',
    emergencyServicesTitle: 'Emergency Help & Services',
    emergencyServicesDesc: 'Direct emergency response contacts for immediate assistance during crisis events.',
    policeService: 'Police Emergency',
    fireService: 'Fire Brigade',
    ambulanceService: 'Medical Ambulance',
    disasterMgmt: 'District Disaster Control Room',
    prototypeVerifyLabel: 'Prototype / Verify locally',
    localGuidanceTitle: 'Local Disaster Guidance & Safety Protocols',
    landslideGuidance: 'Landslide Safety Protocol',
    landslideDesc: 'If you notice ground cracks, tilting trees, or rumbling sounds, immediately move away from steep slopes along lateral escape paths.',
    floodGuidance: 'Flood & Heavy Rainfall Safety',
    floodDesc: 'Do not attempt to cross flowing water or submerged bridges. Move livestock and valuables to elevated ground.',
    evacuationGuidance: 'Evacuation & Shelter',
    evacuationDesc: 'Follow Panchayat and district collectorate instructions. Carry your emergency kit and essential identity documents.',
    importantContactsTitle: 'Important Community Contacts',
    sarpanchOffice: 'Village Panchayat / Sarpanch',
    healthCentre: 'Primary Health Centre (PHC)',
    shelterManager: 'Community Shelter Coordinator',

    // Red Zone Analysis
    redZoneTitle: 'Modelled High-Risk Area & Red Zone Analysis',
    redZoneSubtitle: 'Interactive GIS spatial workspace for multi-hazard exposure and AI risk assessment.',
    selectArea: 'Select Area Tool',
    drawPolygon: 'Draw Polygon',
    drawRectangle: 'Draw Rectangle',
    drawCircle: 'Draw Circle',
    selectVillage: 'Select Village',
    selectModelledZone: 'Select Modelled Zone',
    clearSelection: 'Clear Selection',
    analysisSummary: 'Analysis Summary',
    hazardExposure: 'Hazard Exposure',
    populationExposure: 'Population Exposure',
    buildingExposure: 'Building Exposure',
    roadAccess: 'Roads & Access',
    infrastructure: 'Infrastructure',
    disasterHistory: 'Disaster History',
    riskCalculation: 'Risk Calculation',
    relocationImplications: 'Relocation Implications',
    dataSources: 'Data Sources',
    generateReport: 'Generate Analysis Report',
    askAiAboutZone: 'Ask DisasterGuard AI about this Red Zone',
    
    // Risk & Hazards
    immediate: 'Immediate',
    shortTerm: 'Short Term',
    mediumTerm: 'Medium Term',
    monitor: 'Monitor',
    landslide: 'Landslide',
    flood: 'Flood',
    coastalErosion: 'Coastal Erosion',
    extremeRainfall: 'Extreme Rainfall',
    seismicHazard: 'Seismic Hazard',
    multiHazard: 'Multi-Hazard',
    veryHigh: 'Very High Risk',
    high: 'High Risk',
    moderate: 'Moderate Risk',
    lower: 'Lower Risk',
    
    // Portal & Login
    aiDecisionSupport: 'AI-Powered Decision Support',
    selectPortal: 'Select Your Portal',
    selectPortalDesc: 'Choose your authorized portal to access role-specific Maharashtra disaster-management decision support.',
    communityResident: 'Community / Resident',
    communityResidentDesc: 'For residents and local communities to understand village risk, relocation options, and emergency guidance.',
    authorityMgmt: 'Authority / Disaster Management',
    authorityMgmtDesc: 'For government and disaster-management decision support, red zones, relocation planning, and carrying capacity.',
    adminSystem: 'Admin / System Admin',
    adminSystemDesc: 'For system and data administration, user management, district configuration, and model parameters.',
    accessPortal: 'Access Portal',
    openData: 'Open Data',
    officialSource: 'Official Source',
    derived: 'Derived',
    simulated: 'Simulated'
  },
  mr: {
    appName: 'डिझास्टरगार्ड (DisasterGuard)',
    subtitle: 'एआय-सक्षम जीआयएस निर्णय समर्थन व्यासपीठ',
    disclaimer: 'प्रोटोटाइप निर्णय-समर्थन विश्लेषण — अधिकृत वैधानिक पदनाम नाही.',
    communityView: 'समुदाय दृश्य',
    authorityView: 'प्रशासन दृश्य',
    district: 'जिल्हा',
    village: 'गाव',
    searchPlaceholder: 'गावे, आपत्ती किंवा ठिकाणे शोधा...',
    aiAssistant: 'डिझास्टरगार्ड एआय',
    databaseSchema: 'डेटाबेस रचना',
    language: 'भाषा',
    
    // Navigation - Community
    commHome: 'मुख्यपृष्ठ',
    commVillage: 'माझे गाव',
    commRisk: 'जोखीम माहिती',
    commMap: 'साधा नकाशा',
    commRelocation: 'पुनर्वसन पर्याय',
    commHelp: 'मदत आणि हेल्पलाइन',
    
    // Navigation - Authority
    authOverview: 'विहंगावलोकन डॅशबोर्ड',
    authGisMap: 'थेट जीआयएस नकाशा',
    authHabitations: 'संवेदनशील वस्त्या',
    authMultiHazard: 'बहु-आपत्ती जोखीम',
    authRedZones: 'रेड झोन विश्लेषण',
    authPlanner: 'पुनर्वसन नियोजन',
    authSafeSites: 'सुरक्षित ठिकाण शोधक',
    authSuitability: 'जागा उपयुक्तता',
    authCapacity: 'वहन क्षमता',
    authSimulator: 'पुनर्वसन सिम्युलेटर',
    authScenario: 'परिदृश्य सिम्युलेशन',
    authReports: 'निर्णय अहवाल',
    authSources: 'डेटा आणि स्रोत',
    authSettings: 'सेटिंग्ज',

    // Help & Helpline page
    helpTitle: 'मदत आणि आपत्कालीन हेल्पलाइन',
    helpSubtitle: 'आवश्यक आपत्कालीन सेवा, स्थानिक आपत्ती मार्गदर्शन आणि समुदाय रहिवाशांसाठी तयारी प्रोटोकॉल.',
    emergencyServicesTitle: 'आपत्कालीन मदत आणि सेवा',
    emergencyServicesDesc: 'संकटकाळादरम्यान त्वरित मदतीसाठी थेट आपत्कालीन संपर्क.',
    policeService: 'पोलिस आपत्कालीन सेवा',
    fireService: 'अग्निशामक दल (फायर ब्रिगेड)',
    ambulanceService: 'वैद्यकीय रुग्णवाहिका',
    disasterMgmt: 'जिल्हा आपत्ती नियंत्रण कक्ष',
    prototypeVerifyLabel: 'प्रोटोटाइप / स्थानिक पातळीवर पडताळणी करा',
    localGuidanceTitle: 'स्थानिक आपत्ती मार्गदर्शन आणि सुरक्षा प्रोटोकॉल',
    landslideGuidance: 'दरड कोसळणे सुरक्षा प्रोटोकॉल',
    landslideDesc: 'जमिनीला तडे गेलेले आढळल्यास, झाडे कललेली दिसल्यास किंवा गडगडाटी आवाज आल्यास, ताबडतोब टेकडीवरून सुरक्षित बाजूला जा.',
    floodGuidance: 'पूर आणि अतिवृष्टी सुरक्षा',
    floodDesc: 'वाहत्या पाण्यात किंवा पाण्याखाली गेलेल्या पुलांवरून जाण्याचा प्रयत्न करू नका. जनावरे आणि मौल्यवान वस्तू उंच भागात हलवा.',
    evacuationGuidance: 'स्थलांतर आणि निवारा',
    evacuationDesc: 'पंचायत आणि जिल्हा प्रशासनाच्या सूचनांचे पालन करा. आपली आपत्कालीन किट आणि ओळखपत्रे तयार ठेवा.',
    importantContactsTitle: 'महत्त्वाचे समुदाय संपर्क',
    sarpanchOffice: 'ग्रामपंचायत / सरपंच कार्यालय',
    healthCentre: 'प्राथमिक आरोग्य केंद्र (PHC)',
    shelterManager: 'समुदाय निवारा समन्वयका',

    // Red Zone Analysis
    redZoneTitle: 'मॉडेल केलेले उच्च-जोखीम क्षेत्र आणि रेड झोन विश्लेषण',
    redZoneSubtitle: 'बहु-आपत्ती प्रावरण आणि एआय जोखीम मूल्यमापनासाठी परस्परसंवादी जीआयएस जागा.',
    selectArea: 'क्षेत्र निवडा साधन',
    drawPolygon: 'बहुभुज काढा',
    drawRectangle: 'आयताकृती काढा',
    drawCircle: 'वर्तुळ काढा',
    selectVillage: 'गाव निवडा',
    selectModelledZone: 'मॉडेल केलेले क्षेत्र निवडा',
    clearSelection: 'निवड साफ करा',
    analysisSummary: 'विश्लेषण सारांश',
    hazardExposure: 'आपत्ती प्रावरण',
    populationExposure: 'लोकसंख्या प्रावरण',
    buildingExposure: 'इमारती प्रावरण',
    roadAccess: 'रस्ते आणि पोहोच',
    infrastructure: 'पायाभूत सुविधा',
    disasterHistory: 'आपत्ती इतिहास',
    riskCalculation: 'जोखीम गणना',
    relocationImplications: 'पुनर्वसन परिणाम',
    dataSources: 'डेटा स्रोत',
    generateReport: 'विश्लेषण अहवाल तयार करा',
    askAiAboutZone: 'या रेड झोनबद्दल डिझास्टरगार्ड एआयला विचारा',
    
    // Risk & Hazards
    immediate: 'तात्काळ',
    shortTerm: 'अल्पकालीन',
    mediumTerm: 'मध्यमकालीन',
    monitor: 'निरीक्षण',
    landslide: 'दरड कोसळणे',
    flood: 'पूर',
    coastalErosion: 'किनारपट्टी धूप',
    extremeRainfall: 'अतिवृष्टी',
    seismicHazard: 'भूकंपीय धोका',
    multiHazard: 'बहु-आपत्ती',
    veryHigh: 'अति उच्च धोका',
    high: 'उच्च धोका',
    moderate: 'मध्यम धोका',
    lower: 'कमी धोका',
    
    // Portal & Login
    aiDecisionSupport: 'एआय-आधारित निर्णय सहाय्य',
    selectPortal: 'आपले पोर्टल निवडा',
    selectPortalDesc: 'महाराष्ट्र आपत्ती व्यवस्थापनासाठी आपल्या भूमिकेनुसार योग्य पोर्टल निवडा.',
    communityResident: 'समुदाय / नागरिक',
    communityResidentDesc: 'गावातील जोखीम, स्थलांतराचे पर्याय आणि आपत्कालीन मार्गदर्शन समजून घेण्यासाठी.',
    authorityMgmt: 'प्राधिकरण / आपत्ती व्यवस्थापन',
    authorityMgmtDesc: 'शासन आणि आपत्ती व्यवस्थापनासाठी निर्णय सहाय्य, रेड झोन विश्लेषण, स्थलांतर नियोजन आणि वहन क्षमता.',
    adminSystem: 'प्रशासक / प्रणाली प्रशासक',
    adminSystemDesc: 'प्रणाली आणि डेटा व्यवस्थापन, वापरकर्ता व्यवस्थापन, जिल्हा कॉन्फिगरेशन आणि मॉडेल पॅरामीटर्ससाठी.',
    accessPortal: 'पोर्टलमध्ये प्रवेश करा',
    openData: 'मुक्त डेटा',
    officialSource: 'अधिकृत स्रोत',
    derived: 'व्युत्पन्न',
    simulated: 'सिम्युलेटेड'
  },
  hi: {
    appName: 'डिझास्टरगार्ड (DisasterGuard)',
    subtitle: 'एआई-संचालित जीआईएस निर्णय सहायता मंच',
    disclaimer: 'प्रोटोटाइप निर्णय-समर्थन विश्लेषण — आधिकारिक वैधानिक पदनाम नहीं।',
    communityView: 'समुदाय दृश्य',
    authorityView: 'प्रशासन दृश्य',
    district: 'जिला',
    village: 'गाँव',
    searchPlaceholder: 'गाँव, खतरे या स्थान खोजें...',
    aiAssistant: 'डिझास्टरगार्ड एआई',
    databaseSchema: 'डेटाबेस स्कीमा',
    language: 'भाषा',
    
    // Navigation - Community
    commHome: 'होम',
    commVillage: 'मेरा गाँव',
    commRisk: 'जोखिम की जानकारी',
    commMap: 'सरल मानचित्र',
    commRelocation: 'पुनर्वास विकल्प',
    commHelp: 'सहायता और हेल्पलाइन',
    
    // Navigation - Authority
    authOverview: 'अवलोकन डैशबोर्ड',
    authGisMap: 'लाइव जीआईएस मानचित्र',
    authHabitations: 'संवेदनशील बस्तियाँ',
    authMultiHazard: 'बहु-खतरा जोखिम',
    authRedZones: 'रेड जोन विश्लेषण',
    authPlanner: 'पुनर्वास योजनाकार',
    authSafeSites: 'सुरक्षित स्थल खोजक',
    authSuitability: 'स्थल उपयुक्तता',
    authCapacity: 'वहन क्षमता',
    authSimulator: 'पुनर्वास सिम्युलेटर',
    authScenario: 'परिदृश्य सिमुलेशन',
    authReports: 'निर्णय रिपोर्ट',
    authSources: 'डेटा और स्रोत',
    authSettings: 'सेटिंग्स',

    // Help & Helpline page
    helpTitle: 'सहायता और आपातकालीन हेल्पलाइन',
    helpSubtitle: 'समुदाय के निवासियों के लिए आवश्यक आपातकालीन सेवाएँ, स्थानीय आपदा मार्गदर्शन और तैयारी प्रोटोकॉल।',
    emergencyServicesTitle: 'आपातकालीन सहायता और सेवाएँ',
    emergencyServicesDesc: 'संकट की घटनाओं के दौरान तुरंत सहायता के लिए सीधे आपातकालीन संपर्क।',
    policeService: 'पुलिस आपातकालीन सेवा',
    fireService: 'दमकल सेवा (फायर ब्रिगेड)',
    ambulanceService: 'चिकित्सा एम्बुलेंस',
    disasterMgmt: 'जिला आपदा नियंत्रण कक्ष',
    prototypeVerifyLabel: 'प्रोटोटाइप / स्थानीय स्तर पर सत्यापित करें',
    localGuidanceTitle: 'स्थानीय आपदा मार्गदर्शन और सुरक्षा प्रोटोकॉल',
    landslideGuidance: 'भूस्खलन सुरक्षा प्रोटोकॉल',
    landslideDesc: 'यदि आपको जमीन पर दरारें, झुकते हुए पेड़ या गड़गड़ाहट की आवाजें दिखाई दें, तो तुरंत ढलान से दूर सुरक्षित रास्तों पर जाएं।',
    floodGuidance: 'बाढ़ और अतिवृष्टि सुरक्षा',
    floodDesc: 'बहते पानी या जलमग्न पुलों को पार करने का प्रयास न करें। मवेशियों और कीमती सामानों को ऊंचे स्थानों पर ले जाएं।',
    evacuationGuidance: 'निकासी और आश्रय',
    evacuationDesc: 'पंचायत और जिला प्रशासन के निर्देशों का पालन करें। अपनी आपातकालीन किट और पहचान दस्तावेज तैयार रखें।',
    importantContactsTitle: 'महत्वपूर्ण समुदाय संपर्क',
    sarpanchOffice: 'ग्राम पंचायत / सरपंच कार्यालय',
    healthCentre: 'प्राथमिक स्वास्थ्य केंद्र (PHC)',
    shelterManager: 'समुदाय आश्रय समन्वयक',

    // Red Zone Analysis
    redZoneTitle: 'मॉडल किया गया उच्च-जोखिम क्षेत्र और रेड जोन विश्लेषण',
    redZoneSubtitle: 'बहु-खतरा जोखिम और एआई जोखिम मूल्यांकन के लिए इंटरैक्टिव जीआईएस स्थान।',
    selectArea: 'क्षेत्र चयन टूल',
    drawPolygon: 'बहुभुज बनाएं',
    drawRectangle: 'आयत बनाएं',
    drawCircle: 'वृत्त बनाएं',
    selectVillage: 'गाँव चुनें',
    selectModelledZone: 'मॉडल किया गया क्षेत्र चुनें',
    clearSelection: 'चयन साफ़ करें',
    analysisSummary: 'विश्लेषण सारांश',
    hazardExposure: 'खतरा संपर्क',
    populationExposure: 'जनसंख्या संपर्क',
    buildingExposure: 'भवन संपर्क',
    roadAccess: 'सड़कें और पहुँच',
    infrastructure: 'बुनियादी ढांचा',
    disasterHistory: 'आपदा इतिहास',
    riskCalculation: 'जोखिम गणना',
    relocationImplications: 'पुनर्वास निहितार्थ',
    dataSources: 'डेटा स्रोत',
    generateReport: 'विश्लेषण रिपोर्ट तैयार करें',
    askAiAboutZone: 'इस रेड जोन के बारे में डिझास्टरगार्ड एआई से पूछें',
    
    // Risk & Hazards
    immediate: 'तत्काल',
    shortTerm: 'अल्पकालिक',
    mediumTerm: 'मध्यमकालिक',
    monitor: 'निगरानी',
    landslide: 'भूस्खलन',
    flood: 'बाढ़',
    coastalErosion: 'तटीय कटाव',
    extremeRainfall: 'अतिवृष्टि',
    seismicHazard: 'भूकंपीय खतरा',
    multiHazard: 'बहु-खतरा',
    veryHigh: 'अति उच्च जोखिम',
    high: 'उच्च जोखिम',
    moderate: 'मध्यम जोखिम',
    lower: 'कम जोखिम',
    
    // Portal & Login
    aiDecisionSupport: 'AI-आधारित निर्णय सहायता',
    selectPortal: 'अपना पोर्टल चुनें',
    selectPortalDesc: 'महाराष्ट्र आपदा प्रबंधन के लिए अपनी भूमिका के अनुसार पोर्टल चुनें।',
    communityResident: 'समुदाय / नागरिक',
    communityResidentDesc: 'गाँव के जोखिम, पुनर्वास विकल्प और आपातकालीन मार्गदर्शन को समझने के लिए।',
    authorityMgmt: 'प्राधिकरण / आपदा प्रबंधन',
    authorityMgmtDesc: 'सरकार और आपदा प्रबंधन के लिए निर्णय सहायता, रेड ज़ोन विश्लेषण, पुनर्वास योजना और वहन क्षमता।',
    adminSystem: 'प्रशासक / सिस्टम एडमिन',
    adminSystemDesc: 'सिस्टम और डेटा प्रबंधन, उपयोगकर्ता प्रबंधन, जिला कॉन्फ़िगरेशन और मॉडल पैरामीटर के लिए।',
    accessPortal: 'पोर्टल में प्रवेश करें',
    openData: 'खुला डेटा',
    officialSource: 'आधिकारिक स्रोत',
    derived: 'व्युत्पन्न',
    simulated: 'सिम्युलेटेड'
  }
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

export function translateHazardType(type: string, lang: Language): string {
  if (!type) return type;
  const lower = type.toLowerCase();
  if (lower.includes('landslide')) {
    if (lang === 'mr') return 'दरड कोसळणे';
    if (lang === 'hi') return 'भूस्खलन';
  }
  if (lower.includes('flood')) {
    if (lang === 'mr') return 'पूर';
    if (lang === 'hi') return 'बाढ़';
  }
  if (lower.includes('seismic')) {
    if (lang === 'mr') return 'भूकंपीय धोका';
    if (lang === 'hi') return 'भूकंपीय खतरा';
  }
  if (lower.includes('rainfall')) {
    if (lang === 'mr') return 'अतिवृष्टी';
    if (lang === 'hi') return 'अतिवृष्टि';
  }
  return type;
}

export function translateRiskLevel(level: string, lang: Language): string {
  if (!level) return level;
  const upper = level.toUpperCase();
  if (upper.includes('IMMEDIATE') || upper.includes('VERY_HIGH')) {
    if (lang === 'mr') return 'तात्काळ / अति उच्च';
    if (lang === 'hi') return 'तत्काल / अति उच्च';
    return 'Immediate / Very High';
  }
  if (upper.includes('SHORT_TERM') || upper.includes('HIGH')) {
    if (lang === 'mr') return 'अल्पकालीन / उच्च';
    if (lang === 'hi') return 'अल्पकालिक / उच्च';
    return 'Short Term / High';
  }
  if (upper.includes('MEDIUM_TERM') || upper.includes('MODERATE')) {
    if (lang === 'mr') return 'मध्यमकालीन / मध्यम';
    if (lang === 'hi') return 'मध्यमकालिक / मध्यम';
    return 'Medium Term / Moderate';
  }
  if (upper.includes('MONITOR') || upper.includes('LOW')) {
    if (lang === 'mr') return 'निरीक्षण / कमी';
    if (lang === 'hi') return 'निगरानी / कम';
    return 'Monitor / Low';
  }
  return level;
}

export function translateRoadType(road: string, lang: Language): string {
  if (!road) return road;
  if (road.toLowerCase().includes('paved') || road.toLowerCase().includes('good')) {
    if (lang === 'mr') return 'सर्वमोसमी पक्का रस्ता (Good)';
    if (lang === 'hi') return 'सभी मौसम योग्य पक्की सड़क (Good)';
  }
  if (road.toLowerCase().includes('kaccha') || road.toLowerCase().includes('poor')) {
    if (lang === 'mr') return 'कच्चा रस्ता (Poor)';
    if (lang === 'hi') return 'कच्ची सड़क (Poor)';
  }
  return road;
}

export function translateAccessibility(access: string, lang: Language): string {
  if (!access) return access;
  const lower = access.toLowerCase();
  if (lower === 'poor') return lang === 'mr' ? 'कमी (Poor)' : lang === 'hi' ? 'खराब (Poor)' : 'Poor';
  if (lower === 'moderate') return lang === 'mr' ? 'मध्यम (Moderate)' : lang === 'hi' ? 'मध्यम (Moderate)' : 'Moderate';
  if (lower === 'good') return lang === 'mr' ? 'चांगली (Good)' : lang === 'hi' ? 'अच्छी (Good)' : 'Good';
  return access;
}

export function translateRelocationStatus(status: string, lang: Language): string {
  if (!status) return status;
  if (status.includes('Assessment Required')) return lang === 'mr' ? 'मुल्यांकन आवश्यक' : lang === 'hi' ? 'मूल्यांकन आवश्यक' : 'Assessment Required';
  if (status.includes('Red Zone Declared')) return lang === 'mr' ? 'रेड झोन घोषित' : lang === 'hi' ? 'रेड जोन घोषित' : 'Red Zone Declared';
  if (status.includes('Candidate Site')) return lang === 'mr' ? 'उमेदवार ठिकाण (पुढील मूल्यांकनासाठी)' : lang === 'hi' ? 'उम्मीदवार स्थल (आगे के मूल्यांकन के लिए)' : 'Candidate site for further assessment';
  return status;
}
