import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModeleById, MODELES } from "@/data/modeles";
import { ModeleAnglesExplorer } from "@/components/kp/ModeleAnglesExplorer";
import { ModeleCaracteristiquesShowcase } from "@/components/kp/ModeleCaracteristiquesShowcase";
import { Reveal } from "@/components/kp/Reveal";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
	return MODELES.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const modele = getModeleById(id);
	if (!modele) {
		return { title: "Modèle introuvable" };
	}
	return {
		title: `${modele.name} — KPANDJI Automobiles`,
		description: modele.description.slice(0, 160),
		alternates: { canonical: `/modeles/${modele.id}` },
		openGraph: {
			title: `${modele.name} — KPANDJI Automobiles`,
			description: modele.description.slice(0, 160),
			type: "website",
			locale: "fr_FR",
			images: [{ url: modele.media.topImage, alt: modele.name }],
		},
	};
}

function DetailMediaTile({
	src,
	alt,
	priority = false,
	className = "",
	label,
}: {
	src: string;
	alt: string;
	priority?: boolean;
	className?: string;
	label?: string;
}) {
	return (
		<div
			className={`h-full w-full rounded-[22px] bg-kp-bg/80 p-1.5 ring-1 ring-white/6 ${className}`}>
			<div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
				<Image
					src={src}
					alt={alt}
					fill
					priority={priority}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					loading={priority ? "eager" : "lazy"}
					className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
				/>
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/35" />
				<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
				{label ? (
					<div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
						<span className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
							{label}
						</span>
					</div>
				) : null}
			</div>
		</div>
	);
}

function DetailVideoTile({ src, label }: { src: string; label?: string }) {
	return (
		<div className="h-full w-full rounded-[22px] bg-kp-bg/80 p-1.5 ring-1 ring-white/6">
			<div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
				<video
					className="h-full w-full object-cover"
					src={src}
					autoPlay
					muted
					loop
					playsInline
					controls
					preload="metadata"
				/>
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/40" />
				<div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
				{label ? (
					<div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
						<span className="inline-flex rounded-full border border-white/20 bg-black/45 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
							{label}
						</span>
					</div>
				) : null}
			</div>
		</div>
	);
}

const btnGold =
	"inline-flex w-full items-center justify-center rounded-full border border-kp-gold/45 bg-white/95 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.65)] transition duration-300 ease-out hover:scale-[1.02] hover:border-kp-gold/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg active:scale-[0.98]";

const btnGhost =
	"inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-kp-accent transition duration-300 ease-out hover:border-kp-gold/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kp-bg";

