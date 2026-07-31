"use client";

import Link from "next/link";
import { useReducedMotion, motion } from "framer-motion";

const CATALOGUE_URL = "/catalogue2026.pdf";
const CATALOGUE_FILENAME = "KPANDJI-Catalogue-2026.pdf";

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

const btnPrimary =
  "inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-kp-gold px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:flex-none sm:px-8";

const btnSecondary =
  "inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full border border-white/14 bg-white/4 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:border-kp-gold/35 hover:bg-kp-gold/10 hover:text-kp-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:flex-none sm:px-7";

export default function Catalogue() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-kp-bg pt-[110px] md:pt-[132px]"
      aria-labelledby="kp-catalogue-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-kp-surface"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_14%_0%,rgba(201,169,98,0.14),transparent_58%),radial-gradient(820px_520px_at_90%_40%,rgba(255,255,255,0.05),transparent_55%),radial-gradient(700px_400px_at_50%_100%,rgba(201,169,98,0.05),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[72px_72px]"
      />
      <div
        className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.11] mix-blend-overlay"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[110px] z-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent md:top-[132px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-400 flex-col px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-16 sm:pt-8 md:px-10 md:pb-24 lg:pt-10">
        <motion.header
          className="mx-auto w-full max-w-3xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center">
            <span
              className="h-px w-24 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent sm:w-32"
              aria-hidden
            />
            <p className="mt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.42em] text-kp-muted sm:text-[11px]">
              Documentation
            </p>
            <h1
              id="kp-catalogue-heading"
              className="mt-4 max-w-[16ch] font-serif text-[clamp(2rem,5.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.025em] text-kp-accent"
            >
              Catalogue 2026
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/50 sm:mt-5 sm:text-[15px]">
              Consultez la gamme KPANDJI et téléchargez le document officiel.
            </p>
          </div>

          {/* Desktop / tablet actions */}
          <div className="mt-8 hidden items-center justify-center gap-3 sm:flex">
            <Link href="/" className={btnSecondary}>
              <IconArrowLeft />
              Retour
            </Link>
            <a
              href={CATALOGUE_URL}
              download={CATALOGUE_FILENAME}
              className={btnPrimary}
            >
              <IconDownload />
              Télécharger
            </a>
          </div>
        </motion.header>

        <motion.div
          className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10 md:mt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/40 shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:rounded-3xl"
            style={{
              boxShadow:
                "0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[22px] bg-linear-to-br from-kp-gold/18 via-transparent to-white/4 opacity-70 sm:rounded-3xl"
            />

            {/* Viewer chrome */}
            <div className="relative flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                  <IconDocument className="size-[18px]" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="truncate font-sans text-[13px] font-medium text-kp-accent">
                    catalogue2026.pdf
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/40">
                    Document officiel · PDF
                  </p>
                </div>
              </div>
              <a
                href={CATALOGUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 rounded-full border border-white/12 bg-white/4 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:border-kp-gold/35 hover:text-kp-accent md:inline-flex"
              >
                Plein écran
              </a>
            </div>

            {/* Desktop / tablet embedded viewer */}
            <div className="relative hidden bg-kp-elevated/80 md:block">
              <iframe
                title="Catalogue KPANDJI 2026"
                src={`${CATALOGUE_URL}#view=FitH`}
                className="h-[min(72vh,860px)] w-full border-0 bg-white"
              />
            </div>

            {/* Mobile / small tablet: native PDF preview is unreliable — clear CTA stage */}
            <div className="relative flex flex-col items-center px-5 py-12 text-center md:hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_240px_at_50%_20%,rgba(201,169,98,0.12),transparent_70%)]"
              />
              <span className="relative flex size-16 items-center justify-center rounded-2xl border border-kp-gold/30 bg-kp-gold/10 text-kp-gold shadow-[0_0_48px_rgba(201,169,98,0.18)]">
                <IconDocument />
              </span>
              <p className="relative mt-6 font-serif text-2xl text-kp-accent">
                Catalogue KPANDJI 2026
              </p>
              <p className="relative mx-auto mt-3 max-w-xs text-pretty text-[13px] leading-relaxed text-white/48">
                Sur mobile, ouvrez ou téléchargez le PDF pour une lecture
                confortable.
              </p>
              <div className="relative mt-8 flex w-full max-w-sm flex-col gap-3">
                <a
                  href={CATALOGUE_URL}
                  download={CATALOGUE_FILENAME}
                  className={btnPrimary + " w-full"}
                >
                  <IconDownload />
                  Télécharger
                </a>
                <a
                  href={CATALOGUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnSecondary + " w-full"}
                >
                  Ouvrir le document
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-kp-bg/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-md gap-2.5">
          <Link href="/" className={btnSecondary}>
            <IconArrowLeft />
            Retour
          </Link>
          <a
            href={CATALOGUE_URL}
            download={CATALOGUE_FILENAME}
            className={btnPrimary}
          >
            <IconDownload />
            Télécharger
          </a>
        </div>
      </div>
    </section>
  );
}
