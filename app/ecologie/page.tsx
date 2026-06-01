import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/kp/Reveal";

export const metadata: Metadata = {
  title: "ECO KPANDJI — Développement durable — KPANDJI Motors",
  description:
    "ECO KPANDJI : assemblage local, partenariats ONG pour le reboisement et éco-conception adaptée au Grand Abidjan.",
  alternates: { canonical: "/ecologie" },
  openGraph: {
    title: "ECO KPANDJI — KPANDJI Motors",
    description:
      "Excellence technologique, responsabilité environnementale et progrès social au bénéfice de la jeunesse ivoirienne.",
    type: "website",
    locale: "fr_FR",
  },
};

const HERO_BACKDROP = "/hero/pic21.png";
const CTA_BACKDROP = "/garage2.jpg";
const COMMITMENTS_BACKDROP = "/nature.jpg";
const PILLARS_NAV_BACKDROP = "/nature1.jpg";

const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/55";

const btnGhost =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/45 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/55";

const eyebrow =
  "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-400/95";

const sectionPad =
  "mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12";

const sectionTitle =
  "font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const AMBITION_INTRO =
  "Notre ambition est de démontrer qu’une marque automobile ivoirienne constitue un vecteur de développement durable, en conjuguant excellence technologique, responsabilité environnementale et progrès social au bénéfice de la jeunesse ivoirienne.";

const commitments = [
  "Certifications environnementales",
  "Actions sociales et environnementales",
  "Réduction de la consommation d’énergie",
  "Gestion responsable des déchets",
];

const marqueeValues = [
  "Éclairages LED dans l’usine KPANDJI",
  "Machines industrielles basse consommation",
  "Arrêt automatique des équipements inutilisés",
  "Véhicules électriques pour la logistique interne",
  "Optimisation des transports et livraisons",
  "Recyclage des métaux, batteries et pneus",
  "Fournisseurs certifiés écologiques",
  "Véhicules hybrides ou électriques",
  "Sensibilisation écologique du personnel",
];

const localModels = [
  { name: "DJETRAN", href: "/modeles/djetran" },
  { name: "DJETRAN PLUS", href: "/modeles/djetranplus" },
  { name: "LATHAYE", href: "/modeles/lathaye" },
  { name: "BANCO", href: "/modeles" },
];

