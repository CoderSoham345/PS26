import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { 
  Plus, 
  Minus, 
  Crosshair, 
  Maximize2, 
  RotateCcw, 
  ShieldCheck, 
  Navigation,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Building2,
  Home,
  GraduationCap,
  HeartPulse,
  Trees,
  Droplets,
  Flame,
  Info
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { 
  generateModelledRedZoneGeoJson, 
  generatePlanningBoundaryGeoJson, 
  generateRelocationRouteGeoJson, 
  generateRehabilitationGeoJson,
  getInfrastructureAnnotations,
  getRehabilitationFacilityPoints,
  calculateHaversineDistance,
  FacilityPoint
} from '../../lib/geo';
import { Language, t } from '../../lib/i18n';

interface SimulatorMapProps {
  habitation: Habitation;
  site: RelocationSite;
  stage: 'before' | 'relocation' | 'after';
  layersVisibility: {
    modelledRedZone: boolean;
    hazardZones: boolean;
    landslideRisk: boolean;
    floodRisk: boolean;
    currentVillage: boolean;
    candidateSite: boolean;
    relocationRoute: boolean;
    planningBoundary: boolean;
    proposedRehabilitation?: boolean;
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
  currentLang: Language;
  onSelectSite?: (s: RelocationSite) => void;
  comparisonSplit?: number;
  setComparisonSplit?: (val: number) => void;
  showComparisonSlider?: boolean;
}

// MapLibre Raster Style Specifications for 100% resilient offline / keyless operation
const SATELLITE_RASTER_STYLE: any = {
  version: 8,
  sources: {
    'satellite-tiles': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: '© Esri, Maxar, Earthstar Geographics'
    }
  },
  layers: [
    {
      id: 'satellite-basemap-layer',
      type: 'raster',
      source: 'satellite-tiles',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

const DARK_RASTER_STYLE: any = {
  version: 8,
  sources: {
    'carto-dark-tiles': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors, © CARTO'
    }
  },
  layers: [
    {
      id: 'dark-basemap-layer',
      type: 'raster',
      source: 'carto-dark-tiles',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

export const SimulatorMap: React.FC<SimulatorMapProps> = ({
  habitation,
  site,
  stage,
  layersVisibility,
  currentLang,
  onSelectSite
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);
  const markersRef = useRef<maptilersdk.Marker[]>([]);
  const isMapLoadedRef = useRef<boolean>(false);

  const [activePopupVillage, setActivePopupVillage] = useState<Habitation | null>(null);
  const [activePopupSite, setActivePopupSite] = useState<RelocationSite | null>(null);
  const [activePopupFacility, setActivePopupFacility] = useState<FacilityPoint | null>(null);

  const distanceKm = calculateHaversineDistance(habitation.lat, habitation.lng, site.lat, site.lng);
  const annotations = getInfrastructureAnnotations(habitation, site);
  const facilityPoints = getRehabilitationFacilityPoints(site);

  // Setup GeoJSON Sources and Tactical Map Layers
  const setupLayers = useCallback((map: maptilersdk.Map) => {
    try {
      // 1. PLANNING BOUNDARY (Candidate Safe Site)
      // Glow Line
      if (!map.getSource('planning-source')) {
        map.addSource('planning-source', {
          type: 'geojson',
          data: generatePlanningBoundaryGeoJson(site)
        });

        map.addLayer({
          id: 'planning-glow',
          type: 'line',
          source: 'planning-source',
          paint: {
            'line-color': '#10B981',
            'line-width': 7,
            'line-opacity': 0.35,
            'line-blur': 4
          }
        });

        // Polygon Fill (Transparent green so satellite terrain shows through)
        map.addLayer({
          id: 'planning-fill',
          type: 'fill',
          source: 'planning-source',
          paint: {
            'fill-color': '#10B981',
            'fill-opacity': stage === 'after' ? 0.32 : stage === 'relocation' ? 0.28 : 0.22
          }
        });

        // Strong Bright Green Border
        map.addLayer({
          id: 'planning-line',
          type: 'line',
          source: 'planning-source',
          paint: {
            'line-color': '#34D399',
            'line-width': 3.2
          }
        });
      }

      // 2. MODELLED RED ZONE (Current Village)
      if (!map.getSource('redzone-source')) {
        map.addSource('redzone-source', {
          type: 'geojson',
          data: generateModelledRedZoneGeoJson(habitation)
        });

        map.addLayer({
          id: 'redzone-glow',
          type: 'line',
          source: 'redzone-source',
          paint: {
            'line-color': '#EF4444',
            'line-width': 6,
            'line-opacity': 0.25,
            'line-blur': 3
          }
        });

        map.addLayer({
          id: 'redzone-fill',
          type: 'fill',
          source: 'redzone-source',
          paint: {
            'fill-color': '#EF4444',
            'fill-opacity': stage === 'after' ? 0.40 : 0.30
          }
        });

        map.addLayer({
          id: 'redzone-line',
          type: 'line',
          source: 'redzone-source',
          paint: {
            'line-color': '#DC2626',
            'line-width': 2.6,
            'line-dasharray': [3, 2]
          }
        });
      }

      // 3. RELOCATION TRANSIT ROUTE
      if (!map.getSource('route-source')) {
        map.addSource('route-source', {
          type: 'geojson',
          data: generateRelocationRouteGeoJson(habitation, site)
        });

        map.addLayer({
          id: 'route-glow',
          type: 'line',
          source: 'route-source',
          paint: {
            'line-color': '#0EA5E9',
            'line-width': 8,
            'line-opacity': 0.32,
            'line-blur': 4
          }
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route-source',
          paint: {
            'line-color': '#0EA5E9',
            'line-width': 4.0,
            'line-dasharray': [4, 3]
          }
        });
      }

      // 4. REHABILITATION SETTLEMENT LAYOUT (Polygons & Spine Roads)
      if (!map.getSource('rehab-source')) {
        map.addSource('rehab-source', {
          type: 'geojson',
          data: generateRehabilitationGeoJson(site, habitation)
        });

        // Internal Polygons Fill
        map.addLayer({
          id: 'rehab-polygons-fill',
          type: 'fill',
          source: 'rehab-source',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.65
          }
        });

        // Polygons Crisp Outlines
        map.addLayer({
          id: 'rehab-polygons-line',
          type: 'line',
          source: 'rehab-source',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'line-color': '#FFFFFF',
            'line-width': 1.8,
            'line-opacity': 0.90
          }
        });

        // Spine Roads Casing
        map.addLayer({
          id: 'rehab-lines-casing',
          type: 'line',
          source: 'rehab-source',
          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': '#0B0F17',
            'line-width': 5.5,
            'line-opacity': 0.50
          }
        });

        // Spine Roads Main Line
        map.addLayer({
          id: 'rehab-lines',
          type: 'line',
          source: 'rehab-source',
          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 3.4
          }
        });
      }
    } catch (err) {
      console.warn('Map source/layer initialization note:', err);
    }
  }, [habitation, site, stage]);

  // Update Dynamic Map Markers (Attached to exact geographical coordinates)
  const refreshMarkers = useCallback((map: maptilersdk.Map) => {
    // 1. Remove all previous markers to guarantee NO stale geometry
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Helper to add marker to tracking list
    const registerMarker = (m: maptilersdk.Marker) => {
      markersRef.current.push(m);
      return m;
    };

    // 2. CANDIDATE SITE PIN & GEOGRAPHIC CALLOUT BADGE
    if (layersVisibility.candidateSite) {
      const siteEl = document.createElement('div');
      siteEl.className = 'flex flex-col items-center cursor-pointer group select-none -translate-y-1/2';
      siteEl.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
          <div class="w-8 h-8 rounded-full bg-emerald-500/20 absolute"></div>
          <div class="w-6 h-6 rounded-full bg-[#10B981] border-2 border-[#34D399] shadow-2xl flex items-center justify-center text-slate-950 font-black text-xs z-10">
            ★
          </div>
        </div>
        <div class="mt-1 bg-[#0B0F17]/95 backdrop-blur-md border border-[#10B981] px-2.5 py-1 rounded-xl shadow-2xl shadow-emerald-950/80 text-center max-w-[210px] transition-transform group-hover:scale-105 pointer-events-auto">
          <div class="flex items-center justify-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span class="text-[8px] font-black uppercase text-[#10B981] tracking-wider truncate">
              ${site.status || 'PROPOSED RELOCATION SITE'}
            </span>
          </div>
          <div class="text-[11px] font-black text-[#F8FAFC] leading-tight truncate">
            ${site.name}
          </div>
          <div class="flex items-center justify-center space-x-1.5 mt-0.5 text-[9px] text-[#94A3B8] font-mono">
            <span class="text-[#34D399] font-bold">${site.landAvailabilityHa} ha</span>
            <span>•</span>
            <span class="text-[#F8FAFC]">${site.suitabilityScore} pts</span>
          </div>
        </div>
      `;

      siteEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setActivePopupSite(site);
        if (onSelectSite) onSelectSite(site);
      });

      const siteMarker = new maptilersdk.Marker({ element: siteEl, anchor: 'center' })
        .setLngLat([site.lng, site.lat])
        .addTo(map);

      registerMarker(siteMarker);
    }

    // 3. CURRENT VULNERABLE HABITATION PIN & BADGE
    if (layersVisibility.currentVillage) {
      const villageEl = document.createElement('div');
      villageEl.className = 'flex flex-col items-center cursor-pointer group select-none -translate-y-1/2';
      villageEl.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-red-500/40 animate-ping absolute"></div>
          <div class="w-8 h-8 rounded-full bg-red-500/20 absolute"></div>
          <div class="w-6 h-6 rounded-full bg-[#EF4444] border-2 border-white shadow-2xl flex items-center justify-center text-white font-black text-[10px] z-10">
            !
          </div>
        </div>
        <div class="mt-1 bg-[#0B0F17]/95 backdrop-blur-md border border-[#EF4444] px-2.5 py-1 rounded-xl shadow-2xl shadow-red-950/80 text-center max-w-[210px] transition-transform group-hover:scale-105 pointer-events-auto">
          <div class="flex items-center justify-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
            <span class="text-[8px] font-black uppercase text-[#EF4444] tracking-wider truncate">
              VULNERABLE HABITATION
            </span>
          </div>
          <div class="text-[11px] font-black text-[#F8FAFC] leading-tight truncate">
            ${habitation.name}
          </div>
          <div class="flex items-center justify-center space-x-1.5 mt-0.5 text-[9px] text-[#94A3B8]">
            <span class="text-[#EF4444] font-bold font-mono">Risk: ${habitation.riskScore}/100</span>
            <span>•</span>
            <span class="truncate">${habitation.primaryHazard}</span>
          </div>
        </div>
      `;

      villageEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setActivePopupVillage(habitation);
      });

      const villageMarker = new maptilersdk.Marker({ element: villageEl, anchor: 'center' })
        .setLngLat([habitation.lng, habitation.lat])
        .addTo(map);

      registerMarker(villageMarker);
    }

    // 4. RELOCATION ROUTE MIDPOINT DISTANCE BADGE
    const showRoute = layersVisibility.relocationRoute && (stage === 'relocation' || stage === 'after');
    if (showRoute) {
      const midLng = (habitation.lng + site.lng) / 2;
      const midLat = (habitation.lat + site.lat) / 2;

      const routeEl = document.createElement('div');
      routeEl.className = 'select-none pointer-events-none -translate-y-1/2';
      routeEl.innerHTML = `
        <div class="bg-[#0B0F17]/95 backdrop-blur-md border border-[#0EA5E9] px-2.5 py-1 rounded-xl shadow-2xl flex items-center space-x-1.5">
          <span class="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse"></span>
          <div>
            <div class="text-[8px] font-black uppercase text-[#0EA5E9] tracking-wider">
              Transit Route
            </div>
            <div class="text-[10px] font-bold text-[#F8FAFC]">
              ${distanceKm} km <span class="text-[#94A3B8] font-normal text-[8px]">(~${Math.round(distanceKm * 2.8 + 10)} min)</span>
            </div>
          </div>
        </div>
      `;

      const routeMarker = new maptilersdk.Marker({ element: routeEl, anchor: 'center' })
        .setLngLat([midLng, midLat])
        .addTo(map);

      registerMarker(routeMarker);
    }

    // 5. PROPOSED REHABILITATION FACILITIES PINS (Inside Polygon)
    const showFacilities = stage === 'after' || stage === 'relocation' || layersVisibility.proposedRehabilitation;
    if (showFacilities) {
      facilityPoints.forEach((fac) => {
        const facEl = document.createElement('div');
        facEl.className = 'cursor-pointer group select-none transition-transform hover:scale-125';
        facEl.title = `${fac.name} (${fac.specs})`;
        facEl.innerHTML = `
          <div class="flex items-center justify-center w-6 h-6 rounded-lg bg-[#0B0F17]/90 border border-[${fac.color}] shadow-md text-xs">
            ${fac.icon}
          </div>
          <div class="hidden group-hover:block absolute bottom-7 left-1/2 -translate-x-1/2 bg-[#0B0F17]/95 border border-[#1E293B] px-2 py-0.5 rounded text-[9px] text-[#F8FAFC] whitespace-nowrap shadow-xl z-30 font-medium">
            ${fac.name}
          </div>
        `;

        facEl.addEventListener('click', (e) => {
          e.stopPropagation();
          setActivePopupFacility(fac);
        });

        const facMarker = new maptilersdk.Marker({ element: facEl, anchor: 'center' })
          .setLngLat([fac.lng, fac.lat])
          .addTo(map);

        registerMarker(facMarker);
      });
    }

    // 6. NEARBY CRITICAL INFRASTRUCTURE ANNOTATION MARKERS
    if (layersVisibility.majorRoads || layersVisibility.hospitalPhc || layersVisibility.school || layersVisibility.waterSource) {
      annotations.forEach((item) => {
        let isVisible = false;
        if (item.type === 'highway' && layersVisibility.majorRoads) isVisible = true;
        if (item.type === 'hospital' && layersVisibility.hospitalPhc) isVisible = true;
        if (item.type === 'school' && layersVisibility.school) isVisible = true;
        if (item.type === 'water' && layersVisibility.waterSource) isVisible = true;

        if (isVisible) {
          const infraEl = document.createElement('div');
          infraEl.className = 'select-none pointer-events-auto cursor-help group';
          infraEl.innerHTML = `
            <div class="w-3.5 h-3.5 rounded-full bg-[#1E293B] border border-[#94A3B8] flex items-center justify-center text-[8px] text-[#F8FAFC] shadow">
              ●
            </div>
            <div class="hidden group-hover:flex flex-col absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#0B0F17]/95 border border-[#1E293B] px-2 py-1 rounded-lg text-[9px] text-[#F8FAFC] whitespace-nowrap shadow-xl z-20">
              <span class="font-bold text-[#F8FAFC]">${item.name}</span>
              <span class="text-[#94A3B8] text-[8px]">${item.distanceFromSiteKm} km from Candidate Site</span>
            </div>
          `;

          const infraMarker = new maptilersdk.Marker({ element: infraEl, anchor: 'center' })
            .setLngLat([item.lng, item.lat])
            .addTo(map);

          registerMarker(infraMarker);
        }
      });
    }
  }, [
    habitation,
    site,
    stage,
    layersVisibility,
    distanceKm,
    annotations,
    facilityPoints,
    onSelectSite
  ]);

  // Synchronize GeoJSON Datasets Dynamically (Zero stale geometry)
  const updateGeoData = useCallback((map: maptilersdk.Map) => {
    try {
      const planningSource = map.getSource('planning-source') as maptilersdk.GeoJSONSource;
      if (planningSource && typeof planningSource.setData === 'function') {
        planningSource.setData(generatePlanningBoundaryGeoJson(site));
      }

      const redZoneSource = map.getSource('redzone-source') as maptilersdk.GeoJSONSource;
      if (redZoneSource && typeof redZoneSource.setData === 'function') {
        redZoneSource.setData(generateModelledRedZoneGeoJson(habitation));
      }

      const routeSource = map.getSource('route-source') as maptilersdk.GeoJSONSource;
      if (routeSource && typeof routeSource.setData === 'function') {
        routeSource.setData(generateRelocationRouteGeoJson(habitation, site));
      }

      const rehabSource = map.getSource('rehab-source') as maptilersdk.GeoJSONSource;
      if (rehabSource && typeof rehabSource.setData === 'function') {
        rehabSource.setData(generateRehabilitationGeoJson(site, habitation));
      }
    } catch (err) {
      console.warn('GeoJSON setData update notice:', err);
    }
  }, [habitation, site]);

  // Update Layer Visibilities Immediately on toggle change
  const syncLayerVisibility = useCallback((map: maptilersdk.Map) => {
    try {
      // Planning Boundary Layers (Visible in all stages as safe designated zone)
      const showPlanning = layersVisibility.planningBoundary;
      if (map.getLayer('planning-fill')) {
        map.setLayoutProperty('planning-fill', 'visibility', showPlanning ? 'visible' : 'none');
        map.setPaintProperty('planning-fill', 'fill-opacity', stage === 'after' ? 0.34 : stage === 'relocation' ? 0.28 : 0.22);
      }
      if (map.getLayer('planning-line')) {
        map.setLayoutProperty('planning-line', 'visibility', showPlanning ? 'visible' : 'none');
      }
      if (map.getLayer('planning-glow')) {
        map.setLayoutProperty('planning-glow', 'visibility', showPlanning ? 'visible' : 'none');
      }

      // Red Zone Layers
      const showRedZone = layersVisibility.modelledRedZone;
      if (map.getLayer('redzone-fill')) {
        map.setLayoutProperty('redzone-fill', 'visibility', showRedZone ? 'visible' : 'none');
        map.setPaintProperty('redzone-fill', 'fill-opacity', stage === 'after' ? 0.40 : 0.30);
      }
      if (map.getLayer('redzone-line')) {
        map.setLayoutProperty('redzone-line', 'visibility', showRedZone ? 'visible' : 'none');
      }
      if (map.getLayer('redzone-glow')) {
        map.setLayoutProperty('redzone-glow', 'visibility', showRedZone ? 'visible' : 'none');
      }

      // Route Line
      const showRoute = layersVisibility.relocationRoute && (stage === 'relocation' || stage === 'after');
      if (map.getLayer('route-line')) {
        map.setLayoutProperty('route-line', 'visibility', showRoute ? 'visible' : 'none');
      }
      if (map.getLayer('route-glow')) {
        map.setLayoutProperty('route-glow', 'visibility', showRoute ? 'visible' : 'none');
      }

      // Rehabilitation Facilities Polygons & Roads
      const showRehab = stage === 'after' || stage === 'relocation' || layersVisibility.proposedRehabilitation;
      if (map.getLayer('rehab-polygons-fill')) {
        map.setLayoutProperty('rehab-polygons-fill', 'visibility', showRehab ? 'visible' : 'none');
      }
      if (map.getLayer('rehab-polygons-line')) {
        map.setLayoutProperty('rehab-polygons-line', 'visibility', showRehab ? 'visible' : 'none');
      }
      if (map.getLayer('rehab-lines')) {
        map.setLayoutProperty('rehab-lines', 'visibility', showRehab ? 'visible' : 'none');
      }
      if (map.getLayer('rehab-lines-casing')) {
        map.setLayoutProperty('rehab-lines-casing', 'visibility', showRehab ? 'visible' : 'none');
      }
    } catch (err) {
      console.warn('Layer visibility sync notice:', err);
    }
  }, [layersVisibility, stage]);

  // Fit camera bounds to encompass BOTH habitation and site
  const fitCameraBounds = useCallback((map: maptilersdk.Map) => {
    try {
      const bounds = new maptilersdk.LngLatBounds();
      bounds.extend([habitation.lng, habitation.lat]);
      bounds.extend([site.lng, site.lat]);

      // Add padding for markers and badges
      map.fitBounds(bounds, {
        padding: { top: 85, bottom: 85, left: 95, right: 95 },
        maxZoom: 13.8,
        duration: 1100
      });
    } catch (err) {
      console.warn('Map fitBounds notice:', err);
    }
  }, [habitation, site]);

  // Initialize Map Instance ONCE
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    if (!mapInstanceRef.current) {
      try {
        let mapStyle: any = SATELLITE_RASTER_STYLE;

        if (apiKey && apiKey.trim() !== '') {
          maptilersdk.config.apiKey = apiKey;
          mapStyle = layersVisibility.satelliteImagery 
            ? maptilersdk.MapStyle.SATELLITE 
            : maptilersdk.MapStyle.DATAVIZ.DARK;
        } else {
          mapStyle = layersVisibility.satelliteImagery 
            ? SATELLITE_RASTER_STYLE 
            : DARK_RASTER_STYLE;
        }

        const centerLng = (habitation.lng + site.lng) / 2;
        const centerLat = (habitation.lat + site.lat) / 2;

        const map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: mapStyle,
          center: [centerLng, centerLat],
          zoom: 12.2,
          navigationControl: false
        });

        map.on('load', () => {
          isMapLoadedRef.current = true;
          setupLayers(map);
          updateGeoData(map);
          syncLayerVisibility(map);
          refreshMarkers(map);
          fitCameraBounds(map);
        });

        map.on('error', (e) => {
          console.warn('MapTiler event notice:', e);
        });

        mapInstanceRef.current = map;
      } catch (err) {
        console.warn('Map initialization caught, fallback triggered:', err);
      }
    }

    // Auto resize map when container or viewport width changes
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      // Retain persistent map instance to prevent flickering
    };
  }, []);

  // Update Map when Habitation or Site or District changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoadedRef.current) return;

    updateGeoData(map);
    syncLayerVisibility(map);
    refreshMarkers(map);
    fitCameraBounds(map);
  }, [habitation, site, updateGeoData, syncLayerVisibility, refreshMarkers, fitCameraBounds]);

  // Update Layer Visibility & Markers when toggles or stage change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoadedRef.current) return;

    syncLayerVisibility(map);
    refreshMarkers(map);
  }, [layersVisibility, stage, syncLayerVisibility, refreshMarkers]);

  // Navigation Control Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleLocateVillage = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [habitation.lng, habitation.lat],
        zoom: 14.2,
        speed: 1.3
      });
    }
  };

  const handleLocateSite = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [site.lng, site.lat],
        zoom: 14.5,
        speed: 1.3
      });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      fitCameraBounds(mapInstanceRef.current);
    }
  };

  const handleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-[48vh] min-h-[320px] max-h-[550px] md:h-[540px] md:max-h-none lg:h-[600px] bg-[#0B0F17] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Simulation Stage & Target Indicator Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none flex flex-col space-y-1 max-w-[calc(100%-80px)]">
        <div className="bg-[#0B0F17]/95 backdrop-blur-md border border-[#1E293B] px-2.5 py-1.5 rounded-xl shadow-xl flex items-center space-x-1.5 flex-wrap">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
          <div className="text-[10px] sm:text-[11px] font-black text-[#F8FAFC] tracking-wider uppercase flex items-center space-x-1">
            <span>{t('stage', currentLang)}:</span>
            <span className={
              stage === 'after' 
                ? 'text-[#34D399] bg-[#10B981]/20 px-1.5 py-0.5 rounded border border-[#10B981]/40' 
                : stage === 'relocation'
                ? 'text-[#0EA5E9] bg-[#0EA5E9]/20 px-1.5 py-0.5 rounded border border-[#0EA5E9]/40'
                : 'text-[#EF4444] bg-[#EF4444]/20 px-1.5 py-0.5 rounded border border-[#EF4444]/40'
            }>
              {stage.toUpperCase()}
            </span>
          </div>
          <span className="text-[#64748B] text-[10px] hidden sm:inline">|</span>
          <span className="text-[9px] sm:text-[10px] text-[#94A3B8] truncate max-w-[140px] sm:max-w-none">
            {habitation.name} → {site.name}
          </span>
        </div>

        {stage === 'after' && (
          <div className="bg-[#10B981]/20 backdrop-blur border border-[#10B981]/60 px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold text-[#34D399] flex items-center space-x-1 shadow-lg max-w-fit">
            <CheckCircle2 className="w-3 h-3 text-[#34D399] shrink-0" />
            <span className="truncate">RESILIENT SETTLEMENT ACTIVE</span>
          </div>
        )}
      </div>

      {/* Top Right: Tactical Map Controls */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col space-y-1.5 bg-[#0B0F17]/95 border border-[#1E293B] p-1 rounded-xl shadow-xl">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleLocateVillage}
          title="Locate Current Vulnerable Village"
          aria-label="Locate Village"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#EF4444] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={handleLocateSite}
          title="Locate Candidate Relocation Site"
          aria-label="Locate Site"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#10B981] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <MapPin className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset View (Fit Both Village & Site)"
          aria-label="Reset View"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#0EA5E9] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={handleFullscreen}
          title="Fullscreen Map"
          aria-label="Fullscreen Map"
          className="w-8 h-8 rounded-lg bg-[#16202B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Right: Dark GIS Symbology Legend */}
      <div className="absolute bottom-4 right-4 z-20 bg-[#0B0F17]/95 backdrop-blur-md border border-[#1E293B] p-3 rounded-xl text-[10px] space-y-1.5 shadow-2xl hidden sm:block max-w-[240px]">
        <div className="font-black text-[#64748B] uppercase tracking-wider text-[9px] border-b border-[#1E293B] pb-1 flex items-center justify-between">
          <span>GIS Symbology</span>
          <Layers className="w-3 h-3 text-[#10B981]" />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0" />
          <span className="text-[#F8FAFC] truncate">Current Habitation</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded bg-[#EF4444]/30 border border-[#DC2626] border-dashed shrink-0" />
          <span className="text-[#94A3B8] truncate">Modelled Red Zone</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
          <span className="text-[#F8FAFC] truncate">Candidate Safe Site</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded bg-[#10B981]/30 border border-[#34D399] shrink-0" />
          <span className="text-[#34D399] font-medium truncate">Planning Boundary ({site.landAvailabilityHa} ha)</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-3.5 h-0.5 bg-[#0EA5E9] inline-block border-dashed shrink-0" />
          <span className="text-[#0EA5E9] truncate">Transit Route ({distanceKm} km)</span>
        </div>

        {(stage === 'after' || stage === 'relocation' || layersVisibility.proposedRehabilitation) && (
          <div className="pt-1 border-t border-[#1E293B] space-y-1">
            <div className="text-[8px] font-black uppercase text-[#34D399]">Rehab Facilities:</div>
            <div className="flex items-center space-x-1.5 text-[9px] text-[#94A3B8]">
              <span>🏠 Housing</span>
              <span>🏥 PHC</span>
              <span>🏫 School</span>
              <span>🌳 Park</span>
            </div>
          </div>
        )}
      </div>

      {/* POPUP MODAL: CURRENT VILLAGE PROFILE */}
      {activePopupVillage && (
        <div className="absolute top-14 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 w-auto sm:w-80 max-w-sm bg-[#111827] border border-[#EF4444] rounded-2xl p-3.5 sm:p-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E293B] mb-2">
            <span className="text-[10px] uppercase font-bold text-[#EF4444] flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span>Vulnerable Settlement Profile</span>
            </span>
            <button
              onClick={() => setActivePopupVillage(null)}
              className="text-[#64748B] hover:text-[#F8FAFC] text-xs font-bold w-6 h-6 flex items-center justify-center rounded bg-[#16202B] cursor-pointer"
            >
              ✕
            </button>
          </div>

          <h4 className="text-base font-black text-[#F8FAFC]">{activePopupVillage.name}</h4>
          <p className="text-xs text-[#94A3B8]">{activePopupVillage.taluka} Taluka, {activePopupVillage.district} District</p>

          <div className="grid grid-cols-2 gap-2 my-2.5 text-[11px] bg-[#0B0F17] p-2.5 rounded-xl border border-[#1E293B]">
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Risk Score</span>
              <strong className="text-[#EF4444] font-mono text-sm">{activePopupVillage.riskScore} / 100</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Exposed Pop</span>
              <strong className="text-[#F8FAFC]">{activePopupVillage.population} ({activePopupVillage.households} hh)</strong>
            </div>
            <div className="col-span-2">
              <span className="text-[#64748B] block text-[9px] uppercase">Primary Hazard</span>
              <strong className="text-[#F8FAFC]">{activePopupVillage.primaryHazard} — {activePopupVillage.terrainSlope}</strong>
            </div>
          </div>

          <p className="text-[10px] text-[#94A3B8] leading-tight italic bg-[#16202B] p-2 rounded-lg border border-[#1E293B]">
            ⚠ Modelled red zone analysis — not an official statutory designation.
          </p>
        </div>
      )}

      {/* POPUP MODAL: CANDIDATE SITE PROFILE */}
      {activePopupSite && (
        <div className="absolute top-14 sm:top-20 left-3 right-3 sm:left-auto sm:right-6 z-30 w-auto sm:w-80 max-w-sm bg-[#111827] border border-[#10B981] rounded-2xl p-3.5 sm:p-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E293B] mb-2">
            <span className="text-[10px] uppercase font-bold text-[#10B981] flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Candidate Safe Site Profile</span>
            </span>
            <button
              onClick={() => setActivePopupSite(null)}
              className="text-[#64748B] hover:text-[#F8FAFC] text-xs font-bold w-6 h-6 flex items-center justify-center rounded bg-[#16202B] cursor-pointer"
            >
              ✕
            </button>
          </div>

          <h4 className="text-base font-black text-[#F8FAFC]">{activePopupSite.name}</h4>
          <p className="text-xs text-[#94A3B8]">{activePopupSite.taluka} Taluka, {activePopupSite.district} District</p>

          <div className="grid grid-cols-2 gap-2 my-2.5 text-[11px] bg-[#0B0F17] p-2.5 rounded-xl border border-[#1E293B]">
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Suitability</span>
              <strong className="text-[#34D399] font-mono text-sm">{activePopupSite.suitabilityScore} pts</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Capacity</span>
              <strong className="text-[#F8FAFC]">{activePopupSite.estimatedCapacity} persons</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Planning Area</span>
              <strong className="text-[#34D399] font-mono">{activePopupSite.landAvailabilityHa} ha</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9px] uppercase">Road Access</span>
              <strong className="text-[#F8FAFC]">{activePopupSite.roadAccess}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-[#64748B] block text-[9px] uppercase">Relocation Distance</span>
              <strong className="text-[#0EA5E9] font-mono">{distanceKm} km from {habitation.name}</strong>
            </div>
          </div>

          <div className="text-[10px] text-[#34D399] bg-[#10B981]/15 p-2 rounded-lg border border-[#10B981]/30">
            ✓ Geotechnically vetted safe zone outside modelled hazard buffer.
          </div>
        </div>
      )}

      {/* POPUP MODAL: REHABILITATION FACILITY DETAILS */}
      {activePopupFacility && (
        <div className="absolute bottom-16 left-3 right-3 sm:right-auto sm:left-6 z-30 w-auto sm:w-72 max-w-sm bg-[#111827] border border-[#34D399] rounded-2xl p-3 sm:p-3.5 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1E293B] mb-2">
            <span className="text-[10px] uppercase font-bold text-[#34D399] flex items-center space-x-1">
              <span>{activePopupFacility.icon}</span>
              <span>{activePopupFacility.category}</span>
            </span>
            <button
              onClick={() => setActivePopupFacility(null)}
              className="text-[#64748B] hover:text-[#F8FAFC] text-xs font-bold w-6 h-6 flex items-center justify-center rounded bg-[#16202B] cursor-pointer"
            >
              ✕
            </button>
          </div>

          <h5 className="text-sm font-black text-[#F8FAFC]">{activePopupFacility.name}</h5>
          <p className="text-xs text-[#34D399] mt-1 font-mono font-medium">{activePopupFacility.specs}</p>
          <div className="mt-2 text-[10px] text-[#94A3B8] leading-tight">
            Integrated within the candidate planning sector for {site.name}.
          </div>
        </div>
      )}
    </div>
  );
};
