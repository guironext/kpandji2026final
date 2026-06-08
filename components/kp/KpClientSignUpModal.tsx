"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useClerkAuthLinkInterceptor } from "@/components/kp/useClerkAuthLinkInterceptor";
import { useInvitationValidation } from "@/components/kp/useInvitationValidation";

type KpClientSignUpModalProps = {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  token?: string | null;
  prefetch?: boolean;
};

const REASON_COPY: Record<string, string> = {
  invalid: "Cette invitation est introuvable ou a été révoquée.",
  used: "Cette invitation a déjà été utilisée.",
  expired: "Cette invitation a expiré.",
};

export function KpClientSignUpModal({
  open,
  onClose,
  onSwitchToLogin,
  token,
  prefetch = false,
}: KpClientSignUpModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const easeLux = [0.22, 1, 0.36, 1] as const;
  const active = open || prefetch;
  const state = useInvitationValidation(token, active);

  useClerkAuthLinkInterceptor(panelRef, open, {
    onLogin: onSwitchToLogin,
  });

  useEffect(() => {
    if (!open || !token || state.phase !== "valid") return;
    router.replace(`/sign-up?token=${encodeURIComponent(token)}`);
  }, [open, token, state.phase, router]);

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
      aria-labelledby="kp-client-signup-title"
      aria-hidden={!open}
      onClick={handleBackdropClick}
      inert={!open}
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
              KPANDJI — Espace privé
            </p>
            <h2
              id="kp-client-signup-title"
              className="mt-1 font-serif text-2xl text-white"
            >
              Créer votre compte
            </h2>
            <p className="mt-2 font-sans text-sm text-white/70">
              L’inscription se fait uniquement sur invitation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="relative shrink-0 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Fermer l'inscription"
          >
            <span className="block text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="relative px-6 py-6 sm:px-8 sm:py-7">
          {state.phase === "loading" && (
            <p className="font-sans text-sm text-white/50">
              Vérification de votre invitation…
            </p>
          )}

          {state.phase === "invite-only" && (
            <div>
              <p className="font-sans text-sm text-white/60">
                L’espace client KPANDJI est réservé aux clients invités.
              </p>
              <p className="mt-3 font-sans text-sm text-white/45">
                Pour créer un compte, ouvrez le lien d’invitation reçu par
                e-mail.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="inline-flex justify-center rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
                >
                  En savoir plus
                </Link>
                {onSwitchToLogin && (
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="inline-flex justify-center rounded-full border border-white/10 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:border-white/25 hover:bg-white/5 hover:text-white/80"
                  >
                    Se connecter
                  </button>
                )}
              </div>
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
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {onSwitchToLogin && (
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="inline-flex justify-center rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
                  >
                    Se connecter
                  </button>
                )}
                <Link
                  href="/"
                  onClick={onClose}
                  className="inline-flex justify-center rounded-full border border-white/10 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:border-white/25 hover:bg-white/5 hover:text-white/80"
                >
                  Retour à l’accueil
                </Link>
              </div>
            </div>
          )}

          {state.phase === "valid" && (
            <div className="kp-clerk-signin">
              <p className="font-sans text-sm text-white/50">
                Redirection vers le formulaire d’inscription…
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
