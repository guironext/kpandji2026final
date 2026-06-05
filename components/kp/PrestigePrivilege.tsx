import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PrestigeContactCTA } from "@/components/kp/PrestigeContactCTA";
import { Reveal } from "@/components/kp/Reveal";

const HERO_BACKDROP = "/models/para/pic.jpg";
const FEATURE_IMAGE = "/models/para/pic2.jpg";
const PATH_ARRIVAL_IMAGE = "/models/para/pic1.jpg";
const PATH_RENTAL_IMAGE = "/models/prest.png";
const CTA_BACKDROP = "/derniers/djetran.jpeg";

const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const btnGhost =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-kp-gold/45 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const eyebrow =
  "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const pageMax = "mx-auto w-full max-w-[1680px]";

const sectionPad =
  `${pageMax} px-5 py-20 sm:px-8 sm:py-24 md:py-32 lg:px-12 lg:py-36 xl:px-16 xl:py-40`;

const sectionTitle =
  "font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const INTRO =
  "Le programme Prestige s’adresse à la diaspora et à toute personne résidant à l’étranger qui souhaite acquérir un véhicule KPANDJI en Côte d’Ivoire, sans attendre son retour pour finaliser le projet. Vous réglez votre automobile depuis votre pays de résidence ; KPANDJI s’occupe du reste sur place.";

const stats = [
  { value: "2", label: "Options d’usage" },
  { value: "100%", label: "Constructeur ivoirien" },
  { value: "CI", label: "Ancrage local" },
  { value: "∞", label: "Suivi à distance" },
];

