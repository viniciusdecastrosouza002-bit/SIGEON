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

  // Height scaling
  const logoHeights = {
    sm: 'h-11 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-20',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Prefeitura de Manaus image attached by user */}
      <img
        src="/assets/aistudio/image_205f329d.png"
        alt="Prefeitura de Manaus - Gente que trabalha"
        className={`${logoHeights} w-auto object-contain transition-transform duration-200 hover:scale-102 ${
          isWhite
            ? 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] brightness-105 contrast-105'
            : 'drop-shadow-xs'
        }`}
      />
    </div>
  );
};
