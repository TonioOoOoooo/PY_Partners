import { useLanguageStore, type Language } from '@/lib/i18n';

export const useLanguage = () => {
  const { language, setLanguage, t } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    
    // Suivi Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_change', {
        'event_category': 'engagement',
        'event_label': `Switch to ${newLanguage}`
      });
    }
  };

  return { language, setLanguage, toggleLanguage, t };
};
