import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import logoImage from '@/assets/py-partners-logo.png';

interface IntroSplashProps {
  onEnter: () => void;
}

export default function IntroSplash({ onEnter }: IntroSplashProps) {
  const { language, toggleLanguage } = useLanguage();
  const imageUrl = '/img/shutterstock_2421949253-768x1024.jpg';
  const [viewportHeight, setViewportHeight] = useState("100vh");

  // Fix for iOS Safari viewport height issues
  useEffect(() => {
    const updateHeight = () => {
      // Use the actual visible viewport height
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    // Set initial height
    updateHeight();
    
    // Update on resize or orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return (
    <>
      {/* Sélecteur de langue */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-50">
        <button
          className="px-3 py-1 text-xs tracking-wide uppercase border border-secondary rounded-none bg-white text-primary hover:bg-secondary/10 transition duration-200"
          onClick={toggleLanguage}
        >
          {language === 'fr' ? 'FR' : 'EN'}
        </button>
      </div>

      {/* Écran d'intro */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white px-4 py-8 overflow-y-auto"
          style={{ height: viewportHeight }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="w-full"></div> {/* Spacer for top */}
          
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Logo PNG */}
            <img
              src={logoImage}
              alt="PY Partners Logo"
              className="mx-auto mb-6 h-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px]"
            />

            {/* Image principale - réduite encore davantage pour les iPhone */}
            <div className="w-full max-w-xs overflow-hidden rounded-md shadow-lg mb-5 bg-gray-100 flex items-center justify-center aspect-square">
              <img
                src={imageUrl}
                alt="Architecture graphique premium"
                className="object-cover w-full h-full"
                loading="eager"
                draggable="false"
                style={{ userSelect: 'none' }}
              />
            </div>

            {/* Texte "We master..." */}
            <div className="italic text-base md:text-lg text-black text-center font-light mb-6">
              We master the details. So, you don't have to.
            </div>
          </div>
          
          {/* Bouton placé en bas de l'écran pour assurer sa visibilité et accessibilité */}
          <div className="w-full flex justify-center mb-4 mt-2">
            <motion.button
              className="w-[90%] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-black text-white rounded-full shadow-lg text-base sm:text-lg tracking-wide font-medium uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition hover:bg-gray-900"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnter}
              aria-label="Entrer sur le site"
            >
              Entrer sur le site
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}