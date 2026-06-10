"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EcrireSavModal } from "@/components/kp/EcrireSavModal";
import { Reveal } from "@/components/kp/Reveal";

const easeOut = [0.22, 1, 0.36, 1] as const;

const pageMax = "mx-auto w-full max-w-[1680px]";
const sectionPad = `${pageMax} px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28 xl:px-16`;

const eyebrow =
	"inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-kp-gold/95";

const sectionTitle =
	"font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.1] tracking-tight text-white";

const btnPrimary =
	"inline-flex min-h-11 items-center justify-center rounded-full bg-kp-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition duration-300 hover:bg-[#d4b56e] hover:shadow-[0_16px_48px_-10px_rgba(201,169,98,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const btnGhost =
	"inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 bg-white/[0.07] px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition duration-300 hover:border-white/55 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55";

const heroLine = (reduce: boolean) => ({
	hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: reduce ? 0 : 0.78, ease: easeOut },
	},
});

const heroContentContainer = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08, delayChildren: 0.04 },
	},
};

const pillarItem = (reduce: boolean) => ({
	hidden: reduce
		? { opacity: 1, y: 0, scale: 1 }
		: { opacity: 0, y: 18, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: reduce ? 0 : 0.65, ease: easeOut },
	},
});

const pillarsContainer = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08, delayChildren: 0.06 },
	},
};

const garageImages = [
	{
		src: "/garage5.jpeg",
		alt: "Atelier KPANDJI — espace d’entretien et de réparation",
		tag: "01 — Réception",
		title: "Réception & diagnostic",
		body: "Accueil, écoute et premier diagnostic pour cadrer chaque intervention.",
		featured: true,
	},
	{
		src: "/garage2.jpg",
		alt: "Atelier KPANDJI — zone technique",
		tag: "02 — Technique",
		title: "Zone technique",
		body: "Outillage professionnel et procédures constructeur.",
		featured: false,
	},
	{
		src: "/garage3.jpg",
		alt: "Atelier KPANDJI — service après vente",
		tag: "03 — Qualité",
		title: "Contrôle qualité",
		body: "Vérification systématique avant restitution du véhicule.",
		featured: false,
	},
] as const;

const pillars = [
	{
		title: "Diagnostic transparent",
		description: "Évaluation claire, devis détaillé et validation avant intervention.",
		icon: (
			<>
				<circle cx="12" cy="12" r="9" />
				<path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
			</>
		),
	},
	{
		title: "Pièces d’origine",
		description: "Qualité constructeur pour préserver fiabilité, sécurité et valeur.",
		icon: (
			<>
				<path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" strokeLinejoin="round" />
			</>
		),
	},
	{
		title: "Techniciens qualifiés",
		description: "Procédures maîtrisées, outillage adapté et contrôle systématique.",
		icon: (
			<>
				<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinejoin="round" />
			</>
		),
	},
	{
		title: "Suivi & garantie",
		description: "Traçabilité des opérations et conseils d’entretien personnalisés.",
		icon: (
			<>
				<path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinejoin="round" />
			</>
		),
	},
] as const;

const services = [
	{
		title: "Entretien périodique",
		body: "Révisions, vidanges et contrôles selon les préconisations constructeur.",
	},
	{
		title: "Réparation mécanique",
		body: "Diagnostic précis et remise en état avec pièces certifiées KPANDJI.",
	},
	{
		title: "Carrosserie & esthétique",
		body: "Finitions, retouches et soins pour préserver l’aspect de votre véhicule.",
	},
	{
		title: "Diagnostic électronique",
		body: "Lecture des systèmes embarqués et résolution des alertes techniques.",
	},
] as const;

const steps = [
	{
		num: "01",
		title: "Prise de contact",
		body: "Par téléphone ou e-mail : décrivez votre besoin, nous planifions la suite.",
	},
	{
		num: "02",
		title: "Diagnostic & devis",
		body: "Inspection en atelier, devis transparent et validation avant travaux.",
	},
	{
		num: "03",
		title: "Intervention",
		body: "Réparation ou entretien réalisé par nos techniciens selon les standards KPANDJI.",
	},
	{
		num: "04",
		title: "Restitution",
		body: "Contrôle final, conseils d’entretien et traçabilité des opérations effectuées.",
	},
] as const;

const stats = [
	{ value: "3", label: "Zones atelier" },
	{ value: "100%", label: "Pièces d’origine" },
	{ value: "CI", label: "Ancrage local" },
	{ value: "24h", label: "Réponse S.A.V." },
] as const;

