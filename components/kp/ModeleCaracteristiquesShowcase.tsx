"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Copy } from "@/lib/i18n/pick";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

const leftBlock = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08, delayChildren: 0.1 },
	},
};

const leftHeader = (reduce: boolean) => ({
	hidden: reduce
		? { opacity: 1, y: 0, filter: "blur(0px)" }
		: { opacity: 0, y: 22, filter: "blur(5px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: reduce ? 0 : 0.65, ease },
	},
});

const listRoot = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.07, delayChildren: 0.02 },
	},
};

const listRow = (reduce: boolean) => ({
	hidden: reduce
		? { opacity: 1, x: 0, filter: "blur(0px)" }
		: { opacity: 0, x: -16, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: { duration: reduce ? 0 : 0.52, ease },
	},
});

const mediaStage = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.14, delayChildren: 0.05 },
	},
};

/** Foreground image: slide from top + fade (no clip — preserves negative offset crop). */
const mediaForeground = (reduce: boolean) => ({
	hidden: reduce ? { y: 0, opacity: 1 } : { y: -44, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: reduce ? 0 : 0.88, ease },
	},
});

/** Background card: clip-path rises from bottom + slight lift (matches rounded frame). */
const mediaBackground = (reduce: boolean) => ({
	hidden: reduce
		? { clipPath: "inset(0 0 0 0)", y: 0, opacity: 1 }
		: { clipPath: "inset(0 0 100% 0)", y: 40, opacity: 1 },
	visible: {
		clipPath: "inset(0 0 0 0)",
		y: 0,
		opacity: 1,
		transition: { duration: reduce ? 0 : 0.92, ease },
	},
});

