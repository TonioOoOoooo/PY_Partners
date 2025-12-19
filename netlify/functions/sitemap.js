const siteUrl = 'https://py-partners.com';
const SPREADSHEET_ID = '1HjBvxTWUqfWDM8iAZynvo5KDP2XrWABkFSQgV7RCMw0';
const SHEET_NAME = 'Articles';

const sections = [
  { path: '/', priority: '1.0' },
  { path: '/fr', priority: '1.0' },
  { path: '/en', priority: '0.9' },
  { path: '/actualites', priority: '0.9' },
  { path: '/fr/actualites', priority: '0.9' },
  { path: '/en/actualites', priority: '0.9' },
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
  { path: '/virgile-puyau', priority: '0.9' },
  { path: '/fr/virgile-puyau', priority: '0.9' },
  { path: '/en/virgile-puyau', priority: '0.9' },
  { path: '/serafine-poyer', priority: '0.9' },
  { path: '/fr/serafine-poyer', priority: '0.9' },
  { path: '/en/serafine-poyer', priority: '0.9' },
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
    'PUBLIER',
    'PUBLIÉ',
    'PUBLIE',
    'PUBLISHED',
    'PUBLISH',
    'OUI',
    'YES',
    'TRUE',
    'VRAI',
    '1',
    'ON',
    'OK',
  ];

  return publishedStatuses.some(
    (s) =>
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
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    SHEET_NAME,
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Sheets responded with ${res.status}`);
  }

  const text = await res.text();
  const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
  const data = JSON.parse(jsonStr);
  const rows = data?.table?.rows;
  if (!Array.isArray(rows)) return [];

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

  return slugs.map((s, idx) => {
    if (counts[s] > 1) return `${s}-${idx + 1}`;
    return s;
  });
}

function generateSitemap({ articleSlugs, lastMod }) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  const allSections = [...sections];

  for (const slug of articleSlugs) {
    allSections.push({ path: `/fr/actualites/${slug}`, priority: '0.8' });
    allSections.push({ path: `/en/actualites/${slug}`, priority: '0.8' });
    allSections.push({ path: `/fr/blog/${slug}`, priority: '0.5' });
    allSections.push({ path: `/en/blog/${slug}`, priority: '0.5' });
  }

  for (const section of allSections) {
    const fullUrl = `${siteUrl}${section.path}`;

    sitemap += `  <url>\n`;
    sitemap += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
    sitemap += `    <lastmod>${lastMod}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>${section.priority}</priority>\n`;

    if (section.path === '/' || section.path === '/fr' || section.path === '/en') {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />\n`;
      if (section.path !== '/') {
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />\n`;
      }
    } else if (
      section.path.includes('/fr/actualites/') ||
      section.path.includes('/en/actualites/')
    ) {
      const slug = section.path.split('/').pop();
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr/actualites/${escapeXml(
        slug,
      )}" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/actualites/${escapeXml(
        slug,
      )}" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/fr/actualites/${escapeXml(
        slug,
      )}" />\n`;
    } else if (
      section.path === '/actualites' ||
      section.path === '/fr/actualites' ||
      section.path === '/en/actualites'
    ) {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr/actualites" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/actualites" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/actualites" />\n`;
    } else if (section.path.includes('virgile-puyau')) {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/virgile-puyau" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/virgile-puyau" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/virgile-puyau" />\n`;
    } else if (section.path.includes('serafine-poyer')) {
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/serafine-poyer" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/serafine-poyer" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/serafine-poyer" />\n`;
    } else {
      const pathBase = section.path.split('#')[0];
      const anchor = section.path.includes('#') ? `#${section.path.split('#')[1]}` : '';
      sitemap += `    <xhtml:link rel="alternate" hreflang="fr" href="${siteUrl}/fr${anchor}" />\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en${anchor}" />\n`;
      if (anchor) {
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${anchor}" />\n`;
      }

      void pathBase;
    }

    sitemap += `  </url>\n`;
  }

  sitemap += `</urlset>`;
  return sitemap;
}

exports.handler = async () => {
  try {
    const lastMod = new Date().toISOString().split('T')[0];

    let articleSlugs = [];
    try {
      articleSlugs = await fetchPublishedArticleSlugs();
    } catch (error) {
      console.warn(
        'Impossible de récupérer les articles Google Sheets pour le sitemap. Sitemap servi sans articles.',
        error,
      );
    }

    const body = generateSitemap({ articleSlugs, lastMod });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control':
          'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
      body,
    };
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
      },
      body: 'Erreur lors de la génération du sitemap',
    };
  }
};
