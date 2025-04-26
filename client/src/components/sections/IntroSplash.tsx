import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import logoImage from '@/assets/py-partners-logo.png';

interface IntroSplashProps {
  onEnter: () => void;
}

export default function IntroSplash({ onEnter }: IntroSplashProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [viewportHeight, setViewportHeight] = useState("100vh");
  const imageUrl = '/img/shutterstock_2421949253-768x1024.jpg'; // Utiliser la même image que dans Hero

  // Fix pour les problèmes de viewport sur iOS Safari
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
        style={{ height: viewportHeight }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Motif de fond subtil */}
        <div className="absolute inset-0 bg-white"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23e0e0e0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Layout responsive */}
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          {/* Côté gauche (logo et tagline) */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={logoImage}
                alt="PY Partners Logo"
                className="mx-auto md:mx-0 h-auto w-full max-w-[280px] md:max-w-[380px]"
              />
            </motion.div>
            
            <motion.p
              className="italic text-base md:text-lg text-black font-light mt-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We master the details. So, you don't have to.
            </motion.p>
            
            {/* Description visible uniquement sur desktop */}
            <motion.p
              className="hidden md:block text-gray-700 text-base mt-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Cabinet d'avocats spécialisé en droit social aux côtés des Entreprises et Dirigeants.
            </motion.p>
          </div>
          
          {/* Côté droit (image géométrique) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <motion.div 
              className="relative rounded-md overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ width: '100%', maxWidth: '450px', aspectRatio: '3/4' }}
            >
              <img
                src={imageUrl}
                alt="Architecture graphique premium"
                className="object-cover w-full h-full"
                loading="eager"
                draggable="false"
                style={{ userSelect: 'none' }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Bouton d'entrée */}
        <motion.div
          className="absolute bottom-10 w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-medium uppercase tracking-wide text-sm overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            aria-label={language === 'fr' ? 'Entrer sur le site' : 'Enter the site'}
          >
            <span className="relative z-10">
              {language === 'fr' ? 'Entrer sur le site' : 'Enter the site'}
            </span>
            <motion.span 
              className="absolute inset-0 bg-black" 
              initial={{ x: '-100%' }} 
              whileHover={{ x: 0 }} 
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </motion.div>
        
        {/* Sélecteur de langue */}
        <div className="absolute top-6 right-6 z-50">
          <button
            className="px-3 py-1 text-xs tracking-wide uppercase border border-gray-800 rounded-none hover:bg-gray-100 transition duration-200"
            onClick={toggleLanguage}
          >
            {language === 'fr' ? 'FR' : 'EN'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}