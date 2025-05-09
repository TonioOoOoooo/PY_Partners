import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from "framer-motion";
import EnhancedExpertiseCard from "@/components/common/EnhancedExpertiseCard";

export default function Expertises() {
  const { t } = useLanguage();
  const { reveal } = useScrollReveal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      reveal(sectionRef.current);
    }
  }, [reveal]);

  const expertiseAreas = [
    {
      title: t('expertises.areas.directors.title'),
      description: t('expertises.areas.directors.description')
    },
    {
      title: t('expertises.areas.individual.title'),
      description: t('expertises.areas.individual.description')
    },
    {
      title: t('expertises.areas.restructuring.title'),
      description: t('expertises.areas.restructuring.description')
    },
    {
      title: t('expertises.areas.negotiation.title'),
      description: t('expertises.areas.negotiation.description')
    },
    {
      title: t('expertises.areas.ma.title'),
      description: t('expertises.areas.ma.description')
    },
    {
      title: t('expertises.areas.litigation.title'),
      description: t('expertises.areas.litigation.description')
    },
    {
      title: t('expertises.areas.security.title'),
      description: t('expertises.areas.security.description')
    },
    {
      title: t('expertises.areas.mobility.title'),
      description: t('expertises.areas.mobility.description')
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-6">{t('expertises.title')}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('expertises.description')}
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
{expertiseAreas.map((area, index) => (
  <EnhancedExpertiseCard
    key={index}
    title={area.title}
    description={area.description}
    index={index}
    // No onLearnMore here, but could add a modal or details in the future
  />
))}
        </motion.div>
      </div>
    </section>
  );
}
