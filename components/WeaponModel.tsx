
import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Language, WeaponData } from '../types';

const Group = 'group' as any;
const Primitive = 'primitive' as any;
const Mesh = 'mesh' as any;
const PlaneGeometry = 'planeGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

interface WeaponModelProps {
  language: Language;
  autoRotate: boolean;
  isScanning: boolean;
  selectedItem: WeaponData;
}

// 预定义一个战术材质，用于覆盖那些看起来太“日常”的模型
const tacticalMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#1a1a1a'), // 深炭灰色
  roughness: 0.3,
  metalness: 0.9,
  emissive: new THREE.Color('#050505'),
  envMapIntensity: 1.5,
});

const WeaponModel: React.FC<WeaponModelProps> = ({ language, autoRotate, isScanning, selectedItem }) => {
  const { scene } = useGLTF(selectedItem.modelUrl);
  // 克隆场景以防止材质修改影响缓存
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // 存储归一化计算结果
  const [transformData, setTransformData] = useState({
    centerOffset: new THREE.Vector3(0, 0, 0),
    scaleFactor: 1,
  });

  useLayoutEffect(() => {
    if (clonedScene) {
      const config = selectedItem.modelConfig || {};
      
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // 强制材质覆盖逻辑
          if (config.forceTacticalMaterial) {
            mesh.material = tacticalMaterial;
          }
        }
      });

      // 计算包围盒
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // 计算归一化缩放系数 (目标大小 ~3.0 单位)
      const maxDim = Math.max(size.x, size.y, size.z);
      // 防止除以0
      const safeMaxDim = maxDim > 0.001 ? maxDim : 1;
      const targetSize = 3.0;
      let baseScale = targetSize / safeMaxDim;
      
      // 应用配置中的额外缩放修正
      if (config.scaleCorrection) {
        baseScale *= config.scaleCorrection;
      }

      setTransformData({
        centerOffset: center.negate(), // 居中偏移量
        scaleFactor: baseScale
      });
    }
  }, [clonedScene, selectedItem]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // 基础旋转 (应用在最外层 Group)
    if (autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
    
    // 悬浮呼吸动画
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.1;

    // 扫描光效控制
    if (scanRef.current && isScanning) {
      scanRef.current.position.y = Math.sin(t * 5) * 1.5;
      scanRef.current.visible = true;
    } else if (scanRef.current) {
      scanRef.current.visible = false;
    }
  });

  const config = selectedItem.modelConfig || {};
  const rotationOffset = config.rotationOffset ? new THREE.Euler(...config.rotationOffset) : new THREE.Euler(0, 0, 0);
  const positionOffset = config.positionOffset ? new THREE.Vector3(...config.positionOffset) : new THREE.Vector3(0, 0, 0);

  return (
    <Group ref={groupRef} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        
        {/* 1. 修正层：应用手动旋转和位移 */}
        <group rotation={rotationOffset} position={positionOffset}>
           
           {/* 2. 归一化层：应用缩放，使模型大小统一 */}
           <group scale={transformData.scaleFactor}>
              
              {/* 3. 居中层：应用负中心点偏移，使模型几何中心位于原点 */}
              <group position={transformData.centerOffset}>
                <Primitive object={clonedScene} />
              </group>

           </group>

           {/* 热点现在位于“修正层”内，坐标系为归一化后的世界单位 */}
           {/* 这意味着无论原始模型多大，热点坐标 1.0 都代表距离中心 1.0 个单位 */}
           {selectedItem.hotspots.map((spot, idx) => (
            <Html key={idx} position={spot.position} center distanceFactor={8} zIndexRange={[100, 0]}>
              <div className="relative group/spot">
                <button
                  onPointerOver={() => setActiveHotspot(idx)}
                  onPointerOut={() => setActiveHotspot(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === idx ? null : idx);
                  }}
                  className={`w-6 h-6 rounded-full border-2 border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto ${
                    activeHotspot === idx ? 'scale-125 bg-orange-500 border-white shadow-[0_0_20px_rgba(249,115,22,1)]' : 'bg-black/60 hover:bg-black/80 hover:border-orange-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-white transition-all ${
                    activeHotspot === idx ? 'animate-pulse' : ''
                  }`} />
                  {!activeHotspot && (
                    <div className="absolute inset-0 rounded-full border border-orange-500/50 animate-ping opacity-75" />
                  )}
                </button>
                
                {(activeHotspot === idx) && (
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 w-64 bg-black/90 backdrop-blur-3xl border-l-4 border-orange-500 p-5 text-white pointer-events-none transform animate-in fade-in slide-in-from-left-4 duration-300 z-[100] shadow-[0_20px_50px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-orbitron text-orange-500 tracking-[0.2em]">DATA_NODE_{String(idx + 1).padStart(2, '0')}</span>
                      <i className="fas fa-crosshairs text-orange-500/50 text-[10px]" />
                    </div>
                    <h4 className="font-orbitron text-sm font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">
                      {spot.title[language]}
                    </h4>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                      {spot.description[language]}
                    </p>
                    <div className="absolute top-0 right-0 p-1">
                      <div className="w-2 h-2 border-t border-r border-white/20" />
                    </div>
                    <div className="absolute bottom-0 right-0 p-1">
                      <div className="w-2 h-2 border-b border-r border-white/20" />
                    </div>
                  </div>
                )}
              </div>
            </Html>
          ))}
        </group>

        {/* 扫描平面也需要单独处理，让它看起来在模型周围 */}
        <Mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <PlaneGeometry args={[6, 6]} />
          <MeshBasicMaterial 
            color="#ff4400" 
            transparent 
            opacity={0.1} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Mesh>

      </Float>

      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.7} 
        scale={10} 
        blur={2} 
        far={4.5} 
        color="#000000"
      />
    </Group>
  );
};

export default WeaponModel;
