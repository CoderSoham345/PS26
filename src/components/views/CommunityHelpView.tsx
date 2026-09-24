import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowLeft, PhoneCall, ShieldAlert, HeartPulse, Building2, Flame, Users, CheckCircle2 } from 'lucide-react';
import { Habitation } from '../../types';
import { Language, t } from '../../lib/i18n';

interface CommunityHelpViewProps {
  selectedVillage: Habitation;
  onNavigate: (tab: string) => void;
  currentLang: Language;
}

export const CommunityHelpView: React.FC<CommunityHelpViewProps> = ({ selectedVillage, onNavigate, currentLang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 px-4 sm:px-0 animate-fadeIn">
      <button
        onClick={() => onNavigate('my-village')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F5B] hover:underline min-h-[44px] px-2 py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('commVillage', currentLang)}</span>
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#087F5B] to-[#07543F] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-3">
        <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
          {t('commHelp', currentLang)}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black">{t('helpTitle', currentLang)}</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          {t('helpSubtitle', currentLang)} ({selectedVillage.name})
        </p>
      </div>

      {/* Emergency Help & Services Cards */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#17221D] flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-red-600" />
            <span>{t('emergencyServicesTitle', currentLang)}</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">{t('emergencyServicesDesc', currentLang)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{t('policeService', currentLang)}</h3>
              <div className="text-xl font-black text-red-600 font-mono mt-1">112 / 100</div>
            </div>
            <span className="text-[10px] text-red-700 bg-red-100 px-2.5 py-1 rounded-lg font-semibold inline-block text-center">
              {t('prototypeVerifyLabel', currentLang)}
            </span>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{t('fireService', currentLang)}</h3>
              <div className="text-xl font-black text-amber-700 font-mono mt-1">101</div>
            </div>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg font-semibold inline-block text-center">
              {t('prototypeVerifyLabel', currentLang)}
            </span>
          </div>

          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center mb-3">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{t('ambulanceService', currentLang)}</h3>
              <div className="text-xl font-black text-[#087F5B] font-mono mt-1">108</div>
            </div>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg font-semibold inline-block text-center">
              {t('prototypeVerifyLabel', currentLang)}
            </span>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{t('disasterMgmt', currentLang)}</h3>
              <div className="text-sm font-bold text-blue-800 font-mono mt-1">District Control Room</div>
            </div>
            <span className="text-[10px] text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg font-semibold inline-block text-center">
              {t('prototypeVerifyLabel', currentLang)}
            </span>
          </div>
        </div>
      </div>

      {/* Local Disaster Guidance */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#17221D] flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>{t('localGuidanceTitle', currentLang)}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">{t('landslideGuidance', currentLang)}</div>
            <p className="text-xs text-slate-700 leading-relaxed">{t('landslideDesc', currentLang)}</p>
          </div>
          <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">{t('floodGuidance', currentLang)}</div>
            <p className="text-xs text-slate-700 leading-relaxed">{t('floodDesc', currentLang)}</p>
          </div>
          <div className="p-5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">{t('evacuationGuidance', currentLang)}</div>
            <p className="text-xs text-slate-700 leading-relaxed">{t('evacuationDesc', currentLang)}</p>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="p-5 bg-[#E7F6EF] border border-[#087F5B]/30 rounded-2xl space-y-2">
          <div className="text-sm font-extrabold text-[#17221D]">{t('needHelp', currentLang)}</div>
          <div className="text-xs text-slate-700 space-y-1">
            <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>{t('evacuatePrompt', currentLang)}</span></div>
            <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" /><span>{t('avoidFloods', currentLang)}</span></div>
          </div>
        </div>
      </div>

      {/* Important Contacts */}
      <div className="bg-white border border-[#DCE7E1] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#17221D] flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#087F5B]" />
            <span>{t('importantContactsTitle', currentLang)}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
            <div className="font-bold text-[#17221D]">{t('sarpanchOffice', currentLang)}</div>
            <div className="text-slate-500 font-mono">[Official local number]</div>
          </div>
          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
            <div className="font-bold text-[#17221D]">{t('healthCentre', currentLang)}</div>
            <div className="text-slate-500 font-mono">[PHC Emergency line]</div>
          </div>
          <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-1">
            <div className="font-bold text-[#17221D]">{t('shelterManager', currentLang)}</div>
            <div className="text-slate-500 font-mono">[Local coordinator]</div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 leading-relaxed text-center">
          {t('disclaimer', currentLang)}
        </div>
      </div>
    </div>
  );
};
