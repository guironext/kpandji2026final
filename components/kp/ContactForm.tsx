"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "@/components/providers/KpLocaleProvider";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const inputClass =
  "w-full rounded-xl border border-white/[0.11] bg-black/40 px-4 py-3.5 font-sans text-[15px] text-kp-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)]";

const labelClass =
  "mb-2 block text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38";

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

export function ContactForm() {
  const { tr } = useLocale();
  const SUBJECT_PRESETS = [
    tr("Reserver un essai", "Book a test drive"),
    tr("Découvrir l'offre SIRA", "Discover the SIRA offer"),
    tr("Investir depuis l'étranger", "Invest from abroad"),
    tr("Demande d'information", "Request information"),
    tr("Contacter S.A.V", "Contact after-sales"),
    tr("Demande de devis", "Request a quote"),
  ] as const;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const subjectTrim = subject.trim();
    const messageTrim = message.trim();

    if (!nameTrim) {
      setError(tr("Indiquez votre nom.", "Please enter your name."));
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
    if (!subjectTrim) {
      setError(tr("Indiquez un sujet.", "Please enter a subject."));
      return;
    }
    if (!messageTrim) {
      setError(tr("Écrivez votre message.", "Please write your message."));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTrim,
          email: emailTrim,
          phone: phone.trim() || undefined,
          subject: subjectTrim,
          message: messageTrim,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(data?.error ?? tr("Une erreur est survenue. Réessayez plus tard.", "An error occurred. Please try again later."));
        return;
      }

      setIsSuccess(true);
    } catch {
      setError(tr("Impossible d'envoyer le message. Vérifiez votre connexion.", "Unable to send the message. Please check your connection."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="relative mx-auto max-w-xl lg:mx-0 lg:max-w-none"
      style={{
        boxShadow:
          "0 32px 100px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[32px] bg-linear-to-br from-kp-gold/25 via-kp-gold/5 to-white/5 opacity-80"
      />
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(165deg,rgba(20,20,20,0.92)_0%,rgba(8,8,8,0.88)_45%,rgba(5,5,5,0.94)_100%)] p-6 backdrop-blur-xl md:p-9 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-[320px] rounded-full bg-kp-gold/8 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-36 left-1/4 size-[280px] rounded-full bg-white/6 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
        />

        <div className="relative text-center lg:text-left">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-kp-gold/75 md:text-[11px]">
            {tr("Formulaire", "Form")}
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            {tr("Votre message", "Your message")}
          </p>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white/40 lg:mx-0">
            {tr(
              "Les champs marqués d’un astérisque sont obligatoires. Notre équipe vous répondra dans les meilleurs délais.",
              "Fields marked with an asterisk are required. Our team will respond as soon as possible."
            )}
          </p>
        </div>

        {isSuccess ? (
          <div
            role="status"
            className="relative mt-10 rounded-2xl border border-kp-gold/30 bg-kp-gold/8 px-6 py-10 text-center">
            <p className="font-serif text-2xl font-medium text-kp-accent">
              {tr("Message envoyé", "Message sent")}
            </p>
            <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/50">
              {tr(
                "Merci. Nous avons bien reçu votre message et vous recontacterons par e-mail ou téléphone.",
                "Thank you. We've received your message and will get back to you by email or phone."
              )}
            </p>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className={`relative mt-10 space-y-10 ${isSuccess ? "hidden" : ""}`}
          noValidate>
          <div>
            <SectionTitle>{tr("Identité & coordonnées", "Identity & contact details")}</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-contact-name" className={labelClass}>
                  {tr("Nom et prénom", "Full name")} <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-contact-name"
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="kp-contact-email-full" className={labelClass}>
                    {tr("E-mail", "Email")} <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-contact-email-full"
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
                <div>
                  <label htmlFor="kp-contact-phone" className={labelClass}>
                    {tr("Téléphone", "Phone")}
                    <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                      {tr("optionnel", "optional")}
                    </span>
                  </label>
                  <input
                    id="kp-contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder="+225 …"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>{tr("Message", "Message")}</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-contact-subject" className={labelClass}>
                  {tr("Sujet", "Subject")} <span className="text-kp-gold/90">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_PRESETS.map((preset) => {
                    const active = subject === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setSubject(preset);
                          if (error) setError(null);
                        }}
                        className={`rounded-full border px-3.5 py-2 font-sans text-[11px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 ${
                          active
                            ? "border-kp-gold/50 bg-kp-gold/15 text-kp-accent"
                            : "border-white/12 bg-white/3 text-white/50 hover:border-white/18 hover:bg-white/6 hover:text-white/75"
                        }`}>
                        {preset}
                      </button>
                    );
                  })}
                </div>
                <input
                  id="kp-contact-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(ev) => {
                    setSubject(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={tr("Choisissez une option ci-dessus Ou précisez votre sujet…", "Choose an option above or specify your subject…")}
                  className={`${inputClass} mt-3`}
                />
              </div>

              <div>
                <label htmlFor="kp-contact-message" className={labelClass}>
                  {tr("Votre texte", "Your message")} <span className="text-kp-gold/90">*</span>
                </label>
                <textarea
                  id="kp-contact-message"
                  name="message"
                  rows={7}
                  value={message}
                  onChange={(ev) => {
                    setMessage(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={tr("Décrivez votre demande : modèle souhaité, délai, questions…", "Describe your request: desired model, timeline, questions…")}
                  className={`${inputClass} min-h-[168px] resize-y`}
                />
              </div>
            </div>
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-red-400/25 bg-red-950/35 px-4 py-3 text-sm text-red-200/95">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="order-2 w-full rounded-full bg-kp-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-[transform,colors] duration-300 hover:scale-[1.02] hover:bg-[#d4b56e] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none sm:order-1 sm:w-auto">
              {isSubmitting ? tr("Envoi en cours…", "Sending…") : tr("Envoyer le message", "Send message")}
            </button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              {tr("Données utilisées uniquement pour vous répondre.", "Your data is only used to respond to you.")}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
