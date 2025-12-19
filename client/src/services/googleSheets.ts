import axios from 'axios';

// Configuration
const SPREADSHEET_ID = '1HjBvxTWUqfWDM8iAZynvo5KDP2XrWABkFSQgV7RCMw0'; // ID du Google Sheet
const SHEET_NAME = 'Articles';
const CACHE_KEY = 'blog_articles';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Images par défaut si aucune image n'est fournie
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=1200&q=80',
];

// Interface pour les données brutes du Sheet
export interface BlogArticleSheet {
  titre: string;
  resume: string;
  image: string;
  categorie: string;
  contenu: string;
  date: string;
  statut: 'Publié' | 'À publier' | 'En attente';
  tags: string;
  title_en: string;
  summary_en: string;
  content_en: string;
}

// Traitement des URLs d'images
const processImageUrl = (url: string, index: number): string => {
  if (!url || url.trim() === '') {
    // Utiliser une image par défaut de manière cyclique
    return DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
  }
  
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&w=1200&q=80`;
  }
  
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/)?.[1];
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  return url;
};

// Fonction principale de récupération des articles
export const fetchArticlesFromSheet = async (): Promise<BlogArticleSheet[]> => {
  try {
    // Désactiver le cache temporairement pour débogage
    // const cachedArticles = localStorage.getItem(CACHE_KEY);
    // if (cachedArticles) {
    //   const cache = JSON.parse(cachedArticles);
    //   if (cache.expiry > Date.now()) {
    //     return cache.data;
    //   }
    // }

    // Construire l'URL de l'API Google Sheets
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
    
    // Faire la requête
    const response = await axios.get(url);
    
    // Traiter la réponse (Google renvoie un format particulier)
    const jsonStr = response.data.substring(response.data.indexOf('{'), response.data.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    
    if (!data.table || !data.table.rows) {
      console.warn('Aucune donnée trouvée dans la feuille Google Sheets');
      return [];
    }

    // Transformer les données en objets structurés
    const articles: BlogArticleSheet[] = data.table.rows.slice(1).map((row: any, index: number) => {
      const cells = row.c || [];
      
      // Traiter le statut pour s'assurer qu'il est correctement extrait
      let statut = 'En attente';
      if (cells[5] && cells[5].v !== undefined && cells[5].v !== null) {
        // Convertir en chaîne de caractères pour éviter les problèmes de type
        statut = String(cells[5].v);
      }
      
      const article = {
        titre: cells[0]?.v || '',
        resume: cells[1]?.v || '',
        image: processImageUrl(cells[2]?.v || '', index),
        categorie: cells[3]?.v || '',
        contenu: cells[4]?.v || '',
        date: cells[6]?.v || '', // Récupérer la date (colonne G)
        statut: statut as BlogArticleSheet['statut'],
        tags: cells[7]?.v || '',
        title_en: cells[8]?.v || '',
        summary_en: cells[9]?.v || '',
        content_en: cells[10]?.v || ''
      };
      
      // Log détaillé pour débogage
      console.log(`Article ${index + 1} (${article.titre}):`, { 
        titre: article.titre, 
        statut: article.statut,
        statut_original: cells[5]?.v,
        statut_type: cells[5]?.v !== undefined ? typeof cells[5].v : 'undefined',
        row_index: index + 1
      });
      
      return article;
    });

    // Mettre en cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: articles,
      expiry: Date.now() + CACHE_TTL
    }));

    return articles;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw error;
  }
};
