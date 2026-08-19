import React, { useState } from 'react';
import { 
  BarChart2, 
  CloudSun, 
  Droplets, 
  Activity, 
  Calendar,
  Sparkles,
  TrendingUp,
  Layers,
  Compass,
  Zap,
  Grid
} from 'lucide-react';
import edaData from '../../data/eda_metrics.json';

// Chart.js Registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EdaTab() {
  const [activeEdaSubTab, setActiveEdaSubTab] = useState('global-seasonal');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // 1. Histogram Chart Data
  const histogramChartData = {
    labels: edaData.histogram.bin_labels,
    datasets: [
      {
        label: 'Frekuensi Titik Observasi (KDE Distribution)',
        data: edaData.histogram.counts,
        backgroundColor: 'rgba(6, 182, 212, 0.65)',
        borderColor: '#06B6D4',
        borderWidth: 1.5,
        borderRadius: 4,
      }
    ]
  };

  // 2. Monthly Trend Chart Data
  const monthlyChartData = {
    labels: edaData.monthly_trends.map(m => months[m.month - 1] || `Bulan ${m.month}`),
    datasets: [
      {
        label: 'Rata-rata TMA (mdpl)',
        data: edaData.monthly_trends.map(m => m.mean),
        backgroundColor: 'rgba(6, 182, 212, 0.65)',
        borderColor: '#06B6D4',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Elevasi Maksimum (mdpl)',
        data: edaData.monthly_trends.map(m => m.max),
        type: 'line',
        borderColor: '#F43F5E',
        borderWidth: 2,
        pointBackgroundColor: '#F43F5E',
        pointRadius: 4,
        fill: false,
        tension: 0.3
      },
      {
        label: 'Elevasi Minimum (mdpl)',
        data: edaData.monthly_trends.map(m => m.min),
        type: 'line',
        borderColor: '#10B981',
        borderWidth: 2,
        pointBackgroundColor: '#10B981',
        pointRadius: 4,
        fill: false,
        tension: 0.3
      }
    ]
  };

  // 3. Scatter Plot CEDA Data (Anchor 0h vs Normalized Target)
  const scatterChartData = {
    datasets: [
      {
        label: 'Sampel Observasi Pasca-Normalisasi (N = 250)',
        data: edaData.scatter_sample.map(p => ({ x: p.anchor, y: p.target })),
        backgroundColor: 'rgba(6, 182, 212, 0.55)',
        borderColor: '#06B6D4',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94A3B8', font: { family: 'Plus Jakarta Sans', size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(11, 19, 33, 0.95)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        borderColor: 'rgba(6, 182, 212, 0.3)',
        borderWidth: 1,
        padding: 10,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8', font: { family: 'Plus Jakarta Sans', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  };

  const scatterOptions = {
    ...chartOptions,
    scales: {
      x: {
        title: { display: true, text: 'TMA Anchor 0h (Normalized)', color: '#94A3B8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        title: { display: true, text: 'TMA Aktual Masa Depan (Normalized)', color: '#94A3B8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  };

  // Function to render heatmaps
  const renderHeatmap = (corrData) => (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-xs font-mono border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left text-slate-400 font-medium">Fitur</th>
            {corrData.labels.map((lbl, idx) => (
              <th key={idx} className="p-2 text-slate-300 font-semibold truncate max-w-[100px]">{lbl}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {corrData.matrix.map((row, rIdx) => (
            <tr key={rIdx}>
              <td className="p-2 text-left font-semibold text-slate-200 truncate max-w-[140px]">
                {corrData.labels[rIdx]}
              </td>
              {row.map((val, cIdx) => {
                const abs = Math.abs(val);
                const bg = val > 0 
                  ? `rgba(6, 182, 212, ${abs * 0.75 + 0.1})` 
                  : `rgba(244, 63, 94, ${abs * 0.75 + 0.1})`;
                const textColor = abs > 0.4 ? '#FFFFFF' : '#CBD5E1';
                return (
                  <td 
                    key={cIdx} 
                    className="p-2 font-bold rounded m-0.5"
                    style={{ backgroundColor: bg, color: textColor }}
                  >
                    {val.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Navigation for EDA Modules */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div>
          <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">Eksplorasi Data Saintifik</span>
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Kajian Menyeluruh Karakteristik & Dinamika Data</h3>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveEdaSubTab('global-seasonal')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeEdaSubTab === 'global-seasonal'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            1. Elevasi & Musiman
          </button>
          <button
            onClick={() => setActiveEdaSubTab('macro-climate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeEdaSubTab === 'macro-climate'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            2. Iklim Makro (ENSO/MJO)
          </button>
          <button
            onClick={() => setActiveEdaSubTab('ceda-decay')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeEdaSubTab === 'ceda-decay'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            3. CEDA Pasca-Pemrosesan
          </button>
          <button
            onClick={() => setActiveEdaSubTab('river-physics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeEdaSubTab === 'river-physics'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            4. Fisika Limpasan Hujan
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: ELEVASI & MUSIMAN */}
      {activeEdaSubTab === 'global-seasonal' && (
        <div className="space-y-6">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-slate-400">Rata-rata Global (Mean)</span>
              <p className="text-2xl font-bold text-cyan-400 mt-1">{edaData.distribution_summary.global_mean} <span className="text-xs font-normal">mdpl</span></p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-slate-400">Standar Deviasi Global</span>
              <p className="text-2xl font-bold text-slate-200 mt-1">± {edaData.distribution_summary.global_std} <span className="text-xs font-normal">mdpl</span></p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-slate-400">Elevasi Minimum (Hilir)</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{edaData.distribution_summary.global_min} <span className="text-xs font-normal">mdpl</span></p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-slate-400">Elevasi Maksimum (Hulu)</span>
              <p className="text-2xl font-bold text-rose-400 mt-1">{edaData.distribution_summary.global_max} <span className="text-xs font-normal">mdpl</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Histogram Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">Distribusi 84.396 Observasi</span>
                  <h4 className="text-lg font-bold dark:text-white text-slate-900">Histogram Elevasi Muka Air Global</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-white/10">30 Bins</span>
              </div>
              <div className="h-64 w-full">
                <Bar data={histogramChartData} options={chartOptions} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Distribusi memiliki bentuk multi-modal karena masing-masing stasiun bertumpu pada datum elevasi geografis yang berbeda (0-10 mdpl di hilir dan &gt;100 mdpl di hulu waduk).
              </p>
            </div>

            {/* Monthly Trend Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">Fluktuasi Hidrometri Bulanan</span>
                  <h4 className="text-lg font-bold dark:text-white text-slate-900">Variansi Elevasi Air per Bulan (Pola Musiman)</h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-white/10">Siklus 12 Bulan</span>
              </div>
              <div className="h-64 w-full">
                <Bar data={monthlyChartData} options={chartOptions} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Puncak elevasi air terjadi di bulan Januari s.d. Maret (puncak monsun barat), sementara September dan Oktober menunjukkan surut air terendah saat kemarau transisi.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: IKLIM MAKRO */}
      {activeEdaSubTab === 'macro-climate' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase">Matriks Korelasi Atmosfer Pearson (Exact)</span>
              <h4 className="text-xl font-bold dark:text-white text-slate-900">Korelasi Indikator Iklim Makro (ENSO & MJO)</h4>
              <p className="text-xs text-slate-400 mt-1">Dihitung secara eksak dari variabel iklim makro pada <code>data_lingkungan.csv</code>.</p>
            </div>

            {/* Exact Correlation Heatmap */}
            <div className="p-4 rounded-xl dark:bg-slate-950/70 bg-slate-50 border dark:border-white/5 border-slate-200">
              {renderHeatmap(edaData.macro_correlation)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl inner-card space-y-2">
                <h5 className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Indeks El Niño Southern Oscillation (Niño 3.4)
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  Indeks anomali suhu muka laut di Pasifik ekuatorial berkorelasi positif kuat terhadap durasi musim kemarau dan defisit curah hujan di Jawa. Fitur ini menempati posisi Top-6 di model LightGBM.
                </p>
              </div>

              <div className="p-4 rounded-xl inner-card space-y-2">
                <h5 className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4" /> Madden-Julian Oscillation (MJO Amplitude & Phase)
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  Gelombang konvektif MJO pada fase 3-5 (Benua Maritim Indonesia) meningkatkan probabilitas hujan ekstrem 30-60 harian yang memicu kenaikan TMA sungai secara cepat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CEDA PASCA-PEMROSESAN */}
      {activeEdaSubTab === 'ceda-decay' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CEDA Heatmap (7 Cols) */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase">Validasi Rekayasa Fitur</span>
                <h4 className="text-lg font-bold dark:text-white text-slate-900">Matriks Korelasi CEDA Fitur Peluruhan vs Target</h4>
                <p className="text-xs text-slate-400 mt-0.5">Membuktikan hubungan linier antara fitur bentukan dengan target ter-normalisasi.</p>
              </div>

              <div className="p-3 rounded-xl dark:bg-slate-950/70 bg-slate-50 border dark:border-white/5 border-slate-200">
                {renderHeatmap(edaData.ceda_correlation)}
              </div>
            </div>

            {/* Scatter Plot Anchor vs Target (5 Cols) */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase">Hubungan Linier Empiris</span>
                    <h4 className="text-lg font-bold dark:text-white text-slate-900">Scatter Plot: Anchor vs Target</h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">r = 0.98</span>
                </div>
                <div className="h-60 w-full pt-1">
                  <Scatter data={scatterChartData} options={scatterOptions} />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                <strong>Bukti Validitas:</strong> Korelasi linier yang sangat rapat membuktikan bahwa nilai jangkar historis (<em>Anchor 0h</em>) merupakan penuntun utama yang membuat LightGBM mampu memprediksi deviasi TMA secara akurat.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 4: FISIKA SUNGAI */}
      {activeEdaSubTab === 'river-physics' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <Droplets className="w-6 h-6" />
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Fisika Hidrograf & Perambatan Aliran</span>
              <h4 className="text-xl font-bold dark:text-white text-slate-900">Matriks Limpasan Hujan Efektif (Effective Rain) & Lag Waktu</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl inner-card space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">1. Infiltrasi vs Limpasan</span>
              <h5 className="font-bold text-slate-100 text-sm">Kejenuhan Tanah (Soil Moisture)</h5>
              <p className="text-slate-400 leading-relaxed">
                Lapisan tanah 0-7 cm dan 7-28 cm menentukan kapasitas retensi air. Model LightGBM memberikan gain tinggi pada soil moisture karena air hujan yang jatuh di tanah basah langsung bermigrasi ke badan sungai.
              </p>
            </div>

            <div className="p-4 rounded-xl inner-card space-y-2">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">2. Hujan Kumulatif Hulu</span>
              <h5 className="font-bold text-slate-100 text-sm">Lag Waktu Aliran (1D - 7D)</h5>
              <p className="text-slate-400 leading-relaxed">
                Fitur <code>g_rain_st1_7d</code> menduduki peringkat #2 Feature Importance karena waktu tempuh debit dari hulu Wonogiri ke hilir Babat membutuhkan 3 hingga 7 hari akumulasi curah hujan.
              </p>
            </div>

            <div className="p-4 rounded-xl inner-card space-y-2">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">3. Normalisasi Stasiun</span>
              <h5 className="font-bold text-slate-100 text-sm">Isolasi Skala Geografis</h5>
              <p className="text-slate-400 leading-relaxed">
                Mengurangi rata-rata elevasi tiap pos pengamatan membebaskan algoritma dari memorisasi lokasi absolut dan memaksanya berfokus pada variasi dinamis kenaikan/penurunan muka air.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
