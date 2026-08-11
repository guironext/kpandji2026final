import type { Locale } from "@/lib/i18n/config";

export type HeaderMessages = {
  utility: {
    automobiles: string;
    ecology: string;
    careers: string;
  };
  nav: {
    home: string;
    showroom: string;
    opportunities: string;
    sav: string;
    contact: string;
  };
  brand: {
    taglineTop: string;
    taglineBottom: string;
    homeAria: string;
  };
  actions: {
    bookTrial: string;
    search: string;
    account: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    clientSpace: string;
  };
  a11y: {
    mainNav: string;
    searchDialog: string;
  };
  search: {
    label: string;
    placeholder: string;
    headline: string;
    hint: string;
    tags: string[];
  };
  mobile: {
    tagline: string;
  };
  locale: {
    switchToFr: string;
    switchToEn: string;
  };
};

const fr: HeaderMessages = {
  utility: {
    automobiles: "KPANDJI AUTOMOBILES",
    ecology: "Eco-Kpandji",
    careers: "Kpandji-Emplois",
  },
  nav: {
    home: "Accueil",
    showroom: "ShowRoom",
    opportunities: "Opportunités",
    sav: "S.A.V.",
    contact: "Contact",
  },
  brand: {
    taglineTop: "La force d'une racine",
    taglineBottom: "l'élan d'une nation",
    homeAria: "KPANDJI — accueil",
  },
  actions: {
    bookTrial: "Réserver un essai",
    search: "Ouvrir la recherche",
    account: "Ouvrir l'espace client",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    close: "Fermer",
    clientSpace: "Espace client",
  },
  a11y: {
    mainNav: "Navigation principale",
    searchDialog: "Recherche",
  },
  search: {
    label: "Rechercher sur le site",
    placeholder: "Rechercher un modèle, une thématique…",
    headline: "Que souhaitez-vous découvrir ?",
    hint: "Saisissez un mot-clé ou explorez les rubriques ci-dessous.",
    tags: ["DJET", "LATHAYE", "Innovation", "Marque"],
  },
  mobile: {
    tagline: "KPANDJI — Constructeur automobile",
  },
  locale: {
    switchToFr: "Passer en français",
    switchToEn: "Switch to English",
  },
};

const en: HeaderMessages = {
  utility: {
    automobiles: "KPANDJI AUTOMOBILES",
    ecology: "Eco-Kpandji",
    careers: "Kpandji Careers",
  },
  nav: {
    home: "Home",
    showroom: "Showroom",
    opportunities: "Opportunities",
    sav: "After-Sales",
    contact: "Contact",
  },
  brand: {
    taglineTop: "The strength of a root",
    taglineBottom: "the drive of a nation",
    homeAria: "KPANDJI — home",
  },
  actions: {
    bookTrial: "Book a test drive",
    search: "Open search",
    account: "Open client space",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    clientSpace: "Client space",
  },
  a11y: {
    mainNav: "Main navigation",
    searchDialog: "Search",
  },
  search: {
    label: "Search the site",
    placeholder: "Search a model, a topic…",
    headline: "What would you like to discover?",
    hint: "Enter a keyword or explore the topics below.",
    tags: ["DJET", "LATHAYE", "Innovation", "Brand"],
  },
  mobile: {
    tagline: "KPANDJI — Automotive manufacturer",
  },
  locale: {
    switchToFr: "Passer en français",
    switchToEn: "Switch to English",
  },
};

export const headerMessages: Record<Locale, HeaderMessages> = { fr, en };
