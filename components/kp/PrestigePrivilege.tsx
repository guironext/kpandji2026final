import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PrestigeContactCTA } from "@/components/kp/PrestigeContactCTA";
import { PrivilegeFloatingCTA } from "@/components/kp/PrivilegeFloatingCTA";
import { PrivilegeSectionNav } from "@/components/kp/PrivilegeSectionNav";
import { Reveal } from "@/components/kp/Reveal";

const HERO_BACKDROP = "/derniers/djetran.jpeg";
const FEATURE_IMAGE = "/models/para/pic2.jpg";
const PATH_RENTAL_IMAGE = "/models/prest.png";

const btnPrimary =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:w-auto sm:text-[12px] sm:tracking-[0.2em]";

const btnGold =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-kp-gold px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition-all duration-300 hover:bg-[#d4b56e] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:w-auto sm:text-[12px]";

const eyebrow =
  "inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const bodyText =
  "font-sans text-[14px] leading-relaxed text-white/55 md:text-[15px]";

const bodyTextLg =
  "font-sans text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]";

const statLabel =
  "font-sans text-[11px] uppercase tracking-[0.18em] text-white/55";

const pageMax = "mx-auto w-full max-w-[1680px]";

const sectionPad =
  `${pageMax} px-4 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32 xl:px-16 xl:py-36`;

const sectionTitle =
  "font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const INTRO =
  "Acquérez votre véhicule neuf en toute sérénité, où que vous soyez. Vous vivez à l’étranger (Diaspora) ou en Côte d’Ivoire ? Kpandji Automobiles facilite votre accès à l’automobile de luxe. Profitez d’un service sur mesure pour acquérir un véhicule robuste et élégant, conçu pour nos routes.";

const WHATSAPP_COMMERCIAL = "https://wa.me/2250707201553?text=INFOS";
const WHATSAPP_FLOTTE = "https://wa.me/2250707201553?text=FLOTTE";

const stats = [
  { value: "3", label: "Modèles premium" },
  { value: "6–24", label: "Mois d’échelonnement" },
  { value: "70%", label: "Revenus pour vous" },
  { value: "120j", label: "Délai minimum" },
];

const models = [
  {
    name: "LATHAYE",
    tagline: "Le confort souverain",
    body: "Idéal pour la famille et les longs trajets — espace, confort supérieur et robustesse.",
    href: "/modeles/lathaye",
    image: "/models/showcase/latint1.jpg",
  },
  {
    name: "DJETRAN",
    tagline: "Le sommet du prestige et du raffinement",
    body: "L’élégance VIP pour les déplacements les plus exigeants.",
    href: "/modeles/djetran",
    image: "/models/showcase/djetext1.jpg",
  },
  {
    name: "DJETRAN PLUS",
    tagline: "Le sommet du prestige et du raffinement",
    body: "L’élégance robuste avec des finitions et technologies de pointe.",
    href: "/modeles/djetranplus",
    image: "/models/showcase/plusext0.jpg",
  },
] as const;

const paymentOptions = [
  {
    title: "Paiement Cash",
    subtitle: "Achat direct",
    body: "Livraison immédiate dès la finalisation de votre acquisition.",
    highlight: "Immédiat",
  },
  {
    title: "Paiement Échelonné",
    subtitle: "Kpandji Privilège",
    body: "Devenez propriétaire en payant à votre rythme sur une période allant de 6 à 24 mois.",
    highlight: "6 à 24 mois",
  },
] as const;

const conciergeServices = [
  {
    title: "Gardiennage sécurisé",
    body: "Vous vivez à l’étranger ? Votre véhicule est conservé en toute sécurité dans nos locaux, entretenu et prêt à rouler dès votre arrivée.",
    icon: (
      <path
        d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Livraison sur mesure",
    body: "Acheminement à l’adresse de votre choix — domicile, bureau ou famille — partout en Côte d’Ivoire.",
    icon: <path d="M5 17h14l-1.5-5.5a2 2 0 00-1.9-1.5H8.4a2 2 0 00-1.9 1.5L5 17z" strokeLinejoin="round" />,
  },
  {
    title: "Maintenance expert",
    body: "En tant que concepteur, nous assurons un entretien certifié constructeur pour que votre véhicule reste neuf.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
      </>
    ),
  },
] as const;

const fleetBenefits = [
  {
    title: "Mise en activité privilégiée",
    body: "Opportunité exclusive aux propriétaires de LATHAYE, DJETRAN et DJETRAN PLUS d’intégrer leur véhicule dans notre flotte de location Premium.",
  },
  {
    title: "Partenaires de prestige",
    body: "Votre véhicule sera mis à disposition de nos partenaires Elite : ambassades, multinationales, services VIP et délégations diplomatiques.",
  },
  {
    title: "Gestion 100 % sereine",
    body: "Kpandji Automobiles s’occupe de tout : recherche de clients sélectifs, entretien constructeur rigoureux et suivi technique complet.",
  },
] as const;

const fleetRentability = [
  {
    title: "Transparence totale",
    body: "Vous êtes informé en temps réel dès que votre véhicule est en mission.",
  },
  {
    title: "Modèle gagnant-gagnant",
    body: "Votre véhicule génère des revenus dès qu’il roule. S’il est à l’arrêt, vous n’avez aucun frais de gestion.",
  },
  {
    title: "Liberté absolue",
    body: "Vous restez maître de votre bien : récupérez-le pour un usage personnel ou continuez à percevoir vos dividendes tant qu’il est en activité.",
  },
] as const;

const contacts = [
  { icon: "📍", label: "Siège social", value: "Abidjan, Riviera Palmeraie (Côte d’Ivoire)" },
  { icon: "📞", label: "Standard & fixe", value: "+225 27 23 27 95 67", href: "tel:+225 27 23 27 95 67" },
  {
    icon: "💼",
    label: "Service commercial",
    value: "+225 07 07 20 15 53",
    href: WHATSAPP_COMMERCIAL,
    note: "WhatsApp",
  },
  {
    icon: "📣",
    label: "Service marketing",
    value: "+225 07 07 20 22 11",
    href: "https://wa.me/2250707202211",
    note: "WhatsApp",
  },
  { icon: "📧", label: "E-mail", value: "contact@kpandji.com", href: "mailto:contact@kpandji.com" },
  {
    icon: "🌐",
    label: "Site web",
    value: "www.kpandjiautomobiles.com",
    href: "https://www.kpandjiautomobiles.com",
  },
] as const;

const socialLinks = [
  { label: "Facebook", handle: "Kpandji" },
  { label: "Instagram", handle: "Kpandji_Auto.ci" },
  { label: "Twitter", handle: "Kpandji Automobiles" },
  { label: "TikTok", handle: "Kpandji Automobiles" },
  { label: "LinkedIn", handle: "Kpandji Automobiles" },
] as const;

const benefits = [
  {
    title: "Transparence digitale",
    body: "Notifications en temps réel sur l’état de préparation de votre véhicule et rapports réguliers d’entretien en cas de gardiennage.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 10h8M8 14h5" strokeLinecap="round" />
      </>
    ),
    featured: true,
  },
  {
    title: "Achat sécurisé",
    body: "Transaction directe avec le constructeur ivoirien, sans intermédiaire opaque.",
    icon: (
      <path
        d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
        strokeLinejoin="round"
      />
    ),
    featured: false,
  },
  {
    title: "Prêt à l’arrivée",
    body: "Véhicule entretenu et disponible dès votre descente d’avion.",
    icon: <path d="M5 17h14l-1.5-5.5a2 2 0 00-1.9-1.5H8.4a2 2 0 00-1.9 1.5L5 17z" strokeLinejoin="round" />,
    featured: false,
  },
  {
    title: "Revenus locatifs",
    body: "Votre véhicule génère des revenus dès qu’il roule — aucun frais de gestion s’il est à l’arrêt.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </>
    ),
    featured: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Choisissez votre modèle",
    body: "Showroom virtuel ou conseiller dédié — sélectionnez le véhicule adapté à vos usages.",
  },
  {
    num: "02",
    title: "Contractualisez à distance",
    body: "Signature et règlement depuis votre pays selon les modalités de l’équipe commerciale.",
  },
  {
    num: "03",
    title: "KPANDJI prend le relais",
    body: "Immatriculation, stockage, entretien : votre auto est gérée sur le territoire ivoirien.",
  },
  {
    num: "04",
    title: "Choisissez votre usage",
    body: "Récupération personnelle ou mise en location avec reversement des revenus.",
  },
];

