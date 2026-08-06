"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
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
import { homePathForRole, PRESTIGE_HOME_PATH } from "@/lib/auth/routes";
import { useAuthSync } from "@/components/kp/useAuthSync";
import { useLocale } from "@/components/providers/KpLocaleProvider";

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
    label: { fr: "Membre Prestige", en: "Prestige member" },
    description: {
      fr: "Accès à l'espace client privé KPANDJI.",
      en: "Access to the KPANDJI private client area.",
    },
  },
] as const;

function postOnboardingPath(role: KpUserRole | null | undefined) {
  if (role === PRESTIGE_USER_ROLE) return PRESTIGE_HOME_PATH;
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

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white md:text-4xl">{title}</h1>
      <p className="mt-2 font-sans text-sm text-white/50">{description}</p>
    </>
  );
}

function PendingApprovalMessage({
  fullName,
  role,
}: {
  fullName: string | null;
  role: KpUserRole | null;
}) {
  const { tr } = useLocale();
  const name = fullName?.trim();
  const greeting = name
    ? tr(`Merci ${name}.`, `Thank you ${name}.`)
    : tr("Merci.", "Thank you.");
  const spaceLabel = role === ADMIN_ROLE ? "administration" : "prestige";

  return (
    <div className="mt-8 rounded-xl border border-white/8 bg-white/2 p-6 sm:p-8">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/80">
        {tr("Profil enregistré", "Profile saved")}
      </p>
      <h2 className="mt-3 font-serif text-2xl text-white">
        {tr("En attente de validation", "Awaiting approval")}
      </h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">
        {greeting}{" "}
        {tr(
          `Votre profil a bien été enregistré. Un administrateur KPANDJI doit maintenant approuver votre accès à l'espace ${spaceLabel}. Veuillez patienter — vous serez redirigé automatiquement dès que votre compte sera validé.`,
          `Your profile has been saved. A KPANDJI administrator must now approve your access to the ${spaceLabel} area. Please wait — you'll be redirected automatically once your account is approved.`
        )}
      </p>
      <div className="mt-6 flex items-center gap-3 font-sans text-sm text-white/40">
        <span
          className="inline-block h-2 w-2 animate-pulse rounded-full bg-kp-gold/70"
          aria-hidden
        />
        {tr(
          "En attente de l'approbation de l'administrateur…",
          "Waiting for administrator approval…"
        )}
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();
  const reduceMotion = useReducedMotion();
  const { tr } = useLocale();

  useAuthSync(authLoaded && isSignedIn);

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

  const redirectAfterApproval = useCallback(
    async (role: KpUserRole | null | undefined) => {
      try {
        await session?.reload();
      } catch {
        // Continue with redirect even if the session refresh fails.
      }
      router.replace(postOnboardingPath(role));
    },
    [router, session]
  );

  useEffect(() => {
    if (!onboarding || onboarding.needsProfile) return;
    if (onboarding.role === ADMIN_ROLE) {
      router.replace("/admin");
      return;
    }
    if (onboarding.status === APPROVAL_APPROVED) {
      void redirectAfterApproval(onboarding.role);
      return;
    }
    if (onboarding.status !== APPROVAL_PENDING) return;

    const interval = window.setInterval(async () => {
      const data = await refreshStatus();
      if (data?.status === APPROVAL_APPROVED) {
        await redirectAfterApproval(data.role);
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [onboarding, redirectAfterApproval, refreshStatus, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = fullName.trim();
    const phoneTrim = phone.trim();
    const countryTrim = residenceCountry.trim();
    if (!nameTrim) {
      setError(tr("Indiquez votre nom complet.", "Enter your full name."));
      return;
    }
    if (!phoneTrim) {
      setError(
        tr("Indiquez votre numéro de téléphone.", "Enter your phone number.")
      );
      return;
    }
    if (!countryTrim) {
      setError(
        tr(
          "Indiquez votre pays de résidence.",
          "Enter your country of residence."
        )
      );
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
        setError(
          data.error ??
            tr(
              "Impossible d'enregistrer votre profil.",
              "Unable to save your profile."
            )
        );
        return;
      }

      setOnboarding({
        status: data.status,
        role: data.role,
        fullName: data.fullName,
        phone: data.phone,
        residenceCountry: data.residenceCountry,
        needsProfile: data.needsProfile ?? false,
      });

      try {
        await session?.reload();
      } catch {
        // Continue even if the session refresh fails.
      }

      if (data.status === APPROVAL_APPROVED) {
        await redirectAfterApproval(data.role);
      }
    } catch {
      setError(
        tr("Impossible de joindre le serveur.", "Unable to reach the server.")
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!authLoaded || loading) {
    return (
      <>
        <PageIntro
          eyebrow={tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
          title={tr("Finaliser votre profil", "Complete your profile")}
          description={tr(
            "Complétez vos informations pour accéder à votre espace membre.",
            "Complete your information to access your member area."
          )}
        />
        <p className="mt-8 font-sans text-sm text-white/50">
          {tr("Chargement…", "Loading…")}
        </p>
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <PageIntro
          eyebrow={tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
          title={tr("Finaliser votre profil", "Complete your profile")}
          description={tr(
            "Connectez-vous pour finaliser votre inscription.",
            "Sign in to complete your registration."
          )}
        />
        <div className="mt-8">
          <Link
            href={`/sign-in?redirect_url=${encodeURIComponent("/onboarding")}`}
            className="inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            {tr("Se connecter", "Sign in")}
          </Link>
        </div>
      </>
    );
  }

  if (onboarding?.status === APPROVAL_REJECTED) {
    return (
      <>
        <PageIntro
          eyebrow={tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
          title={tr("Demande refusée", "Request denied")}
          description={tr(
            "Votre demande d'accès n'a pas été acceptée.",
            "Your access request was not accepted."
          )}
        />
        <div className="mt-8">
          <p className="font-sans text-sm text-white/60">
            {tr(
              "Contactez l'administrateur KPANDJI pour plus d'informations.",
              "Contact the KPANDJI administrator for more information."
            )}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            {tr("Retour à l'accueil", "Back to home")}
          </Link>
        </div>
      </>
    );
  }

  const showPendingApproval =
    onboarding &&
    !onboarding.needsProfile &&
    onboarding.status === APPROVAL_PENDING;

  if (showPendingApproval) {
    return (
      <>
        <PageIntro
          eyebrow={tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
          title={tr("Profil enregistré", "Profile saved")}
          description={tr(
            "Votre demande est en cours d'examen par un administrateur.",
            "Your request is being reviewed by an administrator."
          )}
        />
        <PendingApprovalMessage
          fullName={onboarding?.fullName ?? fullName}
          role={onboarding?.role ?? role}
        />
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow={tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
        title={tr("Finaliser votre profil", "Complete your profile")}
        description={tr(
          "Complétez vos informations pour accéder à votre espace membre.",
          "Complete your information to access your member area."
        )}
      />
      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <div>
        <SectionTitle>{tr("Identité", "Identity")}</SectionTitle>
        <div className="space-y-5">
          <div>
            <label htmlFor="kp-onboard-name" className={labelClass}>
              {tr("Nom complet", "Full name")}{" "}
              <span className="text-kp-gold/90">*</span>
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
              placeholder={tr("Prénom et nom", "First and last name")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="kp-onboard-phone" className={labelClass}>
              {tr("Téléphone", "Phone")}{" "}
              <span className="text-kp-gold/90">*</span>
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
              {tr("Pays de résidence", "Country of residence")}{" "}
              <span className="text-kp-gold/90">*</span>
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
              placeholder={tr("France, USA, Canada…", "France, USA, Canada…")}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>
          {tr("Vous être un client Prestige", "You are a Prestige client")}
        </SectionTitle>
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label={tr("Choisir un rôle", "Choose a role")}
        >
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
                    {tr(option.label.fr, option.label.en)}
                  </span>
                  <span className="mt-1 block font-sans text-sm text-white/45">
                    {tr(option.description.fr, option.description.en)}
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
          {submitting
            ? tr("Enregistrement…", "Saving…")
            : tr("Finaliser mon inscription", "Complete my registration")}
        </motion.button>
        <p className="max-w-xs font-sans text-xs leading-relaxed text-white/35">
          {tr(
            "Votre accès sera activé après validation par un administrateur KPANDJI.",
            "Your access will be activated once a KPANDJI administrator approves it."
          )}
        </p>
      </div>
    </form>
    </>
  );
}
