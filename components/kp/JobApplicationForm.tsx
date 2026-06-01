"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
      setError("Indiquez votre nom et prénom.");
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
    if (!positionTrim) {
      setError("Indiquez le poste visé ou précisez « Candidature spontanée ».");
      return;
    }
    if (!cvTrim) {
      setError("Rédigez une courte synthèse de votre CV (parcours et expériences clés).");
      return;
    }
    if (!skillsTrim) {
      setError("Listez vos compétences techniques et professionnelles.");
      return;
    }

    const mailSubject = encodeURIComponent(
      `[KPANDJI Automobiles — Candidature] ${positionTrim} — ${nameTrim}`
    );
    const lines = [
      "Bonjour,",
      "",
      "Je souhaite rejoindre l'équipe de Kpandji Automobiles. Voici les informations figurant aussi sur mon CV (pièce jointe à ajouter après ouverture de ce message).",
      "",
      "--- Coordonnées ---",
      `Nom complet : ${nameTrim}`,
      `E-mail : ${emailTrim}`,
    ];
    if (phone.trim()) {
      lines.push(`Téléphone : ${phone.trim()}`);
    }
    lines.push("");
    lines.push("--- Candidature ---");
    lines.push(`Poste visé : ${positionTrim}`);
    lines.push("");
    lines.push("Synthèse du CV (parcours & expériences) :");
    lines.push(cvTrim);
    lines.push("");
    lines.push("Compétences :");
    lines.push(skillsTrim);
    lines.push("");
    if (languages.trim()) {
      lines.push("Langues :");
      lines.push(languages.trim());
      lines.push("");
    }
    if (education.trim()) {
      lines.push("Formation & certifications :");
      lines.push(education.trim());
      lines.push("");
    }
    if (extras.trim()) {
      lines.push("Informations complémentaires :");
      lines.push(extras.trim());
      lines.push("");
    }
    lines.push("Cordialement,");

    const body = encodeURIComponent(lines.join("\n"));
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
            Candidature
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            Postuler chez Kpandji Automobiles
          </p>
          <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-white/40 lg:mx-0">
            Décrivez votre parcours et vos compétences. Le bouton final ouvre un brouillon
            e-mail&nbsp;: joignez-y votre CV au format PDF avant d&apos;envoyer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 space-y-10"
          noValidate>
          <div>
            <SectionTitle>Votre identité</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-cand-name" className={labelClass}>
                  Nom complet <span className="text-kp-gold/90">*</span>
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
                  placeholder="Prénom et nom"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="kp-cand-email" className={labelClass}>
                    E-mail <span className="text-kp-gold/90">*</span>
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
                    Téléphone
                    <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                      optionnel
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
            <SectionTitle>Poste & candidature</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-cand-position" className={labelClass}>
                  Poste visé <span className="text-kp-gold/90">*</span>
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
                  placeholder="Ex. Mécanicien, commercial SAV, logistique… ou « Candidature spontanée »"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>CV &amp; parcours</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-cand-cv" className={labelClass}>
                  Synthèse de votre CV <span className="text-kp-gold/90">*</span>
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
                  placeholder="Résumé de votre formation, années d&apos;expérience, derniers employeurs ou secteurs, réalisations marquantes…"
                  className={`${inputClass} min-h-[144px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-education" className={labelClass}>
                  Formation &amp; certifications
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    optionnel
                  </span>
                </label>
                <textarea
                  id="kp-cand-education"
                  name="education"
                  rows={3}
                  value={education}
                  onChange={(ev) => setEducation(ev.target.value)}
                  placeholder="Diplômes, habilitations, formations continues…"
                  className={`${inputClass} min-h-[88px] resize-y`}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>Compétences</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-cand-skills" className={labelClass}>
                  Compétences techniques &amp; métiers <span className="text-kp-gold/90">*</span>
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
                  placeholder="Listez vos savoir-faire (réparation véhicules, méthodes, ERP, CRM, gestion de stock, HSE…). Séparez par des virgules ou des lignes."
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-lang" className={labelClass}>
                  Langues
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    optionnel
                  </span>
                </label>
                <input
                  id="kp-cand-lang"
                  name="languages"
                  type="text"
                  value={languages}
                  onChange={(ev) => setLanguages(ev.target.value)}
                  placeholder="Ex. Français (natif), anglais (B2)…"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="kp-cand-extras" className={labelClass}>
                  Message complémentaire
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    optionnel
                  </span>
                </label>
                <textarea
                  id="kp-cand-extras"
                  name="extras"
                  rows={3}
                  value={extras}
                  onChange={(ev) => setExtras(ev.target.value)}
                  placeholder="Disponibilité, mobilité, permis de conduire, lien LinkedIn…"
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
              Ouvrir l&apos;e-mail
            </motion.button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              Destination :{" "}
              <span className="text-white/55">{EMPLOIS_EMAIL}</span>
              <br />
              Pensez à joindre votre CV en PDF après ouverture de la fenêtre mail.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
