import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t dark:border-white/10 border-slate-200 dark:bg-[#060B13]/90 bg-white/90 py-8 text-xs dark:text-slate-400 text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 p-1 flex items-center justify-center shadow-sm">
            <img 
              src="/logo_unesa.png" 
              alt="Logo UNESA" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div>
            <p className="font-bold dark:text-slate-200 text-slate-800">Tim Datashine • Universitas Negeri Surabaya (UNESA)</p>
            <p className="text-[11px] dark:text-slate-500 text-slate-500 font-mono">Program Studi S1 Sains Data • FMIPA UNESA</p>
          </div>
        </div>

        <div className="text-center sm:text-right font-mono text-[11px] space-y-1">
          <p className="text-cyan-600 dark:text-cyan-400 font-bold">Sebelas Maret Statistics Data Science (SSDS) 2026</p>
          <p className="dark:text-slate-500 text-slate-500 italic">"Outpace the ordinary, outleap the analytics"</p>
        </div>

      </div>
    </footer>
  );
}
