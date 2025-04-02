import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();
  const { reveal } = useScrollReveal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      reveal(sectionRef.current);
    }
  }, [reveal]);

  const partners = [
    {
      name: t('about.serafine.name'),
      role: t('about.serafine.role'),
      bio: t('about.serafine.bio'),
      education: [
        'Avocat au Barreau de Paris',
        'DESS DPS – Université de Montpellier',
        'Maîtrise de droit social – Université Panthéon-Assas',
      ],
      email: 'spoyer@py-partners.com',
      phone: '+ 33 (0) 6 64 12 55 58',
      image: 'https://py-partners.com/wp-content/uploads/2025/03/serafine-poyer-1.jpg'
    },
    {
      name: t('about.virgile.name'),
      role: t('about.virgile.role'),
      bio: t('about.virgile.bio'),
      education: [
        'Avocat au Barreau de Paris',
        'DESS DPRT – Université Panthéon-Assas',
        'DESS Droit du travail et GRH – Université Paris XIII',
        'Maîtrise de droit social – Université Panthéon-Assas',
      ],
      email: 'vpuyau@py-partners.com',
      phone: '+ 33 (0) 6 03 93 33 67',
      image: 'https://py-partners.com/wp-content/uploads/2025/03/VPU-Photo-CV-BW.png'
    }
  ];

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-6">{t('about.title')}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={variants}
            >
              <div className="relative h-80">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent py-6 px-8">
                  <h3 className="font-heading text-2xl text-white font-bold">{partner.name}</h3>
                  <p className="text-gray-200 font-light">{partner.role}</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  {partner.bio}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-3">
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-2">
                      {index === 0 ? t('about.serafine.education') : t('about.virgile.education')}
                    </h4>
                    <ul className="text-gray-700 space-y-1">
                      {partner.education.map((edu, eduIndex) => (
                        <li key={eduIndex}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-2">
                      {index === 0 ? t('about.serafine.contact') : t('about.virgile.contact')}
                    </h4>
                    <a 
                      href={`mailto:${partner.email}`} 
                      className="text-secondary hover:text-secondary/80 transition-colors duration-200"
                    >
                      {partner.email}
                    </a>
                    <p className="text-gray-700">{partner.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
