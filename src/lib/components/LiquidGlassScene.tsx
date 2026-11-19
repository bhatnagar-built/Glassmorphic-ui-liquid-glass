import React, { createContext, useContext, useState, useId, useMemo } from 'react';
import type { LiquidGlassContextValue, LiquidGlassSceneProps } from '../types';
import { createSvgFilterDefs } from '../optics/displacement';

const LiquidGlassContext = createContext<LiquidGlassContextValue | null>(null);

export function useLiquidGlass(): LiquidGlassContextValue {
  const context = useContext(LiquidGlassContext);
  if (!context) {
    throw new Error('useLiquidGlass must be used within a LiquidGlassScene');
  }
  return context;
}

export const LiquidGlassScene: React.FC<LiquidGlassSceneProps> = ({
  children,
  appearance = 'light',
  material = 'regular',
  refraction = 35,
  blur = 20,
  specular = true,
  chromatic = false,
  tint,
  className = '',
  style,
}) => {
  const rawId = useId().replace(/:/g, '');
  const sceneId = `lg-${rawId}`;
  const [lightAngle, setLightAngle] = useState({ x: 30, y: 20 });

  const optics = useMemo(
    () => ({
      refraction,
      blur,
      specular,
      specularIntensity: specular ? 0.8 : 0,
      chromatic,
      tint,
    }),
    [refraction, blur, specular, chromatic, tint]
  );

  const contextValue = useMemo<LiquidGlassContextValue>(
    () => ({
      appearance,
      material,
      optics,
      lightAngle,
      updateLightAngle: (x, y) => setLightAngle({ x, y }),
      sceneId,
    }),
    [appearance, material, optics, lightAngle, sceneId]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!specular) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLightAngle({ x, y });
  };

  return (
    <LiquidGlassContext.Provider value={contextValue}>
      <div
        className={`lg-scene-container ${className}`}
        data-lg-appearance={appearance}
        onPointerMove={handlePointerMove}
        style={{
          '--lg-pointer-x': `${lightAngle.x}%`,
          '--lg-pointer-y': `${lightAngle.y}%`,
          '--lg-light-dir': `${Math.atan2(lightAngle.y - 50, lightAngle.x - 50) * (180 / Math.PI) + 90}deg`,
          ...style,
        } as React.CSSProperties}
      >
        {/* Render procedural SVG optics filter definitions */}
        <div
          dangerouslySetInnerHTML={{
            __html: createSvgFilterDefs(sceneId, refraction),
          }}
        />
        {children}
      </div>
    </LiquidGlassContext.Provider>
  );
};
