
import React from 'react';
import { UI_STRINGS } from '../constants';
import { Language, WeaponData } from '../types';

interface HUDProps {
  language: Language;
  currentModeIndex: number;
  setCurrentModeIndex: (idx: number) => void;
  autoRotate: boolean;
  setAutoRotate: (v: boolean) => void;
  isScanning: boolean;
  onScan: () => void;
  selectedItem: WeaponData;
  onBack: () => void;
}

const HUD: React.FC<HUDProps> = ({ 
  language, 
  currentModeIndex,
  setCurrentModeIndex,
  autoRotate, 
  setAutoRotate,
  isScanning,
  onScan,
  selectedItem,
  onBack
}) => {
  const primaryActionLabel = selectedItem.customActions?.primary[language] || UI_STRINGS.scan[language];
  const secondaryActionLabel = selectedItem.customActions?.secondary[language] || UI_STRINGS.autoRotate[language];

  // 获取当前激活模式的颜色配置
  const activeMode = selectedItem.visualModes[currentModeIndex];
  const themeColor = activeMode.theme.primaryColor;

  return (
    <div 
      className="absolute inset-0 pointer-events-none transition-colors duration-1000"
      style={{ backgroundColor: `${themeColor}0D` }} // 0D is ~5% opacity hex
    >
      
      {/* 顶部战术指示条 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 左上角资产信息 */}
      <div className="absolute top-10 left-10 z-20 pointer-events-auto flex flex-col gap-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 px-6 py-2.5 bg-black/60 border border-white/10 hover:border-white/50 backdrop-blur-2xl rounded-full transition-all group w-fit shadow-2xl"
        >
          <i className="fas fa-arrow-left text-[10px] text-gray-500 group-hover:text-white transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-orbitron text-gray-400 group-hover:text-white uppercase tracking-[0.2em]">
            {UI_STRINGS.backToArchive[language]}
          </span>
        </button>

        <div className="animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-3 mb-4">
             <div 
               className="w-2 h-2 rounded-full animate-pulse shadow-lg transition-colors duration-500"
               style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
             />
             <span 
               className="text-[11px] font-orbitron font-bold tracking-[0.5em] transition-colors duration-500"
               style={{ color: themeColor }}
             >
               {UI_STRINGS.systemId[language]} // {selectedItem.id.toUpperCase()}
             </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-orbitron font-black text-white tracking-tighter leading-[0.85] drop-shadow-2xl mb-4">
            {selectedItem.name[language]}
          </h1>
          <h2 className="text-sm font-medium text-gray-500 tracking-[0.5em] uppercase border-l-2 border-white/20 pl-6">
            {selectedItem.subName[language]}
          </h2>
        </div>
      </div>

      {/* 右侧交互面板 */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10 pointer-events-auto">
        <div className="bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] flex flex-col gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-orbitron text-gray-600 uppercase tracking-widest font-bold ml-1 mb-2 text-center">
              {UI_STRINGS.mode[language]}
            </span>
            {selectedItem.visualModes.map((mode, idx) => (
              <button 
                key={mode.id}
                onClick={() => setCurrentModeIndex(idx)}
                style={
                  currentModeIndex === idx 
                    ? { 
                        backgroundColor: mode.theme.primaryColor, 
                        borderColor: mode.theme.primaryColor, 
                        color: '#ffffff',
                        boxShadow: `0 0 25px ${mode.theme.primaryColor}80` 
                      }
                    : {}
                }
                className={`px-6 py-3 border font-orbitron text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 w-40 text-center flex items-center justify-between group ${
                  currentModeIndex === idx 
                  ? '' // Active styles handled by inline style for dynamic colors
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {mode.label[language]}
                <div className={`w-1.5 h-1.5 rounded-full ${currentModeIndex === idx ? 'bg-white' : 'bg-transparent'}`} />
              </button>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col gap-3">
            <button 
              onClick={onScan}
              disabled={isScanning}
              className={`px-6 py-4 border font-orbitron text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 ${
                isScanning ? 'bg-white/10 border-white/20 text-white animate-pulse' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <i className="fas fa-microchip" />
              {primaryActionLabel}
            </button>

            <button 
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-6 py-4 border font-orbitron text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 ${
                autoRotate ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-gray-600'
              }`}
            >
              <i className={`fas ${autoRotate ? 'fa-sync fa-spin' : 'fa-power-off'}`} />
              {secondaryActionLabel}
            </button>
          </div>
        </div>
      </div>

      {/* 底部属性矩阵 */}
      <div className="absolute bottom-12 left-10 right-10 z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 pointer-events-auto animate-in fade-in slide-in-from-bottom duration-1000">
        {selectedItem.stats.map((stat, idx) => (
          <div key={idx} className="group relative">
            <div className={`bg-black/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:border-white/30 hover:translate-y-[-8px] shadow-2xl`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-colors duration-500"
                    style={{ backgroundColor: `${themeColor}1A`, color: themeColor }} // 1A is 10% opacity
                  >
                    <i className={`fas ${stat.icon}`} />
                  </div>
                  <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.3em] font-black">
                    {stat.label[language]}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-white font-mono text-3xl font-bold tracking-tighter">{stat.value}</span>
                   <span className="text-[10px] text-gray-600 font-mono">/ 100</span>
                </div>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]"
                  style={{ width: `${stat.value}%`, backgroundColor: themeColor, color: themeColor }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 状态监控微组件 */}
      <div className="absolute bottom-6 right-10 flex items-center gap-8 text-[9px] font-mono text-gray-600 tracking-[0.4em] z-10 pointer-events-none opacity-40 uppercase">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span>{UI_STRINGS.signalStrength[language]}: 4/4</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="w-1.5 h-1.5 rounded-full" 
            style={{ backgroundColor: themeColor }}
          />
          <span>{UI_STRINGS.neuralStatus[language]}: {UI_STRINGS.active[language]}</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
