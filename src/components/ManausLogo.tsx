import React from 'react';

interface ManausLogoProps {
  variant?: 'white' | 'color';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  useFullBanner?: boolean;
}

export const ManausLogo: React.FC<ManausLogoProps> = ({
  variant = 'white',
  size = 'md',
  className = '',
}) => {
  const isWhite = variant === 'white';

  // Height scaling - calibrated for optimal visibility and legibility of SIGEON logo & subtitle
  const logoHeights = {
    sm: 'h-10 sm:h-12',
    md: 'h-16 sm:h-[72px]',
    lg: 'h-20 sm:h-24',
  }[size];

  // Use the exact new official SIGEON logo uploaded by the user
  const logoSrc = isWhite 
    ? '/assets/aistudio/sigeon_logo_white.png'
    : '/assets/aistudio/sigeon_logo_transparent.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="SIGEON - Sistema Integrado de Gestão Educacional"
        className={`${logoHeights} w-auto object-contain transition-transform duration-200 hover:scale-102 ${
          isWhite
            ? 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] brightness-105 contrast-105'
            : 'drop-shadow-xs'
        }`}
      />
    </div>
  );
};
