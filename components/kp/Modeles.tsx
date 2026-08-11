"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MODELES } from "@/data/modeles";
import { useLocale } from "@/components/providers/KpLocaleProvider";
import { Reveal } from "./Reveal";

/** Loads and autoplays only when near the viewport — keeps the section fast. */
function LazyAutoplayVideo({ src, className }: { src: string; className?: string }) {
	const ref = useRef<HTMLVideoElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node || active) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setActive(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "160px 0px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [active]);

	return (
		<video
			ref={ref}
			className={className}
			src={active ? src : undefined}
			autoPlay={active}
			muted
			loop
			playsInline
			controls
			preload={active ? "metadata" : "none"}
		/>
	);
}

function ModeleSpecChips({ items }: { items: (typeof MODELES)[number]["characteristics"] }) {
	const { tr } = useLocale();
	const top = items.slice(0, 4);
	if (top.length === 0) return null;
	return (
		<div className="mt-5 flex flex-wrap gap-2">
			{top.map((c) => (
				<span
					key={c.fr}
					className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-kp-accent/90 backdrop-blur">
					{tr(c.fr, c.en)}
				</span>
			))}
		</div>
	);
}

function MediaTile({
	src,
	alt,
	priority = false,
}: {
	src: string;
	alt: string;
	priority?: boolean;
}) {
	return (
		<div className="h-full w-full rounded-[22px] bg-kp-bg/80 p-1.5 ring-1 ring-white/6">
			<div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
				<Image
					src={src}
					alt={alt}
					fill
					priority={priority}
					sizes="(max-width: 768px) 100vw, 66vw"
					loading={priority ? "eager" : "lazy"}
					className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
				/>
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/35" />
				<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 left-0 w-[40%] -translate-x-[130%] bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100"
				/>
			</div>
		</div>
	);
}

