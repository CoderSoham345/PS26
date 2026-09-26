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
      <div className="flex items-center space-x-2 text-xs font-bold text-[#66736D] uppercase tracking-wider px-1">
        <Layers className="w-3.5 h-3.5 text-[#087F5B]" />
        <span>MAP DATA LAYERS (CONTROL BELOW MAP)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* CARD 1: RISK & HAZARDS */}
        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-3.5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#DC3545] tracking-wider border-b border-[#E8EFEB] pb-1.5 flex items-center justify-between">
            <span>{t('riskAndHazards', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#DC3545]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#DC3545] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.modelledRedZone}
                onChange={() => toggleLayer('modelledRedZone')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#DC3545] focus:ring-0 cursor-pointer accent-[#DC3545]"
              />
              <span className="w-2 h-2 rounded-full bg-[#DC3545]" />
              <span className="font-semibold">{t('modelledRedZone', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.hazardZones}
                onChange={() => toggleLayer('hazardZones')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#DC3545] focus:ring-0 cursor-pointer accent-[#DC3545]"
              />
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{t('hazardZones', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.landslideRisk}
                onChange={() => toggleLayer('landslideRisk')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#DC3545] focus:ring-0 cursor-pointer accent-[#DC3545]"
              />
              <span className="w-2 h-2 rounded-full bg-red-700" />
              <span>{t('landslideRisk', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.floodRisk}
                onChange={() => toggleLayer('floodRisk')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#DC3545] focus:ring-0 cursor-pointer accent-[#DC3545]"
              />
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{t('floodRisk', currentLang)}</span>
            </label>
          </div>
        </div>

        {/* CARD 2: RELOCATION ELEMENTS */}
        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-3.5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#087F5B] tracking-wider border-b border-[#E8EFEB] pb-1.5 flex items-center justify-between">
            <span>{t('relocationElements', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#087F5B] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.currentVillage}
                onChange={() => toggleLayer('currentVillage')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-[#DC3545]" />
              <span className="font-semibold">{t('currentVillage', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#087F5B] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.candidateSite}
                onChange={() => toggleLayer('candidateSite')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
              <span className="font-semibold">{t('candidateSite', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#0284C7] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.relocationRoute}
                onChange={() => toggleLayer('relocationRoute')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#0284C7] focus:ring-0 cursor-pointer accent-[#0284C7]"
              />
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span className="font-semibold">{t('relocationRoute', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.planningBoundary}
                onChange={() => toggleLayer('planningBoundary')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-[#18A874]" />
              <span>{t('planningBoundary', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.proposedRehabilitation}
                onChange={() => toggleLayer('proposedRehabilitation')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Proposed Rehabilitation Layout</span>
            </label>
          </div>
        </div>

        {/* CARD 3: INFRASTRUCTURE */}
        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-3.5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#0284C7] tracking-wider border-b border-[#E8EFEB] pb-1.5 flex items-center justify-between">
            <span>{t('infrastructure', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#0284C7] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.majorRoads}
                onChange={() => toggleLayer('majorRoads')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#0284C7] focus:ring-0 cursor-pointer accent-[#0284C7]"
              />
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>{t('majorRoads', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.hospitalPhc}
                onChange={() => toggleLayer('hospitalPhc')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#0284C7] focus:ring-0 cursor-pointer accent-[#0284C7]"
              />
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{t('hospitalPhc', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.school}
                onChange={() => toggleLayer('school')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#0284C7] focus:ring-0 cursor-pointer accent-[#0284C7]"
              />
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{t('school', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.waterSource}
                onChange={() => toggleLayer('waterSource')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#0284C7] focus:ring-0 cursor-pointer accent-[#0284C7]"
              />
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>{t('waterSource', currentLang)}</span>
            </label>
          </div>
        </div>

        {/* CARD 4: TERRAIN & CONTEXT */}
        <div className="bg-white border border-[#DCE7E1] hover:border-[#B8E5D2] p-3.5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] space-y-2">
          <h4 className="text-[11px] font-black uppercase text-[#D97706] tracking-wider border-b border-[#E8EFEB] pb-1.5 flex items-center justify-between">
            <span>{t('terrainAndContext', currentLang)}</span>
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-[#17221D] hover:text-[#087F5B] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.satelliteImagery}
                onChange={() => toggleLayer('satelliteImagery')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
              <span className="font-semibold">{t('satelliteImagery', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.contours}
                onChange={() => toggleLayer('contours')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t('contours', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.riverWater}
                onChange={() => toggleLayer('riverWater')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>{t('riverWater', currentLang)}</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-[#66736D] hover:text-[#17221D] transition-colors">
              <input
                type="checkbox"
                checked={layersVisibility.villageBoundary}
                onChange={() => toggleLayer('villageBoundary')}
                className="w-3.5 h-3.5 rounded border-[#DCE7E1] text-[#087F5B] focus:ring-0 cursor-pointer accent-[#087F5B]"
              />
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>{t('villageBoundary', currentLang)}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
