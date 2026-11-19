import type { CSSProperties, ReactNode } from 'react';

export type GlassMaterial = 'clear' | 'frosted' | 'regular' | 'crystal' | 'obsidian';
export type GlassAppearance = 'light' | 'dark' | 'auto';

export interface GlassOptics {
  refraction: number;     // 0 to 100 px displacement
  blur: number;           // 0 to 60 px backdrop blur
  specular: boolean;      // dynamic light glint
  specularIntensity: number; // 0 to 1
  chromatic: boolean;     // chromatic aberration (RGB prism separation)
  tint?: string;          // custom hex/rgba tint
  radius?: number | 'capsule' | 'circle';
  borderOpacity?: number; // 0 to 1
}

export interface LiquidGlassContextValue {
  appearance: GlassAppearance;
  material: GlassMaterial;
  optics: GlassOptics;
  lightAngle: { x: number; y: number };
  updateLightAngle: (x: number, y: number) => void;
  sceneId: string;
}

export interface LiquidGlassSceneProps {
  children: ReactNode;
  appearance?: GlassAppearance;
  material?: GlassMaterial;
  refraction?: number;
  blur?: number;
  specular?: boolean;
  chromatic?: boolean;
  tint?: string;
  className?: string;
  style?: CSSProperties;
}

export interface LiquidGlassSurfaceProps {
  children?: ReactNode;
  material?: GlassMaterial;
  appearance?: GlassAppearance;
  refraction?: number;
  blur?: number;
  radius?: number | 'capsule' | 'circle';
  tint?: string;
  specular?: boolean;
  interactive?: boolean;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export interface LiquidGlassCardProps extends LiquidGlassSurfaceProps {
  tilt?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface LiquidGlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  material?: GlassMaterial;
  refraction?: number;
  radius?: number | 'capsule' | 'circle';
  tint?: string;
  glow?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LiquidGlassTabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export interface LiquidGlassSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  tint?: string;
  className?: string;
}

export interface LiquidGlassSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  tint?: string;
  className?: string;
}
