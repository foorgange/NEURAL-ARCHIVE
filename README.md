
# NEURAL ARCHIVE: Containment & Display / 神经元档案：收容与展示

![React](https://img.shields.io/badge/React-19.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-R3F-black) ![License](https://img.shields.io/badge/License-MIT-green) ![Security](https://img.shields.io/badge/Security-Classified-red)

> **A secure containment interface for the "Neural" series bio-digital weaponry.**
>
> **专为“神经元”系列生物数字武器设计的安全收容与检视界面。**

---

## 📖 Operational Overview / 行动概述

**The Neural Archive** is a classified web terminal designed to visualize, analyze, and contain high-risk assets from the "Neural" weapon lineage (e.g., X1 Command Unit, R7 Bio-Canister, Z4 Decryption Engine). Built with **React Three Fiber**, this system simulates a direct neural link to the armory database.

**神经元档案** 是一个机密级 Web 终端，旨在可视化、分析和收容“神经元”系列的高风险资产（如 X1 指挥单元、R7 生物罐、Z4 解密引擎）。本系统基于 **React Three Fiber** 构建，模拟了通往军械库数据库的直接神经链路。

Unlike standard asset viewers, this interface prioritizes **Atmospheric Immersion** and **Tactical Data Integrity**. It features specialized "Spectrum Modes" to analyze the physical and metaphysical properties of contained artifacts.
<img width="3071" height="1458" alt="image" src="https://github.com/user-attachments/assets/fbe49024-599d-4029-8425-e217ed7867f8" />

与普通的资产查看器不同，本界面优先考虑**氛围沉浸感**和**战术数据完整性**。它具有专门的“光谱模式”，用于分析收容物的物理和超物理属性。

## ✨ System Modules / 系统模块

### 🔐 Secure Interface / 安全界面
- **Neural Sigils:** Procedural geometry generation for asset identification tokens.
  - **神经符印：** 用于资产身份识别的程序化几何图形生成。
- **Diegetic HUD:** Floating tactical overlays, data streams, and sync status monitors.
  - **叙事性 HUD：** 悬浮战术覆盖层、数据流和同步状态监视器。
- **Bilingual Protocol:** Real-time localized encryption switching (English / Chinese).
  - **双语协议：** 实时本地化加密切换（中/英）。
<img width="3071" height="1457" alt="image" src="https://github.com/user-attachments/assets/fd9334ea-6c29-4bdd-966e-181c9994109a" />

### 🧊 Containment Rendering / 收容渲染
- **Auto-Normalization Protocols:** The system automatically recalculates the bounding box of uploaded geometry to fit standard containment fields (approx 3.0 units).
  - **自动归一化协议：** 系统自动重新计算上传几何体的包围盒，以适应标准收容力场（约 3.0 单位）。
- **Tactical Material Override:** Optional "Dark Metal" nano-coating for prototype visualization.
  - **战术材质覆盖：** 用于原型机可视化的可选“暗金属”纳米涂层。
- **Deep-Scan Hotspots:** 3D spatial annotations linked to specific component data.
  - **深度扫描热点：** 链接到特定组件数据的 3D 空间注释。
<img width="3068" height="1479" alt="image" src="https://github.com/user-attachments/assets/b17df286-a647-4001-ac60-df142f226f1c" />

### 👁️ Spectrum Analysis / 光谱分析
Each containment unit supports specific visual modes:
- **Standard:** Optical spectrum (PBR).
- **Night-Vis:** Low-light amplification for tactical inserts.
- **Thermal:** Heat signature detection for weaponry.
- **Flux-View:** Fluid dynamics analysis (specifically for the R7 Bio-Canister).
- **Stress:** Structural integrity testing (specifically for the Z4 Engine).
<img width="3047" height="1414" alt="image" src="https://github.com/user-attachments/assets/58bd7394-b658-4cf9-b3fd-b967ee31c852" />

每个收容单元支持特定的视觉模式：
- **标准视图：** 光学光谱 (PBR)。
- **夜视增强：** 用于战术介入的微光放大。
- **热成像：** 武器热特征检测。
- **液位透视：** 流体动力学分析（专门用于 R7 生物罐）。
- **结构应力：** 结构完整性测试（专门用于 Z4 引擎）。

---

## 🚀 Access Protocols / 访问协议

### Prerequisites / 前置要求
- Node.js (v16+)
- npm or yarn

### Initialization / 初始化

1.  **Clone the Repository / 克隆仓库**
    ```bash
    git clone https://github.com/your-username/neural-archive.git
    cd neural-archive
    ```

2.  **Install Dependencies / 安装依赖**
    ```bash
    npm install
    ```

3.  **Establish Link / 建立链路 (启动服务器)**
    ```bash
    npm run dev
    ```

4.  **Access Terminal / 访问终端**
    Open `http://localhost:5173` in your browser.

---

## ⚙️ Asset Configuration / 资产配置

All containment data is stored in `constants.tsx`. Authorized personnel may add new entries.
所有收容数据存储在 `constants.tsx` 中。授权人员可添加新条目。

### Registering New Assets / 注册新资产

Add a new entry to the `ARCHIVE_DATA` array:
在 `ARCHIVE_DATA` 数组中添加新条目：

```typescript
{
  id: 'neural-prototype-01',
  name: { en: 'NEURAL-XX', zh: '神经元-XX' },
  subName: { en: 'CLASSIFIED', zh: '绝密' },
  description: { en: '...', zh: '...' },
  modelUrl: '/assets/models/prototype.glb', 
  previewImg: 'SIGIL_CODE',
  
  // Containment Field Settings / 收容力场设置
  modelConfig: {
    scaleCorrection: 1.0, // Adjust size relative to field / 调整相对于力场的大小
    positionOffset: [0, 0, 0], 
    forceTacticalMaterial: true // Apply stealth coating? / 是否应用隐形涂层
  },

  // Analysis Modes / 分析模式
  visualModes: [
    {
      id: 'standard',
      label: { en: 'Standard', zh: '标准' },
      theme: { 
        primaryColor: '#f97316', // Interface Color / 界面颜色
        ambientIntensity: 0.5, 
        spotColor: '#ffffff', 
        pointColor: '#ff8800' 
      }
    }
  ],

  // Performance Metrics / 性能指标
  stats: [
    { label: { en: 'Lethality', zh: '致死率' }, value: 99, max: 100, icon: 'fa-skull' },
  ],

  // Component Analysis / 组件分析
  hotspots: [
    { 
      position: [0, 1, 0], 
      title: { en: 'Core', zh: '核心' }, 
      description: { en: 'Stable', zh: '稳定' } 
    }
  ]
}
```

---

## 📂 System Architecture / 系统架构

```
/
├── components/
│   ├── Archive.tsx       # Containment List (Procedural Sigils) / 收容列表（程序化符印）
│   ├── HUD.tsx           # Tactical Overlay & Data / 战术覆盖层与数据
│   ├── Scene.tsx         # R3F Environment / R3F 环境
│   └── WeaponModel.tsx   # Asset Renderer (Normalization Logic) / 资产渲染器（归一化逻辑）
├── constants.tsx         # DATABASE & CONFIG / 数据库与配置
├── types.ts              # TypeScript Protocols / 类型协议
├── App.tsx               # Main Terminal Logic / 主终端逻辑
└── index.html            # Entry Point / 入口点
```

---

## ⚠️ Security Warnings / 安全警告

1.  **Level 4 Clearance (Z4):**
    The asset `NEURAL-Z4` (Data Extraction Engine) is locked behind a Level 4 security firewall. Users will experience a **"Permission Denied"** simulation upon access. This is standard protocol.
    资产 `NEURAL-Z4`（数据提取引擎）被锁定在 4 级安全防火墙后。用户访问时将体验到**“权限被拒绝”**的模拟。这是标准协议。

2.  **Bio-Hazard (R7):**
    When viewing `NEURAL-R7`, ensure `Flux-View` is active to monitor leakage.
    查看 `NEURAL-R7` 时，请确保激活“液位透视”以监控泄漏。

---

## 📄 License

MIT License. Declassified for educational use.
