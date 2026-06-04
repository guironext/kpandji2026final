"use client";

import { useEffect, useRef, useState } from "react";

/**
 * KpHero — cinematic, fully-responsive landing hero.
 *
 * Layered structure:
 *   1. Parallax video background (subtle scale + drift on scroll)
 *   2. Cinematic overlay stack (vignette, top dim, gold glow, grain)
 *   3. Top utility bar (location ↔ live scroll indicator)
 *   4. Editorial copy block (eyebrow + serif headline + sub + CTAs)
 *   5. Brand pillars strip (4 luxury attributes)
 *   6. Infinite marquee strip (model wordmarks)
 */
export function KpHero() {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const el = wrapRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const h = rect.height || 1;
			const p = Math.min(1, Math.max(0, -rect.top / (h * 0.65)));
			setProgress(p);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scale = 1 + progress * 0.06;
	const y = progress * 48;
	const dim = 0.35 + progress * 0.35;
	const progressPct = Math.round(progress * 100);

	return (
		<section
			id="accueil"
			ref={wrapRef}
			className="relative flex min-h-svh scroll-mt-28 flex-col overflow-hidden">
			{/* 1 + 2 — Background video & cinematic overlays */}
			<div className="absolute inset-0 z-0">
				<div
					className="absolute inset-0 origin-center will-change-transform"
					style={{
						transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
						transition: "transform 0.1s linear",
					}}>
					<video
						className="h-full w-full object-cover"
						autoPlay
						muted
						loop
						playsInline
						preload="metadata">
						<source src="/video.mp4" type="video/mp4" />
					</video>
				</div>
				<div
					className="pointer-events-none absolute inset-0 h-full w-full"
					style={{ opacity: dim }}>
					<div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/95" />
					<div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_22%_18%,rgba(201,169,98,0.20),transparent_62%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_80%,rgba(201,169,98,0.10),transparent_60%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_50%,transparent_55%,rgba(0,0,0,0.78)_100%)]" />
					<div className="kp-grain absolute inset-0 opacity-[0.28] md:opacity-[0.33]" />
				</div>
			</div>

			{/* 3 — Top utility bar (hidden on small screens to keep mobile clean) */}
		

			{/* 4 — Editorial copy & CTAs */}
			<div className="relative z-10 mt-20 flex flex-1 items-end md:mt-0">
				<div className="mx-auto w-full max-w-[1600px] px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28">
					<p className="kp-hero-reveal kp-hero-delay-1 mb-5 flex items-center gap-3 font-sans text-[10px] font-semibold uppercase tracking-[0.45em] text-white/70 md:text-xs">
						<span className="md:hidden">
							<span className="relative inline-flex h-1.5 w-1.5">
								<span className="kp-pulse-dot absolute inline-flex h-full w-full rounded-full bg-(--kp-gold)/80" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kp-gold" />
							</span>
						</span>
						<span>La force d&apos;une racine,</span>
						<span className="h-px w-6 bg-white/30 md:w-10" />
						<span className="text-kp-gold">
						L&apos;élan d&apos;une Nation
							
						</span>
					</p>

					<h1 className="max-w-[18ch] font-serif text-[clamp(2.6rem,6.4vw,6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white">
						<span className="kp-hero-reveal kp-hero-delay-2 block">
							KPANDJI AUTOMOBILES
						</span>
						<span className="kp-hero-reveal kp-hero-delay-3 block">
							<span className="bg-linear-to-r from-white via-white to-kp-gold bg-clip-text text-transparent text-[clamp(1.6rem,6.4vw,3rem)]">
							Constructeur & Assembleur automobile
							</span>
						</span>
					</h1>

					<p className="kp-hero-reveal kp-hero-delay-4 mt-6 max-w-xl font-sans text-base leading-relaxed text-white/75 md:mt-8 md:text-lg italic font-light">
						Ingénierie, assemblage et mobilité durable — une signature
						africaine pour des véhicules pensés pour exiger le meilleur.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-3 md:mt-12 md:gap-5">
						<a
							href="#vehicules"
							className="kp-hero-reveal kp-hero-delay-5 group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition duration-300 ease-out hover:scale-[1.02] hover:bg-white/95 active:scale-[0.98] md:px-8 md:text-[12px]">
							<span>Découvrir nos véhicules</span>
							<svg
								aria-hidden
								viewBox="0 0 24 24"
								className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M5 12h14" />
								<path d="m13 5 7 7-7 7" />
							</svg>
						</a>

						

					</div>
				</div>
			</div>

			{/* 5 — Brand pillars strip */}
			<div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-[2px]">
				<div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 divide-y divide-white/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-10">
					{PILLARS.map((p, i) => (
						<div
							key={p.label}
							className={`kp-hero-reveal kp-hero-delay-7 flex items-center gap-4 py-5 md:py-6 ${
								i === 0 ? "" : "md:pl-6 lg:pl-8"
							} ${i % 2 === 1 ? "pl-5" : ""}`}>
							<span className="font-serif text-base text-(--kp-gold)/85 md:text-lg">
								{p.code}
							</span>
							<div className="min-w-0">
								<p className="truncate font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white md:text-[12px]">
									{p.label}
								</p>
								<p className="kp-clamp-2 mt-0.5 font-sans text-[11px] leading-snug text-white/55 md:text-[12px]">
									{p.detail}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* 6 — Brand marquee */}
				<div className="relative overflow-hidden border-t border-white/10">
					<div className="kp-hero-reveal kp-hero-delay-8 pointer-events-none">
						<div className="kp-marquee-track flex w-max items-center gap-12 py-3 will-change-transform md:gap-16 md:py-4">
							{[...MARQUEE, ...MARQUEE].map((label, i) => (
								<span
									key={`${label}-${i}`}
									className="flex items-center gap-12 font-sans text-[11px] uppercase tracking-[0.5em] text-white/45 md:text-[12px]">
									<span>{label}</span>
									<span className="text-kp-gold">◆</span>
								</span>
							))}
						</div>
					</div>
					<div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black/80 to-transparent md:w-24" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black/80 to-transparent md:w-24" />
				</div>
			</div>

			{/* Side scroll indicator (desktop only) */}
			<div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
				<div className="flex flex-col items-center gap-3">
					<span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/45 [writing-mode:vertical-rl]">
						Scroll
					</span>
					<div className="relative h-24 w-px overflow-hidden bg-white/15">
						<div
							className="absolute left-0 top-0 w-px bg-kp-gold"
							style={{
								height: `${Math.max(8, progressPct)}%`,
								transition: "height 0.15s linear",
							}}
						/>
					</div>
					<span className="kp-scroll-dot block h-1.5 w-1.5 rounded-full bg-white/80" />
				</div>
			</div>
		</section>
	);
}

const PILLARS: { code: string; label: string; detail: string }[] = [
	{
		code: "01",
		label: "Conçu en Côte d'Ivoire",
		detail: "Design et ingénierie pensés pour le continent.",
	},
	{
		code: "02",
		label: "Production locale",
		detail: "Assemblage à Abidjan, savoir-faire ivoirien.",
	},
	{
		code: "03",
		label: "Mobilité durable",
		detail: "Performance, sobriété et fiabilité au long cours.",
	},
	{
		code: "04",
		label: "Garantie 3 ans ou 100 000 km",
		detail: "Sérénité totale et service après-vente premium.",
	},
];

const MARQUEE = [
	"KPANDJI DJETRAN",
	"KPANDJI DJETRAN PLUS",
	"KPANDJI LATHAYE",
	"MADE IN CÔTE D'IVOIRE",

];
