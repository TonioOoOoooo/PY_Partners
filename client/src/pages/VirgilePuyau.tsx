// VirgilePuyau.tsx
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
import virgileImage from "@/assets/Virgile.png";

export default function VirgilePuyau() {
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
    <AnimatePresence mode="wait">
      <div className="min-h-screen" key="virgile-page">
        <Helmet>
          <title>
            {language === "fr"
              ? "Maître Virgile Puyau – Avocat en droit social à Paris | PY Partners"
              : "Virgile Puyau – Labor Law Attorney in Paris | PY Partners"}
          </title>
          <meta
            name="description"
            content={
              language === "fr"
                ? "Avocat expérimenté, Virgile Puyau est cofondateur du cabinet PY Partners à Paris, reconnu en droit social pour son accompagnement stratégique des entreprises."
                : "Experienced attorney, Virgile Puyau is co-founder of PY Partners law firm in Paris, recognized for his strategic labor law expertise for companies."
            }
          />
          <link
            rel="canonical"
            href={`https://py-partners.com/${language === "en" ? "en/" : ""}virgile-puyau`}
          />
          <link rel="alternate" hrefLang="fr" href="https://py-partners.com/virgile-puyau" />
          <link
            rel="alternate"
            hrefLang="en"
            href="https://py-partners.com/en/virgile-puyau"
          />
        </Helmet>

        <Header
          onNavClick={{
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
                      src={virgileImage}
                      alt={
                        language === "fr"
                          ? "Maître Virgile Puyau"
                          : "Virgile Puyau, Attorney"
                      }
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10" />
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    {language === "fr" ? "Maître Virgile Puyau" : "Virgile Puyau"}
                  </h1>
                  <p className="text-gray-600 mb-6 font-medium text-lg tracking-wide">
                    {language === "fr"
                      ? "Associé fondateur du cabinet PY Partners"
                      : "Founding Partner at PY Partners"}
                  </p>
                  <div className="prose max-w-none">
                    {language === "fr" ? (
                      <>
                        <p>
                          Virgile Puyau est avocat en droit social depuis près de
                          vingt ans. Associé fondateur du cabinet PY Partners, il
                          accompagne les entreprises françaises et internationales
                          sur l'ensemble des problématiques liées aux relations
                          individuelles et collectives de travail.
                        </p>
                        <p>
                          Il intervient notamment dans des dossiers de
                          réorganisation, de négociation collective, de mobilité
                          internationale ou de contentieux à forts enjeux.
                        </p>
                        <p>
                          Reconnu pour son approche moderne et pragmatique, Virgile
                          Puyau est régulièrement distingué dans les classements
                          juridiques tels que The Legal 500, Best Lawyers, et
                          Décideurs Juridiques.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Virgile Puyau has been a labor law attorney for nearly
                          twenty years. As a founding partner of PY Partners, he
                          advises French and international companies on all issues
                          related to individual and collective labor relations.
                        </p>
                        <p>
                          He is particularly involved in reorganization cases,
                          collective negotiations, international mobility, and
                          high-stakes litigation.
                        </p>
                        <p>
                          Recognized for his modern and pragmatic approach,
                          Virgile Puyau is regularly distinguished in legal
                          rankings such as The Legal 500, Best Lawyers, and
                          Décideurs Juridiques.
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
                    <span>DESS DPRT – Université Panthéon-Assas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3" />
                    <span>DESS Droit du travail & GRH – Université Paris XIII</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3" />
                    <span>Maîtrise de droit social – Université Panthéon-Assas</span>
                  </li>
                </ul>
              </section>

              {/* Distinctions */}
              <section className="mb-16">
                <h2 className="font-heading text-2xl font-bold mb-6 inline-block border-b-2 border-black pb-2">
                  {language === "fr" ? "Distinctions" : "Recognition"}
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-md mb-6 border border-gray-100">
                  <div className="flex items-start">
                    <svg
                      className="w-10 h-10 text-gray-300 mr-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-10 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <div>
                      <blockquote className="italic text-gray-700 text-lg leading-relaxed">
                        {language === "fr"
                          ? "\"L'équipe dirigée par Virgile Puyau se distingue par son approche moderne et pragmatique...\""
                          : "\"The team led by Virgile Puyau stands out for its modern and pragmatic approach...\""}
                      </blockquote>
                      <p className="text-right font-medium mt-4 text-gray-500">
                        – Legal 500, 2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-800 text-lg">
                    {language === "fr"
                      ? "Reconnu dans The Best Lawyers in France™ 2025 pour son expertise en Droit Social"
                      : "Recognized in The Best Lawyers in France™ 2025 for his expertise in Labor Law"}
                  </p>
                </div>
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
                        href="mailto:vpuyau@py-partners.com"
                        className="text-gray-800 hover:text-black font-medium transition-colors duration-200"
                      >
                        vpuyau@py-partners.com
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
                        +33 (0)6 03 93 33 67
                      </span>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="md:col-span-2">
                    <a
                      href="https://fr.linkedin.com/in/virgile-puyau"
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
                <Link href={`${languagePrefix}`}>
                  <a className="bg-black text-white px-8 py-4 rounded-none hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center font-medium tracking-wide">
                    {language === "fr" ? "Découvrir le cabinet" : "Discover the firm"}
                  </a>
                </Link>
                <Link href={`${languagePrefix}#contact`}>
                  <a className="bg-white text-black border border-black px-8 py-4 rounded-none hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center font-medium tracking-wide">
                    {language === "fr"
                      ? "Contacter Virgile Puyau"
                      : "Contact Virgile Puyau"}
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
