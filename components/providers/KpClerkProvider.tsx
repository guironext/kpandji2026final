"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ui } from "@clerk/ui";
import type { ReactNode } from "react";


const clerkRouterWorkaround = {
  __internal_invokeMiddlewareOnAuthStateChange: false,
} as Record<string, unknown>;

export function KpClerkProvider({ children }: { children: ReactNode }) {
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
