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
  // Ensure dates are in ISO 8601 format
  const formatDate = (date: string) => {
    if (!date) return new Date().toISOString();
    // If already ISO format, return as is
    if (date.includes('T')) return date;
    // Otherwise, convert to ISO
    return new Date(date).toISOString();
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "datePublished": formatDate(datePublished),
    "dateModified": formatDate(dateModified || datePublished),
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://py-partners.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PY Partners",
      "url": "https://py-partners.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://py-partners.com/img/logo.png",
        "width": 600,
        "height": 60
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
  // Ensure dates are in ISO 8601 format
  const formatDate = (date: string) => {
    if (!date) return new Date().toISOString();
    // If already ISO format, return as is
    if (date.includes('T')) return date;
    // Otherwise, convert to ISO
    return new Date(date).toISOString();
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "datePublished": formatDate(datePublished),
    "dateModified": formatDate(dateModified || datePublished),
    "author": {
      "@type": "Organization",
      "name": "PY Partners",
      "url": "https://py-partners.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PY Partners",
      "url": "https://py-partners.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://py-partners.com/img/logo.png",
        "width": 600,
        "height": 60
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
