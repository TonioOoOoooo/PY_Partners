import { fetchArticlesFromSheet, BlogArticleSheet } from './googleSheets';

// Interface pour les articles traités
export interface BlogArticle {
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  resume: string;
  categorie: string;
  statut: string;
  tags: string[];
  title_en: string;
  summary_en: string;
  content_en: string;
  date: string; // Date de publication
}

// Fonction pour vérifier si un article est publié
const isPublished = (status: string | number | boolean): boolean => {
  // Gérer les cas null/undefined
  if (status === null || status === undefined) return false;
  
  // Gérer les cas booléens
  if (typeof status === 'boolean') return status;
  
  // Gérer les cas numériques
  if (typeof status === 'number') return status === 1 || status > 0;
  
  // Normaliser le statut pour la comparaison
  const normalizedStatus = status.toString().trim().toUpperCase();
  
  // Liste étendue des statuts considérés comme "publié"
  const publishedStatuses = [
    'PUBLIER', 'PUBLIÉ', 'PUBLIE', 'PUBLISHED', 'PUBLISH', 
    'OUI', 'YES', 'TRUE', 'VRAI', '1', 'ON', 'OK'
  ];
  
  // Log pour débogage
  console.log(`Vérification statut publié: '${status}' (${typeof status}) => normalisé: '${normalizedStatus}'`);
  
  // Vérifier si le statut normalisé est dans la liste ou commence par l'un des préfixes
  const isPublished = publishedStatuses.some(s => 
    normalizedStatus === s || 
    normalizedStatus.startsWith(s) ||
    normalizedStatus.includes(s)
  );
  
  console.log(`Résultat: ${isPublished ? 'PUBLIÉ' : 'NON PUBLIÉ'}`);
  
  return isPublished;
};

// Fonction pour générer un slug à partir d'un titre
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// Conversion des données brutes en articles formatés
export const convertSheetArticleToBlogArticle = (sheetArticle: BlogArticleSheet): BlogArticle => {
  // Traitement des tags (séparés par des virgules)
  const tags = sheetArticle.tags
    ? sheetArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    : [];
    
  return {
    slug: slugify(sheetArticle.titre),
    title: sheetArticle.titre,
    content: sheetArticle.contenu,
    imageUrl: sheetArticle.image,
    resume: sheetArticle.resume,
    categorie: sheetArticle.categorie,
    statut: sheetArticle.statut,
    tags: tags,
    title_en: sheetArticle.title_en,
    summary_en: sheetArticle.summary_en,
    content_en: sheetArticle.content_en,
    date: sheetArticle.date // Ajouter la date de publication
  };
};

// Récupération des articles publiés uniquement
export const getPublishedArticles = async (): Promise<BlogArticle[]> => {
  try {
    // Récupérer tous les articles du Google Sheet
    const sheetArticles = await fetchArticlesFromSheet();
    
    // Filtrer les articles publiés en conservant l'index de ligne du sheet
    const publishedWithRowIndex = sheetArticles
      .map((article, rowIndex) => ({ article, rowIndex }))
      .filter(({ article }) => isPublished(article.statut));

    // Afficher du bas vers le haut (les lignes du bas sont les plus récentes)
    const orderedPublished = publishedWithRowIndex
      .sort((a, b) => b.rowIndex - a.rowIndex)
      .map(({ article }) => article);

    // Convertir les articles publiés en BlogArticle
    const blogArticles = orderedPublished.map(convertSheetArticleToBlogArticle);
    
    // Vérifier les slugs pour détecter d'éventuels doublons
    const slugCounts: Record<string, number> = {};
    blogArticles.forEach(article => {
      slugCounts[article.slug] = (slugCounts[article.slug] || 0) + 1;
    });
    
    // Garantir l'unicité des slugs en ajoutant un index si nécessaire
    const uniqueBlogArticles = blogArticles.map((article, index) => {
      if (slugCounts[article.slug] > 1) {
        // Ajouter un index au slug pour le rendre unique
        const newSlug = `${article.slug}-${index + 1}`;
        return { ...article, slug: newSlug };
      }
      return article;
    });

    return uniqueBlogArticles;
  } catch (error) {
    console.error('Erreur dans getPublishedArticles:', error);
    return [];
  }
};

// Récupération de tous les articles (pour l'admin)
export const getAllArticles = async (): Promise<BlogArticle[]> => {
  const sheetArticles = await fetchArticlesFromSheet();
  return sheetArticles
    .map(convertSheetArticleToBlogArticle)
    .reverse();
};

// Récupération d'un article par son slug
export const getArticleBySlug = async (slug: string): Promise<BlogArticle | null> => {
  try {
    const articles = await getPublishedArticles();
    const article = articles.find(article => article.slug === slug);
    return article || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article par slug:', error);
    return null;
  }
};
