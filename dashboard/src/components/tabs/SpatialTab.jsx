import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import stationsData from '../../data/stations.json';
import { Layers, Compass, MapPin } from 'lucide-react';

export default function SpatialTab() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedStation, setSelectedStation] = useState(stationsData[0]);
  const [showRadius, setShowRadius] = useState(true);
  const [zoneFilter, setZoneFilter] = useState('All');
  const circleRef = useRef(null);

  const zones = ['All', ...new Set(stationsData.map(s => s.zone))];

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [-7.45, 111.45],
        zoom: 8,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    const getZoneColor = (zone) => {
      if (zone.includes('Hulu')) return '#3B82F6'; 
      if (zone.includes('Tengah')) return '#06B6D4'; 
      if (zone.includes('Hilir')) return '#10B981'; 
      return '#8B5CF6'; 
    };

    const filtered = zoneFilter === 'All' 
      ? stationsData 
      : stationsData.filter(s => s.zone === zoneFilter);

    filtered.forEach((station) => {
      const color = getZoneColor(station.zone);
      const isSelected = selectedStation?.nama_pos === station.nama_pos;

      const markerHtml = `
        <div style="
          width: ${isSelected ? '24px' : '18px'};
          height: ${isSelected ? '24px' : '18px'};
          background-color: ${color};
          border: 2px solid ${isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.85)'};
          border-radius: 50%;
          box-shadow: 0 0 ${isSelected ? '15px' : '8px'} ${color};
          cursor: pointer;
          transition: all 0.2s ease;
        "></div>
      `;

      const icon = L.divIcon({
        className: 'custom-pin',
        html: markerHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([station.latitude, station.longitude], { icon }).addTo(map);

      marker.on('click', () => {
        setSelectedStation(station);
      });

      marker.bindTooltip(`
        <div style="font-family: inherit; font-size: 11px; color: #0F172A;">
          <b style="color: ${color}">${station.nama_pos}</b><br/>
          <span>${station.zone}</span><br/>
          <span>Mean TMA: <b>${station.mean} mdpl</b></span>
        </div>
      `, { direction: 'top', offset: [0, -10] });
    });

    if (selectedStation && showRadius) {
      circleRef.current = L.circle([selectedStation.latitude, selectedStation.longitude], {
        color: '#06B6D4',
        fillColor: '#06B6D4',
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '4, 8',
        radius: 30000 
      }).addTo(map);
    }

  }, [selectedStation, showRadius, zoneFilter]);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border dark:border-white/10 border-slate-200">
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <span className="text-xs font-mono dark:text-slate-400 text-slate-600 flex items-center gap-1 font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-500" /> Zonasi DAS:
          </span>
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setZoneFilter(z)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                zoneFilter === z
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-medium dark:text-slate-300 text-slate-700 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showRadius} 
              onChange={(e) => setShowRadius(e.target.checked)}
              className="rounded dark:bg-slate-900 bg-white border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <span>Tampilkan Radius Haversine 30 KM</span>
          </label>
        </div>

      </div>

      {/* Main Grid: Interactive Map & Station Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Map Container (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-panel border dark:border-white/10 border-slate-200 relative h-[520px] shadow-lg">
          <div ref={mapRef} className="w-full h-full z-0" />
          
          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-10 glass-panel p-3 rounded-xl border dark:border-white/10 border-slate-200 backdrop-blur-md text-[11px] space-y-1.5 shadow-lg">
            <p className="font-mono uppercase font-bold dark:text-slate-300 text-slate-800 mb-1">Legenda Zonasi Pos (30 Stasiun)</p>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="dark:text-slate-300 text-slate-700">DAS Solo Hulu</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400"></span><span className="dark:text-slate-300 text-slate-700">DAS Solo Tengah</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="dark:text-slate-300 text-slate-700">DAS Solo Hilir</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span><span className="dark:text-slate-300 text-slate-700">DAS Kali Lamong & Hilir Timur</span></div>
          </div>
        </div>

        {/* Right: Selected Station Detail (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {selectedStation && (
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b dark:from-cyan-500/10 from-cyan-500/5 to-transparent space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold">
                    Pos Terpilih
                  </span>
                  <h3 className="text-xl font-extrabold dark:text-white text-slate-900 mt-1">{selectedStation.nama_pos}</h3>
                  <p className="text-xs dark:text-slate-300 text-slate-600 font-medium">{selectedStation.zone}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3" /> BBWS Solo
                </span>
              </div>

              {/* Station Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl inner-card">
                  <span className="dark:text-slate-400 text-slate-500 font-mono">Mean Elevasi (TMA)</span>
                  <p className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-300 mt-0.5">{selectedStation.mean} <span className="text-[10px]">mdpl</span></p>
                </div>
                <div className="p-2.5 rounded-xl inner-card">
                  <span className="dark:text-slate-400 text-slate-500 font-mono">Standar Deviasi</span>
                  <p className="text-base font-bold font-mono dark:text-slate-100 text-slate-900 mt-0.5">± {selectedStation.std} <span className="text-[10px]">mdpl</span></p>
                </div>
                <div className="p-2.5 rounded-xl inner-card">
                  <span className="dark:text-slate-400 text-slate-500 font-mono">Rentang Min</span>
                  <p className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedStation.min} mdpl</p>
                </div>
                <div className="p-2.5 rounded-xl inner-card">
                  <span className="dark:text-slate-400 text-slate-500 font-mono">Rentang Max</span>
                  <p className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5">{selectedStation.max} mdpl</p>
                </div>
              </div>

              <div className="pt-2 border-t dark:border-white/10 border-slate-200 text-xs font-mono dark:text-slate-400 text-slate-600 flex items-center justify-between">
                <span>Lat: {selectedStation.latitude}°</span>
                <span>Lon: {selectedStation.longitude}°</span>
              </div>
            </div>
          )}

          {/* Spatial Anchor Formulation Insight from Paper */}
          <div className="glass-panel p-5 rounded-2xl border dark:border-white/10 border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Compass className="w-4 h-4" />
              <h4 className="font-bold text-sm dark:text-white text-slate-900">Konstruksi Haversine Spatial Anchor</h4>
            </div>
            <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
              Jarak geodesic (d_ij) antar setiap pasangan dari 30 pos pemantauan dihitung menggunakan formula Haversine. Bobot pengaruh antar stasiun didefinisikan melalui peluruhan eksponensial:
            </p>
            <div className="p-2.5 rounded-lg dark:bg-slate-950/80 bg-slate-100 border dark:border-white/10 border-slate-300 font-mono text-xs text-cyan-700 dark:text-cyan-300 text-center font-bold">
              W_ij = exp( - d_ij / 30 km )
            </div>
            <p className="text-[11px] dark:text-slate-400 text-slate-600 leading-relaxed">
              Sebagaimana dirumuskan pada Bagian III.D Makalah Ilmiah, skala D = 30 km secara optimal menangkap propagasi aliran debit banjir hulu-ke-hilir pada stasiun terdekat.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
