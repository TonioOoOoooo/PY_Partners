import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';

const MentionsLegales: React.FC = () => {
  const { t, language } = useLanguage();

  // Contenu en français
  const contentFR = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
      
      <p className="mb-6">
        Bienvenue sur le site de PY PARTNERS. Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site https://py-partners.com/ les informations suivantes :
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">1. Éditeur du Site</h2>
      <p className="mb-4">
        Le présent site, accessible à l'URL https://py-partners.com/ (ci-après "le Site"), est édité par :
      </p>
      <p className="mb-4">
        PY PARTNERS<br />
        Cabinet d'avocats [PRÉCISER LA FORME JURIDIQUE EXACTE, ex: Association d'Avocats à Responsabilité Professionnelle Individuelle (AARPI)]<br />
        Inscrit au Barreau de Paris<br />
        Siège social : 13 Rue Royale, 75008 Paris, France<br />
        SIRET : [À COMPLÉTER PAR PY PARTNERS]<br />
        N° TVA Intracommunautaire : [À COMPLÉTER PAR PY PARTNERS]<br />
        Code APE (Activité Principale Exercée) : Activités juridiques (69.10Z)<br />
        Date de création de la structure : [À COMPLÉTER PAR PY PARTNERS]
      </p>
      <p className="mb-6">
        contact@py-partners.com<br />
        Directeurs de la publication :<br />
        Maître Sérafine Poyer et Maître Virgile Puyau, Avocats à la Cour, Associés fondateurs
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">2. Hébergement et Conception Technique</h2>
      <p className="mb-6">
        L'hébergement et la conception technique du site sont assurés par :<br /><br />
        AI TOMORROW SOLUTIONS<br />
        SAS - Société par actions simplifiée<br />
        Siège social : 60 rue François 1er, 75008 Paris, France<br />
        SIREN : 939 017 349<br />
        SIRET : 939 017 349 00019<br />
        N° TVA Intracommunautaire : FR78 939 017 349<br />
        Code APE (Activité Principale Exercée) : Conseil en systèmes et logiciels informatiques (62.02A)<br />
        Date de création de la société : 01/01/2025<br />
        Téléphone : +33 (0)7 84 26 19 44<br />
        Adresse e-mail : contact@tomorrow-solutions.com<br />
        Site web : https://tomorrow-solutions.com/
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">3. Conditions d'utilisation</h2>
      <p className="mb-6">
        L'utilisation du site https://py-partners.com/ implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, les utilisateurs du site sont donc invités à les consulter de manière régulière.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">4. Propriété Intellectuelle</h2>
      <p className="mb-6">
        Le site https://py-partners.com/ et chacun des éléments qui le composent (tels que marques, logos, textes, photographies, images, illustrations, etc.) sont la propriété exclusive de PY PARTNERS ou de tiers ayant autorisé PY PARTNERS à les utiliser. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de PY PARTNERS. Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">5. Limitation de responsabilité</h2>
      <p className="mb-6">
        PY PARTNERS s'efforce de fournir sur le site https://py-partners.com/ des informations aussi précises que possible. Toutefois, PY PARTNERS ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Toutes les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs et sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne. Le contenu du site est proposé à titre informatif et ne saurait constituer un conseil juridique, une consultation, une sollicitation ou une offre de services. L'utilisateur est seul responsable de l'usage qu'il fait des informations contenues sur ce site. Si vous constatez une erreur, une lacune ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email à contact@py-partners.com, en décrivant le problème de la manière la plus précise possible (page posant problème, type d'ordinateur et de navigateur utilisé, …).
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">6. Liens hypertextes</h2>
      <p className="mb-6">
        Le site https://py-partners.com/ peut contenir des liens hypertextes vers d'autres sites. Cependant, PY PARTNERS n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence aucune responsabilité de ce fait. La création de liens hypertextes vers le site https://py-partners.com/ est soumise à l'accord préalable de PY PARTNERS. Les liens hypertextes établis en direction d'autres sites à partir de https://py-partners.com/ ne sauraient, en aucun cas, engager la responsabilité de PY PARTNERS.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">7. Droit applicable et attribution de juridiction</h2>
      <p className="mb-6">
        Les présentes conditions du site https://py-partners.com/ sont régies par les lois françaises. Toute contestation ou litige qui pourrait naître de l'interprétation ou de l'exécution de celles-ci sera de la compétence exclusive des tribunaux du ressort du siège social de PY PARTNERS. La langue de référence, pour le règlement de contentieux éventuels, est le français.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">8. Médiation de la consommation</h2>
      <p className="mb-6">
        Conformément aux dispositions des articles L.612-1 et suivants du Code de la consommation, tout client consommateur du cabinet a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige l'opposant à un avocat. Ce recours est possible à condition que le client ait préalablement tenté de résoudre son litige directement auprès de l'avocat par une réclamation écrite.<br />
        Le Médiateur national de la consommation de la profession d'avocat est :<br />
        Madame Carole PASCAREL<br />
        Adresse postale : Médiateur de la consommation de la profession d'avocat, 180 boulevard Haussmann, 75008 Paris<br />
        Adresse e-mail : mediateur-conso@mediateur-consommation-avocat.fr<br />
        Site Internet : http://mediateur-consommation-avocat.fr<br />
        Le champ de compétence du Médiateur national de la consommation des avocats est limité aux litiges relatifs à la contestation des honoraires entre un avocat et son client consommateur. Le processus de médiation est un préalable amiable facultatif à la procédure de fixation des honoraires diligentée devant le Bâtonnier compétent.
      </p>
    </div>
  );

  // Contenu en anglais
  const contentEN = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Legal Notice</h1>
      
      <p className="mb-6">
        Welcome to the PY PARTNERS website. In accordance with the provisions of Articles 6-III and 19 of Law No. 2004-575 of June 21, 2004 on Confidence in the Digital Economy, known as L.C.E.N., we bring to the attention of users and visitors of the website https://py-partners.com/ the following information:
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">1. Website Publisher</h2>
      <p className="mb-4">
        This website, accessible at the URL https://py-partners.com/ (hereinafter "the Website"), is published by:
      </p>
      <p className="mb-4">
        PY PARTNERS<br />
        Law firm [SPECIFY EXACT LEGAL FORM, e.g.: Association of Lawyers with Individual Professional Liability (AARPI)]<br />
        Registered with the Paris Bar<br />
        Registered office: 13 Rue Royale, 75008 Paris, France<br />
        SIRET: [TO BE COMPLETED BY PY PARTNERS]<br />
        VAT Number: [TO BE COMPLETED BY PY PARTNERS]<br />
        APE Code (Main Activity Exercised): Legal activities (69.10Z)<br />
        Date of creation of the structure: [TO BE COMPLETED BY PY PARTNERS]
      </p>
      <p className="mb-6">
        contact@py-partners.com<br />
        Publication directors:<br />
        Maître Sérafine Poyer and Maître Virgile Puyau, Attorneys at Law, Founding Partners
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">2. Hosting and Technical Design</h2>
      <p className="mb-6">
        The hosting and technical design of the website are provided by:<br /><br />
        AI TOMORROW SOLUTIONS<br />
        SAS - Simplified joint-stock company<br />
        Registered office: 60 rue François 1er, 75008 Paris, France<br />
        SIREN: 939 017 349<br />
        SIRET: 939 017 349 00019<br />
        VAT Number: FR78 939 017 349<br />
        APE Code (Main Activity Exercised): Computer systems and software consulting (62.02A)<br />
        Date of company creation: 01/01/2025<br />
        Phone: +33 (0)7 84 26 19 44<br />
        Email: contact@tomorrow-solutions.com<br />
        Website: https://tomorrow-solutions.com/
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">3. Terms of Use</h2>
      <p className="mb-6">
        The use of the website https://py-partners.com/ implies full and complete acceptance of the general terms of use described below. These terms of use may be modified or supplemented at any time, so users of the website are invited to consult them regularly.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">4. Intellectual Property</h2>
      <p className="mb-6">
        The website https://py-partners.com/ and each of the elements that compose it (such as trademarks, logos, texts, photographs, images, illustrations, etc.) are the exclusive property of PY PARTNERS or third parties who have authorized PY PARTNERS to use them. Any reproduction, representation, modification, publication, adaptation of all or part of the elements of the website, regardless of the means or process used, is prohibited, except with the prior written authorization of PY PARTNERS. Any unauthorized use of the website or any of the elements it contains will be considered as constituting an infringement and prosecuted in accordance with the provisions of Articles L.335-2 et seq. of the Intellectual Property Code.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">5. Limitation of Liability</h2>
      <p className="mb-6">
        PY PARTNERS strives to provide information on the website https://py-partners.com/ that is as accurate as possible. However, PY PARTNERS cannot be held responsible for omissions, inaccuracies, and deficiencies in updating, whether they are its own doing or the doing of third-party partners who provide this information. All information indicated on the website is given as an indication and is subject to change. Furthermore, the information appearing on the website is not exhaustive and is given subject to modifications that may have been made since it was put online. The content of the website is provided for informational purposes and does not constitute legal advice, a consultation, a solicitation, or an offer of services. The user is solely responsible for the use they make of the information contained on this website. If you notice an error, a gap, or what appears to be a malfunction, please report it by email to contact@py-partners.com, describing the problem as precisely as possible (page with the problem, type of computer and browser used, etc.).
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">6. Hypertext Links</h2>
      <p className="mb-6">
        The website https://py-partners.com/ may contain hypertext links to other websites. However, PY PARTNERS does not have the ability to verify the content of the websites thus visited and will therefore assume no responsibility in this regard. The creation of hypertext links to the website https://py-partners.com/ is subject to the prior agreement of PY PARTNERS. Hypertext links established to other websites from https://py-partners.com/ shall not, under any circumstances, engage the responsibility of PY PARTNERS.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">7. Applicable Law and Jurisdiction</h2>
      <p className="mb-6">
        These terms of the website https://py-partners.com/ are governed by French law. Any dispute or litigation that may arise from the interpretation or execution of these terms will be the exclusive jurisdiction of the courts of the registered office of PY PARTNERS. The reference language, for the settlement of any disputes, is French.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">8. Consumer Mediation</h2>
      <p className="mb-6">
        In accordance with the provisions of Articles L.612-1 et seq. of the Consumer Code, any consumer client of the firm has the right to resort free of charge to a consumer mediator with a view to the amicable resolution of a dispute with a lawyer. This recourse is possible provided that the client has previously attempted to resolve their dispute directly with the lawyer through a written complaint.<br />
        The National Consumer Mediator for the legal profession is:<br />
        Ms. Carole PASCAREL<br />
        Postal address: Mediator of consumer affairs for the legal profession, 180 boulevard Haussmann, 75008 Paris<br />
        Email: mediateur-conso@mediateur-consommation-avocat.fr<br />
        Website: http://mediateur-consommation-avocat.fr<br />
        The scope of competence of the National Consumer Mediator for lawyers is limited to disputes relating to the contestation of fees between a lawyer and their consumer client. The mediation process is an optional amicable preliminary to the fee-setting procedure conducted before the competent Bar President.
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
        <title>{language === 'fr' ? 'Mentions Légales - PY Partners' : 'Legal Notice - PY Partners'}</title>
        <meta name="description" content={language === 'fr' ? 'Mentions légales du cabinet d\'avocats PY Partners' : 'Legal notice of PY Partners law firm'} />
      </Helmet>
      
      <Header onNavClick={handleNavClick} currentPage="mentions-legales" />
      
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

export default MentionsLegales;
