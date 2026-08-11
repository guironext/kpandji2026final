"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.4, 0, 1, 1] as const;

/** How long text stays readable before soft replay while the hero video is in view. */
const HOLD_MS = 6500;
const EXIT_MS = 700;
const RESTART_GAP_MS = 280;

const copyContainer = {
	hidden: {
		transition: { staggerChildren: 0.055, staggerDirection: -1 as const },
	},
	visible: {
		transition: { staggerChildren: 0.12, delayChildren: 0.15 },
	},
};

/** Pass-through so nested title lines keep the stagger chain. */
const titleGroup = {
	hidden: {
		transition: { staggerChildren: 0.055, staggerDirection: -1 as const },
	},
	visible: {
		transition: { staggerChildren: 0.12 },
	},
};

const slideUp = (reduce: boolean, y = 28) => ({
	hidden: reduce
		? { opacity: 1, y: 0, filter: "blur(0px)" }
		: {
				opacity: 0,
				y,
				filter: "blur(6px)",
				transition: { duration: 0.45, ease: easeIn },
			},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: reduce ? 0 : 0.85, ease: easeOut },
	},
});

const pillarsContainer = (reduce: boolean) => ({
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.09,
			delayChildren: reduce ? 0 : 0.78,
		},
	},
});

const pillarItem = (reduce: boolean) => ({
	hidden: reduce
		? { opacity: 1, y: 0 }
		: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: reduce ? 0 : 0.7, ease: easeOut },
	},
});

