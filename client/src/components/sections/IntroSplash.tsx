import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import logoImage from '@/assets/py-partners-logo.png'; // <<=== IMPORTER LE LOGO PNG

interface IntroSplashProps {
  onEnter: () => void;
}

export default function IntroSplash({ onEnter }: IntroSplashProps) {
  const { language, toggleLanguage } = useLanguage();
  const imageUrl = '/img/shutterstock_2421949253-768x1024.jpg'; // Chemin vers l'image d'arrière-plan

  return (
    <>
      {/* Sélecteur de langue */}
      <div className="absolute top-6 right-8 z-50">
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white min-h-screen px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="w-full max-w-lg mx-auto flex flex-col items-center">

            {/* === REMPLACÉ : Logo PNG === */}
            <img
              src={logoImage} // Utilise le logo PNG importé
              alt="PY Partners Logo" // Texte alternatif (peut être plus descriptif si souhaité)
              className="mx-auto mb-8 h-auto w-full max-w-[300px] md:max-w-[350px]" // Ajustez max-w-* pour la taille
            />
            {/* === FIN REMPLACEMENT === */}

            {/* Image principale */}
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

            {/* Texte "We master..." (les styles de police non chargés n'auront pas l'effet exact) */}
            <div className="italic text-base md:text-lg text-black text-center font-medium mb-10 mt-2">
              We master the details. <span className="font-semibold">So, you don’t have to.</span>
            </div>

            {/* Bouton Entrer */}
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