const pillars = [
  {
    tag: "Souveraineté",
    title: "Assemblage local & empreinte carbone",
    body:
      "Pour la souveraineté et la réduction de l’empreinte carbone, l’assemblage local de nos modèles (DJETRAN, DJETRAN PLUS, LATHAYE, BANCO) réduit significativement les émissions de gaz à effet de serre générées par le transport maritime international de véhicules finis, renforçant ainsi notre indépendance industrielle.",
    image: "/garage1.jpeg",
    alt: "Chaîne d’assemblage KPANDJI en Côte d’Ivoire",
    icon: (
      <>
        <path d="M4 10h16M6 10V7a2 2 0 012-2h8a2 2 0 012 2v3" strokeLinecap="round" />
        <path d="M8 14h8M10 18h4" strokeLinecap="round" />
        <rect x="3" y="10" width="18" height="8" rx="1" />
      </>
    ),
  },
  {
    tag: "Éco-citoyenneté",
    title: "Partenariat avec des ONG",
    body:
      "Pour l’initiative éco-citoyenne, nous poursuivons et renforçons notre partenariat stratégique avec plusieurs ONG et fondations pour des campagnes nationales de reboisement, contribuant activement à la restauration et à la préservation du couvert forestier ivoirien.",
    image: "/hero/pic21.png",
    alt: "Engagement KPANDJI pour la préservation de l’environnement",
    icon: (
      <>
        <path d="M12 22c-4-3-7-6-7-10a7 7 0 0114 0c0 4-3 7-7 10z" strokeLinejoin="round" />
        <path d="M12 12v-2M9 14h6" strokeLinecap="round" />
      </>
    ),
  },
  {
    tag: "Éco-conception",
    title: "Matériaux durables & efficacité énergétique",
    body:
      "Pour l’éco-conception, nous nous engageons dans l’intégration progressive de matériaux durables et l’optimisation de la consommation énergétique de nos modèles, particulièrement adaptés aux conditions de circulation du Grand Abidjan.",
    image: "/Interior_TA_4x4_Diesel_1_18ed005af5.jpg",
    alt: "Habitacle KPANDJI : technologies adaptées aux usages locaux",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
] as const;

type Pillar = (typeof pillars)[number];

function SectionIntro({
  label,
  title,
  titleId,
  description,
}: {
  label: string;
  title: string;
  titleId?: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div>
        <p className={eyebrow}>
          <span aria-hidden className="h-px w-8 bg-emerald-400/60" />
          {label}
        </p>
        <h2 id={titleId} className={`mt-4 sm:mt-5 ${sectionTitle}`}>
          {title}
        </h2>
      </div>
      <p className="max-w-md text-[14px] leading-relaxed text-white/55 md:text-[15px] lg:max-w-sm lg:pb-1 lg:text-right">
        {description}
      </p>
    </div>
  );
}

function ModelLink({
  name,
  href,
  index,
}: {
  name: string;
  href: string;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={href}
      className="group relative flex min-h-[100px] flex-col justify-end overflow-hidden rounded-2xl border border-white/8 bg-kp-elevated/30 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-kp-elevated/50 sm:min-h-[112px] sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 font-serif text-2xl font-medium leading-none text-white/6 transition-colors duration-500 group-hover:text-emerald-400/25 sm:text-3xl"
      >
        {num}
      </span>
      <span className="font-serif text-lg tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-100/95 sm:text-xl">
        {name}
      </span>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
        Voir le modèle
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-3 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function PillarCard({
  item,
  index,
  featured = false,
}: {
  item: Pillar;
  index: number;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-kp-bg transition-all duration-500 hover:-translate-y-0.5 ${
        featured
          ? "border-white/10 hover:border-emerald-400/30"
          : "border-white/8 hover:border-emerald-400/25"
      }`}
    >
      <div
        className={`relative w-full shrink-0 overflow-hidden ${
          featured
            ? "aspect-16/10 sm:aspect-2/1 xl:aspect-auto xl:min-h-[min(44vh,400px)] xl:flex-1"
            : "aspect-16/10 md:aspect-2/1"
        }`}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, (max-width: 1280px) 66vw, 42vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md sm:left-5 sm:top-5">
          <span className="size-1 rounded-full bg-emerald-400/95" />
          {item.tag}
        </span>
      </div>

      <div
        className={`relative flex flex-1 flex-col ${
          featured ? "p-6 sm:p-7 md:p-8 lg:p-10" : "p-5 sm:p-6 md:p-7"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 transition-colors duration-500 group-hover:bg-emerald-500/15 ${
              featured ? "size-12 border-emerald-400/40" : "size-11"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-5"
            >
              {item.icon}
            </svg>
          </div>
          {!featured ? (
            <span
              aria-hidden
              className="font-serif text-2xl font-medium leading-none text-white/12 transition-colors duration-500 group-hover:text-white/20"
            >
              {num}
            </span>
          ) : null}
        </div>

        <h3
          className={`mt-5 font-serif font-normal tracking-tight text-white ${
            featured
              ? "text-xl sm:text-2xl md:text-3xl"
              : "text-lg sm:text-xl md:text-[22px]"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-white/60 ${
            featured
              ? "max-w-lg text-[14px] sm:text-[15px] md:text-[16px]"
              : "text-[13px] sm:text-[14px] md:text-[15px]"
          }`}
        >
          {item.body}
        </p>

        {featured ? (
          <div className="mt-auto flex items-end justify-between pt-8 sm:pt-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
              <span>{item.tag}</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-60" />
            </span>
            <span
              aria-hidden
              className="font-serif text-4xl font-medium leading-none text-white/8 sm:text-5xl md:text-6xl"
            >
              {num}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function EcologiePage() {
  return (
    <div className="min-h-screen bg-kp-bg text-kp-accent">
      <main>
        {/* HERO */}
        <section
          aria-label="ECO KPANDJI — KPANDJI Motors"
          className="relative isolate flex min-h-svh items-end overflow-hidden pt-[100px] sm:pt-[110px] md:pt-[132px]"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={HERO_BACKDROP}
              alt="Engagement environnemental KPANDJI Motors"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center kp-hero-zoom"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-emerald-950/50 via-black/55 to-black/95"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_15%_20%,rgba(52,211,153,0.22),transparent_58%),radial-gradient(800px_600px_at_85%_40%,rgba(201,169,98,0.14),transparent_55%),radial-gradient(900px_700px_at_50%_50%,transparent_50%,rgba(0,0,0,0.82)_100%)]"
          />
          <div
            aria-hidden
            className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.32] mix-blend-overlay"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-emerald-300/70 [writing-mode:vertical-rl]">
                ECO KPANDJI
              </span>
              <span className="h-24 w-px bg-linear-to-b from-emerald-400/70 via-emerald-400/25 to-transparent" />
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-8 sm:px-8 sm:pb-32 md:pb-36 lg:px-12">
            <Reveal from="bottom">
              <p className={eyebrow}>
                <span aria-hidden className="h-px w-10 bg-emerald-400/80 sm:w-16" />
                ECO KPANDJI
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={120}>
              <h1 className="mt-5 max-w-[16ch] font-serif text-[clamp(2rem,7.5vw,5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-white sm:max-w-[22ch]">
                <span className="block">Un vecteur de</span>
                <span className="block bg-linear-to-r from-white via-emerald-100/90 to-emerald-400/85 bg-clip-text text-transparent">
                  développement durable
                </span>
              </h1>
            </Reveal>

            <Reveal from="bottom" delayMs={200}>
              <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]">
                {AMBITION_INTRO}
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={280}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link href="#engagements" className={`${btnPrimary} w-full sm:w-auto`}>
                  <span>Nos engagements</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12l7 7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#pratiques" className={`${btnGhost} w-full sm:w-auto`}>
                  Nos pratiques usine
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMMITMENTS - mobile first below hero */}
        <section
          aria-label="Engagements environnementaux"
          className="border-b border-white/8 bg-kp-surface md:hidden"
        >
          <div className="mx-auto max-w-[1280px] px-5 py-8">
            <p className={eyebrow}>
              <span aria-hidden className="h-px w-8 bg-emerald-400/60" />
              Nos priorités
            </p>
            <ul className="mt-5 grid gap-3">
              {commitments.map((c, i) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-kp-elevated/30 px-4 py-3.5"
                >
                  <span className="mt-0.5 font-serif text-sm font-medium text-emerald-400/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] leading-snug text-white/75">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MARQUEE */}
        <section
          id="pratiques"
          aria-label="Pratiques usine"
          className="relative overflow-hidden border-y border-white/8 bg-kp-surface py-6 sm:py-7"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-kp-surface to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-kp-surface to-transparent sm:w-24" />
          <p className="sr-only">Pratiques écologiques en usine KPANDJI</p>
          <div className="kp-marquee-track flex w-max items-center gap-8 whitespace-nowrap text-white/55 sm:gap-12">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-8 sm:gap-12">
                {marqueeValues.map((v, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="flex max-w-[min(90vw,420px)] items-center gap-6 font-serif text-base font-normal tracking-tight sm:max-w-none sm:gap-8 sm:text-xl md:text-2xl"
                  >
                    <span>{v}</span>
                    <span className="size-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* COMMITMENTS desktop */}
        <section
          aria-label="Engagements environnementaux"
          className="relative isolate hidden overflow-hidden border-b border-white/8 md:block"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={COMMITMENTS_BACKDROP}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-kp-surface/94 via-kp-surface/58 to-kp-surface/52"
          />

          <div className={`relative z-10 ${sectionPad}`}>
            <Reveal from="bottom">
              <p className={eyebrow}>
                <span aria-hidden className="h-px w-8 bg-emerald-400/60" />
                Nos priorités
              </p>
              <h2 className={`mt-5 ${sectionTitle}`}>
                Une industrie responsable, à chaque étape.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {commitments.map((c, i) => (
                <Reveal key={c} from="bottom" delayMs={i * 50}>
                  <li className="group flex h-full flex-col rounded-2xl border border-white/8 bg-kp-elevated/25 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-kp-elevated/40">
                    <span className="font-serif text-3xl font-medium leading-none text-emerald-400/25 transition-colors duration-500 group-hover:text-emerald-400/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-[20px] leading-relaxed text-white/75 md:text-[20px]">
                      {c}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* PILLARS NAV */}
        <section
          aria-label="Aperçu des leviers"
          className="relative isolate overflow-hidden bg-kp-bg"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={PILLARS_NAV_BACKDROP}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-30"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-kp-bg/92 via-kp-bg/90 to-kp-bg/92"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_40%,rgba(52,211,153,0.1),transparent_58%)]"
          />
          <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {pillars.map((p, i) => (
                <Reveal key={p.tag} from="bottom" delayMs={i * 50}>
                  <a
                    href="#engagements"
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-kp-elevated/20 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-kp-elevated/35 sm:p-6"
                  >
                    <span className="text-[15px] font-semibold uppercase tracking-[0.14em] text-emerald-400/90">
                      {p.tag}
                    </span>
                    <span className="mt-3 font-serif text-lg leading-snug tracking-tight text-white sm:text-2xl">
                      {p.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-emerald-400/85">
                      En savoir plus
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="size-3 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

       

       

        {/* GALLERY */}
        <section
          aria-labelledby="terrain-heading"
          className="relative isolate overflow-hidden bg-kp-bg"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(52,211,153,0.08),transparent_60%)]"
          />
          <div className={sectionPad}>
            <Reveal from="bottom">
              <SectionIntro
                label="Industrie locale"
                title="L'assemblage en images."
                titleId="terrain-heading"
                description="Nos sites de production et d'entretien incarnent la souveraineté industrielle et l'exigence environnementale de KPANDJI."
              />
            </Reveal>

            <Reveal from="bottom" delayMs={120}>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40 sm:col-span-2 lg:col-span-2 lg:row-span-2">
                  <div className="relative aspect-16/10 w-full sm:aspect-2/1 lg:aspect-auto lg:min-h-[min(52vh,520px)]">
                    <Image
                      src="/garage1.jpeg"
                      alt="Infrastructure KPANDJI — montage et contrôle qualité"
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md sm:left-6 sm:top-6">
                      <span className="size-1 rounded-full bg-emerald-400/95" />
                      01 — Assemblage
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400/95">
                        Souveraineté
                      </p>
                      <p className="mt-2 font-serif text-xl font-medium text-white sm:text-2xl md:text-3xl">
                        Produire localement
                      </p>
                    </figcaption>
                  </div>
                </figure>

                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40">
                  <div className="relative aspect-16/10 w-full sm:aspect-4/3 lg:aspect-auto lg:min-h-[240px]">
                    <Image
                      src="/garage2.jpg"
                      alt="Atelier KPANDJI — espace structuré"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md sm:left-5 sm:top-5">
                      <span className="size-1 rounded-full bg-emerald-400/95" />
                      02 — Atelier
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="font-serif text-lg font-medium text-white">
                        Chaîne maîtrisée
                      </p>
                    </figcaption>
                  </div>
                </figure>

                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40">
                  <div className="relative aspect-16/10 w-full sm:aspect-4/3 lg:aspect-auto lg:min-h-[240px]">
                    <Image
                      src="/garage3.jpg"
                      alt="Maintenance et traitement maîtrisés"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md sm:left-5 sm:top-5">
                      <span className="size-1 rounded-full bg-emerald-400/95" />
                      03 — SAV
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="font-serif text-lg font-medium text-white">
                        Qualité & SAV
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="ecologie-cta"
          className="relative isolate overflow-hidden bg-kp-bg"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={CTA_BACKDROP}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/88 to-kp-bg"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_50%,rgba(52,211,153,0.14),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/45 to-transparent"
          />

          <div
            className={`${sectionPad} mx-auto max-w-[1100px] text-center py-20! sm:py-24! md:py-32!`}
          >
            <Reveal from="bottom">
              <div className="mx-auto flex w-full max-w-sm items-center gap-3">
                <span
                  aria-hidden
                  className="h-px flex-1 bg-linear-to-r from-transparent via-emerald-400/45 to-emerald-400/20"
                />
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-emerald-400/95 shadow-[0_0_14px_rgba(52,211,153,0.4)]"
                />
                <span
                  aria-hidden
                  className="h-px flex-1 bg-linear-to-l from-transparent via-emerald-400/45 to-emerald-400/20"
                />
              </div>
            </Reveal>

            <Reveal from="bottom" delayMs={80}>
              <p className={`${eyebrow} mt-7 justify-center`}>
                Partenariats & questions
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={140}>
              <h2
                id="ecologie-cta"
                className="mt-5 font-serif text-[clamp(2rem,4.8vw,3.5rem)] font-normal leading-[1.06] tracking-tight text-white"
              >
                Aller plus loin
                <br className="hidden sm:block" />
                <span className="bg-linear-to-r from-emerald-300 via-emerald-400/90 to-white/85 bg-clip-text text-transparent">
                  {" "}
                  ensemble
                </span>
              </h2>
            </Reveal>

            <Reveal from="bottom" delayMs={220}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/70 md:text-[16px]">
                Vous partagez notre vision d&apos;une industrie automobile
                ivoirienne responsable ? Contactez-nous pour échanger sur nos
                engagements ECO KPANDJI.
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={300}>
              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link href="/contact" className={`${btnPrimary} w-full sm:w-auto`}>
                  <span>Nous contacter</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/service-apres-vente"
                  className={`${btnGhost} w-full sm:w-auto`}
                >
                  Service après-vente
                </Link>
                <Link
                  href="/kpandji-automobiles"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/55 sm:w-auto"
                >
                  L&apos;entreprise
                </Link>
              </div>
            </Reveal>

            <Reveal from="bottom" delayMs={380}>
              <div className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/35 sm:flex-row sm:justify-center sm:gap-6">
                <span>Assemblage local</span>
                <span
                  aria-hidden
                  className="hidden size-1 rounded-full bg-emerald-400/40 sm:block"
                />
                <span>Partenariats ONG</span>
                <span
                  aria-hidden
                  className="hidden size-1 rounded-full bg-emerald-400/40 sm:block"
                />
                <span>Éco-conception</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
