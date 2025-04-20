import { create } from 'zustand';
import { translations } from './translations';

export type Language = 'fr' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: ((): Language => {
    if (typeof window !== 'undefined') {
      const userLang = navigator.language || navigator.languages?.[0] || 'en';
      return userLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    }
    return 'en';
  })(),
  setLanguage: (language: Language) => set({ language }),
  t: (key: string) => {
    const { language } = get();
    const parts = key.split('.');
    let result: any = translations[language];
    
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  }
}));
