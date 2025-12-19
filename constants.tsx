
import { WeaponData, MultiLang } from './types';

export const UI_STRINGS: Record<string, any> = {
  loading: { en: 'Initiating Neural Link', zh: '启动神经链路' },
  syncing: { en: 'Syncing Geometry...', zh: '几何数据同步中...' },
  downloading: { en: 'Downloading Data', zh: '载入数据中' },
  errorTitle: { en: 'Asset Sync Failure', zh: '资源同步失败' },
  errorDesc: { en: 'Could not establish connection to the armory database.', zh: '无法建立与军械库数据库的连接。' },
  errorButton: { en: 'Re-establish Link', zh: '重新建立连接' },
  systemId: { en: 'SYSTEM LINK ID', zh: '系统链路编号' },
  neuralLink: { en: 'Neural Link Established', zh: '神经链路已建立' },
  acousticSignal: { en: 'Acoustic Signal Active', zh: '声波信号激活' },
  rotate: { en: 'Rotate', zh: '旋转' },
  zoom: { en: 'Zoom', zh: '缩放' },
  scan: { en: 'Neural Scan', zh: '神经扫描' },
  mode: { en: 'Vis-Mode', zh: '视觉模式' },
  autoRotate: { en: 'Auto-Rotate', zh: '自动旋转' },
  focus: { en: 'Focus', zh: '聚焦' },
  archiveTitle: { en: 'TACTICAL ARCHIVES', zh: '战术档案馆' },
  archiveSub: { en: 'NEURAL INTERFACE DATABASE v4.0.2', zh: '神经接口数据库 v4.0.2' },
  accessAsset: { en: 'Access Asset', zh: '访问资产' },
  backToArchive: { en: 'Return to Database', zh: '返回数据库' },
  statusAvailable: { en: 'AVAILABLE', zh: '可用' },
  statusEncrypted: { en: 'ENCRYPTED', zh: '加密中' },
  sidebarDesc: { 
    en: 'Accessing secure neural-link infrastructure. Authorized personnel only. All synchronization logs are being recorded.',
    zh: '正在访问安全神经链路基础设施。仅限授权人员。所有同步日志均已记录。'
  },
  statsActive: { en: 'ASSETS_ACTIVE', zh: '活动资产' },
  statsIntegrity: { en: 'SYSTEM_INTEGRITY', zh: '系统完整性' },
  syncReady: { en: 'SYNC_READY', zh: '就绪' },
  signalStrength: { en: 'SIGNAL_STRENGTH', zh: '信号强度' },
  neuralStatus: { en: 'NEURAL_LINK', zh: '神经链路状态' },
  active: { en: 'ACTIVE', zh: '激活' },
  opRotate: { en: 'L_CLICK: ROTATE', zh: '左键：旋转' },
  opZoom: { en: 'SCROLL: ZOOM', zh: '滚轮：缩放' },
  modes: {
    standard: { en: 'Standard', zh: '标准' },
    tactical: { en: 'Tactical', zh: '战术' },
    bioscan: { en: 'Bio-Scan', zh: '生物扫描' }
  },
  // Warning Strings
  warning: { en: 'WARNING', zh: '警 告' },
  accessRestricted: { en: 'ACCESS RESTRICTED', zh: '访问受限' },
  permissionDenied: { en: 'INSUFFICIENT CLEARANCE LEVEL', zh: '权限等级不足' },
  limitedFunctionality: { en: 'RUNNING IN LIMITED MODE', zh: '以受限模式运行' },
};