const flowNodes = [
  {
    label: "Vous",
    sub: "À l’étranger",
    desc: "Achat & suivi à distance",
  },
  {
    label: "KPANDJI",
    sub: "Côte d’Ivoire",
    desc: "Préparation & gestion locale",
  },
  {
    label: "Valorisation",
    sub: "Votre choix",
    desc: "Arrivée ou revenus locatifs",
  },
];

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:border-white/12 hover:bg-kp-elevated/40";

const marqueeValues = [
  "Kpandji Privilège",
  "Diaspora ivoirienne",
  "Paiement échelonné",
  "Flotte élite",
  "Conciergerie",
  "Côte d’Ivoire",
  "Investissement automobile",
  "La force d’une racine",
];



function SectionIntro({
  label,
  title,
  titleId,
  description,
  centered = false,
}: {
  label: string;
  title: string;
  titleId?: string;
  description: string;
  centered?: boolean;
}) {
  if (centered) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className={`${eyebrow} justify-center`}>
          <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
          {label}
          <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
        </p>
        <h2 id={titleId} className={`mt-5 ${sectionTitle}`}>
          {title}
        </h2>
        <p className={`mx-auto mt-5 max-w-2xl ${bodyText}`}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
      <div className="max-w-3xl">
        <p className={eyebrow}>
          <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
          {label}
        </p>
        <h2 id={titleId} className={`mt-4 sm:mt-5 ${sectionTitle}`}>
          {title}
        </h2>
      </div>
      <p className={`max-w-lg ${bodyText} lg:max-w-md lg:pb-1 lg:text-right`}>
        {description}
      </p>
    </div>
  );
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-kp-gold/30 bg-kp-gold/10 text-kp-gold transition-colors duration-500 group-hover:bg-kp-gold/15 sm:size-12">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
        {children}
      </svg>
    </span>
  );
}

