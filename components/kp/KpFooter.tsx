import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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

function IconArrowUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function IconFile({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-10 shrink-0 bg-linear-to-r from-kp-gold/80 to-kp-gold/20"
        aria-hidden
      />
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
        {children}
      </p>
    </div>
  );
}

const panelClass =
  "flex flex-col rounded-2xl border border-white/6 bg-kp-elevated/25 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/9 hover:bg-kp-elevated/35 md:p-8";

const footerLinkClass =
  "group inline-flex w-full items-center gap-2.5 rounded-lg py-2 -mx-1 px-1 text-sm text-white/60 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-elevated";

const contactLineClass =
  "group flex items-start gap-2.5 text-sm text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-elevated";

const iconWrapClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-kp-gold/20 bg-kp-gold/8 text-kp-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:border-kp-gold/35 group-hover:bg-kp-gold/12";

const PHONE_CONTACTS = [
  {
    role: "Contact fixe",
    display: "+225 27 23 27 95 67",
    tel: "+2252723279567",
  },
  {
    role: "Marketing",
    display: "+225 07 07 20 22 11",
    tel: "+2250707202211",
  },
  {
    role: "S.A.V",
    display: "+225 07 07 20 19 92",
    tel: "+2250707201992",
  },
  {
    role: "Commercial",
    display: "+225 07 07 20 22 11",
    tel: "+2250707202211",
  },
] as const;

const RESOURCE_LINKS = [
  ["Fiche technique", "/fiche_djetran.pdf"],
  ["Brochure", "/Lathaye.pdf"],
] as const;

export function KpFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.07] bg-kp-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-kp-surface"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_520px_at_8%_-10%,rgba(201,169,98,0.11),transparent_58%),radial-gradient(820px_480px_at_92%_110%,rgba(255,255,255,0.04),transparent_52%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]"
      />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent" />

      <div className="mx-auto max-w-[1600px] px-5 pt-16 pb-12 md:px-10 md:pt-20 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16 xl:gap-20">
          {/* Brand column */}
          <Reveal className="relative min-w-0 lg:row-span-2">
            <div
              aria-hidden
              className="absolute -left-5 top-0 bottom-0 w-px bg-linear-to-b from-kp-gold/50 via-white/10 to-transparent md:-left-6"
            />
            <div className="flex h-full flex-col rounded-2xl border border-white/6 bg-kp-elevated/40 p-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-md md:p-10">
              <Link
                href="/#accueil"
                className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-elevated"
              >
                <Image
                  src="/logo.png"
                  alt="KPANDJI AUTOMOBILES"
                  width={200}
                  height={58}
                  className="h-11 w-auto opacity-95 md:h-[52px]"
                />
              </Link>
              <p className="mt-3 font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-kp-gold">
                Constructeur automobile
              </p>
              <p className="mt-8 font-serif text-2xl font-medium leading-[1.2] tracking-[-0.02em] text-white md:text-[1.75rem]">
                Ingénierie, qualité et une signature ancrée en Afrique.
              </p>
              <p className="mt-5 font-sans text-[15px] leading-relaxed text-kp-muted">
                Conception, assemblage et commercialisation de véhicules pensés
                pour l&apos;exigence du terrain et du quotidien.
              </p>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/6 bg-black/20 px-4 py-3.5">
                <span className={iconWrapClass}>
                  <IconPin className="h-[15px] w-[15px]" />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-kp-gold/75">
                    Siège
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-white/75">
                    Côte d&apos;Ivoire, Abidjan Cocody palmeraie, carrefour Cabine Bleue
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-kp-gold/35 bg-linear-to-br from-kp-gold/15 to-transparent px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-kp-gold/55 hover:from-kp-gold/25 hover:shadow-[0_0_0_1px_rgba(201,169,98,0.12),0_20px_50px_-24px_rgba(201,169,98,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 sm:w-auto"
                >
                  Écrire au constructeur
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right column — Ressources & Contact */}
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:col-start-2 lg:row-start-1 lg:items-start">
            <Reveal delayMs={40} className={`${panelClass} w-full min-w-0`}>
              <SectionLabel>Ressources</SectionLabel>
              <ul className="mt-8 space-y-1">
                {RESOURCE_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={footerLinkClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconFile className="shrink-0 text-kp-gold/75" />
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        {label}
                        <IconExternal className="ml-auto shrink-0 text-white/25 transition-colors group-hover:text-kp-gold/70" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8" aria-hidden>
                <div className="h-px bg-linear-to-r from-kp-gold/30 via-white/8 to-transparent" />
                <p className="mt-5 font-sans text-[12px] leading-relaxed text-white/32">
                  Documents officiels — téléchargement direct.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80} className={`${panelClass} w-full min-w-0`}>
              <SectionLabel>Contact</SectionLabel>
              <address className="mt-8 not-italic">
                <ul className="space-y-5" role="list">
                  {PHONE_CONTACTS.map(({ role, display, tel }) => (
                    <li key={role}>
                      <a href={`tel:${tel}`} className={contactLineClass}>
                        <IconPhone className="mt-0.5 shrink-0 text-kp-gold/75" />
                        <span>
                          <span>{role}</span>
                          <span className="text-white/35"> : </span>
                          <span className="tabular-nums tracking-wide">
                            {display}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="mailto:contact@kpandji.com"
                      className={contactLineClass}
                    >
                      <IconMail className="mt-0.5 shrink-0 text-kp-gold/75" />
                      <span>
                        <span>Courriel</span>
                        <span className="text-white/35"> : </span>
                        <span className="break-all">contact@kpandji.com</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </address>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/6 bg-black/35">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-9">
          <p className="max-w-xl font-sans text-[12px] leading-relaxed text-white/38">
            © {new Date().getFullYear()} KPANDJI AUTOMOBILES. Tous droits réservés.
          </p>
          <a
            href="#accueil"
            className="group inline-flex items-center gap-2.5 self-start rounded-full border border-white/10 bg-white/3 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 transition-all duration-300 hover:border-kp-gold/30 hover:bg-kp-gold/10 hover:text-kp-gold md:self-auto"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/4 transition-colors group-hover:border-kp-gold/25 group-hover:bg-kp-gold/15">
              <IconArrowUp className="text-kp-gold/70 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
            Haut de page
          </a>
        </div>
      </div>
    </footer>
  );
}
