import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from "framer-motion";
import { TeamMemberImage } from '@/components/common/SEOImage'; // Importez le composant

// Import direct des images
import serafineImage from '@/assets/Serafine.png';
import virgileImage from '@/assets/Virgile.png';

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
        'Barreau de Paris - Promotion 2008',
        'DESS DPS – Université de Montpellier',
        'Maîtrise de droit social – Université Panthéon-Assas',
      ],
      email: 'spoyer@py-partners.com',
      phone: '+ 33 (0) 6 64 12 55 58',
      image: serafineImage
    },
    {
      name: t('about.virgile.name'),
      role: t('about.virgile.role'),
      bio: t('about.virgile.bio'),
      education: [
        'Barreau de Paris - Promotion 2008',
        'DESS DPRT – Université Panthéon-Assas',
        'DESS Droit du travail et GRH – Université Paris XIII',
        'Maîtrise de droit social – Université Panthéon-Assas',
      ],
      email: 'vpuyau@py-partners.com',
      phone: '+ 33 (0) 6 03 93 33 67',
      image: virgileImage
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
    <section ref={sectionRef} id="a-propos" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-6">{t('about.title')}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white premium-shadow premium-border overflow-hidden hover:translate-y-[-5px] transition-all duration-300"
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={variants}
            >
              <div className="relative h-[400px]">
		{/* Remplacez l'ancienne balise img par TeamMemberImage */}
                <TeamMemberImage 
                  src={partner.image}
                  name={partner.name}
                  role={partner.role}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent py-8 px-8">
                  <h3 className="font-heading text-2xl text-white font-bold">{partner.name}</h3>
                  <p className="text-gray-200 font-light tracking-wide">{partner.role}</p>
                </div>
              </div>
              <div className="p-10">
                <p className="text-gray-700 mb-8">
                  {partner.bio}
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                      {index === 0 ? t('about.serafine.education') : t('about.virgile.education')}
                    </h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      {partner.education.map((edu, eduIndex) => (
                        <li key={eduIndex} className="flex items-start">
                          <span className="text-gray-800 mr-2">•</span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                      {index === 0 ? t('about.serafine.contact') : t('about.virgile.contact')}
                    </h4>
                    <a 
                      href={`mailto:${partner.email}`} 
                      className="text-gray-800 hover:text-secondary transition-colors duration-200 block mb-1"
                    >
                      {partner.email}
                    </a>
                    <p className="text-gray-700 text-sm">{partner.phone}</p>
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