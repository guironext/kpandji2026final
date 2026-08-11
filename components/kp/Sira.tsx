"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/providers/KpLocaleProvider";
import { Reveal } from "@/components/kp/Reveal";

const WHATSAPP_SIRA =
  "https://wa.me/2250707201553?text=KPANDJI%20SIRA%20-%20Demande%20flotte";

const HERO_BACKDROP = "/models/para/pic2.jpg";

const pageMax = "mx-auto w-full max-w-[1680px]";
const sectionPad = "px-5 sm:px-8 lg:px-12 xl:px-16";

const eyebrow =
  "inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const bodyText =
  "font-sans text-[14px] leading-relaxed text-white/55 md:text-[15px]";

const bodyTextLg =
  "font-sans text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]";

const btnGold =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-kp-gold px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:w-auto sm:px-8";

const btnGhost =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10 sm:min-h-11 sm:w-auto sm:px-8";

function getTiers(tr: (fr: string, en: string) => string) {
  return [
    {
      name: tr("Bronze", "Bronze"),
      fullName: tr("Sira Bronze", "Sira Bronze"),
      model: "BANCO",
      minVehicles: 28,
      image: "/derniers/banco.png",
      brochureHref: "/fiche_tech/banco_bva.pdf",
      brochureFilename: "KPANDJI-BANCO-BVA-Fiche-technique.pdf",
      metal: "#CD7F32",
      accent: "from-[#8B5A2B]/40 via-[#CD7F32]/18 to-transparent",
      ring: "border-[#CD7F32]/40",
      badge: "text-[#CD7F32]",
      glow: "shadow-[0_0_48px_-14px_rgba(205,127,50,0.5)]",
      blurb: tr(
        "Entrée de gamme flotte — utilitaire robuste.",
        "Fleet entry level — robust utility vehicle.",
      ),
    },
    {
      name: tr("Argent", "Silver"),
      fullName: tr("Sira Argent", "Sira Silver"),
      model: "SOURALAI",
      minVehicles: 30,
      image: "/derniers/souralai.png",
      brochureHref: "/fiche_tech/souralai_suv.pdf",
      brochureFilename: "KPANDJI-SOURALAI-Fiche-technique.pdf",
      metal: "#C0C0C0",
      accent: "from-white/22 via-white/8 to-transparent",
      ring: "border-white/28",
      badge: "text-white/80",
      glow: "shadow-[0_0_48px_-14px_rgba(255,255,255,0.2)]",
      blurb: tr(
        "SUV polyvalent pour les déplacements du quotidien.",
        "Versatile SUV for everyday travel.",
      ),
    },
    {
      name: tr("Or", "Gold"),
      fullName: tr("Sira Or", "Sira Gold"),
      model: "LATHAYE 1",
      minVehicles: 30,
      image: "/derniers/lathaye.png",
      brochureHref: "/fiche_tech/lathaye_suv.pdf",
      brochureFilename: "KPANDJI-LATHAYE-Fiche-technique.pdf",
      metal: "#C9A962",
      accent: "from-kp-gold/35 via-kp-gold/14 to-transparent",
      ring: "border-kp-gold/45",
      badge: "text-kp-gold",
      glow: "shadow-[0_0_48px_-14px_rgba(201,169,98,0.5)]",
      blurb: tr(
        "Niveau premium — confort et standing.",
        "Premium tier — comfort and standing.",
      ),
    },
  ];
}

type Tier = ReturnType<typeof getTiers>[number];

