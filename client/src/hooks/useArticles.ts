import { useState, useEffect } from 'react';
import { BlogArticle } from '../services/blogService';
import { getPublishedArticles, getAllArticles } from '../services/blogService';
import { useLanguageStore } from '../lib/i18n';

interface UseArticlesResult {
  articles: BlogArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useArticles = (publishedOnly: boolean = true): UseArticlesResult => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguageStore();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      
      const fetchedArticles = publishedOnly 
        ? await getPublishedArticles()
        : await getAllArticles();
      
      setArticles(fetchedArticles);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des articles:', err);
      setError(language === 'fr' 
        ? 'Erreur lors du chargement des articles' 
        : 'Error loading articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [publishedOnly, language]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles
  };
};