function SectionChapter({
  part,
  label,
  title,
  description,
  accent = "gold",
}: {
  part: string;
  label: string;
  title: string;
  description?: string;
  accent?: "gold" | "emerald";
}) {
  const accentBorder = accent === "emerald" ? "border-emerald-500/25" : "border-kp-gold/25";
  const accentText = accent === "emerald" ? "text-emerald-400/90" : "text-kp-gold/90";
  const accentBg =
    accent === "emerald"
      ? "bg-[radial-gradient(900px_320px_at_20%_50%,rgba(16,185,129,0.12),transparent_60%)]"
      : "bg-[radial-gradient(900px_320px_at_20%_50%,rgba(201,169,98,0.14),transparent_60%)]";

  return (
    <div className={`relative overflow-hidden border-y border-white/8 bg-kp-bg ${accentBg}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${accent === "emerald" ? "via-emerald-400/40" : "via-kp-gold/45"} to-transparent`}
      />
      <div className={`${pageMax} px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border ${accentBorder} bg-white/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${accentText}`}
              >
                Partie {part}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {label}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-[clamp(1.85rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-white">
              {title}
            </h2>
          </div>
          {description ? (
            <p className={`max-w-md ${bodyText} md:text-right`}>{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StepBadge({ num }: { num: string }) {
  return (
    <span className="font-serif text-5xl font-medium leading-none text-kp-gold/15 transition-colors duration-500 group-hover:text-kp-gold/30 sm:text-6xl">
      {num}
    </span>
  );
}

export function PrestigePrivilege() {
  return (
    <div className="min-h-screen bg-kp-bg font-sans text-kp-accent">
      <PrivilegeSectionNav />
      <PrivilegeFloatingCTA />
      <main>
        {/* ─── SECTION 1 : KPANDJI PRIVILÈGE ─── */}
        <div id="kpandji-privilege" aria-label="Kpandji Privilège">
        {/* ─── HERO ─── */}
        <section
          aria-label="Kpandji Privilège — Offre exclusive"
          className="relative isolate flex min-h-[88svh] items-end overflow-hidden pt-[88px] sm:min-h-[92svh] sm:pt-[100px] md:min-h-svh md:pt-[120px] lg:pt-[132px]"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={HERO_BACKDROP}
              alt="Kpandji Privilège — véhicule premium pour la diaspora"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_42%] kp-hero-zoom"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-amber-950/40 via-black/50 to-black/95"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_12%_18%,rgba(201,169,98,0.24),transparent_58%),radial-gradient(700px_500px_at_88%_35%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(900px_700px_at_50%_50%,transparent_50%,rgba(0,0,0,0.85)_100%)]"
          />
          <div
            aria-hidden
            className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.34] mix-blend-overlay"
          />

          <div aria-hidden className="pointer-events-none absolute inset-6 hidden lg:block">
            <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-kp-gold/25" />
            <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-kp-gold/25" />
            <span className="absolute bottom-24 left-0 h-8 w-8 border-b border-l border-white/12" />
            <span className="absolute bottom-24 right-0 h-8 w-8 border-b border-r border-white/12" />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-kp-gold/65 [writing-mode:vertical-rl]">
                PRIVILÈGE
              </span>
              <span className="h-24 w-px bg-linear-to-b from-kp-gold/70 via-kp-gold/25 to-transparent" />
            </div>
          </div>

          <div className={`relative z-10 ${pageMax} px-4 pb-32 sm:px-8 md:pb-36 lg:px-12 lg:pb-40 xl:px-16`}>
            <div className="lg:grid lg:grid-cols-[1fr_minmax(0,400px)] lg:items-end lg:gap-16 xl:grid-cols-[1fr_minmax(0,440px)] xl:gap-24">
              <div>
                <Reveal from="bottom">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-kp-gold/35 bg-kp-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-kp-gold backdrop-blur-sm">
                      <span aria-hidden className="size-1.5 rounded-full bg-kp-gold shadow-[0_0_10px_rgba(201,169,98,0.6)]" />
                      Offre exclusive
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                      Côte d&apos;Ivoire · Diaspora
                    </span>
                  </div>
                </Reveal>

                <Reveal from="bottom" delayMs={60}>
                  <p className={`${eyebrow} mt-5`}>
                    <span aria-hidden className="h-px w-10 bg-kp-gold/80 sm:w-16" />
                    Programme premium
                  </p>
                </Reveal>

                <Reveal from="bottom" delayMs={100}>
                  <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.2rem,7vw,5.5rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white sm:max-w-[20ch] xl:max-w-none">
                    <span className="block">Kpandji</span>
                    <span className="block bg-linear-to-r from-white via-amber-100/95 to-kp-gold bg-clip-text text-transparent">
                      Privilège
                    </span>
                  </h1>
                </Reveal>

                <Reveal from="bottom" delayMs={180}>
                  <p className={`mt-6 max-w-xl text-pretty ${bodyTextLg} md:max-w-3xl`}>
                    {INTRO}
                  </p>
                </Reveal>

                <Reveal from="bottom" delayMs={240}>
                  <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
                    <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <span>Recevoir la brochure · INFOS</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
                      <PrestigeContactCTA />
                    </div>
                  </div>
                </Reveal>

                {/* Hero highlight card — mobile & tablet */}
                <Reveal from="bottom" delayMs={320} className="mt-8 lg:hidden">
                  <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
                    />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
                      En bref
                    </p>
                    <p className="mt-3 font-serif text-xl leading-snug tracking-tight text-white sm:text-2xl">
                      Acquérez en toute sérénité.
                      <span className="text-white/55"> Roulez ou rentabilisez en Côte d&apos;Ivoire.</span>
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                      {[
                        "Paiement cash ou échelonné 6–24 mois",
                        "Conciergerie & gardiennage diaspora",
                        "Option flotte élite rentable",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5 text-[12px] leading-snug text-white/65 sm:flex-col sm:gap-2 sm:px-3.5 sm:py-3"
                        >
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-kp-gold shadow-[0_0_8px_rgba(201,169,98,0.5)] sm:mt-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </Reveal>

                <Reveal from="bottom" delayMs={360}>
                  <div className="mt-12 hidden items-center gap-3 sm:flex">
                    <span
                      aria-hidden
                      className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20"
                    >
                      <span className="kp-scroll-dot mt-1.5 size-1 rounded-full bg-kp-gold/90" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50">
                      Faire défiler
                    </span>
                  </div>
                </Reveal>
              </div>

              {/* Hero highlight card — desktop */}
              <Reveal from="right" delayMs={200} className="hidden lg:block">
                <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-[0_32px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
                    En bref
                  </p>
                  <p className="mt-4 font-serif text-2xl leading-snug tracking-tight text-white">
                    Acquérez en toute sérénité.
                    <span className="text-white/55"> Roulez ou rentabilisez en Côte d’Ivoire.</span>
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-white/8 pt-6">
                    {[
                      "Paiement cash ou échelonné 6–24 mois",
                      "Gardiennage sécurisé & livraison sur mesure",
                      "Option flotte élite — 70 % des revenus pour vous",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[13px] text-white/65">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-kp-gold shadow-[0_0_8px_rgba(201,169,98,0.5)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            </div>
          </div>

          {/* Stats strip — desktop */}
          <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/8 bg-black/45 backdrop-blur-md md:block">
            <div className={`grid grid-cols-4 px-8 lg:px-12 xl:px-16 ${pageMax}`}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`group relative flex flex-col gap-1 py-7 transition-colors duration-500 hover:bg-white/3 ${
                    i > 0 ? "border-l border-white/8 pl-6" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-kp-gold/80 via-kp-gold/40 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />
                  <span className="font-serif text-2xl font-medium tracking-tight text-white md:text-3xl">
                    {s.value}
                  </span>
                  <span className={`${statLabel} md:text-[11px]`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile stats */}
        <section className="border-y border-white/8 bg-kp-surface md:hidden" aria-label="Chiffres clés Kpandji Privilège">
          <div className={`grid grid-cols-2 gap-px bg-white/8 ${pageMax}`}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-kp-surface px-5 py-7">
                <span className="font-serif text-2xl font-medium tracking-tight text-white">{s.value}</span>
                <span className={`${statLabel} text-[10px]`}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

      
        {/* MARQUEE */}
        <section aria-hidden className="relative overflow-hidden border-b border-white/8 bg-kp-bg py-9 sm:py-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-kp-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-kp-bg to-transparent" />
          <div className="kp-marquee-track flex w-max items-center gap-10 whitespace-nowrap text-white/50 sm:gap-14">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-10 sm:gap-14">
                {marqueeValues.map((v, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="flex items-center gap-10 font-serif text-xl font-normal tracking-tight sm:gap-14 sm:text-2xl md:text-3xl"
                  >
                    <span>{v}</span>
                    <span className="size-1.5 shrink-0 rounded-full bg-kp-gold/80 shadow-[0_0_12px_rgba(201,169,98,0.4)]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* MODELS */}
        <section
          id="modeles"
          aria-labelledby="modeles-heading"
          className="relative isolate scroll-mt-28 overflow-hidden border-b border-white/8 bg-kp-surface md:scroll-mt-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Gamme premium"
                title="Choisissez votre modèle"
                titleId="modeles-heading"
                description="Sélectionnés pour leur excellence et leur confort supérieur — conçus pour nos routes."
              />
            </Reveal>

            <div className="mt-12 lg:mt-16">
              {/* Mobile & tablet: horizontal snap carousel */}
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {/* Featured model — LATHAYE */}
              <Reveal from="left" className="w-[88vw] shrink-0 snap-center sm:w-[72vw] lg:col-span-7 lg:w-auto lg:shrink">
                <Link
                  href={models[0].href}
                  className={`${cardClass} flex h-full min-h-[360px] flex-col justify-end sm:min-h-[420px] lg:min-h-[560px]`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={models[0].image}
                      alt={models[0].name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_20%_80%,rgba(201,169,98,0.2),transparent_65%)]" />
                  </div>
                  <div className="relative p-7 sm:p-9">
                    <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold backdrop-blur-md">
                      {models[0].tagline}
                    </span>
                    <h3 className="mt-4 font-serif text-4xl tracking-tight text-white sm:text-5xl">{models[0].name}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/70">{models[0].body}</p>
                  </div>
                </Link>
              </Reveal>

              <div className="flex w-max shrink-0 snap-center gap-4 lg:col-span-5 lg:w-auto lg:flex lg:flex-col lg:gap-8">
                {models.slice(1).map((model, i) => (
                  <Reveal key={model.name} from="right" delayMs={i * 80} className="w-[78vw] shrink-0 sm:w-[60vw] lg:w-auto">
                    <Link href={model.href} className={`${cardClass} flex h-full min-h-[280px] flex-col sm:min-h-[240px] lg:min-h-[260px]`}>
                      <div className="absolute inset-0">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                      </div>
                      <div className="relative mt-auto p-6 sm:p-7">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/90">
                          {model.tagline}
                        </span>
                        <h3 className="mt-2 font-serif text-2xl tracking-tight text-white">{model.name}</h3>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/60">{model.body}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/35 lg:hidden">
                Glissez pour découvrir la gamme
              </p>
            </div>
          </div>
        </section>

        {/* PAYMENT */}
        <section
          id="paiement"
          aria-labelledby="paiement-heading"
          className="relative isolate overflow-hidden border-b border-white/8 bg-kp-bg"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_480px_at_10%_50%,rgba(201,169,98,0.1),transparent_60%)]"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                label="Flexibilité financière"
                title="Une flexibilité de paiement unique"
                titleId="paiement-heading"
                description="Nous adaptons l’achat à votre budget — que vous soyez en Côte d’Ivoire ou à l’étranger."
              />
            </Reveal>

            <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:mt-16 lg:gap-8">
              {paymentOptions.map((opt, i) => (
                <Reveal key={opt.title} from={i === 0 ? "left" : "right"} delayMs={i * 80}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/20 p-6 transition-all duration-500 hover:border-kp-gold/28 hover:bg-kp-elevated/35 sm:p-8 md:p-10">
                    <StepBadge num={String(i + 1).padStart(2, "0")} />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
                    />
                    <span className="inline-flex w-fit rounded-full border border-kp-gold/30 bg-kp-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-kp-gold">
                      {opt.highlight}
                    </span>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                      {opt.subtitle}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl tracking-tight text-white sm:text-3xl">{opt.title}</h3>
                    <p className="mt-4 flex-1 font-sans text-[14px] leading-relaxed text-white/60 sm:text-[15px]">{opt.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal from="bottom" delayMs={120}>
              <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/8 bg-kp-elevated/20 p-6 sm:p-8">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-kp-gold/85">
                  Plan échelonné Kpandji Privilège
                </p>
                <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/8">
                  <span className="flex w-[70%] items-center justify-center bg-linear-to-r from-kp-gold/90 to-kp-gold/60 text-[9px] font-bold uppercase tracking-wider text-black">
                    70 %
                  </span>
                  <span className="flex w-[30%] items-center justify-center bg-white/10 text-[9px] font-semibold uppercase tracking-wider text-white/55">
                    30 %
                  </span>
                </div>
                <div className="mt-4 flex justify-between gap-4 text-[12px] leading-relaxed text-white/55 sm:text-[13px]">
                  <span>
                    <strong className="block text-white/85">Apport initial</strong>
                    À la signature
                  </span>
                  <span className="text-right">
                    <strong className="block text-white/85">Mensualités fixes</strong>
                    6, 12 ou 24 mois
                  </span>
                </div>
                <p className="mt-5 text-center font-sans text-[12px] leading-relaxed text-white/40">
                  Délai minimum de fabrication : 120 jours après validation du premier versement.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONCIERGERIE */}
        <section
          id="conciergerie"
          aria-labelledby="conciergerie-heading"
          className="relative isolate overflow-hidden border-b border-white/8 bg-kp-surface"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Conciergerie & livraison"
                title="Nous veillons sur votre bien"
                titleId="conciergerie-heading"
                description="Ne vous souciez plus de la logistique — Kpandji Automobiles vous offre une liberté totale."
              />
            </Reveal>

            <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-24 lg:gap-8">
              {conciergeServices.map((service, i) => (
                <Reveal key={service.title} from="bottom" delayMs={i * 60}>
                  <article className="group flex h-full flex-col rounded-2xl border border-white/8 bg-kp-elevated/15 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/25 hover:bg-kp-elevated/30 sm:p-8">
                    <IconBox>{service.icon}</IconBox>
                    <h3 className="mt-5 font-serif text-xl tracking-tight text-white sm:text-2xl">{service.title}</h3>
                    <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-white/55">{service.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section
          id="concept"
          aria-labelledby="concept-heading"
          className="relative isolate overflow-hidden border-b border-white/8 bg-kp-surface"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Le concept"
                title="De l’étranger à Abidjan, en toute sérénité"
                titleId="concept-heading"
                description="Vous investissez depuis votre pays de résidence — KPANDJI opère sur le terrain ivoirien."
              />
            </Reveal>

            <div className="relative mt-16 md:mt-20 lg:mt-24">
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-8 bottom-8 hidden w-px -translate-x-1/2 bg-linear-to-b from-kp-gold/50 via-kp-gold/15 to-transparent md:block"
              />
              <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                {flowNodes.map((node, i) => (
                  <Reveal key={node.label} from="bottom" delayMs={i * 70}>
                    <div className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-kp-elevated/25 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/25 hover:bg-kp-elevated/40 sm:min-h-[260px] sm:p-8 md:min-h-[280px]">
                      {i < flowNodes.length - 1 ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-kp-gold/30 bg-kp-surface text-kp-gold md:flex"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : null}
                      {i < flowNodes.length - 1 ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -bottom-4 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-kp-gold/25 bg-kp-surface text-kp-gold md:hidden"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : null}
                      <span className="font-serif text-4xl font-medium leading-none text-kp-gold/20 transition-colors duration-500 group-hover:text-kp-gold/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-kp-gold/85">
                        {node.sub}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl tracking-tight text-white">{node.label}</h3>
                      <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-white/55">{node.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENTO BENEFITS */}
        <section
          id="avantages"
          aria-labelledby="avantages-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-kp-bg"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={FEATURE_IMAGE}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.14]"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/92 to-kp-bg"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                label="Avantages"
                title="Transparence digitale & sérénité"
                titleId="avantages-heading"
                description="Restez connecté à votre acquisition — notifications, rapports d’entretien et suivi en temps réel."
              />
            </Reveal>

            <div className="mt-16 grid gap-5 sm:gap-6 lg:mt-24 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] lg:gap-8">
              {benefits
                .filter((b) => b.featured)
                .map((benefit) => (
                  <Reveal key={benefit.title} from="left" className="lg:col-span-7 lg:row-span-2">
                    <article className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/20 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.95)] transition-all duration-500 hover:border-kp-gold/28 sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px]">
                      <div className="absolute inset-0">
                        <Image
                          src={FEATURE_IMAGE}
                          alt="Transparence digitale Kpandji Privilège"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/20" />
                        <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_20%_80%,rgba(201,169,98,0.18),transparent_65%)]" />
                      </div>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
                      />
                      <div className="relative p-6 sm:p-8">
                        <IconBox>{benefit.icon}</IconBox>
                        <h3 className="mt-5 font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight text-white">
                          {benefit.title}
                        </h3>
                        <p className="mt-3 max-w-md font-sans text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
                          {benefit.body}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}

              {benefits
                .filter((b) => !b.featured)
                .map((benefit, i) => (
                  <Reveal key={benefit.title} from="right" delayMs={i * 60} className="lg:col-span-5">
                    <article className="group flex h-full min-h-[200px] flex-col rounded-2xl border border-white/8 bg-kp-elevated/20 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/25 hover:bg-kp-elevated/35 sm:min-h-[220px] sm:p-8">
                      <IconBox>{benefit.icon}</IconBox>
                      <h3 className="mt-5 font-serif text-xl tracking-tight text-white sm:text-2xl">
                        {benefit.title}
                      </h3>
                      <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-white/55">{benefit.body}</p>
                      <span
                        aria-hidden
                        className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/55 transition-colors duration-300 group-hover:text-kp-gold/90"
                      >
                        Privilège
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3 transition-transform duration-300 group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>

        {/* TIMELINE STEPS */}
        <section
          id="parcours"
          aria-labelledby="parcours-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-kp-surface"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                label="Parcours"
                title="Quatre étapes vers votre KPANDJI"
                titleId="parcours-heading"
                description="De la sélection du modèle à la prise en main — ou à la mise en location — un processus clair et encadré."
              />
            </Reveal>

            <ol className="relative mt-16 md:mt-20 lg:mt-24">
              <span
                aria-hidden
                className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-linear-to-b from-kp-gold/60 via-kp-gold/20 to-transparent md:block"
              />
              <div className="grid gap-8 md:gap-0">
                {steps.map((step, i) => (
                  <Reveal key={step.num} from="bottom" delayMs={i * 55}>
                    <li className="group relative md:grid md:grid-cols-[48px_1fr] md:gap-10 md:py-10 lg:py-12 md:first:pt-0 md:last:pb-0">
                      <div className="relative z-10 hidden md:flex md:justify-center">
                        <span className="flex size-10 items-center justify-center rounded-full border border-kp-gold/40 bg-kp-surface font-sans text-[11px] font-semibold text-kp-gold shadow-[0_0_20px_rgba(201,169,98,0.15)] transition-colors group-hover:border-kp-gold/60 group-hover:bg-kp-gold/10">
                          {step.num}
                        </span>
                      </div>
                      <article className="overflow-hidden rounded-2xl border border-white/8 bg-kp-elevated/15 p-7 transition-all duration-500 hover:border-kp-gold/25 hover:bg-kp-elevated/30 sm:p-8 md:min-h-[140px] md:rounded-2xl lg:p-10">
                        <span className="font-serif text-3xl font-medium leading-none text-kp-gold/25 md:hidden">
                          {step.num}
                        </span>
                        <h3 className="mt-3 font-serif text-xl tracking-tight text-white sm:text-2xl md:mt-0">
                          {step.title}
                        </h3>
                        <p className="mt-3 font-sans text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                          {step.body}
                        </p>
                      </article>
                    </li>
                  </Reveal>
                ))}
              </div>
            </ol>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section
          className={`relative overflow-hidden bg-kp-bg py-16 md:py-24 lg:py-28 ${pageMax} px-5 sm:px-8 lg:px-12 xl:px-16`}
        >
          <Reveal from="bottom">
            <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-kp-elevated/70 via-kp-elevated/35 to-transparent p-10 shadow-[0_28px_90px_-42px_rgba(0,0,0,0.95)] backdrop-blur-md md:p-14 lg:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 font-serif text-[100px] leading-none text-kp-gold/12 sm:text-[140px]"
              >
                “
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
              />
              <blockquote>
                <p className="relative font-serif text-lg italic leading-[1.55] text-white/90 md:text-2xl md:leading-[1.45]">
                  La force d’une racine, l’élan d’une nation. Kpandji Privilège relie
                  la diaspora à l’excellence automobile ivoirienne — avec la garantie
                  d’un constructeur présent sur le terrain.
                </p>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-kp-gold/70" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                    Kpandji Privilège — KPANDJI AUTOMOBILES
                  </span>
                </figcaption>
              </blockquote>
            </figure>
          </Reveal>
        </section>

        {/* PRIVILÈGE CTA */}
        <section
          id="privilege-cta"
          aria-labelledby="privilege-cta-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-kp-bg"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(201,169,98,0.1),transparent_70%)]"
          />
          <div className={`${sectionPad} py-14! sm:py-18! md:py-22!`}>
            <Reveal from="bottom">
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-kp-elevated/20 p-8 text-center shadow-[0_32px_100px_-48px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-10 md:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
                />
                <p className={`${eyebrow} justify-center`}>Prêt(e) à prendre le volant ?</p>
                <h2 id="privilege-cta-heading" className={`mt-5 ${sectionTitle}`}>
                  Faites le choix de la qualité et de la sérénité
                </h2>
                <p className={`mx-auto mt-5 max-w-2xl ${bodyText}`}>
                  Répondez « INFOS » pour recevoir notre brochure détaillée et choisir votre plan de
                  paiement de 6 à 24 mois.
                </p>
                <p className="mt-4 font-serif text-lg text-white/75">
                  Kpandji Automobiles : votre partenaire de confiance en Afrique.
                </p>
                <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                  <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                    <span>WhatsApp · INFOS</span>
                  </a>
                  <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
                    <PrestigeContactCTA />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        </div>

        {/* ─── SECTION 2 : KPANDJI RENT ─── */}
        <SectionChapter
          part="02"
          label="Investissement locatif"
          title="Kpandji Rent"
          description="Transformez votre véhicule premium en source de revenus passifs."
          accent="emerald"
        />
        <div id="kpandji-rent" aria-label="Kpandji Rent" className="scroll-mt-28 md:scroll-mt-32">
        <section
          id="flotte-elite"
          aria-labelledby="flotte-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-kp-surface"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_80%_20%,rgba(201,169,98,0.12),transparent_60%)]"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Offre exclusive · Kpandji Rent"
                title="Votre véhicule de luxe devient un actif rentable"
                titleId="flotte-heading"
                description="Vous avez fait le choix de l’excellence en acquérant un véhicule chez Kpandji Automobiles. Que vous résidiez en Côte d’Ivoire ou à l’étranger, transformez votre investissement en source de revenus passifs."
              />
            </Reveal>

            <Reveal from="bottom" delayMs={60}>
              <p className={`mx-auto mt-10 max-w-3xl text-center ${bodyText}`}>
                <strong className="text-white/80">Le concept : intégrez notre flotte élite.</strong>{" "}
                Ne laissez pas votre véhicule perdre de la valeur au garage. Profitez de notre réseau
                pour rentabiliser votre bien en toute sécurité.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-12 xl:grid-cols-[1fr_380px]">
              {/* Revenue card — first on mobile for immediate impact */}
              <Reveal from="bottom" delayMs={80} className="order-first lg:order-last lg:col-start-2 lg:row-span-2">
                <aside className="relative overflow-hidden rounded-2xl border border-kp-gold/25 bg-linear-to-br from-kp-gold/15 via-kp-elevated/40 to-kp-elevated/20 p-6 shadow-[0_28px_90px_-42px_rgba(201,169,98,0.35)] sm:p-8 lg:sticky lg:top-32 lg:p-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/60 to-transparent"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
                    Répartition des revenus 
                  </p>
                  <div className="mt-6 flex items-end gap-4">
                    <div>
                      <p className="font-serif text-5xl font-medium tracking-tight text-white">70%</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/55">Pour vous</p>
                    </div>
                    <div className="mb-2 h-12 w-px bg-white/15" aria-hidden />
                    <div>
                      <p className="font-serif text-3xl font-medium tracking-tight text-white/70">30%</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/45">Pour KPANDJI</p>
                    </div>
                  </div>
                  <p className="mt-6 font-sans text-[13px] leading-relaxed text-white/55">
                    Entretien complet, gardiennage, assurance flotte et recherche de clients inclus dans la part KPANDJI.
                  </p>
                  <a
                    href={WHATSAPP_FLOTTE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnGold} mt-8`}
                  >
                    <span>Simuler mes revenus</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </aside>
              </Reveal>

              <div className="order-last space-y-8 lg:order-first lg:col-start-1">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-5">
                  {fleetBenefits.map((item, i) => (
                    <Reveal key={item.title} from="bottom" delayMs={i * 50}>
                      <article className="group h-full rounded-2xl border border-white/8 bg-kp-elevated/15 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/25 sm:p-7">
                        <span className="font-serif text-2xl text-kp-gold/25 transition-colors group-hover:text-kp-gold/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 font-serif text-lg tracking-tight text-white sm:text-xl">{item.title}</h3>
                        <p className="mt-2 font-sans text-[14px] leading-relaxed text-white/55">{item.body}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal from="bottom" delayMs={120}>
                  <div>
                    <p className={eyebrow}>
                      <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                      Votre rentabilité garantie
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 xl:gap-5">
                      {fleetRentability.map((item, i) => (
                        <article
                          key={item.title}
                          className="rounded-2xl border border-white/8 bg-kp-elevated/15 p-6 sm:p-7"
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-2 font-serif text-lg tracking-tight text-white">{item.title}</h3>
                          <p className="mt-2 font-sans text-[14px] leading-relaxed text-white/55">{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal from="bottom" delayMs={160}>
                  <p className={`${bodyText} rounded-2xl border border-white/8 bg-kp-elevated/10 p-6 sm:p-7`}>
                    En rejoignant la flotte Kpandji, vous participez à l’essor économique du continent
                    tout en faisant fructifier votre patrimoine avec le partenaire de référence à Abidjan.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* RENT CTA */}
        <section
          id="rent-cta"
          aria-labelledby="rent-cta-heading"
          className="relative isolate overflow-hidden bg-kp-bg pb-12 md:pb-16"
        >
          <div className="absolute inset-0 -z-10">
            <Image src={PATH_RENTAL_IMAGE} alt="" fill sizes="100vw" className="object-cover object-center opacity-20" />
          </div>
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/92 to-kp-bg" />

          <div className={`${sectionPad} pb-20! sm:pb-24!`}>
            <Reveal from="bottom">
              <div className="relative overflow-hidden rounded-3xl border border-kp-gold/20 bg-black/40 p-10 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-12 md:p-16">
                <div className="relative text-center">
                  <p className={`${eyebrow} justify-center`}>Kpandji Rent</p>
                  <h2
                    id="rent-cta-heading"
                    className="mt-5 font-serif text-[clamp(1.85rem,4.5vw,3rem)] font-normal leading-[1.08] tracking-tight text-white"
                  >
                    Faites passer votre investissement à la vitesse supérieure
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/65">
                    Intéressé(e) ? Répondez « FLOTTE » pour recevoir les modalités d’intégration et une
                    simulation des revenus locatifs selon votre modèle.
                  </p>
                  <p className="mt-4 font-serif text-lg text-white/75">
                    Kpandji Automobiles : investissez aujourd’hui, encaissez demain.
                  </p>
                  <a
                    href={WHATSAPP_FLOTTE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnGold} mx-auto mt-10`}
                  >
                    <span>WhatsApp · FLOTTE</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        </div>

        {/* COORDONNÉES & CONTACTS */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative isolate scroll-mt-28 overflow-hidden border-t border-white/8 bg-kp-surface pb-12 md:scroll-mt-32 md:pb-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
          />
          <div className={`${sectionPad} pb-12! sm:pb-16!`}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Coordonnées & contacts"
                title="Retrouvez Kpandji Automobiles"
                titleId="contact-heading"
                description="Kpandji Automobiles : la force d’une racine, l’élan d’une nation."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
              <Reveal from="left">
                <div className="relative overflow-hidden rounded-2xl border border-kp-gold/20 bg-linear-to-br from-kp-gold/10 via-kp-elevated/30 to-kp-elevated/10 p-7 sm:p-9 lg:sticky lg:top-32">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
                  />
                  <p className="text-3xl" aria-hidden>
                    📍
                  </p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-kp-gold/85">
                    Siège social
                  </p>
                  <p className="mt-2 font-serif text-xl leading-snug text-white sm:text-2xl">
                    Abidjan, Riviera Palmeraie
                  </p>
                  <p className="mt-1 text-[14px] text-white/55">Côte d&apos;Ivoire</p>
                  <div className="mt-8 space-y-3 border-t border-white/10 pt-8">
                    <a
                      href="tel:+2252723279567"
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-[14px] text-white/80 transition hover:border-kp-gold/30 hover:text-kp-gold"
                    >
                      <span aria-hidden>📞</span>
                      +225 27 23 27 95 67
                    </a>
                    <a
                      href="mailto:contact@kpandji.com"
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-[14px] text-white/80 transition hover:border-kp-gold/30 hover:text-kp-gold"
                    >
                      <span aria-hidden>📧</span>
                      contact@kpandji.com
                    </a>
                    <a
                      href="https://www.kpandjiautomobiles.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-[14px] text-white/80 transition hover:border-kp-gold/30 hover:text-kp-gold"
                    >
                      <span aria-hidden>🌐</span>
                      www.kpandjiautomobiles.com
                    </a>
                  </div>
                  <p className="mt-8 font-serif text-base italic leading-relaxed text-white/70">
                    La force d&apos;une racine, l&apos;élan d&apos;une nation.
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {contacts.slice(1).map((item, i) => (
                  <Reveal key={item.label} from="bottom" delayMs={i * 40}>
                    <div className={`${cardClass} flex h-full flex-col p-5 sm:p-6`}>
                      <span className="text-xl" aria-hidden>
                        {item.icon}
                      </span>
                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/75">
                        {item.label}
                      </p>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-2 block flex-1 text-[14px] leading-relaxed text-white/80 transition-colors hover:text-kp-gold sm:text-[15px]"
                        >
                          {item.value}
                          {"note" in item && item.note ? (
                            <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-kp-gold/80">
                              {item.note}
                            </span>
                          ) : null}
                        </a>
                      ) : (
                        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            
          </div>
        </section>
      </main>
    </div>
  );
}
