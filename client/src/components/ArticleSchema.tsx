import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
  title: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}

/**
 * Component to add Article structured data for SEO
 * @see https://schema.org/Article
 */
export function ArticleSchema({
  title,
  description,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "PY Partners",
  url
}: ArticleSchemaProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://py-partners.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PY Partners",
      "logo": {
        "@type": "ImageObject",
        "url": "https://py-partners.com/img/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
}

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  tags?: string[];
  url: string;
}

/**
 * Component for BlogPosting structured data (more specific than Article)
 * @see https://schema.org/BlogPosting
 */
export function BlogPostingSchema({
  title,
  description,
  imageUrl,
  datePublished,
  dateModified,
  category,
  tags = [],
  url
}: BlogPostingSchemaProps) {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": "PY Partners",
      "url": "https://py-partners.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PY Partners",
      "logo": {
        "@type": "ImageObject",
        "url": "https://py-partners.com/img/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": category,
    "keywords": tags.join(", ")
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(blogPostingSchema)}
      </script>
    </Helmet>
  );
}
