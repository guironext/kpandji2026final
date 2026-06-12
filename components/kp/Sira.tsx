import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/kp/Reveal";

const WHATSAPP_SIRA =
  "https://wa.me/2250707201553?text=KPANDJI%20SIRA%20-%20Demande%20flotte";

const HERO_BACKDROP = "/models/para/pic2.jpg";

const pageMax = "mx-auto w-full max-w-[1680px]";

const eyebrow =
  "inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const sectionTitle =
  "font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const bodyText =
  "font-sans text-[14px] leading-relaxed text-white/55 md:text-[15px]";

const bodyTextLg =
  "font-sans text-[15px] leading-relaxed text-white/72 sm:text-[16px] md:text-[17px]";

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-white/12 hover:bg-kp-elevated/40";

const btnGold =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-kp-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";



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
    metal: "#C9A962",
    accent: "from-kp-gold/35 via-kp-gold/14 to-transparent",
    ring: "border-kp-gold/45",
    badge: "text-kp-gold",
    glow: "shadow-[0_0_48px_-14px_rgba(201,169,98,0.5)]",
  },
  {
    name: "Platine",
    fullName: "Sira Platine",
    model: "LATHAYE 2 PRO",
    minVehicles: 30,
    image: "/derniers/latpro.png",
    metal: "#E5E4E2",
    accent: "from-sky-200/28 via-indigo-200/10 to-transparent",
    ring: "border-sky-200/35",
    badge: "text-sky-100/90",
    glow: "shadow-[0_0_48px_-14px_rgba(186,230,253,0.28)]",
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
      <div className={`${pageMax} px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-kp-gold/30 bg-kp-gold/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold">
                Partie {part}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {label}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-[clamp(1.85rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-tight text-white">
              {title}
            </h3>
          </div>
          {description ? (
            <p className={`max-w-md ${bodyText} md:text-right`}>{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const Sira = () => {
  return (
    <section id="sira" className="relative overflow-hidden bg-kp-bg" aria-labelledby="sira-title">
      {/* ─── Cinematic hero ─── */}
      <div className="relative isolate flex min-h-[72svh] items-end overflow-hidden sm:min-h-[78svh] lg:min-h-[82svh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BACKDROP}
            alt="KPANDJI Sira — programme flotte institutionnelle"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] kp-hero-zoom"
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-amber-950/35 via-black/55 to-kp-bg" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_12%_18%,rgba(201,169,98,0.22),transparent_58%),radial-gradient(700px_500px_at_88%_35%,rgba(255,255,255,0.06),transparent_55%)]"
        />
        <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.28] mix-blend-overlay" />

        <div aria-hidden className="pointer-events-none absolute inset-5 hidden lg:block xl:inset-8">
          <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-kp-gold/30" />
          <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-kp-gold/30" />
          <span className="absolute bottom-28 left-0 h-10 w-10 border-b border-l border-white/12" />
          <span className="absolute bottom-28 right-0 h-10 w-10 border-b border-r border-white/12" />
        </div>

        <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block xl:right-10">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-kp-gold/70 [writing-mode:vertical-rl]">
              S I R A
            </span>
            <span className="h-28 w-px bg-linear-to-b from-kp-gold/70 via-kp-gold/25 to-transparent" />
          </div>
        </div>

        <div className={`relative z-10 ${pageMax} px-5 pb-14 sm:px-8 sm:pb-16 md:pb-20 lg:px-12 lg:pb-24 xl:px-16`}>
          <div className="lg:grid lg:grid-cols-[1fr_minmax(0,380px)] lg:items-end lg:gap-14 xl:gap-20">
            <div>
              <Reveal from="bottom">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-kp-gold/35 bg-kp-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-kp-gold backdrop-blur-sm">
                    <span aria-hidden className="size-1.5 rounded-full bg-kp-gold shadow-[0_0_10px_rgba(201,169,98,0.6)]" />
                    Programme flotte
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                    Côte d&apos;Ivoire · Institutions
                  </span>
                </div>
              </Reveal>

              <Reveal from="bottom" delayMs={60}>
                <p className={`${eyebrow} mt-5`}>
                  <span aria-hidden className="h-px w-10 bg-kp-gold/80 sm:w-14" />
                  Offre institutionnelle
                </p>
              </Reveal>

              <Reveal from="bottom" delayMs={100}>
                <h2
                  id="sira-title"
                  className="mt-5 max-w-[12ch] font-serif text-[clamp(2.4rem,7.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white sm:max-w-none"
                >
                  <span className="block">Kpandji</span>
                  <span className="block bg-linear-to-r from-[#CD7F32] via-kp-gold to-sky-100/90 bg-clip-text text-transparent">
                    Sira
                  </span>
                </h2>
              </Reveal>

              <Reveal from="bottom" delayMs={160}>
                <p className={`mt-6 max-w-xl text-pretty ${bodyTextLg}`}>
                  Destiné à ceux qui désirent acquérir une flotte de véhicules KPANDJI.
                  Un partenariat sur mesure, des tarifs préférentiels et un accompagnement
                  complet de la conception à la livraison.
                </p>
              </Reveal>

              <Reveal from="bottom" delayMs={220}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                    <span>Demander une offre flotte</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10"
                  >
                    Nous contacter
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal from="bottom" delayMs={280} className="mt-10 lg:mt-0">
              <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
                  En bref
                </p>
                <p className="mt-3 font-serif text-xl leading-snug tracking-tight text-white sm:text-2xl">
                  Votre flotte,
                  <span className="text-white/55"> votre identité.</span>
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/8 bg-white/4 px-3 py-3">
                      <p className="font-serif text-xl text-kp-gold">{stat.value}</p>
                      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <ul className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-4 text-[12px] leading-snug text-white/55">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-kp-gold/70" aria-hidden />
                    Personnalisation par adhérent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-kp-gold/70" aria-hidden />
                    Financement &amp; assurance négociés
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-kp-gold/70" aria-hidden />
                    4 paliers Bronze → Platine
                  </li>
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>

     

      {/* ─── Partie I : Exclusivité ─── */}
      <SectionChapter
        part="I"
        label="Exclusivité"
        title="Le sur-mesure & la personnalisation"
        description="Chaque flotte Sira reflète l'identité de votre institution et les attentes de vos adhérents."
      />
      <div className={`${pageMax} px-5 pb-14 sm:px-8 sm:pb-16 md:pb-20 lg:px-12 xl:px-16`}>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {exclusivityFeatures.map((item, i) => (
            <Reveal key={item.title} from="bottom" delayMs={i * 80}>
              <article className={`${cardClass} h-full p-6 md:p-8`}>
                <div className="flex items-start justify-between gap-4">
                  <IconBox>{item.icon}</IconBox>
                  <span className="font-serif text-4xl leading-none text-kp-gold/15">0{i + 1}</span>
                </div>
                <h4 className="mt-6 font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] text-white">{item.title}</h4>
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
      <div className={`${pageMax} px-5 pb-14 sm:px-8 sm:pb-16 md:pb-20 lg:px-12 xl:px-16`}>
        {/* Tier progression bar — desktop */}
        <div aria-hidden className="relative mx-auto mb-8 hidden max-w-4xl xl:block">
          <div className="h-px w-full bg-linear-to-r from-[#CD7F32] via-kp-gold to-sky-200/80" />
          <div className="absolute inset-x-0 -top-2 flex justify-between">
            {tiers.map((tier) => (
              <span
                key={tier.name}
                className="size-4 rounded-full border-2 border-kp-bg shadow-[0_0_12px_currentColor]"
                style={{ backgroundColor: tier.metal, color: tier.metal }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {tiers.map((tier) => (
              <span key={tier.name} style={{ color: tier.metal }}>
                {tier.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {tiers.map((tier, index) => (
            <Reveal key={tier.fullName} from="bottom" delayMs={index * 70}>
              <article
                className={`group relative h-full overflow-hidden rounded-2xl border ${tier.ring} bg-kp-elevated/25 ${tier.glow} transition-all duration-500 hover:-translate-y-1.5 hover:bg-kp-elevated/40`}
              >
                <div aria-hidden className={`pointer-events-none absolute inset-0 bg-linear-to-b ${tier.accent}`} />

                {/* Metal badge ribbon */}
                <div
                  className="absolute right-0 top-0 z-10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-black"
                  style={{ backgroundColor: tier.metal }}
                >
                  {tier.name}
                </div>

                <div className="relative p-5 sm:p-6">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${tier.badge}`}>
                    {tier.fullName}
                  </p>
                  <h4 className="mt-1 font-serif text-2xl text-white">{tier.model}</h4>

                  <div className="relative mt-5 aspect-16/10 overflow-hidden rounded-xl border border-white/8 bg-black/30">
                    <Image
                      src={tier.image}
                      alt={`Modèle ${tier.model} — ${tier.fullName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      ≥ {tier.minVehicles} véh.
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      Seuil d&apos;accès
                    </p>
                    <p className="font-serif text-lg text-white">
                      {tier.minVehicles}
                      <span className="ml-1 text-sm text-white/45">véhicules</span>
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal from="bottom" delayMs={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-white/40">
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
      <div className={`${pageMax} px-5 pb-14 sm:px-8 sm:pb-16 md:pb-20 lg:px-12 xl:px-16`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {engagements.map((item, i) => (
            <Reveal key={item.title} from="bottom" delayMs={(i % 3) * 60}>
              <article className={`${cardClass} flex h-full gap-4 p-5 sm:p-6`}>
                <IconBox>{item.icon}</IconBox>
                <div>
                  <h4 className="font-sans text-[15px] font-semibold text-white/90">{item.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/50 sm:text-[14px]">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>



      {/* ─── Conclusion & CTA ─── */}
      <div className="relative border-t border-white/8 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(201,169,98,0.10),transparent_65%)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent" />
        <div className={`${pageMax} px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28 xl:px-16`}>
          <Reveal from="bottom">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-kp-gold/30 bg-kp-gold/10">
                <span className="font-serif text-2xl font-medium tracking-[0.12em] text-kp-gold">S</span>
              </div>
              <p className={`${eyebrow} justify-center`}>
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
                Partenariat national
                <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
              </p>
              <h3 className={`mt-5 ${sectionTitle}`}>
                Bien plus qu&apos;une flotte automobile
              </h3>
              <p className={`mx-auto mt-5 max-w-2xl ${bodyTextLg}`}>
                En choisissant l&apos;offre KPANDJI Sira, vous scellez un partenariat avec une
                expertise locale aux standards internationaux. Ensemble, valorisons le savoir-faire
                national et offrons à vos membres la fierté de rouler dans des véhicules neufs,
                portés par un engagement patriotique au service de la mobilité ivoirienne.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href={WHATSAPP_SIRA} target="_blank" rel="noopener noreferrer" className={btnGold}>
                  <span>Lancer mon projet flotte</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/25 hover:text-white"
                >
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
