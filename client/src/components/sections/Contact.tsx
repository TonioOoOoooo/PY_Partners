import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiRequest } from '@/lib/queryClient'; // Utilisons l'utilitaire apiRequest existant
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { reveal } = useScrollReveal();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (sectionRef.current) {
      reveal(sectionRef.current);
    }
  }, [reveal]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  // Utiliser apiRequest pour envoyer les données à notre propre API qui fait office de proxy
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('language') === 'Français' ? "Succès" : "Success",
        description: t('language') === 'Français' 
          ? "Votre message a été envoyé. Nous vous contacterons bientôt."
          : "Your message has been sent. We'll contact you soon.",
      });
      reset();
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: t('language') === 'Français' ? "Erreur" : "Error",
        description: t('language') === 'Français'
          ? `Échec de l'envoi du message: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
          : `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormValues) => {
  // Suivi Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_form_submission', {
      'event_category': 'engagement',
      'event_label': 'Contact Form'
    });
  }
    mutation.mutate(data);
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={variants}
            >
              <h2 className="font-heading text-3xl text-primary font-bold mb-8">{t('contact.title')}</h2>
              <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-light mb-10">
                {t('contact.description')}
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-2">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    {...register('name')} 
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 rounded-none`} 
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 font-medium mb-2">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register('email')} 
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 rounded-none`} 
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 font-medium mb-2">{t('contact.form.phone')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    {...register('phone')} 
                    className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 rounded-none`} 
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 font-medium mb-2">{t('contact.form.message')}</label>
                  <textarea 
                    id="message" 
                    {...register('message')} 
                    rows={5} 
                    className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 rounded-none`} 
                    placeholder={t('contact.form.messagePlaceholder')}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-black hover:bg-black/80 text-white font-medium py-4 px-6 rounded-none transition duration-300 uppercase tracking-wide text-sm"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('language') === 'Français' ? 'Traitement en cours...' : 'Processing...'}
                      </span>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={variants}
            >
              <div className="bg-gray-50 premium-shadow p-10 h-full">
                <h3 className="font-heading text-2xl text-primary font-bold mb-8">{t('contact.info.title')}</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="text-black mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-primary text-sm uppercase tracking-wider font-medium mb-2">{t('contact.info.address.label')}</h4>
                      <p className="text-gray-600">{t('contact.info.address.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-black mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-primary text-sm uppercase tracking-wider font-medium mb-2">{t('contact.info.email.label')}</h4>
                      <a href="mailto:contact@py-partners.com" className="text-gray-600 hover:text-black transition-colors duration-200">{t('contact.info.email.value')}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-black mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-primary text-sm uppercase tracking-wider font-medium mb-2">{t('contact.info.direct.label')}</h4>
                      <p className="text-gray-600 mb-2">{t('contact.info.direct.serafine').replace(':', '')}</p>
                      <p className="text-gray-600">{t('contact.info.direct.virgile').replace(':', '')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <div className="overflow-hidden premium-shadow">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10496.856055671008!2d2.3195280356631173!3d48.86872899687341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2f9719f48f%3A0xd4c836ef33c117e8!2s13%20Rue%20Royale%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1714597513644!5m2!1sfr!2sfr" 
                      width="100%" 
                      height="280" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="PY Partners office location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}