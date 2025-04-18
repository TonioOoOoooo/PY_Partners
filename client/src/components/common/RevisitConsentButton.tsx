import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

export default function RevisitConsentButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const showCookieSettings = () => {
    // Get the CookieConsent component to show again by removing the localStorage item
    localStorage.removeItem('cookieConsent');
    // Reload the page to make the CookieConsent show up
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button 
        className="bg-primary hover:bg-primary-light text-white p-3 rounded-full shadow-lg transition duration-300"
        onClick={showCookieSettings}
        aria-label={t('cookies.revisit')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}