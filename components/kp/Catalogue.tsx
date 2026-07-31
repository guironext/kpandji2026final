"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const CATALOGUE_URL = "/catalogue2026.pdf";
const CATALOGUE_FILENAME = "KPANDJI-Catalogue-2026.pdf";
const PAGE_COUNT = 34;
const PAGE_WIDTH = 1280;
const PAGE_HEIGHT = 1811;

const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => ({
  src: `/catalogue2026/pages/page-${String(i + 1).padStart(2, "0")}.jpg`,
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
}));

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

function IconChevron({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

const btnPrimary =
  "inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-kp-gold px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:flex-none sm:px-8";

const btnSecondary =
  "inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full border border-white/14 bg-white/4 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:border-kp-gold/35 hover:bg-kp-gold/10 hover:text-kp-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:flex-none sm:px-7";

const navBtn =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/14 bg-black/45 text-white/85 backdrop-blur-md transition hover:border-kp-gold/40 hover:bg-kp-gold/15 hover:text-kp-accent disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

export default function Catalogue() {
  const reduceMotion = useReducedMotion();
  const [pageIndex, setPageIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setPageIndex(Math.max(0, Math.min(PAGE_COUNT - 1, index)));
  }, []);

  const goPrev = useCallback(() => goTo(pageIndex - 1), [goTo, pageIndex]);
  const goNext = useCallback(() => goTo(pageIndex + 1), [goTo, pageIndex]);

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    thumbRefs.current[pageIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [pageIndex, reduceMotion]);

  const page = PAGES[pageIndex];
  const preload = [PAGES[pageIndex - 1], PAGES[pageIndex + 1]].filter(Boolean);

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

      <div className="relative z-10 mx-auto flex w-full max-w-400 flex-col px-5 pb-[calc(6.75rem+env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-16 sm:pt-8 md:px-10 md:pb-24 lg:pt-10">
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
              Feuilletez les {PAGE_COUNT} pages en ligne, ou téléchargez le PDF
              officiel.
            </p>
          </div>

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
          className="relative mx-auto mt-8 w-full max-w-3xl sm:mt-10 md:mt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/50 sm:rounded-3xl"
            style={{
              boxShadow:
                "0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
              <p className="font-sans text-[12px] font-medium text-kp-accent sm:text-[13px]">
                Page {pageIndex + 1}
                <span className="text-white/35"> / {PAGE_COUNT}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={navBtn}
                  onClick={goPrev}
                  disabled={pageIndex === 0}
                  aria-label="Page précédente"
                >
                  <IconChevron direction="left" />
                </button>
                <button
                  type="button"
                  className={navBtn}
                  onClick={goNext}
                  disabled={pageIndex === PAGE_COUNT - 1}
                  aria-label="Page suivante"
                >
                  <IconChevron direction="right" />
                </button>
              </div>
            </div>

            <div
              className="relative bg-kp-elevated/90"
              onTouchStart={(e) => {
                touchStartX.current = e.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                const end = e.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (start == null || end == null) return;
                const delta = end - start;
                if (Math.abs(delta) < 48) return;
                if (delta > 0) goPrev();
                else goNext();
              }}
            >
              <div className="relative mx-auto aspect-[1280/1811] w-full max-w-full">
                <Image
                  key={page.src}
                  src={page.src}
                  alt={`Catalogue KPANDJI 2026 — page ${pageIndex + 1}`}
                  fill
                  priority={pageIndex < 2}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain object-top"
                />
              </div>

              {/* Prefetch neighbors */}
              <div className="pointer-events-none absolute size-0 overflow-hidden opacity-0" aria-hidden>
                {preload.map((p) => (
                  <Image
                    key={p.src}
                    src={p.src}
                    alt=""
                    width={p.width}
                    height={p.height}
                  />
                ))}
              </div>

              <button
                type="button"
                className="absolute inset-y-0 left-0 hidden w-[22%] cursor-w-resize bg-transparent md:block"
                onClick={goPrev}
                disabled={pageIndex === 0}
                aria-label="Page précédente"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 hidden w-[22%] cursor-e-resize bg-transparent md:block"
                onClick={goNext}
                disabled={pageIndex === PAGE_COUNT - 1}
                aria-label="Page suivante"
              />
            </div>

            {/* Thumbnail strip */}
            <div className="border-t border-white/8 bg-black/35 px-3 py-3 sm:px-4">
              <div
                className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="listbox"
                aria-label="Pages du catalogue"
              >
                {PAGES.map((p, i) => {
                  const active = i === pageIndex;
                  return (
                    <button
                      key={p.src}
                      type="button"
                      role="option"
                      aria-selected={active}
                      aria-label={`Aller à la page ${i + 1}`}
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      onClick={() => goTo(i)}
                      className={`relative h-16 w-11 shrink-0 overflow-hidden rounded-md border transition sm:h-[4.5rem] sm:w-12 ${
                        active
                          ? "border-kp-gold ring-1 ring-kp-gold/50"
                          : "border-white/12 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-kp-bg/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <div className="mx-auto mb-2 flex max-w-md items-center justify-between gap-2">
          <button
            type="button"
            className={navBtn}
            onClick={goPrev}
            disabled={pageIndex === 0}
            aria-label="Page précédente"
          >
            <IconChevron direction="left" />
          </button>
          <p className="font-sans text-[12px] text-white/55">
            {pageIndex + 1} / {PAGE_COUNT}
          </p>
          <button
            type="button"
            className={navBtn}
            onClick={goNext}
            disabled={pageIndex === PAGE_COUNT - 1}
            aria-label="Page suivante"
          >
            <IconChevron direction="right" />
          </button>
        </div>
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
