import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from "framer-motion";
import PremiumTestimonial from './PremiumTestimonial';

export default function EnhancedPressSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: t('press.testimonials.first.quote'),
      source: t('press.testimonials.first.source')
    },
    {
      quote: t('press.testimonials.second.quote'),
      source: t('press.testimonials.second.source')
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} id="presse" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header with refined animation */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="font-heading text-3xl md:text-4xl text-primary font-bold mb-6"
            variants={itemVariants}
          >
            {t('press.title')}
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 text-lg"
            variants={itemVariants}
          >
            {t('press.description')}
          </motion.p>
          
          {/* Decorative element */}
          <motion.div 
            className="absolute left-1/2 -bottom-6 w-16 h-px bg-secondary transform -translate-x-1/2"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Testimonials grid with new premium testimonial component */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <PremiumTestimonial
              key={index}
              quote={testimonial.quote}
              source={testimonial.source}
              index={index}
            />
          ))}
        </div>

        {/* Recognition section with refined animation */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block premium-shadow bg-white p-6 rounded-sm border border-gray-100"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)' }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-700 mb-3 font-medium">{t('press.recognition')}</p>
            
            {/* Badge or award icon */}
            <div className="flex justify-center items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Best Lawyers - 2025</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}