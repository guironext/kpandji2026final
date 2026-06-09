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

type AdminNavSection = {
  title: string;
  items: AdminNavItem[];
};

type IconProps = { className?: string };

function IconInvite({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function IconUserCheck({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m16 11 2 2 4-4" />
    </svg>
  );
}

function IconList({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}

function IconSend({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function IconCar({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 5H10.3a2 2 0 0 0-1.6.9L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function IconMail({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconWrench({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconCrown({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 19h20" />
      <path d="M4 15l2-8 4 4 2-6 2 6 4-4 2 8" />
    </svg>
  );
}

function IconArrowLeft({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

const NAV_SECTIONS: AdminNavSection[] = [
  {
    title: "Membres",
    items: [
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
        icon: <IconUserCheck />,
      },
      {
        label: "Liste membres",
        shortLabel: "Liste",
        href: "/admin/liste-membres",
        description: "Consulter tous les membres Prestige",
        icon: <IconList />,
      },
    ],
  },
  {
    title: "Messagerie",
    items: [
      {
        label: "Message Reçus ",
        shortLabel: "Message Reçus",
        href: "/admin/message-recus",
        description: "Consulter tous les messages reçus",
        icon: <IconList />,
      },
      {
        label: "Envoyer un message",
        shortLabel: "Envoyer",
        href: "/admin/envoyer-message",
        description: "Contacter un membre Prestige",
        icon: <IconSend />,
      },
    ],
  },
  {
    title: "Demandes publiques",
    items: [
      {
        label: "Demandes d'essai",
        shortLabel: "Essais",
        href: "/admin/demandes-essai",
        description: "Consulter toutes les demandes d'essai",
        icon: <IconCar />,
      },
      {
        label: "E-mails visiteurs",
        shortLabel: "E-mails",
        href: "/admin/email-visiteurs",
        description: "Gérer les e-mails des visiteurs",
        icon: <IconMail />,
      },
      {
        label: "Écrire au SAV",
        shortLabel: "SAV",
        href: "/admin/ecrire-au-sav",
        description: "Demandes S.A.V. du site public",
        icon: <IconWrench />,
      },
      {
        label: "Message Privilégié",
        shortLabel: "Privilège",
        href: "/admin/privilege-contact",
        description: "Gérer les contacts privilégiés",
        icon: <IconCrown />,
      },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function userInitial(email: string) {
  const local = email.split("@")[0]?.trim();
  if (!local) return "A";
  return local.charAt(0).toUpperCase();
}

function AdminNavLink({
  item,
  active,
  compact,
}: {
  item: AdminNavItem;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 ${
        active
          ? "bg-linear-to-r from-kp-gold/14 to-kp-gold/5 text-kp-gold shadow-[inset_3px_0_0_rgba(201,169,98,0.85)]"
          : "text-white/68 hover:bg-white/4 hover:text-white"
      } ${compact ? "min-w-[132px] shrink-0 snap-start" : ""}`}
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
          active
            ? "border-kp-gold/35 bg-kp-gold/18 text-kp-gold shadow-[0_0_20px_-6px_rgba(201,169,98,0.55)]"
            : "border-white/10 bg-white/4 text-white/50 group-hover:border-white/18 group-hover:bg-white/6 group-hover:text-white/82"
        }`}
      >
        {item.icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
            active ? "text-kp-gold" : "text-inherit"
          }`}
        >
          {compact ? (item.shortLabel ?? item.label) : item.label}
        </span>
        {!compact && (
          <span className="mt-0.5 hidden font-sans text-xs leading-snug text-white/42 lg:block">
            {item.description}
          </span>
        )}
      </span>

      {!compact && (
        <span
          className={`hidden shrink-0 transition-all duration-300 lg:block ${
            active
              ? "translate-x-0 text-kp-gold/70 opacity-100"
              : "translate-x-1 text-white/25 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
          aria-hidden
        >
          ›
        </span>
      )}
    </Link>
  );
}

type SidebarAdminProps = {
  userEmail?: string;
};

export function SidebarAdmin({ userEmail }: SidebarAdminProps) {
  const pathname = usePathname();
  const allItems = NAV_SECTIONS.flatMap((section) => section.items);

  return (
    <aside className="w-full shrink-0 lg:w-72 xl:w-80">
      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/40 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:flex lg:max-h-[calc(100vh-8rem)] lg:flex-col">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-kp-gold/12 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 size-40 rounded-full bg-white/4 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent" />

          <div className="relative border-b border-white/6 px-5 py-5 sm:px-6 sm:py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-kp-gold/25 bg-kp-gold/8 px-3 py-1">
              <span className="size-1.5 rounded-full bg-kp-gold shadow-[0_0_8px_rgba(201,169,98,0.8)]" />
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-kp-gold/90">
                Administration
              </span>
            </div>
            <p className="mt-4 font-serif text-[1.75rem] leading-tight text-white sm:text-[1.85rem]">
              Espace admin
            </p>
            <p className="mt-2 max-w-[26ch] font-sans text-sm leading-relaxed text-white/45">
              Accès, membres et messagerie Prestige — tout en un seul endroit.
            </p>
          </div>

          <nav
            aria-label="Navigation administrateur"
            className="relative min-h-0 lg:flex lg:flex-1 lg:flex-col"
          >
            <div className="flex gap-2 overflow-x-auto px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {allItems.map((item) => (
                <AdminNavLink
                  key={item.href}
                  item={item}
                  active={isActive(pathname, item.href)}
                  compact
                />
              ))}
            </div>

            <div className="hidden max-h-[min(420px,58dvh)] min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 [-webkit-overflow-scrolling:touch] lg:block lg:max-h-none lg:px-3 lg:pb-3">
              <div className="space-y-5">
                {NAV_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <p className="mb-2 px-3 font-sans text-[9px] font-semibold uppercase tracking-[0.26em] text-white/32">
                      {section.title}
                    </p>
                    <div className="space-y-1 rounded-xl border border-white/6 bg-black/18 p-1.5">
                      {section.items.map((item) => (
                        <AdminNavLink
                          key={item.href}
                          item={item}
                          active={isActive(pathname, item.href)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          <div className="relative shrink-0 border-t border-white/6 px-4 py-4 sm:px-5">
            {userEmail ? (
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/2 px-3 py-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-kp-gold/30 bg-kp-gold/12 font-sans text-sm font-semibold text-kp-gold">
                  {userInitial(userEmail)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Administrateur
                  </p>
                  <p className="mt-1 truncate font-sans text-sm text-white/72">{userEmail}</p>
                </div>
              </div>
            ) : null}

            <Link
              href="/"
              className="mt-3 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 font-sans text-xs text-white/42 transition-colors hover:text-kp-gold/90"
            >
              <IconArrowLeft className="opacity-70" />
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
