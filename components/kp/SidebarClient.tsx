"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ClientNavItem = {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  shortLabel?: string;
};

function IconOpportunity({ className }: { className?: string }) {
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
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconSubscription({ className }: { className?: string }) {
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
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function IconPayment({ className }: { className?: string }) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconMessage({ className }: { className?: string }) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const NAV_ITEMS: ClientNavItem[] = [
  {
    label: "Opportunité",
    shortLabel: "Opport.",
    href: "/client-prestige/opportunite",
    description: "Découvrez les offres et projets disponibles",
    icon: <IconOpportunity />,
  },
  {
    label: "Souscription",
    shortLabel: "Souscrip.",
    href: "/client-prestige/souscription",
    description: "Gérez votre adhésion au programme Prestige",
    icon: <IconSubscription />,
  },
  {
    label: "Versement",
    shortLabel: "Versement",
    href: "/client-prestige/versement",
    description: "Suivez vos paiements et reversements",
    icon: <IconPayment />,
  },
  {
    label: "Message",
    shortLabel: "Message",
    href: "/client-prestige/message",
    description: "Échangez avec l’équipe KPANDJI",
    icon: <IconMessage />,
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SidebarClientProps = {
  userEmail?: string;
};

export function SidebarClient({ userEmail }: SidebarClientProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-72 xl:w-80">
      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/35 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-kp-gold/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
          />

          <div className="relative">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              Espace Prestige
            </p>
            <p className="mt-2 font-serif text-2xl text-white sm:text-[1.65rem]">
              Mon espace client
            </p>
            <p className="mt-2 hidden font-sans text-sm leading-relaxed text-white/45 lg:block">
              Accédez à vos opportunités, souscriptions, versements et messages.
            </p>
          </div>

          <nav
            aria-label="Navigation espace client"
            className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-8 lg:grid-cols-1 lg:gap-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex min-h-[72px] flex-col justify-center rounded-xl border px-3 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 lg:min-h-0 lg:flex-row lg:items-start lg:gap-3 lg:px-4 lg:py-3.5 ${
                    active
                      ? "border-kp-gold/35 bg-kp-gold/10 shadow-[inset_3px_0_0_rgba(201,169,98,0.75)] lg:shadow-[inset_3px_0_0_rgba(201,169,98,0.75)]"
                      : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 lg:mt-0.5 ${
                      active
                        ? "border-kp-gold/30 bg-kp-gold/15 text-kp-gold"
                        : "border-white/10 bg-white/5 text-white/55 group-hover:border-white/20 group-hover:text-white/80"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em] ${
                        active
                          ? "text-kp-gold"
                          : "text-white/85 group-hover:text-white"
                      }`}
                    >
                      <span className="lg:hidden">{item.shortLabel ?? item.label}</span>
                      <span className="hidden lg:inline">{item.label}</span>
                    </span>
                    <span className="mt-1 hidden font-sans text-xs leading-snug text-white/45 lg:block">
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {userEmail && (
            <div className="relative mt-6 hidden border-t border-white/8 pt-5 lg:block">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Session
              </p>
              <p className="mt-2 truncate font-sans text-sm text-white/70">{userEmail}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
