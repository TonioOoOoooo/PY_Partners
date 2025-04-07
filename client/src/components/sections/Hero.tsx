import { useLanguage } from '@/hooks/useLanguage';

interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="hero-bg min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
            {t('hero.title').split(' au service des ')[0]} 
            <span className="text-secondary"> {t('hero.title').includes(' au service des ') ? 'au service des' : ''} </span>
            {t('hero.title').includes(' au service des ') ? t('hero.title').split(' au service des ')[1] : ''}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-12 font-light tracking-wide">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={onDiscoverClick}
              className="inline-block bg-white hover:bg-secondary/20 hover:text-white text-black font-medium px-8 py-4 rounded-none transition duration-300 text-center uppercase tracking-wide text-sm"
            >
              {t('hero.cta1')}
            </button>
            <button
              onClick={onContactClick}
              className="inline-block bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-none transition duration-300 text-center uppercase tracking-wide text-sm"
            >
              {t('hero.cta2')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
