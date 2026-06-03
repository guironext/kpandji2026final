"use client";

import { SignIn } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { kpClerkAppearance } from "@/components/kp/clerk-appearance";

type KpClientLoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function KpClientLoginModal({ open, onClose }: KpClientLoginModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kp-client-login-title"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute inset-0 bg-black/82 backdrop-blur-md"
        aria-hidden
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-sm border border-white/12 bg-[#080808] shadow-[0_32px_100px_rgba(0,0,0,0.65)] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              KPANDJI
            </p>
            <h2
              id="kp-client-login-title"
              className="mt-1 font-serif text-2xl text-white"
            >
              Espace client
            </h2>
            <p className="mt-2 font-sans text-sm text-white/50">
              Connectez-vous avec votre e-mail et votre mot de passe.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Fermer la connexion"
          >
            <span className="block text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="kp-clerk-signin px-6 py-6 sm:px-8 sm:py-7">
          <SignIn
            appearance={kpClerkAppearance}
            routing="hash"
            fallbackRedirectUrl={returnTo}
            forceRedirectUrl={returnTo}
            signUpUrl={undefined}
          />
        </div>
      </div>
    </div>
  );
}
