"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

/**
 * After Clerk sign-in or sign-up, persist the member row in Prisma
 * (same API pattern as contact / essai / privilege forms).
 */
export function useAuthSync(active = true) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const syncedForUser = useRef<string | null>(null);

  useEffect(() => {
    if (!active || !isLoaded || !isSignedIn || !userId) return;
    if (syncedForUser.current === userId) return;

    let cancelled = false;

    fetch("/api/auth/sync", { method: "POST" })
      .then((res) => {
        if (!cancelled && res.ok) syncedForUser.current = userId;
      })
      .catch(() => {
        if (!cancelled) syncedForUser.current = null;
      });

    return () => {
      cancelled = true;
    };
  }, [active, isLoaded, isSignedIn, userId]);
}
