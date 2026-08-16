/**
 * Legal page copy (Privacy Policy, Terms of Service, Disclaimer).
 *
 * ⚠️  THESE ARE STARTING TEMPLATES, NOT LEGAL ADVICE.
 * They are written for an India-based, PSARA-licensed manpower/security firm
 * and cover the usual ground, but you should have a lawyer review them before
 * you rely on them — particularly the liability, PSARA and DPDP Act sections.
 *
 * Anything you must review or fill in is marked [REVIEW].
 *
 * `lastUpdated` is shown on the page — bump it whenever you edit the text.
 */

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  slug: string;
  title: string;
  /** Shown in the footer nav + page header eyebrow. */
  navLabel: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  slug: 'privacy-policy',
  navLabel: 'Privacy Policy',
  title: 'Privacy Policy',
  lastUpdated: '16 August 2026',
  intro:
    'This policy explains what personal information Samarth Security (a division of the Gadade Group) collects through this website, why we collect it, and the choices you have.',
  sections: [
    {
      heading: 'Information we collect',
      body: [
        'When you submit an enquiry through our contact form, we collect the name, phone number, city, service required and message you provide. If you contact us by WhatsApp, phone or email instead, we receive whatever details you choose to share in that conversation.',
        'We do not ask for, and you should not send us, sensitive personal information such as financial account details, identity document numbers or passwords through this website.',
      ],
    },
    {
      heading: 'How we use your information',
      body: [
        'We use your details for one purpose: to respond to your enquiry and, if you engage us, to provide and administer the services you have asked for. This includes preparing quotations, arranging site surveys and coordinating deployment.',
        'We do not sell your personal information, and we do not share it with third parties for their own marketing.',
      ],
    },
    {
      heading: 'How enquiries reach us',
      body: [
        'The contact form on this website opens your own email application with the details pre-filled — it does not transmit anything to a server of ours until you press send in your email client. WhatsApp enquiries are delivered through WhatsApp and are subject to WhatsApp\'s own privacy terms.',
        '[REVIEW] If you later switch the form to a backend service (for example Formspree or Resend), name that provider here and link to its privacy policy.',
      ],
    },
    {
      heading: 'Retention',
      body: [
        'We keep enquiry correspondence only as long as needed to deal with your request and to meet our legal, tax and statutory record-keeping obligations. [REVIEW] State your actual retention period here if you have one.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'You may ask us what personal information we hold about you, ask us to correct it if it is wrong, or ask us to delete it where we are not required to keep it. Write to us using the contact details below and we will respond within a reasonable period.',
        '[REVIEW] India\'s Digital Personal Data Protection Act, 2023 sets out specific rights and timelines, and obligations that depend on the volume of data you handle. Have your advisor confirm what applies to your business and update this section accordingly.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      body: [
        'This website does not set advertising or tracking cookies, and we do not run third-party analytics on it.',
        '[REVIEW] If you add analytics (for example Google Analytics) or embed further third-party content, disclose it here and add a consent banner where required.',
      ],
    },
    {
      heading: 'Third-party content',
      body: [
        'Our Branches and Contact sections embed a Google Map, and some pages link to WhatsApp and Instagram. When you interact with these, the relevant provider may receive information such as your IP address under its own privacy policy.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The date shown above is when it was last revised.',
      ],
    },
  ],
};

export const termsOfService: LegalDoc = {
  slug: 'terms',
  navLabel: 'Terms of Service',
  title: 'Terms of Service',
  lastUpdated: '16 August 2026',
  intro:
    'These terms govern your use of this website. They are not the contract under which we supply security, housekeeping or manpower services — that is a separate written agreement.',
  sections: [
    {
      heading: 'About us',
      body: [
        'This website is operated by Samarth Security, a security and facilities-management division of the Gadade Group, operating under a PSARA licence in the State of Maharashtra.',
        '[REVIEW] Add your registered entity name, PSARA licence number, GST number and registered office address here — several of these are legally required disclosures.',
      ],
    },
    {
      heading: 'Use of this website',
      body: [
        'You may browse this site and contact us through it for genuine enquiries. You must not attempt to disrupt the site, extract data from it by automated means, or use it to send unlawful, misleading or abusive content.',
      ],
    },
    {
      heading: 'Information on this site',
      body: [
        'We take care to keep the information here accurate, but it is provided for general guidance. Service descriptions, coverage areas, statistics and images are indicative and do not form an offer or a guarantee of any particular outcome.',
        'Nothing on this site is a quotation. Pricing, scope, deployment strength and service levels are agreed in writing on a per-client basis.',
      ],
    },
    {
      heading: 'Enquiries and quotations',
      body: [
        'Submitting an enquiry does not create a contract between us. A binding engagement arises only when both parties sign a written service agreement or work order.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        'The content, layout and branding of this site belong to us or our licensors and may not be copied or reused without permission. Client names and logos shown on the Clients page remain the property of their respective owners and are displayed with permission.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        '[REVIEW] To the extent permitted by law, we are not liable for loss arising from reliance on information on this website. Have a lawyer draft this clause properly — an unreviewed limitation of liability clause is often unenforceable.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        'These terms are governed by the laws of India, and the courts at [REVIEW: your city, e.g. Sangli], Maharashtra have exclusive jurisdiction.',
      ],
    },
  ],
};

export const legalDocs = [privacyPolicy, termsOfService];
