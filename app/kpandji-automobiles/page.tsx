import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/kp/Reveal";

export const metadata: Metadata = {
  title: "Kpandji Automobiles — KPANDJI AUTOMOBILES",
  description:
    "Découvrez KPANDJI Automobiles : notre histoire, notre vision et l’engagement d’une équipe au service de la mobilité en Côte d’Ivoire et en Afrique.",
  alternates: {
    canonical: "/kpandji-automobiles",
  },
  openGraph: {
    title: "Kpandji Automobiles — KPANDJI AUTOMOBILES",
    description:
      "L’entreprise derrière KPANDJI AUTOMOBILES : ingénierie, assemblage et service client.",
    type: "website",
    locale: "fr_FR",
  },
};

const FOUNDER_IMAGE = "/company/company3.jpg";
const GARAGE_IMAGES = ["/garage5.jpeg", "/garage2.jpg", "/garage3.jpg"];
const HERO_BACKDROP = "/models/para/pic.jpg";
const CTA_BACKDROP = "/models/para/pic1.jpg";
const PILLAR_FEATURE_IMAGE = "/models/para/pic2.jpg";

const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const btnGhost =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-kp-gold/45 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const eyebrow =
  "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const stats = [
  { value: "2024", label: "Année de fondation" },
  { value: "100%", label: "Made in Côte d’Ivoire" },
  { value: "4+", label: "Modèles à venir" },
  { value: "∞", label: "Vision panafricaine" },
];

const marqueeValues = [
  "Ingénierie locale",
  "Qualité d’exécution",
  "Service de proximité",
  "Vision durable",
  "Identité africaine",
  "Made in Côte d’Ivoire",
];

