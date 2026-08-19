import React from 'react';
import { 
  Trophy, 
  Target, 
  MapPin, 
  Database, 
  Compass, 
  TrendingUp, 
  Zap, 
  GraduationCap, 
  Award, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import cvData from '../../data/cv_metrics.json';
import edaData from '../../data/eda_metrics.json';

export default function OverviewTab({ setActiveTab }) {
  const authors = [
    { name: "Rizki Piji Fathoni", role: "Ketua Tim & 1st Author", focus: "Model Architecture, Optuna Bayesian Tuning & Ensemble Strategy" },
    { name: "Ivan Andika Setyawan", role: "Anggota Tim & 2nd Author", focus: "River Basin Physics, Multi-Lag Rainfall Propagation & Feature Engineering" },
    { name: "Ketut Shridhara", role: "Anggota Tim & 3rd Author", focus: "Haversine Spatial Topology & Geospatial Anchor Construction" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* KPI 1: Best Kaggle Score */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider">Kaggle Private RMSE</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white text-slate-900 tracking-tight">1.42078</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Top Tier</span>
          </div>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 flex items-center gap-1 font-medium">
            <span className="dark:text-slate-300 text-slate-700 font-mono">Public Score: 0.63839</span> • 21.780 prediksi
          </p>
        </div>

        {/* KPI 2: 5-Fold CV Mean RMSE */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider">5-Fold CV RMSE</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white text-slate-900 tracking-tight">2.11892</span>
            <span className="text-xs font-mono dark:text-slate-400 text-slate-500">± 0.845</span>
          </div>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 font-medium">
            Evaluasi ketat 5-Fold Cross Validation bebas data-leakage
          </p>
        </div>

        {/* KPI 3: Total Observation Stations */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider">Stasiun Observasi</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white text-slate-900 tracking-tight">30</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Jateng & Jatim</span>
          </div>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 font-medium">
            DAS Bengawan Solo, Brantas, & Kali Lamong
          </p>
        </div>

        {/* KPI 4: Total Training Volume */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider">Volume Observasi</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono dark:text-white text-slate-900 tracking-tight">84.396</span>
            <span className="text-xs font-mono dark:text-slate-400 text-slate-500">Titik Waktu</span>
          </div>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 font-medium">
            Resolusi 6-jam per pos pengamatan (2025 - 2026)
          </p>
        </div>

      </div>

      {/* Main Grid: Team Identity & Research Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Team Identity & Affiliation (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-slate-200 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">Profil Tim Peneliti</span>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">Tim Datashine</h2>
              </div>
              <div className="w-12 h-12 rounded-xl dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 p-1.5 flex items-center justify-center shadow-sm">
                <img 
                  src="/logo_unesa.png" 
                  alt="Logo UNESA" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            {/* Institution Badge */}
            <div className="p-3.5 rounded-xl dark:bg-slate-900/60 bg-slate-100/80 border dark:border-white/5 border-slate-200 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold dark:text-slate-200 text-slate-800">
                <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Universitas Negeri Surabaya (UNESA)</span>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 pl-6 mt-0.5 font-medium">
                Program Studi S1 Sains Data • Fakultas Matematika dan Ilmu Pengetahuan Alam
              </p>
            </div>

            {/* Authors List */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider dark:text-slate-400 text-slate-500 font-semibold">Anggota Peneliti:</span>
              {authors.map((author, idx) => (
                <div key={idx} className="p-3 rounded-xl dark:bg-slate-950/40 bg-white border dark:border-white/5 border-slate-200 hover:border-cyan-500/40 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm dark:text-slate-100 text-slate-900">{author.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 font-bold">
                      {author.role}
                    </span>
                  </div>
                  <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">{author.focus}</p>
                </div>
              ))}
            </div>

            {/* Supervisor Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 font-bold uppercase">Dosen Pembimbing:</span>
                  <p className="text-sm font-bold dark:text-slate-100 text-slate-900">Ulfa Siti Nuraini, S.Stat., M.Stat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between text-xs dark:text-slate-400 text-slate-600 font-mono">
            <span>Sebelas Maret Statistics Fair 2026</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Finalis Resmi Top 8
            </span>
          </div>
        </div>

        {/* Right Col: Executive Summary & 3 Innovation Pillars (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Executive Summary Card */}
          <div className="glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg font-bold dark:text-white text-slate-900">Ringkasan Eksekutif & Urgensi Masalah</h3>
            </div>
            <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed mb-3">
              Wilayah Sungai Bengawan Solo dan Kali Lamong merupakan urat nadi hidrologis strategis di Pulau Jawa yang memiliki karakteristik non-linier tinggi. Fluktuasi elevasi muka air (TMA) di pos-pos pengamatan hilir (seperti Babat dan Bojonegoro) sangat dipengaruhi oleh kombinasi propagasi limpasan hujan hulu, kejenuhan air tanah, interaksi jarak antar-stasiun, serta fenomena iklim makro (ENSO dan MJO).
            </p>
            <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed">
              Tim Datashine merancang arsitektur <strong>LightGBM</strong> berbasis <span className="text-cyan-600 dark:text-cyan-300 font-bold">Haversine Spatial Topology</span> dan <span className="text-cyan-600 dark:text-cyan-300 font-bold">Explicit Temporal Decay</span> yang dinormalisasi per stasiun, menghasilkan prediksi TMA yang sangat akurat dan tangguh terhadap pergeseran rezim musim.
            </p>
          </div>

          {/* 3 Pillars of Methodological Innovation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Pillar 1 */}
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 bg-gradient-to-b dark:from-cyan-500/5 from-cyan-500/10 to-transparent">
              <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm dark:text-white text-slate-900 mb-1.5">1. Haversine Spatial Anchor</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                Pembobotan eksponensial matriks jarak geospasial (Radius = 30 KM) untuk mentransfer sinyal elevasi stasiun tetangga ke titik target.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-panel p-4 rounded-xl border border-blue-500/20 bg-gradient-to-b dark:from-blue-500/5 from-blue-500/10 to-transparent">
              <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm dark:text-white text-slate-900 mb-1.5">2. Explicit Temporal Decay</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                Peluruhan memori jangka pendek (&tau; = 24 jam) dan jangka panjang (&tau; = 168 jam) untuk menangkap inersia dinamika hidrologis.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-panel p-4 rounded-xl border border-emerald-500/20 bg-gradient-to-b dark:from-emerald-500/5 from-emerald-500/10 to-transparent">
              <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm dark:text-white text-slate-900 mb-1.5">3. Dynamic Sample Weighting</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                Penalti proporsional bertingkat (hingga 3.0x) khusus pada stasiun anomali tinggi (Babat, Bojonegoro) guna menjinakkan deviasi ekstrem.
              </p>
            </div>

          </div>

          {/* Call-to-action bar */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent border border-cyan-500/20 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-cyan-600 dark:text-cyan-300">Eksplorasi Lengkap Sistem</p>
              <p className="text-xs dark:text-slate-400 text-slate-600">Jelajahi peta spasial 30 stasiun, uji model, dan coba simulasi prediksi per pos.</p>
            </div>
            <button 
              onClick={() => setActiveTab('spatial')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors shadow-glow-cyan whitespace-nowrap"
            >
              <span>Buka Peta Spasial</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
