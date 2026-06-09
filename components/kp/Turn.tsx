"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function Turn() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Indiquez votre adresse e-mail.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/visitor-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(data?.error ?? "Une erreur est survenue. Réessayez plus tard.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Impossible d'envoyer votre e-mail. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="relative isolate overflow-hidden border-t border-white/8 py-20 md:py-28 lg:py-32 bg-gray-50/10"
      aria-labelledby="kp-turn-heading">
      <div
        className="kp-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay md:opacity-[0.16]"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_0%_0%,rgba(201,169,98,0.11),transparent_55%),radial-gradient(900px_480px_at_100%_100%,rgba(255,255,255,0.05),transparent_58%),linear-gradient(180deg,rgba(12,12,12,0.4)_0%,transparent_45%,transparent_55%,rgba(5,5,5,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(280px,70vw)] -translate-x-1/2 bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="text-center lg:col-span-5 lg:text-left">
              <div className="flex flex-col items-center gap-3 lg:items-start">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-kp-muted md:text-[11px]">
                  Restez en contact
                </p>
                <span
                  className="h-px w-12 bg-linear-to-r from-kp-gold/80 to-kp-gold/10 lg:w-16"
                  aria-hidden
                />
              </div>
              <h2
                id="kp-turn-heading"
                className="mt-5 font-serif text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-kp-accent">
                KPANDJI
                <span className="block text-white/88">vous écoute</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-kp-muted md:text-[15px] lg:mx-0 lg:max-w-none">
                Un conseiller peut vous rappeler pour répondre à vos questions sur la gamme,
                la disponibilité ou l&apos;entretien de votre véhicule.
              </p>
              <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left text-[13px] text-white/45 lg:mx-0 lg:max-w-none">
                <li className="flex items-center gap-3">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-kp-gold/70 shadow-[0_0_12px_rgba(201,169,98,0.35)]"
                    aria-hidden
                  />
                  Réponse personnalisée par notre équipe
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-kp-gold/70 shadow-[0_0_12px_rgba(201,169,98,0.35)]"
                    aria-hidden
                  />
                  Aucune newsletter automatique — uniquement votre demande
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div
                className="relative mx-auto max-w-xl lg:mx-0 lg:max-w-none"
                style={{
                  boxShadow:
                    "0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-[28px] bg-linear-to-br from-kp-gold/20 via-transparent to-white/4 opacity-70"
                />
                <div className="relative overflow-hidden rounded-[28px] border border-white/9 bg-black/35 p-6 backdrop-blur-md md:p-9 lg:p-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-[280px] rounded-full bg-kp-gold/6 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 -left-16 size-[240px] rounded-full bg-white/4 blur-3xl"
                  />

                  <p className="relative text-center font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 md:text-[11px] lg:text-left">
                    Votre message
                  </p>
                  <p className="relative mt-2 text-center font-serif text-xl text-kp-accent md:text-2xl lg:text-left">
                    Laissez-nous votre e-mail
                  </p>

                  {isSuccess ? (
                    <div
                      role="status"
                      className="relative mt-8 rounded-2xl border border-kp-gold/30 bg-kp-gold/8 px-6 py-8 text-center lg:text-left"
                    >
                      <p className="font-serif text-xl text-kp-accent">
                        Merci
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-white/50">
                        Nous avons bien enregistré votre e-mail et vous
                        recontacterons prochainement.
                      </p>
                    </div>
                  ) : null}

                  <form
                    onSubmit={handleSubmit}
                    className={`relative mt-8 space-y-4 ${isSuccess ? "hidden" : ""}`}
                    noValidate>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/12 sm:bg-black/50 sm:p-1.5 sm:pl-2 sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:backdrop-blur-sm">
                      <div className="min-w-0 flex-1 sm:pl-3">
                        <label
                          htmlFor="kp-contact-email"
                          className="mb-1.5 block text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white/35 sm:sr-only">
                          E-mail
                        </label>
                        <input
                          id="kp-contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(ev) => {
                            setEmail(ev.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="vous@exemple.com"
                          className="w-full rounded-full border border-white/14 bg-white/4 px-5 py-3.5 font-sans text-[15px] text-kp-accent placeholder:text-white/30 focus:border-kp-gold/50 focus:outline-none sm:border-0 sm:bg-transparent sm:px-3 sm:py-3 sm:placeholder:text-white/28"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="shrink-0 rounded-full bg-kp-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-[#d4b56e] disabled:cursor-not-allowed disabled:opacity-60 sm:px-9"
                        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                        {isSubmitting ? "Envoi…" : "Envoyer"}
                      </motion.button>
                    </div>

                    {error ? (
                      <p
                        role="alert"
                        className="text-center text-sm text-red-300/95 sm:text-left">
                        {error}
                      </p>
                    ) : null}

                    <p className="text-center text-[12px] leading-relaxed text-white/32 sm:text-left">
                      Vos informations ne sont utilisées que pour vous répondre.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
