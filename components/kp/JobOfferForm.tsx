"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EMPLOIS_EMAIL = "contact@kpandji.com";

const CONTRACT_TYPES = [
  "CDI",
  "CDD",
  "Stage",
  "Alternance",
  "Freelance / mission",
  "Autre",
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

export function JobOfferForm() {
  const reduceMotion = useReducedMotion();
  const [title, setTitle] = useState("");
  const [contract, setContract] = useState<string>(CONTRACT_TYPES[0]);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState("");
  const [compensation, setCompensation] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const titleTrim = title.trim();
    const locationTrim = location.trim();
    const companyTrim = company.trim();
    const descriptionTrim = description.trim();
    const profileTrim = profile.trim();
    const nameTrim = contactName.trim();
    const emailTrim = contactEmail.trim();

    if (!titleTrim) {
      setError("Indiquez l’intitulé du poste.");
      return;
    }
    if (!locationTrim) {
      setError("Indiquez le lieu ou la localisation.");
      return;
    }
    if (!companyTrim) {
      setError("Indiquez le nom de l’entreprise ou de la structure.");
      return;
    }
    if (!descriptionTrim) {
      setError("Décrivez le poste et les missions.");
      return;
    }
    if (!profileTrim) {
      setError("Précisez le profil recherché.");
      return;
    }
    if (!nameTrim) {
      setError("Indiquez le nom du contact recrutement.");
      return;
    }
    if (!emailTrim) {
      setError("Indiquez l’e-mail professionnel du contact.");
      return;
    }
    if (!isValidEmail(emailTrim)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    const mailSubject = encodeURIComponent(
      `[KPANDJI — Offre d’emploi] ${titleTrim} — ${companyTrim}`
    );
    const lines = [
      "Bonjour,",
      "",
      "Publication d’une offre d’emploi via le site KPANDJI AUTOMOBILES.",
      "",
      "--- Fiche poste ---",
      `Intitulé : ${titleTrim}`,
      `Type de contrat : ${contract}`,
      `Lieu : ${locationTrim}`,
      `Structure : ${companyTrim}`,
      "",
      "Description & missions :",
      descriptionTrim,
      "",
      "Profil recherché :",
      profileTrim,
      "",
    ];
    const compTrim = compensation.trim();
    if (compTrim) {
      lines.push("Rémunération / avantages :");
      lines.push(compTrim);
      lines.push("");
    }
    lines.push("--- Contact recrutement ---");
    lines.push(`Nom : ${nameTrim}`);
    lines.push(`E-mail : ${emailTrim}`);
    if (contactPhone.trim()) {
      lines.push(`Téléphone : ${contactPhone.trim()}`);
    }

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
            Diffusion
          </p>
          <p className="mt-3 font-serif text-2xl font-medium tracking-[-0.02em] text-kp-accent md:text-[1.75rem]">
            Publier une offre d’emploi
          </p>
          <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-white/40 lg:mx-0">
            Renseignez les informations ci-dessous. L’envoi ouvre votre messagerie avec un
            brouillon destiné à notre équipe ; vous pourrez le relire avant de l’expédier.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 space-y-10"
          noValidate>
          <div>
            <SectionTitle>Le poste</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-job-title" className={labelClass}>
                  Intitulé du poste <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-job-title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(ev) => {
                    setTitle(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Ex. Technicien maintenance, Chargé de relation client…"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="kp-job-contract" className={labelClass}>
                    Type de contrat <span className="text-kp-gold/90">*</span>
                  </label>
                  <select
                    id="kp-job-contract"
                    name="contract"
                    value={contract}
                    onChange={(ev) => setContract(ev.target.value)}
                    className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2720%27%20height=%2720%27%20fill=%27none%27%20stroke=%27rgba(255,255,255,0.35)%27%20stroke-width=%271.5%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E')] bg-size-[1.1rem] bg-position-[right_0.85rem_center] bg-no-repeat pr-11`}>
                    {CONTRACT_TYPES.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900 text-kp-accent">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="kp-job-location" className={labelClass}>
                    Lieu <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-job-location"
                    name="location"
                    type="text"
                    value={location}
                    onChange={(ev) => {
                      setLocation(ev.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Ville, site, télétravail…"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="kp-job-company" className={labelClass}>
                  Entreprise / structure <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-job-company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={(ev) => {
                    setCompany(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Raison sociale ou nom du service"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>Contenu de l’offre</SectionTitle>
            <div className="space-y-4">
              <div>
                <label htmlFor="kp-job-description" className={labelClass}>
                  Description & missions <span className="text-kp-gold/90">*</span>
                </label>
                <textarea
                  id="kp-job-description"
                  name="description"
                  rows={6}
                  value={description}
                  onChange={(ev) => {
                    setDescription(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Contexte, responsabilités, environnement de travail…"
                  className={`${inputClass} min-h-[144px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-job-profile" className={labelClass}>
                  Profil recherché <span className="text-kp-gold/90">*</span>
                </label>
                <textarea
                  id="kp-job-profile"
                  name="profile"
                  rows={5}
                  value={profile}
                  onChange={(ev) => {
                    setProfile(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Formation, expérience, compétences, qualités…"
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="kp-job-compensation" className={labelClass}>
                  Rémunération & avantages
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                    optionnel
                  </span>
                </label>
                <textarea
                  id="kp-job-compensation"
                  name="compensation"
                  rows={3}
                  value={compensation}
                  onChange={(ev) => setCompensation(ev.target.value)}
                  placeholder="Fourchette, prime, véhicule, mutuelle…"
                  className={`${inputClass} min-h-[88px] resize-y`}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>Contact recrutement</SectionTitle>
            <div className="space-y-5">
              <div>
                <label htmlFor="kp-job-contact-name" className={labelClass}>
                  Nom du contact <span className="text-kp-gold/90">*</span>
                </label>
                <input
                  id="kp-job-contact-name"
                  name="contactName"
                  type="text"
                  autoComplete="name"
                  value={contactName}
                  onChange={(ev) => {
                    setContactName(ev.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Prénom et nom"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="kp-job-contact-email" className={labelClass}>
                    E-mail professionnel <span className="text-kp-gold/90">*</span>
                  </label>
                  <input
                    id="kp-job-contact-email"
                    name="contactEmail"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={contactEmail}
                    onChange={(ev) => {
                      setContactEmail(ev.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="recrutement@entreprise.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="kp-job-contact-phone" className={labelClass}>
                    Téléphone
                    <span className="ml-1.5 font-normal normal-case tracking-normal text-white/22">
                      optionnel
                    </span>
                  </label>
                  <input
                    id="kp-job-contact-phone"
                    name="contactPhone"
                    type="tel"
                    autoComplete="tel"
                    value={contactPhone}
                    onChange={(ev) => setContactPhone(ev.target.value)}
                    placeholder="+225 …"
                    className={inputClass}
                  />
                </div>
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
              Ouvrir l’e-mail
            </motion.button>
            <p className="order-1 max-w-xs text-center text-[11px] leading-relaxed text-white/30 sm:order-2 sm:text-right">
              Destination :{" "}
              <span className="text-white/55">{EMPLOIS_EMAIL}</span>
              <br />
              Les données servent uniquement à traiter votre demande de publication.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
