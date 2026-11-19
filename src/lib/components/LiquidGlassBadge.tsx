import React from 'react';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export interface LiquidGlassBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export const LiquidGlassBadge: React.FC<LiquidGlassBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const tints: Record<string, string> = {
    default: 'rgba(255, 255, 255, 0.18)',
    success: 'rgba(34, 197, 94, 0.25)',
    warning: 'rgba(245, 158, 11, 0.25)',
    info: 'rgba(56, 189, 248, 0.25)',
  };

  return (
    <LiquidGlassSurface
      radius="capsule"
      material="frosted"
      tint={tints[variant]}
      className={`lg-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </LiquidGlassSurface>
  );
};
