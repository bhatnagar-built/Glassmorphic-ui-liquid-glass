import React, { useRef } from 'react';
import type { LiquidGlassSliderProps } from '../types';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export const LiquidGlassSlider: React.FC<LiquidGlassSliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  tint,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    updateValue(e.clientX);
    const onMove = (moveEvent: PointerEvent) => updateValue(moveEvent.clientX);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const rawVal = min + (clampedX / rect.width) * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;
    onChange(Math.min(max, Math.max(min, steppedVal)));
  };

  return (
    <div className={`lg-slider-group w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-semibold mb-2 opacity-85">
          <span>{label}</span>
          <span className="font-mono">{value}</span>
        </div>
      )}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="lg-slider-track relative h-3 rounded-full cursor-pointer select-none"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        {/* Active Fill Track */}
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{
            width: `${percentage}%`,
            background: tint || 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
          }}
        />
        {/* Liquid Glass Thumb */}
        <LiquidGlassSurface
          radius="circle"
          material="crystal"
          interactive={true}
          className="lg-slider-thumb absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{
            left: `${percentage}%`,
            width: '24px',
            height: '24px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    </div>
  );
};
