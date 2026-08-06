"use client";

import { useLocale } from "@/components/providers/KpLocaleProvider";

type CountText = { fr: string; en: string };

type AdminCountLineProps = {
  count: number;
  /** Use "{n}" as the count placeholder. */
  singular: CountText;
  plural: CountText;
  className?: string;
};

/**
 * Renders a pluralized "N item(s)…" sentence in the active locale for
 * Server Components that fetch counts via Prisma.
 */
export function AdminCountLine({
  count,
  singular,
  plural,
  className = "mt-2 font-sans text-sm text-white/50",
}: AdminCountLineProps) {
  const { tr } = useLocale();
  const template = count === 1 ? tr(singular.fr, singular.en) : tr(plural.fr, plural.en);
  return <p className={className}>{template.replace("{n}", String(count))}</p>;
}