function getIncluded(tr: (fr: string, en: string) => string) {
  return [
    {
      title: tr("Garantie 3 ans / 100 000 km", "3-year / 100,000 km warranty"),
      body: tr(
        "Couverture constructeur sur toute la flotte.",
        "Manufacturer coverage across the entire fleet.",
      ),
      icon: (
        <path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" strokeLinejoin="round" />
      ),
    },
    {
      title: tr("Immatriculation offerte", "Free registration"),
      body: tr(
        "Frais et démarches administratives pris en charge.",
        "Fees and administrative steps covered.",
      ),
      icon: (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 12h8M8 16h5" strokeLinecap="round" />
        </>
      ),
    },
    {
      title: tr("Assurance facilitée", "Insurance support"),
      body: tr(
        "Tarifs flotte préférentiels via nos partenaires.",
        "Preferential fleet rates through our partners.",
      ),
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />,
    },
    {
      title: tr("Financement bancaire", "Bank financing"),
      body: tr(
        "Mise en relation avec banques et mutuelles partenaires.",
        "Introductions to partner banks and mutuals.",
      ),
      icon: (
        <>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 11h18M7 15h.01M11 15h.01" strokeLinecap="round" />
        </>
      ),
    },
    {
      title: tr("Personnalisation", "Customization"),
      body: tr(
        "Options et modèles dédiés selon vos besoins.",
        "Options and dedicated models to match your needs.",
      ),
      icon: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" strokeLinecap="round" />
        </>
      ),
    },
    {
      title: tr("Livraison ≤ 120 jours", "Delivery ≤ 120 days"),
      body: tr(
        "Engagement de délai sur toute commande flotte.",
        "Committed timeline on every fleet order.",
      ),
      icon: (
        <>
          <path d="M5 17h14l-1.5-5.5a2 2 0 00-1.9-1.5H8.4a2 2 0 00-1.9 1.5L5 17z" strokeLinejoin="round" />
          <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
        </>
      ),
    },
  ];
}

function getHowSteps(tr: (fr: string, en: string) => string) {
  return [
    {
      n: "01",
      title: tr("Choisissez votre niveau", "Choose your tier"),
      body: tr(
        "Bronze, Argent ou Or — selon le modèle et le volume.",
        "Bronze, Silver or Gold — by model and volume.",
      ),
    },
    {
      n: "02",
      title: tr("On configure la flotte", "We configure the fleet"),
      body: tr(
        "Personnalisation, options, financement et assurance.",
        "Customization, options, financing and insurance.",
      ),
    },
    {
      n: "03",
      title: tr("Livraison garantie", "Guaranteed delivery"),
      body: tr(
        "Vos véhicules neufs sous 120 jours maximum.",
        "Your new vehicles within 120 days max.",
      ),
    },
  ];
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold sm:size-11">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[18px] sm:size-5" aria-hidden>
        {children}
      </svg>
    </span>
  );
}

function TierNode({ tier }: { tier: Tier }) {
  return (
    <span className="relative flex size-7 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-current/35 bg-kp-bg" style={{ color: tier.metal }} />
      <span className="absolute inset-[5px] rounded-full border border-current/25" style={{ color: tier.metal }} />
      <span
        className="relative size-2 rounded-full"
        style={{
          backgroundColor: tier.metal,
          boxShadow: `0 0 14px -2px ${tier.metal}`,
        }}
      />
    </span>
  );
}

