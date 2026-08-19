import React from 'react';
import { 
  BookOpen, 
  Terminal, 
  GraduationCap
} from 'lucide-react';

export default function ReportTab() {
  const steps = [
    { title: "1. Akuisisi Data Multidimensi", desc: "Data historis TMA 30 stasiun BBWS Bengawan Solo (Jan 2023 - Mei 2026), variabel lingkungan resolusi per jam, dan indeks iklim makro (MJO, Niño 3.4)." },
    { title: "2. Pra-Pemrosesan & Resampling", desc: "Agregasi variabel lingkungan ke resolusi standar 6 jam, interpolasi linier kelembapan tanah, serta sinkronisasi iklim makro via forward/backward fill." },
    { title: "3. Sinkronisasi Fisika Sungai", desc: "Konstruksi curah hujan efektif (Rainfall × Soil Moisture Level 1) dan global pivot matrices untuk akumulasi hujan multi-stasiun (1D, 2D, 3D, 7D)." },
    { title: "4. Jangkar Spasial Haversine", desc: "Perhitungan matriks jarak geodesic 30 pos pemantauan dan pembobotan eksponensial (Radius D = 30 KM) untuk merepresentasikan rambatan aliran hulu-ke-hilir." },
    { title: "5. Normalisasi Target Z-Score", desc: "Transformasi Z-score per stasiun guna menstandarisasi skala prediksi lintas stasiun tanpa terdistorsi oleh perbedaan datum elevasi dasar alami." },
    { title: "6. Optimasi Optuna & 5-Fold CV", desc: "Optimasi hiperparameter Bayesian (75 trials, TPE sampler) dengan validasi 5-Fold Cross Validation dan ensemble bagging rata-rata 5 model." }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Paper Abstract Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 relative overflow-hidden">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Abstrak Makalah Ilmiah (SSDS 2026)</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 mb-4 leading-snug">
          Prediksi Tinggi Muka Air Sungai dengan LightGBM: Integrasi Jangkar Spasial Haversine dan Peluruhan Temporal Eksplisit
        </h3>

        <div className="space-y-3 text-xs sm:text-sm dark:text-slate-300 text-slate-700 leading-relaxed text-justify">
          <p>
            Prediksi Tinggi Muka Air (TMA) sungai secara akurat merupakan komponen krusial dalam mitigasi risiko banjir di Daerah Aliran Sungai (DAS) Bengawan Solo, sungai terbesar di Pulau Jawa yang melintasi Jawa Tengah dan Jawa Timur, terutama saat periode pergantian musim yang dipengaruhi oleh anomali iklim makro seperti ENSO dan MJO. Penelitian ini mengembangkan pendekatan prediksi TMA multi-stasiun pada 30 pos pemantauan BBWS Bengawan Solo (Januari 2023 – Mei 2026) berbasis gradient boosting dengan model LightGBM, yang diintegrasikan dengan dua inovasi rekayasa fitur utama: <strong>Haversine Spatial Anchor</strong>, yaitu nilai jangkar historis TMA dari stasiun-stasiun terdekat yang dibobotkan berdasarkan peluruhan eksponensial jarak geografis (<em>spatial decay</em>, $D = 30\text{ km}$), dan <strong>Peluruhan Temporal Eksplisit</strong> (<em>explicit temporal decay</em>) yang memodelkan pengaruh kondisi historis jangka pendek ($\tau = 24\text{ jam}$) dan jangka panjang ($\tau = 168\text{ jam}$) terhadap TMA saat ini.
          </p>
          <p>
            Selain itu, diterapkan konstruksi fitur <em>effective rain</em> (interaksi curah hujan dan kelembapan tanah), rolling akumulasi curah hujan multi-stasiun melalui <em>global pivot matrices</em>, serta normalisasi target berbasis Z-score per stasiun untuk menyeragamkan skala prediksi antar pos pengamatan. Optimasi hiperparameter dilakukan menggunakan Optuna (75 trials, TPE sampler) dengan validasi 5-Fold Cross-Validation. Hasil evaluasi pada platform Kaggle menunjukkan model yang dikembangkan memperoleh Root Mean Squared Error (RMSE) sebesar <strong>1.42078</strong> pada data privat dan <strong>0.63839</strong> pada data publik. Hasil analisis feature importance menunjukkan bahwa fitur jangkar spasial dan peluruhan temporal memberikan kontribusi signifikan terhadap akurasi prediksi, mengonfirmasi bahwa integrasi informasi hidrologi antar-stasiun berbasis jarak geografis mampu menangkap pola aliran air hulu-hilir yang tidak tertangkap oleh fitur temporal semata.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono dark:text-slate-400 text-slate-600">
          <div>
            <strong className="dark:text-slate-200 text-slate-800">Kata Kunci:</strong> Prediksi Tinggi Muka Air, LightGBM, Haversine Spatial Anchor, Peluruhan Temporal, Hidrologi, ENSO-MJO.
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
            <p className="text-slate-400"># 1. Unduh repositori resmi tim Datashine</p>
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
              Sebelas Maret Statistics Data Science (SSDS) • HIMASTA UNS 2026
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
