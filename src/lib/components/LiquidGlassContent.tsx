import React from 'react';

export interface LiquidGlassContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidGlassContent: React.FC<LiquidGlassContentProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`lg-scene-content ${className}`} style={style}>
      {children}
    </div>
  );
};