export const ARCHIVE_DATA: WeaponData[] = [
  {
    id: 'neural-x1',
    name: { en: 'NEURAL-X1', zh: '神经元-X1' },
    subName: { en: 'COMMAND INTERFACE UNIT', zh: '战术指挥界面单元' },
    description: { 
      en: 'Advanced tactical neural link helmet with integrated HUD and localized ballistic protection.',
      zh: '集成 HUD 和局部弹道防护的高级战术神经链路头盔。'
    },
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    previewImg: 'SIGIL_ALPHA_01',
    modelConfig: {
      scaleCorrection: 1.0,
      positionOffset: [0, 0, 0],
      rotationOffset: [0, 0, 0],
      forceTacticalMaterial: false 
    },
    // X1 保持标准的战术风格
    visualModes: [
      {
        id: 'standard',
        label: { en: 'Standard', zh: '标准视图' },
        theme: { primaryColor: '#f97316', ambientIntensity: 0.5, spotColor: '#ffffff', pointColor: '#ff8800' } // Orange
      },
      {
        id: 'night-vis',
        label: { en: 'Night-Vis', zh: '夜视增强' },
        theme: { primaryColor: '#22c55e', ambientIntensity: 0.1, spotColor: '#4ade80', pointColor: '#16a34a' } // Green
      },
      {
        id: 'thermal',
        label: { en: 'Thermal', zh: '热成像' },
        theme: { primaryColor: '#ef4444', ambientIntensity: 0.1, spotColor: '#b91c1c', pointColor: '#7f1d1d' } // Red
      }
    ],
    stats: [
      { label: { en: 'DEFENSE', zh: '防御' }, value: 94, max: 100, icon: 'fa-shield-halved' },
      { label: { en: 'SENSORY', zh: '感官' }, value: 88, max: 100, icon: 'fa-eye' },
      { label: { en: 'SIGNAL', zh: '信号' }, value: 96, max: 100, icon: 'fa-signal' },
      { label: { en: 'DURABILITY', zh: '耐久' }, value: 82, max: 100, icon: 'fa-hammer' },
    ],
    hotspots: [
      { position: [0, 1.0, 0.8], title: { en: 'Optical Array', zh: '光学阵列' }, description: { en: 'Multi-spectrum camera system.', zh: '多光谱摄像系统。' } },
      { position: [0.9, 0.5, 0], title: { en: 'Comms Uplink', zh: '通信上行' }, description: { en: 'Secure satellite link.', zh: '安全卫星链路。' } },
      { position: [-0.9, -0.2, 0.5], title: { en: 'Neural Port', zh: '神经接口' }, description: { en: 'Direct neural interface.', zh: '直接神经接口。' } },
    ],
    customActions: {
      primary: { en: 'Neural Scan', zh: '神经扫描' },
      secondary: { en: 'Lock View', zh: '锁定视角' }
    }
  },
  {
    id: 'neural-r7',
    name: { en: 'NEURAL-R7', zh: '神经元-R7' },
    subName: { en: 'BIOMETRIC STIM-CANISTER', zh: '生物识别补给罐' },
    description: { 
      en: 'High-pressure medical containment unit designed for rapid administration of neuro-stimulants in zero-G environments.',
      zh: '高压医疗容器，专为在零重力环境下快速注射神经兴奋剂而设计。'
    },
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
    previewImg: 'SIGIL_BETA_07',
    modelConfig: {
      scaleCorrection: 1.1, 
      positionOffset: [0, 0, 0], 
      rotationOffset: [0, 0, -Math.PI / 12], 
      forceTacticalMaterial: true 
    },
    // R7 使用液体分析相关的模式
    visualModes: [
      {
        id: 'standard',
        label: { en: 'Standard', zh: '标准视图' },
        theme: { primaryColor: '#f97316', ambientIntensity: 0.5, spotColor: '#ffffff', pointColor: '#ff8800' }
      },
      {
        id: 'flux-view',
        label: { en: 'Flux-View', zh: '液位透视' },
        theme: { primaryColor: '#06b6d4', ambientIntensity: 0.2, spotColor: '#67e8f9', pointColor: '#22d3ee' } // Cyan/Ice
      },
      {
        id: 'chem-scan',
        label: { en: 'Chem-Scan', zh: '成分分析' },
        theme: { primaryColor: '#a3e635', ambientIntensity: 0.1, spotColor: '#84cc16', pointColor: '#4d7c0f' } // Toxic Lime
      }
    ],
    stats: [
      { label: { en: 'RECOVERY', zh: '恢复' }, value: 98, max: 100, icon: 'fa-heart-pulse' },
      { label: { en: 'PRESSURE', zh: '压力' }, value: 72, max: 100, icon: 'fa-gauge-high' },
      { label: { en: 'PURITY', zh: '纯度' }, value: 99, max: 100, icon: 'fa-vial-circle-check' },
      { label: { en: 'CAPACITY', zh: '容量' }, value: 85, max: 100, icon: 'fa-battery-half' },
    ],
    hotspots: [
      { position: [0, 1.4, 0], title: { en: 'Dispersion Valve', zh: '扩散阀门' }, description: { en: 'Aerosolized delivery system.', zh: '气溶胶输送系统。' } },
      { position: [0, 0, 0.6], title: { en: 'Bio-Storage Unit', zh: '生物存储单元' }, description: { en: 'Triple-insulated alloy casing.', zh: '三层绝缘合金外壳。' } },
      { position: [0, -1.0, 0], title: { en: 'Sync Port', zh: '同步接口' }, description: { en: 'Dosage monitoring connection.', zh: '剂量监控连接点。' } },
    ],
    customActions: {
      primary: { en: 'Bio-Purge', zh: '生物净化' },
      secondary: { en: 'Sync Pulse', zh: '脉冲同步' }
    }
  },
  {
    id: 'neural-z4',
    name: { en: 'NEURAL-Z4', zh: '神经元-Z4' },
    subName: { en: 'DATA EXTRACTION ENGINE', zh: '数据提取引擎核心' },
    description: { 
      en: 'A mechanical cryptography core used for brute-forcing high-level neural encryption layers in the field.',
      zh: '一种机械密码核心，用于在现场强行破解高级神经加密层。'
    },
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/GearboxAssy.glb',
    previewImg: 'SIGIL_GAMMA_04',
    modelConfig: {
      scaleCorrection: 2.8, 
      positionOffset: [0, 0, 0],
      rotationOffset: [Math.PI / 6, Math.PI / 3, 0],
      forceTacticalMaterial: true
    },
    // Z4 使用机械工程相关的模式
    visualModes: [
      {
        id: 'standard',
        label: { en: 'Standard', zh: '标准视图' },
        theme: { primaryColor: '#f97316', ambientIntensity: 0.5, spotColor: '#ffffff', pointColor: '#ff8800' }
      },
      {
        id: 'heat-map',
        label: { en: 'Heat-Map', zh: '摩擦热图' },
        theme: { primaryColor: '#ef4444', ambientIntensity: 0.2, spotColor: '#f87171', pointColor: '#991b1b' } // Red/Orange Heat
      },
      {
        id: 'stress',
        label: { en: 'Stress', zh: '结构应力' },
        theme: { primaryColor: '#d8b4fe', ambientIntensity: 0.1, spotColor: '#c084fc', pointColor: '#7e22ce' } // Purple/High Contrast
      }
    ],
    stats: [
      { label: { en: 'DECRYPTION', zh: '解密' }, value: 97, max: 100, icon: 'fa-unlock-keyhole' },
      { label: { en: 'PROCESSING', zh: '处理' }, value: 92, max: 100, icon: 'fa-microchip' },
      { label: { en: 'COOLING', zh: '冷却' }, value: 65, max: 100, icon: 'fa-fan' },
      { label: { en: 'TORQUE', zh: '转矩' }, value: 88, max: 100, icon: 'fa-gears' },
    ],
    hotspots: [
      { position: [1.2, 0.5, 0], title: { en: 'Logic Gear', zh: '逻辑齿轮' }, description: { en: 'Nanoscale mechanical gate.', zh: '纳米级机械门。' } },
      { position: [-0.8, -0.8, 0.5], title: { en: 'Heat Matrix', zh: '散热矩阵' }, description: { en: 'Active thermal management.', zh: '主动热管理。' } },
      { position: [0, 0.8, -0.5], title: { en: 'Uplink', zh: '上行接口' }, description: { en: 'Secure extraction point.', zh: '安全提取点。' } },
    ],
    customActions: {
      primary: { en: 'Brute Force', zh: '暴力破解' },
      secondary: { en: 'Decrypt', zh: '数据解密' }
    }
  }
];
