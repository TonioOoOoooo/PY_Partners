import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import logoImage from '@/assets/py-partners-logo.png';

interface IntroSplashProps {
  onEnter: () => void;
}

export default function IntroSplash({ onEnter }: IntroSplashProps) {
  const { language, toggleLanguage } = useLanguage();
  const imageUrl = '/img/shutterstock_2421949253-768x1024.jpg';

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white min-h-screen px-4 py-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Logo PNG */}
            <img
              src={logoImage}
              alt="PY Partners Logo"
              className="mx-auto mb-6 h-auto w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px]"
            />

            {/* Image principale - réduite pour mieux s'adapter aux petits écrans */}
            <div className="w-full max-w-sm overflow-hidden rounded-md shadow-lg mb-6 bg-gray-100 flex items-center justify-center aspect-square">
              <img
                src={imageUrl}
                alt="Architecture graphique premium"
                className="object-cover w-full h-full"
                loading="eager"
                draggable="false"
                style={{ userSelect: 'none' }}
              />
            </div>

            {/* Texte "We master..." CORRIGÉ: pas de gras sur la deuxième partie */}
            <div className="italic text-base md:text-lg text-black text-center font-light mb-8 mt-2">
              We master the details. So, you don't have to.
            </div>

            {/* Bouton Entrer - ajusté pour être plus accessible sur mobile */}
            <motion.button
              className="w-full sm:w-auto mt-2 px-6 py-3 sm:px-8 sm:py-4 bg-black text-white rounded-full shadow-lg text-base sm:text-lg tracking-wide font-medium uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition hover:bg-gray-900"
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