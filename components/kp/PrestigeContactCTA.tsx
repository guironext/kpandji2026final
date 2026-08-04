"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const inputClass =
  "w-full rounded-xl border border-white/[0.11] bg-black/40 px-4 py-3.5 font-sans text-[15px] text-kp-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)]";

const labelClass =
  "mb-2 block text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function PrestigeContactCTA() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panelRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = name.trim();
    const countryTrim = country.trim();
    const cityTrim = city.trim();
    const phoneTrim = phone.trim();
    const emailTrim = email.trim();

    if (!nameTrim) {
      setError("Indiquez votre nom.");
      return;
    }
    if (!countryTrim) {
      setError("Indiquez votre pays de résidence.");
      return;
    }
    if (!cityTrim) {
      setError("Indiquez votre ville.");
      return;
    }
    if (!phoneTrim) {
      setError("Indiquez votre numéro de téléphone.");
      return;
    }
    if (!emailTrim) {
      setError("Indiquez votre adresse e-mail.");
      return;
    }
    if (!isValidEmail(emailTrim)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/privilege-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTrim,
          country: countryTrim,
          city: cityTrim,
          phone: phoneTrim,
          email: emailTrim,
        }),
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
      setError("Impossible d'envoyer la demande. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setIsSuccess(false);
          setError(null);
        }}
        className={`${btnPrimary} w-full sm:w-auto`}
      >
        <span>Nous contacter</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-80 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="prestige-contact-title"
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 bg-black/82 backdrop-blur-md" aria-hidden />

          <div
            ref={panelRef}
            tabIndex={-1}
            className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-t-2xl border border-white/12 bg-[#080808] shadow-[0_32px_100px_rgba(0,0,0,0.65)] outline-none sm:rounded-2xl lg:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10 sm:py-6 lg:px-12">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/85">
                  Kpandji Privilège
                </p>
                <h2 id="prestige-contact-title" className="mt-1 font-serif text-2xl text-white">
                  Nous contacter
                </h2>
                <p className="mt-2 font-sans text-sm text-white/50">
                  Renseignez vos coordonnées — notre équipe vous recontacte depuis l’étranger.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Fermer le formulaire"
              >
                <span className="block text-2xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>

            {isSuccess ? (
              <div
                role="status"
                className="px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-12"
              >
                <p className="font-serif text-2xl text-white">Demande envoyée</p>
                <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/50">
                  Merci. Nous avons bien reçu vos coordonnées et vous recontacterons
                  depuis l&apos;étranger.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 rounded-full border border-white/15 px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/25 hover:text-white"
                >
                  Fermer
                </button>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className={`space-y-5 px-6 py-6 sm:space-y-6 sm:px-10 sm:py-8 lg:px-12 ${isSuccess ? "hidden" : ""}`}
              noValidate
            >
              <div>
                <label htmlFor="prestige-contact-name" className={labelClass}>
                  Nom <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="prestige-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(ev) => {
                    setName(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Jean Kouassi"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="prestige-contact-country" className={labelClass}>
                    Pays de résidence <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="prestige-contact-country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={country}
                    onChange={(ev) => {
                      setCountry(ev.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="France, USA, Canada…"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="prestige-contact-city" className={labelClass}>
                    Ville <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="prestige-contact-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(ev) => {
                      setCity(ev.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Paris, Montréal…"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="prestige-contact-phone" className={labelClass}>
                    Téléphone <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="prestige-contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(ev) => {
                      setPhone(ev.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="+33 …"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="prestige-contact-email" className={labelClass}>
                    E-mail <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="prestige-contact-email"
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
                    className={inputClass}
                  />
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

              <div className="flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-kp-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-colors duration-300 hover:bg-[#d4b56e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer la demande"}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-white/30 sm:text-right">
                  Données utilisées uniquement pour vous recontacter.
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
