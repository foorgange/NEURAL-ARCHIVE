
import React, { Suspense, ReactNode, useRef, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, Html } from '@react-three/drei';
import WeaponModel from './WeaponModel';
import { Language, WeaponData } from '../types';
import { UI_STRINGS } from '../constants';

const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

interface ErrorBoundaryProps {
  children?: ReactNode;
  language: Language;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    const { language, children } = this.props;
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="flex flex-col items-center p-6 bg-red-900/20 backdrop-blur-xl border border-red-500/50 rounded-xl text-center min-w-[300px]">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl mb-4"></i>
            <h2 className="text-white font-orbitron text-sm mb-2 uppercase tracking-widest">
              {UI_STRINGS.errorTitle[language]}
            </h2>
            <p className="text-gray-400 text-[10px] max-w-[200px] leading-relaxed">
              {UI_STRINGS.errorDesc[language]}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-white text-[10px] font-orbitron uppercase tracking-widest transition-colors"
            >
              {UI_STRINGS.errorButton[language]}
            </button>
          </div>
        </Html>
      );
    }
    return children;
  }
}

const Loader = ({ language }: { language: Language }) => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-14 h-14 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-orange-500 font-orbitron text-[10px] tracking-[0.4em] uppercase font-bold">
          {UI_STRINGS.downloading[language]}
        </span>
        <span className="text-gray-500 font-orbitron text-[8px] tracking-[0.2em] uppercase mt-1">
          {UI_STRINGS.syncing[language]}
        </span>
      </div>
    </div>
  </Html>
);

interface SceneProps {
  language: Language;
  currentModeIndex: number; // 更改为索引
  autoRotate: boolean;
  isScanning: boolean;
  selectedItem: WeaponData;
}

const Scene: React.FC<SceneProps> = ({ language, currentModeIndex, autoRotate, isScanning, selectedItem }) => {
  const orbitRef = useRef<any>(null);

  // 动态获取当前模式的主题颜色
  const currentTheme = selectedItem.visualModes[currentModeIndex]?.theme || selectedItem.visualModes[0].theme;

  return (
    <div className="h-full w-full bg-[#050505]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
        
        <Suspense fallback={<Loader language={language} />}>
          <ErrorBoundary language={language}>
            <WeaponModel 
              language={language} 
              autoRotate={autoRotate} 
              isScanning={isScanning} 
              selectedItem={selectedItem}
            />
          </ErrorBoundary>
          
          <AmbientLight intensity={currentTheme.ambientIntensity} />
          
          <SpotLight 
            position={[10, 10, 10]} 
            angle={0.2} 
            penumbra={1} 
            intensity={3} 
            color={currentTheme.spotColor} 
            castShadow 
          />
          
          <SpotLight 
            position={[-10, 5, -5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1.5} 
            color={currentTheme.primaryColor} 
          />
          
          <PointLight position={[0, 3, 2]} intensity={2} color="#ffffff" />
          
          <PointLight 
            position={[2, -2, 2]} 
            intensity={1} 
            color={currentTheme.pointColor} 
          />
          
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls 
          ref={orbitRef}
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          makeDefault
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
