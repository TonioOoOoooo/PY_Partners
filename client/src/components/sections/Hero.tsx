import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import EnhancedPressSection from "@/components/sections/EnhancedPressSection";
import PremiumTestimonial from '@/components/common/PremiumTestimonial';


// Import images directly
import geometricImage from '@/assets/shutterstock_2421949253-768x1024.jpg';

interface EnhancedHeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

export default function EnhancedHero({ onDiscoverClick, onContactClick }: EnhancedHeroProps) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  
  // Handle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-white opacity-50" 
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23e0e0e0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
             backgroundSize: '20px 20px'
           }}
      />
      
      {/* Parallax image container */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          className="relative max-w-xl mx-auto z-10 opacity-80"
          style={{ 
            y: scrollY * 0.2,
            scale: 1 - scrollY * 0.0005,
          }}
        >
          <img 
            src={geometricImage} 
            alt="PY Partners - Design géométrique" 
            className="w-full h-auto premium-shadow rounded-sm opacity-60"
          />
        </motion.div>
      </div>
      
      {/* Content container */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/70 p-8 md:p-12 premium-shadow rounded-sm">
          {/* Logo and heading animation */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-gray-800 font-bold uppercase tracking-wide mb-1">
              PY PARTNERS
            </h1>
            <p className="text-gray-600 uppercase tracking-widest text-sm font-medium">PARIS</p>
          </motion.div>
          
          {/* Tagline with sequenced animation */}
          <motion.p 
            className="text-gray-700 text-lg md:text-xl italic mb-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.tagline')}
          </motion.p>
          
          {/* Description with sequenced animation */}
          <motion.p 
            className="text-gray-600 mb-12 max-w-2xl mx-auto font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.description')}
          </motion.p>
          
          {/* Buttons with animation */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={onDiscoverClick}
              className="premium-button inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-4 transition duration-300 text-center uppercase tracking-wide text-sm overflow-hidden relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
              <motion.span 
                className="absolute inset-0 bg-black"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
            
            <motion.button
              onClick={onContactClick}
              className="premium-button-outline inline-block bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-50 font-medium px-8 py-4 transition duration-300 text-center uppercase tracking-wide text-sm overflow-hidden relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
              <motion.span 
                className="absolute inset-0 bg-gray-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="animate-bounce mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}