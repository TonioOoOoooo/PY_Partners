import { useLanguageStore, type Language } from '@/lib/i18n';

export const useLanguage = () => {
  const { language, setLanguage, t } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return { language, setLanguage, toggleLanguage, t };
};
