import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
}

interface AggregateRatingSchemaProps {
  ratingValue: number;
  ratingCount: number;
  bestRating?: number;
  worstRating?: number;
  reviews?: Review[];
}

/**
 * Component to add AggregateRating structured data for the law firm
 * @see https://schema.org/AggregateRating
 */
export function AggregateRatingSchema({
  ratingValue,
  ratingCount,
  bestRating = 5,
  worstRating = 1,
  reviews = []
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "PY Partners",
    "url": "https://py-partners.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "ratingCount": ratingCount,
      "bestRating": bestRating,
      "worstRating": worstRating
    },
    ...(reviews.length > 0 && {
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "datePublished": review.datePublished,
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.ratingValue,
          "bestRating": bestRating
        }
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Component to add a single Review structured data
 * @see https://schema.org/Review
 */
export function ReviewSchema({
  author,
  datePublished,
  reviewBody,
  ratingValue,
  bestRating = 5
}: Review & { bestRating?: number }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LegalService",
      "name": "PY Partners",
      "url": "https://py-partners.com"
    },
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "reviewBody": reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": ratingValue,
      "bestRating": bestRating
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
