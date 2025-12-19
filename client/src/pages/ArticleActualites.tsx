import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoute } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { getArticleBySlug } from '@/services/blogService';
import { BlogArticle as BlogArticleType } from '@/services/blogService';
import BlogArticleView from '@/components/blog/BlogArticleView';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';

const ArticleActualites: React.FC = () => {
  const [, params] = useRoute('/fr/actualites/:slug');
  const [, paramsEn] = useRoute('/en/actualites/:slug');
  const [, paramsBlogFr] = useRoute('/fr/blog/:slug');
  const [, paramsBlogEn] = useRoute('/en/blog/:slug');
  
  // Récupérer le slug depuis n'importe quelle route (actualites ou blog)
  const slug = params?.slug || paramsEn?.slug || paramsBlogFr?.slug || paramsBlogEn?.slug;
  
  const [article, setArticle] = useState<BlogArticleType | null>(null);
  const { language } = useLanguage();
  
  // Handlers pour la navigation
  const handleNavClick = {
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

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        const fetchedArticle = await getArticleBySlug(slug);
        setArticle(fetchedArticle);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
      }
    };

    fetchArticle();
  }, [slug]);

  const title = article 
    ? (language === 'fr' ? article.title : (article.title_en || article.title)) + ' - PY Partners' 
    : 'Article - PY Partners';
  
  const description = article 
    ? (language === 'fr' ? article.resume : (article.summary_en || article.resume))
    : (language === 'fr' ? 'Article de blog PY Partners' : 'PY Partners blog article');

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {article && (
          <>
            <link 
              rel="alternate" 
              hrefLang="fr" 
              href={`https://py-partners.com/fr/actualites/${article.slug}`} 
            />
            <link 
              rel="alternate" 
              hrefLang="en" 
              href={`https://py-partners.com/en/actualites/${article.slug}`} 
            />
            <link 
              rel="canonical" 
              href={`https://py-partners.com/${language === 'fr' ? 'fr' : 'en'}/actualites/${article.slug}`} 
            />
            {article.imageUrl && (
              <meta property="og:image" content={article.imageUrl} />
            )}
          </>
        )}
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header onNavClick={handleNavClick} currentPage="blog" />
        <PageTransition>
          <div className="pt-40">
            <BlogArticleView />
          </div>
        </PageTransition>
        <Footer onNavClick={handleNavClick} />
      </div>
    </>
  );
};

export default ArticleActualites;