export default async function ModeleDetailPage({ params }: Props) {
	const { id } = await params;
	const modele = getModeleById(id);
	if (!modele) {
		notFound();
	}

	const { media, name, description, extern, intern, back } = modele;
	const contactHref = `/contact?modele=${encodeURIComponent(modele.id)}`;
	const brochureFilename =
		modele.brochureHref.split("/").pop() ?? "fiche-technique.pdf";
	const externBlocks = [
		{ image: extern.desc1.ext1, text: extern.desc1.descDetail1 },
		{ image: extern.desc2.ext2, text: extern.desc2.descDetail2 },
		{ image: extern.desc3.ext3, text: extern.desc3.descDetail3 },
	];
	const index = MODELES.findIndex((m) => m.id === modele.id);
	const prev = index > 0 ? MODELES[index - 1] : null;
	const next =
		index >= 0 && index < MODELES.length - 1 ? MODELES[index + 1] : null;

	return (
		<div className="min-h-screen bg-kp-bg">
			<header className="relative w-full overflow-hidden border-b border-white/10 bg-black pt-[110px] md:pt-[132px]">
				<div className="relative aspect-video max-h-[min(68vh,880px)] w-full md:aspect-21/9">
					<video
						className="h-full w-full object-cover"
						src={media.topVideo}
						autoPlay
						muted
						loop
						playsInline
						controls
						preload="auto"
					/>

					<div
						className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset"
						aria-hidden
					/>
					<div className="absolute inset-x-0 top-0 z-10 px-5 pt-4 md:px-10 md:pt-5">
						<div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
							<Link
								href="/#modeles"
								className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md transition hover:border-kp-gold/45 hover:text-white">
								<span aria-hidden>←</span>
								Modèles
							</Link>
							<p className="hidden font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/45 sm:block">
								KPANDJI Automobiles
							</p>
						</div>
					</div>
					<div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 pt-20 md:px-10 md:pb-10 md:pt-24">
						<div
							className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/85 via-black/35 to-transparent md:h-64"
							aria-hidden
						/>
						<Reveal
							amount={0.01}
							margin="0px 0px 25% 0px"
							from="bottom"
							distance="md"
							className="relative mx-auto max-w-[1600px]">
							<div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
								<div className="flex flex-col items-start">
									<span
										className="h-px w-24 bg-linear-to-r from-kp-gold/90 via-kp-gold/50 to-transparent md:w-40"
										aria-hidden
									/>

									<h1 className="mt-3 max-w-[18ch] font-serif text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
										{name}
									</h1>
									<p className="mt-4 max-w-[62ch] text-pretty text-sm leading-relaxed text-white/70 md:text-base md:leading-7">
										{description.slice(0, 180)}
										{description.length > 180 ? "…" : ""}
									</p>
								</div>
								<div className="hidden lg:block">
									<div className="grid gap-3 rounded-[24px] border border-white/10 bg-black/25 p-5 ring-1 ring-white/5 backdrop-blur-md">
										<Link href={contactHref} className={btnGold}>
											Nous contacter
										</Link>
										<a
											href={modele.brochureHref}
											download={brochureFilename}
											className={btnGhost}>
											Fiche technique
										</a>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</header>

			<main className="relative">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_15%_0%,rgba(201,169,98,0.1),transparent_55%),radial-gradient(800px_480px_at_92%_35%,rgba(255,255,255,0.05),transparent_58%)]"
				/>
				<span
					className="mx-auto block h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-52"
					aria-hidden
				/>

				<section
					id="exploration-angles"
					aria-labelledby="modele-angles-heading"
					className="relative overflow-hidden border-b border-white/6 bg-kp-bg/80">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_360px_at_8%_0%,rgba(201,169,98,0.07),transparent_60%),radial-gradient(560px_320px_at_100%_100%,rgba(255,255,255,0.04),transparent_55%)]"
					/>
					<div className="relative mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24 lg:py-28 -mt-10">
						<h2 id="modele-angles-heading" className="sr-only">
							Vues détaillées de {name} — intérieur, avant et arrière
						</h2>
						<ModeleAnglesExplorer
							name={name}
							modele={{ intern, extern, back }}
						/>
					</div>
				</section>


				


				<section
					id="caracteristiques"
					aria-label={`Caractéristiques de ${name}`}>
					<ModeleCaracteristiquesShowcase
						name={name}
						characteristics={modele.characteristics}
						bgSlideImage={media.bgSlideImage}
						slideImage={media.slideImage}
					/>
				</section>

				<section
					id="points-forts"
					aria-labelledby="modele-extern-heading"
					className="relative overflow-hidden border-b border-white/6 bg-kp-bg py-16 md:py-24 lg:py-28">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(880px_520px_at_8%_18%,rgba(201,169,98,0.12),transparent_62%),radial-gradient(760px_420px_at_96%_34%,rgba(255,255,255,0.055),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%,rgba(255,255,255,0.02))]"
					/>
					<div
						aria-hidden
						className="kp-grain pointer-events-none absolute inset-0 opacity-[0.08]"
					/>
					<div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
						<Reveal from="bottom" distance="md" amount={0.1}>
							<header className="mx-auto flex max-w-5xl flex-col items-center text-center">
								<h2
									id="modele-extern-heading"
									className="mt-6 max-w-[13ch] font-serif text-[clamp(2rem,5vw,4.35rem)] font-medium leading-[0.98] tracking-[-0.045em] text-kp-accent">
									{name}
									<span className="block bg-linear-to-r from-kp-gold via-kp-gold/85 to-kp-accent bg-clip-text pt-2 font-sans text-[0.22em] font-semibold uppercase tracking-[0.42em] text-transparent md:pt-3">
										Points forts
									</span>
								</h2>
								<p className="mt-6 max-w-[64ch] text-pretty text-sm leading-7 text-kp-muted md:text-base md:leading-8">
									Une lecture claire des détails qui donnent au modèle sa
									présence, avec des visuels immersifs et une présentation
									fluide sur tous les écrans.
								</p>
							</header>
						</Reveal>

						<div className="relative mt-14 space-y-7 md:mt-20 md:space-y-10">
							<div
								aria-hidden
								className="pointer-events-none absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-transparent via-kp-gold/20 to-transparent lg:block"
							/>
							{externBlocks.map((block, i) => {
								const imageOnRight = i % 2 === 1;
								const n = String(i + 1).padStart(2, "0");
								return (
									<article
										key={`${block.image}-${i}`}
										className="group/row relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-white/7.5 via-kp-elevated/55 to-kp-bg/95 p-4 shadow-[0_30px_110px_-54px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.07] backdrop-blur-sm transition duration-500 hover:border-kp-gold/24 md:rounded-[34px] md:p-6 lg:p-8">
										<div
											aria-hidden
											className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
											<div className="absolute -right-24 -top-24 size-[min(62vw,380px)] rounded-full bg-kp-gold/7.5 blur-3xl transition duration-1000 group-hover/row:bg-kp-gold/12" />
											<div className="absolute -bottom-28 left-8 size-[min(58vw,340px)] rounded-full bg-white/[0.035] blur-3xl" />
											<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/45 to-transparent opacity-80" />
										</div>
										<div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
											<Reveal
												from={imageOnRight ? "right" : "left"}
												delayMs={i * 40}
												distance="lg"
												amount={0}
												margin="0px 0px 12% 0px"
												className={imageOnRight ? "md:order-2" : "md:order-1"}>
												<div className="relative mx-auto w-full max-w-3xl md:mx-0">
													<div
														aria-hidden
														className="absolute -inset-3 rounded-[30px] bg-linear-to-br from-kp-gold/24 via-white/[0.07] to-transparent opacity-75 blur-2xl md:-inset-4"
													/>
													<div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-kp-surface/60 p-1.5 shadow-[0_34px_90px_-42px_rgba(0,0,0,0.98)] ring-1 ring-white/8 transition duration-700 ease-out group-hover/row:border-kp-gold/30 group-hover/row:shadow-[0_44px_110px_-48px_rgba(201,169,98,0.2)] md:rounded-[28px]">
														<div className="relative aspect-16/11 w-full overflow-hidden rounded-[19px] md:aspect-4/3 md:rounded-[23px] xl:aspect-16/10">
															<Image
																src={block.image}
																alt={`${name} — illustration ${i + 1}`}
																fill
																sizes="(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1280px) 48vw, 720px"
																className="object-cover object-center transition duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-[1.03]"
															/>
															<div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/48 via-transparent to-white/8" />
															<div
																aria-hidden
																className="pointer-events-none absolute inset-y-0 left-0 w-[38%] -translate-x-[125%] bg-linear-to-r from-transparent via-white/16 to-transparent opacity-0 transition duration-1000 ease-out group-hover/row:translate-x-[280%] group-hover/row:opacity-100"
															/>
															<div className="absolute left-4 top-4 rounded-full border border-white/16 bg-black/35 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md md:left-5 md:top-5">
																Détail {n}
															</div>
														</div>
													</div>
												</div>
											</Reveal>
											<div
												className={`flex min-w-0 w-full flex-col justify-center rounded-[24px] border border-white/8 bg-black/12 p-5 ring-1 ring-white/4 md:p-7 lg:p-8 ${imageOnRight ? "md:order-1" : "md:order-2"}`}>
												<div className="flex items-center gap-4">
													<span
														className="font-serif text-[clamp(3rem,8vw,5.75rem)] font-medium leading-none tracking-[-0.08em] text-kp-gold/24"
														aria-hidden>
														{n}
													</span>
													<span
														className="h-px min-w-10 flex-1 bg-linear-to-r from-kp-gold/60 via-kp-gold/20 to-transparent"
														aria-hidden
													/>
												</div>

												<p className="mt-4 w-full min-w-0 max-w-[64ch] wrap-break-word text-pretty font-serif text-[clamp(1.08rem,2vw,1.42rem)] font-normal leading-[1.72] tracking-[-0.025em] text-kp-accent/92 [font-variant-numeric:oldstyle-nums] hyphens-auto font-features-['kern'_1,'liga'_1,'clig'_1,'onum'_1] md:mt-6 md:leading-[1.82]">
													{block.text.trim()}
												</p>
												<div
													aria-hidden
													className="mt-7 h-px w-28 bg-linear-to-r from-kp-gold/60 to-transparent"
												/>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</section>

				<section
					id="galerie"
					aria-labelledby="galerie-heading"
					className="relative overflow-hidden py-14 md:py-20">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_8%_18%,rgba(201,169,98,0.1),transparent_58%),radial-gradient(840px_420px_at_94%_82%,rgba(255,255,255,0.06),transparent_62%)]"
					/>
					<div className="mx-auto max-w-[1600px] px-5 md:px-10">
						<div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-kp-elevated/50 p-5 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.07] backdrop-blur-sm md:rounded-[34px] md:p-8 lg:p-10">
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0)_100%)]"
							/>
							<div
								aria-hidden
								className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/30 to-transparent"
							/>
							<Reveal from="bottom" distance="md" amount={0.11}>
								<header className="relative mx-auto max-w-3xl text-center">
									<span
										className="mx-auto block h-px w-28 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent md:w-52"
										aria-hidden
									/>
									<p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.38em] text-kp-muted">
										Médias
									</p>
									<h2
										id="galerie-heading"
										className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.7rem)] font-medium leading-tight tracking-[-0.02em] text-kp-accent">
										Galerie immersive
									</h2>
									<p className="mx-auto mt-4 max-w-[58ch] text-sm leading-relaxed text-kp-muted md:text-base">
										Découvrez {name} sous plusieurs angles, avec une mise en
										page pensée pour une navigation fluide sur mobile, tablette
										et desktop.
									</p>
								</header>
							</Reveal>

							<div className="relative mt-10 space-y-5 md:mt-12 md:space-y-6">
								<div className="grid w-full gap-5 md:h-[360px] md:grid-cols-3 md:gap-6 lg:h-[450px]">
									<Reveal
										from="left"
										distance="lg"
										amount={0.08}
										className="aspect-video md:col-span-1 md:aspect-auto md:h-full">
										<DetailMediaTile
											src={media.topImage}
											alt={`${name} — visuel principal`}
											priority
											label="Design extérieur"
										/>
									</Reveal>
									<Reveal
										from="right"
										distance="lg"
										delayMs={130}
										amount={0.08}
										className="aspect-video md:col-span-2 md:aspect-auto md:h-full">
										<DetailVideoTile src={media.topVideo} label="Vidéo" />
									</Reveal>
								</div>

								<div className="mt-3.5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
									<Reveal
										from="bottom"
										distance="md"
										delayMs={90}
										amount={0.08}
										className="aspect-16/10">
										<DetailMediaTile
											src={media.bottomLeftImage}
											alt={`${name} — intérieur`}
											label="Intérieur"
										/>
									</Reveal>
									<Reveal
										from="bottom"
										distance="md"
										delayMs={200}
										amount={0.08}
										className="aspect-16/10">
										<DetailMediaTile
											src={media.bottomRightImage}
											alt={`${name} — extérieur`}
											label="Signature visuelle"
										/>
									</Reveal>
								</div>
							</div>
						</div>
					</div>
				</section>

				{(prev || next) && (
					<nav
						aria-label="Modèles précédent et suivant"
						className="border-t border-white/8 bg-kp-surface/40">
						<div className="mx-auto grid max-w-[1600px] gap-4 px-5 py-5 md:grid-cols-2 md:gap-5 md:px-10 md:py-8">
							{prev ? (
								<Reveal
									from="left"
									distance="md"
									amount={0.06}
									margin="0px 0px -4% 0px">
									<Link
										href={`/modeles/${prev.id}`}
										className="group relative isolate flex h-full min-h-[200px] flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-kp-bg px-6 py-8 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.95)] ring-1 ring-white/5 transition duration-500 hover:border-kp-gold/20 hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 focus-visible:ring-inset md:min-h-0 md:px-10 md:py-12">
										<div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
											<div className="absolute inset-0 bg-linear-to-r from-kp-gold/6 via-transparent to-transparent" />
										</div>
										<div className="flex flex-row items-center gap-x-4">
											<div className="flex flex-col items-start">
												<span className="relative font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-kp-muted transition group-hover:text-kp-gold/90 group-focus-visible:text-kp-gold/90">
													← Précédent
												</span>
												<span className="relative mt-3 font-serif text-xl font-medium text-kp-accent transition group-hover:text-white group-focus-visible:text-white md:text-2xl">
													{prev.name}
												</span>
											</div>
											<div className="relative mt-5 w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.95)]">
												<Image
													src={prev.media.topImage}
													alt={prev.name}
													width={480}
													height={270}
													className="h-auto w-full object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-visible:scale-[1.06]"
												/>
												<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-60 group-focus-visible:opacity-60" />
												<div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between px-4 pb-3 text-[10px] uppercase tracking-[0.24em] text-white/85 opacity-0 transition duration-500 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
													<span>Voir le modèle</span>
													<span>↗</span>
												</div>
											</div>
										</div>
									</Link>
								</Reveal>
							) : (
								<div
									className="hidden rounded-2xl border border-transparent md:block"
									aria-hidden
								/>
							)}
							{next ? (
								<Reveal
									from="right"
									distance="md"
									delayMs={90}
									amount={0.06}
									margin="0px 0px -4% 0px">
									<Link
										href={`/modeles/${next.id}`}
										className="group relative isolate flex h-full min-h-[200px] flex-col items-end justify-center overflow-hidden rounded-2xl border border-white/10 bg-kp-bg px-6 py-8 text-right shadow-[0_18px_45px_-28px_rgba(0,0,0,0.95)] ring-1 ring-white/5 transition duration-500 hover:border-kp-gold/20 hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 focus-visible:ring-inset md:min-h-0 md:px-10 md:py-12">
										<div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
											<div className="absolute inset-0 bg-linear-to-l from-kp-gold/6 via-transparent to-transparent" />
										</div>
										<div className="flex w-full flex-col-reverse items-end gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-x-4">
											<div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.95)]">
												<Image
													src={next.media.topImage}
													alt={next.name}
													width={480}
													height={270}
													className="h-auto w-full object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-visible:scale-[1.06]"
												/>
												<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-60 group-focus-visible:opacity-60" />
												<div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between px-4 pb-3 text-[10px] uppercase tracking-[0.24em] text-white/85 opacity-0 transition duration-500 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
													<span>Voir le modèle</span>
													<span>↗</span>
												</div>
											</div>
											<div className="flex flex-col items-end">
												<span className="relative font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-kp-muted transition group-hover:text-kp-gold/90 group-focus-visible:text-kp-gold/90">
													Suivant →
												</span>
												<span className="relative mt-3 font-serif text-xl font-medium text-kp-accent transition group-hover:text-white group-focus-visible:text-white md:text-2xl">
													{next.name}
												</span>
											</div>
										</div>
									</Link>
								</Reveal>
							) : (
								<div
									className="hidden rounded-2xl border border-transparent md:block"
									aria-hidden
								/>
							)}
						</div>
					</nav>
				)}

				<div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-kp-bg/60 p-4 backdrop-blur-md supports-backdrop-filter:bg-kp-bg/40 lg:hidden">
					<div className="pointer-events-auto mx-auto grid max-w-[520px] grid-cols-2 gap-3">
						<Link href={contactHref} className={btnGold}>
							Contact
						</Link>
						<a
							href={modele.brochureHref}
							download={brochureFilename}
							className={btnGhost}>
							Fiche
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
