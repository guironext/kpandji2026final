"use client";

import { useLocale } from "@/components/providers/KpLocaleProvider";

/**
 * Inline FR/EN text for Server Components. Renders as a plain text node,
 * so it can be dropped into `title`/`description`-style ReactNode props
 * without converting the whole page into a Client Component.
 */
export function Tr({ fr, en }: { fr: string; en: string }) {
  const { tr } = useLocale();
  return <>{tr(fr, en)}</>;
}
