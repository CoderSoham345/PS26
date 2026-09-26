export type Language = 'en' | 'mr' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'SURAKSHIT DHARA',
    brandHindi: 'सुरक्षित धरा',
    subtitle: 'AI + GIS Disaster Risk & Safe Settlement Intelligence',
    tagline: 'Identify Risk. Build a Safer Future.',
    taglineHi: 'जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।',
    disclaimer: 'Prototype decision-support analysis — not an official statutory designation.',
    communityView: 'Community View',
    authorityView: 'Authority View',
    authorityMode: 'Authority Mode',
    adminMode: 'Admin Mode',
    communityMode: 'Community Mode',
    district: 'District',
    village: 'Village',
    candidateSite: 'Candidate Site',
    searchPlaceholder: 'Search villages, hazards, or sites...',
    aiAssistant: '✦ Gemini AI',
    databaseSchema: 'Database Schema',
    language: 'Language',
    
    // Navigation
    authOverview: 'Overview',
    authGisMap: 'Live GIS Map',
    authHabitations: 'Vulnerable Habitations',
    authMultiHazard: 'Multi-Hazard Risk',
    authRedZones: 'Red Zone Analysis',
    authPlanner: 'Relocation Planner',
    authSafeSites: 'Safe Site Finder',
    authCapacity: 'Carrying Capacity',
    authSimulator: 'Rehabilitation Simulator',
    authReports: 'Reports',
    authSources: 'Data & Sources',
    authHelp: 'Help & Helpline',
    authSettings: 'Settings',

    // Simulator Header
    simulatorTag: 'AI REHABILITATION & CITY TRANSFORMATION SIMULATOR',
    visualizingTransition: 'Visualizing the transition from',
    to: 'to',
    simulatorSubtitle: 'Prototype decision-support visualization for proactive relocation and rehabilitation.',
    beforeStage: 'BEFORE',
    beforeSub: 'Existing vulnerable settlement',
    relocationStage: 'RELOCATION',
    relocationSub: 'Movement to candidate site',
    afterStage: 'AFTER',
    afterSub: 'Proposed rehabilitated settlement',
    playSimulation: 'PLAY SIMULATION',
    pauseSimulation: 'PAUSE',
    replaySimulation: 'REPLAY',
    resetSimulation: 'RESET',

    // Map Insight
    mapInsight: 'MAP INSIGHT',
    modelledAnalysis: 'MODELLED ANALYSIS',
    modelledAnalysisSub: 'Not an official statutory designation. Prototype decision-support visualization.',

    // Layer Card Groups
    riskAndHazards: '1. RISK & HAZARDS',
    relocationElements: '2. RELOCATION ELEMENTS',
    infrastructure: '3. INFRASTRUCTURE',
    terrainAndContext: '4. TERRAIN & CONTEXT',

    // Map Layers
    modelledRedZone: 'Modelled Red Zone',
    hazardZones: 'Hazard Zones',
    landslideRisk: 'Landslide Risk',
    floodRisk: 'Flood Risk',
    currentVillage: 'Current Village',
    relocationRoute: 'Relocation Route',
    planningBoundary: 'Planning Boundary',
    majorRoads: 'Major Roads',
    roadNetwork: 'Road Network',
    hospitalPhc: 'Hospital / PHC',
    school: 'School',
    waterSource: 'Water Source',
    contours: 'Contours',
    riverWater: 'River / Water Bodies',
    villageBoundary: 'Village Boundary',
    satelliteImagery: 'Satellite Imagery',

    // Analytics Panel
    stage1Before: 'STAGE 1: BEFORE RELOCATION',
    stage2Relocation: 'STAGE 2: RELOCATION IN PROGRESS',
    stage3After: 'STAGE 3: AFTER REHABILITATION',
    riskLevel: 'Risk Level',
    population: 'Population',
    households: 'Households',
    primaryHazards: 'Primary Hazards',
    redZoneArea: 'Modelled Red Zone Area',
    infrastructureAtRisk: 'Infrastructure at Risk',
    prototypeSuitability: 'Prototype Suitability Score',
    distance: 'Distance',
    availableLand: 'Available Land',
    suitableArea: 'Suitable Area',
    estimatedCapacity: 'Estimated Capacity',
    keySiteAdvantages: 'KEY SITE ADVANTAGES',
    roadAccessibilityAdv: 'Road accessibility',
    hazardExposureAdv: 'Hazard-safe elevation',
    waterAccessAdv: 'Reliable water access',
    healthcareAccessAdv: 'Healthcare access (<10 km)',
    schoolAccessAdv: 'School connectivity',
    suitableLandAdv: 'Stable geotechnical terrain',
    emergencyAccessAdv: 'Rapid emergency access',

    // Proposed Rehabilitation Breakdown
    proposedRehabilitation: 'PROPOSED REHABILITATION',
    residentialArea: 'Residential Area',
    roads: 'Roads & Access',
    openSpace: 'Central Assembly & Open Space',
    healthcare: 'Healthcare Facility (PHC)',
    communityFacility: 'Community Centre',
    waterUtilities: 'Water / Solar Utilities',
    emergencyFacility: 'Emergency Response Base',

    // Decision Support Summary
    decisionSupportSummary: 'DECISION SUPPORT SUMMARY',
    aiGenerated: 'AI-GENERATED',
    whyRelocate: 'WHY RELOCATE?',
    whyThisSite: 'WHY THIS SITE?',
    whatChangesAfter: 'WHAT CHANGES AFTER RELOCATION?',
    limitations: 'LIMITATIONS',

    // Comparison Slider
    comparisonSlider: 'INTERACTIVE SETTLEMENT TRANSITION SLIDER',
    currentSettlement: 'CURRENT VILLAGE',
    rehabilitatedSettlement: 'REHABILITATED VILLAGE',

    // AI Visual Context Gallery
    aiVisualContext: 'AI VISUAL CONTEXT',
    aiVisualSubtitle: 'Conceptual visualization — not geographic evidence',
    aiStorytellingNotice: 'Every image is AI-generated for conceptual storytelling only and does not constitute geographic evidence or official satellite imagery.',
    img01Title: '01 Affected Village',
    img01Desc: 'Hillside scarp settlement exposed to monsoon saturation and debris flows.',
    img02Title: '02 Proposed Relocation Site',
    img02Desc: 'Elevated basalt plateau with gentle slope and clear road connectivity.',
    img03Title: '03 Relocation Route',
    img03Desc: 'All-weather paved corridor linking valley habitation to safe plateau.',
    img04Title: '04 Nearby Hospital',
    img04Desc: 'Sub-district health centre with emergency ambulance bays and solar backup.',
    img05Title: '05 Nearby School',
    img05Desc: 'Resilient model school campus functioning as multipurpose community hub.',
    img06Title: '06 After Rehabilitation',
    img06Desc: 'Planned disaster-resilient settlement with organized solar homesteads.',

    // Chatbot
    chatbotTitle: 'सुरक्षित धरा AI',
    chatbotPromptHint: 'Ask about this village, risk, relocation or rehabilitation.',
    askChatbotPlaceholder: 'Ask about risk, safe sites, capacity, or simulation...',
    quickWhyRisk: 'Why is this village at risk?',
    quickExplainRedZone: 'Explain the Red Zone',
    quickWhySite: 'Why this site?',
    quickCompareSites: 'Compare candidate sites',
    quickExplainCapacity: 'Explain capacity',
    quickExplainRehab: 'Explain rehabilitation',
    quickWhatChanges: 'What changes after relocation?',
    quickDecisionSummary: 'Generate decision summary',

    // Risk levels & hazards
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

    // Portal Login
    aiDecisionSupport: 'AI-Powered Decision Support',
    welcomeTitle: 'Welcome to SURAKSHIT DHARA',
    selectPortal: 'Select Your Portal',
    selectPortalDesc: 'Choose your authorized portal to access role-specific Maharashtra disaster-management decision support.',
    communityResident: 'Community / Resident',
    communityResidentDesc: 'For residents and local communities to understand village risk, relocation options, and emergency guidance.',
    authorityMgmt: 'Authority / Disaster Management',
    authorityMgmtDesc: 'For government and disaster-management decision support, red zones, relocation planning, and carrying capacity.',
    adminSystem: 'Admin / System Admin',
    adminSystemDesc: 'For system and data administration, user management, district configuration, and model parameters.',
    accessPortal: 'Access Portal',

    // Help & Helpline
    helpHeaderTitle: 'सुरक्षित धरा Emergency & Government Resources',
    helpHeaderSubtitle: 'Get emergency assistance and access verified government disaster-management resources.',
    emergencyNowTitle: 'EMERGENCY NOW?',
    emergencyNowSubtitle: 'If you are facing an immediate emergency, contact the appropriate official emergency service.',
    mhGovTitle: 'MAHARASHTRA GOVERNMENT',
    mhGovSubtitle: 'Official Disaster Management & Emergency Services',
    officialGovBadge: 'OFFICIAL GOVERNMENT RESOURCES',
    districtContactsTitle: 'DISTRICT EMERGENCY CONTACTS',
    districtContactsSubtitle: 'Find official Collector, District Disaster Management Officer and District Emergency Operations Centre contacts for Maharashtra districts.',
    viewDistrictContacts: 'VIEW DISTRICT CONTACTS',
    viewOfficialDistrictContacts: 'View Official District Contacts',
    selectedDistrictLabel: 'Selected District',
    collectorLabel: 'Collector Office',
    deocLabel: 'District Emergency Operations Centre (DEOC)',
    directoryAuthoritativeNotice: 'The official Maharashtra SDMA directory is the authoritative source for live district emergency contact updates.',
    nationalMgmtTitle: 'NATIONAL DISASTER MANAGEMENT',
    hazardEarlyWarningTitle: 'HAZARD & EARLY WARNING',
    hazardEarlyWarningSubtitle: 'Use official government agencies for current warnings and advisories.',
    citizenServicesTitle: 'MAHARASHTRA CITIZEN SERVICES',
    officialSourcesTitle: 'OFFICIAL INFORMATION SOURCES',
    officialSourcesDesc: 'सुरक्षित धरा (SURAKSHIT DHARA) provides links to official government resources for emergency information, disaster preparedness and hazard warnings. During an active emergency, follow instructions from local authorities and official warning agencies.',
    verifiedGovNotice: 'Government links verified from official government portals.',
    prototypePlatformDisclaimer: 'सुरक्षित धरा is a prototype decision-support platform and is not an official government emergency service.',
    callButton: 'CALL',
    visitButton: 'VISIT',
    viewWarningsButton: 'View official warnings',
    localGuidanceTitle: 'LOCAL DISASTER GUIDANCE & SAFETY',
    safetyNoticeTitle: 'SAFETY & EMERGENCY NOTICE'
  },

  mr: {
    appName: 'सुरक्षित धरा (SURAKSHIT DHARA)',
    brandHindi: 'सुरक्षित धरा',
    subtitle: 'AI + GIS आपत्ती जोखीम व सुरक्षित वसाहत बुद्धिमत्ता',
    tagline: 'जोखीम ओळखा. सुरक्षित भविष्य घडवा.',
    taglineHi: 'जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।',
    disclaimer: 'प्रोटोटाइप निर्णय-समर्थन विश्लेषण — अधिकृत वैधानिक पदनाम नाही.',
    communityView: 'समुदाय दृश्य',
    authorityView: 'प्रशासन दृश्य',
    authorityMode: 'प्रशासन मोड (Authority)',
    adminMode: 'प्रशासक मोड (Admin)',
    communityMode: 'समुदाय मोड (Community)',
    district: 'जिल्हा',
    village: 'गाव / वस्ती',
    candidateSite: 'उमेदवार सुरक्षित जागा',
    searchPlaceholder: 'गावे, आपत्ती किंवा ठिकाणे शोधा...',
    aiAssistant: '✦ जेमिनी एआय (Gemini AI)',
    databaseSchema: 'डेटाबेस रचना',
    language: 'भाषा',

    // Navigation
    authOverview: 'विहंगावलोकन',
    authGisMap: 'थेट जीआयएस नकाशा',
    authHabitations: 'संवेदनशील वस्त्या',
    authMultiHazard: 'बहु-आपत्ती जोखीम',
    authRedZones: 'रेड झोन विश्लेषण',
    authPlanner: 'पुनर्वसन नियोजन',
    authSafeSites: 'सुरक्षित ठिकाण शोधक',
    authCapacity: 'वहन क्षमता',
    authSimulator: 'पुनर्वसन सिम्युलेटर',
    authReports: 'निर्णय अहवाल',
    authSources: 'डेटा आणि स्रोत',
    authHelp: 'मदत आणि हेल्पलाइन',
    authSettings: 'सेटिंग्ज',

    // Simulator Header
    simulatorTag: 'एआय पुनर्वसन व नगर परिवर्तन सिम्युलेटर',
    visualizingTransition: 'संवेदनशील वस्तीतून सुरक्षित व नियोजित वस्तीत स्थलांतराचे दृश्य:',
    to: 'येथून थेट येथे:',
    simulatorSubtitle: 'सक्रिय स्थलांतर आणि सुरक्षित वसाहतीसाठी प्रोटोटाइप निर्णय-समर्थन व्हिज्युअलायझेशन.',
    beforeStage: '१. स्थलांतरापूर्वी',
    beforeSub: 'सध्याची संवेदनशील वस्ती',
    relocationStage: '२. स्थलांतर प्रक्रिया',
    relocationSub: 'उमेदवार जागेवर स्थलांतर',
    afterStage: '३. पुनर्वसनानंतर',
    afterSub: 'प्रस्तावित पुनर्वसित सुरक्षित वसाहत',
    playSimulation: 'सिम्युलेशन सुरू करा',
    pauseSimulation: 'थांबवा',
    replaySimulation: 'पुन्हा चालवा',
    resetSimulation: 'रीसेट',

    // Map Insight
    mapInsight: 'नकाशा अंतर्दृष्टी (MAP INSIGHT)',
    modelledAnalysis: 'मॉडेल केलेले विश्लेषण (MODELLED)',
    modelledAnalysisSub: 'अधिकृत वैधानिक पदनाम नाही. प्रोटोटाइप निर्णय-समर्थन व्हिज्युअलायझेशन.',

    // Layer Card Groups
    riskAndHazards: '१. जोखीम आणि आपत्ती (HAZARDS)',
    relocationElements: '२. पुनर्वसन घटक (RELOCATION)',
    infrastructure: '३. पायाभूत सुविधा (INFRASTRUCTURE)',
    terrainAndContext: '४. भूप्रदेश आणि संदर्भ (TERRAIN)',

    // Map Layers
    modelledRedZone: 'मॉडेल केलेला रेड झोन',
    hazardZones: 'आपत्ती क्षेत्रे',
    landslideRisk: 'दरड कोसळण्याची जोखीम',
    floodRisk: 'पूर जोखीम',
    currentVillage: 'सध्याचे गाव',
    relocationRoute: 'स्थलांतर मार्ग',
    planningBoundary: 'नियोजन सीमा',
    majorRoads: 'प्रमुख रस्ते',
    roadNetwork: 'रस्ते जाळे',
    hospitalPhc: 'रुग्णालय / प्राथमिक आरोग्य केंद्र',
    school: 'शाळा',
    waterSource: 'पाण्याचा स्रोत',
    contours: 'कंटूर रेषा',
    riverWater: 'नदी / जलाशय',
    villageBoundary: 'गाव सीमा',
    satelliteImagery: 'उपग्रह प्रतिमा',

    // Analytics Panel
    stage1Before: 'टप्पा १: स्थलांतरापूर्वीची स्थिती',
    stage2Relocation: 'टप्पा २: स्थलांतर हालचाली',
    stage3After: 'टप्पा ३: प्रस्तावित पुनर्वसन रचना',
    riskLevel: 'जोखीम पातळी',
    population: 'लोकसंख्या',
    households: 'कुटुंबे',
    primaryHazards: 'प्राथमिक आपत्ती',
    redZoneArea: 'रेड झोन क्षेत्रफळ',
    infrastructureAtRisk: 'धोक्यात असलेल्या सुविधा',
    prototypeSuitability: 'प्रोटोटाइप उपयुक्तता गुण',
    distance: 'अंतर',
    availableLand: 'उपलब्ध जमीन',
    suitableArea: 'वापरण्यायोग्य क्षेत्र',
    estimatedCapacity: 'अंदाजित वहन क्षमता',
    keySiteAdvantages: 'या जागेचे प्रमुख फायदे',
    roadAccessibilityAdv: 'उत्तम रस्ते जोडणी',
    hazardExposureAdv: 'आपत्तीमुक्त सुरक्षित उंची',
    waterAccessAdv: 'विश्वासार्ह पाणीपुरवठा',
    healthcareAccessAdv: 'आरोग्य सुविधा पोहोच (<१० किमी)',
    schoolAccessAdv: 'शाळा पोहोच सुलभता',
    suitableLandAdv: 'स्थिर भूशास्त्रीय रचना',
    emergencyAccessAdv: 'तातडीची आपत्कालीन पोहोच',

    // Proposed Rehabilitation Breakdown
    proposedRehabilitation: 'प्रस्तावित पुनर्वसन रचना',
    residentialArea: 'निवासी वसाहत क्षेत्र',
    roads: 'रस्ते आणि अंतर्गत मार्ग',
    openSpace: 'मध्यवर्ती सभा मैदान व हरित क्षेत्र',
    healthcare: 'आरोग्य केंद्र (PHC)',
    communityFacility: 'समुदाय केंद्र व पंचायत भवन',
    waterUtilities: 'पाणी व सौर ऊर्जा प्रकल्प',
    emergencyFacility: 'आपत्कालीन प्रतिसाद केंद्र',

    // Decision Support Summary
    decisionSupportSummary: 'निर्णय समर्थन सारांश (एआय)',
    aiGenerated: 'एआय-निर्मित',
    whyRelocate: 'स्थलांतर का आवश्यक आहे?',
    whyThisSite: 'हीच जागा का निवडली?',
    whatChangesAfter: 'पुनर्वसनाने काय बदल होईल?',
    limitations: 'मर्यादा आणि पडताळणी',

    // Comparison Slider
    comparisonSlider: 'परस्परसंवादी वसाहत संक्रमण स्लाइडर',
    currentSettlement: 'सध्याचे गाव',
    rehabilitatedSettlement: 'पुनर्वसित सुरक्षित वसाहत',

    // AI Visual Context Gallery
    aiVisualContext: 'एआय व्हिज्युअल संदर्भ गॅलरी',
    aiVisualSubtitle: 'संकल्पनात्मक दृश्य — भौगोलिक पुरावा नाही',
    aiStorytellingNotice: 'प्रत्येक प्रतिमा केवळ कथात्मक संदर्भासाठी एआय-निर्मित आहे, हा कोणताही अधिकृत उपग्रह पुरावा नाही.',
    img01Title: '०१ बाधित गाव',
    img01Desc: 'दरड कोसळणे आणि अतिवृष्टीच्या धोक्यात असलेली मूळ डोंगरी वस्ती.',
    img02Title: '०२ प्रस्तावित सुरक्षित जागा',
    img02Desc: 'सपाट सुरक्षित पठार, पुरापासून दूर आणि सर्व हवामानातील रस्त्यांशी जोडलेले.',
    img03Title: '०३ स्थलांतर मार्ग',
    img03Desc: 'खोऱ्यातून सुरक्षित पठाराकडे जाणारा पक्का संरक्षित मार्ग.',
    img04Title: '०४ नजीकचे रुग्णालय',
    img04Desc: 'रुग्णवाहिका आणि आपत्कालीन सेवेने सज्ज प्राथमिक आरोग्य केंद्र.',
    img05Title: '०५ नजीकची शाळा',
    img05Desc: 'आपत्ती निवारा म्हणूनही वापरण्यायोग्य जिल्हा परिषद मॉडेल शाळा.',
    img06Title: '०६ पुनर्वसनानंतरचे दृश्य',
    img06Desc: 'सौरऊर्जा, रुंद रस्ते आणि सुरक्षित घरांसह सुनियोजित आधुनिक वसाहत.',

    // Chatbot
    chatbotTitle: 'सुरक्षित धरा AI',
    chatbotPromptHint: 'या गावाच्या धोक्याबद्दल, स्थलांतराबद्दल किंवा पुनर्वसनाबद्दल विचारा.',
    askChatbotPlaceholder: 'जोखीम, सुरक्षित जागा किंवा सिम्युलेशनबद्दल विचारा...',
    quickWhyRisk: 'हे गाव धोक्यात का आहे?',
    quickExplainRedZone: 'रेड झोन समजावून सांगा',
    quickWhySite: 'हीच जागा का योग्य आहे?',
    quickCompareSites: 'उमेदवार जागांची तुलना करा',
    quickExplainCapacity: 'वहन क्षमता समजावून सांगा',
    quickExplainRehab: 'प्रस्तावित पुनर्वसन सांगा',
    quickWhatChanges: 'पुनर्वसनानंतर काय बदलेल?',
    quickDecisionSummary: 'निर्णय समर्थन सारांश तयार करा',

    // Risk levels & hazards
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
    veryHigh: 'अति उच्च जोखीम',
    high: 'उच्च जोखीम',
    moderate: 'मध्यम जोखीम',
    lower: 'कमी जोखीम',

    // Portal Login
    aiDecisionSupport: 'एआय-आधारित निर्णय सहाय्य',
    welcomeTitle: 'सुरक्षित धरा मध्ये आपले स्वागत आहे',
    selectPortal: 'आपले पोर्टल निवडा',
    selectPortalDesc: 'महाराष्ट्र आपत्ती व्यवस्थापनासाठी आपल्या भूमिकेनुसार योग्य पोर्टल निवडा.',
    communityResident: 'समुदाय / नागरिक',
    communityResidentDesc: 'गावातील जोखीम, स्थलांतराचे पर्याय आणि आपत्कालीन मार्गदर्शन समजून घेण्यासाठी.',
    authorityMgmt: 'प्रशासन / आपत्ती व्यवस्थापन',
    authorityMgmtDesc: 'शासन आणि आपत्ती व्यवस्थापनासाठी निर्णय सहाय्य, रेड झोन विश्लेषण, स्थलांतर नियोजन आणि वहन क्षमता.',
    adminSystem: 'प्रशासक / प्रणाली प्रशासक',
    adminSystemDesc: 'प्रणाली आणि डेटा व्यवस्थापन, वापरकर्ता व्यवस्थापन, जिल्हा कॉन्फिगरेशन आणि मॉडेल पॅरामीटर्ससाठी.',
    accessPortal: 'पोर्टलमध्ये प्रवेश करा',

    // Help & Helpline
    helpHeaderTitle: 'सुरक्षित धरा आपत्कालीन व शासकीय संसाधने (Emergency & Government Resources)',
    helpHeaderSubtitle: 'तात्काळ आपत्कालीन मदत मिळवा आणि अधिकृत शासकीय आपत्ती व्यवस्थापन सेवांशी संपर्क साधा.',
    emergencyNowTitle: 'तातडीची मदत हवी आहे का?',
    emergencyNowSubtitle: 'जर आपण गंभीर किंवा तात्काळ धोक्यात असाल, तर संबंधित अधिकृत आपत्कालीन सेवेशी थेट संपर्क साधा.',
    mhGovTitle: 'महाराष्ट्र शासन',
    mhGovSubtitle: 'अधिकृत आपत्ती व्यवस्थापन व आपत्कालीन सेवा',
    officialGovBadge: 'अधिकृत शासकीय स्त्रोत',
    districtContactsTitle: 'जिल्हा आपत्कालीन संपर्क',
    districtContactsSubtitle: 'महाराष्ट्रातील जिल्ह्यांचे जिल्हाधिकारी, जिल्हा आपत्ती व्यवस्थापन अधिकारी आणि जिल्हा आपत्कालीन कार्य केंद्र (DEOC) संपर्क तपशील.',
    viewDistrictContacts: 'जिल्हा संपर्क सूची पहा',
    viewOfficialDistrictContacts: 'अधिकृत जिल्हा संपर्क पहा',
    selectedDistrictLabel: 'निवडलेला जिल्हा',
    collectorLabel: 'जिल्हाधिकारी कार्यालय',
    deocLabel: 'जिल्हा आपत्कालीन कार्य केंद्र (DEOC)',
    directoryAuthoritativeNotice: 'थेट व अद्ययावत जिल्हा संपर्कांसाठी महाराष्ट्र शासन SDMA ची अधिकृत संपर्क सूची हाच मूळ आधार आहे.',
    nationalMgmtTitle: 'राष्ट्रीय आपत्ती व्यवस्थापन',
    hazardEarlyWarningTitle: 'धोका व पूर्वसूचना',
    hazardEarlyWarningSubtitle: 'हवामान, पूर व नैसर्गिक धोक्यांच्या ताज्या इशाऱ्यांसाठी अधिकृत शासकीय यंत्रणांचा वापर करा.',
    citizenServicesTitle: 'नागरिक सेवा',
    officialSourcesTitle: 'अधिकृत माहिती स्त्रोत',
    officialSourcesDesc: 'सुरक्षित धरा (SURAKSHIT DHARA) आपत्कालीन माहिती, पूर्वतयारी आणि धोक्याच्या इशाऱ्यांसाठी अधिकृत शासकीय पोर्टलच्या लिंक्स प्रदान करते. प्रत्यक्ष आपत्तीच्या वेळी स्थानिक प्रशासन आणि अधिकृत सूचनांचे काटेकोर पालन करा.',
    verifiedGovNotice: 'अधिकृत शासकीय पोर्टल्सवरून पडताळणी केलेले दुवे.',
    prototypePlatformDisclaimer: 'सुरक्षित धरा हे प्रोटोटाइप निर्णय-समर्थन व्यासपीठ असून ही अधिकृत शासकीय आपत्कालीन सेवा नाही.',
    callButton: 'कॉल करा',
    visitButton: 'भेट द्या',
    viewWarningsButton: 'अधिकृत इशारे पहा',
    localGuidanceTitle: 'स्थानिक आपत्ती मार्गदर्शन व सुरक्षा',
    safetyNoticeTitle: 'सुरक्षा व आपत्कालीन सूचना'
  },

  hi: {
    appName: 'सुरक्षित धरा (SURAKSHIT DHARA)',
    brandHindi: 'सुरक्षित धरा',
    subtitle: 'AI + GIS आपदा जोखिम एवं सुरक्षित पुनर्वास बुद्धिमत्ता',
    tagline: 'जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।',
    taglineHi: 'जोखिम पहचानें। सुरक्षित भविष्य बनाएँ।',
    disclaimer: 'प्रोटोटाइप निर्णय-समर्थन विश्लेषण — कोई आधिकारिक वैधानिक पदनाम नहीं।',
    communityView: 'समुदाय दृश्य',
    authorityView: 'प्रशासन दृश्य',
    authorityMode: 'प्राधिकरण मोड (Authority)',
    adminMode: 'प्रशासक मोड (Admin)',
    communityMode: 'समुदाय मोड (Community)',
    district: 'ज़िला',
    village: 'गाँव / बस्ती',
    candidateSite: 'उम्मीदवार सुरक्षित स्थल',
    searchPlaceholder: 'गाँव, खतरे या स्थान खोजें...',
    aiAssistant: '✦ जेमिनी एआई (Gemini AI)',
    databaseSchema: 'डेटाबेस स्कीमा',
    language: 'भाषा',

    // Navigation
    authOverview: 'अवलोकन',
    authGisMap: 'लाइव जीआईएस मानचित्र',
    authHabitations: 'संवेदनशील बस्तियाँ',
    authMultiHazard: 'बहु-खतरा जोखिम',
    authRedZones: 'रेड ज़ोन विश्लेषण',
    authPlanner: 'पुनर्वास योजनाकार',
    authSafeSites: 'सुरक्षित स्थल खोजक',
    authCapacity: 'वहन क्षमता',
    authSimulator: 'पुनर्वास सिम्युलेटर',
    authReports: 'निर्णय रिपोर्ट',
    authSources: 'डेटा और स्रोत',
    authHelp: 'सहायता और हेल्पलाइन',
    authSettings: 'सेटिंग्स',

    // Simulator Header
    simulatorTag: 'एआई पुनर्वास एवं नगर रूपांतरण सिम्युलेटर',
    visualizingTransition: 'संवेदनशील बस्ती से सुरक्षित व सुनियोजित बस्ती में स्थानांतरण का दृश्य:',
    to: 'यहाँ से सीधे यहाँ:',
    simulatorSubtitle: 'सक्रिय पुनर्वास और सुरक्षित बस्ती के लिए प्रोटोटाइप निर्णय-समर्थन विज़ुअलाइज़ेशन।',
    beforeStage: '१. स्थानांतरण पूर्व',
    beforeSub: 'मौजूदा संवेदनशील बस्ती',
    relocationStage: '२. स्थानांतरण प्रक्रिया',
    relocationSub: 'उम्मीदवार स्थल पर स्थानांतरण',
    afterStage: '३. पुनर्वास उपरांत',
    afterSub: 'प्रस्तावित पुनर्वासित सुरक्षित बस्ती',
    playSimulation: 'सिमुलेशन प्रारंभ करें',
    pauseSimulation: 'रोकें',
    replaySimulation: 'पुनः चलाएं',
    resetSimulation: 'रीसेट',

    // Map Insight
    mapInsight: 'मानचित्र अंतर्दृष्टि (MAP INSIGHT)',
    modelledAnalysis: 'मॉडल किया गया विश्लेषण (MODELLED)',
    modelledAnalysisSub: 'आधिकारिक वैधानिक पदनाम नहीं। प्रोटोटाइप निर्णय-समर्थन विज़ुअलाइज़ेशन।',

    // Layer Card Groups
    riskAndHazards: '१. जोखिम एवं खतरे (HAZARDS)',
    relocationElements: '२. पुनर्वास तत्व (RELOCATION)',
    infrastructure: '३. बुनियादी ढांचा (INFRASTRUCTURE)',
    terrainAndContext: '४. भू-भाग एवं संदर्भ (TERRAIN)',

    // Map Layers
    modelledRedZone: 'मॉडल किया गया रेड ज़ोन',
    hazardZones: 'खतरा क्षेत्र',
    landslideRisk: 'भूस्खलन जोखिम',
    floodRisk: 'बाढ़ जोखिम',
    currentVillage: 'वर्तमान गाँव',
    relocationRoute: 'पुनर्वास मार्ग',
    planningBoundary: 'योजना सीमा',
    majorRoads: 'मुख्य सड़कें',
    roadNetwork: 'सड़क नेटवर्क',
    hospitalPhc: 'अस्पताल / प्राथमिक स्वास्थ्य केंद्र',
    school: 'विद्यालय',
    waterSource: 'जल स्रोत',
    contours: 'समोच्च रेखाएं (Contours)',
    riverWater: 'नदी / जल निकाय',
    villageBoundary: 'गाँव की सीमा',
    satelliteImagery: 'उपग्रह इमेजरी',

    // Analytics Panel
    stage1Before: 'चरण १: स्थानांतरण पूर्व स्थिति',
    stage2Relocation: 'चरण २: स्थानांतरण प्रक्रिया',
    stage3After: 'चरण ३: प्रस्तावित पुनर्वास संरचना',
    riskLevel: 'जोखिम स्तर',
    population: 'जनसंख्या',
    households: 'परिवार',
    primaryHazards: 'प्राथमिक खतरे',
    redZoneArea: 'रेड ज़ोन क्षेत्रफल',
    infrastructureAtRisk: 'जोखिम में बुनियादी ढांचा',
    prototypeSuitability: 'प्रोटोटाइप उपयुक्तता स्कोर',
    distance: 'दूरी',
    availableLand: 'उपलब्ध भूमि',
    suitableArea: 'उपयुक्त क्षेत्र',
    estimatedCapacity: 'अनुमानित वहन क्षमता',
    keySiteAdvantages: 'इस स्थल के प्रमुख लाभ',
    roadAccessibilityAdv: 'उत्कृष्ट सड़क संपर्क',
    hazardExposureAdv: 'खतरे से मुक्त सुरक्षित ऊंचाई',
    waterAccessAdv: 'विश्वसनीय जल उपलब्धता',
    healthcareAccessAdv: 'स्वास्थ्य सुविधा पहुँच (<१० किमी)',
    schoolAccessAdv: 'विद्यालय कनेक्टिविटी',
    suitableLandAdv: 'स्थिर भू-तकनीकी भूभाग',
    emergencyAccessAdv: 'त्वरित आपातकालीन पहुँच',

    // Proposed Rehabilitation Breakdown
    proposedRehabilitation: 'प्रस्तावित पुनर्वास संरचना',
    residentialArea: 'आवासीय क्लस्टर क्षेत्र',
    roads: 'सड़कें एवं मुख्य मार्ग',
    openSpace: 'केंद्रीय असेंबली मैदान एवं खुला पार्क',
    healthcare: 'स्वास्थ्य केंद्र (PHC)',
    communityFacility: 'सामुदायिक केंद्र एवं पंचायत भवन',
    waterUtilities: 'जल एवं सौर ऊर्जा सुविधा',
    emergencyFacility: 'आपदा प्रतिक्रिया केंद्र',

    // Decision Support Summary
    decisionSupportSummary: 'निर्णय सहायता सारांश (एआई)',
    aiGenerated: 'एआई-जनित',
    whyRelocate: 'स्थानांतरण क्यों आवश्यक है?',
    whyThisSite: 'यही स्थल क्यों चुना गया?',
    whatChangesAfter: 'स्थानांतरण के बाद क्या बदलेगा?',
    limitations: 'सीमाएं और सत्यापन',

    // Comparison Slider
    comparisonSlider: 'इंटरैक्टिव बस्ती संक्रमण स्लाइडर',
    currentSettlement: 'वर्तमान गाँव',
    rehabilitatedSettlement: 'पुनर्वासित सुरक्षित बस्ती',

    // AI Visual Context Gallery
    aiVisualContext: 'एआई विज़ुअल संदर्भ गैलरी',
    aiVisualSubtitle: 'वैचारिक विज़ुअलाइज़ेशन — भौगोलिक साक्ष्य नहीं',
    aiStorytellingNotice: 'प्रत्येक छवि केवल कथा संदर्भ के लिए एआई-जनित है, यह कोई आधिकारिक उपग्रह साक्ष्य नहीं है।',
    img01Title: '०१ प्रभावित गाँव',
    img01Desc: 'भूस्खलन और अत्यधिक मानसूनी वर्षा के जोखिम में स्थित पहाड़ी गाँव।',
    img02Title: '०२ प्रस्तावित सुरक्षित स्थल',
    img02Desc: 'बाढ़ मुक्त समतल बेसाल्ट पठार, बारहमासी सड़कों से जुड़ा हुआ।',
    img03Title: '०३ पुनर्वास मार्ग',
    img03Desc: 'घाटी बस्ती को सुरक्षित पठार से जोड़ने वाला पक्का मार्ग।',
    img04Title: '०४ निकटतम अस्पताल',
    img04Desc: 'एम्बुलेंस और आपातकालीन सेवाओं से लैस प्राथमिक स्वास्थ्य केंद्र।',
    img05Title: '०५ निकटतम विद्यालय',
    img05Desc: 'बहुउद्देशीय आपदा आश्रय के रूप में भी उपयोगी आदर्श विद्यालय।',
    img06Title: '०६ पुनर्वास उपरांत दृश्य',
    img06Desc: 'सौर ऊर्जा, चौड़ी सड़कें और सुरक्षित घरों वाली सुनियोजित आधुनिक बस्ती।',

    // Chatbot
    chatbotTitle: 'सुरक्षित धरा AI',
    chatbotPromptHint: 'इस गाँव, जोखिम, स्थानांतरण या पुनर्वास के बारे में पूछें।',
    askChatbotPlaceholder: 'जोखिम, सुरक्षित स्थल या सिमुलेशन के बारे में पूछें...',
    quickWhyRisk: 'यह गाँव जोखिम में क्यों है?',
    quickExplainRedZone: 'रेड ज़ोन को समझाइए',
    quickWhySite: 'यही स्थल क्यों उपयुक्त है?',
    quickCompareSites: 'उम्मीदवार स्थलों की तुलना करें',
    quickExplainCapacity: 'वहन क्षमता समझाइए',
    quickExplainRehab: 'प्रस्तावित पुनर्वास बताइए',
    quickWhatChanges: 'स्थानांतरण के बाद क्या बदलाव आएगा?',
    quickDecisionSummary: 'निर्णय समर्थन सारांश तैयार करें',

    // Risk levels & hazards
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

    // Portal Login
    aiDecisionSupport: 'एआई-आधारित निर्णय सहायता',
    welcomeTitle: 'सुरक्षित धरा में आपका स्वागत है',
    selectPortal: 'अपना पोर्टल चुनें',
    selectPortalDesc: 'महाराष्ट्र आपदा प्रबंधन के लिए अपनी भूमिका के अनुसार पोर्टल चुनें।',
    communityResident: 'समुदाय / नागरिक',
    communityResidentDesc: 'गाँव के जोखिम, पुनर्वास विकल्प और आपातकालीन मार्गदर्शन को समझने के लिए।',
    authorityMgmt: 'प्राधिकरण / आपदा प्रबंधन',
    authorityMgmtDesc: 'सरकार और आपदा प्रबंधन के लिए निर्णय सहायता, रेड ज़ोन विश्लेषण, पुनर्वास योजना और वहन क्षमता।',
    adminSystem: 'प्रशासक / सिस्टम एडमिन',
    adminSystemDesc: 'सिस्टम और डेटा प्रबंधन, उपयोगकर्ता प्रबंधन, जिला कॉन्फ़िगरेशन और मॉडल पैरामीटर के लिए।',
    accessPortal: 'पोर्टल में प्रवेश करें',

    // Help & Helpline
    helpHeaderTitle: 'सुरक्षित धरा आपातकालीन एवं सरकारी संसाधन (Emergency & Government Resources)',
    helpHeaderSubtitle: 'आपातकालीन सहायता प्राप्त करें और सत्यापित सरकारी आपदा प्रबंधन संसाधनों तक पहुँचें।',
    emergencyNowTitle: 'आपातकालीन सहायता चाहिए?',
    emergencyNowSubtitle: 'यदि आप किसी तात्कालिक आपात स्थिति में हैं, तो कृपया संबंधित आधिकारिक आपातकालीन सेवा से संपर्क करें।',
    mhGovTitle: 'महाराष्ट्र सरकार',
    mhGovSubtitle: 'आधिकारिक आपदा प्रबंधन एवं आपातकालीन सेवाएँ',
    officialGovBadge: 'आधिकारिक सरकारी संसाधन',
    districtContactsTitle: 'जिला आपातकालीन संपर्क',
    districtContactsSubtitle: 'महाराष्ट्र के जिलों के कलेक्टर, जिला आपदा प्रबंधन अधिकारी एवं जिला आपातकालीन संचालन केंद्र (DEOC) के संपर्क।',
    viewDistrictContacts: 'जिला संपर्क सूची देखें',
    viewOfficialDistrictContacts: 'आधिकारिक जिला संपर्क देखें',
    selectedDistrictLabel: 'चयनित जिला',
    collectorLabel: 'जिलाधिकारी कार्यालय',
    deocLabel: 'जिला आपातकालीन संचालन केंद्र (DEOC)',
    directoryAuthoritativeNotice: 'अद्यतन जिला आपातकालीन संपर्कों के लिए महाराष्ट्र SDMA की आधिकारिक निर्देशिका ही प्रामाणिक स्रोत है।',
    nationalMgmtTitle: 'राष्ट्रीय आपदा प्रबंधन',
    hazardEarlyWarningTitle: 'खतरा एवं पूर्व चेतावनी',
    hazardEarlyWarningSubtitle: 'वर्तमान चेतावनियों और सलाह के लिए आधिकारिक सरकारी एजेंसियों का उपयोग करें।',
    citizenServicesTitle: 'नागरिक सेवाएँ',
    officialSourcesTitle: 'आधिकारिक सूचना स्रोत',
    officialSourcesDesc: 'सुरक्षित धरा (SURAKSHIT DHARA) आपातकालीन जानकारी, आपदा तैयारी एवं चेतावनियों के लिए आधिकारिक सरकारी संसाधनों के लिंक प्रदान करता है। सक्रिय आपदा के दौरान स्थानीय प्रशासन एवं आधिकारिक एजेंसियों के निर्देशों का पालन करें।',
    verifiedGovNotice: 'आधिकारिक सरकारी पोर्टलों से सत्यापित लिंक।',
    prototypePlatformDisclaimer: 'सुरक्षित धरा एक प्रोटोटाइप निर्णय-सहायता मंच है और यह आधिकारिक सरकारी आपातकालीन सेवा नहीं है।',
    callButton: 'कॉल करें',
    visitButton: 'वेबसाइट देखें',
    viewWarningsButton: 'आधिकारिक चेतावनियाँ देखें',
    localGuidanceTitle: 'स्थानीय आपदा मार्गदर्शन एवं सुरक्षा',
    safetyNoticeTitle: 'सुरक्षा एवं आपातकालीन सूचना'
  }
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
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
  if (lower.includes('coastal')) {
    if (lang === 'mr') return 'किनारपट्टी धूप';
    if (lang === 'hi') return 'तटीय कटाव';
  }
  if (lower.includes('seismic')) {
    if (lang === 'mr') return 'भूकंपीय धोका';
    if (lang === 'hi') return 'भूकंपीय खतरा';
  }
  if (lower.includes('rainfall')) {
    if (lang === 'mr') return 'अतिवृष्टी';
    if (lang === 'hi') return 'अतिवृष्टि';
  }
  if (lower.includes('multi')) {
    if (lang === 'mr') return 'बहु-आपत्ती';
    if (lang === 'hi') return 'बहु-खतरा';
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
