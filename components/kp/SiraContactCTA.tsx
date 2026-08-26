"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const btnGold =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-kp-gold px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:min-h-11 sm:w-auto sm:px-8";

const inputClass =
  "w-full min-h-14 rounded-xl border border-white/[0.11] bg-black/40 px-5 py-4 font-sans text-[17px] leading-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/35 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)] sm:min-h-16 sm:text-[18px]";

const labelClass =
  "mb-2.5 block text-left text-[12px] font-semibold uppercase tracking-[0.2em] text-white/65";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function SiraContactCTA() {
  const { tr } = useLocale();
  const [mounted, setMounted] = useState(false);
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

  const resetForm = useCallback(() => {
    setName("");
    setCountry("");
    setCity("");
    setPhone("");
    setEmail("");
    setError(null);
    setIsSuccess(false);
  }, []);

  const openModal = useCallback(() => {
    resetForm();
    setOpen(true);
  }, [resetForm]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setError(tr("Indiquez votre nom.", "Please enter your name."));
      return;
    }
    if (!countryTrim) {
      setError(tr("Indiquez votre pays de résidence.", "Please enter your country of residence."));
      return;
    }
    if (!cityTrim) {
      setError(tr("Indiquez votre ville.", "Please enter your city."));
      return;
    }
    if (!phoneTrim) {
      setError(tr("Indiquez votre numéro de téléphone.", "Please enter your phone number."));
      return;
    }
    if (!emailTrim) {
      setError(tr("Indiquez votre adresse e-mail.", "Please enter your email address."));
      return;
    }
    if (!isValidEmail(emailTrim)) {
      setError(tr("Adresse e-mail invalide.", "Invalid email address."));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sira-contact", {
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
        setError(
          data?.error ??
            tr("Une erreur est survenue. Réessayez plus tard.", "An error occurred. Please try again later.")
        );
        return;
      }

      setIsSuccess(true);
    } catch {
      setError(
        tr(
          "Impossible d'envoyer la demande. Vérifiez votre connexion.",
          "Unable to send the request. Please check your connection."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-stretch justify-center sm:items-center sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sira-contact-title"
            onClick={handleBackdropClick}
          >
            <div className="absolute inset-0 bg-black/88 backdrop-blur-md" aria-hidden />

            <div
              ref={panelRef}
              tabIndex={-1}
              className="relative z-10 flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden border-white/12 bg-[#080808] shadow-[0_32px_100px_rgba(0,0,0,0.65)] outline-none sm:h-auto sm:max-h-[min(92dvh,880px)] sm:min-h-[min(82dvh,720px)] sm:rounded-2xl sm:border"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-kp-gold/10 blur-3xl"
              />

              <div className="relative flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
                <div>
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-kp-gold">
                    Kpandji Sira
                  </p>
                  <h2
                    id="sira-contact-title"
                    className="mt-2 font-serif text-[1.85rem] leading-tight text-white sm:text-[2.35rem]"
                  >
                    {tr("M'inscrire au projet", "Submit to the project")}
                  </h2>
                  <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
                    {tr(
                      "Laissez vos coordonnées — un conseiller flotte vous recontacte pour construire votre offre.",
                      "Leave your details — a fleet advisor will get back to you to build your offer."
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label={tr("Fermer le formulaire", "Close the form")}
                >
                  <span className="block text-3xl leading-none" aria-hidden>
                    ×
                  </span>
                </button>
              </div>

              {isSuccess ? (
                <div
                  role="status"
                  className="relative flex flex-1 flex-col items-center justify-center px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-14"
                >
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-kp-gold/35 bg-kp-gold/10 text-kp-gold">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="size-7"
                      aria-hidden
                    >
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mt-6 font-serif text-[1.85rem] text-white sm:text-[2.2rem]">
                    {tr("Inscription envoyée", "Registration sent")}
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/65 sm:text-[18px]">
                    {tr(
                      "Merci. Nous avons bien reçu vos coordonnées et un conseiller Sira vous recontactera rapidement.",
                      "Thank you. We've received your details and a Sira advisor will contact you shortly."
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-10 rounded-full border border-white/15 px-10 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white/75 transition hover:border-white/25 hover:text-white"
                  >
                    {tr("Fermer", "Close")}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-7 sm:px-10 sm:py-9 lg:px-14"
                  noValidate
                >
                  <div className="flex flex-1 flex-col justify-center gap-7 sm:gap-8">
                    <div>
                      <label htmlFor="sira-contact-name" className={labelClass}>
                        {tr("Nom", "Name")} <span className="text-kp-gold">*</span>
                      </label>
                      <input
                        id="sira-contact-name"
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

                    <div className="grid gap-7 md:grid-cols-2 md:gap-6">
                      <div>
                        <label htmlFor="sira-contact-country" className={labelClass}>
                          {tr("Pays de résidence", "Country of residence")}{" "}
                          <span className="text-kp-gold">*</span>
                        </label>
                        <input
                          id="sira-contact-country"
                          name="country"
                          type="text"
                          autoComplete="country-name"
                          value={country}
                          onChange={(ev) => {
                            setCountry(ev.target.value);
                            if (error) setError(null);
                          }}
                          placeholder={tr("Côte d'Ivoire, France…", "Côte d'Ivoire, France…")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="sira-contact-city" className={labelClass}>
                          {tr("Ville", "City")} <span className="text-kp-gold">*</span>
                        </label>
                        <input
                          id="sira-contact-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          value={city}
                          onChange={(ev) => {
                            setCity(ev.target.value);
                            if (error) setError(null);
                          }}
                          placeholder={tr("Abidjan, Paris…", "Abidjan, Paris…")}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-7 md:grid-cols-2 md:gap-6">
                      <div>
                        <label htmlFor="sira-contact-phone" className={labelClass}>
                          {tr("Téléphone", "Phone")} <span className="text-kp-gold">*</span>
                        </label>
                        <input
                          id="sira-contact-phone"
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
                        <label htmlFor="sira-contact-email" className={labelClass}>
                          {tr("E-mail", "Email")} <span className="text-kp-gold">*</span>
                        </label>
                        <input
                          id="sira-contact-email"
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
                        className="rounded-xl border border-red-400/25 bg-red-950/35 px-5 py-4 text-[15px] text-red-200/95"
                      >
                        {error}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.07] pt-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-14 w-full rounded-full bg-kp-gold px-10 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-colors duration-300 hover:bg-[#d4b56e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {isSubmitting
                        ? tr("Envoi en cours…", "Sending…")
                        : tr("Envoyer mon inscription", "Send my registration")}
                    </button>
                    <p className="text-center text-[13px] leading-relaxed text-white/40 sm:text-right">
                      {tr(
                        "Données utilisées uniquement pour vous recontacter.",
                        "Your data is only used to get back to you."
                      )}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button type="button" onClick={openModal} className={btnGold}>
        <span>{tr("M'inscrire au projet", "Submit to the project")}</span>
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
      {dialog}
    </>
  );
}
