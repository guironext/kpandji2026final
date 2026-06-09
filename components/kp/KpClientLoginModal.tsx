"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";
import { useAuthSync } from "@/components/kp/useAuthSync";
import { useClerkAuthLinkInterceptor } from "@/components/kp/useClerkAuthLinkInterceptor";

type KpClientLoginModalProps = {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
  /**
   * When true, the Clerk <SignIn/> widget is mounted (but hidden) so it's fully
   * initialized before the user opens the modal — making the open feel instant.
   */
  prefetch?: boolean;
};

export function KpClientLoginModal({
  open,
  onClose,
  onSwitchToSignup,
  prefetch = false,
}: KpClientLoginModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const easeLux = [0.22, 1, 0.36, 1] as const;
  const { isLoaded, isSignedIn } = useAuth();
  const active = open || prefetch;

  useAuthSync(active && isLoaded && isSignedIn);

  const loginAppearance = useMemo(
    () => ({
      ...kpClerkAppearance,
      elements: {
        ...kpClerkAppearance.elements,
        footer: "mt-4 flex justify-center gap-1",
      },
    }),
    []
  );

  useClerkAuthLinkInterceptor(panelRef, open, {
    onSignup: onSwitchToSignup,
  });

  const returnTo = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const value = new URLSearchParams(window.location.search).get("returnTo");
    if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
    return value;
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open && !prefetch) return null;

  return (
    <div
      className={`fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6 ${
        open ? "" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="kp-client-login-title"
      aria-hidden={!open}
      onClick={handleBackdropClick}
      {...(!open ? { inert: true } : {})}
    >
      <motion.div
        className="absolute inset-0 bg-black/82 backdrop-blur-md"
        aria-hidden
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-sm border border-white/12 bg-[#080808] shadow-[0_32px_100px_rgba(0,0,0,0.65)] outline-none"
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={
          open
            ? { opacity: 1, scale: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 8 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: easeLux }}
      >
        <div className="relative flex items-start justify-between gap-4 overflow-hidden border-b border-white/10 px-6 py-8 sm:px-8">
          <Image
            src="/models/showcase/djetext1.jpg"
            alt=""
            fill
            sizes="448px"
            priority
            className="pointer-events-none object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[#070707]/72"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#070707] via-[#070707]/70 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#c9a962]/70 to-transparent"
            aria-hidden
          />

          <div className="relative [text-shadow:0_1px_12px_rgba(0,0,0,0.85)]">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
              KPANDJI
            </p>
            <h2
              id="kp-client-login-title"
              className="mt-1 font-serif text-2xl text-white"
            >
              Espace client
            </h2>
            <p className="mt-2 font-sans text-sm text-white/70">
              Connectez-vous avec votre e-mail et votre mot de passe.
            </p>
            <p className="mt-2 font-sans text-xs text-white/45">
              Pas encore de compte ? L’inscription nécessite une invitation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="relative shrink-0 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Fermer la connexion"
          >
            <span className="block text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="relative kp-clerk-signin px-6 py-6 sm:px-8 sm:py-7">
          {isLoaded && isSignedIn && open ? (
            <p className="font-sans text-sm text-white/50">
              Synchronisation de votre compte…
            </p>
          ) : (
            <SignIn
              appearance={loginAppearance}
              routing="hash"
              signInUrl="/?clientLogin=1"
              signUpUrl="/sign-up"
              fallbackRedirectUrl={returnTo}
              forceRedirectUrl={returnTo}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
