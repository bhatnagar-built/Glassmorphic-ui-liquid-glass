import React from 'react';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export interface LiquidGlassToolbarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidGlassToolbar: React.FC<LiquidGlassToolbarProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <LiquidGlassSurface
      radius="capsule"
      material="crystal"
      interactive={false}
      className={`lg-toolbar ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backdropFilter: 'blur(28px) saturate(190%)',
        ...style,
      }}
    >
      {children}
    </LiquidGlassSurface>
  );
};