const benefits = [
  {
    title: "Achat sécurisé",
    body: "Transaction directe avec le constructeur, sans intermédiaire opaque.",
    icon: (
      <path
        d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
        strokeLinejoin="round"
      />
    ),
    featured: true,
  },
  {
    title: "Prêt à l’arrivée",
    body: "Véhicule entretenu et disponible dès votre descente d’avion.",
    icon: <path d="M5 17h14l-1.5-5.5a2 2 0 00-1.9-1.5H8.4a2 2 0 00-1.9 1.5L5 17z" strokeLinejoin="round" />,
    featured: false,
  },
  {
    title: "Gestion locative",
    body: "KPANDJI exploite le véhicule pendant votre absence.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M7 11h4M7 15h6" strokeLinecap="round" />
      </>
    ),
    featured: false,
  },
  {
    title: "Revenus à distance",
    body: "Reversement des loyers perçus, où que vous résidiez.",
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

const paths = [
  {
    id: "arrivee",
    tag: "Option A",
    title: "Utiliser à votre arrivée",
    body:
      "Votre KPANDJI vous attend en Côte d’Ivoire : prêt à rouler dès votre descente d’avion. Idéal pour les séjours réguliers, les retours au pays ou une installation progressive.",
    bullets: [
      "Véhicule entretenu pendant votre absence",
      "Remise des clés à votre convenance",
      "Accompagnement administratif local",
    ],
    image: PATH_ARRIVAL_IMAGE,
    alt: "Véhicule KPANDJI prêt pour la récupération en Côte d’Ivoire",
    reverse: false,
  },
  {
    id: "location",
    tag: "Option B",
    title: "Location gérée par KPANDJI",
    body:
      "Confiez la mise en location à KPANDJI. Nous gérons l’exploitation sur place et vous reversez les revenus générés, où que vous viviez.",
    bullets: [
      "Gestion locative professionnelle",
      "Suivi et reporting transparent",
      "Revenus perçus depuis l’étranger",
    ],
    image: PATH_RENTAL_IMAGE,
    alt: "Services et flotte KPANDJI en Côte d’Ivoire",
    reverse: true,
  },
] as const;

const marqueeValues = [
  "Diaspora ivoirienne",
  "Achat à distance",
  "Investissement automobile",
  "Côte d’Ivoire",
  "Gestion locative",
  "Revenus à l’étranger",
  "Constructeur local",
  "Prestige KPANDJI",
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
        <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55 md:text-[15px]">
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
      <p className="max-w-lg text-[14px] leading-relaxed text-white/55 md:text-[15px] lg:max-w-md lg:pb-1 lg:text-right">
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

export function PrestigePrivilege() {
  return (
    <div className="min-h-screen bg-kp-bg text-kp-accent">
      <main>
        {/* ─── HERO ─── */}
        <section
          aria-label="Prestige — Programme diaspora KPANDJI"
          className="relative isolate flex min-h-screen items-end overflow-hidden pt-[100px] sm:pt-[110px] md:min-h-[105svh] md:pt-[132px] lg:min-h-[108svh]"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={HERO_BACKDROP}
              alt="Programme Prestige KPANDJI — mobilité pour la diaspora"
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
                PRESTIGE
              </span>
              <span className="h-24 w-px bg-linear-to-b from-kp-gold/70 via-kp-gold/25 to-transparent" />
            </div>
          </div>

          <div className={`relative z-10 ${pageMax} px-5 pb-28 sm:px-8 md:pb-36 lg:px-12 lg:pb-40 xl:px-16`}>
            <div className="lg:grid lg:grid-cols-[1fr_minmax(0,400px)] lg:items-end lg:gap-16 xl:grid-cols-[1fr_minmax(0,440px)] xl:gap-24">
              <div>
                <Reveal from="bottom">
                  <p className={eyebrow}>
                    <span aria-hidden className="h-px w-10 bg-kp-gold/80 sm:w-16" />
                    Privilège · Prestige
                  </p>
                </Reveal>

                <Reveal from="bottom" delayMs={100}>
                  <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.2rem,7vw,5.5rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white sm:max-w-[20ch] xl:max-w-none">
                    <span className="block">Votre KPANDJI,</span>
                    <span className="block bg-linear-to-r from-white via-amber-100/95 to-kp-gold bg-clip-text text-transparent">
                      où que vous viviez
                    </span>
                  </h1>
                </Reveal>

                <Reveal from="bottom" delayMs={180}>
                  <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:max-w-3xl md:text-[17px]">
                    {INTRO}
                  </p>
                </Reveal>

                <Reveal from="bottom" delayMs={260}>
                  <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <Link href="#parcours" className={`${btnPrimary} w-full sm:w-auto`}>
                      <span>Comment ça marche</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                        aria-hidden
                      >
                        <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <Link href="#options" className={`${btnGhost} w-full sm:w-auto`}>
                      Les deux options
                    </Link>
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
                      Achetez depuis l&apos;étranger.
                      <span className="text-white/55"> Roulez ou gagnez en Côte d&apos;Ivoire.</span>
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                      {[
                        "Paiement & contrat à distance",
                        "Véhicule géré sur place",
                        "Usage personnel ou location",
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
                    Achetez depuis l’étranger.
                    <span className="text-white/55"> Roulez ou gagnez en Côte d’Ivoire.</span>
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-white/8 pt-6">
                    {[
                      "Paiement & contrat à distance",
                      "Véhicule géré sur place par KPANDJI",
                      "Usage personnel ou location avec revenus",
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
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile stats */}
        <section className="border-y border-white/8 bg-kp-surface md:hidden" aria-label="Chiffres clés Prestige">
          <div className={`grid grid-cols-2 gap-px bg-white/8 ${pageMax}`}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-kp-surface px-5 py-7">
                <span className="font-serif text-2xl font-medium tracking-tight text-white">{s.value}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">{s.label}</span>
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
                title="De l’étranger à Abidjan, en toute sérénité."
                titleId="concept-heading"
                description="Un parcours pensé pour la diaspora : vous investissez, KPANDJI opère sur le terrain."
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
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">{node.desc}</p>
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
                title="Pourquoi choisir Prestige."
                titleId="avantages-heading"
                description="Sécurité, sérénité et valorisation — les piliers du programme diaspora KPANDJI."
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
                          alt="Programme Prestige — achat sécurisé à distance"
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
                        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
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
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">{benefit.body}</p>
                      <span
                        aria-hidden
                        className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/55 transition-colors duration-300 group-hover:text-kp-gold/90"
                      >
                        Prestige
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
                title="Quatre étapes, de l’étranger à Abidjan."
                titleId="parcours-heading"
                description="Un processus clair, encadré par les équipes commerciales et techniques KPANDJI."
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
                        <p className="mt-3 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
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
                  La diaspora ne doit plus choisir entre rester connectée au pays et reporter
                  son projet automobile. Prestige relie les deux — avec la garantie d’un
                  constructeur présent sur le terrain.
                </p>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-kp-gold/70" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                    Programme Prestige — KPANDJI AUTOMOBILES
                  </span>
                </figcaption>
              </blockquote>
            </figure>
          </Reveal>
        </section>

        {/* OPTIONS — editorial split */}
        <section
          id="options"
          aria-labelledby="options-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-kp-bg"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_480px_at_90%_20%,rgba(201,169,98,0.1),transparent_60%)]"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                centered
                label="Votre choix"
                title="Deux façons de valoriser votre véhicule."
                titleId="options-heading"
                description="À l’achat ou en cours de programme : usage personnel ou gestion locative — modifiable selon votre situation."
              />
            </Reveal>

            <div className="relative mt-16 space-y-8 sm:space-y-10 lg:mt-24 lg:space-y-0">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-kp-gold/35 bg-kp-bg font-serif text-sm font-medium text-kp-gold shadow-[0_0_30px_rgba(201,169,98,0.2)] lg:flex"
              >
                ou
              </div>

              {paths.map((path, i) => (
                <Reveal key={path.id} from={path.reverse ? "right" : "left"} delayMs={i * 90}>
                  <div className={i > 0 ? "space-y-6 sm:space-y-8" : undefined}>
                    {i > 0 ? (
                      <div
                        aria-hidden
                        className="mx-auto flex size-10 items-center justify-center rounded-full border border-kp-gold/30 bg-kp-surface font-serif text-xs font-medium text-kp-gold shadow-[0_0_24px_rgba(201,169,98,0.15)] lg:hidden"
                      >
                        ou
                      </div>
                    ) : null}
                    <article
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/15 transition-all duration-500 hover:border-kp-gold/28 lg:mb-8 lg:last:mb-0 ${
                      i > 0 ? "lg:mt-8" : ""
                    }`}
                  >
                    <div
                      className={`grid lg:grid-cols-2 lg:items-stretch ${
                        path.reverse ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="relative aspect-16/10 overflow-hidden sm:aspect-2/1 lg:aspect-auto lg:min-h-[400px] xl:min-h-[460px]">
                        <Image
                          src={path.image}
                          alt={path.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent lg:bg-linear-to-r lg:from-black/70 lg:via-black/25 lg:to-transparent" />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-md sm:left-6 sm:top-6">
                          <span className="size-1.5 rounded-full bg-kp-gold shadow-[0_0_8px_rgba(201,169,98,0.6)]" />
                          {path.tag}
                        </span>
                      </div>

                      <div className="flex flex-col justify-center p-7 sm:p-9 md:p-11 lg:p-14 xl:p-16">
                        <h3 className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight text-white">
                          {path.title}
                        </h3>
                        <p className="mt-4 text-[14px] leading-relaxed text-white/60 sm:text-[15px] md:text-[16px]">
                          {path.body}
                        </p>
                        <ul className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-8">
                          {path.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-[13px] text-white/75 sm:text-[14px]"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="mt-0.5 size-4 shrink-0 text-kp-gold"
                                aria-hidden
                              >
                                <path
                                  d="M5 12l4 4L19 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact-prestige"
          aria-labelledby="prestige-cta"
          className="relative isolate overflow-hidden bg-kp-bg pb-12 md:pb-16"
        >
          <div className="absolute inset-0 -z-10">
            <Image src={CTA_BACKDROP} alt="" fill sizes="100vw" className="object-cover object-center opacity-25" />
          </div>
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/90 to-kp-bg" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_40%,rgba(201,169,98,0.16),transparent_60%)]"
          />

          <div className={`${sectionPad} pb-28! sm:pb-32!`}>
            <Reveal from="bottom">
              <div className="relative overflow-hidden rounded-3xl border border-kp-gold/20 bg-black/40 p-10 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/8 backdrop-blur-xl sm:p-12 md:p-16 lg:p-20">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_320px_at_50%_0%,rgba(201,169,98,0.12),transparent_70%)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
                />

                <div className="relative text-center">
                  <p className={`${eyebrow} justify-center`}>Rejoindre Prestige</p>
                  <h2
                    id="prestige-cta"
                    className="mt-5 font-serif text-[clamp(1.85rem,4.5vw,3.25rem)] font-normal leading-[1.08] tracking-tight text-white"
                  >
                    Parlez-nous de votre projet
                    <span className="block bg-linear-to-r from-amber-200 via-kp-gold to-white/85 bg-clip-text text-transparent">
                      depuis l’étranger
                    </span>
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/65 md:text-[16px]">
                    Modèles éligibles, paiement à distance, récupération ou gestion locative :
                    mentionnez «&nbsp;Prestige&nbsp;» et notre équipe vous accompagne.
                  </p>

                  <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                    <PrestigeContactCTA />
                    <Link href="/showroom" className={`${btnGhost} w-full sm:w-auto`}>
                      Voir la gamme
                    </Link>
                    <Link
                      href="/#modeles"
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:w-auto"
                    >
                      Fiches modèles
                    </Link>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.28em] text-white/38">
                    <span>Achat à distance</span>
                    <span aria-hidden className="size-1 rounded-full bg-kp-gold/40" />
                    <span>Arrivée en Côte d&apos;Ivoire</span>
                    <span aria-hidden className="size-1 rounded-full bg-kp-gold/40" />
                    <span>Location gérée</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
