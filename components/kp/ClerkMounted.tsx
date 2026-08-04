"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ClerkMountedProps = {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * When false, keep showing the fallback (e.g. modal closed — do not mount
   * Clerk UI yet, so its 10s renderer timer never starts).
   */
  active?: boolean;
};

/**
 * Delays rendering Clerk UI components until the page has hydrated.
 * Avoids "[Clerk UI] Component renderer did not mount within 10s" when
 * Turbopack is still compiling lazy chunks during SSR/hydration.
 */
export function ClerkMounted({
  children,
  fallback = null,
  active = true,
}: ClerkMountedProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHydrated(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (!hydrated || !active) return <>{fallback}</>;
  return <>{children}</>;
}