const pillars = [
  {
    title: "Ingénierie locale",
    body: "Conception et assemblage menés par des équipes ivoiriennes, formées aux standards internationaux.",
    icon: (
      <path d="M4 12h4l2-7 4 14 2-7h4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Qualité d’exécution",
    body: "Contrôle qualité strict avant livraison : finitions, sécurité, fiabilité mécanique vérifiées.",
    icon: (
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Service de proximité",
    body: "Un réseau SAV dédié, des pièces disponibles et des conseillers à l’écoute, partout dans le pays.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Vision durable",
    body: "Une feuille de route long terme : développer une industrie automobile africaine, exigeante et responsable.",
    icon: (
      <>
        <path d="M12 22s-8-4.5-8-12a8 8 0 0116 0c0 7.5-8 12-8 12z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: "Réseau & logistique",
    body: "Showrooms, centres techniques et logistique pensés pour servir les réalités du terrain.",
    icon: (
      <>
        <rect x="3" y="7" width="13" height="10" rx="1.5" />
        <path d="M16 11h4l1 2v3h-5z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="18" cy="18" r="1.6" />
      </>
    ),
  },
  {
    title: "Identité africaine",
    body: "Un design et des choix techniques inspirés des routes, des usages et des aspirations du continent.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </>
    ),
  },
];

const journey = [
  {
    year: "Origine",
    title: "Une conviction industrielle",
    body: "Faire émerger un constructeur ivoirien capable de concilier exigence technique et ancrage local.",
  },
  {
    year: "Aujourd’hui",
    title: "Conception & assemblage",
    body: "Une gamme pensée pour les routes africaines, du SUV familial à l’utilitaire de travail.",
  },
  {
    year: "Demain",
    title: "Une marque panafricaine",
    body: "Étendre le réseau, structurer le SAV et porter une signature automobile africaine reconnue.",
  },
];

export default function KpandjiAutomobilesPage() {
  return (
    <div className="min-h-screen bg-kp-bg text-kp-accent">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        aria-label="Kpandji Automobiles — l’entreprise"
        className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-[110px] md:min-h-[96svh] md:pt-[132px]"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BACKDROP}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_38%]"
          />
        </div>

        {/* Layered overlays for cinematic depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/35 to-black/95"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_18%_22%,rgba(201,169,98,0.20),transparent_60%),radial-gradient(900px_700px_at_50%_50%,transparent_55%,rgba(0,0,0,0.78)_100%)]"
        />
        <div
          aria-hidden
          className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-overlay"
        />

        {/* Editorial corner brackets — desktop only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-6 hidden lg:block"
        >
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-white/15" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-white/15" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white/15" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-white/15" />
        </div>

        {/* Vertical chapter numeral — desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/55 [writing-mode:vertical-rl]">
              Chapitre / 01
            </span>
            <span className="h-24 w-px bg-linear-to-b from-kp-gold/70 via-kp-gold/30 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
          <Reveal from="bottom">
            <div className={eyebrow}>
              <span aria-hidden className="h-px w-10 bg-kp-gold/80 sm:w-16" />
              L’entreprise — depuis 2024
            </div>
          </Reveal>

          <Reveal from="bottom" delayMs={120}>
            <h1 className="mt-5 max-w-[20ch] font-serif text-[clamp(2.4rem,6.4vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white">
              <span className="block">Kpandji</span>
              <span className="block bg-linear-to-r from-white via-white/90 to-kp-gold/85 bg-clip-text text-transparent">
                Automobiles
              </span>
            </h1>
          </Reveal>

          <Reveal from="bottom" delayMs={200}>
            <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]">
              Constructeur et distributeur engagé derrière la marque{" "}
              <span className="text-white">KPANDJI AUTOMOBILES</span> — concevoir des
              véhicules adaptés aux réalités locales, avec une exigence de
              qualité et un service de proximité.
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={280}>
            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/modeles" className={btnPrimary}>
                <span>Découvrir nos véhicules</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/contact" className={btnGhost}>
                Nous contacter
              </Link>
            </div>
          </Reveal>

          {/* Scroll cue */}
          <Reveal from="bottom" delayMs={420}>
            <div className="mt-14 hidden items-center gap-3 sm:flex">
              <span
                aria-hidden
                className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20"
              >
                <span className="kp-scroll-dot mt-1.5 size-1 rounded-full bg-white/80" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55">
                Faire défiler
              </span>
            </div>
          </Reveal>
        </div>

        {/* Stats strip — anchored at the bottom of the hero */}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/8 bg-black/40 backdrop-blur-md md:block">
          <div className="mx-auto grid max-w-[1280px] grid-cols-4 px-8 lg:px-12">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`group relative flex flex-col gap-1 py-5 transition-colors duration-500 hover:bg-white/3 ${
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

      {/* Mobile stats (under hero) */}
      <section className="border-y border-white/8 bg-kp-surface md:hidden">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-white/8 px-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 bg-kp-surface px-5 py-5"
            >
              <span className="font-serif text-2xl font-medium tracking-tight text-white">
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── HISTOIRE / FOUNDER ───────────────────── */}
      <section
        aria-labelledby="histoire-heading"
        className="relative isolate overflow-hidden bg-kp-bg"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_85%_10%,rgba(201,169,98,0.10),transparent_60%),radial-gradient(700px_500px_at_10%_90%,rgba(255,255,255,0.04),transparent_55%)]"
        />

        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal from="bottom">
            <div className="mx-auto max-w-2xl text-center">
              <p className={eyebrow + " justify-center"}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                Notre histoire
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
              </p>
              <h2
                id="histoire-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.1] tracking-tight text-white"
              >
                Une vision industrielle,
                <br className="hidden sm:block" /> ancrée en Afrique.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-start lg:gap-16">
            {/* Founder portrait */}
            <Reveal from="left">
              <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:sticky lg:top-28">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-[28px] bg-linear-to-br from-kp-gold/28 via-transparent to-white/5 opacity-80 blur-md"
                />
                <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40 shadow-[0_28px_90px_-42px_rgba(0,0,0,0.95)] backdrop-blur-md">
                  <div className="relative aspect-3/4 w-full bg-kp-elevated/60">
                    <Image
                      src={FOUNDER_IMAGE}
                      alt="Fondateur — Kpandji Automobiles"
                      fill
                      className="object-cover transition-transform duration-1200 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 440px"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                    />

                    {/* Monogram seal */}
                    <div
                      aria-hidden
                      className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-kp-gold/40 bg-black/45 font-serif text-[14px] font-semibold tracking-widest text-kp-gold/95 backdrop-blur-md sm:size-14 sm:text-[15px]"
                    >
                      KP
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kp-gold/95">
                        Le fondateur
                      </p>
                      <p className="mt-2 font-serif text-xl font-medium text-white sm:text-2xl">
                        Une parole engagée
                      </p>
                    </div>
                  </div>
                </figure>

                {/* Decorative tag */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-kp-gold/90 shadow-[0_0_10px_rgba(201,169,98,0.45)]"
                    />
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                      Côte d’Ivoire — Abidjan
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
                    01 / 03
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Narrative */}
            <div className="space-y-12">
              <Reveal from="right" delayMs={80}>
                <div className="relative pl-6 sm:pl-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-full w-px bg-linear-to-b from-kp-gold/60 via-kp-gold/15 to-transparent"
                  />
                  <p className={eyebrow}>Origine</p>
                  <h3 className="mt-3 font-serif text-2xl font-normal tracking-tight text-white md:text-3xl">
                    Bâtir un constructeur africain.
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.8] text-white/65 md:text-[16px]">
                    Kpandji Automobiles est née d’une conviction simple : la
                    mobilité doit être fiable, accessible et au service du
                    développement économique. En nous appuyant sur l’ingénierie,
                    l’assemblage et un réseau de partenaires exigeants, nous
                    bâtissons une offre automobile pensée pour les routes, les
                    usages et les attentes de nos clients.
                  </p>
                </div>
              </Reveal>

              <Reveal from="right" delayMs={140}>
                <div className="relative pl-6 sm:pl-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-full w-px bg-linear-to-b from-kp-gold/60 via-kp-gold/15 to-transparent"
                  />
                  <p className={eyebrow}>Mission</p>
                  <h3 className="mt-3 font-serif text-2xl font-normal tracking-tight text-white md:text-3xl">
                    Une exigence, du showroom à l’atelier.
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.8] text-white/65 md:text-[16px]">
                    Proposer des véhicules robustes et modernes, accompagnés
                    d’un service après-vente et d’équipes commerciales à
                    l’écoute. Chaque étape — du premier essai à l’entretien —
                    reflète notre engagement pour la transparence et la
                    durabilité de la relation client.
                  </p>
                </div>
              </Reveal>

              {/* Pull quote */}
              <Reveal from="bottom" delayMs={160}>
                <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-kp-elevated/65 via-kp-elevated/30 to-kp-elevated/10 p-7 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md md:p-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 font-serif text-[120px] leading-none text-kp-gold/15 sm:-right-4 sm:-top-2 sm:text-[160px]"
                  >
                    “
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
                  />
                  <blockquote className="relative">
                    <p className="font-serif text-lg italic leading-[1.55] text-white/90 md:text-2xl md:leading-[1.45]">
                      Nous investissons dans l’industrie automobile ici, avec
                      des équipes locales et une vision long terme : faire du
                      groupe KPANDJI un repère de confiance pour les
                      particuliers comme pour les professionnels.
                    </p>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span aria-hidden className="h-px w-8 bg-kp-gold/70" />
                      <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                        Le fondateur — Kpandji Automobiles
                      </span>
                    </figcaption>
                  </blockquote>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── MARQUEE / VALUES STRIP ───────────────────── */}
      <section
        aria-hidden
        className="relative overflow-hidden border-y border-white/8 bg-kp-bg py-7"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-kp-bg to-transparent"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-kp-bg to-transparent"
        />
        <div className="kp-marquee flex w-max items-center gap-12 whitespace-nowrap text-white/55">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-12">
              {marqueeValues.map((v, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-12 font-serif text-2xl font-normal tracking-tight md:text-3xl"
                >
                  <span className="hover:text-white">{v}</span>
                  <span className="size-1.5 shrink-0 rounded-full bg-kp-gold/80 shadow-[0_0_12px_rgba(201,169,98,0.4)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes kp-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .kp-marquee {
            animation: kp-marquee 38s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .kp-marquee { animation: none; }
          }
        `}</style>
      </section>

      {/* ───────────────────── ENGAGEMENTS / PILLARS ───────────────────── */}
      <section
        aria-labelledby="engagements-heading"
        className="relative isolate overflow-hidden bg-kp-surface"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[72px_72px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/55 to-transparent"
        />

        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal from="bottom">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="max-w-2xl">
                <p className={eyebrow}>
                  <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                  Nos engagements
                </p>
                <h2
                  id="engagements-heading"
                  className="mt-4 font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.1] tracking-tight text-white"
                >
                  Six piliers, une exigence.
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-white/55 md:text-[15px]">
                Chaque promesse devient une discipline interne — pour que la
                qualité ne soit jamais une option.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-6 md:gap-5">
            {/* Featured pillar — first one with image background */}
            <Reveal from="bottom" className="md:col-span-3 md:row-span-2">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-kp-bg p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/30 md:p-10">
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={PILLAR_FEATURE_IMAGE}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-40 transition-all duration-1000 group-hover:scale-[1.04] group-hover:opacity-50"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black via-black/80 to-black/40"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_320px_at_20%_30%,rgba(201,169,98,0.18),transparent_70%)]"
                  />
                </div>

                <div className="flex h-full flex-col">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-kp-gold/40 bg-kp-gold/10 text-kp-gold transition-colors duration-500 group-hover:bg-kp-gold/15">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="size-5"
                    >
                      {pillars[0].icon}
                    </svg>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-normal tracking-tight text-white md:text-3xl">
                    {pillars[0].title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70 md:text-[16px]">
                    {pillars[0].body}
                  </p>

                  <div className="mt-auto flex items-end justify-between pt-10">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-kp-gold/85">
                      <span>Pilier 01</span>
                      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
                    </span>
                    <span
                      aria-hidden
                      className="font-serif text-5xl font-medium leading-none text-white/8 md:text-6xl"
                    >
                      01
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Remaining pillars in compact grid */}
            {pillars.slice(1).map((p, idx) => {
              const i = idx + 1;
              return (
                <Reveal
                  key={p.title}
                  from="bottom"
                  delayMs={i * 60}
                  className="md:col-span-3 lg:col-span-2"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-kp-bg p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-kp-gold/25 hover:bg-kp-elevated/40 md:p-8">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-kp-gold/70 via-kp-gold/30 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-kp-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    />

                    <div className="flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-kp-gold/30 bg-kp-gold/10 text-kp-gold transition-colors duration-500 group-hover:bg-kp-gold/15">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="size-5"
                        >
                          {p.icon}
                        </svg>
                      </div>
                      <span
                        aria-hidden
                        className="font-serif text-2xl font-medium leading-none text-white/12 transition-colors duration-500 group-hover:text-white/20"
                      >
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-xl font-normal tracking-tight text-white md:text-[22px]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
                      {p.body}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 group-hover:text-kp-gold/85">
                      <span>Pilier 0{i + 1}</span>
                      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────── JOURNEY / TIMELINE ───────────────────── */}
      <section
        aria-labelledby="journey-heading"
        className="relative isolate overflow-hidden bg-kp-bg"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(201,169,98,0.10),transparent_60%)]"
        />

        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal from="bottom">
            <div className="mx-auto max-w-2xl text-center">
              <p className={eyebrow + " justify-center"}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                Notre trajectoire
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
              </p>
              <h2
                id="journey-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.1] tracking-tight text-white"
              >
                Hier, aujourd’hui, demain.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-white/55 md:text-[15px]">
                Trois étapes pour comprendre notre démarche : d’une conviction à
                l’action, jusqu’à une marque pensée pour le continent.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-14 md:mt-20">
            {/* Horizontal connector — desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent md:block"
            />

            <ol className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
              {journey.map((step, i) => (
                <Reveal key={step.year} from="bottom" delayMs={i * 100}>
                  <li className="group relative flex h-full flex-col">
                    {/* Step marker */}
                    <div className="relative mb-8 flex items-center gap-4">
                      <div
                        aria-hidden
                        className="relative flex size-14 items-center justify-center rounded-full border border-kp-gold/40 bg-kp-bg shadow-[0_0_0_6px_rgba(5,5,5,1)] transition-all duration-500 group-hover:border-kp-gold/80"
                      >
                        <span className="absolute inset-1.5 rounded-full bg-kp-gold/10 transition-colors duration-500 group-hover:bg-kp-gold/20" />
                        <span className="relative font-serif text-lg font-medium text-kp-gold/95">
                          0{i + 1}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                        Étape
                      </span>
                    </div>

                    <article className="relative flex h-full flex-col rounded-2xl border border-white/8 bg-kp-elevated/40 p-7 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-kp-gold/25 group-hover:bg-kp-elevated/55 md:p-8">
                      <p className="font-serif text-2xl font-medium tracking-tight text-kp-gold/95 md:text-3xl">
                        {step.year}
                      </p>
                      <h3 className="mt-3 font-serif text-xl font-normal text-white md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
                        {step.body}
                      </p>

                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-kp-gold/70 via-kp-gold/30 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                      />
                    </article>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────────── INSTALLATIONS GALLERY ───────────────────── */}
      <section
        aria-labelledby="installations-heading"
        className="relative isolate overflow-hidden bg-kp-surface"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/55 to-transparent"
        />

        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal from="bottom">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="max-w-2xl">
                <p className={eyebrow}>
                  <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                  Nos installations
                </p>
                <h2
                  id="installations-heading"
                  className="mt-4 font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.1] tracking-tight text-white"
                >
                  Là où nos véhicules prennent vie.
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-white/55 md:text-[15px]">
                Espaces d’accueil, atelier et suivi technique pour entretenir
                votre véhicule dans les règles de l’art.
              </p>
            </div>
          </Reveal>

          <Reveal from="bottom" delayMs={120}>
            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:grid-rows-2 md:gap-5">
              {/* Feature image */}
              <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40 md:col-span-2 md:row-span-2">
                <div className="relative aspect-16/10 w-full md:aspect-auto md:h-full md:min-h-[480px]">
                  <Image
                    src={GARAGE_IMAGES[0]}
                    alt="Atelier principal — Kpandji Automobiles"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Index marker */}
                  <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                    <span className="size-1 rounded-full bg-kp-gold/95" />
                    01 — Atelier
                  </span>

                  <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-kp-gold/95">
                      Atelier principal
                    </p>
                    <p className="mt-2 font-serif text-2xl font-medium text-white md:text-3xl">
                      Assemblage & contrôle qualité
                    </p>
                    <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/65 md:text-[14px]">
                      Une chaîne de production rigoureuse, où chaque véhicule
                      est inspecté avant livraison.
                    </p>
                  </figcaption>
                </div>
              </figure>

              {/* Showroom */}
              <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40">
                <div className="relative aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-[230px]">
                  <Image
                    src={GARAGE_IMAGES[1]}
                    alt="Espace d’accueil — Kpandji Automobiles"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                    <span className="size-1 rounded-full bg-kp-gold/95" />
                    02 — Showroom
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/95">
                      Showroom
                    </p>
                    <p className="mt-1.5 font-serif text-lg font-medium text-white">
                      Accueil client
                    </p>
                  </figcaption>
                </div>
              </figure>

              {/* Service technique */}
              <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40">
                <div className="relative aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-[230px]">
                  <Image
                    src={GARAGE_IMAGES[2]}
                    alt="Suivi technique — Kpandji Automobiles"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                    <span className="size-1 rounded-full bg-kp-gold/95" />
                    03 — Service
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/95">
                      Service technique
                    </p>
                    <p className="mt-1.5 font-serif text-lg font-medium text-white">
                      Entretien & SAV
                    </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── FINAL CTA ───────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="relative isolate overflow-hidden bg-kp-bg"
      >
        {/* Cinematic backdrop */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={CTA_BACKDROP}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_45%] opacity-25"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/85 to-kp-bg"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_50%,rgba(201,169,98,0.18),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/55 to-transparent"
        />
        <div
          aria-hidden
          className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-overlay"
        />

        <div className="mx-auto max-w-[1100px] px-5 py-24 text-center sm:px-8 md:py-36 lg:px-12">
          <Reveal from="bottom">
            <div className="mx-auto flex w-full max-w-sm items-center gap-3">
              <span
                aria-hidden
                className="h-px flex-1 bg-linear-to-r from-transparent via-kp-gold/45 to-kp-gold/20"
              />
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-kp-gold/95 shadow-[0_0_14px_rgba(201,169,98,0.45)]"
              />
              <span
                aria-hidden
                className="h-px flex-1 bg-linear-to-l from-transparent via-kp-gold/45 to-kp-gold/20"
              />
            </div>
          </Reveal>

          <Reveal from="bottom" delayMs={80}>
            <p className={eyebrow + " mt-7 justify-center"}>
              Kpandji AUTOMOBILES — Côte d’Ivoire
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={140}>
            <h2
              id="cta-heading"
              className="mt-5 font-serif text-[clamp(2rem,4.8vw,3.7rem)] font-normal leading-[1.06] tracking-tight text-white"
            >
              La force d’une racine,
              <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-kp-gold via-kp-gold/90 to-white/85 bg-clip-text text-transparent">
                {" "}l’élan d’une nation.
              </span>
            </h2>
          </Reveal>

          <Reveal from="bottom" delayMs={220}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-[16px]">
              Découvrez nos véhicules, planifiez un essai ou échangez avec nos
              équipes — nous sommes à votre écoute.
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/modeles" className={btnPrimary}>
                <span>Voir les modèles</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/contact" className={btnGhost}>
                Nous contacter
              </Link>
            </div>
          </Reveal>

          <Reveal from="bottom" delayMs={380}>
            <div className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/35 sm:flex-row sm:justify-center sm:gap-6">
              <span>Abidjan</span>
              <span aria-hidden className="hidden size-1 rounded-full bg-white/25 sm:block" />
              <span>Made in Côte d’Ivoire</span>
              <span aria-hidden className="hidden size-1 rounded-full bg-white/25 sm:block" />
              <span>Vision panafricaine</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
