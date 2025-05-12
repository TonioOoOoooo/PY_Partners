// SerafinePoyer.tsx
import { useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/common/CookieConsent";
import { useLanguage } from "@/hooks/useLanguage";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { getLanguagePrefix } from "@/lib/utils";

// Import direct de l'image
import serafineImage from "@/assets/Serafine.png";

export default function SerafinePoyer() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useLocation();
  const languagePrefix = getLanguagePrefix(language);
  const aboutRef = useRef<HTMLDivElement>(null);
  const expertisesRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <AnimatePresence>
      <div className="min-h-screen">
        <Helmet>
          <title>
            {language === "fr"
              ? "Maître Sérafine Poyer – Avocate en droit social à Paris | PY Partners"
              : "Sérafine Poyer – Labor Law Attorney in Paris | PY Partners"}
          </title>
          <meta
            name="description"
            content={
              language === "fr"
                ? "Avocate expérimentée, Sérafine Poyer est cofondatrice du cabinet PY Partners à Paris, reconnue pour son expertise dans l'accompagnement sur-mesure des dirigeants et mandataires sociaux."
                : "Experienced attorney, Sérafine Poyer is co-founder of PY Partners law firm in Paris, recognized for her expertise in supporting executives and corporate officers."
            }
          />
          <link
            rel="canonical"
            href={`https://py-partners.com/${language === "en" ? "en/" : ""}serafine-poyer`}
          />
          <link rel="alternate" hrefLang="fr" href="https://py-partners.com/serafine-poyer" />
          <link
            rel="alternate"
            hrefLang="en"
            href="https://py-partners.com/en/serafine-poyer"
          />
        </Helmet>

        <Header
          onNavClick={{
            home: () => setLocation(languagePrefix),
            about: () => setLocation(`${languagePrefix}#a-propos`),
            expertises: () => setLocation(`${languagePrefix}#expertises`),
            press: () => setLocation(`${languagePrefix}#presse`),
            contact: () => setLocation(`${languagePrefix}#contact`),
          }}
        />

        <main className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              {/* Profil */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
                <div className="md:w-2/5">
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                      src={serafineImage}
                      alt={
                        language === "fr"
                          ? "Maître Sérafine Poyer"
                          : "Sérafine Poyer, Attorney"
                      }
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10" />
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    {language === "fr" ? "Maître Sérafine Poyer" : "Sérafine Poyer"}
                  </h1>
                  <p className="text-gray-600 mb-6 font-medium text-lg tracking-wide">
                    {language === "fr"
                      ? "Associée fondatrice du cabinet PY Partners"
                      : "Founding Partner at PY Partners"}
                  </p>
                  <div className="prose max-w-none">
                    {language === "fr" ? (
                      <>
                        <p>
                          Sérafine Poyer dispose d'une expertise renommée en droit
                          social, tant en conseil qu'en contentieux. Elle a plus
                          particulièrement développé une forte notoriété dans
                          l'accompagnement sur-mesure des sorties de Dirigeants et
                          Mandataires sociaux et la sécurisation des packages, en
                          collaboration étroite avec des experts en contentieux de
                          haut bilan.
                        </p>
                        <p>
                          Associée fondatrice du cabinet PY Partners, elle accompagne
                          les entreprises françaises et internationales dans leurs
                          problématiques de droit social, avec une approche stratégique
                          et opérationnelle.
                        </p>
                        <p>
                          Sa connaissance approfondie des enjeux business et sa
                          capacité à proposer des solutions pragmatiques en font une
                          interlocutrice privilégiée pour les directions juridiques et
                          RH.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Sérafine Poyer has renowned expertise in labor law, both in
                          advisory and litigation. She has particularly developed a
                          strong reputation in the tailor-made support for the departures
                          of Executives and Corporate Officers and the securing of
                          packages, in close collaboration with high-level litigation
                          experts.
                        </p>
                        <p>
                          As a founding partner of PY Partners, she supports French and
                          international companies in their labor law issues, with a
                          strategic and operational approach.
                        </p>
                        <p>
                          Her in-depth knowledge of business challenges and her ability
                          to propose pragmatic solutions make her a privileged
                          interlocutor for legal and HR departments.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Formation */}
              <section className="mb-16 bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="font-heading text-2xl font-bold mb-6 inline-block border-b-2 border-black pb-2">
                  {language === "fr" ? "Formation" : "Education"}
                </h2>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3" />
                    <span>Barreau de Paris – Promotion 2008</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3" />
                    <span>DESS DPS – Université de Montpellier</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3" />
                    <span>Maîtrise de droit social – Université Panthéon-Assas</span>
                  </li>
                </ul>
              </section>

              {/* Domaines d'expertise */}
              <section className="mb-16 bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="font-heading text-2xl font-bold mb-6 inline-block border-b-2 border-black pb-2">
                  {language === "fr"
                    ? "Domaines d'expertise"
                    : "Areas of Expertise"}
                </h2>
                <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                  {[
                    language === "fr"
                      ? "Accompagnement des entrées et sorties de dirigeants"
                      : "Support for executive entries and departures",
                    language === "fr"
                      ? "Négociation de packages"
                      : "Package negotiation",
                    language === "fr"
                      ? "Structuration de la rémunération"
                      : "Remuneration structuring",
                    language === "fr"
                      ? "Cumul contrat de travail / mandat social"
                      : "Combination of employment contract / corporate mandate",
                    language === "fr"
                      ? "Contentieux à forts enjeux"
                      : "High-stakes litigation",
                  ].map((text, i) => (
                    <li
                      key={i}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                    >
                      <span className="w-2 h-2 bg-black rounded-full mr-3" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Coordonnées */}
              <section className="mb-16 bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="font-heading text-2xl font-bold mb-6 inline-block border-b-2 border-black pb-2">
                  {language === "fr" ? "Coordonnées directes" : "Contact Information"}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {language === "fr" ? "Email" : "Email"}
                      </p>
                      <a
                        href="mailto:spoyer@py-partners.com"
                        className="text-gray-800 hover:text-black font-medium transition-colors duration-200"
                      >
                        spoyer@py-partners.com
                      </a>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {language === "fr" ? "Téléphone" : "Phone"}
                      </p>
                      <span className="text-gray-800 font-medium">
                        +33 (0)6 64 12 55 58
                      </span>
                    </div>
                  </div>
                  {/* LinkedIn */}
                  <div className="md:col-span-2">
                    <a
                      href="https://fr.linkedin.com/in/s%C3%A9rafine-poyer-0839a136"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-3 bg-[#0A66C2] text-white rounded-md hover:bg-[#004182] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <svg
                        className="h-5 w-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                      <span className="text-base font-medium">
                        {language === "fr"
                          ? "Voir le profil LinkedIn"
                          : "View LinkedIn Profile"}
                      </span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Boutons bas de page */}
              <div className="flex flex-col md:flex-row gap-5 justify-center">
                <Link href={languagePrefix}>
                  <a className="bg-black text-white px-8 py-4 rounded-none hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center font-medium tracking-wide">
                    {language === "fr" ? "Découvrir le cabinet" : "Discover the firm"}
                  </a>
                </Link>
                <Link href={`${languagePrefix}#contact`}>
                  <a className="bg-white text-black border border-black px-8 py-4 rounded-none hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center font-medium tracking-wide">
                    {language === "fr"
                      ? "Contacter Sérafine Poyer"
                      : "Contact Sérafine Poyer"}
                  </a>
                </Link>
                <Link href={`${languagePrefix}#a-propos`}>
                  <a className="bg-gray-100 text-black px-8 py-4 rounded-none hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center font-medium tracking-wide">
                    {language === "fr" ? "Retour à l'équipe" : "Back to the team"}
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer
          onNavClick={{
            about: () => setLocation(`${languagePrefix}#a-propos`),
            expertises: () => setLocation(`${languagePrefix}#expertises`),
            press: () => setLocation(`${languagePrefix}#presse`),
            contact: () => setLocation(`${languagePrefix}#contact`),
          }}
        />
        <CookieConsent />
      </div>
    </AnimatePresence>
  );
}
