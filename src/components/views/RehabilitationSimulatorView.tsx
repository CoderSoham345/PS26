import React, { useState } from 'react';
import { Habitation, RelocationSite } from '../../types';
import { Language } from '../../lib/i18n';
import { StageController } from '../simulator/StageController';
import { SimulatorMap } from '../simulator/SimulatorMap';
import { ComparisonSlider } from '../simulator/ComparisonSlider';
import { MapInsightCard } from '../simulator/MapInsightCard';
import { MapLayersCard } from '../simulator/MapLayersCard';
import { DecisionSupportSummary } from '../simulator/DecisionSupportSummary';
import { AIVisualGallery } from '../simulator/AIVisualGallery';
import { AnalyticsPanel } from '../simulator/AnalyticsPanel';

interface RehabilitationSimulatorViewProps {
  habitation: Habitation;
  site: RelocationSite;
  allSites?: RelocationSite[];
  currentLang?: Language;
  onSelectSite?: (s: RelocationSite) => void;
  stage: 'before' | 'relocation' | 'after';
  setStage: (stage: 'before' | 'relocation' | 'after') => void;
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
}

export const RehabilitationSimulatorView: React.FC<RehabilitationSimulatorViewProps> = ({
  habitation,
  site,
  allSites = [],
  currentLang = 'en',
  onSelectSite,
  stage,
  setStage,
  layersVisibility,
  setLayersVisibility
}) => {
  const [comparisonSplit, setComparisonSplit] = useState<number>(50);

  return (
    <div className="space-y-4 pb-12 animate-fadeIn font-sans text-[#F8FAFC]">
      {/* 1. TOP SIMULATOR WORKFLOW HEADER */}
      <StageController
        habitation={habitation}
        site={site}
        stage={stage}
        setStage={setStage}
        currentLang={currentLang}
      />

      {/* 2. MAIN GIS WORKSPACE & RIGHT ANALYTICS DESKTOP COMPOSITION */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* CENTER / LEFT: MAIN HERO GIS WORKSPACE */}
        <div className="flex-1 w-full space-y-4 min-w-0">
          {/* Main Hero GIS Map */}
          <SimulatorMap
            habitation={habitation}
            site={site}
            stage={stage}
            layersVisibility={layersVisibility}
            currentLang={currentLang}
            onSelectSite={onSelectSite}
            comparisonSplit={comparisonSplit}
            setComparisonSplit={setComparisonSplit}
          />

          {/* Interactive Transition Comparison Slider */}
          <ComparisonSlider
            habitation={habitation}
            site={site}
            split={comparisonSplit}
            setSplit={setComparisonSplit}
            currentLang={currentLang}
          />

          {/* Map Insight (Immediately below map with red disclaimer card) */}
          <MapInsightCard
            habitation={habitation}
            site={site}
            stage={stage}
            currentLang={currentLang}
          />

          {/* Map Layers (Strictly below map in 4 compact cards) */}
          <MapLayersCard
            layersVisibility={layersVisibility}
            setLayersVisibility={setLayersVisibility}
            currentLang={currentLang}
          />

          {/* AI Decision Support Summary */}
          <DecisionSupportSummary
            habitation={habitation}
            site={site}
            stage={stage}
            currentLang={currentLang}
          />

          {/* 6 AI Visual Context Images Gallery */}
          <AIVisualGallery currentLang={currentLang} />
        </div>

        {/* RIGHT ANALYTICS PANEL (300-360px) */}
        <AnalyticsPanel
          habitation={habitation}
          site={site}
          stage={stage}
          currentLang={currentLang}
        />
      </div>
    </div>
  );
};
