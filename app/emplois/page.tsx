import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageDecor } from "@/components/kp/ContactPageDecor";
import { EmploisPageHero } from "@/components/kp/EmploisPageHero";
import { JobApplicationForm } from "@/components/kp/JobApplicationForm";
import { Reveal } from "@/components/kp/Reveal";

export const metadata: Metadata = {
title: "Candidatures — KPANDJI AUTOMOBILES",
  description:
    "Envoyez votre candidature à KPANDJI AUTOMOBILES : parcours, compétences et CV joignez à votre message à notre équipe RH.",
  alternates: {
    canonical: "/emplois",
  },
  openGraph: {
    title: "Candidatures — KPANDJI AUTOMOBILES",
    description:
      "Postulez auprès de KPANDJI AUTOMOBILES : formulaire guidé puis envoi par e-mail avec votre CV.",
    type: "website",
    locale: "fr_FR",
  },
};

function IconPaper({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconSpark({ className }: { className?: string }) {
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
      <path d="m12 3-1.9 5.9H4l5 3.8L7.1 21 12 16.9 16.9 21 15 12.7l5-3.8h-6.1L12 3Z" />
    </svg>
  );
}

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-white/12 hover:bg-kp-elevated/40 sm:p-6";

const cardGlow =
  "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-kp-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100";

const APPLICATION_CHIPS = [
  "Formulaire CV & compétences",
  "PJ PDF recommandée",
  "Contact RH",
] as const;

export default function EmploisCandidaturePage() {
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

        <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-24 sm:px-5 md:px-10 md:pb-28 lg:pb-36">
          <Reveal rootMargin="-40px">
            <EmploisPageHero
              kicker={"Rejoignez l\u2019équipe"}
              title="Candidature"
              description="Partagez votre parcours, vos compétences et une synthèse de votre CV. Une fois le brouillon e-mail créé, ajoutez votre pièce jointe PDF avant validation."
              chips={APPLICATION_CHIPS}
            />
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-white/20 pt-14 sm:mt-16 sm:gap-12 sm:pt-16 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-14 lg:pt-20 xl:gap-20">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <aside className="relative lg:sticky lg:top-[calc(132px+1.25rem)] lg:self-start lg:pl-8 xl:top-[calc(132px+1.75rem)]">
                  <div
                    aria-hidden
                    className="absolute left-0 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-kp-gold/70 via-white/12 to-transparent lg:block"
                  />
                  <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40 lg:text-left">
                    Conseils
                  </p>
                  <ul
                    className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-1"
                    role="list">
                    <li className="min-w-0">
                      <div className={cardClass} role="presentation">
                        <span className={cardGlow} aria-hidden />
                        <div className="relative flex items-start gap-4">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                            <IconPaper className="opacity-90" />
                          </span>
                          <div className="min-w-0 text-left">
                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                              CV lisible & court
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-white/42">
                              En deux ou trois phrases dans le champ dédié, mettez en avant ce qui nous
                              aidera à comprendre votre profil avant d&apos;ouvrir votre PDF.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="min-w-0">
                      <div className={cardClass} role="presentation">
                        <span className={cardGlow} aria-hidden />
                        <div className="relative flex items-start gap-4">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-kp-gold/90">
                            <IconSpark className="opacity-90" />
                          </span>
                          <div className="min-w-0 text-left">
                            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                              Compétences ciblées
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-white/42">
                              Reliez explicitement vos savoir-faire au poste visé ; les langues et les
                              outils métiers comptent.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 rounded-2xl border border-white/6 bg-black/25 p-5 backdrop-blur-sm sm:mt-8 sm:p-6">
                    <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35 lg:text-left">
                      Besoin d&apos;échanger avant d&apos;envoyer ?
                    </p>
                    <p className="mt-3 text-center text-[13px] leading-relaxed text-white/42 lg:text-left">
                      Pour une question générale ou un premier contact, vous pouvez aussi nous
                      écrire depuis la page Contact.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-center text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-kp-gold/35 hover:bg-kp-gold/10 hover:text-kp-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45">
                      Aller à la page Contact
                    </Link>
                  </div>
                </aside>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <Reveal delayMs={100} rootMargin="0px 0px -6% 0px">
                <JobApplicationForm />
              </Reveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
