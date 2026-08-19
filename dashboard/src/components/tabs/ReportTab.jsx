import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ExternalLink,
  Award
} from 'lucide-react';

export default function ReportTab() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const steps = [
    { 
      num: 1, 
      title: "Akuisisi Data Multidimensi", 
      desc: "Data historis TMA 30 stasiun pemantauan BBWS Bengawan Solo (Januari 2023 – Mei 2026), variabel lingkungan resolusi per jam (curah hujan, kelembapan tanah 4 kedalaman, tekanan udara), serta indeks iklim makro global (Madden-Julian Oscillation RMM1/RMM2 dan indeks Niño 3.4 bulanan)." 
    },
    { 
      num: 2, 
      title: "Pra-Pemrosesan & Resampling Temporal", 
      desc: "Agregasi data eksogen lingkungan ke resolusi standar 6 jam dengan fungsi agregasi berbasis sifat fisik (sum untuk curah hujan, mean untuk tekanan udara). Interpolasi linier diterapkan pada kelembapan tanah, serta sinkronisasi iklim makro melalui teknik forward-fill dan backward-fill." 
    },
    { 
      num: 3, 
      title: "Sinkronisasi Fisika Limpasan Sungai", 
      desc: "Konstruksi curah hujan efektif (Effective Rain = Rainfall × Soil Moisture Level 1) untuk memodelkan kejenuhan tanah, serta pembentukan Global Pivot Matrices dari 30 pos guna menghitung rolling akumulasi presipitasi DAS pada jendela 1 hari, 2 hari, 3 hari, dan 7 hari." 
    },
    { 
      num: 4, 
      title: "Jangkar Spasial Haversine", 
      desc: "Perhitungan matriks jarak geodesic antar seluruh 30 stasiun menggunakan formula Haversine dengan fungsi peluruhan eksponensial W_ij = exp(-d_ij / 30 km). Mekanisme ini mengekstrak sinyal TMA hulu terdekat guna menangkap perambatan banjir ke pos hilir secara akurat." 
    },
    { 
      num: 5, 
      title: "Normalisasi Target Berbasis Z-Score", 
      desc: "Transformasi Z-score per stasiun (y_norm = (y - μ) / σ) untuk menyeragamkan skala variansi prediksi lintas pos tanpa terdistorsi oleh perbedaan datum elevasi dasar alami sungai (yang berkisar antara 0,5 mdpl hingga 145 mdpl)." 
    },
    { 
      num: 6, 
      title: "Optimasi Optuna & 5-Fold Cross Validation", 
      desc: "Pencarian Bayesian 75 trials menggunakan TPE sampler untuk menyetel hiperparameter LightGBM (learning rate, num_leaves, subsample, reg_alpha/lambda) dengan evaluasi 5-Fold Cross Validation dan ensemble bagging rata-rata dari kelima fold model final." 
    }
  ];

  const paperSections = [
    {
      title: "I. Pendahuluan & Latar Belakang Masalah",
      content: "Bencana banjir berulang di DAS Bengawan Solo (melintasi Jateng & Jatim) menimbulkan kerugian sosial-ekonomi yang besar. Model time-series konvensional berbasis stasiun tunggal memiliki kelemahan mendasar: gagal menangkap penjalaran aliran hulu ke hilir, mengabaikan kondisi hujan di bagian DAS lain, dan tidak mengintegrasikan sinyal iklim makro (ENSO & MJO) yang memodulasi cuaca ekstrem di Indonesia."
    },
    {
      title: "II. Rekayasa Fitur Inovatif (Spatial Anchor & Temporal Decay)",
      content: "Penelitian ini mengintegrasikan dua inovasi utama: Haversine Spatial Anchor (D = 30 km) yang membobotkan pengaruh TMA stasiun tetangga berdasarkan jarak busur bumi, dan Peluruhan Temporal Eksplisit dengan konstanta waktu cepat (τ = 24 jam untuk limpasan langsung) dan lambat (τ = 168 jam / 7 hari untuk memori tanah) sepanjang horizon prediksi."
    },
    {
      title: "III. Hasil Evaluasi Model & Feature Importance",
      content: "Hasil evaluasi empiris pada platform kompetisi mencatatkan RMSE 1,42078 pada data Private dan 0,63839 pada data Public. Analisis konsensus feature importance 5-Fold membuktikan bahwa fitur pola musiman (seasonal_norm) dan akumulasi hujan hulu 7 hari (g_rain_st1_7d) menempati peringkat tertinggi, didukung oleh kontribusi stabil dari indeks ENSO (nino_34) dan spatial anchor."
    },
    {
      title: "IV. Kesimpulan & Arah Pengembangan Lanjutan",
      content: "Integrasi jangkar spasial berbasis jarak geodesic dan peluruhan temporal eksplisit terbukti secara signifikan meningkatkan ketahanan prediksi TMA multi-stasiun. Untuk pengembangan ke depan, disarankan integrasi topologi jaringan sungai hidrologis (HydroRIVERS flow distance) dan arsitektur Graph Neural Network (GNN) sebagai sistem peringatan dini banjir real-time."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Paper Abstract Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Naskah Makalah Ilmiah (SSDS 2026)</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 mb-4 leading-snug">
          Prediksi Tinggi Muka Air Sungai dengan LightGBM: Integrasi Jangkar Spasial Haversine dan Peluruhan Temporal Eksplisit
        </h3>

        <div className="space-y-3 text-xs sm:text-sm dark:text-slate-300 text-slate-700 leading-relaxed text-justify">
          <p>
            Prediksi Tinggi Muka Air (TMA) sungai secara akurat merupakan komponen krusial dalam mitigasi risiko banjir di Daerah Aliran Sungai (DAS) Bengawan Solo, sungai terbesar di Pulau Jawa yang melintasi Jawa Tengah dan Jawa Timur, terutama saat periode pergantian musim yang dipengaruhi oleh anomali iklim makro seperti ENSO dan MJO. Penelitian ini mengembangkan pendekatan prediksi TMA multi-stasiun pada 30 pos pemantauan BBWS Bengawan Solo (Januari 2023 – Mei 2026) berbasis gradient boosting dengan model LightGBM, yang diintegrasikan dengan dua inovasi rekayasa fitur utama: <strong>Haversine Spatial Anchor</strong>, yaitu nilai jangkar historis TMA dari stasiun-stasiun terdekat yang dibobotkan berdasarkan peluruhan eksponensial jarak geografis (<em>spatial decay</em>, D = 30 km), dan <strong>Peluruhan Temporal Eksplisit</strong> (<em>explicit temporal decay</em>) yang memodelkan pengaruh kondisi historis jangka pendek (τ = 24 jam) dan jangka panjang (τ = 168 jam) terhadap TMA saat ini.
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

      {/* End-to-End Pipeline Methodology Flowchart */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 space-y-6">
        <div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">Arsitektur Metodologi</span>
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Alur Kerja Data Mining & Rekayasa Fitur End-to-End</h3>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">Struktur 6 tahapan pemrosesan data, pemodelan fisika sungai, hingga inferensi ensemble final.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.num} className="p-4 rounded-xl dark:bg-slate-950/60 bg-white border dark:border-white/5 border-slate-200 hover:border-cyan-500/40 transition-all shadow-sm group">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <h4 className="font-bold text-sm dark:text-white text-slate-900 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed pl-8">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Paper Structure Accordion Preview */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border dark:border-white/10 border-slate-200 space-y-4">
        <div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">Struktur Naskah</span>
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Ikhtisar Bab & Temuan Kunci Makalah</h3>
        </div>

        <div className="space-y-3 pt-2">
          {paperSections.map((sec, idx) => {
            const isOpen = activeAccordion === idx;
            return (
              <div key={idx} className="rounded-xl border dark:border-white/5 border-slate-200 dark:bg-slate-950/40 bg-white overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm dark:text-slate-100 text-slate-900">{sec.title}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-500" /> : <ChevronDown className="w-4 h-4 dark:text-slate-400 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm dark:text-slate-300 text-slate-700 leading-relaxed border-t dark:border-white/5 border-slate-100">
                    <p>{sec.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reproducibility & Institutional Affiliation */}
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
