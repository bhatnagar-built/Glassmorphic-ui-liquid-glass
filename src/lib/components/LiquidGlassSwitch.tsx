import React from 'react';
import type { LiquidGlassSwitchProps } from '../types';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export const LiquidGlassSwitch: React.FC<LiquidGlassSwitchProps> = ({
  checked,
  onChange,
  label,
  tint,
  className = '',
}) => {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}>
      <div
        onClick={() => onChange(!checked)}
        className={`lg-switch-track relative w-14 h-8 rounded-full transition-colors ${
          checked ? 'lg-switch-active' : ''
        }`}
        style={{
          background: checked
            ? (tint || 'linear-gradient(135deg, rgba(56, 189, 248, 0.8) 0%, rgba(129, 140, 248, 0.8) 100%)')
            : 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: checked ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none',
        }}
      >
        <LiquidGlassSurface
          radius="circle"
          material="crystal"
          interactive={true}
          className="lg-switch-thumb absolute top-1 left-1 w-6 h-6 rounded-full transition-transform"
          style={{
            transform: checked ? 'translateX(24px)' : 'translateX(0)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
          }}
        />
      </div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </label>
  );
};
