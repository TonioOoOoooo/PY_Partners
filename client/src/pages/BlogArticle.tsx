import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoute } from 'wouter';
import { useLanguage } from '../hooks/useLanguage';
import { getArticleBySlug } from '../services/blogService';
import { BlogArticle as BlogArticleType } from '../services/blogService';
import BlogArticleView from '../components/blog/BlogArticleView';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BlogArticle: React.FC = () => {
  const [, params] = useRoute('/fr/blog/:slug');
  const [, paramsEn] = useRoute('/en/blog/:slug');
  const slug = params?.slug || paramsEn?.slug;
  
  const [article, setArticle] = useState<BlogArticleType | null>(null);
  const { language } = useLanguage();
  
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
      window.location.href = `/${language}/#expertises`;
    },
    contact: () => {
      window.location.href = `/${language}/#contact`;
    },
    // Même si nous avons supprimé le lien presse du menu, le type HeaderProps l'exige encore
    press: () => {}
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
              href={`https://py-partners.com/fr/blog/${article.slug}`} 
            />
            <link 
              rel="alternate" 
              hrefLang="en" 
              href={`https://py-partners.com/en/blog/${article.slug}`} 
            />
            <link 
              rel="canonical" 
              href={`https://py-partners.com/${language === 'fr' ? 'fr' : 'en'}/blog/${article.slug}`} 
            />
            {article.imageUrl && (
              <meta property="og:image" content={article.imageUrl} />
            )}
          </>
        )}
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header onNavClick={handleNavClick} />
        <div className="pt-40">
          <BlogArticleView />
        </div>
        <Footer onNavClick={handleNavClick} />
      </div>
    </>
  );
};

export default BlogArticle;
