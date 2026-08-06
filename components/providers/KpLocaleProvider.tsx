"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  parseLocale,
  type Locale,
} from "@/lib/i18n/config";
import {
  getMessages,
  type HeaderMessages,
  type Messages,
} from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Full message tree (header, footer, …) */
  m: Messages;
  /** Header messages shorthand (existing call sites) */
  t: HeaderMessages;
  /** Inline FR/EN picker for components not yet in dictionaries */
  tr: (fr: string, en: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // ignore quota / private mode
  }
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale;
}

export function KpLocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(parseLocale(initialLocale));

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCALE_COOKIE);
      if (!isLocale(raw) || raw === locale) return;
      setLocaleState(raw);
      persistLocale(raw);
    } catch {
      // ignore
    }
    // Prefer stored preference after first paint if it differs from the cookie.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    const parsed = parseLocale(next);
    setLocaleState(parsed);
    persistLocale(parsed);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const m = getMessages(locale);
    return {
      locale,
      setLocale,
      m,
      t: m.header,
      tr: (fr: string, en: string) => (locale === "en" ? en : fr),
    };
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within KpLocaleProvider");
  }
  return ctx;
}
