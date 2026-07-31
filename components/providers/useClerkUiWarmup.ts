"use client";

import { useEffect } from "react";

/**
 * Pre-compile @clerk/ui lazy chunks after hydration so Turbopack is ready
 * before <SignIn/> / <SignUp/> call ensureMounted (which has a 10s timeout).
 */
export function useClerkUiWarmup(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const warm = () => {
      if (cancelled) return;
      // Relative dynamic import path used by @clerk/ui — warming via the
      // public entry still pulls the ClerkUI graph into Turbopack's cache.
      void import("@clerk/ui").catch(() => {});
      void import("@clerk/nextjs").catch(() => {});
    };

    if (typeof requestIdleCallback === "function") {
      idleId = requestIdleCallback(warm, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(warm, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [enabled]);
}
