"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const EMPLOIS_EMAIL = "contact@kpandji.com";

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

export function JobApplicationForm() {
  const { tr } = useLocale();
  const reduceMotion = useReducedMotion();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [positionTarget, setPositionTarget] = useState("");
  const [cvSummary, setCvSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [education, setEducation] = useState("");
  const [extras, setExtras] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nameTrim = fullName.trim();
    const emailTrim = email.trim();
    const positionTrim = positionTarget.trim();
    const cvTrim = cvSummary.trim();
    const skillsTrim = skills.trim();

    if (!nameTrim) {
      setError(tr("Indiquez votre nom et prénom.", "Please enter your full name."));
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
    if (!positionTrim) {
      setError(tr("Indiquez le poste visé ou précisez « Candidature spontanée ».", "Please indicate the target position or specify \"Open application\"."));
      return;
    }
    if (!cvTrim) {
      setError(tr("Rédigez une courte synthèse de votre CV (parcours et expériences clés).", "Please write a short summary of your résumé (background and key experience)."));
      return;
    }
    if (!skillsTrim) {
      setError(tr("Listez vos compétences techniques et professionnelles.", "Please list your technical and professional skills."));
      return;
    }

    const mailSubject = encodeURIComponent(
      tr(
        `[KPANDJI Automobiles — Candidature] ${positionTrim} — ${nameTrim}`,
        `[KPANDJI Automobiles — Application] ${positionTrim} — ${nameTrim}`
      )
    );
    const lines = tr(
      [
        "Bonjour,",
        "",
        "Je souhaite rejoindre l'équipe de Kpandji Automobiles. Voici les informations figurant aussi sur mon CV (pièce jointe à ajouter après ouverture de ce message).",
        "",
        "--- Coordonnées ---",
        `Nom complet : ${nameTrim}`,
        `E-mail : ${emailTrim}`,
        ...(phone.trim() ? [`Téléphone : ${phone.trim()}`] : []),
        "",
        "--- Candidature ---",
        `Poste visé : ${positionTrim}`,
        "",
        "Synthèse du CV (parcours & expériences) :",
        cvTrim,
        "",
        "Compétences :",
        skillsTrim,
        "",
        ...(languages.trim() ? ["Langues :", languages.trim(), ""] : []),
        ...(education.trim() ? ["Formation & certifications :", education.trim(), ""] : []),
        ...(extras.trim() ? ["Informations complémentaires :", extras.trim(), ""] : []),
        "Cordialement,",
      ].join("\n"),
      [
        "Hello,",
        "",
        "I would like to join the Kpandji Automobiles team. Below is the information also included in my résumé (attachment to add after opening this message).",
        "",
        "--- Contact details ---",
        `Full name: ${nameTrim}`,
        `Email: ${emailTrim}`,
        ...(phone.trim() ? [`Phone: ${phone.trim()}`] : []),
        "",
        "--- Application ---",
        `Target position: ${positionTrim}`,
        "",
        "Résumé summary (background & experience):",
        cvTrim,
        "",
        "Skills:",
        skillsTrim,
        "",
        ...(languages.trim() ? ["Languages:", languages.trim(), ""] : []),
        ...(education.trim() ? ["Education & certifications:", education.trim(), ""] : []),
        ...(extras.trim() ? ["Additional information:", extras.trim(), ""] : []),
        "Best regards,",
      ].join("\n")
    );

    const body = encodeURIComponent(lines);
    window.location.href = `mailto:${EMPLOIS_EMAIL}?subject=${mailSubject}&body=${body}`;
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
            {tr("Candidature", "Application")}
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            {tr("Postuler chez Kpandji Automobiles", "Apply at Kpandji Automobiles")}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-white/40 lg:mx-0">
            {tr(
              "Décrivez votre parcours et vos compétences. Le bouton final ouvre un brouillon e-mail : joignez-y votre CV au format PDF avant d'envoyer.",
              "Describe your background and skills. The final button opens an email draft: attach your résumé as a PDF before sending."
            )}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 space-y-10"
          noValidate>
          <div>
            <SectionTitle>{tr("Votre identité", "Your identity")}</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-cand-name" className={labelClass}>
                  {tr("Nom complet", "Full name")} <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-cand-name"
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
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="kp-cand-email" className={labelClass}>
                    {tr("E-mail", "Email")} <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-cand-email"
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
                  <label htmlFor="kp-cand-phone" className={labelClass}>
                    {tr("Téléphone", "Phone")}
                    <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                      {tr("optionnel", "optional")}
                    </span>
                  </label>
                  <input
                    id="kp-cand-phone"
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
            <SectionTitle>{tr("Poste & candidature", "Position & application")}</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-cand-position" className={labelClass}>
                  {tr("Poste visé", "Target position")} <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-cand-position"
                  name="positionTarget"
                  type="text"
                  value={positionTarget}
                  onChange={(ev) => {
                    setPositionTarget(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={tr(
                    "Ex. Mécanicien, commercial SAV, logistique… ou « Candidature spontanée »",
                    "E.g. Mechanic, after-sales sales rep, logistics… or \"Open application\""
                  )}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>{tr("CV & parcours", "Résumé & background")}</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-cand-cv" className={labelClass}>
                  {tr("Synthèse de votre CV", "Résumé summary")} <span className="text-kp-gold/90">*</span>
                </label>
                <textarea
                  id="kp-cand-cv"
                  name="cvSummary"
                  rows={6}
                  value={cvSummary}
                  onChange={(ev) => {
                    setCvSummary(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={tr(
                    "Résumé de votre formation, années d'expérience, derniers employeurs ou secteurs, réalisations marquantes…",
                    "Summary of your education, years of experience, recent employers or industries, notable achievements…"
                  )}
                  className={`${inputClass} min-h-[144px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-education" className={labelClass}>
                  {tr("Formation & certifications", "Education & certifications")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <textarea
                  id="kp-cand-education"
                  name="education"
                  rows={3}
                  value={education}
                  onChange={(ev) => setEducation(ev.target.value)}
                  placeholder={tr("Diplômes, habilitations, formations continues…", "Degrees, certifications, continuing education…")}
                  className={`${inputClass} min-h-[88px] resize-y`}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>{tr("Compétences", "Skills")}</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-cand-skills" className={labelClass}>
                  {tr("Compétences techniques & métiers", "Technical & professional skills")} <span className="text-kp-gold/90">*</span>
                </label>
                <textarea
                  id="kp-cand-skills"
                  name="skills"
                  rows={5}
                  value={skills}
                  onChange={(ev) => {
                    setSkills(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={tr(
                    "Listez vos savoir-faire (réparation véhicules, méthodes, ERP, CRM, gestion de stock, HSE…). Séparez par des virgules ou des lignes.",
                    "List your skills (vehicle repair, methods, ERP, CRM, inventory management, HSE…). Separate with commas or line breaks."
                  )}
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-lang" className={labelClass}>
                  {tr("Langues", "Languages")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <input
                  id="kp-cand-lang"
                  name="languages"
                  type="text"
                  value={languages}
                  onChange={(ev) => setLanguages(ev.target.value)}
                  placeholder={tr("Ex. Français (natif), anglais (B2)…", "E.g. French (native), English (B2)…")}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-extras" className={labelClass}>
                  {tr("Message complémentaire", "Additional message")}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    {tr("optionnel", "optional")}
                  </span>
                </label>
                <textarea
                  id="kp-cand-extras"
                  name="extras"
                  rows={3}
                  value={extras}
                  onChange={(ev) => setExtras(ev.target.value)}
                  placeholder={tr("Disponibilité, mobilité, permis de conduire, lien LinkedIn…", "Availability, mobility, driver's license, LinkedIn link…")}
                  className={`${inputClass} min-h-[88px] resize-y`}
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
              className="order-2 w-full rounded-full bg-kp-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-colors duration-300 hover:bg-[#d4b56e] sm:order-1 sm:w-auto"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              {tr("Ouvrir l'e-mail", "Open the email")}
            </motion.button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              {tr("Destination", "Destination")} :{" "}
              <span className="text-white/55">{EMPLOIS_EMAIL}</span>
              <br />
              {tr(
                "Pensez à joindre votre CV en PDF après ouverture de la fenêtre mail.",
                "Remember to attach your résumé as a PDF after the mail window opens."
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
