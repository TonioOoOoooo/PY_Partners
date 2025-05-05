import { useLanguageStore, type Language } from '@/lib/i18n';
import { useLocation } from 'wouter';

export const useLanguage = () => {
  const { language, setLanguage, t } = useLanguageStore();
  const [location, navigate] = useLocation();

  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    
    // Naviguer vers la bonne URL
    const currentPath = location;
    let newPath;
    
    // Gestion des ancres
    const hasAnchor = currentPath.includes('#');
    const anchor = hasAnchor ? '#' + currentPath.split('#')[1] : '';
    
    // Déterminer la nouvelle URL
    if (currentPath === '/' || currentPath === '/fr' || currentPath === '/en') {
      // Sur la page d'accueil
      newPath = newLanguage === 'fr' ? '/fr' : '/en';
    } else if (currentPath.startsWith('/fr') || currentPath.startsWith('/en')) {
      // Déjà sur une page avec préfixe de langue
      const pathWithoutAnchor = hasAnchor ? currentPath.split('#')[0] : currentPath;
      newPath = newLanguage === 'fr' ? '/fr' + anchor : '/en' + anchor;
    } else {
      // Sur une autre page sans préfixe de langue
      newPath = newLanguage === 'fr' ? '/fr' + currentPath + anchor : '/en' + currentPath + anchor;
    }
    
    navigate(newPath);
    
    // Suivi Google Analytics
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'language_change', {
        'event_category': 'engagement',
        'event_label': `Switch to ${newLanguage}`
      });
    }
  };

  return { language, setLanguage, toggleLanguage, t };
};
