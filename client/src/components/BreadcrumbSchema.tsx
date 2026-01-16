import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Component to add BreadcrumbList structured data for SEO
 * @see https://schema.org/BreadcrumbList
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}

// Helper function to generate breadcrumbs for common pages
export const createBreadcrumbs = {
  home: (): BreadcrumbItem[] => [
    { name: "Accueil", url: "https://py-partners.com/" }
  ],

  actualites: (): BreadcrumbItem[] => [
    { name: "Accueil", url: "https://py-partners.com/" },
    { name: "Actualités", url: "https://py-partners.com/actualites" }
  ],

  article: (articleTitle: string, articleSlug: string): BreadcrumbItem[] => [
    { name: "Accueil", url: "https://py-partners.com/" },
    { name: "Actualités", url: "https://py-partners.com/actualites" },
    { name: articleTitle, url: `https://py-partners.com/actualites/${articleSlug}` }
  ],

  attorney: (name: string, slug: string): BreadcrumbItem[] => [
    { name: "Accueil", url: "https://py-partners.com/" },
    { name: name, url: `https://py-partners.com/${slug}` }
  ],

  legal: (pageName: string, slug: string): BreadcrumbItem[] => [
    { name: "Accueil", url: "https://py-partners.com/" },
    { name: pageName, url: `https://py-partners.com/${slug}` }
  ]
};
