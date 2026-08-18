/**
 * All page copy lives here so you can edit text without touching JSX.
 * Each key maps to a section component in /components.
 */

export const hero = {
  eyebrow: 'PSARA Licensed · Gadade Group',
  // The visible headline is deliberately short and declarative — two words that
  // land, rather than a list of services. The full keyword-rich phrase still
  // lives in the H1 as a visually-hidden line, so SEO loses nothing.
  srTitle:
    'Samarth Security — PSARA licensed security, housekeeping and manpower services across Maharashtra',
  titleLine1: 'Uncompromising',
  titleLine2: 'Security.',
  // Note: individual city names are intentionally NOT listed here — the count
  // reads stronger, and every city is still named in the Branches section and
  // footer (which is what actually matters for local SEO).
  subheadline:
    'Safeguarding people, property and establishments with disciplined, defence-led protection — across 10+ cities in Maharashtra.',
  primaryCta: 'Check Our Services',
  secondaryCta: 'Contact Us',
  trustBadges: ['PSARA', 'ISO 9001', 'EPF', 'ESIC', 'GST', 'Shop Act'],
  // Compact proof strip under the hero.
  stats: [
    { value: '10+', label: 'Cities Served' },
    { value: '8', label: 'Branch Offices' },
    { value: '300+', label: 'Guards Deployed' },
    { value: '150+', label: 'Clients Served' },
  ],
};

export const about = {
  eyebrow: 'About Samarth Security · Est. 14 June 2020',
  heading: 'A trusted security & facilities partner, backed by defence-grade discipline',
  body: 'Established on 14 June 2020, Samarth Security is the security and facilities-management division of the Gadade Group. Led by associate members with rich defence-background experience, we bring military-grade discipline, planning and accountability to every deployment — protecting people, property and establishments for corporate, industrial and housing-society clients across Maharashtra.',
  owner: {
    name: 'Leadership & Management',
    designation: 'Founder & Managing Director',
    badge: 'Gadade Group Leadership',
    message:
      'Our priority is unwavering: military-grade discipline, statutory PSARA compliance, and total accountability to protect every client premises across Maharashtra.',
  },
  cards: [
    {
      title: 'Vision',
      body: 'To become a leading countrywide service provider recognized by our valuable clients for our satisfied services.',
    },
    {
      title: 'Mission',
      body: 'Our services must be available as a credible option for clients by safeguarding their valuable properties and preventing losses of establishment.',
    },
    {
      title: 'Quality Policy',
      body: 'Periodically monitor & update our training, performance & methodology so that our service experience is always preferred, recalled & recommended by all.',
    },
  ],
  values: ['Integrity', 'Teamwork', 'Attitude', 'Performance', 'Passion'],
};

export const services = {
  eyebrow: 'What We Do',
  heading: 'Security, housekeeping & manpower services under one roof',
  intro:
    'From trained security guards, gunmen, and bouncers to complete facility housekeeping, office boys, sweepers, and technical/non-technical staffing — Samarth Security delivers dependable workforce solutions across Maharashtra.',
  items: [
    {
      title: 'Security Services',
      description:
        'Trained security guards, gate & perimeter security, and on-site supervisors with military-grade discipline for commercial, industrial, and residential premises.',
      imageAlt:
        'PSARA licensed Samarth Security guard on duty at a corporate office gate in Maharashtra',
    },
    {
      title: 'Gunman Services',
      description:
        'Licensed armed security personnel and armed guards for banks, cash-in-transit, VIP protection, and high-security commercial establishments.',
      imageAlt:
        'Licensed armed gunman security guard on duty providing high-security protection',
    },
    {
      title: 'Bouncer Services',
      description:
        'Trained professional bouncers and executive protection officers for events, clubs, VIP escorting, and crowd control management.',
      imageAlt:
        'Professional bouncer security team providing crowd management and event protection',
    },
    {
      title: 'Housekeeping Services',
      description:
        'Complete facility housekeeping, deep cleaning, and sanitation for corporate offices, commercial units, malls, multiplexes, and housing societies.',
      imageAlt:
        'Samarth Security housekeeping staff cleaning a corporate office lobby in Pune',
    },
    {
      title: 'Sweeper Services',
      description:
        'Dedicated sweeping, waste handling, and routine premises sanitation staff to ensure clean, hygienic, and well-maintained environments.',
      imageAlt:
        'Dedicated sweeper and sanitation personnel maintaining commercial property cleanliness',
    },
    {
      title: 'Office Boy Services',
      description:
        'Trained office boys, peons, and pantry assistants for document handling, beverage service, and day-to-day administrative support.',
      imageAlt:
        'Professional office boy and workplace assistant supporting daily corporate office operations',
    },
    {
      title: 'Tech & Non-Tech Staff',
      description:
        'Skilled technical manpower (electricians, technicians, machine operators) and non-technical staff tailored to your operational requirements.',
      imageAlt:
        'Skilled technical and non-technical workforce ready for corporate and industrial deployment',
    },
    {
      title: 'Labour Services',
      description:
        'Reliable general labour workforce for loading, unloading, warehouse logistics, material handling, and on-site operational tasks.',
      imageAlt: 'Samarth Security labour team handling material at an industrial site',
    },
  ],
};

