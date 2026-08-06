"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export function PrivilegeSectionNav() {
  const { tr } = useLocale();
  const links = [
    { href: "#modeles", label: tr("Modèles", "Models") },
    { href: "#paiement", label: tr("Paiement", "Payment") },
    { href: "#conciergerie", label: tr("Conciergerie", "Concierge") },
    { href: "#parcours", label: tr("Parcours", "Journey") },
    { href: "#kpandji-rent", label: "Rent" },
    { href: "#flotte-elite", label: tr("Flotte", "Fleet") },
    { href: "#contact", label: tr("Contact", "Contact") },
  ] as const;

  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55);

      const offset = 160;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label={tr("Navigation Kpandji Privilège", "Kpandji Privilège navigation")}
      className={`fixed inset-x-0 top-[72px] z-40 border-b border-white/8 bg-kp-bg/80 font-sans backdrop-blur-xl transition-all duration-500 md:top-[88px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1680px] items-center gap-1.5 overflow-x-auto px-3 py-3 sm:gap-2 sm:px-8 sm:py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mr-1 hidden shrink-0 text-[9px] font-semibold uppercase tracking-[0.28em] text-kp-gold/80 sm:mr-2 sm:inline">
          Nav
        </span>
        {links.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.18em] ${
                isActive
                  ? "bg-kp-gold/15 text-kp-gold ring-1 ring-kp-gold/35"
                  : "text-white/45 hover:bg-white/5 hover:text-white/75"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
