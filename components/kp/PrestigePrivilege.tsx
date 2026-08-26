"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrestigeContactCTA } from "@/components/kp/PrestigeContactCTA";
import { PrivilegeFloatingCTA } from "@/components/kp/PrivilegeFloatingCTA";
import { Reveal } from "@/components/kp/Reveal";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const HERO_BACKDROP = "/derniers/djetran.jpeg";
const PATH_BUY_IMAGE = "/models/showcase/latint1.jpg";
const PATH_RENT_IMAGE = "/models/prest.png";

const pageMax = "mx-auto w-full max-w-[1680px]";
const sectionPad = `${pageMax} px-5 sm:px-8 lg:px-12 xl:px-16`;

const eyebrow =
  "inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-kp-gold/95 sm:text-[12px]";

const bodyText =
  "font-sans text-[15px] leading-relaxed text-white/60 sm:text-[16px] md:text-[17px]";

const bodyTextLg =
  "font-sans text-[16px] leading-relaxed text-white/75 sm:text-[18px] md:text-[19px]";

const btnBack =
  "group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

function PathCard({
  image,
  option,
  title,
  body,
  highlight,
  highlightLabel,
  secondary,
  secondaryLabel,
  points,
  from,
  delayMs = 0,
}: {
  image: string;
  option: string;
  title: string;
  body: string;
  highlight: string;
  highlightLabel: string;
  secondary: string;
  secondaryLabel: string;
  points: readonly string[];
  from?: "left" | "right";
  delayMs?: number;
}) {
  return (
    <Reveal from={from} delayMs={delayMs} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden border border-white/8 bg-kp-elevated/40">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[16/9] lg:aspect-[16/10]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-kp-bg/90 via-transparent to-transparent"
          />
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-7 pt-5 sm:px-7 sm:pb-8 sm:pt-6 lg:px-8 lg:pb-9 lg:pt-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-kp-gold sm:text-[12px]">
            {option}
          </p>
          <h3 className="mt-2 min-h-[2.2em] font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.08] tracking-tight text-white">
            {title}
          </h3>
          <p className={`mt-3 min-h-[4.5em] ${bodyText}`}>{body}</p>

          <div className="mt-5 flex items-end gap-4 border-t border-white/12 pt-5 sm:gap-5">
            <div>
              <p className="font-serif text-[clamp(2.5rem,7vw,3.25rem)] font-medium leading-none text-kp-gold">
                {highlight}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-[12px]">
                {highlightLabel}
              </p>
            </div>
            <div className="mb-1 h-10 w-px bg-white/15 sm:h-11" aria-hidden />
            <div>
              <p className="font-serif text-[clamp(1.5rem,4vw,2rem)] font-medium leading-none text-white/70">
                {secondary}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[12px]">
                {secondaryLabel}
              </p>
            </div>
          </div>

          <ul className="mt-5 min-h-[6.5em] space-y-2.5 text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
            {points.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-kp-gold"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function PrestigePrivilege() {
  const { tr } = useLocale();
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  const steps = [
    {
      num: "01",
      title: tr("Choisissez", "Choose"),
      body: tr(
        "LATHAYE, DJETRAN ou DJETRAN PLUS.",
        "LATHAYE, DJETRAN or DJETRAN PLUS."
      ),
    },
    {
      num: "02",
      title: tr("Contractualisez", "Sign"),
      body: tr(
        "Signature et paiement à distance — cash ou 6 à 24 mois.",
        "Sign and pay remotely — cash or 6 to 24 months."
      ),
    },
    {
      num: "03",
      title: tr("On gère", "We handle it"),
      body: tr(
        "Immatriculation, gardiennage, livraison, entretien.",
        "Registration, safekeeping, delivery, maintenance."
      ),
    },
    {
      num: "04",
      title: tr("Vous décidez", "You decide"),
      body: tr(
        "Rouler à votre arrivée — ou rentabiliser via la flotte.",
        "Drive on arrival — or earn via the fleet."
      ),
    },
  ] as const;

  const buyPoints = [
    tr("Modèles : LATHAYE · DJETRAN · DJETRAN PLUS", "Models: LATHAYE · DJETRAN · DJETRAN PLUS"),
    tr("Véhicule prêt dès votre arrivée", "Vehicle ready on arrival"),
    tr("Entretien certifié constructeur", "Manufacturer-certified maintenance"),
  ];

  const rentPoints = [
    tr("Flotte élite : ambassades, VIP, multinationales", "Elite fleet: embassies, VIP, multinationals"),
    tr("Gestion complète par KPANDJI", "Full management by KPANDJI"),
    tr("Aucun frais si le véhicule est à l’arrêt", "No fees while idle"),
  ];

  return (
    <div className="min-h-screen bg-kp-bg font-sans text-kp-accent">
      <PrivilegeFloatingCTA />

      <main>
        {/* ─── 1. HERO ─── */}
        <section
          aria-label={tr("Kpandji Privilège", "Kpandji Privilège")}
          className="relative isolate flex min-h-[100svh] items-end overflow-hidden sm:min-h-[min(88svh,820px)]"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={HERO_BACKDROP}
              alt={tr(
                "Kpandji Privilège — véhicule premium",
                "Kpandji Privilège — premium vehicle"
              )}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[58%_38%] kp-hero-zoom sm:object-[50%_40%]"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/40 to-kp-bg"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_420px_at_20%_20%,rgba(201,169,98,0.2),transparent_58%)]"
          />
          <div
            aria-hidden
            className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.26] mix-blend-overlay"
          />

          <div
            className={`relative z-10 w-full ${sectionPad} pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-28 sm:pb-16 sm:pt-32 md:pb-20`}
          >
            <Reveal from="bottom">
              <button type="button" onClick={handleBack} className={btnBack}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{tr("Retourner", "Back")}</span>
              </button>
            </Reveal>

            <Reveal from="bottom" delayMs={40}>
              <p className={`${eyebrow} mt-6 sm:mt-7`}>
                <span aria-hidden className="h-px w-7 bg-kp-gold/80 sm:w-12" />
                {tr("Diaspora · Côte d’Ivoire", "Diaspora · Côte d’Ivoire")}
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={80}>
              <h1 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.85rem,13vw,6rem)] font-medium leading-[0.96] tracking-[-0.03em] text-white sm:mt-5 sm:max-w-none">
                <span className="block">Kpandji</span>
                <span className="block text-kp-gold">Privilège</span>
              </h1>
            </Reveal>

            <Reveal from="bottom" delayMs={140}>
              <p className={`mt-5 max-w-[22rem] text-pretty sm:mt-6 sm:max-w-lg ${bodyTextLg}`}>
                {tr(
                  "Achetez. Roulez. Ou rentabilisez en Côte d’Ivoire.",
                  "Buy. Drive. Or earn in Côte d’Ivoire."
                )}
              </p>
            </Reveal>

            <Reveal from="bottom" delayMs={200}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center">
                  <PrestigeContactCTA
                    variant="gold"
                    label={{
                      fr: "Parler à un conseiller",
                      en: "Talk to an advisor",
                    }}
                    modalTitle={{
                      fr: "Parler à un conseiller",
                      en: "Talk to an advisor",
                    }}
                    modalSubtitle={{
                      fr: "Laissez vos coordonnées — un conseiller Privilège vous recontacte pour choisir votre plan.",
                      en: "Leave your details — a Privilège advisor will get back to you to choose your plan.",
                    }}
                    submitLabel={{
                      fr: "Être recontacté",
                      en: "Request a callback",
                    }}
                    successTitle={{
                      fr: "Demande enregistrée",
                      en: "Request received",
                    }}
                    successMessage={{
                      fr: "Merci. Un conseiller Privilège vous recontactera très prochainement.",
                      en: "Thank you. A Privilège advisor will contact you shortly.",
                    }}
                  />
                  <PrestigeContactCTA />
                </div>
                
              </div>
            </Reveal>

            <Reveal from="bottom" delayMs={280}>
              <div className="mt-10 hidden items-center gap-3 sm:mt-12 sm:flex">
                <span
                  aria-hidden
                  className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20"
                >
                  <span className="kp-scroll-dot mt-1.5 size-1 rounded-full bg-kp-gold/90" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                  {tr("Faire défiler", "Scroll")}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── 2. DEUX CHEMINS ─── */}
        <section
          id="chemins"
          aria-labelledby="chemins-heading"
          className="scroll-mt-24 border-t border-white/8 bg-kp-bg"
        >
          <div className={`${sectionPad} py-12 sm:py-16 md:py-20 lg:py-24`}>
            <Reveal from="bottom">
              <div className="relative mx-auto max-w-3xl text-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-6 -top-8 bottom-0 mx-auto max-w-md bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.14),transparent_72%)] sm:-inset-x-12 sm:max-w-xl"
                />

                <p className={`${eyebrow} relative justify-center`}>
                  <span aria-hidden className="h-px w-8 bg-linear-to-r from-transparent to-kp-gold/70 sm:w-12" />
                  {tr("Une idée simple", "One simple idea")}
                  <span aria-hidden className="h-px w-8 bg-linear-to-l from-transparent to-kp-gold/70 sm:w-12" />
                </p>

                <h2
                  id="chemins-heading"
                  className="relative mt-5 font-serif text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white"
                >
                  <span className="block">{tr("Deux façons", "Two ways")}</span>
                  <span className="mt-1 block text-kp-gold">
                    {tr("de profiter", "to benefit")}
                  </span>
                </h2>

                <div
                  aria-hidden
                  className="relative mx-auto mt-7 flex max-w-xs items-center gap-3 sm:mt-8 sm:max-w-sm sm:gap-4"
                >
                  <span className="h-px flex-1 bg-linear-to-r from-transparent via-kp-gold/35 to-kp-gold/55" />
                  <span className="size-1.5 rotate-45 border border-kp-gold/50 bg-kp-gold/20" />
                  <span className="h-px flex-1 bg-linear-to-l from-transparent via-kp-gold/35 to-kp-gold/55" />
                </div>

                <p className={`relative mx-auto mt-6 max-w-lg text-pretty sm:mt-7 ${bodyTextLg}`}>
                  {tr(
                    "Vous achetez un véhicule premium. Ensuite, c’est vous qui choisissez.",
                    "You buy a premium vehicle. Then you choose what comes next."
                  )}
                </p>

                <div className="relative mt-8 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row sm:gap-0">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50 sm:px-5">
                    <span className="text-kp-gold/80">01</span>
                    <span aria-hidden className="mx-2.5 text-white/20">·</span>
                    {tr("Acheter & rouler", "Buy & drive")}
                  </p>
                  <span
                    aria-hidden
                    className="hidden h-3 w-px bg-white/12 sm:block"
                  />
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50 sm:px-5">
                    <span className="text-kp-gold/80">02</span>
                    <span aria-hidden className="mx-2.5 text-white/20">·</span>
                    {tr("Acheter & rentabiliser", "Buy & earn")}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid items-stretch gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-5">
              <PathCard
                image={PATH_BUY_IMAGE}
                option={tr("Option 01", "Option 01")}
                title={tr("Acheter & rouler", "Buy & drive")}
                body={tr(
                  "Cash ou échelonné. Gardiennage diaspora. Livraison partout en Côte d’Ivoire.",
                  "Cash or installments. Diaspora safekeeping. Delivery anywhere in Côte d’Ivoire."
                )}
                highlight="6–24"
                highlightLabel={tr("Mois d’échelonnement", "Months of installments")}
                secondary="Cash"
                secondaryLabel={tr("Ou paiement direct", "Or direct payment")}
                points={buyPoints}
                
                from="left"
              />

              <PathCard
                image={PATH_RENT_IMAGE}
                option={tr("Option 02", "Option 02")}
                title={tr("Acheter & rentabiliser", "Buy & earn")}
                body={tr(
                  "Votre véhicule entre dans la flotte élite. KPANDJI gère tout. Vous percevez les revenus.",
                  "Your vehicle joins the elite fleet. KPANDJI handles everything. You collect the income."
                )}
                highlight="70%"
                highlightLabel={tr("Des revenus pour vous", "Of revenue for you")}
                secondary="30%"
                secondaryLabel={tr("Gestion KPANDJI", "KPANDJI management")}
                points={rentPoints}

                from="right"
                delayMs={80}
              />
            </div>
          </div>
        </section>

        {/* ─── 3. PARCOURS ─── */}
        <section
          id="parcours"
          aria-labelledby="parcours-heading"
          className="scroll-mt-24 border-t border-white/8 bg-kp-surface"
        >
          <div className={`${sectionPad} py-12 sm:py-16 md:py-20 lg:py-24`}>
            <Reveal from="bottom">
              <div className="mx-auto max-w-2xl text-center">
                <p className={`${eyebrow} justify-center`}>
                  <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
                  {tr("Parcours", "Journey")}
                  <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
                </p>
                <h2
                  id="parcours-heading"
                  className="mt-4 font-serif text-[clamp(1.85rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-white"
                >
                  {tr("Quatre étapes. C’est tout.", "Four steps. That’s it.")}
                </h2>
              </div>
            </Reveal>

            {/* Mobile: vertical timeline */}
            <ol className="relative mt-10 space-y-0 sm:mt-12 lg:hidden">
              <span
                aria-hidden
                className="absolute bottom-2 left-[15px] top-2 w-px bg-linear-to-b from-kp-gold/50 via-kp-gold/20 to-transparent"
              />
              {steps.map((step, i) => (
                <Reveal key={step.num} from="bottom" delayMs={i * 50}>
                  <li className="relative grid grid-cols-[32px_1fr] gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5 sm:py-6">
                    <span className="relative z-10 mt-1 flex size-8 items-center justify-center rounded-full border border-kp-gold/40 bg-kp-surface font-sans text-[11px] font-semibold text-kp-gold">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl tracking-tight text-white sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className={`mt-2 ${bodyText}`}>{step.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Desktop: 4 columns */}
            <ol className="mt-14 hidden gap-8 lg:grid lg:grid-cols-4">
              {steps.map((step, i) => (
                <Reveal key={step.num} from="bottom" delayMs={i * 70}>
                  <li className="relative">
                    {i < steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-6 h-px w-[calc(100%-1rem)] bg-linear-to-r from-kp-gold/45 to-transparent"
                      />
                    ) : null}
                    <p className="font-serif text-5xl font-medium leading-none text-kp-gold/30 xl:text-6xl">
                      {step.num}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl tracking-tight text-white xl:text-3xl">
                      {step.title}
                    </h3>
                    <p className={`mt-3 ${bodyText}`}>{step.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 4. CONTACT ─── */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-24 border-t border-white/8 bg-kp-bg pb-[max(5rem,env(safe-area-inset-bottom))] sm:pb-0"
        >
          <div className={`${sectionPad} py-12 sm:py-16 md:py-20 lg:py-24`}>
            <Reveal from="bottom">
              <div className="mx-auto max-w-2xl text-center">
                <p className={`${eyebrow} justify-center`}>
                  <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
                  {tr("Contact", "Contact")}
                  <span aria-hidden className="h-px w-6 bg-kp-gold/60 sm:w-8" />
                </p>
                <h2
                  id="contact-heading"
                  className="mt-4 font-serif text-[clamp(1.85rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-white"
                >
                  {tr(
                    "Parlez à un conseiller. Choisissez votre plan.",
                    "Talk to an advisor. Choose your plan."
                  )}
                </h2>
                <p className={`mx-auto mt-4 max-w-md sm:mt-5 ${bodyTextLg}`}>
                  {tr(
                    "Contactez-nous sur WhatsApp ou laissez vos coordonnées. Abidjan, Riviera Palmeraie.",
                    "Reach us on WhatsApp or leave your details. Abidjan, Riviera Palmeraie."
                  )}
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center">
                  <PrestigeContactCTA
                    variant="gold"
                    label={{
                      fr: "Parler à un conseiller",
                      en: "Talk to an advisor",
                    }}
                    modalTitle={{
                      fr: "Parler à un conseiller",
                      en: "Talk to an advisor",
                    }}
                    modalSubtitle={{
                      fr: "Laissez vos coordonnées — un conseiller Privilège vous recontacte pour choisir votre plan.",
                      en: "Leave your details — a Privilège advisor will get back to you to choose your plan.",
                    }}
                    submitLabel={{
                      fr: "Être recontacté",
                      en: "Request a callback",
                    }}
                    successTitle={{
                      fr: "Demande enregistrée",
                      en: "Request received",
                    }}
                    successMessage={{
                      fr: "Merci. Un conseiller Privilège vous recontactera très prochainement.",
                      en: "Thank you. A Privilège advisor will contact you shortly.",
                    }}
                  />
                  <PrestigeContactCTA />
                </div>

                <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:mt-12 sm:flex-row sm:justify-center sm:gap-8 sm:pt-10">
                  <a
                    href="tel:+2250707201992"
                    className="min-h-11 inline-flex items-center text-[15px] text-white/60 transition hover:text-kp-gold sm:text-[16px]"
                  >
                    +225 07 07 20 19 92
                  </a>
                  <span aria-hidden className="hidden h-4 w-px bg-white/15 sm:block" />
                  <a
                    href="mailto:contact@kpandji.com"
                    className="min-h-11 inline-flex items-center text-[15px] text-white/60 transition hover:text-kp-gold sm:text-[16px]"
                  >
                    contact@kpandji.com
                  </a>
                </div>
                <p className="mt-6 font-serif text-[15px] italic text-white/40 sm:text-base">
                  {tr(
                    "La force d’une racine, l’élan d’une nation.",
                    "The strength of a root, the drive of a nation."
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
