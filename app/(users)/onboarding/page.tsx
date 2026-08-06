"use client";

import { Suspense } from "react";
import { OnboardingFlow } from "@/components/kp/OnboardingFlow";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function OnboardingPage() {
  const { tr } = useLocale();
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 pb-28">
      <Suspense
        fallback={
          <p className="font-sans text-sm text-white/50">
            {tr("Chargement…", "Loading…")}
          </p>
        }
      >
        <OnboardingFlow />
      </Suspense>
    </main>
  );
}
