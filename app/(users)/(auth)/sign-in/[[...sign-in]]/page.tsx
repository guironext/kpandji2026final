"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ClerkMounted } from "@/components/kp/ClerkMounted";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";
import { useAuthSync } from "@/components/kp/useAuthSync";

function SignInFlow() {
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useAuth();

  const returnTo = useMemo(() => {
    const value = searchParams.get("returnTo");
    if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
    return value;
  }, [searchParams]);

  useAuthSync(isLoaded && isSignedIn);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pb-28">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">Connexion</h1>
      <p className="mt-2 font-sans text-sm text-white/50">
        Connectez-vous avec votre e-mail et votre mot de passe.
      </p>

      {isLoaded && isSignedIn ? (
        <p className="mt-7 font-sans text-sm text-white/50">
          Synchronisation de votre compte…
        </p>
      ) : (
        <div className="kp-clerk-signin mt-7">
          <ClerkMounted
            fallback={
              <p className="font-sans text-sm text-white/45">
                Chargement de la connexion…
              </p>
            }
          >
            <SignIn
              appearance={kpClerkAppearance}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              fallbackRedirectUrl={returnTo}
              forceRedirectUrl={returnTo}
            />
          </ClerkMounted>
        </div>
      )}
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" aria-hidden />}>
      <SignInFlow />
    </Suspense>
  );
}
