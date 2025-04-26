import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'wouter';
import logoImage from '@/assets/py-partners-logo.png';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavClick: {
    about: () => void;
    expertises: () => void;
    press: () => void;
    contact: () => void;
  };
}

export default function PremiumHeader({ onNavClick }: HeaderProps) {
  const { t, toggleLanguage, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center z-10">
            <img 
              src={logoImage} 
              alt="PY Partners Logo" 
              className={`transition-all duration-500 ${
                isScrolled ? 'h-8' : 'h-10'
              }`} 
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <nav className="flex space-x-8 items-center">
              {[
                { id: 'accueil', label: t('navigation.home') },
                { id: 'a-propos', label: t('navigation.about'), action: 'about' },
                { id: 'expertises', label: t('navigation.expertise'), action: 'expertises' },
                { id: 'presse', label: t('navigation.press'), action: 'press' },
                { id: 'contact', label: t('navigation.contact'), action: 'contact' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`
                    nav-link-premium relative tracking-wide 
                    text-xs font-medium uppercase 
                    transition-colors duration-200
                    ${activeSection === item.id 
                      ? 'text-gray-900' 
                      : 'text-gray-500 hover:text-gray-800'}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'accueil') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setActiveSection('accueil');
                    } else if (item.action) {
                      handleNavClick(item.action as keyof typeof onNavClick, item.id);
                    }
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-px bg-black"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>
            
            <button 
              className="px-3 py-1 text-xs tracking-widest uppercase 
                       border border-gray-900 bg-transparent text-gray-900 
                       hover:bg-gray-900 hover:text-white 
                       transition-all duration-300"
              onClick={toggleLanguage}
            >
              {language === 'fr' ? 'FR' : 'EN'}
            </button>
          </div>
          
          <button 
            className="md:hidden flex flex-col justify-center items-center 
                     w-10 h-10 relative z-30"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`
              block w-5 h-px bg-gray-900 transition-all duration-300
              ${mobileMenuOpen 
                ? 'transform rotate-45 translate-y-1' 
                : 'mb-1'
              }
            `}></span>
            <span className={`
              block w-5 h-px bg-gray-900 transition-all duration-300
              ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}
            `}></span>
            <span className={`
              block w-5 h-px bg-gray-900 transition-all duration-300
              ${mobileMenuOpen 
                ? 'transform -rotate-45 -translate-y-1' 
                : 'mt-1'
              }
            `}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-20 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center space-y-6 py-10">
              {[
                { id: 'accueil', label: t('navigation.home') },
                { id: 'a-propos', label: t('navigation.about'), action: 'about' },
                { id: 'expertises', label: t('navigation.expertise'), action: 'expertises' },
                { id: 'presse', label: t('navigation.press'), action: 'press' },
                { id: 'contact', label: t('navigation.contact'), action: 'contact' }
              ].map((item, index) => (
                <motion.a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`text-2xl font-medium 
                            ${activeSection === item.id ? 'text-gray-900' : 'text-gray-500'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'accueil') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setActiveSection('accueil');
                      setMobileMenuOpen(false);
                    } else if (item.action) {
                      handleNavClick(item.action as keyof typeof onNavClick, item.id);
                    }
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.button 
                className="mt-8 px-6 py-2 text-sm tracking-wider uppercase
                         border border-gray-900 bg-transparent text-gray-900
                         hover:bg-gray-900 hover:text-white
                         transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
              >
                {language === 'fr' ? 'Français' : 'English'}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}