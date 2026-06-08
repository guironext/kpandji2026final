"use client";

import { SignUp, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";
import { useInvitationValidation } from "@/components/kp/useInvitationValidation";

const REASON_COPY: Record<string, string> = {
  invalid: "Cette invitation est introuvable ou a été révoquée.",
  used: "Cette invitation a déjà été utilisée.",
  expired: "Cette invitation a expiré.",
};

function SignUpFlow() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const state = useInvitationValidation(token);

  const showSignUp =
    state.phase === "valid" && clerkLoaded && !isSignedIn;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-28">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">Créer votre compte</h1>
      <p className="mt-2 font-sans text-sm text-white/50">
        L’inscription se fait uniquement sur invitation.
      </p>

      <div className="kp-clerk-signin mt-7">
        {state.phase === "loading" && (
          <p className="font-sans text-sm text-white/50">
            Vérification de votre invitation…
          </p>
        )}

        {state.phase === "invite-only" && (
          <div>
            <p className="font-sans text-sm text-white/60">
              Ouvrez le lien d’invitation reçu par e-mail pour accéder au
              formulaire d’inscription.
            </p>
            <Link
              href="/sign-in"
              className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              Se connecter
            </Link>
          </div>
        )}

        {state.phase === "invalid" && (
          <div>
            <p className="font-sans text-sm text-white/60">
              {REASON_COPY[state.reason] ?? REASON_COPY.invalid}
            </p>
            <p className="mt-3 font-sans text-sm text-white/45">
              Contactez l’administrateur pour recevoir un nouveau lien
              d’invitation.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              Retour à l’accueil
            </Link>
          </div>
        )}

        {state.phase === "valid" && (
          <>
            <p className="mb-5 font-sans text-sm text-white/50">
              Invitation confirmée pour{" "}
              <span className="text-white/80">{state.email}</span>.
            </p>

            {!clerkLoaded && (
              <p className="font-sans text-sm text-white/50">
                Chargement du formulaire…
              </p>
            )}

            {clerkLoaded && isSignedIn && (
              <p className="font-sans text-sm text-white/50">
                Vous êtes déjà connecté.
              </p>
            )}

            {showSignUp && (
              <SignUp
                key={token}
                appearance={kpClerkAppearance}
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl={`/onboarding?token=${encodeURIComponent(token ?? "")}`}
                fallbackRedirectUrl="/onboarding"
                initialValues={{ emailAddress: state.email }}
                unsafeMetadata={{ invitationToken: token }}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" aria-hidden />}>
      <SignUpFlow />
    </Suspense>
  );
}
