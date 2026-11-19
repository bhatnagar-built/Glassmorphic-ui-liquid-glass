import React, { useRef, useState } from 'react';
import type { LiquidGlassCardProps } from '../types';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  header,
  footer,
  tilt = false,
  className = '',
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate subtle tilt angle (-8deg to +8deg)
    const rotateY = (x / (rect.width / 2)) * 8;
    const rotateX = -(y / (rect.height / 2)) * 8;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    if (!tilt) return;
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective: tilt ? 1000 : undefined,
        display: 'inline-block',
        width: '100%',
      }}
    >
      <LiquidGlassSurface
        className={`lg-card ${className}`}
        style={{
          transform: tilt
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : undefined,
          transition: tilt ? 'transform 0.15s ease-out' : undefined,
          transformStyle: tilt ? 'preserve-3d' : undefined,
          ...style,
        }}
        {...props}
      >
        {header && <div className="lg-card-header mb-4">{header}</div>}
        <div className="lg-card-body">{children}</div>
        {footer && <div className="lg-card-footer mt-4 pt-4 border-t border-white/10">{footer}</div>}
      </LiquidGlassSurface>
    </div>
  );
};
