// Script pour générer automatiquement le sitemap
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sitemapPath = path.join(projectRoot, 'client', 'public', 'sitemap.xml');

// Configuration du site
const siteUrl = 'https://py-partners.com';
const lastMod = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
const sections = [
  { path: '/', priority: '1.0' },
  { path: '/en', priority: '0.9' },
  { path: '/#a-propos', priority: '0.8' },
  { path: '/en#a-propos', priority: '0.8' },
  { path: '/#expertises', priority: '0.8' },
  { path: '/en#expertises', priority: '0.8' },
  { path: '/#presse', priority: '0.7' },
  { path: '/en#presse', priority: '0.7' },
  { path: '/#contact', priority: '0.9' },
  { path: '/en#contact', priority: '0.9' }
];

// Générer le contenu du sitemap
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Ajouter chaque URL
  sections.forEach(section => {
    const fullUrl = `${siteUrl}${section.path}`;
    
    sitemap += `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${section.priority}</priority>
`;

    // Ajouter les liens alternatifs pour les versions linguistiques
    if (section.path === '/' || section.path === '/en') {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
`;
    } else {
      // Pour les sections avec ancres
      const isFrench = !section.path.startsWith('/en');
      const frPath = isFrench ? section.path : section.path.replace('/en', '');
      const enPath = isFrench ? `/en${section.path}` : section.path;
      
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}${frPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${enPath}" />
`;
    }
    
    sitemap += `  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Écrire le sitemap dans le fichier
try {
  const sitemap = generateSitemap();
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`✅ Sitemap généré avec succès à ${sitemapPath}`);
} catch (error) {
  console.error(`❌ Erreur lors de la génération du sitemap:`, error);
  process.exit(1);
}
