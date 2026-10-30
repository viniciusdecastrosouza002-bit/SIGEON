import React from 'react';

interface ManausLogoProps {
  variant?: 'white' | 'color' | 'semed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const ManausLogo: React.FC<ManausLogoProps> = ({
  variant = 'white',
  size = 'md',
  className = '',
}) => {
  // Calibrated dimensions: "visível mas não tão grande" (clearly readable text without bloating vertical space)
  const logoHeights = {
    sm: 'h-8 sm:h-9 max-h-9',
    md: 'h-12 sm:h-14 max-h-14',
    lg: 'h-16 sm:h-18 max-h-18',
  }[size];

  if (variant === 'semed') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/assets/aistudio/001_c3939209.png"
          alt="Semed - Prefeitura de Manaus"
          className={`${logoHeights} w-auto object-contain`}
        />
      </div>
    );
  }

  const isWhite = variant === 'white';
  const logoSrc = isWhite 
    ? '/assets/aistudio/sigeon_logo_white.png'
    : '/assets/aistudio/sigeon_logo_transparent.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="SIGEON - Sistema Integrado de Gestão Educacional"
        className={`${logoHeights} w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${
          isWhite
            ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
            : 'drop-shadow-xs'
        }`}
      />
    </div>
  );
};
