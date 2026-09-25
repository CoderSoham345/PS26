import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  Play, Pause, Layers, MapPin, Building, Users, Activity, ArrowUpRight, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Heart, GraduationCap, Truck, Waves, Mountain, Check, RotateCcw, Sparkles, MessageSquare, X 
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
  const [chatOpen, setChatOpen] = useState<boolean>(false);

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
    <div className="space-y-6 pb-20 animate-fadeIn font-sans text-[#F8FAFC]">
      {/* Top Banner (Simulator Workflow Control) */}
      <div className="bg-[#111827] border border-[#1E293B] p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border border-[#10B981]/30">
              AI Rehabilitation & City Transformation Simulator
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#F8FAFC]">
            Visualize the transition from vulnerable village to a safe, planned settlement
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Current transition: <strong className="text-[#F8FAFC]">{habitation.name}</strong> to <strong className="text-[#10B981]">{site.name}</strong>
          </p>
        </div>

        {/* Workflow Steps & Simulation Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-1.5 bg-[#16202B] p-1.5 rounded-2xl border border-[#1E293B]">
            {[
              { id: 'before', label: '1. BEFORE' },
              { id: 'relocation', label: '2. RELOCATION' },
              { id: 'after', label: '3. AFTER' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStage(s.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  stage === s.id ? 'bg-[#10B981] text-slate-950 shadow-md font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2.5 bg-[#10B981] hover:bg-[#047857] text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
            </button>
            <button
              onClick={() => { setStage('before'); setIsPlaying(false); }}
              className="p-2.5 bg-[#16202B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] rounded-xl transition-colors border border-[#1E293B]"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main GIS Map View (Central Area) & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Canvas (65-70% width) */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1E293B] rounded-3xl shadow-xl overflow-hidden flex flex-col h-[680px] relative">
          <div ref={mapContainerRef} className="flex-1 w-full h-full" />

          {/* Map Controls Floating UI (Top-Right) */}
          <div className="absolute top-4 right-4 bg-[#111827]/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl flex flex-col space-y-1.5 z-10 border border-[#1E293B]">
            <button className="w-8 h-8 rounded-xl bg-[#16202B] hover:bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center font-bold text-sm shadow-xs">+</button>
            <button className="w-8 h-8 rounded-xl bg-[#16202B] hover:bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center font-bold text-sm shadow-xs">-</button>
            <div className="w-full h-px bg-[#1E293B] my-0.5" />
            <button className="w-8 h-8 rounded-xl bg-[#16202B] hover:bg-[#1E293B] text-[#10B981] flex items-center justify-center shadow-xs" title="Layers">
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Compass North Arrow (Top-Left) */}
          <div className="absolute top-4 left-4 bg-[#111827]/90 text-[#F8FAFC] w-10 h-10 rounded-2xl flex flex-col items-center justify-center shadow-lg font-bold text-[10px] z-10 border border-[#1E293B]">
            <span>N</span>
            <div className="w-2 h-2 border-t-2 border-r-2 border-[#10B981] transform -rotate-45 mt-0.5" />
          </div>

          {/* Scale bar overlay */}
          <div className="absolute bottom-4 left-4 bg-[#111827]/90 text-[#F8FAFC] px-3 py-1.5 rounded-xl text-[10px] font-mono flex items-center space-x-3 z-10 border border-[#1E293B]">
            <span>0</span>
            <div className="w-24 h-1 bg-[#10B981]/60 relative">
              <div className="absolute inset-0 border-b border-t border-[#10B981]" />
            </div>
            <span>3 km</span>
          </div>
        </div>

        {/* Right Sidebar (Analytics & Decision Support Cards) */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#1E293B] p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 overflow-y-auto max-h-[680px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800/50 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                {stage === 'before' && 'Stage 1: Before Relocation'}
                {stage === 'relocation' && 'Stage 2: Relocation & Transit'}
                {stage === 'after' && 'Stage 3: Rehabilitated Settlement'}
              </span>
              <span className="text-xs text-[#10B981] font-bold">Decision Support</span>
            </div>

            {/* Current Village Card */}
            <div className="space-y-3 bg-[#16202B] border border-red-900/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#F8FAFC] uppercase">Current Village: {habitation.name}</span>
                <span className="px-2 py-0.5 bg-[#EF4444] text-white rounded font-bold text-[9px] uppercase tracking-wider">Risk: Very High</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] pt-1">
                <div>District: <strong className="text-[#F8FAFC]">{habitation.district}</strong></div>
                <div>Population: <strong className="text-[#F8FAFC]">~{habitation.population}</strong></div>
                <div>Households: <strong className="text-[#F8FAFC]">~{habitation.households}</strong></div>
                <div>Primary Hazards: <strong className="text-red-400">{habitation.primaryHazard}</strong></div>
              </div>
              <div className="text-xs text-[#94A3B8] pt-1 border-t border-[#1E293B]">
                Red Zone Area: <strong className="text-[#F8FAFC]">{Math.round(habitation.population * 0.1)} ha</strong> • Infrastructure Exposed: Roads, Houses, PHC, School
              </div>
            </div>

            {/* Candidate Site Analysis Card */}
            <div className="space-y-3 bg-[#16202B] border border-emerald-900/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#F8FAFC] uppercase">Candidate Site: {site.name}</span>
                <span className="px-2 py-0.5 bg-[#10B981] text-slate-950 rounded font-bold text-[9px] uppercase tracking-wider">Suitability: High</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] pt-1">
                <div>Distance: <strong className="text-[#10B981]">6.8 km</strong></div>
                <div>Available Land: <strong className="text-[#F8FAFC]">{(site.landAvailabilityHa * 2.47105).toFixed(1)} acres</strong></div>
                <div>Suitable Area: <strong className="text-[#F8FAFC]">39.2 acres</strong></div>
                <div>Capacity: <strong className="text-[#F8FAFC]">{site.estimatedCapacity} people</strong></div>
              </div>

              {/* Key Advantages List */}
              <div className="space-y-1.5 pt-2 border-t border-[#1E293B] text-xs">
                <div className="font-black text-[#F8FAFC] uppercase text-[10px] tracking-wider mb-1">Key Advantages</div>
                {[
                  'Outside hazard-prone zone',
                  'Good road connectivity (NH-66)',
                  'Near school and healthcare facilities',
                  'Adequate land for planned settlement',
                  'Access to water source (1.8 km)',
                  'Suitable terrain with lower landslide risk'
                ].map((adv, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[#94A3B8]">
                    <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (stage === 'before') setStage('relocation');
              else if (stage === 'relocation') setStage('after');
              else setStage('before');
            }}
            className="w-full py-3.5 bg-[#10B981] hover:bg-[#047857] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>{stage === 'before' ? 'Continue to Relocation ➔' : stage === 'relocation' ? 'View After Rehabilitation ➔' : 'Restart Simulation'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Insight & Disclaimer Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#111827] border border-[#1E293B] p-6 rounded-3xl shadow-xl text-xs">
        <div className="space-y-2">
          <div className="font-black text-[#F8FAFC] uppercase tracking-wider">Map Spatial Insight</div>
          <p className="text-[#94A3B8] leading-relaxed">
            The selected village ({habitation.name}) heavily overlaps high-risk monsoon landslide and flood zones along river embankments. The proposed relocation corridor connects via state highway to Khed Plateau (Site A), ensuring immediate access to healthcare, education, and perennial water sources.
          </p>
        </div>
        <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-2xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Prototype Statutory Disclaimer</span>
          </div>
          <p className="text-amber-200/80 leading-relaxed">
            Modelled analysis — not an official statutory designation. This is a prototype decision-support visualization based on available open geospatial data and multi-hazard indices.
          </p>
        </div>
      </div>

      {/* Bottom Section Grid (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Grid: Map Layers Control Panel */}
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E293B] p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h3 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider">Map Layers Control Panel</h3>
            <Layers className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-2">
              <div className="font-extrabold text-[#F8FAFC]">Risk & Hazards</div>
              {['Modelled Red Zone', 'Hazard Zones', 'Landslide Risk', 'Flood Risk'].map((item, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#1E293B] bg-[#16202B] text-[#10B981] focus:ring-[#10B981]" />
                  <span className="text-[#94A3B8]">{item}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-extrabold text-[#F8FAFC]">Relocation</div>
              {['Current Village', 'Candidate Site', 'Relocation Route', 'Planning Boundary'].map((item, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#1E293B] bg-[#16202B] text-[#10B981] focus:ring-[#10B981]" />
                  <span className="text-[#94A3B8]">{item}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-extrabold text-[#F8FAFC]">Infrastructure</div>
              {['Major Roads (NH-66)', 'Road Network', 'Hospital / PHC', 'School', 'Water Source'].map((item, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#1E293B] bg-[#16202B] text-[#10B981] focus:ring-[#10B981]" />
                  <span className="text-[#94A3B8]">{item}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-extrabold text-[#F8FAFC]">Terrain</div>
              {['Contours (Elevation)', 'River / Water', 'Village Boundary', 'Satellite Imagery'].map((item, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#1E293B] bg-[#16202B] text-[#10B981] focus:ring-[#10B981]" />
                  <span className="text-[#94A3B8]">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Grid: Decision Support Summary (AI-Generated) */}
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E293B] p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h3 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>AI Decision Support Summary</span>
            </h3>
            <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded font-bold border border-[#10B981]/30">Model v2.4</span>
          </div>
          <div className="space-y-3 text-xs text-[#94A3B8] leading-relaxed">
            <div>
              <strong className="text-[#F8FAFC]">Why Relocate?</strong> High cumulative exposure to recurring monsoon landslides and flash floods, isolating village access.
            </div>
            <div>
              <strong className="text-[#F8FAFC]">Why This Site?</strong> Lower natural hazard index, proximity to NH-66 highway, and adequate flat terrain for planned expansion.
            </div>
            <div>
              <strong className="text-[#F8FAFC]">What Changes After Relocation?</strong> Safer residential zoning, dedicated school & healthcare facilities, and climate-resilient stormwater drainage.
            </div>
            <div>
              <strong className="text-[#F8FAFC]">Limitations:</strong> Prototype decision support; requires detailed engineering geotechnical survey prior to statutory land acquisition.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Gallery: AI Visual Context (6 Conceptual Visualizations) */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-base font-black text-[#F8FAFC]">AI Visual Context (Conceptual visualization — not geographic evidence)</h2>
          <p className="text-xs text-[#94A3B8]">Visual storytelling assets for the DisasterGuard rehabilitation scenario.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { num: '01', title: 'Affected Village', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400' },
            { num: '02', title: 'Proposed Relocation Site', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400' },
            { num: '03', title: 'Relocation Route', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400' },
            { num: '04', title: 'Nearby Hospital', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400' },
            { num: '05', title: 'Nearby School', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400' },
            { num: '06', title: 'After Rehabilitation', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#10B981] transition-colors">
              <div className="relative h-28 bg-[#16202B] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2 bg-slate-950/80 text-[#10B981] px-2 py-0.5 rounded text-[10px] font-bold font-mono border border-[#1E293B]">
                  {item.num}
                </div>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-xs font-black text-[#F8FAFC] truncate">{item.title}</div>
                <div className="text-[9px] text-[#64748B]">AI-generated visual context</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Bot Widget (Floating in bottom-right) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-[#10B981] hover:bg-[#047857] text-slate-950 px-5 py-3.5 rounded-full shadow-2xl flex items-center space-x-2 font-black text-xs transition-all hover:scale-105 border border-emerald-400/40"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
            <span>DisasterGuard AI Assistant</span>
          </button>
        ) : (
          <div className="bg-[#111827] border border-[#1E293B] w-80 sm:w-96 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-[#F8FAFC]">
            <div className="bg-[#10B981] text-slate-950 p-4 flex items-center justify-between font-black">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span className="text-xs uppercase tracking-wider">DisasterGuard AI</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-950 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#0B0F17] text-xs">
              <div className="p-3 bg-[#16202B] rounded-2xl shadow-md border border-[#1E293B] space-y-1">
                <div className="font-bold text-[#10B981]">DisasterGuard AI</div>
                <p className="text-[#94A3B8]">Hello! I am your GIS AI assistant for {habitation.name} and {site.name}. Ask me about multi-hazard risk, relocation options, or rehabilitation plans!</p>
              </div>
            </div>
            <div className="p-3 bg-[#111827] border-t border-[#1E293B] flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about risk, relocation or rehabilitation..."
                className="flex-1 bg-[#16202B] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#10B981]"
              />
              <button className="bg-[#10B981] text-slate-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#047857]">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
