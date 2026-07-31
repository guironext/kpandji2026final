"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ui } from "@clerk/ui";
import type { ReactNode } from "react";
import { useClerkUiWarmup } from "@/components/providers/useClerkUiWarmup";

const clerkRouterWorkaround = {
  __internal_invokeMiddlewareOnAuthStateChange: false,
} as Record<string, unknown>;

export function KpClerkProvider({ children }: { children: ReactNode }) {
  useClerkUiWarmup();

  return (
    <ClerkProvider
      ui={ui}
      localization={frFR}
      signInUrl="/"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/onboarding"
      signUpForceRedirectUrl="/onboarding"
      taskUrls={{
        "setup-mfa": "/onboarding/setup-mfa",
      }}
      {...clerkRouterWorkaround}
    >
      {children}
    </ClerkProvider>
  );
}
