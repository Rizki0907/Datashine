import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle
} from 'lucide-react';
import stationsData from '../../data/stations.json';
import timeseriesData from '../../data/timeseries.json';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ForecasterTab() {
  const [selectedStationName, setSelectedStationName] = useState('Babat');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedStation = stationsData.find(s => s.nama_pos === selectedStationName) || stationsData[0];
  const stationTs = timeseriesData[selectedStationName] || { historical: [], forecast: [] };

  const historicalDates = stationTs.historical.map(d => d.date);
  const historicalValues = stationTs.historical.map(d => d.tma);

  const forecastDates = stationTs.forecast.map(d => d.date);
  const forecastValues = stationTs.forecast.map(d => d.tma);

  const allDates = [...historicalDates, ...forecastDates];
  
  const histPadded = [...historicalValues, ...new Array(forecastDates.length).fill(null)];
  const lastHistVal = historicalValues[historicalValues.length - 1] || null;
  const forecastPadded = [...new Array(historicalDates.length - 1).fill(null), lastHistVal, ...forecastValues];

  const chartData = {
    labels: allDates,
    datasets: [
      {
        label: 'Observasi Historis (Train)',
        data: histPadded,
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.2
      },
      {
        label: 'Proyeksi Model LightGBM (Forecast)',
        data: forecastPadded,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#64748B', font: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' } }
      },
      tooltip: {
        backgroundColor: 'rgba(11, 19, 33, 0.95)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        borderColor: 'rgba(6, 182, 212, 0.3)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            if (context.raw === null) return null;
            return `${context.dataset.label}: ${context.raw} mdpl`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(100, 116, 139, 0.1)' },
        ticks: { 
          color: '#64748B', 
          font: { family: 'Plus Jakarta Sans', size: 10 },
          maxTicksLimit: 12
        }
      },
      y: {
        grid: { color: 'rgba(100, 116, 139, 0.1)' },
        ticks: { color: '#64748B', font: { family: 'JetBrains Mono', size: 11 } }
      }
    }
  };

  const filteredStations = stationsData.filter(s => 
    s.nama_pos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Station Selector Header */}
      <div className="glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between gap-4">
        
        {/* Station Select & Search */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 dark:text-slate-400 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Cari stasiun (30 pos)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl dark:bg-slate-950/80 bg-slate-50 border dark:border-white/10 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <select
            value={selectedStationName}
            onChange={(e) => setSelectedStationName(e.target.value)}
            className="px-3 py-2 rounded-xl dark:bg-slate-950 bg-white border border-cyan-500/40 text-xs font-mono text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none cursor-pointer shadow-sm"
          >
            {filteredStations.map((st) => (
              <option key={st.nama_pos} value={st.nama_pos} className="dark:bg-slate-950 bg-white text-slate-900 dark:text-white">
                {st.nama_pos} ({st.mean} mdpl)
              </option>
            ))}
          </select>
        </div>

        {/* Selected Station Quick Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-white/10 border-slate-200 dark:text-slate-300 text-slate-700 font-medium">
            Zonasi: <strong className="dark:text-white text-slate-900">{selectedStation.zone}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold">
            Mean: <strong>{selectedStation.mean} mdpl</strong>
          </span>
          {selectedStation.is_critical && (
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Sample Weighted
            </span>
          )}
        </div>

      </div>

      {/* Main Time Series Chart Container */}
      <div className="glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">Proyeksi Multijangka Waktu</span>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">Trajektori Elevasi Air: Pos {selectedStationName}</h3>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-semibold">
            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-300"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Observasi Historis</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-300"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Prediksi LightGBM</span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="pt-3 border-t dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between text-xs dark:text-slate-400 text-slate-600 font-mono">
          <span>Rentang Waktu: September 2025 s.d. Mei 2026</span>
          <span className="dark:text-slate-300 text-slate-700 font-semibold">Resolusi Harian Teragregasi • 30 Pos Pengamatan</span>
        </div>
      </div>

      {/* Critical Station Case Studies Grid */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">Studi Kasus Penjinakan Anomali</span>
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Evaluasi Stasiun Kritis & Efek Sample Weighting</h3>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-medium">Investigasi stasiun-stasiun dengan fluktuasi air ekstrem di fase transisi kemarau-hujan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Case 1: Babat */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b dark:from-amber-500/5 from-amber-500/10 to-transparent space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm dark:text-white text-slate-900">Stasiun Babat</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold">
                Bobot: 3.0x
              </span>
            </div>
            <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
              <strong>Tantangan:</strong> Elevasi aktual berfluktuasi drastis antara 2 hingga 7 mdpl saat pembukaan pintu air bendung. Model awal hanya menangkap pola rata-rata 5-6 mdpl.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              ✓ Solusi: Pembobotan penalti 3.0x berhasil memaksa LightGBM merekonstruksi lembah penurunan air.
            </p>
          </div>

          {/* Case 2: Bojonegoro - Kali Kethek */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b dark:from-amber-500/5 from-amber-500/10 to-transparent space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm dark:text-white text-slate-900">Bojonegoro - Kali Kethek</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold">
                Bobot: 2.0x
              </span>
            </div>
            <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
              <strong>Tantangan:</strong> Titik simpul konvergensi debit air dari hulu Madiun dan Bengawan Solo Tengah, rentan terhadap lonjakan backwater.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              ✓ Solusi: Bobot 2.0x + integrasi hujan 7 hari hulu (g_rain_st1_7d) menstabilkan prediksi puncak debit.
            </p>
          </div>

          {/* Case 3: Floodway & Bengkelolor */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b dark:from-amber-500/5 from-amber-500/10 to-transparent space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm dark:text-white text-slate-900">Floodway & Bengkelolor</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold">
                Bobot: 1.5x - 2.0x
              </span>
            </div>
            <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
              <strong>Tantangan:</strong> Kanal pelimpah banjir (Floodway) dengan dinamika hidraulik non-standar saat pelepasan volume air berlebih.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              ✓ Solusi: Target Normalization per pos berhasil mengisolasi anomali tanpa merusak akurasi stasiun normal lainnya.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
