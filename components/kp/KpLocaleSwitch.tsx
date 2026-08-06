"use client";

import { LOCALES, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/components/providers/KpLocaleProvider";

type KpLocaleSwitchProps = {
  className?: string;
  /** Slightly larger hit targets for the mobile drawer */
  size?: "sm" | "md";
};

export function KpLocaleSwitch({
  className = "",
  size = "sm",
}: KpLocaleSwitchProps) {
  const { locale, setLocale, t } = useLocale();

  const labelClass =
    size === "md"
      ? "px-1 py-0.5 text-[11px] tracking-[0.22em]"
      : "text-sm tracking-widest";

  return (
    <div
      className={`inline-flex items-center gap-2 font-medium uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code, index) => {
        const active = locale === code;
        const ariaLabel =
          code === "fr" ? t.locale.switchToFr : t.locale.switchToEn;

        return (
          <span key={code} className="inline-flex items-center gap-2">
            {index > 0 && (
              <span className="text-white/20" aria-hidden>
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => setLocale(code as Locale)}
              aria-pressed={active}
              aria-label={ariaLabel}
              lang={code}
              className={`${labelClass} transition-colors ${
                active
                  ? "cursor-default text-white/80"
                  : "text-white/35 hover:text-white/70"
              }`}
            >
              {code.toUpperCase()}
            </button>
          </span>
        );
      })}
    </div>
  );
}
