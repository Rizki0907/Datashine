import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeaderHero({ activeTab }) {
  const titles = {
    overview: {
      sub: "OVERVIEW & EXECUTIVE SNAPSHOT",
      title: "HydroSphere Analytics System",
      desc: "Sistem Analitika Spasial-Temporal Multidimensi untuk Prediksi Dinamika Tinggi Muka Air (TMA) Sungai di Wilayah Sungai Bengawan Solo & Brantas berbasis Machine Learning Mutakhir."
    },
    spatial: {
      sub: "GEOSPATIAL HYDROLOGICAL TOPOLOGY",
      title: "Geospatial River Basin Explorer",
      desc: "Pemetaan spasial komprehensif pada 30 stasiun hidrometri di Jawa Tengah & Jawa Timur dengan radius konektivitas jangkar Haversine (Radius = 30 KM)."
    },
    eda: {
      sub: "EXPLORATORY DATA & MACRO CLIMATE",
      title: "Dinamika Iklim & Fisika Limpasan",
      desc: "Kajian empiris distribusi elevasi air, variansi musiman, modulasi iklim global (ENSO & MJO), serta propagasi waktu tempuh curah hujan efektif."
    },
    'model-lab': {
      sub: "AI ENGINE & CROSS-VALIDATION LAB",
      title: "Model Intelligence & Feature Gain",
      desc: "Evaluasi ketat 5-Fold Cross Validation LightGBM, konsensus 20 fitur paling berpengaruh, dan formulasi matematis peluruhan temporal-spasial."
    },
    forecaster: {
      sub: "REAL-TIME STATION FORECASTING",
      title: "Station-by-Station Forecaster",
      desc: "Simulator visual interaktif untuk memproyeksikan elevasi air hingga Mei 2026 pada 30 stasiun, dengan studi kasus penjinakan anomali di stasiun kritis."
    },
    report: {
      sub: "SCIENTIFIC REPORT & REPRODUCIBILITY",
      title: "Metodologi & Lampiran Ilmiah",
      desc: "Dokumentasi lengkap paper ilmiah final, diagram alir pipa data end-to-end, tautan artefak terverifikasi, dan profil Tim Peneliti Datashine."
    }
  };

  const current = titles[activeTab] || titles.overview;

  return (
    <div className="relative pt-8 pb-6 border-b dark:border-white/5 border-slate-200 overflow-hidden transition-colors">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-2">
          <span className="inline-block w-6 h-[2px] bg-cyan-500"></span>
          <span>{current.sub}</span>
        </div>

        {/* Dynamic Title with Gradient */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight mb-3">
          {current.title.split(' ')[0]}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-400 dark:to-indigo-400">
            {current.title.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-3xl dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-normal">
          {current.desc}
        </p>

        {/* Paper Title Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg dark:bg-slate-900/90 bg-white border dark:border-white/10 border-slate-200 text-xs shadow-sm max-w-full truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span className="font-semibold dark:text-slate-200 text-slate-800 flex-shrink-0">Paper Final:</span>
          <span className="italic text-cyan-600 dark:text-cyan-300 truncate font-medium">
            "Prediksi Tinggi Muka Air Sungai dengan LightGBM: Integrasi Jangkar Spasial Haversine dan Peluruhan Temporal Eksplisit"
          </span>
        </div>

      </div>
    </div>
  );
}
