// client/src/components/common/PremiumImage.tsx
// Composant d'image avec effet monochrome premium et transition vers la couleur au survol

import React, { useState } from 'react';

interface PremiumImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  filterIntensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: 'color' | 'lighten';
  priority?: boolean;
}

export const PremiumImage: React.FC<PremiumImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  filterIntensity = 'medium',
  hoverEffect = 'color',
  priority = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Définir les valeurs de filtre en fonction de l'intensité
  const getFilterValues = () => {
    switch(filterIntensity) {
      case 'light':
        return 'grayscale(70%) contrast(110%) brightness(105%)';
      case 'strong':
        return 'grayscale(100%) contrast(120%) brightness(90%)';
      case 'medium':
      default:
        return 'grayscale(90%) contrast(115%) brightness(100%)';
    }
  };
  
  // Définir le filtre au survol en fonction de l'effet choisi
  const getHoverFilter = () => {
    switch(hoverEffect) {
      case 'lighten':
        return 'grayscale(50%) contrast(110%) brightness(110%)';
      case 'color':
      default:
        return 'grayscale(0%) contrast(100%) brightness(100%)';
    }
  };
  
  // Construct loading attribute based on priority
  const loading = priority ? undefined : 'lazy';
  
  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        style={{
          filter: isHovered ? getHoverFilter() : getFilterValues(),
          transition: 'filter 0.7s cubic-bezier(0.2, 0, 0.2, 1)'
        }}
      />
    </div>
  );
};

// Variante pour les membres de l'équipe
export const PremiumTeamMemberImage: React.FC<{
  src: string;
  name: string;
  role: string;
  className?: string;
  filterIntensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: 'color' | 'lighten';
}> = ({ src, name, role, className, filterIntensity, hoverEffect }) => {
  return (
    <PremiumImage
      src={src}
      alt={`${name} - ${role} chez PY Partners`}
      width={450}
      height={600}
      className={className || "w-full h-full"}
      filterIntensity={filterIntensity}
      hoverEffect={hoverEffect}
    />
  );
};
