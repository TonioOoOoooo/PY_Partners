import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  useEffect(() => {
    // Show cookie consent after delay if not already accepted
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const customizeCookies = () => {
    // This would typically open a modal with cookie settings
    // For now, we'll just show an alert
    setCustomDialogOpen(true);
  };

  const closeCookieConsent = () => {
    setIsVisible(false);
  };

  const showCookieSettings = () => {
    setIsVisible(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md bg-white rounded-lg shadow-xl p-6 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-heading text-lg font-bold text-primary">{t('cookies.title')}</h3>
              <button className="text-gray-400 hover:text-gray-500" onClick={closeCookieConsent}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {t('cookies.description')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button 
                className="bg-secondary hover:bg-secondary/90 text-primary font-medium px-4 py-2 rounded-md transition duration-300 text-sm"
                onClick={acceptCookies}
              >
                {t('cookies.accept')}
              </button>
              <button 
                className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition duration-300 text-sm"
                onClick={customizeCookies}
              >
                {t('cookies.customize')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-40">
        <button 
          className="bg-primary hover:bg-primary-light text-white p-3 rounded-full shadow-lg transition duration-300"
          onClick={showCookieSettings}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Simple modal for "Customize Cookies" - in a real app, this would be more elaborate */}
      {customDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="font-heading text-xl font-bold mb-4">{t('cookies.customize')}</h3>
            <p className="mb-6 text-gray-600">Cette fonctionnalité sera disponible prochainement.</p>
            <div className="flex justify-end">
              <button 
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => setCustomDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