export function KpHero() {
	const { tr } = useLocale();
	const reduceMotion = useReducedMotion();
	const wrapRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [watching, setWatching] = useState(true);
	const [copyPhase, setCopyPhase] = useState<"hidden" | "visible">("hidden");
	const [pillarsShown, setPillarsShown] = useState(false);

	const pillars = useMemo(
		() => [
			{
				code: "01",
				label: tr("Conçu en Côte d'Ivoire", "Designed in Côte d'Ivoire"),
				detail: tr(
					"Design et ingénierie pensés pour le continent.",
					"Design and engineering built for the continent.",
				),
			},
			{
				code: "02",
				label: tr("Production locale", "Local production"),
				detail: tr(
					"Assemblage à Abidjan, savoir-faire ivoirien.",
					"Assembled in Abidjan, Ivorian craftsmanship.",
				),
			},
			{
				code: "03",
				label: tr("Mobilité durable", "Sustainable mobility"),
				detail: tr(
					"Performance, sobriété et fiabilité au long cours.",
					"Performance, efficiency, and long-haul reliability.",
				),
			},
			{
				code: "04",
				label: tr("Garantie 3 ans ou 100 000 km", "3-year or 100,000 km warranty"),
				detail: tr(
					"Sérénité totale et service après-vente premium.",
					"Complete peace of mind and premium after-sales service.",
				),
			},
		],
		[tr],
	);

	const marquee = useMemo(
		() => [
			"KPANDJI DJETRAN",
			"KPANDJI DJETRAN PLUS",
			"KPANDJI LATHAYE",
			tr("MADE IN CÔTE D'IVOIRE", "MADE IN CÔTE D'IVOIRE"),
		],
		[tr],
	);

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

	/* True while the hero (and video) is the main thing on screen. */
	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				setWatching(entry.isIntersecting && entry.intersectionRatio >= 0.4);
			},
			{ threshold: [0.25, 0.4, 0.55, 0.7] },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	/* Replay staggered copy while the user keeps watching the video. */
	useEffect(() => {
		const reduce = !!reduceMotion;
		if (reduce) {
			setCopyPhase("visible");
			setPillarsShown(true);
			return;
		}

		if (!watching) {
			/* Pause the cycle; keep the last readable frame. */
			return;
		}

		let cancelled = false;
		let timer: ReturnType<typeof setTimeout> | undefined;

		const wait = (ms: number) =>
			new Promise<void>((resolve) => {
				timer = setTimeout(resolve, ms);
			});

		const loop = async () => {
			setCopyPhase("visible");
			setPillarsShown(true);
			await wait(HOLD_MS);
			if (cancelled) return;
			setCopyPhase("hidden");
			await wait(EXIT_MS + RESTART_GAP_MS);
			if (cancelled) return;
			void loop();
		};

		void loop();

		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	}, [watching, reduceMotion]);

	const scale = 1 + progress * 0.06;
	const y = progress * 48;
	const dim = 0.35 + progress * 0.35;
	const progressPct = Math.round(progress * 100);
	const reduce = !!reduceMotion;
	const line = slideUp(reduce);
	const lineSoft = slideUp(reduce, 22);

	return (
		<section
			id="accueil"
			ref={wrapRef}
			className="relative flex min-h-svh scroll-mt-28 flex-col overflow-hidden">
			{/* Background video & cinematic overlays */}
			<div className="absolute inset-0 z-0">
				<div
					className="absolute inset-0 origin-center will-change-transform"
					style={{
						transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
						transition: "transform 0.1s linear",
					}}>
					<video
						className="h-full w-full object-cover object-[center_35%] sm:object-center"
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
					<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/25 to-black/95 sm:from-black/55 sm:via-black/20" />
					<div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_22%_18%,rgba(201,169,98,0.20),transparent_62%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_80%,rgba(201,169,98,0.10),transparent_60%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_50%,transparent_55%,rgba(0,0,0,0.78)_100%)]" />
					<div className="kp-grain absolute inset-0 opacity-[0.28] md:opacity-[0.33]" />
				</div>
			</div>

			{/* Editorial copy & CTAs — staggered slide-up */}
			<div className="relative z-10 mt-[4.75rem] flex flex-1 items-end sm:mt-20 md:mt-0">
				<motion.div
					className="mx-auto w-full max-w-[1600px] px-4 pb-6 pt-10 sm:px-5 sm:pb-10 sm:pt-20 md:px-10 md:pb-14 md:pt-28"
					variants={copyContainer}
					initial="hidden"
					animate={copyPhase}>
					

					<motion.h1
						variants={titleGroup}
						className="max-w-[12ch] font-serif text-[clamp(2.15rem,10vw,6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-white sm:max-w-[18ch]">
						<motion.span variants={line} className="block">
							KPANDJI AUTOMOBILES
						</motion.span>
						<motion.span variants={line} className="mt-1 block sm:mt-0">
							<span className="bg-linear-to-r from-white via-white to-kp-gold bg-clip-text text-[clamp(1.2rem,5.6vw,3rem)] text-transparent">
								{tr(
									"Constructeur & Assembleur automobile",
									"Automotive manufacturer & assembler",
								)}
							</span>
						</motion.span>
					</motion.h1>

					<motion.p
						variants={lineSoft}
						className="mt-5 max-w-[34ch] font-sans text-[15px] font-light italic leading-relaxed text-white/75 sm:mt-6 sm:max-w-xl sm:text-base md:mt-8 md:text-lg">
						{tr(
							"Ingénierie, assemblage et mobilité durable — une signature africaine pour des véhicules pensés pour exiger le meilleur.",
							"Engineering, assembly, and sustainable mobility — an African signature for vehicles built to demand the best.",
						)}
					</motion.p>

					<motion.div
						variants={lineSoft}
						className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:mt-12">
						<a
							href="/showroom"
							className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition duration-300 ease-out hover:scale-[1.02] hover:bg-white/95 active:scale-[0.98] sm:w-auto sm:justify-start sm:px-7 md:px-8 md:text-[12px]">
							<span>{tr("Découvrir nos véhicules", "Discover our vehicles")}</span>
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
					</motion.div>
				</motion.div>
			</div>

			{/* Brand pillars strip */}
			<div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-[2px]">
				{/* Mobile: horizontal snap — no truncation, easy thumb scroll */}
				<motion.div
					className="kp-hide-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto px-4 md:hidden"
					variants={pillarsContainer(reduce)}
					initial="hidden"
					animate={pillarsShown ? "visible" : "hidden"}>
					{pillars.map((p) => (
						<motion.div
							key={p.code}
							variants={pillarItem(reduce)}
							className="flex w-[78vw] max-w-[280px] shrink-0 snap-start items-start gap-3 border-r border-white/10 py-4 pr-5 last:border-r-0">
							<span className="mt-0.5 font-serif text-base text-(--kp-gold)/85">
								{p.code}
							</span>
							<div className="min-w-0">
								<p className="font-sans text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-white">
									{p.label}
								</p>
								<p className="mt-1 font-sans text-[11px] leading-snug text-white/55">
									{p.detail}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Desktop / tablet: 4-column grid */}
				<motion.div
					className="mx-auto hidden w-full max-w-[1600px] grid-cols-4 divide-x divide-white/10 px-5 md:grid md:px-10"
					variants={pillarsContainer(reduce)}
					initial="hidden"
					animate={pillarsShown ? "visible" : "hidden"}>
					{pillars.map((p, i) => (
						<motion.div
							key={p.code}
							variants={pillarItem(reduce)}
							className={`flex items-center gap-4 py-6 ${i === 0 ? "" : "md:pl-6 lg:pl-8"}`}>
							<span className="font-serif text-lg text-(--kp-gold)/85">
								{p.code}
							</span>
							<div className="min-w-0">
								<p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
									{p.label}
								</p>
								<p className="kp-clamp-2 mt-0.5 font-sans text-[12px] leading-snug text-white/55">
									{p.detail}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Brand marquee */}
				<motion.div
					className="relative overflow-hidden border-t border-white/10"
					initial={reduce ? false : { opacity: 0 }}
					animate={{ opacity: pillarsShown || reduce ? 1 : 0 }}
					transition={{
						duration: reduce ? 0 : 0.8,
						delay: reduce || pillarsShown ? 0 : 1.05,
						ease: easeOut,
					}}>
					<div className="pointer-events-none">
						<div className="kp-marquee-track flex w-max items-center gap-10 py-2.5 will-change-transform sm:gap-12 sm:py-3 md:gap-16 md:py-4">
							{[...marquee, ...marquee].map((label, i) => (
								<span
									key={`${label}-${i}`}
									className="flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.4em] text-white/45 sm:gap-12 sm:text-[11px] sm:tracking-[0.5em] md:text-[12px]">
									<span>{label}</span>
									<span className="text-kp-gold">◆</span>
								</span>
							))}
						</div>
					</div>
					<div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-black/80 to-transparent sm:w-12 md:w-24" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-black/80 to-transparent sm:w-12 md:w-24" />
				</motion.div>
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