export const operations = {
  eyebrow: 'How We Operate',
  heading: 'A structured chain of command with an Escalation Matrix System',
  body: 'Every site is backed by a coordinated management structure — Operation and Area Managers, Field Officers, Rounders and Supervisors working together. Our Escalation Matrix System ensures any issue is routed to the right authority and resolved with promptness, so you always have a clear point of contact.',
  chain: [
    'Operation / Area Managers',
    'Field Officers',
    'Rounders',
    'Supervisors',
    'On-site Guards & Staff',
  ],
  trainingHeading: 'Our Training Pipeline',
  trainingIntro:
    'Every deployment follows a structured training programme aligned to the PASARA Act 2005 syllabus.',
  training: [
    {
      step: '01',
      title: 'Pre-Induction Training',
      body: 'Foundational training on discipline, conduct, physical readiness and security fundamentals before deployment.',
    },
    {
      step: '02',
      title: 'On-the-Job Training',
      body: 'Site-specific drills, access control, patrolling and emergency-response practice at the client premises.',
    },
    {
      step: '03',
      title: 'Refresher Training',
      body: 'Periodic re-training and assessment to keep skills, awareness and standards consistently sharp.',
    },
  ],
};

export const compliance = {
  eyebrow: 'Legal Compliance & Certifications',
  heading: 'Fully licensed, statutory-compliant and audit-ready',
  intro:
    'We maintain complete statutory compliance so corporate and housing-society clients can engage us with total confidence. Click any certificate to view it.',
  items: [
    {
      code: 'PSARA',
      title: 'PSARA License',
      description:
        'Licensed under the Private Security Agencies (Regulation) Act — the legal requirement to operate a security agency in India.',
      imageAlt: 'Samarth Security PSARA license certificate',
      imageSrc: '/images/psara_license.jpg',
    },
    {
      code: 'ISO 9001',
      title: 'ISO 9001:2015 Certification',
      description:
        'Certified Quality Management System (QMS) ensuring high standards of training, operations, and client service delivery.',
      imageAlt: 'Samarth Security ISO 9001:2015 certification',
      imageSrc: '/images/iso_9001.jpg',
    },
    {
      code: 'EPF',
      title: 'EPF Registration',
      description:
        'Employees’ Provident Fund registered — statutory retirement benefits for every deployed employee.',
      imageAlt: 'Samarth Security EPF registration certificate',
      imageSrc: '/images/epf_certificate_1.jpg',
      imagePages: [
        '/images/epf_certificate_1.jpg',
        '/images/epf_certificate_2.jpg',
      ],
    },
    {
      code: 'ESIC',
      title: 'ESIC Registration',
      description:
        'Employees’ State Insurance registered — medical and insurance cover for our workforce.',
      imageAlt: 'Samarth Security ESIC registration certificate',
      imageSrc: '/images/esic_certificate_1.jpg',
      imagePages: [
        '/images/esic_certificate_1.jpg',
        '/images/esic_certificate_2.jpg',
      ],
    },
    {
      code: 'GST',
      title: 'GST Registered',
      description:
        'Goods & Services Tax registered (Govt of India & Maharashtra) — transparent, compliant and fully invoiced billing.',
      imageAlt: 'Samarth Security GST registration certificate',
      imageSrc: '/images/gst_certificate_1.jpg',
      imagePages: [
        '/images/gst_certificate_1.jpg',
        '/images/gst_certificate_2.jpg',
        '/images/gst_certificate_3.jpg',
      ],
    },
    {
      code: 'MSME',
      title: 'MSME / Udyam Registration',
      description:
        'Registered under Ministry of Micro, Small & Medium Enterprises (Govt. of India) as an authorized service enterprise.',
      imageAlt: 'Samarth Security MSME Udyam registration certificate',
      imageSrc: '/images/msme_certificate_1.jpg',
      imagePages: [
        '/images/msme_certificate_1.jpg',
        '/images/msme_certificate_2.jpg',
        '/images/msme_certificate_3.jpg',
        '/images/msme_certificate_4.jpg',
      ],
    },
  ],
};

export const branchesSection = {
  eyebrow: 'Our Coverage',
  heading: 'Branches across Maharashtra',
  intro:
    'Samarth Security provides security and housekeeping services across Sangli, Mumbai, Pune, Ahilyanagar, Kolhapur, Solapur, Dharashiv and Satara — with a local team near you for fast response and on-ground supervision.',
  mapAlt: 'Map of Maharashtra showing Samarth Security branch locations',
};

export const whyChooseUs = {
  eyebrow: 'Why Choose Us',
  heading: 'Discipline you can trust, service you can rely on',
  stats: [
    { value: '2020', label: 'Established (14 June)' },
    { value: '8', label: 'Branches Across Maharashtra' },
    { value: '300+', label: 'Guards & Staff Deployed' },
    { value: '150+', label: 'Clients Served' },
  ],
  callout:
    'Our leadership brings rich defence-background experience, and our workforce is PASARA-trained to statutory standards. The result: disciplined, accountable and dependable service that corporate and housing-society clients recommend.',
};

export const social = {
  eyebrow: 'Follow Us',
  heading: 'Stay connected with the Gadade Group',
  body: 'Follow us on Instagram for updates, deployments and news from Samarth Security and the Gadade Group.',
};

export const contactSection = {
  eyebrow: 'Get In Touch',
  heading: 'Request a free quote or site survey',
  intro:
    'Tell us what you need and our team will get back to you quickly. Prefer to talk now? Call or message us on WhatsApp.',
  services: [
    'Security Services',
    'Gunman Services',
    'Bouncer Services',
    'Housekeeping Services',
    'Sweeper Services',
    'Office Boy Services',
    'Tech & Non-Tech Staff',
    'Labour Services',
    'Other',
  ],
};
