"use client";

import { SignUp, useAuth, useSession } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { ClerkMounted } from "@/components/kp/ClerkMounted";
import {
  kpClerkAppearance,
} from "@/components/kp/clerk-appearance";
import { useAuthSync } from "@/components/kp/useAuthSync";
import { useInvitationValidation } from "@/components/kp/useInvitationValidation";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const INVITE_TOKEN_KEY = "kp-invite-token";

const REASON_COPY: Record<string, { fr: string; en: string }> = {
  invalid: {
    fr: "Cette invitation est introuvable ou a été révoquée.",
    en: "This invitation could not be found or has been revoked.",
  },
  used: {
    fr: "Cette invitation a déjà été utilisée.",
    en: "This invitation has already been used.",
  },
  expired: {
    fr: "Cette invitation a expiré.",
    en: "This invitation has expired.",
  },
};

const SIGNUP_STEPS = [
  {
    id: "account",
    label: { fr: "Compte", en: "Account" },
    hint: { fr: "Identifiants", en: "Credentials" },
  },
  {
    id: "verify",
    label: { fr: "E-mail", en: "Email" },
    hint: { fr: "Vérification", en: "Verification" },
  },
  {
    id: "profile",
    label: { fr: "Profil", en: "Profile" },
    hint: { fr: "Finalisation", en: "Finalize" },
  },
] as const;

function readPersistedInviteToken(urlToken: string | null): string | null {
  if (urlToken) return urlToken;
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(INVITE_TOKEN_KEY);
}

function usePersistedInviteToken(urlToken: string | null) {
  const token = useMemo(() => readPersistedInviteToken(urlToken), [urlToken]);

  useEffect(() => {
    if (urlToken) sessionStorage.setItem(INVITE_TOKEN_KEY, urlToken);
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

function VerticalSteps({ current }: { current: number }) {
  const { tr } = useLocale();
  return (
    <ol
      className="hidden space-y-1 lg:block"
      aria-label={tr("Étapes d'inscription", "Sign-up steps")}
    >
      {SIGNUP_STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <li
            key={step.id}
            className={`flex items-center gap-4 border-l py-3 pl-5 transition-colors duration-500 ${
              active
                ? "border-kp-gold"
                : done
                  ? "border-kp-gold/40"
                  : "border-white/10"
            }`}
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`font-sans text-[10px] font-semibold tabular-nums tracking-[0.2em] ${
                active || done ? "text-kp-gold" : "text-white/25"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p
                className={`font-sans text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  active ? "text-white" : done ? "text-white/60" : "text-white/30"
                }`}
              >
                {tr(step.label.fr, step.label.en)}
              </p>
              <p
                className={`mt-0.5 font-sans text-xs ${
                  active ? "text-white/50" : "text-white/25"
                }`}
              >
                {tr(step.hint.fr, step.hint.en)}
              </p>
            </div>
            {done && (
              <svg
                className="ml-auto shrink-0 text-kp-gold/70"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function MobileSteps({ current }: { current: number }) {
  const { tr } = useLocale();
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 lg:hidden kp-hide-scrollbar"
      aria-label={tr("Étapes d'inscription", "Sign-up steps")}
    >
      {SIGNUP_STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <span
            key={step.id}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
              active
                ? "bg-kp-gold/20 text-kp-gold ring-1 ring-kp-gold/40"
                : done
                  ? "bg-white/8 text-white/55"
                  : "bg-white/4 text-white/30"
            }`}
          >
            {tr(step.label.fr, step.label.en)}
          </span>
        );
      })}
    </div>
  );
}

function AuthActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex justify-center rounded-full px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
        variant === "primary"
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white/85"
      }`}
    >
      {children}
    </Link>
  );
}

function LoadingPulse({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kp-gold/40 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-kp-gold/70" />
      </span>
      <p className="font-sans text-sm text-white/50">{message}</p>
    </div>
  );
}

function InviteConfirmedBanner({ email }: { email: string }) {
  const { tr } = useLocale();
  return (
    <div className="mb-8 flex flex-col gap-1 border-l-2 border-kp-gold pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold">
          {tr("Invitation validée", "Invitation confirmed")}
        </p>
        <p className="mt-1 font-serif text-lg text-white/90">{email}</p>
      </div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-kp-gold/10 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-kp-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-kp-gold kp-pulse-dot" />
        {tr("Prêt à continuer", "Ready to continue")}
      </span>
    </div>
  );
}

function VerifyEmailIntro() {
  const { tr } = useLocale();
  return (
    <div className="mb-8 max-w-xl rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-kp-gold/25 bg-kp-gold/10 text-kp-gold"
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold">
            {tr("Code de vérification", "Verification code")}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
            {tr(
              "Consultez votre boîte de réception et saisissez le code à 6 chiffres reçu par e-mail.",
              "Check your inbox and enter the 6-digit code you received by email."
            )}
          </p>
          <p className="mt-3 font-sans text-xs leading-relaxed text-white/40">
            {tr(
              "Le code expire après quelques minutes. Pensez à vérifier vos courriers indésirables si vous ne le trouvez pas.",
              "The code expires after a few minutes. Check your spam folder if you can't find it."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusPanel({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="max-w-xl">
      <h2 className="font-serif text-2xl text-white md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-white/55 md:text-base">
        {children}
      </div>
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

const signupAppearance = {
  ...kpClerkAppearance,
  elements: {
    ...kpClerkAppearance.elements,
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    footer: "mt-6 flex justify-start gap-1",
  },
} as const;

const verifyEmailAppearance = {
  ...kpClerkAppearance,
  elements: {
    ...kpClerkAppearance.elements,
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    formHeaderTitle: "hidden",
    formHeaderSubtitle: "hidden",
    footer: "mt-6 flex justify-start gap-1",
  },
} as const;

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
  const onSignUpFlow = pathname.startsWith("/sign-up");
  const isVerifyEmailStep = pathname.includes("verify-email");
  const { tr } = useLocale();

  useAuthSync(clerkLoaded && isSignedIn && !onSignUpFlow);

  useEffect(() => {
    if (!clerkLoaded || !sessionLoaded || !isSignedIn) return;
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
    (onSignUpFlow || (!isSignedIn && state.phase === "valid"));

  const currentStep = isVerifyEmailStep ? 1 : 0;
  const pageTitle = isVerifyEmailStep
    ? tr("Vérifier votre e-mail", "Verify your email")
    : tr("Créer votre compte", "Create your account");
  const pageSubtitle = isVerifyEmailStep
    ? tr(
        "Entrez le code à 6 chiffres envoyé à votre adresse e-mail.",
        "Enter the 6-digit code sent to your email address."
      )
    : tr(
        "Rejoignez l'espace client réservé aux membres invités.",
        "Join the client area reserved for invited members."
      );

  return (
    <div className="relative min-h-[calc(100dvh-110px)] md:min-h-[calc(100dvh-132px)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="kp-contact-orb-3 absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-kp-gold/[0.05] blur-3xl" />
        <div className="kp-grain absolute inset-0 opacity-[0.22]" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-10">
        <div className="animate-fade-up overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/90 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-md lg:grid lg:min-h-[calc(100dvh-220px)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Left — editorial visual panel */}
          <aside className="relative flex min-h-[15rem] flex-col justify-between overflow-hidden sm:min-h-[18rem] lg:min-h-0">
            <Image
              src="/models/showcase/djetint1.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
              className="pointer-events-none object-cover object-center scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#050505]/95 via-[#050505]/75 to-[#050505]/40 lg:bg-linear-to-r lg:from-[#050505]/92 lg:via-[#050505]/70 lg:to-[#050505]/55"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-linear-to-b from-transparent via-kp-gold/50 to-transparent lg:block"
              aria-hidden
            />

            <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="kp-hero-reveal kp-hero-delay-1 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-kp-gold/90">
                  {tr("KPANDJI — Espace privé", "KPANDJI — Private area")}
                </p>
                <h1 className="kp-hero-reveal kp-hero-delay-2 mt-4 max-w-xs font-serif text-3xl leading-tight text-white sm:text-4xl lg:mt-6 lg:text-[2.75rem] lg:leading-[1.1]">
                  {pageTitle}
                </h1>
                <p className="kp-hero-reveal kp-hero-delay-3 mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/55 sm:text-base">
                  {pageSubtitle}
                </p>
                <div className="kp-hero-reveal kp-hero-delay-4 mt-6 lg:mt-8">
                  <MobileSteps current={currentStep} />
                </div>
              </div>

              <div className="relative mt-8 hidden lg:mt-0 lg:block">
                <VerticalSteps current={currentStep} />
                <p className="mt-10 font-sans text-[11px] leading-relaxed text-white/30">
                  {tr(
                    "Votre accès personnel aux services exclusifs KPANDJI.",
                    "Your personal access to KPANDJI's exclusive services."
                  )}
                </p>
              </div>
            </div>
          </aside>

          {/* Right — form panel (wider) */}
          <section className="flex flex-col border-t border-white/8 bg-[#0a0a0a] px-6 py-8 sm:px-10 sm:py-10 lg:border-t-0 lg:border-l lg:px-12 lg:py-12 xl:px-14">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/8 pb-6">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  {tr("Étape", "Step")} {currentStep + 1}{" "}
                  {tr("sur", "of")} {SIGNUP_STEPS.length}
                </p>
                <p className="mt-1 font-serif text-xl text-white/85">
                  {SIGNUP_STEPS[currentStep] &&
                    tr(
                      SIGNUP_STEPS[currentStep].label.fr,
                      SIGNUP_STEPS[currentStep].label.en
                    )}
                </p>
                {isVerifyEmailStep && (
                  <p className="mt-1 font-sans text-xs text-white/45">
                    {SIGNUP_STEPS[currentStep] &&
                      tr(
                        SIGNUP_STEPS[currentStep].hint.fr,
                        SIGNUP_STEPS[currentStep].hint.en
                      )}
                  </p>
                )}
              </div>
              <Link
                href="/sign-in"
                className="hidden shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 transition hover:text-kp-gold sm:inline-flex"
              >
                {tr("Déjà membre →", "Already a member →")}
              </Link>
            </div>

            <div className="flex flex-1 flex-col">
              {state.phase === "loading" && !isClerkSignUpStep && (
                <LoadingPulse
                  message={tr(
                    "Vérification de votre invitation…",
                    "Checking your invitation…"
                  )}
                />
              )}

              {state.phase === "invite-only" && !isClerkSignUpStep && (
                <StatusPanel
                  title={tr("Accès sur invitation", "Invite-only access")}
                  actions={
                    <>
                      <AuthActionLink href="/sign-in" variant="primary">
                        {tr("Se connecter", "Sign in")}
                      </AuthActionLink>
                      <AuthActionLink href="/" variant="secondary">
                        {tr("Accueil", "Home")}
                      </AuthActionLink>
                    </>
                  }
                >
                  <p>
                    {tr(
                      "Ouvrez le lien d'invitation reçu par e-mail pour accéder au formulaire d'inscription.",
                      "Open the invitation link you received by email to access the sign-up form."
                    )}
                  </p>
                  <p className="text-white/40">
                    {tr(
                      "L'espace client KPANDJI est réservé aux clients invités.",
                      "The KPANDJI client area is reserved for invited clients."
                    )}
                  </p>
                </StatusPanel>
              )}

              {state.phase === "invalid" && !isClerkSignUpStep && (
                <StatusPanel
                  title={tr("Invitation indisponible", "Invitation unavailable")}
                  actions={
                    <>
                      <AuthActionLink href="/" variant="primary">
                        {tr("Retour à l'accueil", "Back to home")}
                      </AuthActionLink>
                      <AuthActionLink href="/sign-in" variant="secondary">
                        {tr("Se connecter", "Sign in")}
                      </AuthActionLink>
                    </>
                  }
                >
                  <p>
                    {tr(
                      (REASON_COPY[state.reason] ?? REASON_COPY.invalid).fr,
                      (REASON_COPY[state.reason] ?? REASON_COPY.invalid).en
                    )}
                  </p>
                  <p className="text-white/40">
                    {tr(
                      "Contactez l'administrateur pour recevoir un nouveau lien d'invitation.",
                      "Contact the administrator to receive a new invitation link."
                    )}
                  </p>
                </StatusPanel>
              )}

              {state.phase === "valid" && !isClerkSignUpStep && (
                <InviteConfirmedBanner email={state.email} />
              )}

              {!clerkLoaded && state.phase === "valid" && !isClerkSignUpStep && (
                <LoadingPulse
                  message={tr(
                    "Chargement du formulaire…",
                    "Loading the form…"
                  )}
                />
              )}

              {clerkLoaded && isSignedIn && !onSignUpFlow && (
                <LoadingPulse
                  message={tr(
                    "Synchronisation de votre compte…",
                    "Syncing your account…"
                  )}
                />
              )}

              {!showSignUp && isClerkSignUpStep && (
                <LoadingPulse
                  message={tr(
                    "Chargement de la vérification…",
                    "Loading verification…"
                  )}
                />
              )}

              {showSignUp && (
                <>
                  {isVerifyEmailStep && <VerifyEmailIntro />}
                  <div
                    className={`max-w-xl kp-clerk-signin ${
                      isVerifyEmailStep ? "kp-clerk-verify" : ""
                    }`}
                  >
                    <ClerkMounted
                      fallback={
                        <LoadingPulse
                          message={tr(
                            "Chargement de l'inscription…",
                            "Loading sign-up…"
                          )}
                        />
                      }
                    >
                      <SignUp
                        appearance={
                          isVerifyEmailStep
                            ? verifyEmailAppearance
                            : signupAppearance
                        }
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        forceRedirectUrl={onboardingRedirect(token)}
                        fallbackRedirectUrl="/onboarding"
                        initialValues={
                          !isClerkSignUpStep && state.phase === "valid"
                            ? { emailAddress: state.email }
                            : undefined
                        }
                        unsafeMetadata={
                          token ? { invitationToken: token } : undefined
                        }
                      />
                    </ClerkMounted>
                  </div>
                </>
              )}
            </div>

            <p className="mt-10 border-t border-white/8 pt-6 text-center font-sans text-sm text-white/35 sm:hidden">
              {tr("Déjà un compte ?", "Already have an account?")}{" "}
              <Link
                href="/sign-in"
                className="text-kp-gold/90 underline-offset-4 hover:text-kp-gold hover:underline"
              >
                {tr("Se connecter", "Sign in")}
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function SignUpPage() {
  const { tr } = useLocale();
  return (
    <Suspense
      fallback={
        <main
          className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6"
          aria-hidden
        >
          <LoadingPulse message={tr("Chargement…", "Loading…")} />
        </main>
      }
    >
      <SignUpFlow />
    </Suspense>
  );
}
