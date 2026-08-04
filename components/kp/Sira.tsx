import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/kp/Reveal";

const WHATSAPP_SIRA =
  "https://wa.me/2250707201553?text=KPANDJI%20SIRA%20-%20Demande%20flotte";

const HERO_BACKDROP = "/models/para/pic2.jpg";

const pageMax = "mx-auto w-full max-w-[1680px]";
const sectionPad = "px-5 sm:px-8 lg:px-12 xl:px-16";

const eyebrow =
  "inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const sectionTitle =
  "font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const bodyText =
  "font-sans text-[14px] leading-relaxed text-white/55 md:text-[15px]";

const bodyTextLg =
  "font-sans text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]";

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:border-white/12 hover:bg-kp-elevated/40 motion-safe:hover:-translate-y-0.5";

const btnGold =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-kp-gold px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:w-auto sm:px-8";

const btnGhost =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10 sm:min-h-11 sm:w-auto sm:px-8";

const exclusivityFeatures = [
  {
    title: "Conception de flotte dédiée",
    body: "Si un besoin spécifique n'est pas couvert par notre gamme actuelle, nous concevons un modèle exclusivement dédié à votre institution — coûts spéciaux et configuration unique.",
    icon: (
      <>
        <path d="M3 17h18M5 17V9l7-4 7 4v8" strokeLinejoin="round" />
        <path d="M9 17v-4h6v4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Gadgets & options spécifiques",
    body: "Intérieur cuir, écrans HD, caméras 360°, kits de remorquage… Chaque adhérent personnalise son véhicule. Le coût des options est calculé au plus juste.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" strokeLinecap="round" />
      </>
    ),
  },
] as const;

const tiers = [
  {
    name: "Bronze",
    fullName: "Sira Bronze",
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
  },
  {
    name: "Argent",
    fullName: "Sira Argent",
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
  },
  {
    name: "Or",
    fullName: "Sira Or",
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
  },
] as const;

