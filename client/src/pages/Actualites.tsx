import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import BlogList from '@/components/blog/BlogList';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';

const Actualites: React.FC = () => {
  const { t, language } = useLanguage();
  
  const title = language === 'fr' ? 'Actualités - PY Partners' : 'News - PY Partners';
  const description = language === 'fr' 
    ? 'Découvrez nos derniers articles et actualités sur PY Partners' 
    : 'Discover our latest articles and news on PY Partners';
    
  // Handlers pour la navigation
  const handleNavClick = {
    // Ajouter le handler pour home
    home: () => {
      window.location.href = `/${language}/`;
    },
    about: () => {
      window.location.href = `/${language}/#a-propos`;
    },
    expertises: () => {
      window.location.href = `/${language}/#intro`;
    },
    contact: () => {
      window.location.href = `/${language}/#contact`;
    },
    press: () => {
      window.location.href = `/${language}/#presse`;
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="alternate" hrefLang="fr" href="https://py-partners.com/fr/actualites" />
        <link rel="alternate" hrefLang="en" href="https://py-partners.com/en/actualites" />
        <link rel="canonical" href={`https://py-partners.com/${language === 'fr' ? 'fr' : 'en'}/actualites`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header onNavClick={handleNavClick} currentPage="blog" />
        
        <PageTransition>
          <div className="pt-40 pb-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-black">
                  {t('blog.title')}
                </h1>
                <div className="w-20 h-0.5 bg-black mb-8"></div>
                <p className="text-xl text-gray-700 max-w-3xl">
                  {t('blog.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <div className="max-w-7xl mx-auto">
                <BlogList />
              </div>
            </div>
          </div>
        </PageTransition>
        
        <Footer onNavClick={handleNavClick} />
      </div>
    </>
  );
};

export default Actualites;