const marqueeValues = [
	"Entretien constructeur",
	"Pièces d’origine",
	"Techniciens certifiés",
	"Côte d’Ivoire",
	"Diagnostic transparent",
	"Garantie KPANDJI",
	"Atelier équipé",
	"Suivi personnalisé",
] as const;

const SAV_PHONE = "+225 07 07 20 19 92";
const SAV_TEL = "+2250707201992";

function SectionIntro({
	label,
	title,
	titleId,
	description,
	centered = true,
}: {
	label: string;
	title: ReactNode;
	titleId?: string;
	description: string;
	centered?: boolean;
}) {
	const align = centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl";
	const eyebrowClass = centered ? `${eyebrow} justify-center` : eyebrow;

	return (
		<div className={align}>
			<p className={eyebrowClass}>
				<span aria-hidden className="h-px w-8 bg-kp-gold/60" />
				{label}
				<span aria-hidden className="h-px w-8 bg-kp-gold/60" />
			</p>
			<h2 id={titleId} className={`mt-5 ${sectionTitle}`}>
				{title}
			</h2>
			<p className="mx-auto mt-5 max-w-2xl text-pretty text-[14px] leading-relaxed text-white/55 md:text-[15px]">
				{description}
			</p>
		</div>
	);
}

function MarqueeStrip() {
	const items = [...marqueeValues, ...marqueeValues];

	return (
		<div
			className="relative overflow-hidden border-y border-white/8 bg-kp-surface/60 py-4"
			aria-hidden
		>
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-kp-surface/90 to-transparent sm:w-24" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-kp-surface/90 to-transparent sm:w-24" />
			<div className="kp-marquee-track flex w-max gap-10 whitespace-nowrap px-4">
				{items.map((value, i) => (
					<span
						key={`${value}-${i}`}
						className="inline-flex items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35"
					>
						{value}
						<span className="size-1 rounded-full bg-kp-gold/45" />
					</span>
				))}
			</div>
		</div>
	);
}

