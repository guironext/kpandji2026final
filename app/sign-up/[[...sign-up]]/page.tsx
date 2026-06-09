"use client";

import { SignUp, useAuth, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";
import { useInvitationValidation } from "@/components/kp/useInvitationValidation";

const INVITE_TOKEN_KEY = "kp-invite-token";

const REASON_COPY: Record<string, string> = {
  invalid: "Cette invitation est introuvable ou a été révoquée.",
  used: "Cette invitation a déjà été utilisée.",
  expired: "Cette invitation a expiré.",
};

/** Clerk path routing drops ?token= when advancing to verify-email-address. */
function readPersistedInviteToken(urlToken: string | null): string | null {
  if (urlToken) return urlToken;
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(INVITE_TOKEN_KEY);
}

function usePersistedInviteToken(urlToken: string | null) {
  const [token, setToken] = useState<string | null>(() =>
    readPersistedInviteToken(urlToken)
  );

  useEffect(() => {
    const next = readPersistedInviteToken(urlToken);
    if (urlToken) sessionStorage.setItem(INVITE_TOKEN_KEY, urlToken);
    setToken(next);
  }, [urlToken]);

  return token;
}

function onboardingRedirect(token: string | null) {
  return token
    ? `/onboarding?token=${encodeURIComponent(token)}`
    : "/onboarding";
}

function isClerkSignUpSubRoute(pathname: string) {
  return pathname.startsWith("/sign-up/") && pathname !== "/sign-up/";
}

function SignUpFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");
  const token = usePersistedInviteToken(urlToken);
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const { session, isLoaded: sessionLoaded } = useSession();
  const state = useInvitationValidation(token);
  const isClerkSignUpStep = isClerkSignUpSubRoute(pathname);

  useEffect(() => {
    if (!clerkLoaded || !sessionLoaded || !isSignedIn) return;
    // Let Clerk finish verify-email / continue steps before redirecting away.
    if (isClerkSignUpSubRoute(pathname)) return;

    const task = session?.currentTask?.key;
    if (task === "setup-mfa") {
      const mfaUrl = token
        ? `/onboarding/setup-mfa?token=${encodeURIComponent(token)}`
        : "/onboarding/setup-mfa";
      router.replace(mfaUrl);
      return;
    }

    if (pathname.startsWith("/sign-up")) {
      router.replace(onboardingRedirect(token));
    }
  }, [clerkLoaded, sessionLoaded, isSignedIn, session, pathname, router, token]);

  const showSignUp =
    clerkLoaded &&
    (isClerkSignUpStep || (!isSignedIn && state.phase === "valid"));

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pb-28 pt-[110px] md:pt-[132px]">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">
        {pathname.includes("verify-email")
          ? "Vérifier votre e-mail"
          : "Créer votre compte"}
      </h1>
      <p className="mt-2 font-sans text-sm text-white/50">
        {pathname.includes("verify-email")
          ? "Saisissez le code reçu par e-mail pour continuer."
          : "L’inscription se fait uniquement sur invitation."}
      </p>

      <div className="kp-clerk-signin mt-7">
        {state.phase === "loading" && !isClerkSignUpStep && (
          <p className="font-sans text-sm text-white/50">
            Vérification de votre invitation…
          </p>
        )}

        {state.phase === "invite-only" && !isClerkSignUpStep && (
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

        {state.phase === "invalid" && !isClerkSignUpStep && (
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

        {state.phase === "valid" && !isClerkSignUpStep && (
          <p className="mb-5 font-sans text-sm text-white/50">
            Invitation confirmée pour{" "}
            <span className="text-white/80">{state.email}</span>.
          </p>
        )}

        {!clerkLoaded && state.phase === "valid" && !isClerkSignUpStep && (
          <p className="font-sans text-sm text-white/50">
            Chargement du formulaire…
          </p>
        )}

        {clerkLoaded && isSignedIn && !isClerkSignUpStep && (
          <p className="font-sans text-sm text-white/50">
            Finalisation de votre inscription…
          </p>
        )}

        {!showSignUp && isClerkSignUpStep && (
          <p className="font-sans text-sm text-white/50">
            Chargement de la vérification…
          </p>
        )}

        {showSignUp && (
          <SignUp
            appearance={kpClerkAppearance}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl={`/onboarding?token=${encodeURIComponent(token ?? "")}`}
            fallbackRedirectUrl="/onboarding"
            initialValues={
              state.phase === "valid"
                ? { emailAddress: state.email }
                : undefined
            }
            unsafeMetadata={token ? { invitationToken: token } : undefined}
          />
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
