import { Suspense } from "react";
import { OnboardingFlow } from "@/components/kp/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 pb-28">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white md:text-4xl">
        Finaliser votre profil
      </h1>
      <p className="mt-2 font-sans text-sm text-white/50">
        Complétez vos informations pour accéder à votre espace membre.
      </p>

      <div className="mt-8">
        <Suspense
          fallback={
            <p className="font-sans text-sm text-white/50">Chargement…</p>
          }
        >
          <OnboardingFlow />
        </Suspense>
      </div>
    </main>
  );
}