const masthead = (reduce: boolean) => ({
	hidden: reduce
		? { opacity: 1, y: 0 }
		: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: reduce ? 0 : 0.7, ease },
	},
});

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			aria-hidden>
			<path
				d="M11.5 3.5L5.25 9.75L2.5 7"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function ModeleCaracteristiquesShowcase({
	name,
	characteristics,
	bgSlideImage,
	slideImage,
}: {
	name: string;
	characteristics: Copy[];
	bgSlideImage: string;
	slideImage: string;
}) {
	const { tr } = useLocale();
	const reduce = useReducedMotion() === true;
	const count = characteristics.length;

	return (
		<section
			aria-labelledby="caracteristiques-heading"
			className="relative mx-auto w-full max-w-[1600px] px-5 py-16 md:px-10 md:py-20 lg:py-28">
			<div
				aria-hidden
				className="pointer-events-none absolute -top-40 left-1/2 h-[min(560px,60vw)] w-[min(1200px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,169,98,0.16),transparent)] blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute bottom-[10%] right-0 h-80 w-80 translate-x-1/4 rounded-full bg-[radial-gradient(closest-side,rgba(232,228,220,0.06),transparent)] blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/25 to-transparent md:inset-x-10"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-8 top-32 bottom-24 -z-10 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[56px_56px] opacity-40 md:inset-x-14"
			/>

			<motion.header
				className="relative mb-12 text-center md:mb-14 lg:mb-16 lg:text-left"
				initial="hidden"
				whileInView="visible"
				viewport={viewport}
				variants={masthead(reduce)}>
				<div className="mx-auto inline-flex max-w-3xl flex-col items-center lg:mx-0 lg:items-start">
					<div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
						<span className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-kp-muted">
							{tr("Signature technique", "Technical signature")}
						</span>
						<span
							className="hidden h-3 w-px bg-white/15 sm:block"
							aria-hidden
						/>
						<span className="font-sans text-[10px] font-semibold tabular-nums tracking-[0.22em] text-kp-gold/90 sm:inline">
							{tr(`${count} points forts`, `${count} key strengths`)}
						</span>
					</div>
					<span
						className="mt-6 block h-px w-20 bg-linear-to-r from-kp-gold via-kp-gold/30 to-transparent lg:w-28"
						aria-hidden
					/>
					<p className="mt-5 font-serif text-lg font-medium italic tracking-[-0.02em] text-kp-gold/90 md:text-xl">
						{tr("Conçu pour performer", "Built to perform")}
					</p>
					
				</div>
			</motion.header>

			<div className="relative flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-14 xl:gap-16">
				<div className="w-full lg:w-[min(100%,400px)] lg:shrink-0 xl:w-[420px]">
					<motion.div
						className="relative h-full rounded-[26px] bg-linear-to-br from-kp-gold/45 via-white/12 to-white/3 p-px shadow-[0_48px_120px_-52px_rgba(0,0,0,0.95)] md:rounded-[28px]"
						initial="hidden"
						whileInView="visible"
						viewport={viewport}
						variants={leftBlock}>
						<div className="relative h-full overflow-hidden rounded-[25px] border border-white/7 bg-kp-elevated/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/4 backdrop-blur-2xl md:rounded-[27px]">
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_300px_at_-8%_-12%,rgba(201,169,98,0.18),transparent_58%),radial-gradient(420px_240px_at_108%_108%,rgba(201,169,98,0.08),transparent_52%),linear-gradient(172deg,rgba(255,255,255,0.09)_0%,transparent_48%)]"
							/>
							<div
								aria-hidden
								className="kp-grain pointer-events-none absolute inset-0 opacity-[0.11]"
							/>
							<div className="relative flex h-full flex-col p-6 md:p-8">
								<motion.div variants={leftHeader(reduce)}>
									<div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
										<span
											className="relative flex h-2 w-2 items-center justify-center"
											aria-hidden>
											<span className="absolute h-2 w-2 animate-ping rounded-full bg-kp-gold/35 motion-reduce:animate-none" />
											<span className="relative h-1.5 w-1.5 rounded-full bg-kp-gold shadow-[0_0_16px_rgba(201,169,98,0.55)]" />
										</span>
									<p className="font-sans text-[10px] font-semibold uppercase tracking-[0.36em] text-kp-muted">
										{tr("À retenir", "Key facts")}
									</p>
									</div>
									<span
										className="mt-6 block h-px w-full max-w-[240px] bg-linear-to-r from-kp-gold via-kp-gold/25 to-transparent"
										aria-hidden
									/>
									<h3 className="mt-5 font-serif text-xl font-medium leading-tight tracking-[-0.02em] text-kp-accent md:text-2xl">
										{tr("Liste des atouts", "Key strengths")}
									</h3>
									<p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-kp-muted md:text-sm">
										{tr(
											"Le meilleur du véhicule, en quelques lignes lisibles au premier coup d’œil.",
											"The best of the vehicle, in a few lines you can grasp at a glance.",
										)}
									</p>
								</motion.div>
								<motion.ul
									className="mt-9 flex flex-1 flex-col gap-2.5"
									variants={listRoot}>
									{characteristics.map((item, index) => (
										<motion.li
											key={`${index}-${item.fr}`}
											variants={listRow(reduce)}
											className="group relative overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br from-white/6 to-transparent transition-[border-color,box-shadow,transform] duration-500 hover:border-kp-gold/28 hover:shadow-[0_28px_64px_-36px_rgba(0,0,0,0.85)] motion-safe:hover:-translate-y-px">
											<div
												aria-hidden
												className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-kp-gold/0 via-kp-gold/55 to-kp-gold/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
											/>
											<div className="flex gap-3.5 px-4 py-3.5 md:gap-4 md:px-5 md:py-4">
												<span
													className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-kp-gold/20 bg-kp-gold/8 text-kp-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:h-10 md:w-10"
													aria-hidden>
													<CheckIcon className="opacity-95" />
												</span>
												<div className="min-w-0 flex-1">
													<p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-kp-gold/75">
														{String(index + 1).padStart(2, "0")}
													</p>
													<p className="mt-1 text-sm leading-relaxed text-kp-silver transition-colors duration-500 group-hover:text-kp-accent md:text-[15px] md:leading-[1.65]">
														{tr(item.fr, item.en)}
													</p>
												</div>
											</div>
										</motion.li>
									))}
								</motion.ul>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="min-w-0 flex-1">
					<div className="relative">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={viewport}
							variants={mediaStage}
							className="group relative flex aspect-16/10 w-full overflow-visible">
							<motion.div
								variants={mediaForeground(reduce)}
								className="relative z-20 -ml-[18%] h-[min(100%,420px)] w-[48%] max-h-full min-h-[200px] shrink-0 overflow-visible bg-transparent sm:-ml-[16%] sm:h-[88%] sm:w-[44%] md:-ml-[14%] md:h-[86%] md:w-[42%] md:rounded-[24px]">
								<div className="relative h-full min-h-[200px] w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
									<Image
										src={slideImage}
										alt={`${name} — ${tr("mise en avant", "highlight")}`}
										fill
										sizes="(max-width: 1024px) 100vw, 28vw"
										className="object-cover object-center transition duration-700 ease-out motion-safe:group-hover:scale-[1.04] overflow-visible -mt-[-70%] -ml-[-90%]"
									/>
								</div>
							</motion.div>
							<div
								aria-hidden
								className="pointer-events-none absolute top-1/2 left-[min(58%,calc(100%-8rem))] z-20 hidden h-[52%] w-px -translate-y-1/2 bg-linear-to-b from-kp-gold/0 via-kp-gold/55 to-kp-gold/0 md:block"
							/>
							<motion.div
								variants={mediaBackground(reduce)}
								className="relative z-1 h-full min-h-0 w-[68%] shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5 md:w-[68%] md:rounded-[26px]">
								<Image
									src={bgSlideImage}
									alt={`${name} — ${tr("ambiance", "ambience")}`}
									fill
									sizes="(max-width: 1024px) 100vw, 42vw"
									className="object-cover object-center transition duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
								/>
								<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/45" />
								<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/6 via-transparent to-black/28" />
								<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6 ring-inset" />
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
