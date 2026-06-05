"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";

type TokenState =
  | { phase: "loading" }
  | { phase: "valid"; email: string }
  | { phase: "invalid"; reason: string };

const REASON_COPY: Record<string, string> = {
  missing: "Ce lien d’invitation est incomplet.",
  invalid: "Cette invitation est introuvable ou a été révoquée.",
  used: "Cette invitation a déjà été utilisée.",
  expired: "Cette invitation a expiré.",
};

function SignUpFlow() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<TokenState>({ phase: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ phase: "invalid", reason: "missing" });
      return;
    }

    let cancelled = false;
    fetch(`/api/invitations/validate?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          valid?: boolean;
          email?: string;
          reason?: string;
        };
        if (cancelled) return;
        if (data.valid && data.email) {
          setState({ phase: "valid", email: data.email });
        } else {
          setState({ phase: "invalid", reason: data.reason ?? "invalid" });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "invalid", reason: "invalid" });
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-28">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace privé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">Créer votre compte</h1>

      {state.phase === "loading" && (
        <p className="mt-6 font-sans text-sm text-white/50">
          Vérification de votre invitation…
        </p>
      )}

      {state.phase === "invalid" && (
        <div className="mt-6">
          <p className="font-sans text-sm text-white/60">
            {REASON_COPY[state.reason] ?? REASON_COPY.invalid}
          </p>
          <p className="mt-3 font-sans text-sm text-white/45">
            L’inscription se fait uniquement sur invitation. Contactez
            l’administrateur pour recevoir un nouveau lien.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            Retour à l’accueil
          </Link>
        </div>
      )}

      {state.phase === "valid" && (
        <div className="kp-clerk-signin mt-7">
          <p className="mb-5 font-sans text-sm text-white/50">
            Invitation confirmée pour{" "}
            <span className="text-white/80">{state.email}</span>.
          </p>
          <SignUp
            appearance={kpClerkAppearance}
            routing="path"
            path="/sign-up"
            signInUrl="/?clientLogin=1"
            forceRedirectUrl={`/onboarding?token=${encodeURIComponent(token ?? "")}`}
            fallbackRedirectUrl="/onboarding"
            initialValues={{ emailAddress: state.email }}
            unsafeMetadata={{ invitationToken: token }}
          />
        </div>
      )}
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
