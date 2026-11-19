<div align="center">

# 🌊 Liquid Glass UI (React)

**Ultra-realistic Liquid Glassmorphism & Fluid Refraction Component Library for React and TypeScript.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Author: Abhishek Bhatnagar](https://img.shields.io/badge/Author-Abhishek%20Bhatnagar-38bdf8.svg)](https://github.com/bhatnagar-built)

[Live Interactive Showcase](https://bhatnagar-built.github.io/ui-liquid-glass/) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Components](#-components) • [Optics & Theming](#-optics--theming)

---

</div>

## ✨ Highlights

- 💧 **Authentic Fluid Refraction**: Procedural optical displacement simulates realistic physical refraction vectors across dynamic live backdrops, images, and videos.
- 🪞 **Dynamic Specular Caustics**: Pointer-following directional lighting glints, Fresnel edge reflections, and tactile surface feedback.
- 🌈 **Prismatic Chromatic Dispersion**: Realistic RGB wavelength separation at refractive boundaries for a hyper-realistic optical feel.
- 📐 **Continuous Squircle Geometry**: $G^2$-continuous squircle rounding across cards, buttons, docks, and interactive widgets.
- ⚡️ **Zero Bloat & Blazing Fast**: Hardware-accelerated CSS variables, SVG filter pipelines, and modern React hooks — no heavy third-party runtimes.
- 🛠 **Full TypeScript Precision**: 100% typed with comprehensive IntelliSense and pre-bundled `.d.ts` declaration maps.
- 🧩 **Production-Ready Components**: 10+ modular components including scenes, cards, buttons, floating dock toolbars, tabs, sliders, switches, and badges.

---

## 📦 Installation

```bash
# Using npm
npm install ui-liquid-glass

# Using pnpm
pnpm add ui-liquid-glass

# Using yarn
yarn add ui-liquid-glass
```

Peer dependencies require `react >= 18.0.0` and `react-dom >= 18.0.0`.

---

## 🚀 Quick Start

Import the stylesheet once at your application root (e.g., `main.tsx` or `_app.tsx`):

```tsx
import 'ui-liquid-glass/style.css';
```

Wrap your scene in `<LiquidGlassScene>` and place glass components over live content:

```tsx
import React from 'react';
import {
  LiquidGlassScene,
  LiquidGlassContent,
  LiquidGlassCard,
  LiquidGlassButton,
} from 'ui-liquid-glass';
import 'ui-liquid-glass/style.css';

export function Example() {
  return (
    <LiquidGlassScene
      material="crystal"
      appearance="dark"
      refraction={45}
      blur={24}
      specular={true}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* Live background layer that glass surfaces refract */}
      <LiquidGlassContent>
        <img
          src="/wallpaper.jpg"
          alt="Refractive Backdrop"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </LiquidGlassContent>

      {/* Refracted Glass Card */}
      <div style={{ position: 'relative', zIndex: 10, padding: 40 }}>
        <LiquidGlassCard radius={28} glow tilt>
          <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Liquid Titanium</h2>
          <p style={{ opacity: 0.8, margin: '12px 0 24px' }}>
            Live fluid refraction refracting the background layer in real time.
          </p>
          <LiquidGlassButton variant="primary">
            Explore Ecosystem
          </LiquidGlassButton>
        </LiquidGlassCard>
      </div>
    </LiquidGlassScene>
  );
}
```

---

## 🧩 Components Overview

| Component | Description |
| :--- | :--- |
| **`LiquidGlassScene`** | Root context coordinating global optical parameters, lighting angles, and SVG filters. |
| **`LiquidGlassContent`** | Live refractive backdrop layer (images, gradients, animated canvas, videos, text). |
| **`LiquidGlassSurface`** | Core versatile glass primitive with custom refraction, blur, radius, and tint. |
| **`LiquidGlassCard`** | Multi-layer glass card with optional interactive 3D perspective tilt on pointer movement. |
| **`LiquidGlassButton`** | Tactile glass button with multiple sizes (`sm`, `default`, `lg`, `icon`) and variants (`primary`, `secondary`, `ghost`). |
| **`LiquidGlassToolbar`** | Floating island dock navigation bar for modern dashboards and web applications. |
| **`LiquidGlassTabs`** | Fluid tab bar with animated liquid glass indicator pill that refracts content behind it. |
| **`LiquidGlassSlider`** | Refractive glass slider track with fluid draggable glass bubble thumb. |
| **`LiquidGlassSwitch`** | Liquid glass toggle switch with tactile spring dynamics and glowing active state. |
| **`LiquidGlassBadge`** | Frosted glass tag / pill badge in multiple semantic variants. |

---

## 🎛 Optics & Theming

### Material Presets

You can configure materials on `<LiquidGlassScene>` or override them per component:

- `'clear'`: High-transmission crystalline glass with minimal tint and crisp edge displacement.
- `'frosted'`: Dense, silky frosted glass with high diffuse dispersion ($32\text{px}+$ blur).
- `'regular'`: Balanced satin glass with soft ambient shadows and light refraction.
- `'crystal'`: High-end angled reflection with chromatic prism edge caustics.
- `'obsidian'`: Smoky, deep tinted dark glass designed for sleek futuristic interfaces.

### Optical Configuration

```tsx
<LiquidGlassScene
  appearance="dark"         // 'light' | 'dark' | 'auto'
  material="crystal"        // 'clear' | 'frosted' | 'regular' | 'crystal' | 'obsidian'
  refraction={50}           // 0 to 100 displacement power
  blur={24}                 // 0 to 60px backdrop blur
  specular={true}           // Pointer-tracking directional specular reflection
  chromatic={true}          // Prismatic chromatic dispersion (RGB channel offset)
  tint="rgba(56, 189, 248, 0.2)" // Custom hex / rgba tint color
>
  {/* Content */}
</LiquidGlassScene>
```

---

## 🛠 Local Development

```bash
# Clone the repository
git clone https://github.com/bhatnagar-built/ui-liquid-glass.git

# Enter project directory
cd ui-liquid-glass

# Install dependencies
npm install

# Start interactive showcase development server
npm run dev

# Build production showcase
npm run build

# Build standalone NPM library bundle
npm run build:lib
```

---

## 📄 License

[MIT License](LICENSE) © 2026 [Abhishek Bhatnagar](https://github.com/bhatnagar-built). Free and open-source for personal and commercial use.