export function ServiceApresVente() {
	const reduce = useReducedMotion() === true;
	const [main, ...secondaryImages] = garageImages;

	return (
		<div className="relative">
			{/* Hero */}
			<section
				className="relative flex min-h-[min(72vh,760px)] flex-col justify-end overflow-hidden ring-1 ring-inset ring-white/10"
				aria-labelledby="sav-title"
			>
				<div className="absolute inset-0 z-0">
					<div className="relative h-full min-h-[min(72vh,760px)] w-full overflow-hidden">
						<Image
							src={main.src}
							alt=""
							fill
							priority
							fetchPriority="high"
							sizes="100vw"
							quality={70}
							className="object-cover object-center scale-105"
							aria-hidden
						/>
					</div>
					<div
						className="absolute inset-0 bg-[radial-gradient(900px_700px_at_80%_60%,transparent_38%,rgba(0,0,0,0.72)_100%),radial-gradient(980px_520px_at_12%_18%,rgba(201,169,98,0.22),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.25),rgba(0,0,0,0.95))]"
						aria-hidden
					/>
					<div className="kp-grain absolute inset-0 opacity-[0.18] md:opacity-[0.22]" aria-hidden />
				</div>

				<motion.div
					className="relative z-10 mx-auto w-full max-w-[1680px] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32 lg:pb-24"
					initial="hidden"
					animate="visible"
					variants={heroContentContainer}
				>
					<div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-20">
						<div className="max-w-2xl">
							<motion.div className="flex items-center gap-3" aria-hidden variants={heroLine(reduce)}>
								<span className="block h-px w-12 origin-right bg-linear-to-r from-transparent to-kp-gold/75 md:w-16" />
								<span className="size-1.5 rotate-45 rounded-[2px] bg-kp-gold/90 shadow-[0_0_12px_rgba(201,169,98,0.45)]" />
								<span className="block h-px w-12 origin-left bg-linear-to-l from-transparent to-kp-gold/75 md:w-16" />
							</motion.div>
							<motion.p
								className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-white/60 md:text-[11px]"
								variants={heroLine(reduce)}
							>
								KPANDJI AUTOMOBILES
							</motion.p>
							<motion.h1
								id="sav-title"
								className="mt-3 max-w-[14ch] font-serif text-[clamp(2.35rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.35)] md:max-w-[18ch]"
								variants={heroLine(reduce)}
							>
								Service après vente
							</motion.h1>
							<motion.p
								className="mt-5 max-w-lg text-pretty text-[15px] leading-[1.65] text-white/80 md:text-base md:leading-relaxed"
								variants={heroLine(reduce)}
							>
								Entretien, pièces d’origine et suivi personnalisé — un atelier équipé et des
								techniciens formés pour préserver performances, sécurité et valeur de votre véhicule.
							</motion.p>
							<motion.div
								className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
								variants={heroLine(reduce)}
							>
								<motion.a
									href={`tel:${SAV_TEL}`}
									className={btnPrimary}
									whileHover={reduce ? undefined : { scale: 1.03 }}
									whileTap={reduce ? undefined : { scale: 0.98 }}
								>
									Appeler le S.A.V.
								</motion.a>
								<motion.a
									href="#sav-atelier"
									className={btnGhost}
									whileHover={reduce ? undefined : { scale: 1.03 }}
									whileTap={reduce ? undefined : { scale: 0.98 }}
								>
									Découvrir l’atelier
								</motion.a>
							</motion.div>
						</div>

						<motion.aside
							className="rounded-2xl border border-white/12 bg-black/45 p-6 shadow-[0_28px_80px_-32px_rgba(0,0,0,0.9)] ring-1 ring-white/8 backdrop-blur-xl sm:p-7 lg:mb-2"
							variants={heroLine(reduce)}
						>
							<p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-kp-gold/90">
								Accès direct
							</p>
							<p className="mt-4 font-serif text-2xl tracking-tight text-white md:text-[1.65rem]">
								Une équipe dédiée à votre véhicule
							</p>
							<ul className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6">
								<li>
									<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
										Ligne S.A.V.
									</p>
									<a
										href={`tel:${SAV_TEL}`}
										className="mt-1.5 inline-block font-sans text-[15px] text-white/90 transition hover:text-kp-gold"
									>
										{SAV_PHONE}
									</a>
								</li>
								<li>
									<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
										E-mail
									</p>
									<a
										href="mailto:contact@kpandji.com?subject=Service%20apr%C3%A8s%20vente"
										className="mt-1.5 inline-block font-sans text-[15px] text-white/90 transition hover:text-kp-gold"
									>
										contact@kpandji.com
									</a>
								</li>
							</ul>
							<div className="mt-6 grid grid-cols-2 gap-3">
								{stats.map((stat) => (
									<div
										key={stat.label}
										className="rounded-xl border border-white/8 bg-white/4 px-3 py-3 text-center"
									>
										<p className="font-serif text-xl text-kp-gold md:text-2xl">{stat.value}</p>
										<p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</motion.aside>
					</div>
				</motion.div>
			</section>

			<MarqueeStrip />

			{/* Pillars */}
			<section
				className="relative overflow-hidden border-b border-white/8 bg-kp-surface/40 [content-visibility:auto] [contain-intrinsic-size:auto_640px]"
				aria-label="Axes du service après vente"
			>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(201,169,98,0.07),transparent_58%)]"
					aria-hidden
				/>
				<div className={sectionPad}>
					<Reveal from="bottom">
						<SectionIntro
							label="Notre engagement"
							title={
								<>
									<span className="text-kp-gold/90">Quatre piliers</span>
									{" "}
									<span className="text-white/95">pour rouler l’esprit tranquille</span>
								</>
							}
							description="Chaque intervention suit les standards KPANDJI : transparence, qualité constructeur et accompagnement durable."
						/>
					</Reveal>

					<motion.ul
						className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						variants={pillarsContainer}
					>
						{pillars.map((pillar, index) => (
							<motion.li
								key={pillar.title}
								className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/50 p-5 shadow-[0_22px_56px_-32px_rgba(0,0,0,0.92)] ring-1 ring-white/5 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-kp-gold/30 hover:bg-kp-elevated/65 hover:shadow-[0_28px_64px_-28px_rgba(201,169,98,0.14)] sm:p-6"
								variants={pillarItem(reduce)}
							>
								<div
									className="pointer-events-none absolute inset-0 opacity-55 transition duration-300 group-hover:opacity-100"
									aria-hidden
								>
									<div className="absolute inset-0 bg-[radial-gradient(420px_240px_at_50%_-10%,rgba(201,169,98,0.14),transparent_72%)]" />
								</div>
								<div className="relative flex items-start justify-between gap-3">
									<span className="flex size-10 items-center justify-center rounded-xl border border-kp-gold/25 bg-kp-gold/10 text-kp-gold">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="size-[18px]"
											aria-hidden
										>
											{pillar.icon}
										</svg>
									</span>
									<span className="font-sans text-[10px] font-semibold tabular-nums tracking-[0.22em] text-kp-gold/75 md:text-[11px]">
										{String(index + 1).padStart(2, "0")}
									</span>
								</div>
								<p className="relative mt-4 font-serif text-base font-medium leading-snug tracking-[-0.015em] text-white/95 md:text-[1.05rem]">
									{pillar.title}
								</p>
								<p className="relative mt-2 flex-1 text-pretty text-[13px] leading-relaxed text-kp-muted">
									{pillar.description}
								</p>
							</motion.li>
						))}
					</motion.ul>
				</div>
			</section>

			{/* Atelier gallery */}
			<section
				id="sav-atelier"
				className="relative scroll-mt-28 overflow-hidden bg-kp-bg"
				aria-labelledby="sav-atelier-title"
			>
				<div className={sectionPad}>
					<Reveal from="bottom">
						<SectionIntro
							label="Notre atelier"
							titleId="sav-atelier-title"
							title="Là où votre véhicule est entre de bonnes mains."
							description="Réception, zone technique et contrôle qualité : découvrez les espaces dédiés à l’entretien et à la réparation de votre KPANDJI en Côte d’Ivoire."
						/>
					</Reveal>

					<Reveal from="bottom" delayMs={100}>
						<div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:grid-rows-2 md:gap-5">
							<figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40 md:col-span-2 md:row-span-2">
								<div className="relative aspect-16/10 w-full md:aspect-auto md:h-full md:min-h-[480px]">
									<Image
										src={main.src}
										alt={main.alt}
										fill
										sizes="(max-width: 768px) 100vw, 66vw"
										quality={62}
										className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
									/>
									<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
									<span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md sm:left-6 sm:top-6">
										<span className="size-1 rounded-full bg-kp-gold/95" />
										{main.tag}
									</span>
									<figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
										<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-kp-gold/95">
											{main.title}
										</p>
										<p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/70 md:text-[14px]">
											{main.body}
										</p>
									</figcaption>
								</div>
							</figure>

							{secondaryImages.map((image) => (
								<figure
									key={image.src}
									className="group relative overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/40"
								>
									<div className="relative aspect-4/3 w-full md:aspect-auto md:h-full md:min-h-[230px]">
										<Image
											src={image.src}
											alt={image.alt}
											fill
											sizes="(max-width: 768px) 100vw, 33vw"
											quality={62}
											loading="lazy"
											className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
										/>
										<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
										<span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
											<span className="size-1 rounded-full bg-kp-gold/95" />
											{image.tag}
										</span>
										<figcaption className="absolute inset-x-0 bottom-0 p-5">
											<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kp-gold/95">
												{image.title}
											</p>
											<p className="mt-1.5 font-serif text-lg font-medium text-white">
												{image.body}
											</p>
										</figcaption>
									</div>
								</figure>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* Services */}
			<section
				className="relative overflow-hidden border-y border-white/8 bg-kp-surface/35 [content-visibility:auto] [contain-intrinsic-size:auto_560px]"
				aria-labelledby="sav-services-title"
			>
				<div className={sectionPad}>
					<div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-20">
						<Reveal from="left">
							<SectionIntro
								centered={false}
								label="Prestations"
								titleId="sav-services-title"
								title="Tout ce dont votre KPANDJI a besoin."
								description="De l’entretien courant aux réparations complexes, notre atelier couvre l’ensemble du cycle de vie de votre véhicule."
							/>
						</Reveal>

						<Reveal from="right" delayMs={80} staggerChildren staggerMs={70}>
							<ul className="grid gap-4 sm:grid-cols-2">
								{services.map((service) => (
									<li
										key={service.title}
										className="group rounded-2xl border border-white/10 bg-kp-elevated/40 p-5 transition duration-300 hover:border-kp-gold/25 hover:bg-kp-elevated/55 sm:p-6"
									>
										<div className="flex items-start gap-3">
											<span
												className="mt-1 size-1.5 shrink-0 rounded-full bg-kp-gold shadow-[0_0_8px_rgba(201,169,98,0.5)]"
												aria-hidden
											/>
											<div>
												<p className="font-serif text-[1.05rem] tracking-tight text-white md:text-lg">
													{service.title}
												</p>
												<p className="mt-2 text-[13px] leading-relaxed text-white/55 md:text-[14px]">
													{service.body}
												</p>
											</div>
										</div>
									</li>
								))}
							</ul>
						</Reveal>
					</div>
				</div>
			</section>

			{/* Process */}
			<section
				className="relative overflow-hidden bg-kp-bg [content-visibility:auto] [contain-intrinsic-size:auto_640px]"
				aria-labelledby="sav-process-title"
			>
				<div className={sectionPad}>
					<Reveal from="bottom">
						<SectionIntro
							label="Parcours client"
							titleId="sav-process-title"
							title="Simple, clair, sans surprise."
							description="Quatre étapes pour planifier, valider et récupérer votre véhicule en toute confiance."
						/>
					</Reveal>

					<Reveal from="bottom" delayMs={100} staggerChildren staggerMs={80}>
						<ol className="relative mt-12 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
							<div
								className="pointer-events-none absolute left-0 right-0 top-11 hidden h-px bg-linear-to-r from-transparent via-kp-gold/35 to-transparent xl:block"
								aria-hidden
							/>
							{steps.map((step) => (
								<li
									key={step.num}
									className="relative rounded-2xl border border-white/10 bg-kp-elevated/35 p-6 backdrop-blur-sm sm:p-7"
								>
									<span className="inline-flex size-11 items-center justify-center rounded-full border border-kp-gold/30 bg-kp-gold/10 font-sans text-[11px] font-semibold tracking-[0.12em] text-kp-gold">
										{step.num}
									</span>
									<p className="mt-5 font-serif text-xl tracking-tight text-white">{step.title}</p>
									<p className="mt-3 text-[13px] leading-relaxed text-white/55 md:text-[14px]">
										{step.body}
									</p>
								</li>
							))}
						</ol>
					</Reveal>
				</div>
			</section>

			{/* CTA */}
			<section
				id="sav-contact"
				className="relative isolate scroll-mt-28 overflow-hidden bg-kp-bg pb-12 md:pb-16"
				aria-labelledby="sav-cta-title"
			>
				<div className="absolute inset-0 -z-10">
					<Image
						src="/garage2.jpg"
						alt=""
						fill
						sizes="100vw"
						quality={30}
						loading="lazy"
						className="object-cover object-center opacity-20"
						aria-hidden
					/>
				</div>
				<div className="absolute inset-0 -z-10 bg-linear-to-b from-kp-bg via-kp-bg/92 to-kp-bg" />
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_40%,rgba(201,169,98,0.16),transparent_60%)]"
				/>

				<div className={`${sectionPad} pb-24! sm:pb-28!`}>
					<Reveal from="bottom">
						<div className="relative overflow-hidden rounded-3xl border border-kp-gold/20 bg-black/40 p-8 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/8 backdrop-blur-xl sm:p-12 md:p-16 lg:p-20">
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_320px_at_50%_0%,rgba(201,169,98,0.12),transparent_70%)]"
							/>
							<div
								aria-hidden
								className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/50 to-transparent"
							/>

							<div className="relative text-center">
								<p className={`${eyebrow} justify-center`}>Besoin d’assistance ?</p>
								<h2
									id="sav-cta-title"
									className="mt-5 font-serif text-[clamp(1.85rem,4.5vw,3.25rem)] font-normal leading-[1.08] tracking-tight text-white"
								>
									Parlez à notre équipe S.A.V.
									<span className="block bg-linear-to-r from-amber-200 via-kp-gold to-white/85 bg-clip-text text-transparent">
										dès aujourd’hui
									</span>
								</h2>
								<p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/65 md:text-[16px]">
									Entretien, réparation ou simple conseil : décrivez votre besoin par téléphone,
									e-mail ou via notre formulaire de contact.
								</p>

								<div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
									<a href={`tel:${SAV_TEL}`} className={`${btnPrimary} w-full sm:w-auto`}>
										{SAV_PHONE}
									</a>
									<EcrireSavModal triggerClassName={`${btnGhost} w-full sm:w-auto`}>
										Écrire au S.A.V.
									</EcrireSavModal>
									<Link
										href="/contact"
										className="inline-flex w-full min-h-11 items-center justify-center rounded-full border border-white/10 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 transition duration-300 hover:border-white/20 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:w-auto"
									>
										Formulaire de contact
									</Link>
								</div>

								<div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.28em] text-white/38">
									<span>Pièces d’origine</span>
									<span aria-hidden className="size-1 rounded-full bg-kp-gold/40" />
									<span>Devis transparent</span>
									<span aria-hidden className="size-1 rounded-full bg-kp-gold/40" />
									<span>Côte d&apos;Ivoire</span>
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</section>
		</div>
	);
}
