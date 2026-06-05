import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageDecor } from "@/components/kp/ContactPageDecor";
import { EssaiApplicationForm } from "@/components/kp/EssaiApplicationForm";
import { Reveal } from "@/components/kp/Reveal";

export const metadata: Metadata = {
  title: "Réserver un essai — KPANDJI AUTOMOBILES",
  description:
    "Demandez un essai routier KPANDJI : choisissez un ou plusieurs modèles et indiquez vos disponibilités.",
  alternates: {
    canonical: "/essai",
  },
  openGraph: {
    title: "Réserver un essai — KPANDJI AUTOMOBILES",
    description:
      "Réservez votre essai routier : sélectionnez les modèles DJETRAN, DJETRAN PLUS ou LATHAYE.",
    type: "website",
    locale: "fr_FR",
  },
};

function IconCar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0" />
      <path d="M5 17H3v-3l2-5h14l2 5v3h-2M9 9l1-3h4l1 3" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-white/12 hover:bg-kp-elevated/40 md:p-7";

const cardGlow =
  "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-kp-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100";

const STEPS = [
  "Sélectionnez un ou plusieurs modèles",
  "Indiquez vos coordonnées et disponibilités",
  "Envoyez — nous confirmons votre créneau",
] as const;

export default function EssaiPage() {
  return (
    <div className="min-h-screen bg-kp-bg">
      <main className="relative overflow-hidden pt-[110px] md:pt-[132px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-kp-surface"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_12%_0%,rgba(201,169,98,0.16),transparent_58%),radial-gradient(820px_520px_at_88%_45%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(700px_400px_at_50%_100%,rgba(201,169,98,0.05),transparent_50%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[72px_72px]"
        />
        <div
          className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.11] mix-blend-overlay"
          aria-hidden
        />
        <ContactPageDecor />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-linear-to-r from-transparent via-kp-gold/55 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <header className="mx-auto max-w-3xl text-center">
              <div className="flex flex-col items-center">
                <span
                  className="h-px w-32 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-48"
                  aria-hidden
                />
                <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.42em] text-kp-muted md:text-[11px]">
                  Essai routier
                </p>
                <h1 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.15rem,5.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-kp-accent">
                  Réserver un essai
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-pretty text-sm leading-relaxed text-white/50 md:text-[15px] md:leading-[1.65]">
                  Choisissez les modèles que vous souhaitez essayer — un seul ou
                  plusieurs — et indiquez vos disponibilités. Notre équipe vous
                  recontacte pour fixer le rendez-vous.
                </p>
              </div>
            </header>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative lg:pl-8">
                  <div
                    aria-hidden
                    className="absolute left-0 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-kp-gold/70 via-white/12 to-transparent lg:block"
                  />
                  <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40 lg:text-left">
                    Comment ça marche
                  </p>

                  <ol className="mt-6 space-y-3">
                    {STEPS.map((step, index) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 rounded-xl border border-white/6 bg-black/20 px-4 py-3.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-kp-gold/35 bg-kp-gold/10 font-sans text-[11px] font-semibold text-kp-gold">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-[13px] leading-relaxed text-white/55">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className={cardClass}>
                      <span className={cardGlow} aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                          <IconCar className="opacity-90" />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                            Essai sur route
                          </p>
                          <p className="mt-2 text-[13px] leading-relaxed text-white/42">
                            Prenez le volant et découvrez le confort, la puissance et
                            les équipements de la gamme KPANDJI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={cardClass}>
                      <span className={cardGlow} aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-kp-gold/90">
                          <IconClock className="opacity-90" />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                            Confirmation rapide
                          </p>
                          <p className="mt-2 text-[13px] leading-relaxed text-white/42">
                            Nous validons votre créneau par e-mail ou téléphone sous 48
                            h ouvrées.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/6 bg-black/25 p-5 backdrop-blur-sm md:p-6">
                    <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35 lg:text-left">
                      Découvrir avant l&apos;essai
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                      <li className="flex-1 sm:flex-none sm:min-w-[140px]">
                        <Link
                          href="/showroom"
                          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-center text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-kp-gold/35 hover:bg-kp-gold/10 hover:text-kp-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 sm:justify-between sm:text-left">
                          <span>Showroom virtuel</span>
                          <IconArrow className="hidden shrink-0 text-kp-gold/80 sm:block" />
                        </Link>
                      </li>
                      <li className="flex-1 sm:flex-none sm:min-w-[140px]">
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-center text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-kp-gold/35 hover:bg-kp-gold/10 hover:text-kp-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 sm:justify-between sm:text-left">
                          <span>Autre question</span>
                          <IconArrow className="hidden shrink-0 text-kp-gold/80 sm:block" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delayMs={100} rootMargin="0px 0px -6% 0px">
                <EssaiApplicationForm />
              </Reveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
