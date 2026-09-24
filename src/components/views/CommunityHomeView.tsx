import React, { useState } from 'react';
import { Shield, Search, ChevronRight, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Habitation } from '../../types';
import { PILOT_DISTRICTS } from '../../data/pilotData';

interface CommunityHomeViewProps {
  selectedDistrict: string;
  setSelectedDistrict: (d: string) => void;
  selectedVillage: Habitation;
  setSelectedVillage: (v: Habitation) => void;
  onNavigate: (tab: string) => void;
  currentLang: string;
  setLang: (l: string) => void;
  onSwitchToAuthority: () => void;
}

export const CommunityHomeView: React.FC<CommunityHomeViewProps> = ({
  selectedDistrict,
  setSelectedDistrict,
  selectedVillage,
  setSelectedVillage,
  onNavigate,
  currentLang,
  setLang,
  onSwitchToAuthority
}) => {
  const currentDistrictData = PILOT_DISTRICTS[selectedDistrict.toLowerCase()] || PILOT_DISTRICTS['raigad'];
  const [search, setSearch] = useState('');

  const translations = {
    en: {
      title: "Is your village safe?",
      subtitle: "Safer Communities. Resilient Tomorrow. Maharashtra Disaster Relief & Relocation Support.",
      selectDistrict: "Select District",
      selectVillage: "Select Your Village / Habitation",
      checkStatus: "Check Village Safety Status",
      switchAuth: "Switch to Authority / Advanced View",
      badge: "Community & Resident Portal"
    },
    mr: {
      title: "तुमचं गाव सुरक्षित आहे का?",
      subtitle: "सुरक्षित समुदाय. लवचिक उद्या. महाराष्ट्र आपत्ती मदत आणि स्थलांतर सहाय्य.",
      selectDistrict: "जिल्हा निवडा",
      selectVillage: "तुमचे गाव / वाडी निवडा",
      checkStatus: "गावाची सुरक्षितता तपासा",
      switchAuth: "अधिकारी / प्रगत दृश्यात जा",
      badge: "समुदाय आणि नागरिक पोर्टल"
    },
    hi: {
      title: "क्या आपका गाँव सुरक्षित है?",
      subtitle: "सुरक्षित समुदाय। लचीला कल। महाराष्ट्र आपदा राहत और पुनर्वास सहायता।",
      selectDistrict: "जिला चुनें",
      selectVillage: "अपना गाँव / बस्ती चुनें",
      checkStatus: "गाँव की सुरक्षा स्थिति जांचें",
      switchAuth: "अधिकारी / उन्नत दृश्य पर स्विच करें",
      badge: "समुदाय और नागरिक पोर्टल"
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-fadeIn">
      {/* Top Bar with Language & Authority Switch */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#DCE7E1] p-4 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-[#087F5B]" />
          <div className="flex space-x-1">
            {[
              { code: 'en', label: 'English' },
              { code: 'mr', label: 'मराठी' },
              { code: 'hi', label: 'हिंदी' },
            ].map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  currentLang === l.code ? 'bg-[#087F5B] text-white shadow-sm' : 'bg-[#F6F9F7] text-slate-600 hover:text-[#17221D]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSwitchToAuthority}
          className="px-4 py-2 bg-[#E7F6EF] hover:bg-[#087F5B] hover:text-white text-[#087F5B] text-xs font-bold rounded-xl transition-colors border border-[#087F5B]/30 flex items-center space-x-1.5"
        >
          <span>[ AUTHORITY / ADVANCED VIEW ]</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white border border-[#DCE7E1] p-8 sm:p-12 rounded-3xl shadow-sm text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-[#E7F6EF] text-[#087F5B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#087F5B]/30">
          <Shield className="w-4 h-4" />
          <span>{t.badge}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17221D] tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Selection Box */}
        <div className="max-w-xl mx-auto bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-2xl text-left space-y-4 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.selectDistrict}</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-white border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs font-semibold text-[#17221D] focus:outline-none focus:border-[#087F5B]"
              >
                {['Raigad', 'Ratnagiri', 'Pune', 'Satara', 'Sindhudurg'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.selectVillage}</label>
              <select
                value={selectedVillage.id}
                onChange={(e) => {
                  const found = currentDistrictData.targetVillages.find(v => v.id === e.target.value);
                  if (found) setSelectedVillage(found);
                }}
                className="w-full bg-white border border-[#DCE7E1] rounded-xl px-4 py-3 text-xs font-semibold text-[#17221D] focus:outline-none focus:border-[#087F5B]"
              >
                {currentDistrictData.targetVillages.map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.primaryHazard})</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => onNavigate('my-village')}
            className="w-full py-4 bg-[#087F5B] hover:bg-[#07543F] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>{t.checkStatus}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Pilot Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#DCE7E1]">
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Pilot Districts</div>
            <div className="text-xl font-black text-[#087F5B]">5</div>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Target Villages</div>
            <div className="text-xl font-black text-[#17221D]">20</div>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Safe Sites</div>
            <div className="text-xl font-black text-[#087F5B]">10+</div>
          </div>
          <div className="p-3 bg-[#F6F9F7] rounded-xl border border-[#DCE7E1]">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Status</div>
            <div className="text-xs font-bold text-teal-700 mt-1">Prototype Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};
