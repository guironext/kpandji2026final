"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m as motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale } from "@/components/providers/KpLocaleProvider";

type Copy = { fr: string; en: string };

type GalleryTagKey = "ext" | "int";

type ShowroomModel = {
  id: string;
  name: string;
  badge?: Copy;
  tagline: Copy;
  description: Copy;
  brochureHref: string;
  highlights: Copy[];
  gallery: Array<{ src: string; alt: string; tag?: GalleryTagKey }>;
};

const MODELS: ShowroomModel[] = [
  {
    id: "djetranplus",
    name: "DJETRAN PLUS",
    badge: { fr: "Nouveau", en: "New" },
    tagline: {
      fr: "Pick-up premium, diesel ou essence, assistance niveau 2.",
      en: "Premium pick-up, diesel or petrol, level 2 driving assistance.",
    },
    description: {
      fr: "Motorisations essence 2.0 GDI (197 ch, 360 Nm). Régulateur adaptatif, alerte de ligne, collision frontale, vision 360° et équipements de confort haut de gamme.",
      en: "2.0 GDI petrol engine (197 hp, 360 Nm). Adaptive cruise control, lane-departure warning, forward-collision warning, 360° vision, and premium comfort equipment.",
    },
    brochureHref: "/djetranplus.pdf",
    highlights: [
      {
        fr: "Diesel 2.3T — 163 ch / 380 Nm",
        en: "2.3T diesel — 163 hp / 380 Nm",
      },
      {
        fr: "Essence 2.0 GDI — 197 ch / 360 Nm",
        en: "2.0 GDI petrol — 197 hp / 360 Nm",
      },
      {
        fr: "Assistance à la conduite niveau 2",
        en: "Level 2 driving assistance",
      },
      {
        fr: "Vision panoramique 360°",
        en: "360° panoramic vision",
      },
    ],
    gallery: [
      { src: "/models/showcase/plusext0.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusext1.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusext2.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusext3.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusext4.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusext5.jpg", alt: "DJETRAN PLUS", tag: "ext" },
      { src: "/models/showcase/plusint1.jpg", alt: "DJETRAN PLUS", tag: "int" },
      { src: "/models/showcase/plusint2.jpg", alt: "DJETRAN PLUS", tag: "int" },
    ],
  },
  {
    id: "djetran",
    name: "DJETRAN",
    tagline: {
      fr: "4×4 robuste pour la route et le tout-terrain.",
      en: "A rugged 4×4 built for the road and the off-road.",
    },
    description: {
      fr: "Turbo Diesel 2,3L, développant 163 chevaux  avec un couple 340 Nm, offran puissance et souplesse pour la route comme le tout-terrain. Cockpit intelligent, caméra 360°, contrôle électronique de stabilité et ABS + EBD. ",
      en: "2.3L Turbo Diesel delivering 163 hp with 340 Nm of torque, offering power and flexibility on the road and off it. Smart cockpit, 360° camera, electronic stability control, and ABS + EBD.",
    },
    brochureHref: "/djetranbva.pdf",
    highlights: [
      { fr: "Moteur Turbo Diesel 2.3L", en: "2.3L Turbo Diesel engine" },
      { fr: "163 ch et 340 Nm de couple", en: "163 hp and 340 Nm of torque" },
      { fr: "Transmission intégrale", en: "All-wheel drive" },
      {
        fr: "Caméra 360° et contrôle de stabilité",
        en: "360° camera and stability control",
      },
    ],
    gallery: [
      { src: "/models/showcase/djetext1.jpg", alt: "DJETRAN", tag: "ext" },
      { src: "/models/showcase/djetext2.jpg", alt: "DJETRAN", tag: "ext" },
      { src: "/models/showcase/djetext3.jpg", alt: "DJETRAN", tag: "ext" },
      { src: "/models/showcase/djetext4.jpg", alt: "DJETRAN", tag: "ext" },
      { src: "/models/showcase/djetext5.jpg", alt: "DJETRAN", tag: "ext" },
      { src: "/models/showcase/djetint1.jpg", alt: "DJETRAN", tag: "int" },
      { src: "/models/showcase/djetint2.jpg", alt: "DJETRAN", tag: "int" },
      { src: "/models/showcase/djetint3.jpg", alt: "DJETRAN", tag: "int" },
    ],
  },
  {
    id: "lathaye",
    name: "LATHAYE",
    tagline: {
      fr: "SUV fluide, moderne et performant.",
      en: "A smooth, modern, and high-performing SUV.",
    },
    description: {
      fr: "Avec un moteur 2.0T GDI Turbo compressé de 165 Kw. Transmission automatique CVT à 8 vitesses pour une vitesse maximale de 210 km/h. C'est un véritable bilide qui redéfinit la performance à chaque voyage.",
      en: "Powered by a 2.0T GDI turbocharged engine developing 165 kW. 8-speed automatic CVT transmission for a top speed of 210 km/h. A true powerhouse that redefines performance on every journey.",
    },
    brochureHref: "/lathaye.pdf",
    highlights: [
      { fr: "Moteur 2.0T GDI Turbo", en: "2.0T GDI Turbo engine" },
      { fr: "Puissance maximale de 165 kW", en: "Maximum power of 165 kW" },
      {
        fr: "Boîte automatique CVT à 8 vitesses",
        en: "8-speed automatic CVT gearbox",
      },
      { fr: "Vitesse maximale de 210 km/h", en: "Top speed of 210 km/h" },
    ],
    gallery: [
      { src: "/models/showcase/latxt1.jpg", alt: "LATHAYE", tag: "ext" },
      { src: "/models/showcase/latxt2.jpg", alt: "LATHAYE", tag: "ext" },
      { src: "/models/showcase/latxt3.jpg", alt: "LATHAYE", tag: "ext" },
      { src: "/models/showcase/latxt4.jpg", alt: "LATHAYE", tag: "ext" },
      { src: "/models/showcase/latint1.jpg", alt: "LATHAYE", tag: "int" },
      { src: "/models/showcase/latint2.jpg", alt: "LATHAYE", tag: "int" },
      { src: "/models/showcase/latint3.jpg", alt: "LATHAYE", tag: "int" },
      { src: "/models/showcase/latint4.jpg", alt: "LATHAYE", tag: "int" },
    ],
  },
];

