"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/kp/Reveal";
import { useLocale } from "@/components/providers/KpLocaleProvider";

type Opportunity = {
  id: string;
  brand: string;
  name: string;
  nameGradient: string;
  eyebrow: { fr: string; en: string };
  description: { fr: string; en: string };
  image: string;
  imagePosition: string;
  imageAlt: { fr: string; en: string };
  href: string;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "sira",
    brand: "Kpandji",
    name: "Sira",
    nameGradient: "from-[#CD7F32] via-kp-gold to-[#E8D5A3]",
    eyebrow: {
      fr: "Flottes & institutions",
      en: "Fleets & institutions",
    },
    description: {
      fr: "Destiné à ceux qui désirent acquérir une flotte de véhicules KPANDJI. Un partenariat sur mesure, des tarifs préférentiels et un accompagnement complet de la conception à la livraison.",
      en: "For those who wish to acquire a KPANDJI vehicle fleet. A tailored partnership, preferential rates, and full support from design to delivery.",
    },
    image: "/models/para/pic2.jpg",
    imagePosition: "object-[52%_38%]",
    imageAlt: {
      fr: "Kpandji Sira — offre flotte institutionnelle",
      en: "Kpandji Sira — institutional fleet offer",
    },
    href: "/sira",
  },
  {
    id: "privilege",
    brand: "Kpandji",
    name: "Privilège",
    nameGradient: "from-white via-amber-100/95 to-kp-gold",
    eyebrow: {
      fr: "Diaspora & particuliers",
      en: "Diaspora & individuals",
    },
    description: {
      fr: "Acquérez votre véhicule neuf en toute sérénité, où que vous soyez. Vous vivez à l’étranger (Diaspora) ou en Côte d’Ivoire ? Kpandji Automobiles facilite votre accès à l’automobile de luxe. Profitez d’un service sur mesure pour acquérir un véhicule robuste et élégant, conçu pour nos routes.",
      en: "Acquire your new vehicle with complete peace of mind, wherever you are. Living abroad (Diaspora) or in Côte d’Ivoire? Kpandji Automobiles makes luxury mobility accessible. Enjoy a tailored service to acquire a robust, elegant vehicle built for our roads.",
    },
    image: "/derniers/djetran.jpeg",
    imagePosition: "object-[50%_42%]",
    imageAlt: {
      fr: "Kpandji Privilège — offre diaspora et particuliers",
      en: "Kpandji Privilège — diaspora and individual offer",
    },
    href: "/privilege",
  },
];

function OpportunityCard({
  item,
  index,
}: {
  item: Opportunity;
  index: number;
}) {
  const { tr } = useLocale();
  const reduceMotion = useReducedMotion() === true;
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <Reveal delayMs={index * 90} distance="lg" className="h-full">
      <motion.article
        whileHover={
          reduceMotion
            ? undefined
            : { y: -8, scale: 1.01 }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.65 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-kp-elevated/35 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-kp-gold/35 hover:shadow-[0_36px_100px_-36px_rgba(201,169,98,0.28)] md:rounded-3xl"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[16/11]">
          <Image
            src={item.image}
            alt={tr(item.imageAlt.fr, item.imageAlt.en)}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover ${item.imagePosition} transition duration-700 ease-out group-hover:scale-[1.05]`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-kp-elevated via-transparent to-black/25"
          />
          <div
            aria-hidden
            className="kp-grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.12) 45%, transparent 60%)",
              transform: "translateX(-130%) skewX(-12deg)",
              animation: reduceMotion ? undefined : "kp-light-sweep 1.65s ease both",
            }}
          />

          <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
              {indexLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex flex-1 flex-col border-t border-white/8 px-5 py-6 sm:px-7 sm:py-8">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-kp-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
            {tr(item.eyebrow.fr, item.eyebrow.en)}
          </p>

          <h2 className="mt-3 font-serif text-[clamp(1.85rem,4vw,2.65rem)] font-medium leading-[1.05] tracking-[-0.025em] text-white">
            <span className="block text-white/90">{item.brand}</span>
            <span
              className={`block bg-linear-to-r ${item.nameGradient} bg-clip-text text-transparent`}
            >
              {item.name}
            </span>
          </h2>

          <p className="mt-4 flex-1 text-pretty font-sans text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
            {tr(item.description.fr, item.description.en)}
          </p>

          <span className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-kp-gold px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_36px_-14px_rgba(201,169,98,0.55)] transition duration-300 group-hover:bg-[#d4b56e] sm:mt-8 sm:text-[12px]">
            {tr("Voir Plus", "See more")}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <Link
          href={item.href}
          aria-label={tr(
            `Voir plus sur ${item.brand} ${item.name}`,
            `See more about ${item.brand} ${item.name}`
          )}
          className="absolute inset-0 z-20 rounded-2xl md:rounded-3xl"
        />
      </motion.article>
    </Reveal>
  );
}

export function OpportunitiesPageContent() {
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
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_20%_0%,rgba(201,169,98,0.14),transparent_55%),radial-gradient(800px_420px_at_85%_40%,rgba(255,255,255,0.05),transparent_50%)]"
        />
        <div
          aria-hidden
          className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.1] mix-blend-overlay"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/55 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10 md:px-10 lg:pb-28 lg:pt-12">
          <Reveal from="bottom">
            <header className="mx-auto max-w-2xl text-center">
              <span
                className="mx-auto block h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent sm:w-40"
                aria-hidden
              />
              <p className="mt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40">
                {tr("Programmes exclusifs", "Exclusive programs")}
              </p>
              <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.025em] text-kp-accent">
                {tr("Nos opportunités", "Our opportunities")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty font-sans text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                {tr(
                  "Deux parcours pensés pour vos ambitions — flottes institutionnelles ou acquisition individuelle.",
                  "Two paths designed for your ambitions — institutional fleets or individual acquisition."
                )}
              </p>
            </header>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:mt-14 sm:gap-7 md:mt-16 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            {OPPORTUNITIES.map((item, index) => (
              <OpportunityCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
