import React from 'react';
import { 
  BookOpen, 
  Terminal, 
  GraduationCap
} from 'lucide-react';

export default function ReportTab() {
  const steps = [
    { title: "1. Akuisisi Data Multidimensi", desc: "Data historis TMA 30 stasiun, data iklim makro/mikro (ENSO, MJO, curah hujan, kelembaban tanah), dan koordinat geospasial pos." },
    { title: "2. Pra-Pemrosesan & Resampling", desc: "Interpolasi linier variabel dinamis, forward/backward fill iklim makro, dan agregasi terstandar ke resolusi 6 jam." },
    { title: "3. Sinkronisasi Fisika Sungai", desc: "Konstruksi matriks limpasan air hujan efektif (Rainfall × Soil Moisture) dan akumulasi global pivot berjalan 1D hingga 7D." },
    { title: "4. Jangkar Spasial Haversine", desc: "Perhitungan matriks jarak geodesic 30 pos dan pembobotan eksponensial (Radius = 30 KM) untuk membentuk vektor anchor." },
    { title: "5. Normalisasi Target Berbasis Pos", desc: "Transformasi Z-score per stasiun guna mengeliminasi disparitas datum elevasi alami antar-pos hulu dan hilir." },
    { title: "6. Optimasi Optuna & 5-Fold CV", desc: "Bayesian Optimization 75 trials untuk hyperparameter LightGBM dan evaluasi 5-Fold Cross Validation yang tangguh." }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Paper Abstract Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 relative overflow-hidden">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Abstrak Makalah Ilmiah</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 mb-4 leading-snug">
          Prediksi Tinggi Muka Air Sungai dengan LightGBM: Integrasi Jangkar Spasial Haversine dan Peluruhan Temporal Eksplisit
        </h3>

        <div className="space-y-3 text-xs sm:text-sm dark:text-slate-300 text-slate-700 leading-relaxed text-justify">
          <p>
            Prediksi Tinggi Muka Air (TMA) sungai yang akurat memegang peranan krusial dalam sistem peringatan dini banjir dan manajemen sumber daya air terpadu, khususnya pada Wilayah Sungai Bengawan Solo dan Kali Lamong yang memiliki dinamika hidrologis non-linier. Penelitian ini mengajukan arsitektur pemodelan prediktif berbasis <em>Light Gradient Boosting Machine</em> (LightGBM) yang mengintegrasikan rekayasa fitur bertingkat: <strong>Jangkar Spasial Haversine</strong> (<em>Spatial Anchor</em>, Radius = 30 KM), <strong>Peluruhan Temporal Eksplisit</strong> (<em>Explicit Temporal Decay</em> &tau; = 24 jam &amp; 168 jam), serta <strong>Matriks Limpasan Hujan Efektif</strong> (<em>Effective Rain</em>).
          </p>
          <p>
            Melalui normalisasi target adaptif per pos pengamatan dan penalti pembobotan sampel dinamis (<em>Dynamic Sample Weighting</em>) pada stasiun beranomali tinggi (Babat dan Bojonegoro), model berhasil menekan deviasi lokal secara signifikan tanpa mengorbankan stabilitas global. Evaluasi empiris 5-Fold Cross Validation menghasilkan rata-rata RMSE sebesar $2.11892 \pm 0.845$, dan berhasil membukukan skor kompetisi <strong>Private RMSE 1.42078</strong> (Public RMSE 0.63839) pada babak penyisihan Sebelas Maret Statistics Data Science (SSDS) 2026, membuktikan keandalan dan generalisasi model terhadap data tak terlihat.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono dark:text-slate-400 text-slate-600">
          <div>
            <strong className="dark:text-slate-200 text-slate-800">Kata Kunci:</strong> Tinggi Muka Air, LightGBM, Haversine Spatial Anchor, Temporal Decay, Effective Rain, Bengawan Solo.
          </div>
          <div className="text-cyan-600 dark:text-cyan-400 font-bold">
            Format: IEEE Conference Template (Maks. 11 Halaman)
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Architecture Flowchart */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 space-y-6">
        <div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">Arsitektur Alur Kerja</span>
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Pipeline Metodologi Data Mining End-to-End</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl dark:bg-slate-950/60 bg-white border dark:border-white/5 border-slate-200 hover:border-cyan-500/40 transition-all shadow-sm group">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="font-bold text-sm dark:text-white text-slate-900 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {step.title.split('. ')[1]}
                </h4>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed pl-8">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reproducibility & Artifact Resource Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Quick Execution Guide (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
            <Terminal className="w-5 h-5" />
            <h4 className="text-lg font-bold dark:text-white text-slate-900">Panduan Reproduksibilitas (Colab / Kaggle)</h4>
          </div>

          <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-900 text-slate-200 border border-slate-800 font-mono text-xs space-y-2 shadow-inner">
            <p className="text-slate-400"># 1. Download notebook resmi dari repositori tim</p>
            <p className="text-cyan-300">git clone https://github.com/Rizki0907/Datashine.git</p>
            <p className="text-slate-400 mt-2"># 2. Buka dan jalankan Datashine_Notebook.ipynb</p>
            <p className="text-emerald-400">!pip install -U gdown optuna lightgbm</p>
            <p className="text-slate-400 mt-2"># 3. Seluruh dataset diunduh otomatis via gdown tanpa perlu mount Google Drive!</p>
          </div>

          <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed font-medium">
            Notebook <code>Datashine_Notebook.ipynb</code> telah dirancang sepenuhnya mandiri (<em>self-contained</em>). Dengan mengaktifkan akselerator GPU (CUDA) pada platform Google Colab atau Kaggle, seluruh proses ekstraksi fitur hingga 5-Fold Cross Validation dapat direproduksi dalam waktu kurang dari 2 jam.
          </p>
        </div>

        {/* Right: Author Affiliation & Competition Summary (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Identitas Institusi & Tim</h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500 font-mono">Program Studi:</span>
                <p className="font-bold dark:text-white text-slate-900">S1 Sains Data</p>
                <p className="dark:text-slate-400 text-slate-600">Universitas Negeri Surabaya (UNESA)</p>
              </div>

              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500 font-mono">Susunan Tim:</span>
                <p className="font-bold dark:text-slate-100 text-slate-900">1. Rizki Piji Fathoni (Ketua)</p>
                <p className="font-bold dark:text-slate-100 text-slate-900">2. Ivan Andika Setyawan</p>
                <p className="font-bold dark:text-slate-100 text-slate-900">3. Ketut Shridhara</p>
              </div>

              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500 font-mono">Dosen Pembimbing:</span>
                <p className="font-bold text-amber-600 dark:text-amber-300">Ulfa Siti Nuraini, S.Stat., M.Stat.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t dark:border-white/10 border-slate-200 text-center">
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
              Sebelas Maret Statistics Fair (SSF) • HIMASTA UNS 2026
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
