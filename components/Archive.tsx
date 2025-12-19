
import React from 'react';
import { ARCHIVE_DATA, UI_STRINGS } from '../constants';
import { Language, WeaponData } from '../types';

// 抽象符号组件：根据 ID 生成不同的几何特征
const NeuralSigil: React.FC<{ id: string }> = ({ id }) => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rotations = [seed % 360, (seed * 2) % 360, (seed * 3) % 360];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110">
      <svg viewBox="0 0 100 100" className="w-32 h-32 lg:w-56 lg:h-56">
        {/* 背景环 */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
        
        {/* 动态旋转的特征层 */}
        <g style={{ transform: `rotate(${rotations[0]}deg)`, transformOrigin: '50% 50%' }} className="animate-[spin_40s_linear_infinite]">
          <path d="M50 2 L50 12 M50 88 L50 98" stroke="currentColor" strokeWidth="0.5" className="text-orange-500/50" />
          <rect x="49" y="49" width="2" height="2" fill="currentColor" className="text-orange-500" />
        </g>
        
        <g style={{ transform: `rotate(${rotations[1]}deg)`, transformOrigin: '50% 50%' }} className="animate-[spin_25s_linear_infinite_reverse]">
          <path d="M5 50 L15 50 M85 50 L95 50" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
          <path d="M30 30 L70 70 M30 70 L70 30" stroke="currentColor" strokeWidth="0.3" className="text-orange-500/20" />
          <circle cx="50" cy="15" r="1.5" fill="currentColor" className="text-orange-500/40" />
          <circle cx="50" cy="85" r="1.5" fill="currentColor" className="text-orange-500/40" />
        </g>

        <g style={{ transform: `rotate(${rotations[2]}deg)`, transformOrigin: '50% 50%' }} className="animate-[spin_60s_linear_infinite]">
           {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
             <line 
                key={deg} 
                x1="50" y1="50" 
                x2={50 + 42 * Math.cos(deg * Math.PI / 180)} 
                y2={50 + 42 * Math.sin(deg * Math.PI / 180)} 
                stroke="currentColor" 
                strokeWidth="0.1" 
                className="text-white/5" 
             />
           ))}
        </g>
      </svg>
      
      {/* 额外的动态扫描方块 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="w-full h-full relative opacity-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-500 animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white animate-pulse" />
         </div>
      </div>
    </div>
  );
};

interface ArchiveProps {
  language: Language;
  onSelectItem: (item: WeaponData) => void;
}

const Archive: React.FC<ArchiveProps> = ({ language, onSelectItem }) => {
  return (
    <div className="h-full w-full bg-[#030303] overflow-y-auto relative font-inter text-white scroll-smooth">
      {/* 背景装饰层 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.02)_0%,transparent_100%)]" />
        <div className="absolute top-0 right-1/4 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute top-0 right-1/2 bottom-0 w-[1px] bg-white/5 opacity-50" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* 侧边信息栏 */}
          <aside className="lg:w-1/3 flex flex-col gap-12 animate-in fade-in slide-in-from-left duration-1000 shrink-0">
            <div className="sticky top-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
                <span className="text-orange-500 font-orbitron text-[11px] tracking-[0.6em] uppercase font-black">
                  {UI_STRINGS.archiveSub[language]}
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-orbitron font-black leading-none tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10">
                {UI_STRINGS.archiveTitle[language]}
              </h1>
              <p className="text-gray-500 text-xs leading-relaxed max-w-sm font-mono tracking-tight opacity-70 uppercase border-l border-orange-500/30 pl-6">
                {UI_STRINGS.sidebarDesc[language]}
              </p>

              <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-12 mt-12">
                <div>
                  <div className="text-[10px] text-gray-600 font-orbitron mb-3 tracking-widest font-bold">{UI_STRINGS.statsActive[language]}</div>
                  <div className="text-4xl text-white font-mono font-black tracking-tighter italic">0{ARCHIVE_DATA.length}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-600 font-orbitron mb-3 tracking-widest font-bold">{UI_STRINGS.statsIntegrity[language]}</div>
                  <div className="text-4xl text-green-500 font-mono font-black tracking-tighter italic">99.2%</div>
                </div>
              </div>

              <div className="mt-12">
                <div className="text-[9px] text-gray-700 font-mono leading-relaxed uppercase space-y-1">
                  <div className="flex justify-between w-full"><span>NODE_SYNC:</span> <span className="text-green-900">STABLE</span></div>
                  <div className="flex justify-between w-full"><span>ENCRYPTION:</span> <span className="text-orange-900">AES-XTS</span></div>
                  <div className="flex justify-between w-full"><span>TRACE_LOG:</span> <span className="text-gray-900">NO_LEAKS</span></div>
                </div>
              </div>
            </div>
          </aside>

          {/* 资产列表 */}
          <main className="lg:w-2/3 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {ARCHIVE_DATA.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group relative aspect-[3/4] cursor-pointer rounded-[2rem] overflow-hidden border border-white/5 bg-[#080808] transition-all duration-700 hover:border-orange-500/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  {/* 中心神秘符号 */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <NeuralSigil id={item.id} />
                  </div>

                  {/* 悬停时的全屏扫描效果 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent h-full w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[2.5s] pointer-events-none" />

                  {/* 装饰边框 */}
                  <div className="absolute inset-6 border border-white/5 rounded-[1.5rem] group-hover:border-orange-500/10 transition-colors" />

                  {/* 内容信息层 */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[11px] text-orange-500 font-orbitron font-black tracking-[0.4em] group-hover:tracking-[0.6em] transition-all duration-700">
                            {item.id.toUpperCase()}
                          </span>
                          <div className="h-[1px] w-6 bg-orange-500/20 group-hover:w-12 transition-all duration-700" />
                          <span className="text-[9px] text-gray-600 font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                            {UI_STRINGS.syncReady[language]}
                          </span>
                        </div>
                        
                        <h3 className="text-4xl lg:text-5xl font-orbitron font-black text-white mb-6 transition-transform duration-700 group-hover:translate-x-3 leading-none">
                          {item.name[language]}
                        </h3>
                        
                        <div className="overflow-hidden">
                           <p className="text-xs text-gray-500 font-light max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                             {item.description[language]}
                           </p>
                        </div>
                    </div>

                    <div className="absolute top-12 right-12 group-hover:rotate-180 transition-transform duration-1000">
                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                          <i className="fas fa-arrow-right text-[10px] text-white/20 group-hover:text-black" />
                        </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 加密槽位 */}
              <div className="aspect-[3/4] rounded-[2rem] border border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center grayscale opacity-10 relative group overflow-hidden">
                <i className="fas fa-fingerprint text-7xl mb-8 text-white/10 group-hover:scale-125 transition-transform duration-1000" />
                <span className="font-orbitron text-[10px] text-gray-700 tracking-[1em] uppercase font-black">
                  {UI_STRINGS.statusEncrypted[language]}
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Archive;
