"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type AdminNavItem = {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  shortLabel?: string;
};

function IconInvite({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function IconInbox({ className }: { className?: string }) {
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
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Invitations",
    shortLabel: "Inviter",
    href: "/admin/invitations",
    description: "Créer et partager des liens d’accès",
    icon: <IconInvite />,
  },
  {
    label: "Validation",
    shortLabel: "Validation",
    href: "/admin/membres",
    description: "Approuver ou refuser un membre",
    icon: <IconUsers />,
  },
  {
    label: "Liste membres",
    shortLabel: "Liste",
    href: "/admin/liste-membres",
    description: "Consulter tous les membres Prestige",
    icon: <IconUsers />,
  },
  {
    label: "Envoyer un message",
    shortLabel: "Envoyer",
    href: "/admin/envoyer-message",
    description: "Contacter un membre Prestige",
    icon: <IconSend />,
  },
  {
    label: "Demandes d'essai",
    shortLabel: "Demandes",
    href: "/admin/demandes-essai",
    description: "Consulter toutes les demandes d'essai",
    icon: <IconInbox />,
  },
  {
    label: "Email Visiteurs",
    shortLabel: "Email",
    href: "/admin/email-visiteurs",
    description: "Gérer les emails des visiteurs",
    icon: <IconInbox />,
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SidebarAdminProps = {
  userEmail?: string;
};

export function SidebarAdmin({ userEmail }: SidebarAdminProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-72 xl:w-80">
      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/35 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-6 lg:flex lg:max-h-[calc(100vh-8rem)] lg:flex-col">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-kp-gold/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
          />

          <div className="relative shrink-0">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              Administration
            </p>
            <p className="mt-2 font-serif text-2xl text-white sm:text-[1.65rem]">
              Espace admin
            </p>
            <p className="mt-2 hidden font-sans text-sm leading-relaxed text-white/45 lg:block">
              Gérez les accès, les membres et la messagerie Prestige.
            </p>
          </div>

          <nav
            aria-label="Navigation administrateur"
            className="relative mt-6 grid grid-cols-2 gap-2 overflow-y-auto overscroll-y-contain sm:grid-cols-4 lg:mt-8 lg:min-h-0 lg:flex-1 lg:grid-cols-1 lg:gap-1.5"
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
            <div className="relative mt-6 hidden shrink-0 border-t border-white/8 pt-5 lg:block">
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
