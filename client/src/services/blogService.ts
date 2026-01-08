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

const parseArticleDate = (rawDate: string): number => {
  if (!rawDate) return 0;

  const value = String(rawDate).trim();
  if (!value) return 0;

  // 1) Essai direct (ISO / formats reconnus par le navigateur)
  const native = Date.parse(value);
  if (!Number.isNaN(native)) return native;

  // 2) Formats type dd/mm/yyyy ou dd-mm-yyyy
  const dmy = value.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    const year = Number(dmy[3]);
    const dt = new Date(year, month - 1, day);
    const ts = dt.getTime();
    return Number.isNaN(ts) ? 0 : ts;
  }

  // 3) Formats type "1-sept.-2024" (mois FR avec point optionnel)
  const fr = value
    .toLowerCase()
    .match(/^(\d{1,2})[\s\-/_.]*([a-zàâäéèêëîïôöùûüç]+)\.?[\s\-/_.]*(\d{4})$/i);

  if (fr) {
    const day = Number(fr[1]);
    const monthStr = fr[2].replace('.', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const year = Number(fr[3]);

    const monthMap: Record<string, number> = {
      jan: 1,
      janv: 1,
      janvier: 1,
      fev: 2,
      fevr: 2,
      fevrier: 2,
      mar: 3,
      mars: 3,
      avr: 4,
      avril: 4,
      mai: 5,
      jun: 6,
      juin: 6,
      jul: 7,
      juil: 7,
      juillet: 7,
      aou: 8,
      aout: 8,
      sep: 9,
      sept: 9,
      septembre: 9,
      oct: 10,
      octobre: 10,
      nov: 11,
      novembre: 11,
      dec: 12,
      decembre: 12
    };

    const month = monthMap[monthStr] || monthMap[monthStr.slice(0, 4)] || monthMap[monthStr.slice(0, 3)];
    if (month) {
      const dt = new Date(year, month - 1, day);
      const ts = dt.getTime();
      return Number.isNaN(ts) ? 0 : ts;
    }
  }

  return 0;
};

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
    
    // Filtrer les articles publiés
    const publishedArticles = sheetArticles.filter((article, index) => {
      const isArticlePublished = isPublished(article.statut);
      return isArticlePublished;
    });
    
    // Convertir les articles publiés en BlogArticle
    const blogArticles = publishedArticles.map(convertSheetArticleToBlogArticle);
    
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
    
    // Trier les articles par date (plus récents en premier)
    return uniqueBlogArticles.sort((a, b) => {
      const tsA = parseArticleDate(a.date);
      const tsB = parseArticleDate(b.date);

      if (tsA !== tsB) return tsB - tsA;

      // Fallback stable si date absente / invalide
      return a.title.localeCompare(b.title);
    });
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