const Sira = () => {
  const { tr } = useLocale();
  const tiers = getTiers(tr);
  const included = getIncluded(tr);
  const howSteps = getHowSteps(tr);

  return (
    <section id="sira" className="relative overflow-hidden bg-kp-bg" aria-labelledby="sira-title">
      {/* ─── Hero : une idée claire ─── */}
      <div className="relative isolate flex min-h-[min(88svh,720px)] items-end overflow-hidden sm:min-h-[min(80svh,760px)]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BACKDROP}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[52%_38%] kp-hero-zoom sm:object-[50%_40%]"
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/45 via-black/55 to-kp-bg" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(780px_420px_at_18%_20%,rgba(201,169,98,0.18),transparent_58%)]"
        />
        <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-overlay" />

        <div className={`relative z-10 w-full ${pageMax} ${sectionPad} pb-12 pt-28 sm:pb-16 sm:pt-32 md:pb-20`}>
          <Reveal from="bottom">
            <p className={eyebrow}>
              <span aria-hidden className="h-px w-8 bg-kp-gold/80 sm:w-12" />
              {tr("Offre flotte · Institutions & mutuelles", "Fleet offer · Institutions & mutuals")}
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={80}>
            <h1
              id="sira-title"
              className="mt-4 max-w-[11ch] font-serif text-[clamp(2.75rem,12vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:mt-5 sm:max-w-none"
            >
              <span className="block">Kpandji</span>
              <span className="block bg-linear-to-r from-[#CD7F32] via-kp-gold to-[#E8D5A3] bg-clip-text text-transparent">
                Sira
              </span>
            </h1>
          </Reveal>

          <Reveal from="bottom" delayMs={140}>
            <p className={`mt-5 max-w-md text-pretty sm:mt-6 ${bodyTextLg}`}>
              {tr(
                "Achetez une flotte de véhicules KPANDJI neufs — tarifs préférentiels, modèles exclusifs, accompagnement de A à Z.",
                "Buy a fleet of new KPANDJI vehicles — preferential rates, exclusive models, end-to-end support.",
              )}
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={200}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                <span>{tr("Demander une offre flotte", "Request a fleet quote")}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#niveaux" className={btnGhost}>
                {tr("Voir les 3 niveaux", "See the 3 tiers")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── En bref : 3 réponses ─── */}
      <div className={`${pageMax} ${sectionPad} py-12 sm:py-16 md:py-20`}>
        <Reveal from="bottom">
          <div className="mx-auto max-w-2xl text-center">
            <p className={`${eyebrow} justify-center`}>
              <span aria-hidden className="h-px w-6 bg-kp-gold/60" />
              {tr("En bref", "In short")}
              <span aria-hidden className="h-px w-6 bg-kp-gold/60" />
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.65rem,4vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-white">
              {tr("Sira, c’est simple", "Sira, made simple")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {[
            {
              q: tr("Pour qui ?", "For whom?"),
              a: tr(
                "Institutions, mutuelles et entreprises qui commandent une flotte (dès 28 véhicules).",
                "Institutions, mutuals and companies ordering a fleet (from 28 vehicles).",
              ),
            },
            {
              q: tr("Quoi ?", "What?"),
              a: tr(
                "Véhicules exclusifs Sira (utilitaires, citadines, SUV) au meilleur coût de possession.",
                "Exclusive Sira vehicles (utility, city, SUV) with the best cost of ownership.",
              ),
            },
            {
              q: tr("Comment ?", "How?"),
              a: tr(
                "3 niveaux Bronze → Or. Remise selon le volume. Financement, assurance, livraison inclus.",
                "3 tiers Bronze → Gold. Discount by volume. Financing, insurance, delivery included.",
              ),
            },
          ].map((item, i) => (
            <Reveal key={item.q} from="bottom" delayMs={i * 70}>
              <article className="h-full border-t border-kp-gold/35 pt-5 sm:pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-kp-gold">
                  {item.q}
                </p>
                <p className={`mt-3 text-pretty ${bodyTextLg}`}>{item.a}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Comment ça marche ─── */}
      <div className="border-y border-white/8 bg-[radial-gradient(900px_320px_at_50%_0%,rgba(201,169,98,0.08),transparent_60%)]">
        <div className={`${pageMax} ${sectionPad} py-12 sm:py-16`}>
          <Reveal from="bottom">
            <div className="max-w-xl">
              <p className={eyebrow}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/80" />
                {tr("Parcours", "Journey")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.65rem,4vw,2.5rem)] font-medium leading-[1.1] text-white">
                {tr("Comment ça marche", "How it works")}
              </h2>
            </div>
          </Reveal>

          <ol className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
            {howSteps.map((step, i) => (
              <Reveal key={step.n} from="bottom" delayMs={i * 80}>
                <li className="relative">
                  {i < howSteps.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-[2.25rem] top-5 hidden h-px w-[calc(100%-1rem)] bg-linear-to-r from-kp-gold/40 to-transparent sm:block"
                    />
                  ) : null}
                  <span className="font-serif text-3xl text-kp-gold/40 sm:text-4xl">{step.n}</span>
                  <h3 className="mt-3 font-serif text-xl text-white sm:text-[1.35rem]">{step.title}</h3>
                  <p className={`mt-2 ${bodyText}`}>{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* ─── Les 3 niveaux ─── */}
      <div id="niveaux" className={`${pageMax} ${sectionPad} scroll-mt-24 py-12 sm:py-16 md:py-20`}>
        <Reveal from="bottom">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-xl">
              <p className={eyebrow}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/80" />
                {tr("3 niveaux", "3 tiers")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.65rem,4vw,2.75rem)] font-medium leading-[1.08] text-white">
                {tr("Choisissez votre palier", "Choose your tier")}
              </h2>
            </div>
            <p className={`max-w-sm text-pretty ${bodyText} md:text-right`}>
              {tr(
                "Plus le volume est élevé, plus la remise est avantageuse. Mix de modèles possible.",
                "Higher volume means a better discount. Model mix allowed.",
              )}
            </p>
          </div>
        </Reveal>

        {/* Progression visuelle */}
        <div aria-hidden className="relative mx-auto mb-10 mt-10 hidden max-w-3xl xl:block">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[13px] h-px bg-white/10" />
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[13px] h-px bg-linear-to-r from-[#CD7F32] via-[#C0C0C0] to-kp-gold opacity-70" />
          <ol className="relative flex justify-between">
            {tiers.map((tier) => (
              <li key={tier.name} className="flex w-28 flex-col items-center">
                <TierNode tier={tier} />
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: tier.metal }}>
                  {tier.name}
                </p>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
                  ≥ {tier.minVehicles} {tr("véh.", "veh.")}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:mt-0">
          {tiers.map((tier, index) => (
            <Reveal key={tier.fullName} from="bottom" delayMs={index * 70}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border ${tier.ring} bg-kp-elevated/25 ${tier.glow} transition-all duration-500 hover:bg-kp-elevated/40 motion-safe:hover:-translate-y-1`}
              >
                <div aria-hidden className={`pointer-events-none absolute inset-0 bg-linear-to-b ${tier.accent}`} />

                <div
                  className="absolute right-0 top-0 z-10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-black sm:px-4 sm:py-2"
                  style={{ backgroundColor: tier.metal }}
                >
                  {tier.name}
                </div>

                <div className="relative flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                  <p className={`pr-16 text-[10px] font-semibold uppercase tracking-[0.24em] ${tier.badge}`}>
                    {tier.fullName}
                  </p>
                  <h3 className="mt-1 font-serif text-[1.65rem] text-white sm:text-2xl">{tier.model}</h3>
                  <p className={`mt-2 ${bodyText}`}>{tier.blurb}</p>

                  <div className="relative mt-4 aspect-16/10 overflow-hidden rounded-xl border border-white/8 bg-black/30 sm:mt-5">
                    <Image
                      src={tier.image}
                      alt={tr(`Modèle ${tier.model} — ${tier.fullName}`, `${tier.model} model — ${tier.fullName}`)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition duration-700 motion-safe:group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-3">
                      ≥ {tier.minVehicles} {tr("véh.", "veh.")}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3.5 sm:mt-5 sm:pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      {tr("Minimum", "Minimum")}
                    </p>
                    <p className="font-serif text-lg text-white">
                      {tier.minVehicles}
                      <span className="ml-1 text-sm text-white/45">{tr("véhicules", "vehicles")}</span>
                    </p>
                  </div>

                  <a
                    href={tier.brochureHref}
                    download={tier.brochureFilename}
                    className="mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white sm:mt-5"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 shrink-0" aria-hidden>
                      <path d="M12 3v12M7 11l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 19h14" strokeLinecap="round" />
                    </svg>
                    <span>{tr("Fiche technique", "Technical sheet")}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Ce qui est inclus ─── */}
      <div className="border-t border-white/8">
        <div className={`${pageMax} ${sectionPad} py-12 sm:py-16 md:py-20`}>
          <Reveal from="bottom">
            <div className="max-w-xl">
              <p className={eyebrow}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/80" />
                {tr("Inclus", "Included")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.65rem,4vw,2.5rem)] font-medium leading-[1.1] text-white">
                {tr("Tout ce qui accompagne votre flotte", "Everything that comes with your fleet")}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} from="bottom" delayMs={(i % 3) * 50}>
                <article className="flex h-full gap-3.5 rounded-2xl border border-white/[0.07] bg-kp-elevated/25 p-4 backdrop-blur-md sm:gap-4 sm:p-5">
                  <IconBox>{item.icon}</IconBox>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[14px] font-semibold leading-snug text-white/90 sm:text-[15px]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/50 sm:text-[14px]">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA final ─── */}
      <div className="relative border-t border-white/8 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(201,169,98,0.10),transparent_65%)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent" />
        <div className={`${pageMax} ${sectionPad} py-14 sm:py-20 md:py-24`}>
          <Reveal from="bottom">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-[clamp(1.75rem,4.2vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-white">
                {tr("Prêt à lancer votre flotte ?", "Ready to launch your fleet?")}
              </h2>
              <p className={`mx-auto mt-4 max-w-lg text-pretty ${bodyTextLg}`}>
                {tr(
                  "Un conseiller KPANDJI vous répond sur WhatsApp et construit l’offre adaptée à votre institution.",
                  "A KPANDJI advisor will reply on WhatsApp and build the offer for your institution.",
                )}
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                  <span>{tr("Lancer mon projet flotte", "Start my fleet project")}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link href="/contact" className={btnGhost}>
                  {tr("Parler à un conseiller", "Speak to an advisor")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Sira;
