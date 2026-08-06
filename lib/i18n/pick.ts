import type { Locale } from "@/lib/i18n/config";

/** Inline FR/EN pair — use with useLocale().locale or getMessages */
export type Copy = { fr: string; en: string };

export function pick(locale: Locale, copy: Copy): string {
  return copy[locale];
}

export function pickList(locale: Locale, items: Copy[]): string[] {
  return items.map((item) => pick(locale, item));
}
