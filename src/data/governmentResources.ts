export interface OfficialResource {
  id: string;
  category: 'emergency' | 'maharashtra' | 'district' | 'national' | 'warning' | 'citizen';
  name: string;
  nameMr: string;
  nameHi: string;
  description: string;
  descriptionMr: string;
  descriptionHi: string;
  url?: string;
  phone?: string;
  telUri?: string;
  buttonText: string;
  buttonTextMr: string;
  buttonTextHi: string;
  badge?: string;
  badgeMr?: string;
  badgeHi?: string;
  iconName: string;
  accentColor?: string;
}

export interface DistrictEmergencyContact {
  id: string;
  district: string;
  districtMr: string;
  districtHi: string;
  collectorPhone: string;
  collectorTel: string;
  deocPhone: string;
  deocTel: string;
  notes?: string;
}

// Authoritative verified contacts from Maharashtra SDMA Official Directory
export const VERIFIED_DISTRICT_CONTACTS: Record<string, DistrictEmergencyContact> = {
  raigad: {
    id: 'raigad',
    district: 'Raigad',
    districtMr: 'रायगड',
    districtHi: 'रायगढ़',
    collectorPhone: '02141-222097',
    collectorTel: 'tel:02141222097',
    deocPhone: '02141-222097',
    deocTel: 'tel:02141222097',
    notes: 'District Collector Office & DEOC Alibag'
  },
  ratnagiri: {
    id: 'ratnagiri',
    district: 'Ratnagiri',
    districtMr: 'रत्नागिरी',
    districtHi: 'रत्नागिरी',
    collectorPhone: '02352-222301',
    collectorTel: 'tel:02352222301',
    deocPhone: '02352-222233',
    deocTel: 'tel:02352222233',
    notes: 'District Collector Office & DEOC Ratnagiri'
  },
  pune: {
    id: 'pune',
    district: 'Pune',
    districtMr: 'पुणे',
    districtHi: 'पुणे',
    collectorPhone: '020-26114949',
    collectorTel: 'tel:02026114949',
    deocPhone: '020-26123371',
    deocTel: 'tel:02026123371',
    notes: 'District Collector Office & DEOC Pune'
  },
  satara: {
    id: 'satara',
    district: 'Satara',
    districtMr: 'सातारा',
    districtHi: 'सतारा',
    collectorPhone: '02162-232750',
    collectorTel: 'tel:02162232750',
    deocPhone: '02162-232349',
    deocTel: 'tel:02162232349',
    notes: 'District Collector Office & DEOC Satara'
  },
  sindhudurg: {
    id: 'sindhudurg',
    district: 'Sindhudurg',
    districtMr: 'सिंधुदुर्ग',
    districtHi: 'सिंधुदुर्ग',
    collectorPhone: '02362-228844',
    collectorTel: 'tel:02362228844',
    deocPhone: '02362-228844',
    deocTel: 'tel:02362228844',
    notes: 'District Collector Office & DEOC Oros / Sindhudurg'
  }
};

