import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

/**
 * Crée un effet de curseur premium qui suit le mouvement de la souris avec un délai élégant
 */
export function usePremiumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleLinkHoverStart = (e: MouseEvent) => {
      // Vérifier si l'élément est un lien ou un bouton
      const isLink = e.target && (
        (e.target as HTMLElement).tagName === 'A' || 
        (e.target as HTMLElement).tagName === 'BUTTON' ||
        (e.target as HTMLElement).closest('a') || 
        (e.target as HTMLElement).closest('button')
      );
      
      if (isLink) {
        setLinkHovered(true);
      }
    };

    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleLinkHoverStart);
    document.addEventListener("mouseout", handleLinkHoverEnd);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleLinkHoverStart);
      document.removeEventListener("mouseout", handleLinkHoverEnd);
    };
  }, []);

  // Le composant de curseur peut être rendu dans la page principale
  const CursorComponent = () => (
    <div 
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div 
        className={`
          relative -ml-2 -mt-2 flex items-center justify-center transition-all duration-200
          ${linkHovered ? 'w-8 h-8 -ml-4 -mt-4' : 'w-4 h-4'}
          ${clicked ? 'scale-90' : 'scale-100'}
        `}
      >
        <div 
          className={`
            absolute inset-0 rounded-full bg-white
            ${linkHovered ? 'opacity-80' : 'opacity-100'}
            transition-all duration-200
          `}
        ></div>
      </div>
    </div>
  );

  return { CursorComponent };
}

/**
 * Animation de compteur avec un aspect premium pour les nombres
 */
export function useCountAnimation(
  value: number,
  duration: number = 2,
  delay: number = 0
) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {}
    });

    return controls.stop;
  }, [value, motionValue, duration, delay]);

  return rounded;
}

/**
 * Hook pour les animations de défilement premium
 */
export function usePremiumScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollValues = () => {
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.body.scrollHeight);
      setScrollProgress(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };

    // Initialisation
    updateScrollValues();

    // Écouteurs d'événements
    window.addEventListener('scroll', updateScrollValues);
    window.addEventListener('resize', updateScrollValues);

    return () => {
      window.removeEventListener('scroll', updateScrollValues);
      window.removeEventListener('resize', updateScrollValues);
    };
  }, []);

  return {
    scrollY,
    viewportHeight,
    documentHeight,
    scrollProgress
  };
}

/**
 * Hook pour effet de parallaxe premium
 */
export function usePremiumParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return {
    y: offset * speed,
    offset
  };
}

/**
 * Effet de dévoilement progressif pour texte avec animation lettre par lettre
 */
export function TextRevealEffect({ text, className = "", delay = 0.1, staggerDelay = 0.03 }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}