import React, { useState } from 'react';
import { Link } from 'wouter';
import { useArticles } from '../../hooks/useArticles';
import { useLanguage } from '../../hooks/useLanguage';
import { BlogArticle } from '../../services/blogService';
import { PremiumImage } from '../../components/common/PremiumImage';

const BlogList: React.FC = () => {
  const { articles, loading, error } = useArticles(true);
  const { t, language } = useLanguage();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Extraire tous les tags uniques de tous les articles
  
  // Extraire tous les tags uniques de tous les articles
  const allTags = articles.reduce((tags: string[], article) => {
    article.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <div className="animate-pulse text-gray-600 py-10">
          {t('blog.loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center text-red-500 py-10">
        {error}
      </div>
    );
  }
  
  // Filtrer les articles par tag si un tag est sélectionné
  const filteredArticles = activeTag
    ? articles.filter(article => article.tags.includes(activeTag))
    : articles;

  const getLocalizedTitle = (article: BlogArticle) => {
    return language === 'fr' ? article.title : (article.title_en || article.title);
  };

  const getLocalizedSummary = (article: BlogArticle) => {
    return language === 'fr' ? article.resume : (article.summary_en || article.resume);
  };

  const getArticleUrl = (article: BlogArticle) => {
    const basePath = language === 'fr' ? '/fr/blog' : '/en/blog';
    return `${basePath}/${article.slug}`;
  };

  return (
    <div>
      {/* Filtres par tags */}
      {allTags.length > 0 && (
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-medium text-gray-500 mr-2">
              {language === 'fr' ? 'Filtrer par' : 'Filter by'}
            </span>
            <button
              className={`px-5 py-2 text-xs uppercase tracking-wider ${!activeTag ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100'} transition-colors duration-300`}
              onClick={() => setActiveTag(null)}
            >
              {language === 'fr' ? 'Tous' : 'All'}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-5 py-2 text-xs uppercase tracking-wider ${activeTag === tag ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100'} transition-colors duration-300`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 font-light">
            {t('blog.noArticles')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredArticles.map((article) => (
            <div key={article.slug} className="group">
              {/* Image cliquable */}
              <Link href={getArticleUrl(article)} className="block relative overflow-hidden mb-8 bg-white">
                {article.imageUrl ? (
                  <PremiumImage
                    src={article.imageUrl}
                    alt={getLocalizedTitle(article)}
                    className="w-full h-72 transition-all duration-700 ease-in-out group-hover:scale-105"
                    filterIntensity="medium"
                    hoverEffect="color"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-xs uppercase tracking-widest">PY Partners</span>
                  </div>
                )}
              </Link>
              
              <div>
                {/* Date de publication */}
                <div className="text-xs text-gray-500 mb-3 font-light">
                  {article.date || ''}
                </div>
                
                {/* Titre cliquable */}
                <Link href={getArticleUrl(article)} className="block">
                  <h2 className="text-xl font-bold text-black mb-4 font-heading group-hover:text-gray-700 transition-colors duration-300">
                    {getLocalizedTitle(article)}
                  </h2>
                </Link>
                
                {/* Résumé cliquable */}
                {getLocalizedSummary(article) && (
                  <Link href={getArticleUrl(article)} className="block">
                    <p className="text-gray-600 mb-6 line-clamp-3 font-light">{getLocalizedSummary(article)}</p>
                  </Link>
                )}
                
                {/* Tags avec icônes */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {article.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-gray-700 transition-colors duration-300"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Bouton Lire l'article */}
                <Link
                  href={getArticleUrl(article)}
                  className="inline-block text-xs uppercase tracking-widest font-medium hover:text-gray-500 transition-colors duration-300 group-hover:translate-x-1 transform transition-transform"
                >
                  {t('blog.readMore')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
