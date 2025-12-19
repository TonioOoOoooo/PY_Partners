import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { usePremiumParallax, TextRevealEffect } from '@/utils/animation-utils';
import logoImage from '@/assets/py-partners-logo.png';
import geometricImage from '@/assets/shutterstock_2421949253-768x1024.jpg';
import { useRef } from 'react';
import { PremiumImage } from '@/components/common/PremiumImage';

interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  const { t, language } = useLanguage();
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
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -30]); // Consider if this is desired on mobile

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
      // Option 1: Adjust min-height and add padding directly to section
      // className="relative flex items-center overflow-hidden min-h-[85vh] md:min-h-screen py-16 md:py-20 lg:py-0"
      // Option 2: Keep min-h-screen but control padding inside the container (often better)
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle pattern background with parallax */}
      <motion.div
        className="absolute inset-0 bg-[#f8f8f8] opacity-90"
        style={{ y: bgParallax.y }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '35px 35px' // Consider making this smaller on mobile if needed: '25px 25px'
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

      {/* Main Content Container */}
      {/* Added py-16 lg:py-0 for vertical padding on mobile/tablet */}
      {/* Changed gap-16 to gap-10 lg:gap-16 for less vertical space on mobile */}
      <div className="container relative mx-auto px-6 lg:px-16 z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 py-20 lg:py-0">

        {/* Left content column */}
        <motion.div
          // Removed lg:py-24 as padding is handled by container now
          // Added explicit width control: w-full lg:w-1/2
          // Modified to center content on all screen sizes
          className="w-full lg:w-1/2 flex flex-col items-center text-center"
          style={{ y: textY }}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {/* Logo centered */}
          <motion.div
            variants={itemAnimation}
            className="flex flex-col items-center mb-8" // Center logo and add bottom margin
          >
            <img
              src={logoImage}
              alt="PY Partners Logo"
              className="h-32 md:h-48 mb-2" // Taille encore plus grande
            />
          </motion.div>

          {/* Description */}
          <motion.h2
            variants={itemAnimation}
            // Ensure base text size is good for mobile
            className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 lg:mb-8 leading-tight max-w-lg tracking-[-0.02em]"
          >
            <span>
              {t('hero.description').replace(/^\s+/g, '')}
            </span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemAnimation}
            className="text-gray-700 text-lg md:text-xl lg:text-2xl italic font-light mb-10 max-w-lg"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemAnimation}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <button
              onClick={onDiscoverClick}
              // Added w-full sm:w-auto
              className="group w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-medium uppercase tracking-wide text-sm relative overflow-hidden hover:bg-gray-800 transition-colors duration-500 btn-premium"
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
            </button>

            <button
              onClick={onContactClick}
              // Added w-full sm:w-auto
              className="group w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-800 text-gray-800 font-medium uppercase tracking-wide text-sm relative overflow-hidden hover:bg-gray-50 btn-premium"
            >
              <span className="relative z-10">{t('hero.cta2')}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right image column */}
        <motion.div
          // Removed mt-10 lg:mt-0, spacing now handled by container gap & padding
          // Added explicit width control: w-full lg:w-1/2
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          style={{
            scale: imageScale,
            opacity: imageOpacity
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Image Container */}
          <div className="relative w-full max-w-[450px] lg:max-w-[600px]" style={{ aspectRatio: '3/4' }}> {/* Possibly reduce max-width on mobile */}
            <PremiumImage
              src={geometricImage}
              alt="PY Partners - Design géométrique"
              className="w-full h-full shadow-lg rounded-md" // Added subtle rounding
              filterIntensity="medium"
              hoverEffect="lighten"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent mix-blend-multiply pointer-events-none rounded-md"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent mix-blend-overlay pointer-events-none rounded-md"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator (keep as is or adjust visibility based on screen size if needed) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative"
        >
          <svg className="w-6 h-6 text-gray-400 hover:text-gray-700 transition-colors duration-300"
               fill="none" strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
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
      </motion.div>
    </section>
  );
}
