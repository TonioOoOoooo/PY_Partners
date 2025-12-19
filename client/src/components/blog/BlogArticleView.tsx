import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { getArticleBySlug } from '../../services/blogService';
import { BlogArticle } from '../../services/blogService';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'wouter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { PremiumImage } from '../../components/common/PremiumImage';

const BlogArticleView: React.FC = () => {
  const [, params] = useRoute('/fr/blog/:slug');
  const [, paramsEn] = useRoute('/en/blog/:slug');
  const slug = params?.slug || paramsEn?.slug;
  
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const fetchedArticle = await getArticleBySlug(slug);
        setArticle(fetchedArticle);
        if (!fetchedArticle) {
          setError(language === 'fr' 
            ? 'Article non trouvé' 
            : 'Article not found');
        }
      } catch (err) {
        setError(language === 'fr' 
          ? 'Erreur lors du chargement de l\'article' 
          : 'Error loading article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, language]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 text-center">
        <div className="animate-pulse text-gray-500">
          {t('blog.loadingArticle')}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="text-center py-16">
          <p className="text-lg text-gray-700 mb-8">{error}</p>
          <Link 
            href={language === 'fr' ? '/fr/blog' : '/en/blog'} 
            className="inline-block text-xs uppercase tracking-widest font-medium hover:text-gray-500 transition-colors duration-300"
          >
            ← {t('blog.backToArticles')}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'fr' ? article.title : (article.title_en || article.title);
  const content = language === 'fr' ? article.content : (article.content_en || article.content);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <Link 
              href={language === 'fr' ? '/fr/blog' : '/en/blog'} 
              className="inline-block mb-12 text-xs uppercase tracking-widest font-medium hover:text-gray-500 transition-colors duration-300"
            >
              ← {t('blog.backToArticles')}
            </Link>
            
            {/* Date de publication */}
            {article.date && (
              <div className="text-sm text-gray-500 mb-6 font-light">
                {article.date}
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-10 font-heading leading-tight">{title}</h1>
          </div>
          
          {article.imageUrl && (
            <div className="mb-16">
              <PremiumImage
                src={article.imageUrl}
                alt={title}
                className="w-full h-[500px]"
                filterIntensity="medium"
                hoverEffect="color"
              />
            </div>
          )}
          
          {/* Contenu Markdown avec style ultra premium */}
          <div className="article-content pb-10">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-16 mb-8 font-heading" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-6 font-heading" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-10 mb-4 font-heading" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-bold mt-8 mb-3 font-heading" {...props} />,
                p: ({node, ...props}) => <p className="mb-8 text-gray-700 leading-relaxed font-light text-lg" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-8 mb-8 space-y-3" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-8 mb-8 space-y-3" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-700 font-light" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-black pl-6 italic my-10 text-gray-700 font-light text-xl" {...props} />,
                a: ({node, ...props}) => <a className="text-black border-b border-black hover:text-gray-600 transition-colors duration-300" {...props} />,
                img: ({node, ...props}) => <img className="my-12 max-w-full" {...props} />,
                code: ({node, className, ...props}: any) => {
                  const isInline = !className || !className.includes('language-');
                  return isInline 
                    ? <code className="bg-gray-50 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                    : <code className="block bg-gray-50 p-6 rounded-none my-8 text-sm font-mono overflow-x-auto border-l-2 border-black" {...props} />;
                },
                pre: ({node, ...props}) => <pre className="bg-gray-50 p-0 my-8 overflow-x-auto" {...props} />,
                hr: ({node, ...props}) => <hr className="my-16 border-t border-gray-200" {...props} />,
                table: ({node, ...props}) => <table className="min-w-full divide-y divide-gray-200 my-12 border border-gray-100" {...props} />,
                th: ({node, ...props}) => <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-widest" {...props} />,
                td: ({node, ...props}) => <td className="px-6 py-4 border-t text-gray-700 font-light" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
            
            {/* Section des tags en bas de l'article */}
            {article.tags.length > 0 && (
              <div className="border-t border-gray-100 pt-10 mt-10">
                <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-4 py-2 bg-gray-50 text-xs uppercase tracking-widest text-gray-700 hover:bg-gray-100 transition-colors duration-300 rounded-sm"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Boutons de partage */}
            <div className="border-t border-gray-100 pt-10 mt-10 pb-10">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Partager cet article</h3>
              <div className="flex space-x-4">
                {/* LinkedIn */}
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0077B5] text-white rounded-sm hover:bg-opacity-90 transition-colors duration-300"
                  aria-label="Partager sur LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* Twitter */}
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1DA1F2] text-white rounded-sm hover:bg-opacity-90 transition-colors duration-300"
                  aria-label="Partager sur Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#3B5998] text-white rounded-sm hover:bg-opacity-90 transition-colors duration-300"
                  aria-label="Partager sur Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Email */}
                <a 
                  href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Je voulais partager cet article avec vous : ${title} - ${window.location.href}`)}`} 
                  className="p-3 bg-gray-800 text-white rounded-sm hover:bg-opacity-90 transition-colors duration-300"
                  aria-label="Partager par email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleView;
