import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Gestionnaire de consentement aux cookies amélioré
 * - Persistance robuste avec cookies HTTP et localStorage en fallback
 * - Gestion complète des erreurs
 * - Interface utilisateur intuitive
 */
export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  
  // Fonction pour définir un cookie HTTP
  const setCookie = (name: string, value: string, days: number) => {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "; expires=" + date.toUTCString();
      document.cookie = name + "=" + value + expires + "; path=/; SameSite=Strict";
      
      // Sauvegarde également dans localStorage comme fallback
      localStorage.setItem(name, value);
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la définition du cookie:", error);
      return false;
    }
  };
  
  // Fonction pour obtenir un cookie HTTP
  const getCookie = (name: string) => {
    try {
      // Essayer d'abord de lire le cookie HTTP
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      
      // Si rien trouvé, essayer localStorage comme fallback
      return localStorage.getItem(name);
    } catch (error) {
      console.error("Erreur lors de la lecture du cookie:", error);
      return null;
    }
  };
  
  // Vérifier si le consentement a déjà été donné
  const checkConsent = () => {
    return getCookie('cookieConsent') === 'accepted';
  };
  
  useEffect(() => {
    // Délai plus long pour s'assurer que tout est chargé correctement
    const timer = setTimeout(() => {
      if (!checkConsent()) {
        setIsVisible(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Accepter tous les cookies
  const acceptAllCookies = () => {
    if (setCookie('cookieConsent', 'accepted', 365)) {
      setIsVisible(false);
      setIsCustomizeOpen(false);
    }
  };
  
  // Paramètres des cookies par catégorie (pour une future implémentation)
  const cookieCategories = [
    { id: 'necessary', label: t('cookieConsent.categories.necessary') || 'Nécessaires', required: true },
    { id: 'functional', label: t('cookieConsent.categories.functional') || 'Fonctionnels', required: false },
    { id: 'analytics', label: t('cookieConsent.categories.analytics') || 'Analytiques', required: false },
    { id: 'marketing', label: t('cookieConsent.categories.marketing') || 'Marketing', required: false }
  ];
  
  // Fermeture sans acceptation (considéré comme un refus)
  const closeCookieConsent = () => {
    // Enregistrer le refus pour ne pas redemander immédiatement
    setCookie('cookieConsent', 'dismissed', 1); // Valable pour 1 jour
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl p-4 z-50 md:bottom-4 md:left-4 md:right-auto md:max-w-lg md:rounded-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!isCustomizeOpen ? (
            // Vue principale
            <>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-lg font-bold text-primary">{t('cookieConsent.title')}</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500 p-1" 
                  onClick={closeCookieConsent}
                  aria-label="Fermer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {t('cookieConsent.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-medium px-4 py-2 rounded-md transition duration-300 text-sm flex-1"
                  onClick={acceptAllCookies}
                >
                  {t('cookieConsent.accept')}
                </button>
                <button 
                  className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition duration-300 text-sm flex-1"
                  onClick={() => setIsCustomizeOpen(true)}
                >
                  {t('cookieConsent.customize')}
                </button>
              </div>
            </>
          ) : (
            // Vue de personnalisation
            <>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-heading text-lg font-bold text-primary">{t('cookieConsent.customize')}</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500 p-1" 
                  onClick={() => setIsCustomizeOpen(false)}
                  aria-label="Retour"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                {cookieCategories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cookie-${category.id}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={category.required}
                      disabled={category.required}
                    />
                    <label htmlFor={`cookie-${category.id}`} className="ml-2 block text-sm text-gray-700">
                      {category.label}
                      {category.required && <span className="text-xs text-gray-500 ml-1">({t('cookieConsent.required')})</span>}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-medium px-4 py-2 rounded-md transition duration-300 text-sm flex-1"
                  onClick={acceptAllCookies}
                >
                  {t('cookieConsent.savePreferences')}
                </button>
                <button 
                  className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition duration-300 text-sm flex-1"
                  onClick={() => setIsCustomizeOpen(false)}
                >
                  {t('cookieConsent.cancel')}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}