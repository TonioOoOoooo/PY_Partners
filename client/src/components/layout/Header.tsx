import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'wouter';
import logoImage from '@/assets/py-partners-logo.png';

interface HeaderProps {
  onNavClick: {
    about: () => void;
    expertises: () => void;
    press: () => void;
    contact: () => void;
  };
}

export default function Header({ onNavClick }: HeaderProps) {
  const { t, toggleLanguage, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = [
        { id: 'accueil', ref: document.getElementById('accueil') },
        { id: 'a-propos', ref: document.getElementById('a-propos') },
        { id: 'expertises', ref: document.getElementById('expertises') },
        { id: 'presse', ref: document.getElementById('presse') },
        { id: 'contact', ref: document.getElementById('contact') }
      ];

      const offset = 100;
      const currentPosition = window.scrollY + offset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref && section.ref.offsetTop <= currentPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (section: keyof typeof onNavClick, sectionId: string) => {
    setActiveSection(sectionId);
    onNavClick[section]();
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'premium-shadow' : ''}`}>
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <Link href="/" className="flex items-center">
              <img src={logoImage} alt="PY Partners Logo" className="h-12" />
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <nav className="flex space-x-8 items-center">
                <a 
                  href="#accueil" 
                  className={`nav-link text-primary text-sm font-medium hover:text-secondary transition-colors duration-200 ${activeSection === 'accueil' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveSection('accueil');
                  }}
                >
                  {t('navigation.home')}
                </a>
                <a 
                  href="#a-propos" 
                  className={`nav-link text-primary text-sm font-medium hover:text-secondary transition-colors duration-200 ${activeSection === 'a-propos' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about', 'a-propos');
                  }}
                >
                  {t('navigation.about')}
                </a>
                <a 
                  href="#expertises" 
                  className={`nav-link text-primary text-sm font-medium hover:text-secondary transition-colors duration-200 ${activeSection === 'expertises' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('expertises', 'expertises');
                  }}
                >
                  {t('navigation.expertise')}
                </a>
                <a 
                  href="#presse" 
                  className={`nav-link text-primary text-sm font-medium hover:text-secondary transition-colors duration-200 ${activeSection === 'presse' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('press', 'presse');
                  }}
                >
                  {t('navigation.press')}
                </a>
                <a 
                  href="#contact" 
                  className={`nav-link text-primary text-sm font-medium hover:text-secondary transition-colors duration-200 ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact', 'contact');
                  }}
                >
                  {t('navigation.contact')}
                </a>
              </nav>
              <div className="flex items-center">
                <button 
                  className="px-3 py-1 text-xs tracking-wide uppercase border border-secondary rounded-none bg-white text-primary hover:bg-secondary/10 transition duration-200"
                  onClick={toggleLanguage}
                >
                  {t('language')}
                </button>
              </div>
            </div>
            <button className="md:hidden text-primary" onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden bg-white premium-shadow ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#accueil" 
              className="text-primary hover:text-secondary py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
                setActiveSection('accueil');
              }}
            >
              {t('navigation.home')}
            </a>
            <a 
              href="#a-propos" 
              className="text-primary hover:text-secondary py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about', 'a-propos');
              }}
            >
              {t('navigation.about')}
            </a>
            <a 
              href="#expertises" 
              className="text-primary hover:text-secondary py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('expertises', 'expertises');
              }}
            >
              {t('navigation.expertise')}
            </a>
            <a 
              href="#presse" 
              className="text-primary hover:text-secondary py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('press', 'presse');
              }}
            >
              {t('navigation.press')}
            </a>
            <a 
              href="#contact" 
              className="text-primary hover:text-secondary py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact', 'contact');
              }}
            >
              {t('navigation.contact')}
            </a>
            <button 
              className="text-left py-2 text-xs uppercase tracking-wide text-primary"
              onClick={toggleLanguage}
            >
              {t('language')}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