function ModeleRow({
	item,
	index,
}: {
	item: (typeof MODELES)[number];
	index: number;
}) {
	const flipped = index % 2 === 1;
	/* First rows + Lathaye (index 2): avoid a lazy tile becoming LCP (e.g. pic2.jpeg). */
	const priorityTopImage = index < 3;
	const { tr } = useLocale();

	return (
		<section
			aria-label={tr(`Modèle ${item.name}`, `${item.name} model`)}
			className="relative w-full scroll-mt-28 border-t border-white/6 bg-kp-bg py-10 md:py-14">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_360px_at_20%_20%,rgba(201,169,98,0.10),transparent_60%),radial-gradient(900px_360px_at_80%_70%,rgba(255,255,255,0.05),transparent_58%)]"
				/>
				<div
					aria-hidden
					className="kp-grain pointer-events-none absolute inset-0 opacity-[0.08]"
				/>

				<div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
					<div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-5 lg:gap-7">
						{/* Left: 4/5 media */}
						<div
							className={`lg:col-span-4 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
							<div className="grid h-full gap-4">
								{flipped ? (
									<>
										{/* Bottom side: 1/2 left, 1/2 right */}
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div className="aspect-16/10">
												<MediaTile
													src={item.media.bottomLeftImage}
													alt={tr(`${item.name} — intérieur`, `${item.name} — interior`)}
												/>
											</div>
											<div className="aspect-16/10">
												<MediaTile
													src={item.media.bottomRightImage}
													alt={tr(`${item.name} — extérieur`, `${item.name} — exterior`)}
													priority={index === MODELES.length - 1}
												/>
											</div>
										</div>

										{/* Top side: image 1/3, video 2/3 */}
										<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:h-[360px] lg:h-[420px]">
											<div className="aspect-video md:col-span-1 md:aspect-auto md:h-full">
												<MediaTile
													src={item.media.topImage}
													alt={tr(`${item.name} — visuel principal`, `${item.name} — main visual`)}
													priority={priorityTopImage}
												/>
											</div>

											<div className="aspect-video md:col-span-2 md:aspect-auto md:h-full">
												<div className="h-full w-full rounded-[22px] bg-kp-bg/80 p-1.5 ring-1 ring-white/6">
													<div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
														<LazyAutoplayVideo
															src={item.media.topVideo}
															className="h-full w-full object-cover"
														/>
														<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/40" />
														<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
														<div
															aria-hidden
															className="pointer-events-none absolute inset-y-0 left-0 w-[40%] -translate-x-[130%] bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100"
														/>
													</div>
												</div>
											</div>
										</div>
									</>
								) : (
									<>
										{/* Top side: image 1/3, video 2/3 */}
										<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:h-[360px] lg:h-[420px]">
											<div className="aspect-video md:col-span-1 md:aspect-auto md:h-full">
												<MediaTile
													src={item.media.topImage}
													alt={tr(`${item.name} — visuel principal`, `${item.name} — main visual`)}
													priority={priorityTopImage}
												/>
											</div>

											<div className="aspect-video md:col-span-2 md:aspect-auto md:h-full">
												<div className="h-full w-full rounded-[22px] bg-kp-bg/80 p-1.5 ring-1 ring-white/6">
													<div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
														<LazyAutoplayVideo
															src={item.media.topVideo}
															className="h-full w-full object-cover"
														/>
														<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/40" />
														<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
														<div
															aria-hidden
															className="pointer-events-none absolute inset-y-0 left-0 w-[40%] -translate-x-[130%] bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100"
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Bottom side: 1/2 left, 1/2 right */}
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3.5">
											<div className="aspect-16/10">
												<MediaTile
													src={item.media.bottomLeftImage}
													alt={tr(`${item.name} — intérieur`, `${item.name} — interior`)}
												/>
											</div>
											<div className="aspect-16/10">
												<MediaTile
													src={item.media.bottomRightImage}
													alt={tr(`${item.name} — extérieur`, `${item.name} — exterior`)}
													priority={index === MODELES.length - 1}
												/>
											</div>
										</div>
									</>
								)}
							</div>
						</div>

						{/* Right: 1/5 info */}
						<aside
							className={`lg:col-span-1 ${flipped ? "lg:order-1" : "lg:order-2"}`}>
							<div className="relative lg:sticky lg:top-28">
								<div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-kp-elevated/60 p-6 shadow-[0_28px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/5 backdrop-blur backdrop-brightness-100">
								<div
									aria-hidden
									className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_30%_18%,rgba(201,169,98,0.16),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_55%)]"
								/>
								<div
									aria-hidden
									className="kp-grain pointer-events-none absolute inset-0 opacity-[0.14]"
								/>

								<div className="relative">
									<div className="flex items-center justify-between gap-3">
										<span className="inline-flex items-center rounded-full border border-white/14 bg-black/25 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85 backdrop-blur">
											{tr("Modèle", "Model")} {String(index + 1).padStart(2, "0")}
										</span>
										<span
											aria-hidden
											className="h-px flex-1 bg-linear-to-r from-transparent via-kp-gold/60 to-transparent"
										/>
									</div>

									<h3 className="mt-4 font-serif text-3xl font-medium leading-none tracking-[-0.02em] text-kp-accent">
										{item.name}
									</h3>
									
									<p className="mt-4 text-sm leading-relaxed text-kp-muted kp-clamp-3">
										{tr(item.description.fr, item.description.en)}
									</p>
									<ModeleSpecChips items={item.characteristics} />

									<Link
										href={`/modeles/${item.id}`}
										className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-kp-gold/45 bg-white/95 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.65)] transition duration-300 ease-out hover:scale-[1.02] hover:border-kp-gold/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg active:scale-[0.98]">
										<span
											aria-hidden
											className="pointer-events-none absolute inset-y-0 left-0 w-[40%] -translate-x-[130%] bg-linear-to-r from-white/0 via-white/40 to-white/0 opacity-0 transition duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100"
										/>
										<span className="relative">{tr("Découvrir", "Discover")}</span>
									</Link>
								</div>
								
								</div>
							</div>
							
						</aside>
					</div>
				</div>
		</section>
	);
}

export default function Modeles() {
	const { tr } = useLocale();

	return (
		<section
			id="modeles"
			aria-label={tr("Modèles", "Models")}
			className="w-full scroll-mt-28 border-t border-white/6 bg-kp-bg">
			<div className="mx-auto max-w-[1600px] px-5 pt-14 md:px-10 md:pt-18">
				<Reveal>
					<header className="mx-auto max-w-3xl text-center">
						<span
							className="mx-auto block h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-56"
							aria-hidden
						/>
						
						<h2 className="mt-5 font-serif text-[clamp(2.1rem,5.4vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.03em] text-kp-accent">
							{tr(
								"Des modèles conçus pour la route, le travail et l’aventure.",
								"Models built for the road, for work, and for adventure.",
							)}
						</h2>
						
					</header>
				</Reveal>
			</div>

			<div className="mt-10">
				{MODELES.map((item, index) => (
					<ModeleRow key={item.id} item={item} index={index} />
				))}
			</div>
		</section>
	);
}
