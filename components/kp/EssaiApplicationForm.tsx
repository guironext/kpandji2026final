"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MODELES } from "@/data/modeles";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const TIME_PRESETS = [
  { fr: "Matin (9h – 12h)", en: "Morning (9am – 12pm)" },
  { fr: "Après-midi (14h – 17h)", en: "Afternoon (2pm – 5pm)" },
  { fr: "Fin de journée (17h – 18h)", en: "End of day (5pm – 6pm)" },
  { fr: "À convenir", en: "To be arranged" },
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

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function EssaiApplicationForm() {
  const { tr } = useLocale();
  const reduceMotion = useReducedMotion();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function toggleModel(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
    if (error) setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const phoneTrim = phone.trim();

    if (selectedIds.length === 0) {
      setError(tr("Sélectionnez au moins un modèle à essayer.", "Select at least one model to test drive."));
      return;
    }
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
    if (!phoneTrim) {
      setError(tr("Indiquez votre numéro de téléphone pour confirmer le rendez-vous.", "Please enter your phone number to confirm the appointment."));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/essai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelIds: selectedIds,
          name: nameTrim,
          email: emailTrim,
          phone: phoneTrim,
          preferredDate: preferredDate.trim() || undefined,
          timeSlot: timeSlot.trim() || undefined,
          message: message.trim() || undefined,
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
      setError(tr("Impossible d'envoyer la demande. Vérifiez votre connexion.", "Unable to send the request. Please check your connection."));
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

        <div className="relative text-center lg:text-left">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-kp-gold/75 md:text-[11px]">
            {tr("Demande d'essai", "Test drive request")}
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            {tr("Choisissez vos modèles", "Choose your models")}
          </p>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white/40 lg:mx-0">
            {tr(
              "Sélectionnez un ou plusieurs véhicules. Notre équipe vous recontactera pour confirmer votre essai.",
              "Select one or more vehicles. Our team will get back to you to confirm your test drive."
            )}
          </p>
        </div>

        {isSuccess ? (
          <div
            role="status"
            className="relative mt-10 rounded-2xl border border-kp-gold/30 bg-kp-gold/8 px-6 py-10 text-center">
            <p className="font-serif text-2xl font-medium text-kp-accent">
              {tr("Demande envoyée", "Request sent")}
            </p>
            <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/50">
              {tr(
                "Merci. Nous avons bien reçu votre demande d'essai et vous recontacterons par e-mail ou téléphone pour fixer le rendez-vous.",
                "Thank you. We've received your test drive request and will contact you by email or phone to arrange the appointment."
              )}
            </p>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className={`relative mt-10 space-y-10 ${isSuccess ? "hidden" : ""}`}
          noValidate>
          <div>
            <SectionTitle>{tr("Modèles à essayer", "Models to test drive")}</SectionTitle>
            <p className="mb-4 text-[12px] leading-relaxed text-white/35">
              {tr(
                "Choix multiple — vous pouvez comparer plusieurs modèles lors d'une même visite.",
                "Multiple choice — you can compare several models during the same visit."
              )}
            </p>
            <div
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              role="group"
              aria-label={tr("Modèles à essayer", "Models to test drive")}>
              {MODELES.map((modele) => {
                const selected = selectedIds.includes(modele.id);
                return (
                  <button
                    key={modele.id}
                    type="button"
                    onClick={() => toggleModel(modele.id)}
                    aria-pressed={selected}
                    className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 ${
                      selected
                        ? "border-kp-gold/55 bg-kp-gold/10 shadow-[0_0_0_1px_rgba(201,169,98,0.15)]"
                        : "border-white/10 bg-white/3 hover:border-white/18 hover:bg-white/5"
                    }`}>
                    <div className="relative aspect-16/10 w-full overflow-hidden">
                      <Image
                        src={modele.media.slideImage}
                        alt={modele.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                      <span
                        className={`absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded-full border transition-colors duration-200 ${
                          selected
                            ? "border-kp-gold bg-kp-gold text-black"
                            : "border-white/30 bg-black/40 text-transparent"
                        }`}>
                        <IconCheck className={selected ? "opacity-100" : "opacity-0"} />
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-kp-accent">
                        {modele.name}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/38">
                        {modele.characteristics[0]
                          ? tr(modele.characteristics[0].fr, modele.characteristics[0].en)
                          : ""}
                      </p>
                      <Link
                        href={`/modeles/${modele.id}`}
                        onClick={(ev) => ev.stopPropagation()}
                        className="mt-2 inline-block text-[10px] font-medium uppercase tracking-[0.16em] text-kp-gold/70 transition-colors hover:text-kp-gold">
                        {tr("Voir la fiche", "View spec sheet")} →
                      </Link>
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedIds.length > 0 ? (
              <p className="mt-3 text-[12px] text-kp-gold/80">
                {tr(
                  `${selectedIds.length} modèle${selectedIds.length > 1 ? "s" : ""} sélectionné${selectedIds.length > 1 ? "s" : ""}`,
                  `${selectedIds.length} model${selectedIds.length > 1 ? "s" : ""} selected`
                )}
              </p>
            ) : null}
          </div>

          <div>
            <SectionTitle>{tr("Identité & coordonnées", "Identity & contact details")}</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-essai-name" className={labelClass}>
                  {tr("Nom et prénom", "Full name")} <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-essai-name"
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
                  <label htmlFor="kp-essai-email" className={labelClass}>
                    {tr("E-mail", "Email")} <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-essai-email"
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
                  <label htmlFor="kp-essai-phone" className={labelClass}>
                    {tr("Téléphone", "Phone")} <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-essai-phone"
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
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>{tr("Disponibilités", "Availability")}</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-essai-date" className={labelClass}>
                  {tr("Date souhaitée", "Preferred date")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <input
                  id="kp-essai-date"
                  name="preferredDate"
                  type="date"
                  value={preferredDate}
                  onChange={(ev) => setPreferredDate(ev.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {tr("Créneau horaire", "Time slot")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIME_PRESETS.map((preset) => {
                    const label = tr(preset.fr, preset.en);
                    const active = timeSlot === label;
                    return (
                      <button
                        key={preset.fr}
                        type="button"
                        onClick={() =>
                          setTimeSlot((prev) => (prev === label ? "" : label))
                        }
                        className={`rounded-full border px-3.5 py-2 font-sans text-[11px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/45 ${
                          active
                            ? "border-kp-gold/50 bg-kp-gold/15 text-kp-accent"
                            : "border-white/12 bg-white/3 text-white/50 hover:border-white/18 hover:bg-white/6 hover:text-white/75"
                        }`}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="kp-essai-message" className={labelClass}>
                  {tr("Message", "Message")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <textarea
                  id="kp-essai-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  placeholder={tr(
                    "Précisions : lieu de rendez-vous, permis, questions…",
                    "Details: meeting location, driving licence, questions…"
                  )}
                  className={`${inputClass} min-h-[112px] resize-y`}
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
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="order-2 w-full rounded-full bg-kp-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-colors duration-300 hover:bg-[#d4b56e] disabled:cursor-not-allowed disabled:opacity-60 sm:order-1 sm:w-auto"
              whileHover={reduceMotion || isSubmitting ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion || isSubmitting ? undefined : { scale: 0.98 }}>
              {isSubmitting ? tr("Envoi en cours…", "Sending…") : tr("Demander un essai", "Request a test drive")}
            </motion.button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              {tr(
                "Notre équipe vous confirmera le créneau par retour d'e-mail ou téléphone.",
                "Our team will confirm the slot by email or phone."
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
