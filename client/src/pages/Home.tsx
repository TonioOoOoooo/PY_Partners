import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import About from "@/components/sections/About";
import Expertises from "@/components/sections/Expertises";
import Press from "@/components/sections/Press";
import Contact from "@/components/sections/Contact";
import CookieConsent from "@/components/common/CookieConsent";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const expertisesRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
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
    </div>
  );
}
