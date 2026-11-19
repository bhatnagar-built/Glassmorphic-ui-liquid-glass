import React from 'react';
import type { LiquidGlassButtonProps } from '../types';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  material = 'crystal',
  refraction,
  radius = 'capsule',
  tint,
  glow = false,
  disabled = false,
  active = false,
  className = '',
  style,
  onClick,
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '13px', minHeight: '32px' },
    default: { padding: '10px 22px', fontSize: '14px', minHeight: '42px' },
    lg: { padding: '14px 28px', fontSize: '16px', minHeight: '50px' },
    icon: { padding: '10px', width: '42px', height: '42px', justifyContent: 'center' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      color: '#ffffff',
      fontWeight: 600,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    },
    secondary: {
      color: 'inherit',
      fontWeight: 500,
    },
    ghost: {
      color: 'inherit',
      fontWeight: 400,
      background: 'transparent',
    },
    icon: {
      color: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <LiquidGlassSurface
      material={material}
      refraction={refraction}
      radius={radius}
      tint={tint}
      glow={glow}
      interactive={!disabled}
      className={`lg-button ${active ? 'lg-button-active' : ''} ${className}`}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onClick={disabled ? undefined : (onClick as any)}
    >
      {children}
    </LiquidGlassSurface>
  );
};
