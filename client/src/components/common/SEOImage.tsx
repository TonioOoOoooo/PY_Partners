// client/src/components/common/SEOImage.tsx
// This is a reusable component for SEO-optimized images

import React from 'react';

interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // For above-the-fold images that should load immediately
}

export const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}) => {
  // Construct loading attribute based on priority
  const loading = priority ? undefined : 'lazy';
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      // Add decoding async for performance improvements
      decoding="async"
      // Define size dimensions to prevent layout shifts
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    />
  );
};

// Usage examples:

// For team member images in About section
export const TeamMemberImage: React.FC<{
  src: string;
  name: string;
  role: string;
  className?: string;
}> = ({ src, name, role, className }) => {
  return (
    <SEOImage
      src={src}
      // Descriptive alt text including name and role for better accessibility and SEO
      alt={`${name} - ${role} chez PY Partners`}
      width={450}
      height={600}
      className={className || "w-full h-full object-cover"}
    />
  );
};

// For logo with high priority (loads immediately)
export const LogoImage: React.FC<{
  src: string;
  className?: string;
}> = ({ src, className }) => {
  return (
    <SEOImage
      src={src}
      alt="PY Partners - Cabinet d'avocats en droit social"
      // Ne pas spécifier de dimensions fixes ici
      className={className || "h-auto"}
      priority={true}
    />
  );
};

