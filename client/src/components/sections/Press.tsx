import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from "framer-motion";

export default function Press() {
  const { t } = useLanguage();
  const { reveal } = useScrollReveal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      reveal(sectionRef.current);
    }
  }, [reveal]);

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

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-600 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-6">{t('press.title')}</h2>
          <p className="text-gray-300 text-lg">
            {t('press.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-500 p-8 rounded-lg relative"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={variants}
            >
              <svg className="absolute top-4 left-4 h-10 w-10 text-secondary opacity-30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="pt-8">
                <p className="text-gray-200 mb-6 italic font-accent text-lg">
                  {testimonial.quote}
                </p>
                <div className="text-secondary font-semibold">{testimonial.source}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-gray-500 p-4 rounded-lg">
            <p className="text-gray-300 mb-3">{t('press.recognition')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}