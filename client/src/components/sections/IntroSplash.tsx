import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface IntroSplashProps {
  onEnter: () => void;
}

export default function IntroSplash({ onEnter }: IntroSplashProps) {
  // Utilise la langue détectée automatiquement via le store zustand (voir i18n.ts)
  const { language, toggleLanguage } = useLanguage();
  // Image source: à remplacer par l'URL finale ou import local
  const imageUrl = '/img/shutterstock_2421949253-768x1024.jpg'; // À personnaliser

  return (
    <>
      {/* Sélecteur de langue en haut à droite */}
      <div className="absolute top-6 right-8 z-50">
        <button
          className="px-3 py-1 text-xs tracking-wide uppercase border border-secondary rounded-none bg-white text-primary hover:bg-secondary/10 transition duration-200"
          onClick={toggleLanguage}
        >
          {language === 'fr' ? 'FR' : 'EN'}
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white min-h-screen px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-black text-center mb-1 uppercase font-heading">PY PARTNERS</h1>
          <div className="text-sm md:text-base text-black/70 tracking-widest mb-8 text-center uppercase">PARIS</div>
          <div className="w-full aspect-square overflow-hidden rounded-md shadow-lg mb-8 bg-gray-100 flex items-center justify-center">
            <img 
              src={imageUrl}
              alt="Architecture graphique premium"
              className="object-cover w-full h-full"
              loading="eager"
              draggable="false"
              style={{ userSelect: 'none' }}
            />
          </div>
          <div className="italic text-base md:text-lg text-black text-center font-medium mb-10 mt-2">
            We master the details. <span className="font-semibold">So, you don’t have to.</span>
          </div>
          <motion.button
            className="mt-2 px-8 py-4 bg-black text-white rounded-full shadow-lg text-lg tracking-wide font-semibold uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition hover:bg-gray-900"
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
