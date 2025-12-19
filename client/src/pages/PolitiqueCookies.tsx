import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';

const PolitiqueCookies: React.FC = () => {
  const { t, language } = useLanguage();
  const currentDate = "6 mai 2025"; // À mettre à jour si nécessaire

  // Contenu en français
  const contentFR = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Politique de Gestion des Cookies</h1>
      <p className="mb-6">Dernière mise à jour : {currentDate}</p>
      
      <h2 className="text-2xl font-bold mt-10 mb-4">Qu'est-ce qu'un cookie ?</h2>
      <p className="mb-6">
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site ou de la consultation d'une publicité. Il a pour but de collecter des informations relatives à votre navigation et de vous adresser des services personnalisés. Les cookies sont gérés par votre navigateur internet.
      </p>
      <p className="mb-6">
        Le site https://py-partners.com/ (ci-après "le Site") utilise des cookies pour améliorer votre expérience de navigation, assurer son bon fonctionnement, mesurer son audience et, le cas échéant, vous proposer des contenus adaptés.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Quels types de cookies utilisons-nous ?</h2>
      <p className="mb-6">
        Nous utilisons différents types de cookies sur notre Site :
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Cookies strictement nécessaires (exemptés de consentement) :</h3>
      <p className="mb-6">
        Ces cookies sont indispensables au bon fonctionnement du Site et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement configurés en réponse à des actions que vous effectuez et qui correspondent à une demande de services, comme la configuration de vos préférences de confidentialité, la connexion ou le remplissage de formulaires. Vous pouvez configurer votre navigateur pour bloquer ou être alerté(e) de l'utilisation de ces cookies, mais certaines parties du site pourraient alors ne pas fonctionner.<br />
        Exemple : Cookies de session pour maintenir votre session active, cookies pour enregistrer votre consentement aux cookies.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Cookies analytiques ou de mesure d'audience (soumis à votre consentement) :</h3>
      <p className="mb-6">
        Ces cookies nous permettent de recueillir des informations sur la manière dont les visiteurs utilisent notre Site (par exemple, le nombre de visites, les pages les plus consultées, la source du trafic, la durée de la visite). Ces informations sont collectées de manière agrégée et, si possible, anonymisée. Ils nous aident à améliorer le fonctionnement de notre Site et à comprendre ce qui intéresse nos utilisateurs.<br />
        Exemple : Google Analytics (si utilisé), Matomo, etc.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Cookies de fonctionnalité (soumis à votre consentement, le cas échéant) :</h3>
      <p className="mb-6">
        Ces cookies permettent au Site de se souvenir des choix que vous avez faits (comme votre nom d'utilisateur, la langue ou la région où vous vous trouvez) et de fournir des fonctionnalités améliorées et plus personnelles.<br />
        Exemple : Cookie de préférence linguistique.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Cookies de ciblage ou publicitaires (soumis à votre consentement, le cas échéant) :</h3>
      <p className="mb-6">
        PY PARTNERS n'utilise généralement pas de cookies publicitaires de tiers pour afficher des publicités ciblées. Si des cookies de ce type devaient être utilisés à l'avenir (par exemple, via du contenu embarqué de partenaires), ils seraient soumis à votre consentement préalable et cette section serait mise à jour en conséquence.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Cookies de réseaux sociaux (soumis à votre consentement, le cas échéant) :</h3>
      <p className="mb-6">
        Si notre Site intègre des fonctionnalités permettant de partager du contenu sur les réseaux sociaux (boutons de partage), ces réseaux sociaux peuvent déposer des cookies pour tracer votre navigation. Nous ne contrôlons pas ces cookies. Nous vous invitons à consulter les politiques de confidentialité de ces réseaux sociaux pour en savoir plus.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Liste des cookies utilisés sur notre Site</h2>
      <p className="mb-6 italic text-sm">
        Note : La liste ci-dessous est indicative et sera complétée en fonction des cookies réellement utilisés par le site https://py-partners.com/ après son lancement et la configuration de ses outils.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Nom du Cookie</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Émetteur/Domaine</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Finalité</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Durée de conservation</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">cookie_consent_status</td>
              <td className="py-2 px-4 border-b border-gray-300">py-partners.com</td>
              <td className="py-2 px-4 border-b border-gray-300">Stocke l'état du consentement aux cookies</td>
              <td className="py-2 px-4 border-b border-gray-300">1 an</td>
              <td className="py-2 px-4 border-b border-gray-300">Nécessaire</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_ga</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (si utilisé)</td>
              <td className="py-2 px-4 border-b border-gray-300">Mesure d'audience (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">2 ans</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytique</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_gid</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (si utilisé)</td>
              <td className="py-2 px-4 border-b border-gray-300">Mesure d'audience (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">24 heures</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytique</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_gat</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (si utilisé)</td>
              <td className="py-2 px-4 border-b border-gray-300">Limite le taux de requêtes (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">1 minute</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytique</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">PHPSESSID</td>
              <td className="py-2 px-4 border-b border-gray-300">py-partners.com</td>
              <td className="py-2 px-4 border-b border-gray-300">Cookie de session technique PHP</td>
              <td className="py-2 px-4 border-b border-gray-300">Session</td>
              <td className="py-2 px-4 border-b border-gray-300">Nécessaire</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Comment gérer vos préférences en matière de cookies ?</h2>
      <p className="mb-6">
        Lors de votre première visite sur notre Site, un bandeau d'information vous permet d'accepter ou de refuser le dépôt des cookies soumis à consentement, ou de personnaliser vos choix.
      </p>
      <p className="mb-6">
        Vous pouvez modifier vos préférences à tout moment en :
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Cliquant sur le lien/bouton "Gestion des cookies" ou "Préférences cookies" accessible en pied de page de notre Site (si un tel outil est mis en place).</li>
        <li>
          Configurant votre navigateur internet :
          <ul className="list-disc pl-6 mt-2">
            <li>Pour Internet Explorer™ : <a href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">support Microsoft</a></li>
            <li>Pour Safari™ : <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">support Apple</a></li>
            <li>Pour Chrome™ : <a href="https://support.google.com/chrome/answer/95647?hl=fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">support Google</a></li>
            <li>Pour Firefox™ : <a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">support Mozilla</a></li>
            <li>Pour Opera™ : <a href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">support Opera</a></li>
          </ul>
        </li>
      </ul>
      <p className="mb-6">
        Veuillez noter que si vous choisissez de bloquer certains cookies (notamment les cookies de fonctionnalité ou les cookies strictement nécessaires), votre navigation sur le Site et l'accès à certains services pourraient être altérés, voire impossibles.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Modifications de la politique de cookies</h2>
      <p className="mb-6">
        Nous pouvons être amenés à modifier cette politique de cookies. Toute modification sera publiée sur cette page et la date de "Dernière mise à jour" sera modifiée en conséquence. Nous vous encourageons à consulter régulièrement cette politique.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
      <p className="mb-6">
        Pour toute question relative à notre politique de cookies, vous pouvez nous contacter :<br />
        PY PARTNERS<br />
        Email : contact@py-partners.com<br />
        Adresse : 13 Rue Royale, 75008 Paris, France
      </p>
    </div>
  );

  // Contenu en anglais
  const contentEN = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <p className="mb-6">Last updated: May 6, 2025</p>
      
      <h2 className="text-2xl font-bold mt-10 mb-4">What is a cookie?</h2>
      <p className="mb-6">
        A cookie is a small text file that is placed on your device (computer, tablet, smartphone) when you visit a website or view an advertisement. Its purpose is to collect information about your browsing and to provide you with personalized services. Cookies are managed by your internet browser.
      </p>
      <p className="mb-6">
        The website https://py-partners.com/ (hereinafter "the Website") uses cookies to improve your browsing experience, ensure its proper functioning, measure its audience, and, where applicable, offer you tailored content.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">What types of cookies do we use?</h2>
      <p className="mb-6">
        We use different types of cookies on our Website:
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Strictly necessary cookies (exempt from consent):</h3>
      <p className="mb-6">
        These cookies are essential for the proper functioning of the Website and cannot be disabled in our systems. They are generally set in response to actions you take that correspond to a request for services, such as setting your privacy preferences, logging in, or filling out forms. You can configure your browser to block or alert you about these cookies, but some parts of the site may then not function.<br />
        Example: Session cookies to maintain your active session, cookies to record your cookie consent.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Analytical or audience measurement cookies (subject to your consent):</h3>
      <p className="mb-6">
        These cookies allow us to collect information about how visitors use our Website (for example, the number of visits, the most viewed pages, the source of traffic, the duration of the visit). This information is collected in an aggregated manner and, if possible, anonymized. They help us improve the functioning of our Website and understand what interests our users.<br />
        Example: Google Analytics (if used), Matomo, etc.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Functionality cookies (subject to your consent, if applicable):</h3>
      <p className="mb-6">
        These cookies allow the Website to remember choices you have made (such as your username, language, or the region where you are) and provide enhanced, more personal features.<br />
        Example: Language preference cookie.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Targeting or advertising cookies (subject to your consent, if applicable):</h3>
      <p className="mb-6">
        PY PARTNERS generally does not use third-party advertising cookies to display targeted advertisements. If cookies of this type were to be used in the future (for example, via embedded content from partners), they would be subject to your prior consent and this section would be updated accordingly.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Social media cookies (subject to your consent, if applicable):</h3>
      <p className="mb-6">
        If our Website integrates features allowing content to be shared on social networks (share buttons), these social networks may deposit cookies to track your browsing. We do not control these cookies. We invite you to consult the privacy policies of these social networks to learn more.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">List of cookies used on our Website</h2>
      <p className="mb-6 italic text-sm">
        Note: The list below is indicative and will be completed according to the cookies actually used by the website https://py-partners.com/ after its launch and the configuration of its tools.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Cookie Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Issuer/Domain</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Purpose</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Retention Period</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">cookie_consent_status</td>
              <td className="py-2 px-4 border-b border-gray-300">py-partners.com</td>
              <td className="py-2 px-4 border-b border-gray-300">Stores cookie consent status</td>
              <td className="py-2 px-4 border-b border-gray-300">1 year</td>
              <td className="py-2 px-4 border-b border-gray-300">Necessary</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_ga</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (if used)</td>
              <td className="py-2 px-4 border-b border-gray-300">Audience measurement (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">2 years</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytical</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_gid</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (if used)</td>
              <td className="py-2 px-4 border-b border-gray-300">Audience measurement (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">24 hours</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytical</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">_gat</td>
              <td className="py-2 px-4 border-b border-gray-300">.google.com (if used)</td>
              <td className="py-2 px-4 border-b border-gray-300">Limits request rate (Google Analytics)</td>
              <td className="py-2 px-4 border-b border-gray-300">1 minute</td>
              <td className="py-2 px-4 border-b border-gray-300">Analytical</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">PHPSESSID</td>
              <td className="py-2 px-4 border-b border-gray-300">py-partners.com</td>
              <td className="py-2 px-4 border-b border-gray-300">PHP technical session cookie</td>
              <td className="py-2 px-4 border-b border-gray-300">Session</td>
              <td className="py-2 px-4 border-b border-gray-300">Necessary</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">How to manage your cookie preferences?</h2>
      <p className="mb-6">
        During your first visit to our Website, an information banner allows you to accept or refuse the deposit of cookies subject to consent, or to customize your choices.
      </p>
      <p className="mb-6">
        You can modify your preferences at any time by:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Clicking on the "Cookie Management" or "Cookie Preferences" link/button accessible in the footer of our Website (if such a tool is implemented).</li>
        <li>
          Configuring your internet browser:
          <ul className="list-disc pl-6 mt-2">
            <li>For Internet Explorer™: <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft support</a></li>
            <li>For Safari™: <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Apple support</a></li>
            <li>For Chrome™: <a href="https://support.google.com/chrome/answer/95647?hl=en" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google support</a></li>
            <li>For Firefox™: <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla support</a></li>
            <li>For Opera™: <a href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Opera support</a></li>
          </ul>
        </li>
      </ul>
      <p className="mb-6">
        Please note that if you choose to block certain cookies (particularly functionality cookies or strictly necessary cookies), your browsing on the Website and access to certain services could be altered or even impossible.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Changes to the cookie policy</h2>
      <p className="mb-6">
        We may modify this cookie policy. Any modification will be published on this page and the "Last updated" date will be modified accordingly. We encourage you to regularly consult this policy.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
      <p className="mb-6">
        For any questions regarding our cookie policy, you can contact us:<br />
        PY PARTNERS<br />
        Email: contact@py-partners.com<br />
        Address: 13 Rue Royale, 75008 Paris, France
      </p>
    </div>
  );

  // Fonction pour gérer la navigation
  const handleNavClick = {
    home: () => {
      window.location.href = `/${language}/`;
    },
    about: () => {
      window.location.href = `/${language}/#a-propos`;
    },
    expertises: () => {
      window.location.href = `/${language}/#intro`;
    },
    press: () => {
      window.location.href = `/${language}/#presse`;
    },
    contact: () => {
      window.location.href = `/${language}/#contact`;
    }
  };

  return (
    <>
      <Helmet>
        <title>{language === 'fr' ? 'Politique de Cookies - PY Partners' : 'Cookie Policy - PY Partners'}</title>
        <meta name="description" content={language === 'fr' ? 'Politique de gestion des cookies du cabinet d\'avocats PY Partners' : 'Cookie policy of PY Partners law firm'} />
      </Helmet>
      
      <Header onNavClick={handleNavClick} currentPage="politique-cookies" />
      
      <PageTransition>
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {language === 'fr' ? contentFR : contentEN}
          </div>
        </main>
      </PageTransition>
      
      <Footer onNavClick={handleNavClick} />
    </>
  );
};

export default PolitiqueCookies;
