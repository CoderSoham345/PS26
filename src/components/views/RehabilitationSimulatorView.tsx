import React, { useState, useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  Play, Pause, Layers, MapPin, Building, Users, Activity, ArrowUpRight, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Heart, GraduationCap, Truck, Waves, Mountain 
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

  // Map layers visibility state matching reference image
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
      }, 3500);
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
            Visualizing transition from {habitation.name} (Village A) to {site.name} (Site A)
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
        <div className="lg:col-span-8 bg-white border border-[#DCE7E1] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[660px] relative">
          <div ref={mapContainerRef} className="flex-1 w-full h-full" />

          {/* Map Layers Control Box (matching reference image) */}
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

        {/* Right Decision Panel (30-35% width, matching reference image) */}
        <div className="lg:col-span-4 bg-white border border-[#DCE7E1] p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6 overflow-y-auto max-h-[660px]">
          <div className="space-y-6">
            {/* Stage Banner */}
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-black uppercase tracking-wider border border-red-200">
                {stage === 'before' && '🔴 STAGE 1: BEFORE RELOCATION'}
                {stage === 'relocation' && '🟠 STAGE 2: TRANSIT CORRIDOR'}
                {stage === 'after' && '🟢 STAGE 3: REHABILITATED SETTLEMENT'}
              </span>
            </div>

            {/* AI-Generated Village Image Card */}
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE7E1] shadow-sm h-44">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800" 
                  alt="Village Context"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[9px] font-bold">
                  AI-generated visual context (Illustrative)
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-[#17221D]">{habitation.name} (Village A)</h3>
                <div className="grid grid-cols-2 gap-3 mt-2 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Users className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Population: <strong>{habitation.population}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Building className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Households: <strong>{habitation.households}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-red-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Risk Level: <strong>{habitation.riskScore > 80 ? 'Very High' : 'High'}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Activity className="w-3.5 h-3.5 text-amber-600" />
                    <span>Primary Hazard: <strong>{habitation.primaryHazard}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Zone Details Card */}
            <div className="p-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-2xl space-y-3">
              <div className="text-xs font-black text-[#17221D] uppercase tracking-wider">Red Zone Details (Prototype Analysis)</div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Area</span>
                  <strong className="text-[#17221D]">{Math.round(habitation.population * 0.1)} ha</strong>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Exposed</span>
                  <strong className="text-red-600">{habitation.population}</strong>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Households</span>
                  <strong className="text-[#17221D]">{habitation.households}</strong>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Buildings</span>
                  <strong className="text-[#17221D]">{Math.round(habitation.households * 1.4)}</strong>
                </div>
              </div>
            </div>

            {/* Why Relocation? */}
            <div className="space-y-2">
              <div className="text-xs font-black text-red-700 uppercase tracking-wider flex items-center space-x-1">
                <span>Why Relocation?</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 pl-4 list-disc">
                <li>High exposure to recurring monsoon landslides and flash floods.</li>
                <li>Single road access prone to blockage and isolation.</li>
                <li>Unstable slope regolith threatening structural integrity.</li>
                <li>Limited emergency accessibility during extreme events.</li>
              </ul>
            </div>

            {/* Primary Hazards Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#DCE7E1]">
              <div className="text-xs font-black text-[#17221D] uppercase tracking-wider">Primary Hazards</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="font-bold flex items-center space-x-1.5"><Mountain className="w-3.5 h-3.5 text-red-600" /><span>Landslide Risk</span></span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold text-[10px]">Very High</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="font-bold flex items-center space-x-1.5"><Waves className="w-3.5 h-3.5 text-blue-600" /><span>Flood Risk</span></span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">Moderate</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#F6F9F7] rounded-xl">
                  <span className="font-bold flex items-center space-x-1.5"><Activity className="w-3.5 h-3.5 text-purple-600" /><span>Heavy Rainfall</span></span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold text-[10px]">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 5 Proximity Cards (matching reference image layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { 
            title: 'Distance From Village', 
            val: '6.8 km', 
            desc: 'road distance', 
            img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400',
            icon: Truck
          },
          { 
            title: 'Nearest Hospital / PHC', 
            val: '4.2 km', 
            desc: 'Mahad Rural Hospital', 
            img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
            icon: Heart
          },
          { 
            title: 'Nearest School', 
            val: '2.6 km', 
            desc: 'ZP High School', 
            img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400',
            icon: GraduationCap
          },
          { 
            title: 'Nearest Highway', 
            val: '3.1 km', 
            desc: 'NH-66 Access', 
            img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400',
            icon: Truck
          },
          { 
            title: 'Water Source', 
            val: '1.8 km', 
            desc: 'Perennial Stream', 
            img: 'https://images.unsplash.com/photo-1432405972618-fb60b01705d2?auto=format&fit=crop&q=80&w=400',
            icon: Waves
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white border border-[#DCE7E1] rounded-3xl p-4 shadow-sm flex flex-col justify-between space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-[#E7F6EF] text-[#087F5B] flex items-center justify-center font-bold">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#17221D]">{card.val}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{card.title}</div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-24 border border-slate-100">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs text-white px-2 py-1 text-[9px] font-bold truncate">
                  {card.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
