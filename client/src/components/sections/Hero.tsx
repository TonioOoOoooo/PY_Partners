import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { usePremiumParallax, TextRevealEffect } from '@/utils/animation-utils';
import logoImage from '@/assets/py-partners-logo.png';
import geometricImage from '@/assets/shutterstock_2421949253-768x1024.jpg';
import { useRef } from 'react';

interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for enhanced depth
  const bgParallax = usePremiumParallax(0.05);
  const decorParallax = usePremiumParallax(0.1);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  
  // Enhanced staggered animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  return (
    <section 
      ref={containerRef}
      id="accueil" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle pattern background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[#f8f8f8] opacity-90"
        style={{ y: bgParallax.y }}
      />
      
      {/* Grid overlay with refined dimensions */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '35px 35px'
        }}
      />
      
      {/* Abstract geometric shapes - Hidden on mobile */}
      <motion.div
        className="absolute -right-16 -top-16 w-64 h-64 rotate-45 border border-black/5 hidden lg:block"
        style={{ y: decorParallax.y, rotate: '-15deg' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      
      <motion.div
        className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full border border-black/5 hidden lg:block"
        style={{ y: decorParallax.y * -1, x: decorParallax.y * -0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />

      <div className="container relative mx-auto px-6 lg:px-16 z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
        {/* Left content column */}
        <motion.div 
          className="w-full lg:w-1/2 lg:py-24 flex flex-col lg:items-start items-center text-center lg:text-left"
          style={{ y: textY }}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemAnimation}
            className="mb-10"
          >
            <div className="relative">
              <img
                src={logoImage}
                alt="PY Partners Logo"
                className="h-auto w-full max-w-[300px] lg:max-w-[380px]"
              />
              <div className="absolute -bottom-1 left-0 w-20 h-px bg-gray-800 opacity-20"></div>
            </div>
          </motion.div>
          
          <motion.p
            variants={itemAnimation}
            className="text-gray-700 text-base md:text-xl lg:text-2xl italic font-light mb-8 max-w-md premium-tagline"
          >
            {t('hero.tagline')}
          </motion.p>
          
          <motion.h2
            variants={itemAnimation}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-12 leading-tight max-w-lg tracking-[-0.02em]"
          >
            <span>
              {t('hero.description').replace(/^\s+/g, '')}
            </span>
          </motion.h2>
          
          <motion.div
            variants={itemAnimation}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button
              onClick={onDiscoverClick}
              className="group px-8 py-4 bg-gray-900 text-white font-medium uppercase tracking-wide text-sm relative overflow-hidden hover:bg-gray-800 transition-colors duration-500 btn-premium"
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
            </button>
            
            <button
              onClick={onContactClick}
              className="group px-8 py-4 bg-transparent border border-gray-800 text-gray-800 font-medium uppercase tracking-wide text-sm relative overflow-hidden hover:bg-gray-50 btn-premium"
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Right image column with simplified structure to avoid white borders */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
          style={{ 
            scale: imageScale,
            opacity: imageOpacity
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full max-w-[600px]">
            {/* Image principale sans décorations qui pourraient causer des bordures blanches */}
            <img
              src={geometricImage}
              alt="PY Partners - Design géométrique"
              className="w-full h-auto object-cover shadow-lg"
              style={{ aspectRatio: '3/4' }}
            />
            
            {/* Overlay pour un meilleur contraste visuel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent mix-blend-overlay pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Indicateur de défilement */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 nav-link-premium">
            {t('common.discover')}
          </span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative"
          >
            {/* Flèche avec effet hover */}
            <svg className="w-6 h-6 text-gray-400 hover:text-gray-700 transition-colors duration-300" 
                 fill="none" strokeLinecap="round" strokeLinejoin="round" 
                 strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            {/* Indicateur d'animation subtil */}
            <motion.div 
              className="absolute -inset-4 border border-gray-200 rounded-full opacity-0"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0, 0.2, 0] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}