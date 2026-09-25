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
    <div className="bg-[#111827] border border-[#1E293B] p-4 lg:p-5 rounded-2xl shadow-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider border border-[#10B981]/30">
            {t('simulatorTag', currentLang)}
          </span>
          {isPlaying && (
            <span className="flex items-center space-x-1 text-[10px] text-[#0EA5E9] font-mono animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              <span>Simulating Sequence Step {simStep + 1}/7</span>
            </span>
          )}
        </div>

        <h1 className="text-lg lg:text-xl font-black text-[#F8FAFC] tracking-tight flex items-center flex-wrap gap-1.5">
          <span>{t('visualizingTransition', currentLang)}</span>
          <span className="text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded-lg border border-[#EF4444]/30">
            {habitation.name}
          </span>
          <span className="text-[#94A3B8] font-normal">{t('to', currentLang)}</span>
          <span className="text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-lg border border-[#10B981]/30">
            {site.name}
          </span>
        </h1>

        <p className="text-xs text-[#94A3B8] mt-0.5">
          {t('simulatorSubtitle', currentLang)}
        </p>
      </div>

      {/* Right Controls: 3-step Stage Controller + Play Simulation */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {/* Connected 3-Step Stage Controller */}
        <div className="flex items-center bg-[#0B0F17] border border-[#1E293B] p-1 rounded-xl">
          {/* 1. BEFORE */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('before');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'before'
                ? 'bg-[#EF4444] text-white shadow-lg shadow-red-950/60'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#16202B]'
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
          <div className="w-3 text-center text-[#64748B]">→</div>

          {/* 2. RELOCATION */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('relocation');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'relocation'
                ? 'bg-[#0EA5E9] text-white shadow-lg shadow-sky-950/60'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#16202B]'
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
          <div className="w-3 text-center text-[#64748B]">→</div>

          {/* 3. AFTER */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage('after');
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              stage === 'after'
                ? 'bg-[#10B981] text-slate-950 shadow-lg shadow-emerald-950/60'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#16202B]'
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
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 shadow-lg ${
              isPlaying
                ? 'bg-[#F59E0B] text-slate-950 hover:bg-[#D97706]'
                : 'bg-gradient-to-r from-[#10B981] to-[#047857] text-slate-950 hover:from-[#34D399] hover:to-[#10B981]'
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
            className="p-2 bg-[#16202B] hover:bg-[#1E293B] border border-[#1E293B] rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
