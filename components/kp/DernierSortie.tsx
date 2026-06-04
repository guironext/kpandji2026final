"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const MODELS = [
  {
    id: "djetranplus",
    name: "DJETRAN PLUS",
    tagline: "Dominez la route avec une allure magistrale.",
    description:
      "Cette pick-up robuste, allie la force brute à l'élégance pure. Le véritable outil de distinction pour les bâtisseurs de demain.",
    image: "/derniers/djetranplus.png",
    href: "/modeles/djetranplus",
  },
  {
    id: "djetran",
    name: "DJETRAN",
    tagline: "Pick-up conquérant, robuste et élégant.",
    description:
      "Pick-up conquérant, robuste et élégant. L'outil de travail infatigable des entrepreneurs et des bâtisseurs de la nation.",
    image: "/derniers/djetran.png",
    href: "/modeles/djetran",
  },

  
  {
    id: "lathaye",
    name: "LATHAYE",
    tagline: "SUV, mariant puissance et confort premium.",
    description:
      "SUV de direction de 221 ch, une véritable bolide qui redéfinit la performance à chaque voyage.",
    image: "/derniers/lathaye.png",
    href: "/modeles/lathaye",
  },
  
];

function ModelCard({
  item,
  index,
}: {
  item: (typeof MODELS)[number];
  index: number;
}) {
  // On many viewports, one of these cards becomes the LCP element.
  // Prioritize the first row to improve perceived load without eager-loading everything.
  const isAboveTheFold = index < 3;
  const reduceMotion = useReducedMotion() === true;

  return (
    <Reveal
      delayMs={index * 60}
      className="w-full max-w-[520px] md:max-w-[560px] lg:max-w-[480px]"
    >
      <motion.article
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -6,
                scale: 1.008,
              }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.992 }}
        transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.65 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-kp-gold/55 bg-zinc-200 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(201,169,98,0.12)_inset] md:rounded-3xl"
      >
        <div className="relative aspect-3/4 w-full shrink-0 overflow-hidden bg-zinc-300">
          <Image
            src={item.image}
            alt={`${item.name} — ${item.tagline}`}
            fill
            sizes="(max-width:768px) 88vw, 460px"
            className="object-contain object-center p-2 transition duration-700 ease-out group-hover:scale-[1.02] sm:p-3"
            priority={isAboveTheFold}
            loading={isAboveTheFold ? "eager" : "lazy"}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_380px_at_50%_35%,rgba(201,169,98,0.1),transparent_65%)]" />
          <div className="kp-grain pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-40 bg-linear-to-t from-black/82 via-black/45 to-transparent md:h-44"
            aria-hidden
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 45%, transparent 60%)",
              transform: "translateX(-130%) skewX(-12deg)",
              animation: reduceMotion ? undefined : "kp-light-sweep 1.65s ease both",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-5 pt-8 text-center md:pb-6 md:pt-10">
           
            <h3 className="mt-2 font-serif text-[clamp(1.75rem,6vw,2.75rem)] font-medium leading-none tracking-[-0.03em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.65)] md:text-[clamp(2rem,3.5vw,3rem)]">
              {item.name}
            </h3>
            <p className="kp-clamp-2 font-thin pt-2.5 text-[8px] uppercase tracking-[0.32em] text-white/75 md:text-[10px] italic">
              {item.tagline}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col border-t border-kp-gold/25 bg-zinc-200 px-5 py-6 md:px-7 md:py-8">
          <p className="kp-clamp-3 text-center font-sans text-sm leading-relaxed text-zinc-700 md:text-[15px]">
            {item.description}
          </p>
          <Link
            href={item.href}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-zinc-800/15 bg-white px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-sm transition duration-300 ease-out hover:border-kp-gold/70 hover:bg-zinc-50 focus-visible:shadow-[0_0_0_2px_rgba(201,169,98,0.55)] active:scale-[0.99] motion-reduce:transition-none md:mt-7 md:text-[12px]"
            aria-label={`Voir plus sur ${item.name}`}
          >
            Découvrir
          </Link>
        </div>

        <Link
          href={item.href}
          aria-label={`Ouvrir la page ${item.name}`}
          className="absolute inset-0 z-20 rounded-2xl md:rounded-3xl"
        />
      </motion.article>
    </Reveal>
  );
}

export default function DernierSortie() {
  return (
    <section
      aria-labelledby="derniere-sortie-heading"
      id="vehicules"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/6 bg-kp-bg py-12 md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_16%,rgba(201,169,98,0.10),transparent_62%),radial-gradient(900px_520px_at_84%_65%,rgba(255,255,255,0.05),transparent_62%)]"
      />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <div className="flex flex-col items-center">
              <span
                className="h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-52"
                aria-hidden
              />
              <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.38em] text-kp-muted">
                Dernières sorties
              </p>
              <h2
                id="derniere-sortie-heading"
                className="mt-5 font-serif text-[clamp(1.875rem,4.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-kp-accent"
              >
                Nos derniers modèles
              </h2>
              <p className="mt-4 text-balance font-sans text-sm leading-relaxed text-kp-muted md:text-[15px]">
                Une sélection premium, pensée pour la route, le travail et la
                distinction — découvrez les véhicules qui incarnent l’ADN KPANDJI.
              </p>
            </div>
          </header>
        </Reveal>
      </div>

      <div className="relative mt-10 md:mt-12">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 justify-items-center gap-6 px-5 pb-2 sm:grid-cols-2 md:gap-7 md:px-10 lg:grid-cols-3">
          {MODELS.map((item, index) => (
            <ModelCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
