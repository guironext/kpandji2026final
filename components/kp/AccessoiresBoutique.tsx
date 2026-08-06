"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { useLocale } from "@/components/providers/KpLocaleProvider";

type Copy = { fr: string; en: string };

type CategoryId = "tous" | "exterieur" | "interieur" | "packs";

type Product = {
  id: string;
  name: Copy;
  description: Copy;
  src: string;
  category: Exclude<CategoryId, "tous">;
};

const categories: { id: CategoryId; label: Copy }[] = [
  { id: "tous", label: { fr: "Tous", en: "All" } },
  { id: "exterieur", label: { fr: "Extérieur", en: "Exterior" } },
  { id: "interieur", label: { fr: "Intérieur", en: "Interior" } },
  { id: "packs", label: { fr: "Packs & visuels", en: "Packs & visuals" } },
];

const products: Product[] = [
  {
    id: "bars",
    name: { fr: "Barres de toit", en: "Roof bars" },
    description: {
      fr: "Fixations robustes pour bagages, échelles ou équipements professionnels.",
      en: "Sturdy fixings for luggage, ladders, or professional equipment.",
    },
    src: "/accessoires/bars.webp",
    category: "exterieur",
  },
  {
    id: "marche",
    name: { fr: "Marchepieds latéraux", en: "Side steps" },
    description: {
      fr: "Accès facilité à l’habitacle, finition alignée sur la ligne du véhicule.",
      en: "Easier access to the cabin, with a finish that matches the vehicle's lines.",
    },
    src: "/accessoires/marche.webp",
    category: "exterieur",
  },
  {
    id: "cache",
    name: { fr: "Caches / habillages avant", en: "Front covers / trims" },
    description: {
      fr: "Personnalisation esthétique et protection des zones exposées.",
      en: "Aesthetic customization and protection for exposed areas.",
    },
    src: "/accessoires/cache.webp",
    category: "exterieur",
  },
  {
    id: "capot",
    name: { fr: "Accessoires capot", en: "Hood accessories" },
    description: {
      fr: "Solutions dédiées à la protection et au confort d’usage au quotidien.",
      en: "Dedicated solutions for protection and everyday comfort of use.",
    },
    src: "/accessoires/capot.webp",
    category: "exterieur",
  },
  {
    id: "pare",
    name: { fr: "Protections latérales", en: "Side protections" },
    description: {
      fr: "Barres ou protections pour limiter les impacts sur carrosserie.",
      en: "Bars or guards to limit impacts on the bodywork.",
    },
    src: "/accessoires/pare.webp",
    category: "exterieur",
  },
  {
    id: "housses",
    name: { fr: "Housses de siège", en: "Seat covers" },
    description: {
      fr: "Textiles résistants, coupe adaptée aux sièges KPANDJI.",
      en: "Durable fabrics, cut to fit KPANDJI seats.",
    },
    src: "/accessoires/housses.webp",
    category: "interieur",
  },
  {
    id: "sitcover",
    name: { fr: "Protection de siège", en: "Seat protector" },
    description: {
      fr: "Couvre-siège pratique pour usage intensif ou conditions difficiles.",
      en: "Practical seat cover for heavy-duty use or harsh conditions.",
    },
    src: "/accessoires/sitcover.webp",
    category: "interieur",
  },
  {
    id: "visuel-1",
    name: { fr: "Gamme accessoires — vue 1", en: "Accessory range — view 1" },
    description: {
      fr: "Aperçu de nos finitions ; compatibilité selon modèle et millésime.",
      en: "Overview of our finishes; compatibility depends on model and year.",
    },
    src: "/accessoires/images.jpg",
    category: "packs",
  },
  {
    id: "visuel-2",
    name: { fr: "Gamme accessoires — vue 2", en: "Accessory range — view 2" },
    description: {
      fr: "Ensemble coordonné extérieur / intérieur sur demande.",
      en: "Coordinated exterior / interior set available on request.",
    },
    src: "/accessoires/images%20(1).jpg",
    category: "packs",
  },
  {
    id: "visuel-3",
    name: { fr: "Gamme accessoires — vue 3", en: "Accessory range — view 3" },
    description: {
      fr: "Devis personnalisé selon votre usage : pro, famille, terrain.",
      en: "Personalized quote based on your use: professional, family, off-road.",
    },
    src: "/accessoires/images%20(2).jpg",
    category: "packs",
  },
  {
    id: "visuel-4",
    name: { fr: "Gamme accessoires — vue 4", en: "Accessory range — view 4" },
    description: {
      fr: "Contactez-nous pour une recommandation par modèle.",
      en: "Contact us for a recommendation by model.",
    },
    src: "/accessoires/images%20(3).jpg",
    category: "packs",
  },
  {
    id: "visuel-5",
    name: { fr: "Gamme accessoires — vue 5", en: "Accessory range — view 5" },
    description: {
      fr: "Stock et délais communiqués à la commande.",
      en: "Stock and lead times provided at the time of order.",
    },
    src: "/accessoires/images%20(4).jpg",
    category: "packs",
  },
];

