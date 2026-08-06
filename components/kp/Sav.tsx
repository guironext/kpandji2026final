"use client";

import Image from "next/image";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const SAV_PHONE = "+225 07 07 20 19 92";
const SAV_TEL = "+2250707201992";
const SAV_EMAIL = "contact@kpandji.com";

const Sav = () => {
  const { tr } = useLocale();

  return (
    <section
      id="sav"
      className="relative overflow-hidden bg-kp-bg"
      aria-labelledby="sav-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(201,169,98,0.10),transparent_60%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28 xl:px-16">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 ring-1 ring-white/5 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)]">
          <div className="relative aspect-4/3 w-full">
            <Image
              src="/garage5.jpeg"
              alt={tr("Atelier KPANDJI — service après vente", "KPANDJI Workshop — after-sales service")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95">
            <span aria-hidden className="h-px w-8 bg-kp-gold/60" />
            {tr("Service après vente", "After-sales service")}
          </p>

          <h2
            id="sav-title"
            className="mt-5 font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white"
          >
            {tr(
              "Un accompagnement durable pour votre véhicule",
              "Long-term care for your vehicle",
            )}
          </h2>

          <p className="mt-5 text-pretty text-[14px] leading-relaxed text-white/55 md:text-[15px]">
            {tr(
              "Entretien, pièces d'origine et techniciens qualifiés : notre atelier en Côte d'Ivoire prend soin de votre KPANDJI pour préserver performances, sécurité et valeur dans le temps.",
              "Maintenance, genuine parts, and qualified technicians: our workshop in Côte d'Ivoire takes care of your KPANDJI to preserve performance, safety, and value over time.",
            )}
          </p>

          <ul className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-8">
            <li className="flex items-start gap-4">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[18px]"
                  aria-hidden
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {tr("Ligne S.A.V.", "After-sales line")}
                </p>
                <a
                  href={`tel:${SAV_TEL}`}
                  className="mt-1 inline-block font-sans text-[15px] text-white/90 transition hover:text-kp-gold"
                >
                  {SAV_PHONE}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[18px]"
                  aria-hidden
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {tr("E-mail", "Email")}
                </p>
                <a
                  href={`mailto:${SAV_EMAIL}?subject=Service%20apr%C3%A8s%20vente`}
                  className="mt-1 inline-block font-sans text-[15px] text-white/90 transition hover:text-kp-gold"
                >
                  {SAV_EMAIL}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-9">
            <a
              href={`tel:${SAV_TEL}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-kp-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55"
            >
              {tr("Contacter le S.A.V.", "Contact after-sales")}
            </a>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Sav;
