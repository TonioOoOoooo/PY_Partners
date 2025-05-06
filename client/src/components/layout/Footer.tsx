import { useLanguage } from '@/hooks/useLanguage';

interface FooterProps {
  onNavClick: {
    about: () => void;
    expertises: () => void;
    press: () => void;
    contact: () => void;
  };
}

export default function Footer({ onNavClick }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">PY Partners</h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-xs font-bold mb-6 uppercase tracking-wider">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#accueil" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {t('navigation.home')}
                </a>
              </li>
              <li>
                <a 
                  href="#a-propos" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick.about();
                  }}
                >
                  {t('navigation.about')}
                </a>
              </li>
              <li>
                <a 
                  href="#expertises" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick.expertises();
                  }}
                >
                  {t('navigation.expertise')}
                </a>
              </li>
              <li>
                <a 
                  href="#presse" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick.press();
                  }}
                >
                  {t('navigation.press')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick.contact();
                  }}
                >
                  {t('navigation.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-xs font-bold mb-6 uppercase tracking-wider">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">13 Rue Royale, 75008 PARIS</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@py-partners.com" className="hover:text-white transition-colors duration-200 text-sm">contact@py-partners.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-14 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>{t('footer.copyright')}</p>
          <div className="mt-2 legal-text">
            Fonts made from <a href="http://www.onlinewebfonts.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Web Fonts</a> is licensed by CC BY 4.0
          </div>
          <div className="mt-2 legal-text">
            Site développé par <a href="https://tomorrow-solutions.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">AI Tomorrow Solutions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
