import React from 'react';
import { Layers } from 'lucide-react';
import { Language, t } from '../../lib/i18n';

interface MapLayersCardProps {
  layersVisibility: {
    modelledRedZone: boolean;
    hazardZones: boolean;
    landslideRisk: boolean;
    floodRisk: boolean;
    currentVillage: boolean;
    candidateSite: boolean;
    relocationRoute: boolean;
    planningBoundary: boolean;
    proposedRehabilitation: boolean;
    majorRoads: boolean;
    roadNetwork: boolean;
    hospitalPhc: boolean;
    school: boolean;
    waterSource: boolean;
    contours: boolean;
    riverWater: boolean;
    villageBoundary: boolean;
    satelliteImagery: boolean;
  };
  setLayersVisibility: React.Dispatch<React.SetStateAction<any>>;
  currentLang: Language;
}

export const MapLayersCard: React.FC<MapLayersCardProps> = ({
  layersVisibility,
  setLayersVisibility,
  currentLang
}) => {
  const toggleLayer = (key: string) => {
    setLayersVisibility((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xs font-bold text-[#64748B] uppercase tracking-wider px-1">
        <Layers className="w-3.5 h-3.5 text-[#10B981]" />
        <span>MAP DATA LAYERS (CONTROL BELOW MAP)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* CARD 1: RISK & HAZARDS */}
        <div className="bg-[#111827] border border-[#1E293B] p-3.5 rounded-2xl shadow-sm space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#EF4444] tracking-wider border-b border-[#1E293B] pb-1.5 flex items-center justify-between">
            <span>{t('riskAndHazards', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#EF4444] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.modelledRedZone}
                onChange={() => toggleLayer('modelledRedZone')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#EF4444] focus:ring-0 cursor-pointer accent-[#EF4444]"
              />
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span>{t('modelledRedZone', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.hazardZones}
                onChange={() => toggleLayer('hazardZones')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#EF4444] focus:ring-0 cursor-pointer accent-[#EF4444]"
              />
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{t('hazardZones', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.landslideRisk}
                onChange={() => toggleLayer('landslideRisk')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#EF4444] focus:ring-0 cursor-pointer accent-[#EF4444]"
              />
              <span className="w-2 h-2 rounded-full bg-red-700" />
              <span>{t('landslideRisk', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.floodRisk}
                onChange={() => toggleLayer('floodRisk')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#EF4444] focus:ring-0 cursor-pointer accent-[#EF4444]"
              />
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{t('floodRisk', currentLang)}</span>
            </label>
          </div>
        </div>

        {/* CARD 2: RELOCATION ELEMENTS */}
        <div className="bg-[#111827] border border-[#1E293B] p-3.5 rounded-2xl shadow-sm space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#10B981] tracking-wider border-b border-[#1E293B] pb-1.5 flex items-center justify-between">
            <span>{t('relocationElements', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#10B981] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.currentVillage}
                onChange={() => toggleLayer('currentVillage')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#10B981] focus:ring-0 cursor-pointer accent-[#10B981]"
              />
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span>{t('currentVillage', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#10B981] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.candidateSite}
                onChange={() => toggleLayer('candidateSite')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#10B981] focus:ring-0 cursor-pointer accent-[#10B981]"
              />
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>{t('candidateSite', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#0EA5E9] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.relocationRoute}
                onChange={() => toggleLayer('relocationRoute')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#0EA5E9] focus:ring-0 cursor-pointer accent-[#0EA5E9]"
              />
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
              <span>{t('relocationRoute', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.planningBoundary}
                onChange={() => toggleLayer('planningBoundary')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#10B981] focus:ring-0 cursor-pointer accent-[#10B981]"
              />
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span>{t('planningBoundary', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.proposedRehabilitation}
                onChange={() => toggleLayer('proposedRehabilitation')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#10B981] focus:ring-0 cursor-pointer accent-[#10B981]"
              />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Proposed Rehabilitation Layout</span>
            </label>
          </div>
        </div>

        {/* CARD 3: INFRASTRUCTURE */}
        <div className="bg-[#111827] border border-[#1E293B] p-3.5 rounded-2xl shadow-sm space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#0EA5E9] tracking-wider border-b border-[#1E293B] pb-1.5 flex items-center justify-between">
            <span>{t('infrastructure', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#0EA5E9] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.majorRoads}
                onChange={() => toggleLayer('majorRoads')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#0EA5E9] focus:ring-0 cursor-pointer accent-[#0EA5E9]"
              />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>{t('majorRoads', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.hospitalPhc}
                onChange={() => toggleLayer('hospitalPhc')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#0EA5E9] focus:ring-0 cursor-pointer accent-[#0EA5E9]"
              />
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{t('hospitalPhc', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.school}
                onChange={() => toggleLayer('school')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#0EA5E9] focus:ring-0 cursor-pointer accent-[#0EA5E9]"
              />
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{t('school', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.waterSource}
                onChange={() => toggleLayer('waterSource')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#0EA5E9] focus:ring-0 cursor-pointer accent-[#0EA5E9]"
              />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{t('waterSource', currentLang)}</span>
            </label>
          </div>
        </div>

        {/* CARD 4: TERRAIN & CONTEXT */}
        <div className="bg-[#111827] border border-[#1E293B] p-3.5 rounded-2xl shadow-sm space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#F59E0B] tracking-wider border-b border-[#1E293B] pb-1.5 flex items-center justify-between">
            <span>{t('terrainAndContext', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#F8FAFC] hover:text-[#F59E0B] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.satelliteImagery}
                onChange={() => toggleLayer('satelliteImagery')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#F59E0B] focus:ring-0 cursor-pointer accent-[#F59E0B]"
              />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t('satelliteImagery', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.contours}
                onChange={() => toggleLayer('contours')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#F59E0B] focus:ring-0 cursor-pointer accent-[#F59E0B]"
              />
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t('contours', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.riverWater}
                onChange={() => toggleLayer('riverWater')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#F59E0B] focus:ring-0 cursor-pointer accent-[#F59E0B]"
              />
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>{t('riverWater', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.villageBoundary}
                onChange={() => toggleLayer('villageBoundary')}
                className="w-3.5 h-3.5 rounded bg-[#16202B] border-[#1E293B] text-[#F59E0B] focus:ring-0 cursor-pointer accent-[#F59E0B]"
              />
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>{t('villageBoundary', currentLang)}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