export const OFFICIAL_GOVERNMENT_RESOURCES: OfficialResource[] = [
  // 1. EMERGENCY HELPLINES
  {
    id: 'emergency-1070',
    category: 'emergency',
    name: 'Disaster Response & Relief',
    nameMr: 'आपत्ती निवारण व मदत कार्य',
    nameHi: 'आपदा मोचन एवं राहत कार्य',
    description: 'Maharashtra disaster response and relief helpline',
    descriptionMr: 'महाराष्ट्र राज्य आपत्ती निवारण व मदत कार्य हेल्पलाइन',
    descriptionHi: 'महाराष्ट्र आपदा मोचन एवं राहत कार्य हेल्पलाइन',
    phone: '1070',
    telUri: 'tel:1070',
    buttonText: 'CALL 1070',
    buttonTextMr: '१०७० वर कॉल करा',
    buttonTextHi: '१०७० पर कॉल करें',
    badge: 'Toll-Free',
    badgeMr: 'टोल-फ्री',
    badgeHi: 'टोल-फ्री',
    iconName: 'PhoneCall',
    accentColor: '#DC3545',
    url: 'https://rnr.maharashtra.gov.in/en/helpline/disaster-response-and-relief-2/'
  },
  {
    id: 'emergency-112',
    category: 'emergency',
    name: 'Police / Emergency',
    nameMr: 'पोलीस / आपत्कालीन सेवा',
    nameHi: 'पुलिस / आपातकालीन सेवा',
    description: 'Universal emergency response number',
    descriptionMr: 'एकात्मिक आपत्कालीन प्रतिसाद प्रणाली',
    descriptionHi: 'एकीकृत आपातकालीन प्रतिक्रिया नंबर',
    phone: '112',
    telUri: 'tel:112',
    buttonText: 'CALL 112',
    buttonTextMr: '११२ वर कॉल करा',
    buttonTextHi: '११२ पर कॉल करें',
    badge: 'Universal Emergency',
    badgeMr: 'सर्वसमावेशक',
    badgeHi: 'सार्वभौमिक',
    iconName: 'ShieldAlert',
    accentColor: '#DC3545',
    url: 'https://sdma.maharashtra.gov.in/en/'
  },
  {
    id: 'emergency-108',
    category: 'emergency',
    name: 'Ambulance',
    nameMr: 'रुग्णवाहिका / वैद्यकीय सेवा',
    nameHi: 'एम्बुलेंस / चिकित्सा सेवा',
    description: 'Emergency ambulance service',
    descriptionMr: 'तात्काळ रुग्णवाहिका व वैद्यकीय आपत्कालीन सेवा',
    descriptionHi: 'आपातकालीन एम्बुलेंस व चिकित्सा सेवा',
    phone: '108',
    telUri: 'tel:108',
    buttonText: 'CALL 108',
    buttonTextMr: '१०८ वर कॉल करा',
    buttonTextHi: '१०८ पर कॉल करें',
    badge: 'Medical Toll-Free',
    badgeMr: 'वैद्यकीय',
    badgeHi: 'चिकित्सीय',
    iconName: 'HeartPulse',
    accentColor: '#DC3545',
    url: 'https://sdma.maharashtra.gov.in/en/'
  },
  {
    id: 'emergency-seoc',
    category: 'emergency',
    name: 'State Emergency Operations Centre',
    nameMr: 'राज्य आपत्कालीन कार्य केंद्र (SEOC)',
    nameHi: 'राज्य आपातकालीन संचालन केंद्र (SEOC)',
    description: 'Maharashtra State Emergency Operations Centre',
    descriptionMr: 'महाराष्ट्र राज्य आपत्कालीन कार्य केंद्र नियंत्रण कक्ष',
    descriptionHi: 'महाराष्ट्र राज्य आपातकालीन संचालन केंद्र नियंत्रण कक्ष',
    phone: '+91 9321587143',
    telUri: 'tel:+919321587143',
    buttonText: 'CALL SEOC',
    buttonTextMr: 'SEOC वर कॉल करा',
    buttonTextHi: 'SEOC पर कॉल करें',
    badge: 'State Operations',
    badgeMr: 'राज्य नियंत्रण कक्ष',
    badgeHi: 'राज्य नियंत्रण कक्ष',
    iconName: 'Building2',
    accentColor: '#087F5B',
    url: 'https://rnr.maharashtra.gov.in/en/'
  },

  // 2. MAHARASHTRA GOVERNMENT DISASTER MANAGEMENT
  {
    id: 'maharashtra-sdma',
    category: 'maharashtra',
    name: 'Maharashtra State Disaster Management Authority',
    nameMr: 'महाराष्ट्र राज्य आपत्ती व्यवस्थापन प्राधिकरण',
    nameHi: 'महाराष्ट्र राज्य आपदा प्रबंधन प्राधिकरण',
    description: 'Official Maharashtra authority for disaster management, preparedness, response, mitigation and emergency information.',
    descriptionMr: 'आपत्ती व्यवस्थापन, पूर्वतयारी, प्रतिसाद आणि आपत्कालीन मार्गदर्शनासाठी अधिकृत महाराष्ट्र प्राधिकरण.',
    descriptionHi: 'आपदा प्रबंधन, तत्परता, राहत एवं आपातकालीन जानकारी हेतु आधिकारिक महाराष्ट्र प्राधिकरण।',
    url: 'https://sdma.maharashtra.gov.in/en/',
    buttonText: 'VISIT SDMA',
    buttonTextMr: 'SDMA संकेतस्थळास भेट द्या',
    buttonTextHi: 'SDMA वेबसाइट देखें',
    badge: 'Official',
    badgeMr: 'अधिकृत',
    badgeHi: 'आधिकारिक',
    iconName: 'ShieldCheck'
  },
  {
    id: 'maharashtra-rnr',
    category: 'maharashtra',
    name: 'Maharashtra State Relief & Rehabilitation Department',
    nameMr: 'मदत व पुनर्वसन विभाग, महाराष्ट्र शासन',
    nameHi: 'राहत एवं पुनर्वास विभाग, महाराष्ट्र सरकार',
    description: 'Official Maharashtra government department for disaster response, relief and rehabilitation.',
    descriptionMr: 'आपत्ती प्रतिसाद, मदत व पुनर्वसन कार्यासाठी महाराष्ट्र शासनाचा अधिकृत विभाग.',
    descriptionHi: 'आपदा प्रतिक्रिया, राहत एवं पुनर्वास कार्यों के लिए महाराष्ट्र सरकार का आधिकारिक विभाग।',
    url: 'https://rnr.maharashtra.gov.in/en/',
    buttonText: 'VISIT DEPARTMENT',
    buttonTextMr: 'विभागाच्या संकेतस्थळास भेट द्या',
    buttonTextHi: 'विभाग की वेबसाइट देखें',
    badge: 'Official',
    badgeMr: 'अधिकृत',
    badgeHi: 'आधिकारिक',
    iconName: 'LifeBuoy'
  },

  // 3. NATIONAL DISASTER MANAGEMENT
  {
    id: 'ndma',
    category: 'national',
    name: 'National Disaster Management Authority (NDMA)',
    nameMr: 'राष्ट्रीय आपत्ती व्यवस्थापन प्राधिकरण (NDMA)',
    nameHi: 'राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)',
    description: "Government of India's national disaster management authority.",
    descriptionMr: 'भारत सरकारचे सर्वोच्च राष्ट्रीय आपत्ती व्यवस्थापन प्राधिकरण.',
    descriptionHi: 'भारत सरकार का शीर्ष राष्ट्रीय आपदा प्रबंधन प्राधिकरण।',
    url: 'https://ndma.gov.in/',
    buttonText: 'VISIT NDMA',
    buttonTextMr: 'NDMA संकेतस्थळास भेट द्या',
    buttonTextHi: 'NDMA वेबसाइट देखें',
    badge: 'Government of India',
    badgeMr: 'भारत सरकार',
    badgeHi: 'भारत सरकार',
    iconName: 'Shield'
  },
  {
    id: 'ndrf',
    category: 'national',
    name: 'National Disaster Response Force (NDRF)',
    nameMr: 'राष्ट्रीय आपत्ती प्रतिसाद दल (NDRF)',
    nameHi: 'राष्ट्रीय आपदा मोचन बल (NDRF)',
    description: 'Specialized national disaster response and rescue force under the Ministry of Home Affairs.',
    descriptionMr: 'गृह मंत्रालयांतर्गत विशेष राष्ट्रीय आपत्ती प्रतिसाद व बचाव दल.',
    descriptionHi: 'गृह मंत्रालय के अधीन विशेष राष्ट्रीय आपदा प्रतिक्रिया एवं बचाव बल।',
    url: 'https://www.ndrf.gov.in/',
    buttonText: 'VISIT NDRF',
    buttonTextMr: 'NDRF संकेतस्थळास भेट द्या',
    buttonTextHi: 'NDRF वेबसाइट देखें',
    badge: 'Rescue Force',
    badgeMr: 'बचाव दल',
    badgeHi: 'बचाव बल',
    iconName: 'Users'
  },
  {
    id: '112-india',
    category: 'national',
    name: '112 India (Emergency Response Support System)',
    nameMr: '११२ इंडिया (एकात्मिक आपत्कालीन प्रतिसाद प्रणाली)',
    nameHi: '११२ इंडिया (आपातकालीन प्रतिक्रिया सहायता प्रणाली)',
    description: "India's integrated emergency response number.",
    descriptionMr: "भारताचा एकात्मिक एकल आपत्कालीन प्रतिसाद क्रमांक.",
    descriptionHi: "भारत का एकीकृत एकल आपातकालीन प्रतिक्रिया नंबर।",
    url: 'https://112.gov.in/',
    phone: '112',
    telUri: 'tel:112',
    buttonText: 'VISIT 112 INDIA',
    buttonTextMr: '112 INDIA संकेतस्थळ',
    buttonTextHi: '112 INDIA वेबसाइट',
    badge: 'National Helpline',
    badgeMr: 'राष्ट्रीय हेल्पलाइन',
    badgeHi: 'राष्ट्रीय हेल्पलाइन',
    iconName: 'Phone'
  },

  // 4. HAZARD & EARLY WARNING RESOURCES
  {
    id: 'imd',
    category: 'warning',
    name: 'India Meteorological Department (IMD)',
    nameMr: 'भारतीय हवामान विभाग (IMD)',
    nameHi: 'भारत मौसम विज्ञान विभाग (IMD)',
    description: 'Official weather forecasts and warnings including heavy rainfall, thunderstorms, cyclones, heat waves and other weather hazards.',
    descriptionMr: 'मुसळधार पाऊस, चक्रीवादळ आणि हवामान विषयक धोक्यांची अधिकृत पूर्वसूचना व अंदाज.',
    descriptionHi: 'भारी वर्षा, चक्रवात एवं मौसम संबंधी खतरों का आधिकारिक पूर्वानुमान एवं चेतावनी।',
    url: 'https://mausam.imd.gov.in/',
    buttonText: 'VIEW WEATHER WARNINGS',
    buttonTextMr: 'हवामान इशारे पहा',
    buttonTextHi: 'मौसम चेतावनियाँ देखें',
    badge: 'Weather & Cyclone',
    badgeMr: 'हवामान पूर्वसूचना',
    badgeHi: 'मौसम पूर्वानुमान',
    iconName: 'CloudRain'
  },
  {
    id: 'cwc',
    category: 'warning',
    name: 'Central Water Commission (CWC)',
    nameMr: 'केंद्रीय जल आयोग (CWC)',
    nameHi: 'केंद्रीय जल आयोग (CWC)',
    description: 'Official flood, river-level and water-resources information.',
    descriptionMr: 'नद्यांची पाणीपातळी, धरणे आणि पुराची अधिकृत केंद्रीय माहिती.',
    descriptionHi: 'नदियों का जलस्तर, बाँध एवं बाढ़ संबंधी आधिकारिक केंद्रीय जानकारी।',
    url: 'https://cwc.gov.in/',
    buttonText: 'VIEW FLOOD INFORMATION',
    buttonTextMr: 'पूरविषयक माहिती पहा',
    buttonTextHi: 'बाढ़ संबंधी जानकारी देखें',
    badge: 'Flood & River Levels',
    badgeMr: 'पूर इशारा',
    badgeHi: 'बाढ़ चेतावनी',
    iconName: 'Droplets'
  },
  {
    id: 'incois',
    category: 'warning',
    name: 'Indian National Centre for Ocean Information Services (INCOIS)',
    nameMr: 'भारतीय राष्ट्रीय महासागर माहिती सेवा केंद्र (INCOIS)',
    nameHi: 'भारतीय राष्ट्रीय महासागर सूचना सेवा केंद्र (INCOIS)',
    description: 'Official ocean information, tsunami and coastal hazard advisories.',
    descriptionMr: 'त्सुनामी, भरती-ओहोटी व सागरी किनारपट्टी धोक्यांच्या अधिकृत सूचना.',
    descriptionHi: 'सुनामी, ज्वार-भाटा एवं तटीय खतरों की आधिकारिक सलाह।',
    url: 'https://incois.gov.in/',
    buttonText: 'VIEW OCEAN ALERTS',
    buttonTextMr: 'सागरी इशारे पहा',
    buttonTextHi: 'महासागरीय अलर्ट देखें',
    badge: 'Tsunami & Ocean Advisories',
    badgeMr: 'सागरी सुरक्षा',
    badgeHi: 'तटीय सुरक्षा',
    iconName: 'Waves'
  },
  {
    id: 'ncs',
    category: 'warning',
    name: 'National Centre for Seismology (NCS)',
    nameMr: 'राष्ट्रीय भूकंप विज्ञान केंद्र (NCS)',
    nameHi: 'राष्ट्रीय भूकंप विज्ञान केंद्र (NCS)',
    description: 'Official earthquake information and seismic monitoring.',
    descriptionMr: 'भूकंप नोंद, धक्के आणि भूगर्भीय हालचालींचे अधिकृत संनियंत्रण.',
    descriptionHi: 'भूकंप की निगरानी एवं भूगर्भीय गतिविधियों की आधिकारिक जानकारी।',
    url: 'https://seismo.gov.in/',
    buttonText: 'VIEW EARTHQUAKE INFORMATION',
    buttonTextMr: 'भूकंप माहिती पहा',
    buttonTextHi: 'भूकंप जानकारी देखें',
    badge: 'Seismic Monitoring',
    badgeMr: 'भूकंप संनियंत्रण',
    badgeHi: 'भूकंपीय निगरानी',
    iconName: 'Activity'
  },

  // 5. MAHARASHTRA CITIZEN SERVICES
  {
    id: 'aaple-sarkar',
    category: 'citizen',
    name: 'Aaple Sarkar Portal',
    nameMr: 'आपले सरकार पोर्टल',
    nameHi: 'आपले सरकार पोर्टल',
    description: 'Maharashtra Government citizen services portal.',
    descriptionMr: 'महाराष्ट्र शासनाचे अधिकृत नागरिक सेवा पोर्टल.',
    descriptionHi: 'महाराष्ट्र सरकार का आधिकारिक नागरिक सेवा पोर्टल।',
    url: 'https://aaplesarkar.mahaonline.gov.in/',
    buttonText: 'VISIT AAPLE SARKAR',
    buttonTextMr: 'आपले सरकार पोर्टल पहा',
    buttonTextHi: 'आपले सरकार पोर्टल देखें',
    badge: 'Citizen Services',
    badgeMr: 'नागरिक सेवा',
    badgeHi: 'नागरिक सेवाएँ',
    iconName: 'Landmark'
  }
];

export const SDMA_DIRECTORY_URLS = {
  en: 'https://sdma.maharashtra.gov.in/en/district-emergency-contact-directory-maharashtra/',
  mr: 'https://sdma.maharashtra.gov.in/emergency-contacts/',
  hi: 'https://sdma.maharashtra.gov.in/en/district-emergency-contact-directory-maharashtra/'
};
