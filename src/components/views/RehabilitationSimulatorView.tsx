import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  Play, Pause, Layers, MapPin, Building, Users, Activity, ArrowUpRight, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Heart, GraduationCap, Truck, Waves, Mountain, Check 
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language } from '../../lib/i18n';

interface RehabilitationSimulatorViewProps {
  habitation: Habitation;
  site: RelocationSite;
  currentLang?: Language;
}

export const RehabilitationSimulatorView: React.FC<RehabilitationSimulatorViewProps> = ({
  habitation,
  site,
  currentLang = 'en'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);

  const [stage, setStage] = useState<'before' | 'relocation' | 'after'>('before');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Map layers visibility state
  const [layersVisibility, setLayersVisibility] = useState({
    currentVillage: true,
    redZone: true,
    candidateSite: true,
    relocationRoute: true,
    majorHighway: true,
    roadNetwork: true,
    hospital: true,
    school: true,
    waterSource: true,
    hazardZones: true,
    contours: true
  });

  // Initialize MapTiler map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) return;

    try {
      maptilersdk.config.apiKey = apiKey;
      if (!mapInstanceRef.current) {
        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.SATELLITE,
          center: [habitation.lng, habitation.lat],
          zoom: stage === 'relocation' ? 11 : 13,
          navigationControl: true
        });
        mapInstanceRef.current = map;
      }
    } catch (e) {
      console.warn('Map initialization warning:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [habitation, stage]);

  // Simulation autoplay sequence
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStage(prev => {
          if (prev === 'before') return 'relocation';
          if (prev === 'relocation') return 'after';
          setIsPlaying(false);
          return 'before';
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      {/* Simulator Hero Header */}
      <div className="bg-white border border-[#DCE7E1] p-5 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border border-[#087F5B]/30">
              AI Rehabilitation & City Transformation Simulator
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#17221D]">
            Visualizing transition from {habitation.name} to {site.name}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-[#F6F9F7] p-1.5 rounded-2xl border border-[#DCE7E1]">
            {(['before', 'relocation', 'after'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  stage === s ? 'bg-[#087F5B] text-white shadow-sm' : 'text-slate-600 hover:text-[#17221D]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: 70% Map / 30% Right Decision Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Canvas (65-70% width) */}
        <div className="lg:col-span-8 bg-white border border-[#DCE7E1] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[680px] relative">
          <div ref={mapContainerRef} className="flex-1 w-full h-full" />

          {/* Map Layers Control Box */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl text-[11px] space-y-1.5 z-10 w-64 border border-slate-700">
            <div className="font-bold text-slate-200 flex items-center justify-between pb-1 border-b border-slate-700">
              <span>Map Layers</span>
              <Layers className="w-3.5 h-3.5 text-[#087F5B]" />
            </div>
            {[
              { key: 'currentVillage', label: `Current Village (${habitation.name})`, color: 'bg-red-500' },
              { key: 'redZone', label: 'Modelled Red Zone', color: 'bg-red-600' },
              { key: 'candidateSite', label: `Candidate Site (${site.name})`, color: 'bg-emerald-500' },
              { key: 'relocationRoute', label: 'Relocation Route', color: 'bg-sky-400' },
              { key: 'majorHighway', label: 'Major Highway (NH-66)', color: 'bg-amber-500' },
              { key: 'roadNetwork', label: 'Road Network', color: 'bg-slate-400' },
              { key: 'hospital', label: 'Hospital / PHC', color: 'bg-red-500' },
              { key: 'school', label: 'School', color: 'bg-blue-500' },
              { key: 'waterSource', label: 'Water Source', color: 'bg-cyan-500' },
              { key: 'hazardZones', label: 'Hazard Zones', color: 'bg-amber-600' },
              { key: 'contours', label: 'Contours (Elevation)', color: 'bg-slate-300' },
            ].map((layer) => (
              <label key={layer.key} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-800 p-1 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={(layersVisibility as any)[layer.key]}
                  onChange={(e) => setLayersVisibility({ ...layersVisibility, [layer.key]: e.target.checked })}
                  className="rounded border-slate-600 text-[#087F5B] focus:ring-0 bg-slate-800"
                />
                <span className={`w-2 h-2 rounded-full ${layer.color} inline-block`} />
                <span className="font-medium text-slate-200 truncate">{layer.label}</span>
              </label>
            ))}
          </div>

          {/* Scale bar overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-xl text-[10px] font-mono flex items-center space-x-3 z-10 border border-slate-700">
            <span>0</span>
            <div className="w-24 h-1 bg-white/60 relative">
              <div className="absolute inset-0 border-b border-t border-white" />
            </div>
            <span>3 km</span>
          </div>
        </div>

        {/* Right Decision Panel (30-35% width) */}
        <div className="lg:col-span-4 bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6 overflow-y-auto max-h-[680px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-1 rounded font-bold uppercase">
                {stage === 'before' && '🔴 Stage 1: Before Relocation'}
                {stage === 'relocation' && '🟠 Stage 2: Transit Corridor'}
                {stage === 'after' && '🟢 Stage 3: Rehabilitated Settlement'}
              </span>
              <span className="text-xs text-[#087F5B] font-bold">Selected Site Summary</span>
            </div>

            {/* Village & Site Dual Summary Cards matching reference */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl space-y-1">
                <div className="text-[10px] text-red-600 font-bold uppercase">{habitation.name}</div>
                <div className="text-sm font-black text-red-900">{habitation.population} pop</div>
                <div className="text-[10px] text-slate-500">{habitation.households} households</div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                <div className="text-[10px] text-[#087F5B] font-bold uppercase">{site.name}</div>
                <div className="text-sm font-black text-[#087F5B]">{site.suitabilityScore} / 100</div>
                <div className="text-[10px] text-slate-500">{(site.landAvailabilityHa * 2.47105).toFixed(1)} acres</div>
              </div>
            </div>

            {/* Key Advantages Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-black text-[#17221D] uppercase tracking-wider">Key Advantages of {site.name}</div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Outside hazard-prone zone</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Good road connectivity (NH-66)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Near school and healthcare facilities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Adequate land for planned settlement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Access to water source (1.8 km)</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (stage === 'before') setStage('relocation');
              else if (stage === 'relocation') setStage('after');
              else setStage('before');
            }}
            className="w-full py-3.5 bg-[#087F5B] hover:bg-[#07543F] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>{stage === 'before' ? 'Continue to Relocation →' : stage === 'relocation' ? 'View After Rehabilitation →' : 'Restart Simulation'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 AI-Generated Visual Context Cards (Matching Second Reference Image) */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-[#17221D]">AI-Generated Visual Context Gallery</h2>
            <p className="text-xs text-slate-500">Visual storytelling assets for the DisasterGuard scenario — Conceptual visualization, not geographic evidence.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: '1',
              title: 'AFFECTED VILLAGE (CURRENT SITUATION)',
              subtitle: 'Village located within modelled red zone (high flood and landslide risk)',
              img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-red-600',
              desc: 'Current vulnerable village with landslide and flood exposure.'
            },
            {
              num: '2',
              title: 'PROPOSED RELOCATION SITE',
              subtitle: 'Safer location with suitable land for planned settlement',
              img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-emerald-600',
              desc: 'Candidate site planning boundary with access road and carrying capacity.'
            },
            {
              num: '3',
              title: 'RELOCATION ROUTE',
              subtitle: 'Approximate route from existing village to proposed site',
              img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-sky-600',
              desc: 'Visual movement and transit corridor connecting old settlement to new site.'
            },
            {
              num: '4',
              title: 'NEARBY HOSPITAL',
              subtitle: 'Access to healthcare facility near the candidate site',
              img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-blue-600',
              desc: 'Rural hospital and emergency medical access near relocation zone.'
            },
            {
              num: '5',
              title: 'NEARBY SCHOOL',
              subtitle: 'Access to education facility near the proposed settlement',
              img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-indigo-600',
              desc: 'Government Zilla Parishad school ensuring educational continuity.'
            },
            {
              num: '6',
              title: 'PROPOSED REHABILITATION SETTLEMENT (AFTER)',
              subtitle: 'Planned settlement with essential services and safer infrastructure',
              img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
              badgeColor: 'bg-[#087F5B]',
              desc: 'Resilient community layout featuring residential clusters, roads, school, healthcare, and open spaces.'
            },
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-[#DCE7E1] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className={`px-4 py-2 text-white text-xs font-black uppercase tracking-wider flex items-center space-x-2 ${card.badgeColor}`}>
                  <span>{card.num}. {card.title}</span>
                </div>
                <div className="p-3 bg-slate-50 text-[11px] text-slate-600 font-medium border-b border-[#DCE7E1]">
                  {card.subtitle}
                </div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] space-y-0.5">
                    <div className="font-bold">AI-generated visual context</div>
                    <div className="text-[9px] text-slate-300">Conceptual visualization — not geographic evidence</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-xs text-slate-600">
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
