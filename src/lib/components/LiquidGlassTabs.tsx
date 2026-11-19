import React from 'react';
import type { LiquidGlassTabsProps } from '../types';
import { LiquidGlassSurface } from './LiquidGlassSurface';

export const LiquidGlassTabs: React.FC<LiquidGlassTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <LiquidGlassSurface
      radius="capsule"
      material="regular"
      className={`lg-tabs inline-flex p-1 gap-1 items-center ${className}`}
      style={{
        display: 'inline-flex',
        padding: '4px',
        gap: '4px',
        borderRadius: '9999px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            style={{
              position: 'relative',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'inherit',
              opacity: isActive ? 1 : 0.75,
              background: isActive
                ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)'
                : 'transparent',
              boxShadow: isActive
                ? '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.6)'
                : 'none',
              border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
              backdropFilter: isActive ? 'blur(16px)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              outline: 'none',
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </LiquidGlassSurface>
  );
};
