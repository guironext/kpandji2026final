"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

type Phase = "init" | "pending" | "approved" | "rejected" | "error";

const POLL_INTERVAL_MS = 5000;

function OnboardingFlow() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [phase, setPhase] = useState<Phase>("init");
  const [message, setMessage] = useState<string | null>(null);
  const claimedRef = useRef(false);

  const applyStatus = useCallback(
    (status: string | null) => {
      if (status === "approved") {
        setPhase("approved");
        router.replace("/client-prestige");
      } else if (status === "rejected") {
        setPhase("rejected");
      } else if (status === "pending") {
        setPhase("pending");
      }
    },
    [router]
  );

  // Step 1: link the Clerk account to its invitation (once).
  useEffect(() => {
    if (!isLoaded || !isSignedIn || claimedRef.current) return;
    claimedRef.current = true;

    fetch("/api/onboarding/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          status?: string | null;
          error?: string;
        };
        if (!res.ok) {
          setPhase("error");
          setMessage(data.error ?? "Une erreur est survenue.");
          return;
        }
        applyStatus(data.status ?? "pending");
      })
      .catch(() => {
        setPhase("error");
        setMessage("Impossible de joindre le serveur.");
      });
  }, [isLoaded, isSignedIn, token, applyStatus]);

  // Step 2: poll for the admin decision while pending.
  useEffect(() => {
    if (phase !== "pending") return;

    const id = window.setInterval(() => {
      fetch("/api/onboarding/status")
        .then(async (res) => {
          const data = (await res.json().catch(() => ({}))) as {
            status?: string | null;
          };
          if (res.ok) applyStatus(data.status ?? null);
        })
        .catch(() => {});
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [phase, applyStatus]);

  if (isLoaded && !isSignedIn) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-white">Connexion requise</h1>
        <p className="mt-4 font-sans text-sm text-white/55">
          Veuillez vous connecter pour finaliser votre accès.
        </p>
        <Link
          href="/?clientLogin=1&returnTo=/onboarding"
          className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
        >
          Se connecter
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        KPANDJI — Espace Prestige
      </p>

      {(phase === "init" || phase === "pending") && (
        <>
          <div
            className="mt-6 h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#c9a962]"
            aria-hidden
          />
          <h1 className="mt-7 font-serif text-3xl text-white">
            Votre compte est en attente de validation
          </h1>
          <p className="mt-4 max-w-md font-sans text-sm text-white/55">
            Merci pour votre inscription. Un administrateur doit approuver votre
            accès à l’espace Prestige. Vous serez redirigé automatiquement dès
            que votre compte sera validé.
          </p>
        </>
      )}

      {phase === "approved" && (
        <>
          <h1 className="mt-6 font-serif text-3xl text-white">Accès accordé</h1>
          <p className="mt-4 font-sans text-sm text-white/55">
            Redirection vers votre espace Prestige…
          </p>
        </>
      )}

      {phase === "rejected" && (
        <>
          <h1 className="mt-6 font-serif text-3xl text-white">
            Demande non retenue
          </h1>
          <p className="mt-4 max-w-md font-sans text-sm text-white/55">
            Votre demande d’accès n’a pas été approuvée. Contactez
            l’administrateur pour plus d’informations.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            Retour à l’accueil
          </Link>
        </>
      )}

      {phase === "error" && (
        <>
          <h1 className="mt-6 font-serif text-3xl text-white">
            Un problème est survenu
          </h1>
          <p className="mt-4 max-w-md font-sans text-sm text-white/55">
            {message ?? "Veuillez réessayer dans un instant."}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            Retour à l’accueil
          </Link>
        </>
      )}
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={<main className="min-h-[70vh]" aria-hidden />}
    >
      <OnboardingFlow />
    </Suspense>
  );
}
