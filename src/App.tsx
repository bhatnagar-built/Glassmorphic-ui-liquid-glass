import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Moon,
  Sun,
  Github,
  Sparkles,
  Layers,
  Copy,
  Check,
  CreditCard,
  Sliders,
  ShieldCheck,
  Droplet,
  Compass,
  Code2,
} from 'lucide-react';
import {
  LiquidGlassScene,
  LiquidGlassContent,
  LiquidGlassSurface,
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassToolbar,
  LiquidGlassTabs,
  LiquidGlassSlider,
  LiquidGlassSwitch,
  LiquidGlassBadge,
  type GlassMaterial,
  type GlassAppearance,
} from './lib';

export default function App() {
  // Playground State
  const [appearance, setAppearance] = useState<GlassAppearance>('dark');
  const [material, setMaterial] = useState<GlassMaterial>('crystal');
  const [refraction, setRefraction] = useState(45);
  const [blur, setBlur] = useState(24);
  const [specular, setSpecular] = useState(true);
  const [chromatic, setChromatic] = useState(false);
  const [tintColor, setTintColor] = useState<string>('');
  const [backdrop, setBackdrop] = useState<'mesh' | 'alpine' | 'neon' | 'typography'>('mesh');

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(38);
  const [volume, setVolume] = useState(75);

  // Tabs State
  const [activeTab, setActiveTab] = useState('showcase');
  const [copiedCode, setCopiedCode] = useState(false);

  const tints = [
    { name: 'Pure Glass', value: '' },
    { name: 'Ice Sapphire', value: 'rgba(56, 189, 248, 0.22)' },
    { name: 'Cyber Violet', value: 'rgba(168, 85, 247, 0.22)' },
    { name: 'Emerald Wave', value: 'rgba(34, 197, 94, 0.22)' },
    { name: 'Sunset Amber', value: 'rgba(245, 158, 11, 0.22)' },
    { name: 'Rose Quartz', value: 'rgba(244, 63, 94, 0.22)' },
  ];

  const handleCopyCode = () => {
    const code = `<LiquidGlassScene
  material="${material}"
  appearance="${appearance}"
  refraction={${refraction}}
  blur={${blur}}
  specular={${specular}}
  chromatic={${chromatic}}
>
  <LiquidGlassContent>
    <img src="/background.jpg" alt="Background" />
  </LiquidGlassContent>
  <LiquidGlassCard radius={24} glow>
    <h2>Liquid Glass Card</h2>
    <LiquidGlassButton variant="primary">Get Started</LiquidGlassButton>
  </LiquidGlassCard>
</LiquidGlassScene>`;

    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <LiquidGlassScene
      appearance={appearance}
      material={material}
      refraction={refraction}
      blur={blur}
      specular={specular}
      chromatic={chromatic}
      tint={tintColor}
      className="min-h-screen font-sans flex flex-col"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        color: appearance === 'dark' ? '#f8fafc' : '#0f172a',
      }}
    >
      {/* 🌌 Dynamic Live Refractive Backdrop */}
      <LiquidGlassContent>
        {backdrop === 'mesh' && (
          <div
            className="w-full h-full min-h-screen"
            style={{
              background:
                appearance === 'dark'
                  ? 'radial-gradient(at 10% 20%, #1e1b4b 0px, transparent 50%), radial-gradient(at 80% 0%, #312e81 0px, transparent 50%), radial-gradient(at 0% 50%, #0369a1 0px, transparent 50%), radial-gradient(at 80% 50%, #701a75 0px, transparent 50%), radial-gradient(at 0% 100%, #1e293b 0px, transparent 50%), radial-gradient(at 80% 100%, #0f172a 0px, transparent 50%), #020617'
                  : 'radial-gradient(at 10% 20%, #bae6fd 0px, transparent 50%), radial-gradient(at 80% 0%, #ddd6fe 0px, transparent 50%), radial-gradient(at 0% 50%, #fed7aa 0px, transparent 50%), radial-gradient(at 80% 50%, #fbcfe8 0px, transparent 50%), radial-gradient(at 0% 100%, #e0f2fe 0px, transparent 50%), #f8fafc',
              backgroundAttachment: 'fixed',
            }}
          />
        )}

        {backdrop === 'alpine' && (
          <div
            className="w-full h-full min-h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80")',
              filter: appearance === 'dark' ? 'brightness(0.65)' : 'brightness(0.95)',
            }}
          />
        )}

        {backdrop === 'neon' && (
          <div
            className="w-full h-full min-h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2000&q=80")',
              filter: appearance === 'dark' ? 'brightness(0.8)' : 'brightness(1.1)',
            }}
          />
        )}

        {backdrop === 'typography' && (
          <div
            className="w-full h-full min-h-screen p-8 flex flex-col justify-around select-none overflow-hidden"
            style={{
              background: appearance === 'dark' ? '#090d16' : '#f1f5f9',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter opacity-20 whitespace-nowrap"
                style={{
                  transform: i % 2 === 0 ? 'translateX(-5%)' : 'translateX(5%)',
                }}
              >
                LIQUID GLASS REFRACTION &bull; TACTILE OPTICS &bull; ULTRA LUXURY UI &bull;
              </div>
            ))}
          </div>
        )}
      </LiquidGlassContent>

      {/* 🧭 Foreground Content & Interactive Showcase */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="p-4 md:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LiquidGlassSurface
              radius="circle"
              material="crystal"
              className="w-10 h-10 flex items-center justify-center text-lg"
              glow
            >
              🌊
            </LiquidGlassSurface>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">Liquid Glass UI</span>
                <LiquidGlassBadge variant="info">v1.0.0</LiquidGlassBadge>
              </div>
              <span className="text-xs opacity-60">Created by Abhishek Bhatnagar</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <LiquidGlassButton
              variant="icon"
              size="icon"
              material="frosted"
              onClick={() => setAppearance(appearance === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {appearance === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </LiquidGlassButton>

            {/* GitHub Repo */}
            <a
              href="https://github.com/bhatnagar-built/ui-liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <LiquidGlassButton variant="primary" size="sm" material="crystal" glow>
                <Github size={16} className="mr-1.5" />
                <span>GitHub</span>
              </LiquidGlassButton>
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col items-center">
          <div className="text-center max-w-2xl mb-8">
            <LiquidGlassBadge variant="info" className="mb-3">
              <Sparkles size={12} className="mr-1 inline" /> Next-Gen React Glassmorphism
            </LiquidGlassBadge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Real Fluid Optics for Modern Interfaces
            </h1>
            <p className="text-sm md:text-base opacity-75 font-normal leading-relaxed">
              Ultra-realistic liquid glass surfaces with dynamic backdrop refraction, specular
              caustics, continuous squircle geometry, and tactile physics.
            </p>
          </div>

          {/* Studio Controls Bar */}
          <LiquidGlassSurface
            radius={24}
            material="regular"
            className="w-full max-w-5xl p-4 md:p-6 mb-10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Material Preset */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2 block">
                  Material Finish
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['clear', 'regular', 'frosted', 'crystal', 'obsidian'] as GlassMaterial[]).map(
                    (mat) => (
                      <button
                        key={mat}
                        onClick={() => setMaterial(mat)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          background:
                            material === mat ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.1)',
                          color: material === mat ? '#38bdf8' : 'inherit',
                          border:
                            material === mat
                              ? '1px solid rgba(56, 189, 248, 0.6)'
                              : '1px solid rgba(255, 255, 255, 0.15)',
                          cursor: 'pointer',
                        }}
                      >
                        {mat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Refraction & Blur Sliders */}
              <div className="space-y-3">
                <LiquidGlassSlider
                  label="Refraction Power"
                  value={refraction}
                  min={0}
                  max={100}
                  onChange={setRefraction}
                />
                <LiquidGlassSlider
                  label="Surface Blur (px)"
                  value={blur}
                  min={0}
                  max={60}
                  onChange={setBlur}
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-col justify-center space-y-3">
                <LiquidGlassSwitch
                  label="Specular Caustics"
                  checked={specular}
                  onChange={setSpecular}
                />
                <LiquidGlassSwitch
                  label="Chromatic Dispersion"
                  checked={chromatic}
                  onChange={setChromatic}
                />
              </div>

              {/* Backdrop Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2 block">
                  Environment
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'mesh', label: 'Cosmic Mesh' },
                    { id: 'alpine', label: 'Alpine Horizon' },
                    { id: 'neon', label: 'Neon Cyberpunk' },
                    { id: 'typography', label: 'Typography' },
                  ].map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setBackdrop(env.id as any)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 500,
                        background:
                          backdrop === env.id
                            ? 'rgba(56, 189, 248, 0.3)'
                            : 'rgba(255, 255, 255, 0.08)',
                        color: backdrop === env.id ? '#38bdf8' : 'inherit',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        cursor: 'pointer',
                      }}
                    >
                      {env.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tint Color Pills */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold opacity-70">Glass Tint:</span>
              {tints.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTintColor(t.value)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 500,
                    background: t.value || 'rgba(255, 255, 255, 0.1)',
                    border:
                      tintColor === t.value
                        ? '2px solid #38bdf8'
                        : '1px solid rgba(255, 255, 255, 0.25)',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </LiquidGlassSurface>

          {/* Showcase Tabs */}
          <LiquidGlassTabs
            className="mb-8"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'showcase', label: 'Interactive Widgets', icon: <Compass size={14} /> },
              { id: 'controls', label: 'Controls & Inputs', icon: <Sliders size={14} /> },
              { id: 'code', label: 'Code & Integration', icon: <Code2 size={14} /> },
            ]}
          />

          {/* TAB 1: SHOWCASE WIDGETS */}
          {activeTab === 'showcase' && (
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Music Player Widget */}
              <LiquidGlassCard
                radius={28}
                material={material}
                className="p-6"
                glow
                header={
                  <div className="flex items-center justify-between">
                    <LiquidGlassBadge variant="default">Now Playing</LiquidGlassBadge>
                    <span className="text-xs font-mono opacity-60">Spatial Audio</span>
                  </div>
                }
              >
                <div className="flex flex-col items-center">
                  {/* Glass Album Art with dynamic refraction */}
                  <div className="relative w-48 h-48 mb-6 group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                      alt="Album Cover"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                    <LiquidGlassSurface
                      radius={16}
                      material="crystal"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <LiquidGlassButton
                        variant="icon"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                        glow
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </LiquidGlassButton>
                    </LiquidGlassSurface>
                  </div>

                  {/* Track Info */}
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg">Chroma Velocity</h3>
                    <p className="text-xs opacity-65 font-medium">Bhatnagar Audio Lab &bull; FLAC 96kHz</p>
                  </div>

                  {/* Scrubber */}
                  <div className="w-full mb-6">
                    <LiquidGlassSlider
                      value={trackProgress}
                      min={0}
                      max={100}
                      onChange={setTrackProgress}
                    />
                    <div className="flex justify-between text-[11px] font-mono opacity-60 mt-1">
                      <span>01:14</span>
                      <span>03:28</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4 mb-4">
                    <LiquidGlassButton variant="icon" size="sm" material="clear">
                      <SkipBack size={18} />
                    </LiquidGlassButton>
                    <LiquidGlassButton
                      variant="primary"
                      size="lg"
                      material="crystal"
                      radius="circle"
                      onClick={() => setIsPlaying(!isPlaying)}
                      glow
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="icon" size="sm" material="clear">
                      <SkipForward size={18} />
                    </LiquidGlassButton>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-3 w-48 mt-2 opacity-85">
                    <Volume2 size={16} />
                    <LiquidGlassSlider value={volume} min={0} max={100} onChange={setVolume} />
                  </div>
                </div>
              </LiquidGlassCard>

              {/* Luxury Glass FinTech Card with 3D Tilt */}
              <div className="space-y-6">
                <LiquidGlassCard
                  radius={28}
                  material="crystal"
                  tilt={true}
                  className="p-7 relative aspect-[1.58/1] flex flex-col justify-between"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
                  }}
                  glow
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={22} className="text-sky-400" />
                      <span className="font-bold tracking-widest text-sm uppercase">Liquid Titanium</span>
                    </div>
                    <LiquidGlassBadge variant="info">World Elite</LiquidGlassBadge>
                  </div>

                  {/* Holographic Chip */}
                  <div className="my-auto py-2">
                    <div
                      className="w-12 h-9 rounded-md mb-4 flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, #fef08a 0%, #ca8a04 50%, #fef08a 100%)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <div className="w-8 h-6 border border-amber-900/40 rounded flex flex-col justify-around p-0.5">
                        <div className="h-0.5 bg-amber-900/30" />
                        <div className="h-0.5 bg-amber-900/30" />
                      </div>
                    </div>
                    <div className="font-mono text-xl tracking-widest font-semibold drop-shadow">
                      4921 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8892
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-2 border-t border-white/10">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                        Cardholder
                      </div>
                      <div className="font-semibold text-sm tracking-wide">ABHISHEK BHATNAGAR</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                        Expires
                      </div>
                      <div className="font-mono text-xs font-semibold">12/30</div>
                    </div>
                  </div>
                </LiquidGlassCard>

                {/* Floating Island Toolbar */}
                <div className="flex justify-center pt-4">
                  <LiquidGlassToolbar>
                    <LiquidGlassButton variant="icon" size="sm" material="clear">
                      <Compass size={16} />
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="icon" size="sm" material="clear">
                      <Layers size={16} />
                    </LiquidGlassButton>
                    <div className="w-px h-5 bg-white/20 mx-1" />
                    <LiquidGlassButton variant="primary" size="sm" material="crystal" glow>
                      Connect Wallet
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="icon" size="sm" material="clear">
                      <ShieldCheck size={16} />
                    </LiquidGlassButton>
                  </LiquidGlassToolbar>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTROLS & INPUTS */}
          {activeTab === 'controls' && (
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Button Variants */}
              <LiquidGlassCard radius={20} material={material} className="p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Droplet size={18} className="text-sky-400" /> Glass Button Variants
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <LiquidGlassButton variant="primary" size="default" glow>
                      Primary Crystal
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="secondary" size="default">
                      Secondary Frosted
                    </LiquidGlassButton>
                    <LiquidGlassButton variant="ghost" size="default">
                      Ghost Minimal
                    </LiquidGlassButton>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <LiquidGlassButton size="sm">Small 32px</LiquidGlassButton>
                    <LiquidGlassButton size="default">Default 42px</LiquidGlassButton>
                    <LiquidGlassButton size="lg">Large 50px</LiquidGlassButton>
                  </div>
                </div>
              </LiquidGlassCard>

              {/* Switches & Sliders */}
              <LiquidGlassCard radius={20} material={material} className="p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Sliders size={18} className="text-sky-400" /> Fluid Value Controls
                </h3>
                <div className="space-y-6">
                  <LiquidGlassSwitch
                    label="Fluid Atmospheric Haze"
                    checked={true}
                    onChange={() => {}}
                  />
                  <LiquidGlassSwitch
                    label="Prismatic Color Dispersion"
                    checked={chromatic}
                    onChange={setChromatic}
                  />
                  <LiquidGlassSlider
                    label="Dynamic Refraction Depth"
                    value={refraction}
                    min={0}
                    max={100}
                    onChange={setRefraction}
                  />
                </div>
              </LiquidGlassCard>
            </div>
          )}

          {/* TAB 3: CODE & INTEGRATION */}
          {activeTab === 'code' && (
            <div className="w-full max-w-3xl space-y-6">
              <LiquidGlassCard radius={20} material="obsidian" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 size={18} className="text-sky-400" />
                    <span className="font-mono text-sm font-semibold">Quick Start Integration</span>
                  </div>
                  <LiquidGlassButton
                    variant="icon"
                    size="sm"
                    material="clear"
                    onClick={handleCopyCode}
                  >
                    {copiedCode ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </LiquidGlassButton>
                </div>

                <div className="font-mono text-xs bg-black/40 p-4 rounded-xl overflow-x-auto text-sky-200 leading-relaxed">
                  <span className="opacity-50"># Install the package</span>
                  <br />
                  <span className="text-yellow-400">npm install</span> ui-liquid-glass
                  <br />
                  <br />
                  <span className="opacity-50">// Import and wrap your UI in LiquidGlassScene</span>
                  <br />
                  <span className="text-purple-400">import</span> &#123; LiquidGlassScene, LiquidGlassContent, LiquidGlassCard, LiquidGlassButton &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'ui-liquid-glass'</span>;
                  <br />
                  <span className="text-purple-400">import</span> <span className="text-emerald-400">'ui-liquid-glass/style.css'</span>;
                  <br />
                  <br />
                  <span className="text-purple-400">export default function</span> <span className="text-blue-300">MyGlassApp</span>() &#123;
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">LiquidGlassScene</span> material=<span className="text-emerald-400">"{material}"</span> refraction=&#123;<span className="text-amber-300">{refraction}</span>&#125;&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">LiquidGlassContent</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">div</span> className=<span className="text-emerald-400">"background-canvas"</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-400">LiquidGlassContent</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">LiquidGlassCard</span> radius=&#123;<span className="text-amber-300">24</span>&#125; glow&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">h2</span>&gt;Refracted Glass Card&lt;/<span className="text-sky-400">h2</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-400">LiquidGlassButton</span> variant=<span className="text-emerald-400">"primary"</span>&gt;Action&lt;/<span className="text-sky-400">LiquidGlassButton</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-400">LiquidGlassCard</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-400">LiquidGlassScene</span>&gt;
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  &#125;
                </div>
              </LiquidGlassCard>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-xs opacity-60 border-t border-white/10 mt-auto">
          Crafted with &hearts; by Abhishek Bhatnagar &bull; MIT License &bull; Available on GitHub: {' '}
          <a
            href="https://github.com/bhatnagar-built/ui-liquid-glass"
            className="underline hover:text-sky-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            bhatnagar-built/ui-liquid-glass
          </a>
        </footer>
      </div>
    </LiquidGlassScene>
  );
}
