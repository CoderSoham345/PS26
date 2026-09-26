import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t } from '../../lib/i18n';

interface StageControllerProps {
  habitation: Habitation;
  site: RelocationSite;
  stage: 'before' | 'relocation' | 'after';
  setStage: (stage: 'before' | 'relocation' | 'after') => void;
  currentLang: Language;
}

export const StageController: React.FC<StageControllerProps> = ({
  habitation,
  site,
  stage,
  setStage,
  currentLang
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Play Simulation Sequence (5-8 seconds automated transitions)
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 6) {
            setIsPlaying(false);
            return 6;
          }
          const next = prev + 1;
          if (next === 1 || next === 2) setStage('before');
          else if (next === 3 || next === 4 || next === 5) setStage('relocation');
          else if (next === 6) setStage('after');
          return next;
        });
      }, 1100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, setStage]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (simStep >= 6) {
        setSimStep(0);
        setStage('before');
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSimStep(0);
    setStage('before');
  };

  return (
    <div className="bg-white border border-[#DCE7E1] p-4 lg:p-5 rounded-2xl shadow-[0_4px_18px_rgba(7,84,63,0.06)] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider border border-[#B8E5D2]">
            {t('simulatorTag', currentLang)}
          </span>
          {isPlaying && (
            <span className="flex items-center space-x-1 text-[10px] text-[#087F5B] font-mono font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
              <span>Simulating Sequence Step {simStep + 1}/7</span>
            </span>
          )}
        </div>

        <h1 className="text-lg lg:text-xl font-black text-[#17221D] tracking-tight flex items-center flex-wrap gap-1.5">
          <span>{t('visualizingTransition', currentLang)}</span>
          <span className="text-[#DC3545] bg-red-50 px-2 py-0.5 rounded-lg border border-red-200">
            {habitation.name}
          </span>
          <span className="text-[#66736D] font-normal">{t('to', currentLang)}</span>
          <span className="text-[#087F5B] bg-[#E7F6EF] px-2 py-0.5 rounded-lg border border-[#B8E5D2]">
            {site.name}
          </span>
        </h1>

        <p className="text-xs text-[#66736D] mt-0.5">
          {t('simulatorSubtitle', currentLang)}
        </p>
      </div>

      {/* Right Controls: 3-step Stage Controller + Play Simulation */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {/* Connected 3-Step Stage Controller */}
        <div className="flex items-center bg-[#F6F9F7] border border-[#DCE7E1] p-1 rounded-xl">
          {/* 1. BEFORE */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('before');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'before'
                ? 'bg-[#DC3545] text-white shadow-sm'
                : 'text-[#66736D] hover:text-[#17221D] hover:bg-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
              1
            </span>
            <div className="text-left">
              <div className="leading-tight">{t('beforeStage', currentLang)}</div>
              <div className="text-[9px] font-normal opacity-80 hidden sm:block">Vulnerable Settlement</div>
            </div>
          </button>

          {/* Divider */}
          <div className="w-3 text-center text-[#66736D]">→</div>

          {/* 2. RELOCATION */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('relocation');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'relocation'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-[#66736D] hover:text-[#17221D] hover:bg-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
              2
            </span>
            <div className="text-left">
              <div className="leading-tight">{t('relocationStage', currentLang)}</div>
              <div className="text-[9px] font-normal opacity-80 hidden sm:block">Movement to Site</div>
            </div>
          </button>

          {/* Divider */}
          <div className="w-3 text-center text-[#66736D]">→</div>

          {/* 3. AFTER */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('after');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'after'
                ? 'bg-[#087F5B] text-white shadow-sm'
                : 'text-[#66736D] hover:text-[#17221D] hover:bg-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
              3
            </span>
            <div className="text-left">
              <div className="leading-tight">{t('afterStage', currentLang)}</div>
              <div className="text-[9px] font-normal opacity-80 hidden sm:block">Planned Settlement</div>
            </div>
          </button>
        </div>

        {/* Play / Reset Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleTogglePlay}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 shadow-sm min-h-[38px] ${
              isPlaying
                ? 'bg-[#F59E0B] text-white hover:bg-[#D97706]'
                : 'bg-[#087F5B] text-white hover:bg-[#07543F]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>{t('pauseSimulation', currentLang)}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{t('playSimulation', currentLang)}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            title={t('resetSimulation', currentLang)}
            className="p-2 bg-white hover:bg-[#E7F6EF] border border-[#DCE7E1] hover:border-[#B8E5D2] rounded-xl text-[#66736D] hover:text-[#087F5B] transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
