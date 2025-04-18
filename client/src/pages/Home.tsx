import { useRef, useEffect } from "react";
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

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
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

  return (
    <AnimatePresence>
      <div className="min-h-screen">
        <Header 
          onNavClick={{
            about: () => scrollToSection(aboutRef),
            expertises: () => scrollToSection(expertisesRef),
            press: () => scrollToSection(pressRef),
            contact: () => scrollToSection(contactRef),
          }}
        />
        <main>
          <Hero 
            onDiscoverClick={() => scrollToSection(expertisesRef)}
            onContactClick={() => scrollToSection(contactRef)}
          />
          <Introduction />
          <section ref={aboutRef} id="a-propos">
            <About />
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
            expertises: () => scrollToSection(expertisesRef),
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