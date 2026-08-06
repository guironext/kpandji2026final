import type { Locale } from "@/lib/i18n/config";

export type FooterMessages = {
  manufacturer: string;
  headline: string;
  blurb: string;
  seatLabel: string;
  seatAddress: string;
  writeCta: string;
  resources: string;
  resourceDocsHint: string;
  contact: string;
  emailLabel: string;
  rights: string;
  backToTop: string;
  phones: {
    landline: string;
    marketing: string;
    sav: string;
    commercial: string;
  };
  resourceLinks: [string, string][];
};

const fr: FooterMessages = {
  manufacturer: "Constructeur automobile",
  headline: "Ingénierie, qualité et une signature ancrée en Afrique.",
  blurb:
    "Conception, assemblage et commercialisation de véhicules pensés pour l'exigence du terrain et du quotidien.",
  seatLabel: "Siège",
  seatAddress:
    "Côte d'Ivoire, Abidjan, Cocody Riviera Palmeraie, Carrefour Cabine Bleue",
  writeCta: "Écrire au constructeur",
  resources: "Ressources",
  resourceDocsHint: "Documents officiels — téléchargement direct.",
  contact: "Contact",
  emailLabel: "Courriel",
  rights: "Tous droits réservés.",
  backToTop: "Haut de page",
  phones: {
    landline: "Contact fixe",
    marketing: "Marketing",
    sav: "S.A.V",
    commercial: "Commercial",
  },
  resourceLinks: [
    ["Fiche technique Djetran auto", "/djetranbva.pdf"],
    ["Fiche technique Djetran manuel", "/djetranbvm.pdf"],
    ["Fiche technique Djetran Plus", "/djetranplus.pdf"],
    ["Fiche technique Lathaye", "/lathaye.pdf"],
    ["Fiche technique Souralai", "/souralai.pdf"],
  ],
};

const en: FooterMessages = {
  manufacturer: "Automotive manufacturer",
  headline: "Engineering, quality, and a signature rooted in Africa.",
  blurb:
    "Design, assembly, and sale of vehicles built for demanding terrain and everyday use.",
  seatLabel: "Headquarters",
  seatAddress:
    "Côte d'Ivoire, Abidjan, Cocody Riviera Palmeraie, Carrefour Cabine Bleue",
  writeCta: "Write to the manufacturer",
  resources: "Resources",
  resourceDocsHint: "Official documents — direct download.",
  contact: "Contact",
  emailLabel: "Email",
  rights: "All rights reserved.",
  backToTop: "Back to top",
  phones: {
    landline: "Landline",
    marketing: "Marketing",
    sav: "After-sales",
    commercial: "Sales",
  },
  resourceLinks: [
    ["Djetran auto technical sheet", "/djetranbva.pdf"],
    ["Djetran manual technical sheet", "/djetranbvm.pdf"],
    ["Djetran Plus technical sheet", "/djetranplus.pdf"],
    ["Lathaye technical sheet", "/lathaye.pdf"],
    ["Souralai technical sheet", "/souralai.pdf"],
  ],
};

export const footerMessages: Record<Locale, FooterMessages> = { fr, en };
