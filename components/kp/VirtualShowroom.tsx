"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type ShowroomModel = {
  id: string;
  name: string;
  badge?: string;
  description: string;
  brochureHref?: string;
  highlights: string[];
  gallery: Array<{ src: string; alt: string; tag?: "Extérieur" | "Intérieur" }>;
};

const MODELS: ShowroomModel[] = [
  {
    id: "djetranplus",
    name: "DJETRAN PLUS",
    badge: "Nouveau",
    description:
      "Moteur Turbo Diesel 2,5L (136 ch / 100 kW) et couple 340 Nm. Démarrage sans clé, caméra panoramique 360°, ABS + EBD : une synthèse de confort, sécurité et sobriété.",
    highlights: [
      "Turbo Diesel 2,5L — 136 ch",
      "Couple 340 Nm",
      "Caméra panoramique 360°",
      "ABS + EBD",
    ],
    gallery: [
      { src: "/models/plus/pic1.jpg", alt: "DJETRAN PLUS — extérieur", tag: "Extérieur" },
      { src: "/models/plus/pic2.jpg", alt: "DJETRAN PLUS — détail", tag: "Extérieur" },
      { src: "/models/plus/plint1.jpg", alt: "DJETRAN PLUS — intérieur", tag: "Intérieur" },
      { src: "/models/plus/plint2.jpg", alt: "DJETRAN PLUS — intérieur", tag: "Intérieur" },
      { src: "/models/plus/pic3.jpg", alt: "DJETRAN PLUS — extérieur", tag: "Extérieur" },
    ],
  },
  {
    id: "djetran",
    name: "DJETRAN",
    description:
      "Turbo Diesel 2,3L (163 ch) et couple 340 Nm. Caméra 360°, contrôle de stabilité, ABS + EBD : un 4x4 pensé pour la route comme le tout-terrain.",
    brochureHref: "/fiche_djetran.pdf",
    highlights: [
      "Turbo Diesel 2,3L — 163 ch",
      "Transmission intégrale",
      "Caméra 360°",
      "Contrôle de stabilité",
    ],
    gallery: [
      { src: "/models/djet/pic3.png", alt: "DJETRAN — extérieur", tag: "Extérieur" },
      { src: "/models/djet/int/int1.jpg", alt: "DJETRAN — intérieur", tag: "Intérieur" },
      { src: "/models/djet/arriere.jpg", alt: "DJETRAN — arrière", tag: "Extérieur" },
      { src: "/models/djet/int/int3.jpg", alt: "DJETRAN — habitacle", tag: "Intérieur" },
    ],
  },
  {
    id: "lathaye",
    name: "LATHAYE",
    description:
      "Moteur 2.0T GDI (165 kW) et transmission automatique CVT à 8 vitesses. Vitesse maximale 210 km/h : une conduite fluide, moderne et efficiente.",
    brochureHref: "/Lathaye.pdf",
    highlights: [
      "2.0T GDI — 165 kW",
      "Boîte CVT 8 vitesses",
      "Vitesse max 210 km/h",
      "Confort & efficience",
    ],
    gallery: [
      { src: "/models/lath/pic3.jpg", alt: "LATHAYE — extérieur", tag: "Extérieur" },
      { src: "/models/lath/pic1.jpg", alt: "LATHAYE — extérieur", tag: "Extérieur" },
      { src: "/models/lath/pic2.jpeg", alt: "LATHAYE — intérieur", tag: "Intérieur" },
      { src: "/models/lath/pic4.jpg", alt: "LATHAYE — détail", tag: "Extérieur" },
    ],
  },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
        active
          ? "border-kp-gold/55 bg-kp-gold/15 text-kp-accent shadow-[0_0_0_1px_rgba(201,169,98,0.14)]"
          : "border-white/12 bg-white/4 text-white/65 hover:border-white/22 hover:bg-white/6 hover:text-white/80"
      }`}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-kp-gold/45 bg-white/95 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.65)] transition duration-300 ease-out hover:scale-[1.02] hover:border-kp-gold/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}

export default function VirtualShowroom() {
  const reduceMotion = useReducedMotion();
  const regionId = useId();
  const tabsId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState(MODELS[0]?.id ?? "djetran");
  const [tag, setTag] = useState<"Tous" | "Extérieur" | "Intérieur">("Tous");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);

  const selected = useMemo(
    () => MODELS.find((m) => m.id === selectedId) ?? MODELS[0],
    [selectedId]
  );

  const filteredGallery = useMemo(() => {
    const base = selected?.gallery ?? [];
    const list = tag === "Tous" ? base : base.filter((g) => g.tag === tag);
    return list.length ? list : base;
  }, [selected, tag]);

  const safeIndex = Math.min(activeIndex, Math.max(filteredGallery.length - 1, 0));
  const active = filteredGallery[safeIndex];

  const easeLux = [0.22, 1, 0.36, 1] as const;

  function selectModel(id: string) {
    setSelectedId(id);
    setActiveIndex(0);
    setTag("Tous");
  }

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  useEffect(() => {
    if (reduceMotion) return;
    if (isHoveringGallery) return;
    if (tag !== "Tous") return;
    if (filteredGallery.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % filteredGallery.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [filteredGallery.length, isHoveringGallery, reduceMotion, tag]);

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
      }}
      aria-labelledby={regionId}
      className="relative overflow-hidden pt-[110px] md:pt-[132px]"
    >
      {/* Scroll progress (subtle, premium) */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-90 h-px origin-left bg-linear-to-r from-kp-gold/0 via-kp-gold/65 to-kp-gold/0 opacity-60"
        style={{ scaleX: progress }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(850px_420px_at_22%_14%,rgba(201,169,98,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_70%,rgba(255,255,255,0.05),transparent_60%)]"
      />
      <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 opacity-[0.10]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-28 size-[460px] rounded-full bg-kp-gold/8 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, 10, 0] }}
        transition={{
          duration: 9.5,
          ease: easeLux,
          repeat: reduceMotion ? 0 : Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-[420px] size-[520px] rounded-full bg-white/6 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, -14, 0], x: [0, -8, 0] }}
        transition={{
          duration: 10.5,
          ease: easeLux,
          repeat: reduceMotion ? 0 : Infinity,
          repeatType: "mirror",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex flex-col items-center">
              <span
                className="h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-52"
                aria-hidden
              />
              <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.38em] text-kp-muted">
              Découvrez notre
              </p>
              <h1
                id={regionId}
                className="mt-5 font-serif text-[clamp(2.1rem,5.6vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-kp-accent"
              >
                 Kpandji Showroom virtuel
              </h1>
              
            </div>
          </header>
        </Reveal>

        <Reveal className="mt-10">
          <div className="sticky top-[84px] z-40 -mx-2 overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-1 shadow-[0_28px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/6 backdrop-blur-2xl sm:mx-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_50%_0%,rgba(201,169,98,0.12),transparent_55%)]"
            />
            <div className="relative px-3 py-4 md:px-5 md:py-5">
              <p
                id={tabsId}
                className="px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45"
              >
                Sélectionner un modèle
              </p>
              <div
                role="tablist"
                aria-labelledby={tabsId}
                className="mt-3 flex gap-1 overflow-x-auto pb-px kp-hide-scrollbar sm:gap-2"
              >
                {MODELS.map((m) => {
                  const isActive = m.id === selectedId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="tab"
                      id={`tab-${m.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${m.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectModel(m.id)}
                      onKeyDown={(e) => {
                        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                        e.preventDefault();
                        const idx = MODELS.findIndex((x) => x.id === m.id);
                        const next =
                          e.key === "ArrowRight"
                            ? MODELS[(idx + 1) % MODELS.length]
                            : MODELS[(idx - 1 + MODELS.length) % MODELS.length];
                        selectModel(next.id);
                        window.setTimeout(() => {
                          document.getElementById(`tab-${next.id}`)?.focus();
                        }, 0);
                      }}
                      className={`relative shrink-0 rounded-t-xl px-4 py-3 text-left transition sm:px-5 sm:py-3.5 ${
                        isActive
                          ? "bg-white/9 text-kp-accent"
                          : "text-white/55 hover:bg-white/6 hover:text-white/85"
                      }`}
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-base font-medium tracking-[-0.02em] sm:text-lg">
                          {m.name}
                        </span>
                        {m.badge ? (
                          <span className="rounded-full border border-kp-gold/35 bg-kp-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-kp-gold">
                            {m.badge}
                          </span>
                        ) : null}
                      </span>
                      {isActive ? (
                        <motion.span
                          aria-hidden
                          layoutId="kp-showroom-tab-underline"
                          className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-kp-gold/85"
                          transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeLux }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div
            role="tabpanel"
            id={`panel-${selectedId}`}
            aria-labelledby={`tab-${selectedId}`}
            className="grid gap-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                Visuels
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip active={tag === "Tous"} onClick={() => setTag("Tous")}>
                  Tous
                </Chip>
                <Chip active={tag === "Extérieur"} onClick={() => setTag("Extérieur")}>
                  Extérieur
                </Chip>
                <Chip active={tag === "Intérieur"} onClick={() => setTag("Intérieur")}>
                  Intérieur
                </Chip>
              </div>
            </div>

            <motion.div
              key={selectedId}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeLux }}
              className="grid gap-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.95)] ring-1 ring-white/6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/35"
                />

                <div className="relative mx-auto w-full max-w-[min(100%,72rem)] px-4 pt-4 sm:px-6 sm:pt-5 md:px-10 md:pt-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/8">
                    <AnimatePresence mode="wait">
                      {active ? (
                        <motion.div
                          key={active.src}
                          className="absolute inset-0"
                          initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
                          transition={{ duration: reduceMotion ? 0 : 0.55, ease: easeLux }}
                        >
                          <Image
                            src={active.src}
                            alt={active.alt}
                            fill
                            priority
                            loading="eager"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover object-center"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/45" />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center">
                          <p className="text-sm text-white/45">Aucun visuel disponible.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative border-t border-white/10 bg-black/35 px-4 py-3 md:px-5 md:py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                        {selected?.name}
                        {active?.tag ? (
                          <span className="ml-2 text-white/30">— {active.tag}</span>
                        ) : null}
                      </p>
                      <p className="mt-1 kp-clamp-2 text-sm text-white/60">
                        {selected?.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {selected?.brochureHref ? (
                        <PrimaryButton href={selected.brochureHref}>Fiche Technique</PrimaryButton>
                      ) : null}
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4 ring-1 ring-white/5 backdrop-blur">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                      Galerie
                    </p>
                    <div
                      className="mt-3 flex gap-3 overflow-x-auto pb-2 kp-hide-scrollbar"
                      onMouseEnter={() => setIsHoveringGallery(true)}
                      onMouseLeave={() => setIsHoveringGallery(false)}
                    >
                      {filteredGallery.map((g, idx) => {
                        const isActive = idx === safeIndex;
                        return (
                          <button
                            key={`${g.src}-${idx}`}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`relative h-[74px] w-[118px] shrink-0 overflow-hidden rounded-xl border transition ${
                              isActive
                                ? "border-kp-gold/55 ring-2 ring-kp-gold/20"
                                : "border-white/10 hover:border-white/22"
                            }`}
                            aria-label={`Voir image ${idx + 1}`}
                          >
                            <Image
                              src={g.src}
                              alt=""
                              fill
                              sizes="120px"
                              loading={isActive ? "eager" : "lazy"}
                              className="object-cover object-center"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/0 to-black/45" />
                            {g.tag ? (
                              <span className="absolute bottom-2 left-2 rounded-full border border-white/12 bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
                                {g.tag}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/55 p-5 shadow-[0_28px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/5 backdrop-blur">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_280px_at_20%_12%,rgba(201,169,98,0.16),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_55%)]"
                    />
                    <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 opacity-[0.12]" />

                    <div className="relative">
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                        Points forts
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent">
                        {selected?.name}
                      </h2>
                      <ul className="mt-4 space-y-3 text-[13px] text-white/55">
                        {(selected?.highlights ?? []).map((h) => (
                          <li key={h} className="flex gap-3">
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-kp-gold/70 shadow-[0_0_12px_rgba(201,169,98,0.35)]"
                              aria-hidden
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 grid gap-2">
                        <PrimaryButton href="/service-apres-vente">Prenez rendez-vous</PrimaryButton>
                        <Link
                          href="/"
                          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:border-white/22 hover:bg-white/6 hover:text-white"
                        >
                          Retour à l&apos;accueil
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-white/6 bg-kp-bg/70 py-14">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-kp-muted">
                  Besoin d’aide ?
                </p>
                <h3 className="mt-3 font-serif text-3xl font-medium tracking-[-0.02em] text-kp-accent">
                  Un conseiller vous guide
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/52 md:text-[15px]">
                  Pour une disponibilité, un conseil sur la configuration ou l’entretien, notre
                  équipe S.A.V. peut vous orienter rapidement.
                </p>
              </div>
              <div className="md:col-span-5 md:justify-self-end">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <PrimaryButton href="/service-apres-vente">Contactez le S.A.V. ou le Conseiller</PrimaryButton>
                  {selected?.brochureHref ? (
                    <Link
                      href={selected.brochureHref}
                      className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/5 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:border-white/24 hover:bg-white/7 hover:text-white"
                    >
                      Télécharger la fiche
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

