"use client";

import { FormEvent, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MODELES } from "@/data/modeles";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const inputClass =
	"w-full rounded-xl border border-white/[0.11] bg-black/40 px-4 py-3.5 font-sans text-[15px] text-kp-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)]";

const labelClass =
	"mb-2 block text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38";

type EcrireSavModalProps = {
	triggerClassName: string;
	children: ReactNode;
};

export function EcrireSavModal({ triggerClassName, children }: EcrireSavModalProps) {
	const { tr } = useLocale();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [contact, setContact] = useState("");
	const [modeleVehicule, setModeleVehicule] = useState("");
	const [panne, setPanne] = useState("");
	const [localisation, setLocalisation] = useState("");
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

	function resetForm() {
		setName("");
		setContact("");
		setModeleVehicule("");
		setPanne("");
		setLocalisation("");
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		const nameTrim = name.trim();
		const contactTrim = contact.trim();
		const modeleTrim = modeleVehicule.trim();
		const panneTrim = panne.trim();
		const localisationTrim = localisation.trim();

		if (!nameTrim) {
			setError(tr("Indiquez votre nom.", "Please enter your name."));
			return;
		}
		if (!contactTrim) {
			setError(tr("Indiquez un moyen de contact (téléphone ou e-mail).", "Please provide a way to contact you (phone or email)."));
			return;
		}
		if (!modeleTrim) {
			setError(tr("Indiquez le modèle de votre véhicule.", "Please indicate your vehicle's model."));
			return;
		}
		if (!panneTrim) {
			setError(tr("Décrivez la panne ou le besoin.", "Please describe the issue or your need."));
			return;
		}
		if (!localisationTrim) {
			setError(tr("Indiquez votre localisation.", "Please indicate your location."));
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/ecrire-sav", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: nameTrim,
					contact: contactTrim,
					modeleVehicule: modeleTrim,
					panne: panneTrim,
					localisation: localisationTrim,
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
			resetForm();
		} catch {
			setError(tr("Impossible d'envoyer la demande. Vérifiez votre connexion.", "Unable to send the request. Please check your connection."));
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
				className={triggerClassName}
			>
				{children}
			</button>

			{open ? (
				<div
					className="fixed inset-0 z-80 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6 md:p-10"
					role="dialog"
					aria-modal="true"
					aria-labelledby="ecrire-sav-title"
					onClick={handleBackdropClick}
				>
					<div className="absolute inset-0 bg-black/82 backdrop-blur-md" aria-hidden />

					<div
						ref={panelRef}
						tabIndex={-1}
						className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-t-2xl border border-white/12 bg-[#080808] shadow-[0_32px_100px_rgba(0,0,0,0.65)] outline-none sm:rounded-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10 sm:py-6">
							<div>
								<p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-kp-gold/85">
									{tr("Service après vente", "After-sales service")}
								</p>
								<h2 id="ecrire-sav-title" className="mt-1 font-serif text-2xl text-white">
									{tr("Écrire au S.A.V.", "Write to after-sales")}
								</h2>
								<p className="mt-2 font-sans text-sm text-white/50">
									{tr("Décrivez votre besoin — notre équipe vous recontacte sous 24 h.", "Describe your need — our team will get back to you within 24 hours.")}
								</p>
							</div>
							<button
								type="button"
								onClick={close}
								className="shrink-0 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
								aria-label={tr("Fermer le formulaire", "Close the form")}
							>
								<span className="block text-2xl leading-none" aria-hidden>
									×
								</span>
							</button>
						</div>

						{isSuccess ? (
							<div
								role="status"
								className="px-6 py-10 text-center sm:px-10 sm:py-12"
							>
								<p className="font-serif text-2xl text-white">{tr("Demande envoyée", "Request sent")}</p>
								<p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/50">
									{tr(
										"Merci. Nous avons bien reçu votre demande et vous recontacterons dans les plus brefs délais.",
										"Thank you. We've received your request and will get back to you as soon as possible."
									)}
								</p>
								<button
									type="button"
									onClick={close}
									className="mt-8 rounded-full border border-white/15 px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/25 hover:text-white"
								>
									{tr("Fermer", "Close")}
								</button>
							</div>
						) : null}

						<form
							onSubmit={handleSubmit}
							className={`space-y-5 px-6 py-6 sm:space-y-6 sm:px-10 sm:py-8 ${isSuccess ? "hidden" : ""}`}
							noValidate
						>
							<div>
								<label htmlFor="ecrire-sav-name" className={labelClass}>
									{tr("Nom", "Name")} <span className="text-kp-gold/90">*</span>
								</label>
								<input
									id="ecrire-sav-name"
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

							<div>
								<label htmlFor="ecrire-sav-contact" className={labelClass}>
									{tr("Contact", "Contact")} <span className="text-kp-gold/90">*</span>
								</label>
								<input
									id="ecrire-sav-contact"
									name="contact"
									type="text"
									autoComplete="tel"
									value={contact}
									onChange={(ev) => {
										setContact(ev.target.value);
										if (error) setError(null);
									}}
									placeholder={tr("+225 07 … ou vous@exemple.com", "+225 07 … or you@example.com")}
									className={inputClass}
								/>
							</div>

							<div>
								<label htmlFor="ecrire-sav-modele" className={labelClass}>
									{tr("Modèle de véhicule", "Vehicle model")} <span className="text-kp-gold/90">*</span>
								</label>
								<select
									id="ecrire-sav-modele"
									name="modeleVehicule"
									value={modeleVehicule}
									onChange={(ev) => {
										setModeleVehicule(ev.target.value);
										if (error) setError(null);
									}}
									className={`${inputClass} cursor-pointer appearance-none bg-size-[1rem] bg-position-[right_1rem_center] bg-no-repeat pr-10 [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.45)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")]`}
								>
									<option value="" disabled>
										{tr("Sélectionnez un modèle", "Select a model")}
									</option>
									{MODELES.map((modele) => (
										<option key={modele.id} value={modele.name}>
											{modele.name}
										</option>
									))}
									<option value="Autre">{tr("Autre", "Other")}</option>
								</select>
							</div>

							<div>
								<label htmlFor="ecrire-sav-panne" className={labelClass}>
									{tr("Panne / besoin", "Issue / need")} <span className="text-kp-gold/90">*</span>
								</label>
								<textarea
									id="ecrire-sav-panne"
									name="panne"
									rows={3}
									value={panne}
									onChange={(ev) => {
										setPanne(ev.target.value);
										if (error) setError(null);
									}}
									placeholder={tr("Décrivez la panne ou le type d’intervention souhaitée…", "Describe the issue or the type of service you need…")}
									className={`${inputClass} resize-y min-h-[96px]`}
								/>
							</div>

							<div>
								<label htmlFor="ecrire-sav-localisation" className={labelClass}>
									{tr("Localisation", "Location")} <span className="text-kp-gold/90">*</span>
								</label>
								<input
									id="ecrire-sav-localisation"
									name="localisation"
									type="text"
									autoComplete="address-level2"
									value={localisation}
									onChange={(ev) => {
										setLocalisation(ev.target.value);
										if (error) setError(null);
									}}
									placeholder={tr("Abidjan, Cocody…", "Abidjan, Cocody…")}
									className={inputClass}
								/>
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
									{isSubmitting ? tr("Envoi en cours…", "Sending…") : tr("Envoyer la demande", "Send request")}
								</button>
								<p className="text-center text-[11px] leading-relaxed text-white/30 sm:text-right">
									{tr("Données utilisées uniquement pour vous recontacter.", "Your data is only used to get back to you.")}
								</p>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</>
	);
}
