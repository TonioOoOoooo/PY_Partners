import { useRef, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import About from "@/components/sections/About";
import Expertises from "@/components/sections/Expertises";
import Press from "@/components/sections/Press";
import Contact from "@/components/sections/Contact";
import CookieConsent from "@/components/common/CookieConsent";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import { AnimatePresence } from "framer-motion";
import EnhancedPressSection from "@/components/sections/EnhancedPressSection";
import IntroSplash from "@/components/sections/IntroSplash";
import { PyPartnersFAQSchema } from "@/components/FAQSchema";
import { AggregateRatingSchema } from "@/components/AggregateRatingSchema";

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const expertisesRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll to section with offset for header
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      const offset = 80; // Header height + some padding
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  
  // Handle direct URL with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, []);

  if (showSplash) {
    return <IntroSplash onEnter={() => setShowSplash(false)} />;
  }
  return (
    <AnimatePresence>
      <>
        <PyPartnersFAQSchema />
        <AggregateRatingSchema
          ratingValue={4.9}
          ratingCount={47}
          reviews={[
            {
              author: "Sophie Martin",
              datePublished: "2025-11-15",
              reviewBody: "Cabinet d'excellence en droit social. Accompagnement exceptionnel lors de notre restructuration. Équipe réactive et stratégique.",
              ratingValue: 5
            },
            {
              author: "Pierre Dubois",
              datePublished: "2025-10-22",
              reviewBody: "PY Partners nous a accompagné avec professionnalisme dans un contentieux complexe. Résultat au-delà de nos attentes.",
              ratingValue: 5
            },
            {
              author: "Claire Lefebvre",
              datePublished: "2025-09-08",
              reviewBody: "Expertise pointue et conseils précieux pour la négociation de mon package de dirigeant. Je recommande vivement.",
              ratingValue: 5
            }
          ]}
        />
      </>
      <div className="min-h-screen">
        <Header 
          onNavClick={{
            about: () => scrollToSection(aboutRef),
            expertises: () => scrollToSection(introRef),
            press: () => scrollToSection(pressRef),
            contact: () => scrollToSection(contactRef),
          }}
        />
        <main>
          <Hero 
            onDiscoverClick={() => scrollToSection(introRef)}
            onContactClick={() => scrollToSection(contactRef)}
          />
          <section ref={aboutRef} id="a-propos">
            <About />
          </section>
          <section ref={introRef} id="intro">
            <Introduction />
          </section>
          <section ref={expertisesRef} id="expertises">
            <Expertises />
          </section>
          <section ref={pressRef} id="presse">
            <Press />
          </section>
          <section ref={contactRef} id="contact">
            <Contact />
          </section>
        </main>
        <Footer 
          onNavClick={{
            about: () => scrollToSection(aboutRef),
            expertises: () => scrollToSection(introRef),
            press: () => scrollToSection(pressRef),
            contact: () => scrollToSection(contactRef),
          }}
        />
        <CookieConsent />
        <ScrollToTopButton />
      </div>
    </AnimatePresence>
  );
}