function orderMailto(productName: string, locale: "fr" | "en") {
  const subject = encodeURIComponent(
    locale === "en" ? `Accessory order — ${productName}` : `Commande accessoire — ${productName}`
  );
  const body = encodeURIComponent(
    locale === "en"
      ? `Hello,\n\nI would like to order or get a quote for:\n• ${productName}\n\nVehicle model:\nYear / trim:\nQuantity:\nCity / delivery:\nPhone:\n\nThank you.`
      : `Bonjour,\n\nJe souhaite commander ou obtenir un devis pour :\n• ${productName}\n\nModèle de véhicule :\nAnnée / finition :\nQuantité :\nVille / livraison :\nTéléphone :\n\nMerci.`
  );
  return `mailto:contact@kpandji.com?subject=${subject}&body=${body}`;
}

const pillBase =
  "rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg";
const pillIdle =
  "border-white/12 bg-white/[0.03] text-white/55 hover:border-white/18 hover:text-white/80";
const pillActive =
  "border-kp-gold/45 bg-kp-gold/10 text-white shadow-[0_0_0_1px_rgba(201,169,98,0.12)]";

export function AccessoiresBoutique() {
  const { tr, locale } = useLocale();
  const [filter, setFilter] = useState<CategoryId>("tous");

  const visible = useMemo(
    () =>
      filter === "tous"
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <div className="relative">
      <section className="mx-auto max-w-[1600px] px-5 pt-8 pb-14 md:px-10 md:pt-10 md:pb-20">
        <header className="relative isolate overflow-hidden border-b border-white/6 pb-12 md:pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-32 h-[min(100%,28rem)] w-[min(100%,28rem)] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(201,169,98,0.11),transparent_62%)] blur-2xl md:-right-16"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[12%] hidden h-[72%] w-px bg-linear-to-b from-transparent via-kp-gold/30 to-transparent md:block md:left-1"
          />
          <Reveal>
            <div className="relative md:pl-7 lg:pl-10">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span
                  aria-hidden
                  className="hidden h-px w-10 shrink-0 bg-linear-to-r from-transparent to-kp-gold/70 sm:block md:w-14"
                />
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rotate-45 rounded-[2px] bg-kp-gold/85 shadow-[0_0_12px_rgba(201,169,98,0.35)]"
                />
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.36em] text-kp-gold">
                  {tr("Boutique en ligne", "Online store")}
                </p>
                <span
                  aria-hidden
                  className="h-px min-w-10 flex-1 max-w-24 bg-linear-to-r from-kp-gold/45 to-transparent sm:max-w-40"
                />
              </div>

              <h1 className="mt-8 max-w-[16rem] font-serif text-[clamp(2.1rem,5.4vw,3.45rem)] font-medium leading-[1.04] tracking-[-0.038em] text-white sm:max-w-none md:mt-10">
                <span className="block">
                  {tr("Accessoires", "Accessories")}{" "}
                  <em className="not-italic text-kp-gold">
                    {tr("d’origine", "original")}
                  </em>
                </span>
                <span className="mt-1.5 block font-serif text-[clamp(1.2rem,2.8vw,1.85rem)] font-normal leading-tight tracking-[-0.02em] text-white/72">
                  <span className="text-kp-gold/90">&</span>{" "}
                  {tr("équipements", "equipment")}
                </span>
              </h1>

              <p className="mt-8 max-w-xl border-l-2 border-kp-gold/28 pl-5 font-sans text-[15px] leading-[1.75] text-kp-muted md:mt-10 md:max-w-2xl md:pl-6 md:text-[17px] md:leading-[1.72]">
                {tr(
                  "Choisissez votre accessoire, puis envoyez une demande en un clic : notre équipe vous répond avec",
                  "Choose your accessory, then send a request in one click: our team responds with"
                )}{" "}
                <span className="text-kp-silver/95">{tr("prix", "price")}</span>,{" "}
                <span className="text-kp-silver/95">
                  {tr("disponibilité", "availability")}
                </span>{" "}
                {tr("et", "and")}{" "}
                <span className="text-kp-silver/95">
                  {tr("options de livraison ou de pose", "delivery or fitting options")}
                </span>
                .
              </p>

              <ul className="mt-9 flex list-none flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/6 pt-8 font-sans text-[11px] uppercase tracking-[0.22em] text-white/42 md:gap-x-10 md:text-[10px] md:tracking-[0.26em]">
                <li className="flex items-center gap-2.5">
                  <span
                    className="size-1 shrink-0 rounded-full bg-kp-gold/75 shadow-[0_0_10px_rgba(201,169,98,0.4)]"
                    aria-hidden
                  />
                  {tr("Pièces & accessoires KPANDJI", "KPANDJI parts & accessories")}
                </li>
                <li className="flex items-center gap-2.5 sm:border-l sm:border-white/12 sm:pl-10">
                  <span
                    className="size-1 shrink-0 rounded-full bg-kp-gold/75 shadow-[0_0_10px_rgba(201,169,98,0.4)]"
                    aria-hidden
                  />
                  {tr("Devis par e-mail", "Quotes by email")}
                </li>
                <li className="flex items-center gap-2.5 md:border-l md:border-white/12 md:pl-10">
                  <span
                    className="size-1 shrink-0 rounded-full bg-kp-gold/75 shadow-[0_0_10px_rgba(201,169,98,0.4)]"
                    aria-hidden
                  />
                  {tr("Conseil par modèle", "Advice by model")}
                </li>
              </ul>
            </div>
          </Reveal>
        </header>

        <Reveal delayMs={80} className="mt-10 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`${pillBase} ${filter === c.id ? pillActive : pillIdle}`}
            >
              {tr(c.label.fr, c.label.en)}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((p, i) => {
            const name = tr(p.name.fr, p.name.en);
            return (
              <Reveal key={p.id} delayMs={Math.min(40 + i * 45, 220)}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-kp-elevated/30 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm transition duration-300 hover:border-kp-gold/25 hover:bg-kp-elevated/45">
                  <div className="relative aspect-4/3 overflow-hidden bg-kp-surface">
                    <Image
                      src={p.src}
                      alt={name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-kp-bg/80 via-transparent to-transparent opacity-90"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h2 className="font-serif text-xl font-medium tracking-[-0.02em] text-white md:text-[1.35rem]">
                      {name}
                    </h2>
                    <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-kp-muted">
                      {tr(p.description.fr, p.description.en)}
                    </p>
                    <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-kp-gold/90">
                      {tr("Prix sur devis", "Price on request")}
                    </p>
                    <a
                      href={orderMailto(name, locale)}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-kp-gold/35 bg-linear-to-br from-kp-gold/12 to-transparent px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:border-kp-gold/55 hover:from-kp-gold/22 hover:shadow-[0_0_0_1px_rgba(201,169,98,0.1),0_18px_44px_-22px_rgba(201,169,98,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50"
                    >
                      {tr("Commander / devis", "Order / quote")}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-kp-muted">
            {tr(
              "Aucun accessoire dans cette catégorie pour le moment.",
              "No accessories in this category at the moment."
            )}
          </p>
        ) : null}

        <Reveal delayMs={100} className="mt-16 rounded-2xl border border-white/[0.07] bg-kp-surface/40 p-8 md:p-10">
          <h3 className="font-serif text-xl font-medium text-white md:text-2xl">
            {tr("Modalités", "Terms")}
          </h3>
          <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-kp-muted md:text-[15px]">
            <li>
              {tr(
                "Les tarifs sont communiqués sur devis selon modèle, disponibilité stock et options.",
                "Prices are provided on request based on model, stock availability, and options."
              )}
            </li>
            <li>
              {tr(
                "Retrait au showroom ou expédition : précisez votre ville dans le message pour une proposition adaptée.",
                "Showroom pickup or shipping: mention your city in your message so we can tailor the offer."
              )}
            </li>
            <li>
              {tr(
                "Pour toute question, vous pouvez aussi écrire depuis le pied de page du site (section Contact).",
                "For any question, you can also write to us from the site footer (Contact section)."
              )}
            </li>
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
