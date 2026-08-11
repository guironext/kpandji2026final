"use client";

import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/kp/ContactFormSkeleton";
import { ContactPageDecor } from "@/components/kp/ContactPageDecor";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const ContactForm = dynamic(
  () =>
    import("@/components/kp/ContactForm").then((m) => ({
      default: m.ContactForm,
    })),
  { loading: () => <ContactFormSkeleton /> },
);

function IconMail({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-white/12 hover:bg-kp-elevated/40 md:p-7";

const cardGlow =
  "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-kp-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100";

export function ContactPageContent() {
  const { tr } = useLocale();

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
          <header className="mx-auto max-w-3xl text-center opacity-0-start animate-fade-up">
            <div className="flex flex-col items-center">
              <span
                className="h-px w-32 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-48"
                aria-hidden
              />
             
              <h1 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.15rem,5.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-kp-accent">
                {tr("Une équipe à votre écoute", "A team that listens")}
              </h1>
              
            </div>
          </header>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-20">
            <div className="lg:col-span-5">
              <div className="relative opacity-0-start animate-fade-up animation-delay-100 lg:pl-8">
                  <div
                    aria-hidden
                    className="absolute left-0 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-kp-gold/70 via-white/12 to-transparent lg:block"
                  />
                  <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40 lg:text-left">
                    {tr("Accès directs", "Direct access")}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <a href="mailto:contact@kpandji.com" className={cardClass}>
                      <span className={cardGlow} aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                          <IconMail className="opacity-90" />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                            {tr("Courriel", "Email")}
                          </p>
                          <p className="mt-2 break-all font-sans text-[15px] font-medium text-kp-accent transition-colors group-hover:text-white">
                            contact@kpandji.com
                          </p>
                        </div>
                      </div>
                    </a>

                    <div className={cardClass}>
                      <span className={cardGlow} aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-kp-gold/90">
                          <IconPin className="opacity-90" />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                            {tr("Siège", "Headquarters")}
                          </p>
                          <p className="mt-2 font-sans text-[15px] font-medium text-kp-accent">
                            {tr("Côte d'Ivoire", "Ivory Coast")}
                          </p>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-white/42">
                            {tr("KPANDJI AUTOMOBILES — constructeur automobile", "KPANDJI AUTOMOBILES — automobile manufacturer")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/6 bg-black/25 p-5 backdrop-blur-sm md:p-6">
                    
                    
                  </div>
                </div>
            </div>

            <div className="lg:col-span-7 opacity-0-start animate-fade-up animation-delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
