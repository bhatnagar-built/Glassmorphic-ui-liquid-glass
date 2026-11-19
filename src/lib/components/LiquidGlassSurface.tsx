import React, { useMemo } from 'react';
import type { LiquidGlassSurfaceProps } from '../types';
import { useLiquidGlass } from './LiquidGlassScene';
import { resolveBorderRadius } from '../optics/squircles';
import {
  generateChromaticFilterId,
  generateRefractionFilterId,
} from '../optics/displacement';

export const LiquidGlassSurface: React.FC<LiquidGlassSurfaceProps> = ({
  children,
  material: propMaterial,
  appearance: propAppearance,
  refraction: propRefraction,
  blur: propBlur,
  radius,
  tint: propTint,
  specular: propSpecular,
  interactive = false,
  glow = false,
  className = '',
  style,
  onClick,
}) => {
  const scene = useLiquidGlass();

  const material = propMaterial ?? scene.material;
  const appearance = propAppearance ?? scene.appearance;
  const refraction = propRefraction ?? scene.optics.refraction;
  const blur = propBlur ?? scene.optics.blur;
  const tint = propTint ?? scene.optics.tint;
  const specular = propSpecular ?? scene.optics.specular;

  const borderRadius = resolveBorderRadius(radius);

  // Dynamic filter URL from SVG optics definitions
  const filterUrl = useMemo(() => {
    if (scene.optics.chromatic) {
      return `url(#${generateChromaticFilterId(scene.sceneId, refraction)})`;
    }
    if (refraction > 0) {
      return `url(#${generateRefractionFilterId(scene.sceneId, refraction)})`;
    }
    return undefined;
  }, [scene.sceneId, scene.optics.chromatic, refraction]);

  // Compute material background and backdrop-filter
  const materialStyles = useMemo(() => {
    const isDark = appearance === 'dark';

    switch (material) {
      case 'clear':
        return {
          background: tint || (isDark ? 'rgba(15, 23, 42, 0.28)' : 'rgba(255, 255, 255, 0.12)'),
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          boxShadow: isDark
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        };
      case 'frosted':
        return {
          background: tint || (isDark ? 'rgba(30, 41, 59, 0.65)' : 'rgba(255, 255, 255, 0.45)'),
          backdropFilter: `blur(${Math.max(blur, 28)}px) saturate(150%)`,
          WebkitBackdropFilter: `blur(${Math.max(blur, 28)}px) saturate(150%)`,
          boxShadow: isDark
            ? '0 12px 40px 0 rgba(0, 0, 0, 0.45)'
            : '0 12px 40px 0 rgba(0, 0, 0, 0.12)',
        };
      case 'crystal':
        return {
          background: tint || (isDark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(15, 23, 42, 0.4) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)'),
          backdropFilter: `blur(${blur}px) saturate(220%) contrast(110%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(220%) contrast(110%)`,
          boxShadow: isDark
            ? '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        };
      case 'obsidian':
        return {
          background: tint || (isDark ? 'rgba(3, 7, 18, 0.82)' : 'rgba(15, 23, 42, 0.7)'),
          backdropFilter: `blur(${Math.max(blur, 24)}px) brightness(90%)`,
          WebkitBackdropFilter: `blur(${Math.max(blur, 24)}px) brightness(90%)`,
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        };
      case 'regular':
      default:
        return {
          background: tint || (isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)'),
          backdropFilter: `blur(${blur}px) saturate(160%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(160%)`,
          boxShadow: isDark
            ? '0 10px 36px 0 rgba(0, 0, 0, 0.4)'
            : '0 10px 36px 0 rgba(0, 0, 0, 0.08)',
        };
    }
  }, [material, appearance, blur, tint]);

  return (
    <div
      onClick={onClick}
      className={`lg-surface ${interactive ? 'lg-surface-interactive' : ''} ${glow ? 'lg-surface-glow' : ''} ${className}`}
      style={{
        borderRadius,
        ...materialStyles,
        ...(filterUrl ? { filter: filterUrl } : {}),
        '--lg-specular-opacity': specular ? '0.7' : '0',
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
