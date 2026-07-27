'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: 'blue' | 'purple' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glow = 'none',
  onClick,
}) => {
  const glowClasses = {
    blue: 'glow-blue border-blue-500/30',
    purple: 'glow-purple border-purple-500/30',
    none: '',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card p-6 ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''} ${
        glowClasses[glow]
      } ${className}`}
    >
      {children}
    </div>
  );
};
