
import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import HUD from './components/HUD';
import Archive from './components/Archive';
import { Language, WeaponData } from './types';
import { UI_STRINGS, ARCHIVE_DATA } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'archive' | 'detail'>('archive');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedItem, setSelectedItem] = useState<WeaponData>(ARCHIVE_DATA[0]);
  
  // Detail view states
  const [currentModeIndex, setCurrentModeIndex] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [accessWarning, setAccessWarning] = useState(false);

  useEffect(() => {
    // 初始加载动画
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleSelectItem = (item: WeaponData) => {
    setLoading(true);
    setSelectedItem(item);
    setCurrentModeIndex(0); 
    setAccessWarning(false); // Reset prior warning state

    setTimeout(() => {
      setView('detail');
      setLoading(false);

      // Z4 Permission Check Trigger
      if (item.id === 'neural-z4') {
        setAccessWarning(true);
        // Auto-dismiss warning after 4 seconds
        setTimeout(() => setAccessWarning(false), 4000);
      }
    }, 1500);
  };

  const handleBack = () => {
    setLoading(true);
    setAccessWarning(false);
    setTimeout(() => {
      setView('archive');
      setLoading(false);
    }, 800);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030303] select-none text-white font-inter">
      {/* 全局加载遮罩 */}
      <div className={`fixed inset-0 z-[100] bg-black transition-all duration-1000 flex flex-col items-center justify-center gap-10 ${
        loading ? 'opacity-100 shadow-[inset_0_0_100px_rgba(249,115,22,0.1)]' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
          <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin" />
          <div className="absolute inset-6 border-2 border-white/5 rounded-full" />
          <div className="absolute inset-6 border-b-2 border-orange-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
          <div className="w-12 h-12 flex items-center justify-center bg-orange-500/10 rounded-full animate-pulse">
             <i className="fas fa-project-diagram text-orange-500 text-xl" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="font-orbitron text-orange-500 tracking-[0.8em] uppercase text-xs font-black">
            {UI_STRINGS.loading[language]}
          </div>
          <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/50 w-full animate-[loading-bar_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* 权限警告遮罩 (专门为 Z4 设计) */}
      <div className={`fixed inset-0 z-[150] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${accessWarning ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-red-900/10 backdrop-blur-[2px] animate-pulse" />
        <div className={`bg-black/90 border-2 border-red-500 p-10 max-w-md text-center relative overflow-hidden backdrop-blur-2xl shadow-[0_0_80px_rgba(220,38,38,0.4)] transform transition-transform duration-500 ${accessWarning ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
          
          {/* 红色扫描线动画 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-[200%] w-full -translate-y-1/2 animate-[scan_2s_linear_infinite]" />
          
          <div className="relative z-10">
            <i className="fas fa-triangle-exclamation text-4xl text-red-500 mb-6 animate-pulse" />
            <div className="text-red-500 font-orbitron text-3xl font-black tracking-widest mb-3 animate-pulse">
              {UI_STRINGS.warning[language]}
            </div>
            <div className="text-white font-bold mb-6 tracking-[0.2em] border-y border-red-500/30 py-2">
              {UI_STRINGS.accessRestricted[language]}
            </div>
            <div className="text-red-400 text-xs font-mono bg-red-500/10 p-2 rounded mb-2">
              {UI_STRINGS.permissionDenied[language]}
            </div>
            <div className="text-red-500/70 text-[10px] font-mono blink">
              >> {UI_STRINGS.limitedFunctionality[language]}
            </div>
          </div>
          
          {/* 装饰角 */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-600" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-600" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-600" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-600" />
        </div>
      </div>

      {/* 视图层 */}
      <div className={`h-full w-full transition-all duration-1000 ${loading ? 'blur-3xl scale-110 opacity-0' : 'blur-0 scale-100 opacity-100'}`}>
        {view === 'archive' ? (
          <Archive 
            language={language} 
            onSelectItem={handleSelectItem} 
          />
        ) : (
          <div className="h-full w-full relative">
            <Scene 
              language={language} 
              currentModeIndex={currentModeIndex}
              autoRotate={autoRotate} 
              isScanning={isScanning} 
              selectedItem={selectedItem}
            />
            <HUD 
              language={language} 
              currentModeIndex={currentModeIndex} 
              setCurrentModeIndex={setCurrentModeIndex}
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              isScanning={isScanning}
              onScan={handleScan}
              selectedItem={selectedItem}
              onBack={handleBack}
            />
          </div>
        )}
      </div>

      {/* 语言切换控制 */}
      <div className="fixed top-10 right-10 z-[110] pointer-events-none">
        <button 
          onClick={toggleLanguage}
          className="pointer-events-auto flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 border border-white/10 hover:border-orange-500/50 backdrop-blur-3xl transition-all group shadow-2xl"
        >
          <i className="fas fa-language text-gray-500 group-hover:text-orange-500 text-lg" />
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-[11px] font-orbitron text-white uppercase tracking-[0.3em] font-black">
            {language === 'en' ? 'EN' : 'ZH'}
          </span>
        </button>
      </div>

      {/* 底部交互提示 */}
      {view === 'detail' && !loading && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-10 text-gray-600 text-[10px] font-orbitron uppercase tracking-[0.4em] pointer-events-none z-10 animate-in fade-in duration-1000 delay-1000 font-bold">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[8px] bg-white/5 text-gray-400">MOUSE_1</div>
             <span>{UI_STRINGS.rotate[language]}</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[8px] bg-white/5 text-gray-400">SCROLL</div>
             <span>{UI_STRINGS.zoom[language]}</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(50%); }
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        ::selection {
          background: rgba(249, 115, 22, 0.3);
          color: white;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;
