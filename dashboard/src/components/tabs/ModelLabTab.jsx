import React, { useState } from 'react';
import { 
  Sliders
} from 'lucide-react';
import cvMetrics from '../../data/cv_metrics.json';
import featureImportanceData from '../../data/feature_importance.json';

export default function ModelLabTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(featureImportanceData.map(f => f.category))];

  const filteredFeatures = selectedCategory === 'All'
    ? featureImportanceData.slice(0, 15)
    : featureImportanceData.filter(f => f.category === selectedCategory);

  const maxImportance = Math.max(...featureImportanceData.map(f => f.mean_importance));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Grid: 5-Fold CV Evaluation & Model Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 5-Fold CV Evaluation Table (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b dark:border-white/10 border-slate-200 mb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-bold">Validasi Model</span>
                <h4 className="text-lg font-bold dark:text-white text-slate-900">5-Fold Cross Validation</h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                K-Fold Shuffled
              </div>
            </div>

            {/* Fold Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="dark:text-slate-400 text-slate-500 border-b dark:border-white/5 border-slate-200">
                    <th className="pb-2">Fold</th>
                    <th className="pb-2">Jumlah Sampel</th>
                    <th className="pb-2 text-right">RMSE Validasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-white/5 divide-slate-200 dark:text-slate-200 text-slate-800">
                  {cvMetrics.filter(m => m.fold !== 'Mean').map((f) => (
                    <tr key={f.fold} className="hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-bold text-cyan-600 dark:text-cyan-300">Fold {f.fold}</td>
                      <td className="py-2.5 dark:text-slate-400 text-slate-600">{f.n_samples.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-bold dark:text-slate-100 text-slate-900">{f.rmse.toFixed(5)}</td>
                    </tr>
                  ))}
                  <tr className="bg-cyan-500/10 font-bold border-t border-cyan-500/30">
                    <td className="py-3 text-cyan-700 dark:text-cyan-300">Mean CV</td>
                    <td className="py-3 dark:text-slate-300 text-slate-700">84.396 total</td>
                    <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 text-sm">2.11892 <span className="text-[10px] dark:text-slate-400 text-slate-500 font-normal">± 0.845</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl inner-card text-[11px] dark:text-slate-400 text-slate-600 space-y-1">
            <p><strong className="dark:text-slate-200 text-slate-800">Justifikasi Ilmiah:</strong> Sebagaimana dianalisis pada Bab IV Makalah, skema validasi 5-Fold dengan pengacakan menghasilkan rentang RMSE (1.001 s.d. 3.142 mdpl) akibat variabilitas sebaran presipitasi ekstrem di tiap lipatan. Skor kompetisi Kaggle Private (<strong>1.42078</strong>) membuktikan kapasitas generalisasi model yang kuat dan konsisten terhadap data tak terlihat (<em>unseen test set</em>).</p>
          </div>
        </div>

        {/* Right: Model Pipeline & Hyperparameters (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Hyperparameters Card */}
          <div className="glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-cyan-600 dark:text-cyan-400">
              <Sliders className="w-5 h-5" />
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Konfigurasi LightGBM & Optuna Tuning (75 Trials)</h4>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">Boosting Type</span>
                <p className="font-bold text-cyan-600 dark:text-cyan-300 mt-0.5">GBDT (Histogram)</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">N Estimators</span>
                <p className="font-bold dark:text-slate-100 text-slate-900 mt-0.5">6.000 (Early Stop)</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">Learning Rate</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">0.0185 (Adaptive)</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">Num Leaves</span>
                <p className="font-bold text-purple-600 dark:text-purple-300 mt-0.5">142 (Depth 9)</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">Subsample</span>
                <p className="font-bold dark:text-slate-200 text-slate-800 mt-0.5">0.785</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">Colsample</span>
                <p className="font-bold dark:text-slate-200 text-slate-800 mt-0.5">0.650</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">L1 Reg (Alpha)</span>
                <p className="font-bold dark:text-slate-200 text-slate-800 mt-0.5">0.421</p>
              </div>
              <div className="p-2.5 rounded-xl inner-card">
                <span className="dark:text-slate-400 text-slate-500">L2 Reg (Lambda)</span>
                <p className="font-bold dark:text-slate-200 text-slate-800 mt-0.5">1.845</p>
              </div>
            </div>
          </div>

          {/* Mathematical Formulations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="glass-panel p-4 rounded-xl border dark:border-white/10 border-slate-200 space-y-2">
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">Peluruhan Temporal Eksplisit</span>
              <div className="p-2.5 rounded-lg dark:bg-slate-950 bg-slate-100 border dark:border-white/10 border-slate-300 font-mono text-xs text-cyan-700 dark:text-cyan-300 text-center font-bold">
                Decay = exp( - Δt / τ )
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                τ = 24 jam (peluruhan respon cepat hidrograf harian) dan τ = 168 jam (7 hari untuk tren kelembaban musiman).
              </p>
            </div>

            <div className="glass-panel p-4 rounded-xl border dark:border-white/10 border-slate-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Normalisasi & Reversi Target</span>
              <div className="p-2.5 rounded-lg dark:bg-slate-950 bg-slate-100 border dark:border-white/10 border-slate-300 font-mono text-xs text-emerald-700 dark:text-emerald-300 text-center font-bold">
                ŷ_TMA = ( ŷ_norm × σ_pos ) + μ_pos
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                Menghilangkan disparitas elevasi dasar antar stasiun (0.5 mdpl s.d. 145 mdpl) agar model fokus mempelajari dinamika variansi air.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Main Section: Top Feature Importance Konsensus 5 Fold */}
      <div className="glass-panel p-6 rounded-2xl border dark:border-white/10 border-slate-200 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b dark:border-white/10 border-slate-200">
          <div>
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-bold">Interpretasi Gain Model</span>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">Konsensus Top Feature Importance (Rata-rata 5 Fold)</h3>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">Dihitung dari rata-rata perolehan *gain* seluruh 5 model fold beserta deviasi standarnya (± std).</p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Importance Bars */}
        <div className="space-y-3">
          {filteredFeatures.map((feat, idx) => {
            const percent = (feat.mean_importance / maxImportance) * 100;
            return (
              <div key={idx} className="p-3.5 rounded-xl dark:bg-slate-950/40 bg-white border dark:border-white/5 border-slate-200 hover:border-cyan-500/40 transition-all shadow-sm group">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold dark:text-slate-400 text-slate-500 w-5 text-right">{idx + 1}.</span>
                    <span className="font-mono font-bold dark:text-slate-100 text-slate-900 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{feat.feature}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-600">
                      {feat.category}
                    </span>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold text-cyan-600 dark:text-cyan-300">{feat.mean_importance.toLocaleString()}</span>
                    <span className="dark:text-slate-500 text-slate-400 text-[11px] ml-1">± {feat.std_importance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full dark:bg-slate-900 bg-slate-100 overflow-hidden relative">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
          <strong>Wawasan Metodologis:</strong> Fitur <code>seasonal_norm</code> (pola musiman ternormalisasi) dan <code>g_rain_st1_7d</code> (akumulasi hujan 7 hari stasiun hulu) menempati peringkat tertinggi. Ini membuktikan secara saintifik bahwa model mengandalkan memori musiman dan perambatan debit air jangka menengah sebagai sinyal prediktif paling dominan.
        </div>

      </div>

    </div>
  );
}
