import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';

const PolitiqueConfidentialite: React.FC = () => {
  const { t, language } = useLanguage();
  const currentDate = "6 mai 2025"; // À mettre à jour si nécessaire

  // Contenu en français
  const contentFR = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
      <p className="mb-6">Dernière mise à jour : {currentDate}</p>
      
      <h2 className="text-2xl font-bold mt-10 mb-4">Introduction</h2>
      <p className="mb-6">
        Chez PY PARTNERS ("nous", "notre", "nos"), la protection de votre vie privée et de vos données personnelles est une priorité. Cette politique de confidentialité a pour objectif de vous informer de manière claire et transparente sur la manière dont nous collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous visitez notre site internet https://py-partners.com/ (ci-après "le Site") ou lorsque vous interagissez avec nous.<br />
        PY PARTNERS, en sa qualité de responsable de traitement, s'engage à respecter les dispositions du Règlement (UE) n°2016/679 du 27 avril 2016 relatif à la protection des données à caractère personnel (RGPD) et de la Loi n°78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Responsable du traitement</h2>
      <p className="mb-6">
        Le responsable du traitement de vos données personnelles est :<br />
        PY PARTNERS<br />
        13 Rue Royale, 75008 Paris, France<br /><br />
        contact@py-partners.com<br />
        Pour toute question relative à la protection de vos données personnelles, vous pouvez contacter notre cabinet aux coordonnées ci-dessus.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Quelles données personnelles collectons-nous et pourquoi ?</h2>
      <p className="mb-6">
        Nous collectons différentes catégories de données personnelles vous concernant :
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Données que vous nous fournissez directement :</h3>
      <ul className="list-disc pl-6 mb-6 space-y-4">
        <li>
          <p className="font-semibold">Lorsque vous nous contactez (via le formulaire de contact, e-mail, téléphone) :</p>
          <p>nom, prénom, adresse e-mail, numéro de téléphone, objet de votre demande, et toute autre information que vous choisissez de nous communiquer.</p>
          <p className="mt-2"><span className="font-semibold">Finalité :</span> Répondre à vos demandes d'information, de prise de contact, de devis ou de consultation.</p>
          <p><span className="font-semibold">Base légale :</span> Votre consentement (article 6.1.a RGPD) ou l'exécution de mesures précontractuelles prises à votre demande (article 6.1.b RGPD).</p>
        </li>
        <li>
          <p className="font-semibold">Lorsque vous vous abonnez à notre newsletter (le cas échéant) :</p>
          <p>adresse e-mail.</p>
          <p className="mt-2"><span className="font-semibold">Finalité :</span> Vous envoyer nos actualités juridiques, invitations à des événements ou informations sur nos services.</p>
          <p><span className="font-semibold">Base légale :</span> Votre consentement (article 6.1.a RGPD).</p>
        </li>
        <li>
          <p className="font-semibold">Dans le cadre de nos services juridiques (si vous devenez client) :</p>
          <p>des informations plus détaillées (état civil, situation professionnelle, données financières, données relatives à des infractions ou condamnations pénales si pertinent pour le dossier, etc.) peuvent être collectées pour la constitution, la gestion et le suivi de votre dossier, conformément à notre relation contractuelle et à nos obligations déontologiques et légales.</p>
          <p className="mt-2"><span className="font-semibold">Finalité :</span> Exécution de la convention d'honoraires et des missions confiées, gestion de la facturation et de la relation client.</p>
          <p><span className="font-semibold">Base légale :</span> Exécution d'un contrat (article 6.1.b RGPD), respect d'une obligation légale (article 6.1.c RGPD), ou intérêt légitime du cabinet (article 6.1.f RGPD).</p>
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Données collectées automatiquement (via les cookies et technologies similaires) :</h3>
      <p className="mb-6">
        Lorsque vous naviguez sur notre Site, nous pouvons collecter des informations telles que votre adresse IP (anonymisée le cas échéant), le type de navigateur, le système d'exploitation, les pages visitées, la date et l'heure de la visite, les sources de trafic.<br /><br />
        <span className="font-semibold">Finalité :</span> Assurer le bon fonctionnement et la sécurité du Site, améliorer votre expérience utilisateur, analyser l'audience du Site (mesure d'audience) et, si vous y consentez, vous proposer des contenus personnalisés.<br /><br />
        <span className="font-semibold">Base légale :</span> Notre intérêt légitime pour les cookies strictement nécessaires au fonctionnement du site (article 6.1.f RGPD), et votre consentement pour les autres types de cookies (article 6.1.a RGPD). Pour en savoir plus, consultez notre Politique de Cookies.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Comment utilisons-nous vos données personnelles ?</h2>
      <p className="mb-6">
        Vos données personnelles sont utilisées pour les finalités suivantes :
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Gérer nos relations avec vous (réponses à vos demandes, gestion des dossiers clients).</li>
        <li>Vous fournir les services juridiques que vous sollicitez.</li>
        <li>Améliorer notre Site et nos services.</li>
        <li>Vous envoyer des communications (newsletters, invitations) si vous y avez consenti. Vous pouvez vous désinscrire à tout moment via un lien de désinscription présent dans chaque e-mail ou en nous contactant.</li>
        <li>Respecter nos obligations légales, réglementaires et déontologiques (notamment en matière de lutte contre le blanchiment d'argent et le financement du terrorisme).</li>
        <li>Gérer la facturation et la comptabilité.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Avec qui partageons-nous vos données personnelles ?</h2>
      <p className="mb-6">
        PY PARTNERS s'engage à ne pas vendre, louer ou échanger vos informations personnelles avec des tiers à des fins commerciales.<br />
        Vos données peuvent être communiquées à :
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Nos prestataires techniques (hébergeur, maintenance informatique, fournisseur de solution de newsletter le cas échéant) agissant en tant que sous-traitants, dans la mesure nécessaire à l'accomplissement de leurs missions et conformément à nos instructions et aux dispositions du RGPD.</li>
        <li>Les autorités judiciaires, administratives ou ordinales, si nous y sommes légalement tenus ou dans le cadre de la défense de nos droits.</li>
        <li>Dans le cadre de la gestion de votre dossier, et avec votre accord préalable, à d'autres professionnels du droit (avocats correspondants, huissiers, experts judiciaires, etc.) ou à des tiers impliqués dans votre dossier.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Transferts de données hors Union Européenne</h2>
      <p className="mb-6">
        Nous nous efforçons de conserver vos données personnelles au sein de l'Union Européenne. Si un transfert de données vers un pays hors UE devait s'avérer nécessaire (par exemple, pour l'utilisation d'un prestataire technique situé hors UE), nous nous assurerions que ce transfert est encadré par des garanties appropriées (décision d'adéquation de la Commission européenne, clauses contractuelles types, etc.) conformément au RGPD.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Sécurité de vos données</h2>
      <p className="mb-6">
        Nous prenons la sécurité de vos données très au sérieux. Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (pare-feu, chiffrement des communications lorsque cela est pertinent, accès sécurisés, politiques de sécurité internes, etc.) pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération ou la destruction.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Durée de conservation des données</h2>
      <p className="mb-6">
        Nous conservons vos données personnelles pour la durée nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, augmentée des délais de prescription légale applicables ou aussi longtemps que la loi l'exige :
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Données des prospects (demandes d'information non suivies d'une relation client) : 3 ans à compter du dernier contact.</li>
        <li>Données des clients : durée de la relation contractuelle, puis archivées pendant la durée de prescription légale applicable (généralement 5 ans en matière civile et commerciale après la fin de la relation, et 10 ans pour les documents comptables).</li>
        <li>Données de connexion (cookies) : voir notre Politique de Gestion des Cookies.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Vos droits concernant vos données personnelles</h2>
      <p className="mb-6">
        Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li><span className="font-semibold">Droit d'accès :</span> obtenir la confirmation que vos données sont traitées et y avoir accès.</li>
        <li><span className="font-semibold">Droit de rectification :</span> demander la correction de données inexactes ou incomplètes.</li>
        <li><span className="font-semibold">Droit à l'effacement ("droit à l'oubli") :</span> demander la suppression de vos données, dans les limites prévues par la réglementation.</li>
        <li><span className="font-semibold">Droit à la limitation du traitement :</span> demander la suspension du traitement de vos données, sous certaines conditions.</li>
        <li><span className="font-semibold">Droit à la portabilité des données :</span> recevoir vos données dans un format structuré, couramment utilisé et lisible par machine, et les transmettre à un autre responsable de traitement, lorsque le traitement est basé sur le consentement ou un contrat et effectué à l'aide de procédés automatisés.</li>
        <li><span className="font-semibold">Droit d'opposition :</span> vous opposer au traitement de vos données pour des motifs légitimes, ou à tout moment pour la prospection commerciale.</li>
        <li><span className="font-semibold">Droit de retirer votre consentement :</span> à tout moment, pour les traitements basés sur le consentement, sans que cela ne porte atteinte à la licéité du traitement fondé sur le consentement effectué avant le retrait de celui-ci.</li>
        <li><span className="font-semibold">Droit de définir des directives</span> relatives au sort de vos données après votre décès.</li>
        <li><span className="font-semibold">Droit d'introduire une réclamation</span> auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 - www.cnil.fr).</li>
      </ul>
      <p className="mb-6">
        Pour exercer ces droits, veuillez nous contacter par e-mail à contact@py-partners.com ou par courrier postal à PY PARTNERS, 13 Rue Royale, 75008 Paris, France, en joignant une copie d'un justificatif d'identité pour nous permettre de vérifier votre identité.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Modifications de la politique de confidentialité</h2>
      <p className="mb-6">
        Nous pouvons être amenés à modifier cette politique de confidentialité afin de nous conformer aux évolutions réglementaires, jurisprudentielles, éditoriales ou techniques. Toute modification sera publiée sur cette page et la date de "Dernière mise à jour" sera modifiée en conséquence. Nous vous encourageons à consulter régulièrement cette politique pour rester informé de la manière dont nous protégeons vos informations.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
      <p className="mb-6">
        Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de protection des données, n'hésitez pas à nous contacter :<br />
        PY PARTNERS<br />
        Email : contact@py-partners.com<br />
        Adresse : 13 Rue Royale, 75008 Paris, France
      </p>
    </div>
  );

  // Contenu en anglais
  const contentEN = (
    <div className="legal-content">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="mb-6">Last updated: May 6, 2025</p>
      
      <h2 className="text-2xl font-bold mt-10 mb-4">Introduction</h2>
      <p className="mb-6">
        At PY PARTNERS ("we", "our", "us"), the protection of your privacy and personal data is a priority. This privacy policy aims to inform you in a clear and transparent manner about how we collect, use, share, and protect your personal information when you visit our website https://py-partners.com/ (hereinafter "the Website") or when you interact with us.<br />
        PY PARTNERS, as the data controller, is committed to complying with the provisions of Regulation (EU) No. 2016/679 of April 27, 2016 on the protection of personal data (GDPR) and Law No. 78-17 of January 6, 1978, as amended, relating to information technology, files, and freedoms.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Data Controller</h2>
      <p className="mb-6">
        The data controller for your personal data is:<br />
        PY PARTNERS<br />
        13 Rue Royale, 75008 Paris, France<br /><br />
        contact@py-partners.com<br />
        For any questions regarding the protection of your personal data, you can contact our firm at the above coordinates.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">What personal data do we collect and why?</h2>
      <p className="mb-6">
        We collect different categories of personal data about you:
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Data that you provide to us directly:</h3>
      <ul className="list-disc pl-6 mb-6 space-y-4">
        <li>
          <p className="font-semibold">When you contact us (via the contact form, email, telephone):</p>
          <p>name, first name, email address, telephone number, the subject of your request, and any other information you choose to communicate to us.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To respond to your requests for information, contact, quotes, or consultation.</p>
          <p><span className="font-semibold">Legal basis:</span> Your consent (Article 6.1.a GDPR) or the execution of pre-contractual measures taken at your request (Article 6.1.b GDPR).</p>
        </li>
        <li>
          <p className="font-semibold">When you subscribe to our newsletter (if applicable):</p>
          <p>email address.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> To send you our legal news, invitations to events, or information about our services.</p>
          <p><span className="font-semibold">Legal basis:</span> Your consent (Article 6.1.a GDPR).</p>
        </li>
        <li>
          <p className="font-semibold">As part of our legal services (if you become a client):</p>
          <p>more detailed information (civil status, professional situation, financial data, data relating to offenses or criminal convictions if relevant to the case, etc.) may be collected for the constitution, management, and monitoring of your file, in accordance with our contractual relationship and our ethical and legal obligations.</p>
          <p className="mt-2"><span className="font-semibold">Purpose:</span> Execution of the fee agreement and assigned missions, management of billing and client relationship.</p>
          <p><span className="font-semibold">Legal basis:</span> Execution of a contract (Article 6.1.b GDPR), compliance with a legal obligation (Article 6.1.c GDPR), or legitimate interest of the firm (Article 6.1.f GDPR).</p>
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Data collected automatically (via cookies and similar technologies):</h3>
      <p className="mb-6">
        When you browse our Website, we may collect information such as your IP address (anonymized if applicable), browser type, operating system, pages visited, date and time of the visit, traffic sources.<br /><br />
        <span className="font-semibold">Purpose:</span> To ensure the proper functioning and security of the Website, improve your user experience, analyze the Website's audience (audience measurement), and, if you consent, offer you personalized content.<br /><br />
        <span className="font-semibold">Legal basis:</span> Our legitimate interest for cookies strictly necessary for the functioning of the website (Article 6.1.f GDPR), and your consent for other types of cookies (Article 6.1.a GDPR). For more information, see our Cookie Policy.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">How do we use your personal data?</h2>
      <p className="mb-6">
        Your personal data is used for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Managing our relationships with you (responses to your requests, management of client files).</li>
        <li>Providing you with the legal services you request.</li>
        <li>Improving our Website and services.</li>
        <li>Sending you communications (newsletters, invitations) if you have consented to this. You can unsubscribe at any time via an unsubscribe link present in each email or by contacting us.</li>
        <li>Complying with our legal, regulatory, and ethical obligations (particularly regarding anti-money laundering and counter-terrorism financing).</li>
        <li>Managing billing and accounting.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">With whom do we share your personal data?</h2>
      <p className="mb-6">
        PY PARTNERS is committed to not selling, renting, or exchanging your personal information with third parties for commercial purposes.<br />
        Your data may be communicated to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Our technical service providers (host, IT maintenance, newsletter solution provider if applicable) acting as processors, to the extent necessary for the accomplishment of their missions and in accordance with our instructions and the provisions of the GDPR.</li>
        <li>Judicial, administrative, or professional authorities, if we are legally required to do so or in the context of defending our rights.</li>
        <li>As part of the management of your file, and with your prior agreement, to other legal professionals (corresponding lawyers, bailiffs, judicial experts, etc.) or to third parties involved in your file.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Transfers of data outside the European Union</h2>
      <p className="mb-6">
        We strive to keep your personal data within the European Union. If a data transfer to a country outside the EU should prove necessary (for example, for the use of a technical service provider located outside the EU), we would ensure that this transfer is framed by appropriate guarantees (adequacy decision of the European Commission, standard contractual clauses, etc.) in accordance with the GDPR.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Security of your data</h2>
      <p className="mb-6">
        We take the security of your data very seriously. We implement appropriate technical and organizational measures (firewalls, encryption of communications when relevant, secure access, internal security policies, etc.) to protect your personal data against loss, unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Data retention period</h2>
      <p className="mb-6">
        We retain your personal data for the period necessary to accomplish the purposes for which it was collected, plus the applicable legal prescription periods or as long as the law requires:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Prospect data (information requests not followed by a client relationship): 3 years from the last contact.</li>
        <li>Client data: duration of the contractual relationship, then archived for the applicable legal prescription period (generally 5 years in civil and commercial matters after the end of the relationship, and 10 years for accounting documents).</li>
        <li>Connection data (cookies): see our Cookie Management Policy.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Your rights regarding your personal data</h2>
      <p className="mb-6">
        In accordance with the GDPR, you have the following rights regarding your personal data:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li><span className="font-semibold">Right of access:</span> to obtain confirmation that your data is being processed and to have access to it.</li>
        <li><span className="font-semibold">Right to rectification:</span> to request the correction of inaccurate or incomplete data.</li>
        <li><span className="font-semibold">Right to erasure ("right to be forgotten"):</span> to request the deletion of your data, within the limits provided by the regulations.</li>
        <li><span className="font-semibold">Right to restriction of processing:</span> to request the suspension of the processing of your data, under certain conditions.</li>
        <li><span className="font-semibold">Right to data portability:</span> to receive your data in a structured, commonly used, and machine-readable format, and to transmit it to another data controller, when the processing is based on consent or a contract and carried out using automated processes.</li>
        <li><span className="font-semibold">Right to object:</span> to object to the processing of your data for legitimate reasons, or at any time for commercial prospecting.</li>
        <li><span className="font-semibold">Right to withdraw your consent:</span> at any time, for processing based on consent, without affecting the lawfulness of processing based on consent carried out before its withdrawal.</li>
        <li><span className="font-semibold">Right to define guidelines</span> relating to the fate of your data after your death.</li>
        <li><span className="font-semibold">Right to lodge a complaint</span> with the CNIL (Commission Nationale de l'Informatique et des Libertés - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 - www.cnil.fr).</li>
      </ul>
      <p className="mb-6">
        To exercise these rights, please contact us by email at contact@py-partners.com or by postal mail at PY PARTNERS, 13 Rue Royale, 75008 Paris, France, attaching a copy of an identity document to allow us to verify your identity.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Changes to the privacy policy</h2>
      <p className="mb-6">
        We may modify this privacy policy to comply with regulatory, jurisprudential, editorial, or technical developments. Any modification will be published on this page and the "Last updated" date will be modified accordingly. We encourage you to regularly consult this policy to stay informed about how we protect your information.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
      <p className="mb-6">
        If you have any questions about this privacy policy or our data protection practices, please do not hesitate to contact us:<br />
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
        <title>{language === 'fr' ? 'Politique de Confidentialité - PY Partners' : 'Privacy Policy - PY Partners'}</title>
        <meta name="description" content={language === 'fr' ? 'Politique de confidentialité du cabinet d\'avocats PY Partners' : 'Privacy policy of PY Partners law firm'} />
      </Helmet>
      
      <Header onNavClick={handleNavClick} currentPage="politique-confidentialite" />
      
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

export default PolitiqueConfidentialite;
