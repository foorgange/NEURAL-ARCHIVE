
export type Language = 'en' | 'zh';

export type MultiLang = {
  en: string;
  zh: string;
};

export interface WeaponStat {
  label: MultiLang;
  value: number;
  max: number;
  icon: string;
}

export interface Hotspot {
  position: [number, number, number];
  title: MultiLang;
  description: MultiLang;
}

export interface ModelConfig {
  scaleCorrection?: number;
  positionOffset?: [number, number, number];
  rotationOffset?: [number, number, number];
  forceTacticalMaterial?: boolean; 
}

export interface VisualModeTheme {
  primaryColor: string; // 用于 UI 高亮
  ambientIntensity: number;
  spotColor: string;
  pointColor: string;
}

export interface VisualMode {
  id: string;
  label: MultiLang;
  theme: VisualModeTheme;
}

export interface WeaponData {
  id: string;
  name: MultiLang;
  subName: MultiLang;
  description: MultiLang;
  modelUrl: string;
  stats: WeaponStat[];
  hotspots: Hotspot[];
  previewImg: string;
  modelConfig?: ModelConfig;
  visualModes: VisualMode[]; // 新增：每个物品独立的视觉模式配置
  customActions?: {
    primary: MultiLang;
    secondary: MultiLang;
  };
}
