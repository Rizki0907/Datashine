import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeaderHero from './components/HeaderHero';
import OverviewTab from './components/tabs/OverviewTab';
import SpatialTab from './components/tabs/SpatialTab';
import EdaTab from './components/tabs/EdaTab';
import ModelLabTab from './components/tabs/ModelLabTab';
import ForecasterTab from './components/tabs/ForecasterTab';
import ReportTab from './components/tabs/ReportTab';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Sync theme with body class and html class for tailwind darkMode
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.className = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.className = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
      
      <div>
        {/* Navigation Bar matching reference layout with Theme Switcher & SSF Logo */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Dynamic Hero Header */}
        <HeaderHero activeTab={activeTab} />

        {/* Main Content Area with dynamic Tab Switching */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full">
          {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === 'spatial' && <SpatialTab />}
          {activeTab === 'eda' && <EdaTab />}
          {activeTab === 'model-lab' && <ModelLabTab />}
          {activeTab === 'forecaster' && <ForecasterTab />}
          {activeTab === 'report' && <ReportTab />}
        </main>
      </div>

      {/* Official Footer */}
      <Footer />

    </div>
  );
}
