import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * Component to add FAQ structured data for SEO
 * @see https://schema.org/FAQPage
 */
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}

/**
 * Predefined FAQs for PY Partners law firm
 */
export const pyPartnersFAQs: FAQItem[] = [
  {
    question: "Quels sont les domaines d'expertise de PY Partners ?",
    answer: "PY Partners est un cabinet d'avocats spécialisé en droit social, avec une expertise en accompagnement des dirigeants (négociation de packages, cumul contrat de travail/mandat social), conseil aux entreprises (restructurations, PSE, ruptures conventionnelles collectives), et gestion des contentieux sociaux (contentieux prud'homal, pénal et administratif)."
  },
  {
    question: "Où se situe le cabinet PY Partners ?",
    answer: "Le cabinet PY Partners est situé au 13 Rue Royale, 75008 Paris, dans le 8ème arrondissement de Paris, à proximité de la Place de la Concorde et de la Madeleine."
  },
  {
    question: "Comment prendre rendez-vous avec PY Partners ?",
    answer: "Vous pouvez prendre rendez-vous avec PY Partners en nous contactant par téléphone au +33 6 06 39 36 67, par email à contact@py-partners.com, ou en remplissant le formulaire de contact sur notre site web. Nous répondons généralement sous 24 heures."
  },
  {
    question: "PY Partners accompagne-t-il les particuliers ou uniquement les entreprises ?",
    answer: "PY Partners accompagne principalement les entreprises et les dirigeants. Nous intervenons pour les sociétés de toutes tailles dans leurs problématiques de droit social, restructurations, relations collectives et contentieux. Nous conseillons également les dirigeants sur leurs packages de rémunération et statuts."
  },
  {
    question: "Quels types de contentieux PY Partners gère-t-il ?",
    answer: "PY Partners gère tous types de contentieux sociaux : contentieux prud'homal (licenciements, harcèlement, discrimination), contentieux pénal du travail (délit d'entrave, mise en danger), et contentieux administratif (contrôle URSSAF, inspection du travail). Nous assurons une défense stratégique des intérêts de nos clients."
  },
  {
    question: "PY Partners intervient-il dans les restructurations d'entreprise ?",
    answer: "Oui, PY Partners est spécialisé dans l'accompagnement des entreprises lors de restructurations : Plans de Sauvegarde de l'Emploi (PSE), Ruptures Conventionnelles Collectives (RCC), négociations avec les partenaires sociaux, et mise en place de mesures d'accompagnement des salariés."
  },
  {
    question: "Les avocats de PY Partners parlent-ils anglais ?",
    answer: "Oui, les avocats de PY Partners sont bilingues français-anglais et peuvent accompagner des clients internationaux dans leurs problématiques de droit social français. Nous avons l'habitude de travailler avec des groupes multinationaux."
  },
  {
    question: "Quel est le délai de réponse de PY Partners ?",
    answer: "PY Partners s'engage à répondre à toute demande sous 24 heures ouvrées. En cas d'urgence (contentieux imminent, contrôle en cours), nous mettons en place une réponse prioritaire et pouvons intervenir dans les heures qui suivent."
  },
  {
    question: "PY Partners propose-t-il des formations en droit social ?",
    answer: "Oui, PY Partners propose des formations sur-mesure pour les entreprises et les DRH sur des thématiques de droit social : gestion des ruptures, prévention des risques psychosociaux, relations avec les IRP, veille juridique. Contactez-nous pour un devis personnalisé."
  },
  {
    question: "Comment sont calculés les honoraires de PY Partners ?",
    answer: "Les honoraires de PY Partners sont fixés en fonction de la complexité du dossier, du temps passé et des enjeux. Nous proposons différents modes de facturation : honoraires au temps passé, forfait pour certaines prestations, ou success fee pour les contentieux. Un devis détaillé est toujours fourni avant le début de la mission."
  }
];

/**
 * Component with predefined PY Partners FAQs
 */
export function PyPartnersFAQSchema() {
  return <FAQSchema faqs={pyPartnersFAQs} />;
}
