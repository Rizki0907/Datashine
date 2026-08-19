import React from 'react';
import { 
  BarChart3, 
  Globe2, 
  CloudRain, 
  Cpu, 
  TrendingUp, 
  FileText,
  Sun,
  Moon
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'spatial', label: 'Spatial', icon: Globe2 },
  { id: 'eda', label: 'EDA & Iklim', icon: CloudRain },
  { id: 'model-lab', label: 'Model Lab', icon: Cpu },
  { id: 'forecaster', label: 'Forecasting', icon: TrendingUp },
  { id: 'report', label: 'Paper & Annex', icon: FileText },
];

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b dark:border-white/10 border-slate-200 dark:bg-[#070C16]/85 bg-white/85 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_#06B6D4]"></span>
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 text-lg">
                HYDRO
              </span>
              <span className="font-bold dark:text-white text-slate-900 tracking-widest text-lg">
                SPHERE
              </span>
            </div>
          </div>
          <span className="hidden md:inline-block text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300">
            Datashine
          </span>
        </div>

        {/* Center / Right Pill Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'dark:bg-cyan-500/15 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-cyan-500 dark:text-cyan-400 scale-110' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Official SSF 2026 Logo Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 border-l dark:border-white/10 border-slate-200">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
            className="p-2 rounded-xl border dark:border-white/10 border-slate-200 text-slate-500 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Official SSF Logo Badge */}
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="text-right">
              <p className="text-[11px] font-mono font-bold dark:text-slate-200 text-slate-800">SSDS Finalist</p>
              <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">UNS • 2026</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 border dark:border-white/20 border-slate-300 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src="/logo_ssf.jpeg" 
                alt="Logo SSF 2026" 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
