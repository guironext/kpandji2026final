import { Suspense } from "react";
import { OnboardingFlow } from "@/components/kp/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 pb-28">
      <Suspense
        fallback={
          <p className="font-sans text-sm text-white/50">Chargement…</p>
        }
      >
        <OnboardingFlow />
      </Suspense>
    </main>
  );
}
