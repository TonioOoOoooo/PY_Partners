import React, { useEffect, useState, useRef } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

/**
 * Crée un effet de curseur premium qui suit le mouvement de la souris avec un délai élégant
 * Version améliorée avec effets d'inertie et transition plus fluide
 */
export function usePremiumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Valeurs de motion pour une animation plus fluide avec inertie
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Valeurs transformées pour le suivi retardé (effet trailing)
  const followerX = useTransform(cursorX, val => val);
  const followerY = useTransform(cursorY, val => val);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Mise à jour de la position pour l'animation Framer Motion
      const setX = e.clientX;
      const setY = e.clientY;
      
      // Animation fluide vers la nouvelle position
      animate(cursorX, setX, {
        type: "spring",
        damping: 20,
        stiffness: 250,
        mass: 0.15
      });
      
      animate(cursorY, setY, {
        type: "spring",
        damping: 20,
        stiffness: 250,
        mass: 0.15
      });
      
      // Mise à jour immédiate pour les éléments non animés
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleLinkHoverStart = (e: MouseEvent) => {
      // Vérifier si l'élément est un lien, bouton ou élément interactif
      const target = e.target as HTMLElement;
      const isLink = target && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.dataset.interactive === 'true' ||
        target.getAttribute('role') === 'button'
      );
      
      if (isLink) {
        setLinkHovered(true);
        
        // Effet de "magnetic pull" vers les liens (optionnel)
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Force légère d'attraction vers le centre de l'élément
        const pullX = centerX + (e.clientX - centerX) * 0.8;
        const pullY = centerY + (e.clientY - centerY) * 0.8;
        
        animate(cursorX, pullX, { 
          type: "spring", 
          damping: 15, 
          stiffness: 200 
        });
        
        animate(cursorY, pullY, { 
          type: "spring", 
          damping: 15, 
          stiffness: 200 
        });
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
  }, [cursorX, cursorY]);

  // Composant de curseur amélioré avec deux éléments et animations fluides
  const CursorComponent = () => (
    <div className="cursor-container" style={{ position: 'relative' }}>
      {/* Curseur principal */}
      <motion.div 
          className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%"
          }}
        >
          <motion.div 
            className={`
              flex items-center justify-center rounded-full transition-all duration-200
              ${linkHovered ? 'w-12 h-12 border border-white mix-blend-difference' : 'w-5 h-5 bg-white mix-blend-difference'}
              ${clicked ? 'scale-90' : 'scale-100'}
            `}
            animate={{
              scale: clicked ? 0.9 : linkHovered ? 1.2 : 1,
              opacity: linkHovered ? 0.8 : 1
            }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
        
        {/* Curseur secondaire (trailing effect) */}
        <motion.div 
          className="fixed pointer-events-none z-40 w-2 h-2 rounded-full bg-white mix-blend-difference opacity-75"
          style={{
            x: followerX,
            y: followerY,
            translateX: "-50%",
            translateY: "-50%"
          }}
          animate={{
            opacity: hidden ? 0 : linkHovered ? 0 : 0.75,
            scale: clicked ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
        />
    </div>
  );
  
  // Retourner à la fois les valeurs et le composant
  return { position, cursorX, cursorY, CursorComponent };
}

/**
 * Animation de compteur avec un aspect premium pour les nombres
 * Version améliorée avec formattage et options supplémentaires
 */
export function useCountAnimation(
  value: number,
  {
    duration = 2,
    delay = 0,
    formatter = (val: number) => Math.round(val).toLocaleString(),
    easing = [0.16, 1, 0.3, 1]  // Courbe d'accélération cubique améliorée
  } = {}
) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => formatter(latest));
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Animation instantanée au premier rendu pour éviter les compteurs commençant à zéro
    if (isFirstRun.current) {
      isFirstRun.current = false;
      
      if (delay === 0) {
        motionValue.set(value);
        return;
      }
    }

    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: easing,
      onComplete: () => {}
    });

    return controls.stop;
  }, [value, motionValue, duration, delay, easing]);

  return rounded;
}

