"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "contact@kpandji.com";

const SUBJECT_PRESETS = [
  "Demande d’information",
  "Essai ou visite",
  "Devis véhicule",
  "Service après-vente",
  "Partenariat",
] as const;

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const subjectTrim = subject.trim();
    const messageTrim = message.trim();

    if (!nameTrim) {
      setError("Indiquez votre nom.");
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
    if (!subjectTrim) {
      setError("Indiquez un sujet.");
      return;
    }
    if (!messageTrim) {
      setError("Écrivez votre message.");
      return;
    }

    const mailSubject = encodeURIComponent(`[Site KPANDJI] ${subjectTrim}`);
    const bodyLines = [
      "Bonjour,",
      "",
      messageTrim,
      "",
      "---",
      `Nom : ${nameTrim}`,
      `E-mail : ${emailTrim}`,
    ];
    if (phone.trim()) {
      bodyLines.push(`Téléphone : ${phone.trim()}`);
    }
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${body}`;
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
            Formulaire
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            Votre message
          </p>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white/40 lg:mx-0">
            Les champs marqués d’un astérisque sont obligatoires. L’envoi ouvre votre
            messagerie avec un brouillon prêt à partir.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 space-y-10"
          noValidate>
          <div>
            <SectionTitle>Identité & coordonnées</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-contact-name" className={labelClass}>
                  Nom et prénom <span className="text-kp-gold/90">*</span>
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
                    E-mail <span className="text-kp-gold/90">*</span>
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
                    Téléphone
                    <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                      optionnel
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
            <SectionTitle>Message</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-contact-subject" className={labelClass}>
                  Sujet <span className="text-kp-gold/90">*</span>
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
                  placeholder="Ou précisez votre sujet…"
                  className={`${inputClass} mt-3`}
                />
              </div>

              <div>
                <label htmlFor="kp-contact-message" className={labelClass}>
                  Votre texte <span className="text-kp-gold/90">*</span>
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
                  placeholder="Décrivez votre demande : modèle souhaité, délai, questions…"
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
              className="order-2 w-full rounded-full bg-kp-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-[transform,colors] duration-300 hover:scale-[1.02] hover:bg-[#d4b56e] active:scale-[0.98] motion-reduce:transform-none sm:order-1 sm:w-auto">
              Ouvrir l’e-mail
            </button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              Destination :{" "}
              <span className="text-white/55">{CONTACT_EMAIL}</span>
              <br />
              Données utilisées uniquement pour vous répondre.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
