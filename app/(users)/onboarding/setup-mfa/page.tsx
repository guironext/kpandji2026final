"use client";

import { TaskSetupMFA } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ClerkMounted } from "@/components/kp/ClerkMounted";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";

function SetupMfaFlow() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const redirectUrlComplete = token
    ? `/onboarding?token=${encodeURIComponent(token)}`
    : "/onboarding";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pb-28">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">
        Sécuriser votre compte
      </h1>
      <p className="mt-2 font-sans text-sm text-white/50">
        Configurez l’authentification à deux facteurs pour finaliser votre
        inscription.
      </p>

      <div className="kp-clerk-signin mt-7">
        <ClerkMounted
          fallback={
            <p className="font-sans text-sm text-white/45">
              Chargement de la sécurité…
            </p>
          }
        >
          <TaskSetupMFA
            appearance={kpClerkAppearance}
            redirectUrlComplete={redirectUrlComplete}
          />
        </ClerkMounted>
      </div>
    </main>
  );
}

export default function SetupMfaPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" aria-hidden />}>
      <SetupMfaFlow />
    </Suspense>
  );
}
