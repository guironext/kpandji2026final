"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import type { ReactNode } from "react";

// Clerk calls `router.refresh()` from its internal `onAfterSetActive` handler
// whenever the auth state changes. On Next.js 16 that App Router action can be
// dispatched before the router's action queue is initialized (during the
// initial hydration window, amplified by HMR or a slow Clerk-JS load), which
// throws the repeated "Router action dispatched before initialization" error.
//
// Disabling `__internal_invokeMiddlewareOnAuthStateChange` stops that refresh.
// It's safe here because every auth transition already navigates (the sign-in
// and sign-up modals use Clerk's `forceRedirectUrl`, and `UserButton` redirects
// on sign-out), so `proxy.ts` middleware still re-runs on the navigation.
const clerkRouterWorkaround = {
  __internal_invokeMiddlewareOnAuthStateChange: false,
} as Record<string, unknown>;

export function KpClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      localization={frFR}
      signInUrl="/"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/onboarding"
      {...clerkRouterWorkaround}
    >
      {children}
    </ClerkProvider>
  );
}