const engagements = [
  {
    title: "Garantie constructeur excellence",
    body: "Couverture complète de 3 ans ou 100 000 km sur l'ensemble de nos modèles.",
    icon: (
      <path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Immatriculation offerte",
    body: "Prise en charge intégrale des frais et démarches administratives de mise en circulation.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 12h8M8 16h5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Accompagnement assurance",
    body: "Partenariats avec des assureurs de premier plan pour des tarifs préférentiels flotte.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />,
  },
  {
    title: "Le levier bancaire Kpandji",
    body: "Mise en relation avec nos banques partenaires ou adaptation à vos structures mutualistes.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 11h18M7 15h.01M11 15h.01" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Conditions de règlement",
    body: "Comptant (Cash) par la mutuelle ou via partenaire bancaire, sous accord préalable de la Direction.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Livraison garantie",
    body: "Engagement de livraison de vos véhicules dans un délai maximum de 120 jours.",
    icon: (
      <>
        <path d="M5 17h14l-1.5-5.5a2 2 0 00-1.9-1.5H8.4a2 2 0 00-1.9 1.5L5 17z" strokeLinejoin="round" />
        <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
  },
] as const;

const stats = [
  { value: "120j", label: "Livraison max." },
  { value: "3 ans", label: "Garantie" },
  { value: "20h/7", label: "Assistance VIP" },
  { value: "28+", label: "Véhicules min." },
] as const;

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold transition-colors duration-500 group-hover:bg-kp-gold/15 sm:size-11">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[18px] sm:size-5" aria-hidden>
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
}: {
  part: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-[radial-gradient(900px_320px_at_20%_50%,rgba(201,169,98,0.12),transparent_60%)]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent" />
      <div className={`${pageMax} ${sectionPad} py-9 sm:py-11 md:py-12`}>
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center rounded-full border border-kp-gold/30 bg-kp-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold">
                Partie {part}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {label}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[clamp(1.65rem,5vw,3rem)] font-medium leading-[1.08] tracking-tight text-white sm:mt-4">
              {title}
            </h3>
          </div>
          {description ? (
            <p className={`max-w-md text-pretty ${bodyText} md:pb-1 md:text-right`}>
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TierNode({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <span className="relative flex size-7 items-center justify-center">
      <span
        className="absolute inset-0 rounded-full border border-current/35 bg-kp-bg"
        style={{ color: tier.metal }}
      />
      <span
        className="absolute inset-[5px] rounded-full border border-current/25"
        style={{ color: tier.metal }}
      />
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
  return (
    <section id="sira" className="relative overflow-hidden bg-kp-bg" aria-labelledby="sira-title">
      {/* ─── Hero ─── */}
      <div className="relative isolate flex min-h-[min(88svh,760px)] items-end overflow-hidden sm:min-h-[min(82svh,820px)]">
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

        <div className={`relative z-10 w-full ${pageMax} ${sectionPad} pb-12 pt-28 sm:pb-16 sm:pt-32 md:pb-20 lg:pb-24`}>
          <Reveal from="bottom">
            <p className={eyebrow}>
              <span aria-hidden className="h-px w-8 bg-kp-gold/80 sm:w-12" />
              Offre institutionnelle · Côte d&apos;Ivoire
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={80}>
            <h2
              id="sira-title"
              className="mt-4 max-w-[11ch] font-serif text-[clamp(2.75rem,12vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:mt-5 sm:max-w-none"
            >
              <span className="block">Kpandji</span>
              <span className="block bg-linear-to-r from-[#CD7F32] via-kp-gold to-[#E8D5A3] bg-clip-text text-transparent">
                Sira
              </span>
            </h2>
          </Reveal>

          <Reveal from="bottom" delayMs={140}>
            <p className={`mt-5 max-w-lg text-pretty sm:mt-6 ${bodyTextLg}`}>
            Pour répondre aux exigences de volume et de rentabilité des institutions, KPANDJI conçoit des modèles exclusifs, spécifiquement configurés pour l'offre SIRA. Ces véhicules (utilitaires, citadines, SUV optimisés) offrent le meilleur coût de possession du marché et sont réservés uniquement aux commandes de flottes.
            </p>
          </Reveal>

          <Reveal from="bottom" delayMs={200}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                <span>Demander une offre flotte</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link href="/contact" className={btnGhost}>
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── Stats strip ─── */}
      <div className="relative border-b border-white/8">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/35 to-transparent" />
        <div className={`${pageMax} ${sectionPad}`}>
          <ul className="-mx-5 flex snap-x snap-mandatory gap-0 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {stats.map((stat, i) => (
              <li
                key={stat.label}
                className={`min-w-[42%] shrink-0 snap-start border-white/8 py-5 sm:min-w-0 sm:border-t-0 sm:py-7 ${
                  i > 0 ? "border-l sm:pl-6 lg:pl-8" : ""
                } ${i < stats.length - 1 ? "pr-5 sm:pr-6 lg:pr-8" : ""}`}
              >
                <p className="font-serif text-[1.65rem] leading-none text-kp-gold sm:text-[1.85rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Intro ─── */}
      <div className={`${pageMax} ${sectionPad} py-12 sm:py-14 md:py-16`}>
        <Reveal from="bottom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-[clamp(1.35rem,3.5vw,1.85rem)] leading-snug tracking-tight text-white">
              Votre flotte, <span className="text-white/50">votre identité.</span>
            </p>
            <p className={`mx-auto mt-4 max-w-2xl text-pretty ${bodyText}`}>
              Pour répondre aux exigences de volume et de rentabilité des institutions, KPANDJI
              conçoit des modèles exclusifs Sira — utilitaires, citadines et SUV optimisés —
              réservés uniquement aux commandes de flottes.
            </p>
            <ul className="mt-7 flex flex-col items-stretch gap-2.5 sm:mx-auto sm:max-w-xl sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
              {["Personnalisation par adhérent", "Financement & assurance", "3 paliers Bronze → Or"].map(
                (item) => (
                  <li
                    key={item}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-wide text-white/55 sm:justify-start"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-kp-gold/70" aria-hidden />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ─── Partie I : Exclusivité ─── */}
      <SectionChapter
        part="I"
        label="Exclusivité"
        title="Le sur-mesure & la personnalisation"
        description="Chaque flotte Sira reflète l'identité de votre institution et les attentes de vos adhérents."
      />
      <div className={`${pageMax} ${sectionPad} pb-12 sm:pb-16 md:pb-20`}>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {exclusivityFeatures.map((item, i) => (
            <Reveal key={item.title} from="bottom" delayMs={i * 80}>
              <article className={`${cardClass} flex h-full flex-col p-5 sm:p-6 md:p-8`}>
                <div className="flex items-start justify-between gap-4">
                  <IconBox>{item.icon}</IconBox>
                  <span className="font-serif text-3xl leading-none text-kp-gold/15 sm:text-4xl">
                    0{i + 1}
                  </span>
                </div>
                <h4 className="mt-5 font-serif text-[clamp(1.2rem,3vw,1.5rem)] text-white sm:mt-6">
                  {item.title}
                </h4>
                <p className={`mt-3 ${bodyText}`}>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Partie II : Paliers ─── */}
      <SectionChapter
        part="II"
        label="Paliers d'offres"
        title="Les niveaux Sira"
        description="Le taux de remise définitif est déterminé selon le volume global et le mix de modèles sélectionnés."
      />
      <div className={`${pageMax} ${sectionPad} pb-12 sm:pb-16 md:pb-20`}>
        {/* Mobile / tablet progression */}
        <div aria-hidden className="mb-7 xl:hidden">
          <ol className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tiers.map((tier, i) => (
              <li
                key={tier.name}
                className="flex min-w-[46%] snap-start flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 sm:min-w-[30%]"
              >
                <div className="flex items-center gap-2">
                  <TierNode tier={tier} />
                  {i < tiers.length - 1 ? (
                    <span className="hidden h-px w-6 bg-white/15 sm:block" />
                  ) : null}
                </div>
                <p
                  className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: tier.metal }}
                >
                  {tier.name}
                </p>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
                  ≥ {tier.minVehicles} véh.
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop progression rail */}
        <div aria-hidden className="relative mx-auto mb-10 hidden max-w-3xl xl:block">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[13px] h-px bg-white/10" />
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[13px] h-px bg-linear-to-r from-[#CD7F32] via-[#C0C0C0] to-kp-gold opacity-70" />
          <ol className="relative flex justify-between">
            {tiers.map((tier) => (
              <li key={tier.name} className="flex w-28 flex-col items-center">
                <TierNode tier={tier} />
                <p
                  className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: tier.metal }}
                >
                  {tier.name}
                </p>
                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
                  ≥ {tier.minVehicles} véh.
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
                  <h4 className="mt-1 font-serif text-[1.65rem] text-white sm:text-2xl">{tier.model}</h4>

                  <div className="relative mt-4 aspect-16/10 overflow-hidden rounded-xl border border-white/8 bg-black/30 sm:mt-5">
                    <Image
                      src={tier.image}
                      alt={`Modèle ${tier.model} — ${tier.fullName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition duration-700 motion-safe:group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-3">
                      ≥ {tier.minVehicles} véh.
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3.5 sm:mt-5 sm:pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      Seuil d&apos;accès
                    </p>
                    <p className="font-serif text-lg text-white">
                      {tier.minVehicles}
                      <span className="ml-1 text-sm text-white/45">véhicules</span>
                    </p>
                  </div>

                  <a
                    href={tier.brochureHref}
                    download={tier.brochureFilename}
                    className="mt-auto pt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M12 3v12M7 11l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 19h14" strokeLinecap="round" />
                    </svg>
                    <span>Fiche technique</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal from="bottom" delayMs={120}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[12px] leading-relaxed text-white/40 sm:mt-8 sm:text-[13px]">
            <span className="text-kp-gold/80">Note :</span> le taux de remise définitif dépend du volume
            global de commande et du mix de modèles retenus.
          </p>
        </Reveal>
      </div>

      {/* ─── Partie III : Engagements ─── */}
      <SectionChapter
        part="III"
        label="Engagements"
        title="Services & garanties exclusifs"
      />
      <div className={`${pageMax} ${sectionPad} pb-12 sm:pb-16 md:pb-20`}>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {engagements.map((item, i) => (
            <Reveal key={item.title} from="bottom" delayMs={(i % 3) * 60}>
              <article className={`${cardClass} flex h-full gap-3.5 p-4 sm:gap-4 sm:p-5 md:p-6`}>
                <IconBox>{item.icon}</IconBox>
                <div className="min-w-0">
                  <h4 className="font-sans text-[14px] font-semibold leading-snug text-white/90 sm:text-[15px]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/50 sm:mt-2 sm:text-[14px]">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Conclusion & CTA ─── */}
      <div className="relative border-t border-white/8 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(201,169,98,0.10),transparent_65%)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent" />
        <div className={`${pageMax} ${sectionPad} py-14 sm:py-20 md:py-24 lg:py-28`}>
          <Reveal from="bottom">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-kp-gold/30 bg-kp-gold/10 sm:mb-6 sm:size-16">
                <span className="font-serif text-xl font-medium tracking-[0.12em] text-kp-gold sm:text-2xl">
                  S
                </span>
              </div>
              <p className={`${eyebrow} justify-center`}>
                <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
                Partenariat national
                <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
              </p>
              <h3 className={`mt-4 ${sectionTitle} sm:mt-5`}>
                Bien plus qu&apos;une flotte automobile
              </h3>
              <p className={`mx-auto mt-4 max-w-2xl text-pretty sm:mt-5 ${bodyTextLg}`}>
                En choisissant l&apos;offre KPANDJI Sira, vous scellez un partenariat avec une
                expertise locale aux standards internationaux. Ensemble, valorisons le savoir-faire
                national et offrons à vos membres la fierté de rouler dans des véhicules neufs.
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                  <span>Lancer mon projet flotte</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link href="/contact" className={btnGhost}>
                  Parler à un conseiller
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