/**
 * Hook pour les animations de défilement premium
 * Version améliorée avec valeurs intermédiaires et détection de direction
 */
export function usePremiumScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollTime = useRef(Date.now());
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollValues = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calculer la vitesse de défilement (pixels par milliseconde)
      if (timeDelta > 0) {
        setScrollSpeed(scrollDelta / timeDelta);
      }
      
      // Déterminer la direction du défilement
      if (currentScrollY > previousScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection('up');
      }
      
      // Mettre à jour les valeurs
      setPreviousScrollY(scrollY);
      setScrollY(currentScrollY);
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.body.scrollHeight);
      setScrollProgress(currentScrollY / (document.body.scrollHeight - window.innerHeight) || 0);
      
      // Sauvegarder pour le prochain calcul
      lastScrollTime.current = currentTime;
      lastScrollY.current = currentScrollY;
    };

    // Initialisation
    updateScrollValues();

    // Écouteurs d'événements
    window.addEventListener('scroll', updateScrollValues, { passive: true });
    window.addEventListener('resize', updateScrollValues, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollValues);
      window.removeEventListener('resize', updateScrollValues);
    };
  }, [scrollY, previousScrollY]);

  return {
    scrollY,
    previousScrollY,
    viewportHeight,
    documentHeight,
    scrollProgress,
    scrollDirection,
    scrollSpeed,
    isScrolling: scrollSpeed > 0
  };
}

/**
 * Hook pour effet de parallaxe premium avec options avancées
 */
export function usePremiumParallax(
  speed: number = 0.5,
  {
    reverse = false,
    easing = false,
    clamp = false,
    startOffset = 0,
    vertical = true,
    horizontal = false
  } = {}
) {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      let newOffset = window.pageYOffset;
      
      // Appliquer le offset de départ
      newOffset = Math.max(0, newOffset - startOffset);
      
      // Easing: rendre le mouvement non-linéaire
      if (easing) {
        newOffset = Math.pow(newOffset * 0.01, 1.25) * 100; 
      }
      
      // Clamp: limiter l'amplitude de l'effet
      if (clamp) {
        const maxParallax = 300; // valeur arbitraire
        newOffset = Math.min(newOffset, maxParallax);
      }
      
      setOffset(newOffset);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startOffset, easing, clamp]);
  
  const multiplier = reverse ? -speed : speed;
  
  return {
    y: vertical ? offset * multiplier : 0,
    x: horizontal ? offset * multiplier : 0,
    offset
  };
}

/**
 * Effet de dévoilement progressif pour texte avec animation lettre par lettre
 */
export function TextRevealEffect({ 
  text, 
  className = "", 
  delay = 0.1, 
  staggerDelay = 0.03,
  ease = [0.2, 0.65, 0.3, 0.9]
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: ease
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Effet de texte qui s'écrit progressivement
 */
export function TypewriterEffect({ 
  text, 
  className = "", 
  speed = 40,
  delay = 0.5,
  cursor = true
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const index = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Réinitialiser l'état au changement de texte
    setDisplayText('');
    index.current = 0;
    setShowCursor(cursor);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Délai initial avant de commencer à "taper"
    const startTimeout = setTimeout(() => {
      const typeNextChar = () => {
        if (index.current < text.length) {
          setDisplayText(prev => prev + text.charAt(index.current));
          index.current++;
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          // Effet de fin: on garde ou cache le curseur
          if (cursor) {
            setTimeout(() => {
              setShowCursor(false);
            }, 1500);
          }
        }
      };
      
      typeNextChar();
    }, delay * 1000);
    
    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, cursor]);
  
  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-[1px] -mr-[1px]"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

/**
 * Effet de dévoilement progressif des sections lors du défilement
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Une fois visible, on arrête d'observer
        }
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);
  
  return { ref, isVisible };
}

/**
 * Animation d'apparition progressive en grille (pour les listes, galeries, etc.)
 */
export function StaggerGrid({ children, className = "", delay = 0.1, stagger = 0.05 }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, child => (
        <motion.div
          variants={item}
          className="stagger-item"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}