const TAG_KEYS = ["all", "ext", "int"] as const;
type GalleryTag = (typeof TAG_KEYS)[number];

const easeLux = [0.22, 1, 0.36, 1] as const;

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
      className={`min-h-11 shrink-0 rounded-full border px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition sm:tracking-[0.18em] ${
        active
          ? "border-kp-gold/55 bg-kp-gold/15 text-kp-accent shadow-[0_0_0_1px_rgba(201,169,98,0.14)]"
          : "border-white/12 bg-white/4 text-white/65 hover:border-white/22 hover:bg-white/6 hover:text-white/80"
      }`}
    >
      {children}
    </button>
  );
}

const primaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-kp-gold/45 bg-white/95 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-950 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.65)] transition duration-300 ease-out hover:scale-[1.02] hover:border-kp-gold/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg active:scale-[0.98] sm:w-auto sm:tracking-[0.2em]";

function brochureDownloadName(href: string) {
  return href.split("/").pop() ?? "fiche-technique.pdf";
}

function PrimaryButton({
  href,
  children,
  download,
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  if (download) {
    return (
      <a href={href} download={brochureDownloadName(href)} className={primaryButtonClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={primaryButtonClassName}>
      {children}
    </Link>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {direction === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-white/14 bg-black/45 text-white/85 backdrop-blur-md transition hover:border-white/28 hover:bg-black/60 disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export default function VirtualShowroom() {
  const { tr } = useLocale();
  const reduceMotion = useReducedMotion();
  const regionId = useId();
  const tabsId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const [selectedId, setSelectedId] = useState(MODELS[0]?.id ?? "djetran");
  const [tag, setTag] = useState<GalleryTag>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);

  const tagLabel = useCallback(
    (key: GalleryTag) => {
      if (key === "ext") return tr("Extérieur", "Exterior");
      if (key === "int") return tr("Intérieur", "Interior");
      return tr("Tous", "All");
    },
    [tr]
  );

  const selected = useMemo(
    () => MODELS.find((m) => m.id === selectedId) ?? MODELS[0],
    [selectedId]
  );

  const filteredGallery = useMemo(() => {
    const base = selected?.gallery ?? [];
    const list = tag === "all" ? base : base.filter((g) => g.tag === tag);
    return list.length ? list : base;
  }, [selected, tag]);

  const safeIndex = Math.min(activeIndex, Math.max(filteredGallery.length - 1, 0));
  const active = filteredGallery[safeIndex];
  const hasMultiple = filteredGallery.length > 1;

  const goTo = useCallback(
    (delta: number) => {
      if (!filteredGallery.length) return;
      setActiveIndex((i) => (i + delta + filteredGallery.length) % filteredGallery.length);
    },
    [filteredGallery.length]
  );

  function selectModel(id: string) {
    setSelectedId(id);
    setActiveIndex(0);
    setTag("all");
  }

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (reduceMotion) return;
    if (isHoveringGallery) return;
    if (tag !== "all") return;
    if (filteredGallery.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % filteredGallery.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [filteredGallery.length, isHoveringGallery, reduceMotion, tag]);

  /** Scroll only the thumbnail strip — never scrollIntoView (moves the whole page). */
  function scrollThumbStrip(index: number, smooth: boolean) {
    const container = thumbsRef.current;
    const thumb = container?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!container || !thumb) return;
    const targetLeft =
      thumb.offsetLeft - (container.clientWidth - thumb.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth && !reduceMotion ? "smooth" : "auto",
    });
  }

  return (
    <LazyMotion features={domAnimation}>
    <section
      ref={(el) => {
        rootRef.current = el;
      }}
      aria-labelledby={regionId}
      className="relative overflow-hidden pb-6 pt-[96px] sm:pt-[110px] md:pb-10 md:pt-[132px]"
    >
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-90 h-px origin-left bg-linear-to-r from-kp-gold/0 via-kp-gold/65 to-kp-gold/0 opacity-60"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(850px_420px_at_22%_14%,rgba(201,169,98,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_70%,rgba(255,255,255,0.05),transparent_60%)]"
      />
      <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 opacity-[0.10]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-28 size-[460px] rounded-full bg-kp-gold/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-[420px] size-[520px] rounded-full bg-white/6 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <header className="mx-auto max-w-3xl text-center opacity-0-start animate-fade-up">
            <span
              className="mx-auto block h-px w-24 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent sm:w-40 md:w-52"
              aria-hidden
            />
            <p className="mt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-kp-muted sm:mt-6 sm:text-[11px] sm:tracking-[0.38em]">
              {tr("Découvrez notre", "Discover our")}
            </p>
            <h1
              id={regionId}
              className="mt-4 font-serif text-[clamp(1.85rem,6.5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-kp-accent sm:mt-5"
            >
              {tr("Showroom virtuel", "Virtual showroom")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-[15px]">
              {tr(
                "Parcourez nos modèles en images, filtrez extérieur et intérieur, et téléchargez les fiches techniques.",
                "Browse our models in pictures, filter by exterior and interior, and download the technical sheets."
              )}
            </p>
          </header>

          <div className="mt-8 opacity-0-start animate-fade-up animation-delay-100 sm:mt-10">
          <div className="sticky top-[72px] z-40 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_28px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/6 backdrop-blur-2xl sm:top-[84px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_50%_0%,rgba(201,169,98,0.12),transparent_55%)]"
            />
            <div className="relative p-3 sm:p-4 md:p-5">
              <p
                id={tabsId}
                className="px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45 sm:tracking-[0.28em]"
              >
                {tr("Modèle", "Model")}
              </p>
              <div
                role="tablist"
                aria-labelledby={tabsId}
                className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-1.5"
              >
                {MODELS.map((model) => {
                  const isActive = model.id === selectedId;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      role="tab"
                      id={`tab-${model.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${model.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectModel(model.id)}
                      onKeyDown={(e) => {
                        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                        e.preventDefault();
                        const idx = MODELS.findIndex((x) => x.id === model.id);
                        const next =
                          e.key === "ArrowRight"
                            ? MODELS[(idx + 1) % MODELS.length]
                            : MODELS[(idx - 1 + MODELS.length) % MODELS.length];
                        selectModel(next.id);
                        window.setTimeout(() => {
                          document.getElementById(`tab-${next.id}`)?.focus();
                        }, 0);
                      }}
                      className={`relative rounded-xl px-4 py-3.5 text-left transition sm:rounded-t-xl sm:py-4 ${
                        isActive
                          ? "bg-white/10 text-kp-accent ring-1 ring-kp-gold/25"
                          : "text-white/55 hover:bg-white/6 hover:text-white/85"
                      }`}
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-base font-medium tracking-[-0.02em] sm:text-lg">
                          {model.name}
                        </span>
                        {model.badge ? (
                          <span className="rounded-full border border-kp-gold/35 bg-kp-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-kp-gold">
                            {tr(model.badge.fr, model.badge.en)}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-xs text-white/45 sm:text-[13px]">
                        {tr(model.tagline.fr, model.tagline.en)}
                      </span>
                      {isActive ? (
                        <motion.span
                          aria-hidden
                          layoutId="kp-showroom-tab-underline"
                          className="absolute inset-x-3 bottom-0 hidden h-0.5 rounded-full bg-kp-gold/85 sm:block"
                          transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeLux }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          </div>

          <div
            className="mt-6 opacity-0-start animate-fade-up animation-delay-200 sm:mt-8"
            role="tabpanel"
            id={`panel-${selectedId}`}
            aria-labelledby={`tab-${selectedId}`}
          >
            <motion.div
              key={selectedId}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeLux }}
              className="grid gap-6 lg:grid-cols-12 lg:gap-8"
            >
              {/* Highlights — first on mobile for context */}
              <aside className="order-1 lg:order-2 lg:col-span-4">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/55 p-5 shadow-[0_28px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/5 backdrop-blur sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_280px_at_20%_12%,rgba(201,169,98,0.16),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_55%)]"
                  />
                  <div aria-hidden className="kp-grain pointer-events-none absolute inset-0 opacity-[0.12]" />

                  <div className="relative">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                      {tr("Points forts", "Highlights")}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent sm:text-[1.65rem]">
                      {selected?.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {selected ? tr(selected.description.fr, selected.description.en) : null}
                    </p>
                    <ul className="mt-5 space-y-3 border-t border-white/8 pt-5 text-[13px] text-white/60 sm:text-sm">
                      {(selected?.highlights ?? []).map((h) => (
                        <li key={h.fr} className="flex gap-3">
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-kp-gold/70 shadow-[0_0_12px_rgba(201,169,98,0.35)]"
                            aria-hidden
                          />
                          <span>{tr(h.fr, h.en)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                      <PrimaryButton href={selected.brochureHref} download>
                        {tr("Fiche technique", "Technical sheet")}
                      </PrimaryButton>
                      <PrimaryButton href="/service-apres-vente">
                        {tr("Prenez rendez-vous", "Book an appointment")}
                      </PrimaryButton>
                      <Link
                        href="/"
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-white/22 hover:bg-white/6 hover:text-white sm:col-span-2 lg:col-span-1"
                      >
                        {tr("Retour à l'accueil", "Back to home")}
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Gallery + hero */}
              <div className="order-2 flex flex-col gap-4 sm:gap-5 lg:order-1 lg:col-span-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                    {tr("Visuels", "Visuals")} — {selected?.name}
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-0.5 kp-hide-scrollbar">
                    {TAG_KEYS.map((t) => (
                      <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
                        {tagLabel(t)}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.95)] ring-1 ring-white/6 sm:rounded-3xl">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-white/5 via-transparent to-black/40"
                  />

                  <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-video">
                    <AnimatePresence initial={false}>
                      {active ? (
                        <motion.div
                          key={active.src}
                          className="absolute inset-0"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.4, ease: easeLux }}
                        >
                          <Image
                            src={active.src}
                            alt={active.alt}
                            fill
                            priority={safeIndex === 0 && selectedId === MODELS[0]?.id}
                            fetchPriority={
                              safeIndex === 0 && selectedId === MODELS[0]?.id
                                ? "high"
                                : "auto"
                            }
                            loading={
                              safeIndex === 0 && selectedId === MODELS[0]?.id
                                ? "eager"
                                : "lazy"
                            }
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover object-center"
                          />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center">
                          <p className="text-sm text-white/45">
                            {tr("Aucun visuel disponible.", "No visual available.")}
                          </p>
                        </div>
                      )}
                    </AnimatePresence>

                    {active?.tag ? (
                      <span className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                        {tagLabel(active.tag)}
                      </span>
                    ) : null}

                    {hasMultiple ? (
                      <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-3 sm:px-4">
                        <IconButton
                          label={tr("Image précédente", "Previous image")}
                          onClick={() => goTo(-1)}
                        >
                          <ChevronIcon direction="left" />
                        </IconButton>
                        <IconButton
                          label={tr("Image suivante", "Next image")}
                          onClick={() => goTo(1)}
                        >
                          <ChevronIcon direction="right" />
                        </IconButton>
                      </div>
                    ) : null}

                    {hasMultiple ? (
                      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md">
                        <span className="font-sans text-[10px] font-semibold tabular-nums tracking-widest text-white/70">
                          {safeIndex + 1} / {filteredGallery.length}
                        </span>
                        <div
                          className="flex gap-1.5"
                          role="tablist"
                          aria-label={tr("Miniatures", "Thumbnails")}
                        >
                          {filteredGallery.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              aria-label={`${tr("Image", "Image")} ${idx + 1}`}
                              aria-current={idx === safeIndex}
                              onClick={() => {
                                setActiveIndex(idx);
                                scrollThumbStrip(idx, true);
                              }}
                              className={`size-1.5 shrink-0 rounded-full transition-colors ${
                                idx === safeIndex
                                  ? "bg-kp-gold"
                                  : "bg-white/35 hover:bg-white/55"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="border-t border-white/10 bg-black/40 px-4 py-4 sm:px-5 sm:py-4">
                    <p className="font-serif text-lg leading-snug text-kp-accent sm:text-xl">
                      {selected ? tr(selected.tagline.fr, selected.tagline.en) : null}
                    </p>
                    <p
                      className="kp-clamp-2 mt-1 min-h-10 text-sm leading-snug text-white/55 sm:min-h-11 sm:text-[15px]"
                      aria-live="polite"
                    >
                      {active?.alt ?? "\u00a0"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-3 ring-1 ring-white/5 backdrop-blur sm:p-4">
                  <p className="px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    {tr("Galerie", "Gallery")}
                  </p>
                  <div
                    ref={thumbsRef}
                    className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain pb-1 kp-hide-scrollbar sm:gap-3"
                    onMouseEnter={() => setIsHoveringGallery(true)}
                    onMouseLeave={() => setIsHoveringGallery(false)}
                  >
                    {filteredGallery.map((g, idx) => {
                      const isActive = idx === safeIndex;
                      return (
                        <button
                          key={`${g.src}-${idx}`}
                          type="button"
                          data-thumb={idx}
                          onClick={() => {
                            setActiveIndex(idx);
                            scrollThumbStrip(idx, true);
                          }}
                          className={`relative h-[72px] w-[108px] shrink-0 snap-center overflow-hidden rounded-xl border-2 transition sm:h-[80px] sm:w-[128px] md:h-[88px] md:w-[148px] ${
                            isActive
                              ? "border-kp-gold/55"
                              : "border-transparent opacity-80 hover:border-white/22 hover:opacity-100"
                          }`}
                          aria-label={`${tr("Voir image", "View image")} ${idx + 1}`}
                          aria-current={isActive}
                        >
                          <Image
                            src={g.src}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 108px, 148px"
                            loading={isActive ? "eager" : "lazy"}
                            className="object-cover object-center"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/0 to-black/50" />
                          {g.tag ? (
                            <span className="absolute bottom-1.5 left-1.5 rounded-full border border-white/12 bg-black/55 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/70 sm:text-[9px]">
                              {tagLabel(g.tag)}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
      </div>

      <div className="mt-12 border-t border-white/6 bg-kp-bg/70 py-12 sm:mt-14 sm:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 opacity-0-start animate-fade-up animation-delay-300 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-7">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-kp-muted sm:tracking-[0.38em]">
                  {tr("Besoin d'aide ?", "Need help?")}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-[-0.02em] text-kp-accent">
                  {tr("Un conseiller vous guide", "An advisor will guide you")}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/52 sm:text-[15px]">
                  {tr(
                    "Pour une disponibilité, un conseil sur la configuration ou l'entretien, notre équipe S.A.V. peut vous orienter rapidement.",
                    "For availability, configuration advice, or maintenance, our after-sales team can guide you quickly."
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <PrimaryButton href="/service-apres-vente">
                  {tr("Contactez le S.A.V.", "Contact after-sales")}
                </PrimaryButton>
                <PrimaryButton href={selected.brochureHref} download>
                  {tr("Télécharger la fiche", "Download the sheet")}
                </PrimaryButton>
              </div>
            </div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
