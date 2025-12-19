// Script pour générer automatiquement le sitemap
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distSitemapPath = path.join(projectRoot, 'dist', 'public', 'sitemap.xml');
const clientSitemapPath = path.join(projectRoot, 'client', 'public', 'sitemap.xml');

// Configuration du site
const siteUrl = 'https://py-partners.com';
const lastMod = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
const SPREADSHEET_ID = '1HjBvxTWUqfWDM8iAZynvo5KDP2XrWABkFSQgV7RCMw0';
const SHEET_NAME = 'Articles';
const sections = [
  { path: '/', priority: '1.0' },
  { path: '/fr', priority: '1.0' },
  { path: '/en', priority: '0.9' },
  { path: '/actualites', priority: '0.9' },
  { path: '/fr/actualites', priority: '0.9' },
  { path: '/en/actualites', priority: '0.9' },
  // Routes legacy blog (compatibilité)
  { path: '/blog', priority: '0.7' },
  { path: '/fr/blog', priority: '0.7' },
  { path: '/en/blog', priority: '0.7' },
  { path: '/#a-propos', priority: '0.8' },
  { path: '/fr/#a-propos', priority: '0.8' },
  { path: '/en/#a-propos', priority: '0.8' },
  { path: '/#expertises', priority: '0.8' },
  { path: '/fr/#expertises', priority: '0.8' },
  { path: '/en/#expertises', priority: '0.8' },
  { path: '/#presse', priority: '0.7' },
  { path: '/fr/#presse', priority: '0.7' },
  { path: '/en/#presse', priority: '0.7' },
  { path: '/#contact', priority: '0.9' },
  { path: '/fr/#contact', priority: '0.9' },
  { path: '/en/#contact', priority: '0.9' },
  // Pages de profil des avocats
  { path: '/virgile-puyau', priority: '0.9' },
  { path: '/fr/virgile-puyau', priority: '0.9' },
  { path: '/en/virgile-puyau', priority: '0.9' },
  { path: '/serafine-poyer', priority: '0.9' },
  { path: '/fr/serafine-poyer', priority: '0.9' },
  { path: '/en/serafine-poyer', priority: '0.9' }
];

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function isPublished(status) {
  if (status === null || status === undefined) return false;
  if (typeof status === 'boolean') return status;
  if (typeof status === 'number') return status === 1 || status > 0;

  const normalizedStatus = status.toString().trim().toUpperCase();
  const publishedStatuses = [
    'PUBLIER', 'PUBLIÉ', 'PUBLIE', 'PUBLISHED', 'PUBLISH',
    'OUI', 'YES', 'TRUE', 'VRAI', '1', 'ON', 'OK'
  ];

  return publishedStatuses.some((s) =>
    normalizedStatus === s ||
    normalizedStatus.startsWith(s) ||
    normalizedStatus.includes(s),
  );
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchPublishedArticleSlugs() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google Sheets responded with ${res.status}`);
    }

    const text = await res.text();
    const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    const rows = data?.table?.rows;
    if (!Array.isArray(rows)) return [];

    // Skip header row (the sheet is designed with headers)
    const raw = rows.slice(1).map((row) => {
      const cells = row?.c || [];
      return {
        titre: cells[0]?.v || '',
        statut: cells[5]?.v,
      };
    });

    const published = raw.filter((a) => a.titre && isPublished(a.statut));

    const slugs = published.map((a) => slugify(a.titre));
    const counts = {};
    for (const s of slugs) counts[s] = (counts[s] || 0) + 1;

    // Ensure uniqueness like blogService
    const uniqueSlugs = slugs.map((s, idx) => {
      if (counts[s] > 1) return `${s}-${idx + 1}`;
      return s;
    });

    return uniqueSlugs;
  } catch (error) {
    console.warn('⚠️ Impossible de récupérer les articles Google Sheets pour le sitemap. Sitemap généré sans articles.', error);
    return [];
  }
}

// Générer le contenu du sitemap
function generateSitemap(articleSlugs) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Ajouter chaque URL
  const allSections = [...sections];

  // Dynamic article URLs
  for (const slug of articleSlugs) {
    allSections.push({ path: `/fr/actualites/${slug}`, priority: '0.8' });
    allSections.push({ path: `/en/actualites/${slug}`, priority: '0.8' });
    // Legacy URLs
    allSections.push({ path: `/fr/blog/${slug}`, priority: '0.5' });
    allSections.push({ path: `/en/blog/${slug}`, priority: '0.5' });
  }

  allSections.forEach(section => {
    const fullUrl = `${siteUrl}${section.path}`;
    
    sitemap += `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${section.priority}</priority>
`;

    // Ajouter les liens alternatifs pour les versions linguistiques
    if (section.path === '/' || section.path === '/fr' || section.path === '/en') {
      // Pages d'accueil
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
`;
      // Ajouter aussi la racine comme version française par défaut
      if (section.path !== '/') {
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
`;
      }
    } else if (section.path.includes('/fr/actualites/') || section.path.includes('/en/actualites/')) {
      const slug = section.path.split('/').pop();
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr/actualites/${escapeXml(slug)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/actualites/${escapeXml(slug)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/fr/actualites/${escapeXml(slug)}" />
`;
    } else if (section.path === '/actualites' || section.path === '/fr/actualites' || section.path === '/en/actualites') {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr/actualites" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/actualites" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/actualites" />
`;
    } else if (section.path.includes('virgile-puyau')) {
      // Page de profil de Virgile Puyau
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/virgile-puyau" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/virgile-puyau" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/virgile-puyau" />
`;
    } else if (section.path.includes('serafine-poyer')) {
      // Page de profil de Sérafine Poyer
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/serafine-poyer" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/serafine-poyer" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/serafine-poyer" />
`;
    } else {
      // Pour les sections avec ancres
      const pathBase = section.path.split('#')[0]; // Obtenir la partie avant le #
      const anchor = section.path.includes('#') ? '#' + section.path.split('#')[1] : '';
      
      const isFrench = pathBase === '/' || pathBase === '/fr';
      const isEnglish = pathBase === '/en';
      
      // Liens vers les versions linguistiques
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr${anchor}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en${anchor}" />
`;
      
      // Ajouter aussi la racine comme version française par défaut
      if (anchor) {
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${anchor}" />
`;
      }
    }
    
    sitemap += `  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Écrire le sitemap dans les fichiers (dist/public pour Netlify, client/public pour dev)
try {
  const articleSlugs = await fetchPublishedArticleSlugs();
  const sitemap = generateSitemap(articleSlugs);

  ensureDirForFile(distSitemapPath);
  fs.writeFileSync(distSitemapPath, sitemap, 'utf8');

  ensureDirForFile(clientSitemapPath);
  fs.writeFileSync(clientSitemapPath, sitemap, 'utf8');

  console.log(`✅ Sitemap généré avec succès`);
  console.log(`   - dist: ${distSitemapPath}`);
  console.log(`   - client: ${clientSitemapPath}`);
  console.log(`   - articles: ${articleSlugs.length}`);
} catch (error) {
  console.error(`❌ Erreur lors de la génération du sitemap:`, error);
  process.exit(1);
}
