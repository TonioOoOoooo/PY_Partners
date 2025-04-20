import { useLanguage } from '@/hooks/useLanguage';
// Import direct de l'image logo
import geometricImage from '@/assets/shutterstock_2421949253-768x1024.jpg';
import pyPartnersLogo from '@/assets/PY-PARTNERS-logo-pwp-1.jpg';

interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo et titre */}
          <div className="mb-16">
            <h1 className="font-heading text-4xl md:text-5xl text-gray-800 font-bold uppercase mb-1">
              PY PARTNERS
            </h1>
            <p className="text-gray-600 uppercase tracking-wider">PARIS</p>
          </div>
          
          {/* Image géométrique */}
          <div className="mb-10 max-w-xl mx-auto">
            <img 
              src={geometricImage} 
              alt="PY Partners - Design géométrique" 
              className="w-full h-auto premium-shadow"
            />
          </div>
          
          {/* Tagline */}
          <p className="text-gray-700 text-lg md:text-xl italic mb-6">
            {t('hero.tagline')}
          </p>
          
          {/* Description ajoutée */}
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
            <button
              onClick={onDiscoverClick}
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-4 transition duration-300 text-center uppercase tracking-wide text-sm"
            >
              {t('hero.cta1')}
            </button>
            <button
              onClick={onContactClick}
              className="inline-block bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-50 font-medium px-8 py-4 transition duration-300 text-center uppercase tracking-wide text-sm"
            >
              {t('hero.cta2')}
            </button>
          </div>
          
          {/* Indicateur de défilement */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}