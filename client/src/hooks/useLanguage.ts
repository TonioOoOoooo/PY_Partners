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
    const pathWithoutAnchor = hasAnchor ? currentPath.split('#')[0] : currentPath;
    
    // Déterminer la nouvelle URL
    if (currentPath === '/' || currentPath === '/fr' || currentPath === '/en') {
      // Sur la page d'accueil
      newPath = newLanguage === 'fr' ? '/fr' : '/en';
    } else if (currentPath.startsWith('/fr/')) {
      // Page avec préfixe français
      const pagePath = pathWithoutAnchor.substring(3); // Enlève '/fr/'
      newPath = newLanguage === 'fr' ? '/fr' + pagePath + anchor : '/en' + pagePath + anchor;
    } else if (currentPath.startsWith('/en/')) {
      // Page avec préfixe anglais
      const pagePath = pathWithoutAnchor.substring(3); // Enlève '/en/'
      newPath = newLanguage === 'fr' ? '/fr' + pagePath + anchor : '/en' + pagePath + anchor;
    } else if (currentPath.startsWith('/fr')) {
      // Page racine française
      newPath = newLanguage === 'fr' ? '/fr' + anchor : '/en' + anchor;
    } else if (currentPath.startsWith('/en')) {
      // Page racine anglaise
      newPath = newLanguage === 'fr' ? '/fr' + anchor : '/en' + anchor;
    } else {
      // Sur une page sans préfixe de langue (comme /serafine-poyer ou /virgile-puyau)
      newPath = newLanguage === 'fr' ? '/fr' + pathWithoutAnchor + anchor : '/en' + pathWithoutAnchor + anchor;
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
