"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { motion, useReducedMotion } from "framer-motion";
import {
  ADMIN_ROLE,
  APPROVAL_APPROVED,
  APPROVAL_PENDING,
  APPROVAL_REJECTED,
  PRESTIGE_USER_ROLE,
  type KpApprovalStatus,
  type KpUserRole,
} from "@/lib/auth/roles";
import { homePathForRole } from "@/lib/auth/routes";

const inputClass =
  "w-full rounded-xl border border-white/[0.11] bg-black/40 px-4 py-3.5 font-sans text-[15px] text-kp-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)]";

const labelClass =
  "mb-2 block text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38";

type OnboardingState = {
  status: KpApprovalStatus | null;
  role: KpUserRole | null;
  fullName: string | null;
  phone: string | null;
  residenceCountry: string | null;
  needsProfile: boolean;
};

const ROLE_OPTIONS = [
  {
    value: PRESTIGE_USER_ROLE,
    label: "Membre Prestige",
    description: "Accès à l'espace client privé KPANDJI.",
  },
 
] as const;

function postOnboardingPath(role: KpUserRole | null | undefined) {
  return homePathForRole(role);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="h-px w-8 shrink-0 bg-linear-to-r from-kp-gold/80 to-kp-gold/15"
        aria-hidden
      />
      <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
        {children}
      </h2>
    </div>
  );
}

export function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const reduceMotion = useReducedMotion();

  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");
  const [role, setRole] = useState<KpUserRole>(PRESTIGE_USER_ROLE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const refreshStatus = useCallback(async () => {
    const res = await fetch("/api/onboarding/status");
    if (!res.ok) return null;
    const data = (await res.json()) as OnboardingState;
    setOnboarding(data);
    return data;
  }, []);

  useEffect(() => {
    if (!authLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    refreshStatus()
      .then((data) => {
        if (cancelled || !data) return;
        if (data.fullName) setFullName(data.fullName);
        if (data.phone) setPhone(data.phone);
        if (data.residenceCountry) setResidenceCountry(data.residenceCountry);
        if (data.role) setRole(data.role);
        else if (user) {
          const clerkName = [user.firstName, user.lastName].filter(Boolean).join(" ");
          if (clerkName) setFullName(clerkName);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoaded, isSignedIn, refreshStatus, user]);

  useEffect(() => {
    if (!onboarding || onboarding.needsProfile) return;
    if (onboarding.role === ADMIN_ROLE) {
      router.replace("/admin");
      return;
    }
    if (onboarding.status === APPROVAL_APPROVED) {
      router.replace(postOnboardingPath(onboarding.role));
      return;
    }
    if (onboarding.status !== APPROVAL_PENDING) return;

    const interval = window.setInterval(async () => {
      const data = await refreshStatus();
      if (data?.status === APPROVAL_APPROVED) {
        router.replace(postOnboardingPath(data.role));
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [onboarding, refreshStatus, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = fullName.trim();
    const phoneTrim = phone.trim();
    const countryTrim = residenceCountry.trim();
    if (!nameTrim) {
      setError("Indiquez votre nom complet.");
      return;
    }
    if (!phoneTrim) {
      setError("Indiquez votre numéro de téléphone.");
      return;
    }
    if (!countryTrim) {
      setError("Indiquez votre pays de résidence.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(role !== ADMIN_ROLE && token ? { token } : {}),
          fullName: nameTrim,
          phone: phoneTrim,
          residenceCountry: countryTrim,
          role,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as OnboardingState & {
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Impossible d'enregistrer votre profil.");
        return;
      }
      setOnboarding(data);
    } catch {
      setError("Impossible de joindre le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!authLoaded || loading) {
    return (
      <p className="font-sans text-sm text-white/50">Chargement…</p>
    );
  }

  if (!isSignedIn) {
    return (
      <div>
        <p className="font-sans text-sm text-white/60">
          Connectez-vous pour finaliser votre inscription.
        </p>
        <Link
          href={`/sign-in?redirect_url=${encodeURIComponent("/onboarding")}`}
          className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (onboarding?.status === APPROVAL_REJECTED) {
    return (
      <div>
        <p className="font-sans text-sm text-white/60">
          Votre demande d&apos;accès a été refusée. Contactez l&apos;administrateur
          KPANDJI pour plus d&apos;informations.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  if (onboarding && !onboarding.needsProfile && onboarding.status === APPROVAL_PENDING) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-6 sm:p-8">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/80">
          Profil enregistré
        </p>
        <h2 className="mt-3 font-serif text-2xl text-white">
          En attente de validation
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">
          Merci {onboarding.fullName}. Un administrateur examine votre demande
          d&apos;accès à l&apos;espace{" "}
          {onboarding.role === ADMIN_ROLE ? "administration" : "prestige"}. Vous
          serez redirigé automatiquement dès que votre compte sera approuvé.
        </p>
        <div className="mt-6 flex items-center gap-3 font-sans text-sm text-white/40">
          <span
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-kp-gold/70"
            aria-hidden
          />
          Vérification en cours…
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <SectionTitle>Identité</SectionTitle>
        <div className="space-y-5">
          <div>
            <label htmlFor="kp-onboard-name" className={labelClass}>
              Nom complet <span className="text-kp-gold/90">*</span>
            </label>
            <input
              id="kp-onboard-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(ev) => {
                setFullName(ev.target.value);
                if (error) setError(null);
              }}
              placeholder="Prénom et nom"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="kp-onboard-phone" className={labelClass}>
              Téléphone <span className="text-kp-gold/90">*</span>
            </label>
            <input
              id="kp-onboard-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(ev) => {
                setPhone(ev.target.value);
                if (error) setError(null);
              }}
              placeholder="+225 …"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="kp-onboard-country" className={labelClass}>
              Pays de résidence <span className="text-kp-gold/90">*</span>
            </label>
            <input
              id="kp-onboard-country"
              name="residenceCountry"
              type="text"
              autoComplete="country-name"
              value={residenceCountry}
              onChange={(ev) => {
                setResidenceCountry(ev.target.value);
                if (error) setError(null);
              }}
              placeholder="France, USA, Canada…"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Vous être un client Prestige</SectionTitle>
        <div className="space-y-3" role="radiogroup" aria-label="Choisir un rôle">
          {ROLE_OPTIONS.map((option) => {
            const selected = role === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border px-4 py-4 transition ${
                  selected
                    ? "border-kp-gold/40 bg-kp-gold/6"
                    : "border-white/9 bg-black/20 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={selected}
                  onChange={() => {
                    setRole(option.value);
                    if (error) setError(null);
                  }}
                  className="mt-1 accent-kp-gold"
                />
                <span>
                  <span className="block font-sans text-sm font-medium text-white/90">
                    {option.label}
                  </span>
                  <span className="mt-1 block font-sans text-sm text-white/45">
                    {option.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/25 bg-red-950/35 px-4 py-3 text-sm text-red-200/95"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90 disabled:opacity-50"
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          {submitting ? "Enregistrement…" : "Finaliser mon inscription"}
        </motion.button>
        <p className="max-w-xs font-sans text-xs leading-relaxed text-white/35">
          Votre accès sera activé après validation par un administrateur KPANDJI.
        </p>
      </div>
    </form>
  );
}
