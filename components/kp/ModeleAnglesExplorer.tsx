"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { Modele } from "@/data/modeles";
import type { Copy } from "@/lib/i18n/pick";
import { useLocale } from "@/components/providers/KpLocaleProvider";
import type { Locale } from "@/lib/i18n/config";

type AngleKey = "intern" | "extern" | "back";

type Slide = { src: string; text: string };

type AngleDesc = {
	ext: string;
	text: Copy;
};

/** One of `Modele.intern` | `Modele.extern` | `Modele.back` from `data/modeles.ts` (same shape). */
function slidesFromAngleBlock(
	block: Modele["intern"] | Modele["extern"] | Modele["back"],
	locale: Locale,
): Slide[] {
	const candidates: AngleDesc[] = [
		{ ext: block.desc1.ext1, text: block.desc1.descDetail1 },
		{ ext: block.desc2.ext2, text: block.desc2.descDetail2 },
		{ ext: block.desc3.ext3, text: block.desc3.descDetail3 },
	];

	if (block.desc4) {
		candidates.push({
			ext: block.desc4.ext4,
			text: block.desc4.descDetail4,
		});
	}

	return candidates
		.filter(({ ext, text }) => Boolean(ext && text?.[locale]))
		.map(({ ext, text }) => ({ src: ext, text: text[locale] }));
}

const ANGLES: {
	key: AngleKey;
	labelFr: string;
	labelEn: string;
	bgIdle: string;
	bgActive: string;
}[] = [
	{
		key: "intern",
		labelFr: "Intérieur",
		labelEn: "Interior",
		bgIdle:
			"bg-linear-to-b from-emerald-950/55 via-emerald-950/25 to-kp-bg/90 border-emerald-500/20",
		bgActive:
			"bg-linear-to-b from-emerald-900/75 via-emerald-950/45 to-kp-bg border-emerald-400/45 ring-emerald-400/30",
	},
	{
		key: "extern",
		labelFr: "Avant",
		labelEn: "Front",
		bgIdle:
			"bg-linear-to-b from-kp-gold/28 via-amber-950/20 to-kp-bg/90 border-kp-gold/25",
		bgActive:
			"bg-linear-to-b from-kp-gold/45 via-amber-950/35 to-kp-bg border-kp-gold/55 ring-kp-gold/35",
	},
	{
		key: "back",
		labelFr: "Arrière",
		labelEn: "Rear",
		bgIdle:
			"bg-linear-to-b from-slate-900/70 via-zinc-900/35 to-kp-bg/90 border-slate-500/25",
		bgActive:
			"bg-linear-to-b from-slate-800/85 via-zinc-900/50 to-kp-bg border-slate-300/35 ring-white/15",
	},
];

export type ModeleAngleVues = Pick<Modele, "intern" | "extern" | "back">;

type Props = {
	name: string;
	/** Intérieur / avant / arrière : `modele.intern`, `modele.extern`, `modele.back` dans `data/modeles.ts`. */
	modele: ModeleAngleVues;
};

export function ModeleAnglesExplorer({ name, modele }: Props) {
	const { locale, tr } = useLocale();
	const angleBlocks = useMemo(
		() =>
			({
				intern: modele.intern,
				extern: modele.extern,
				back: modele.back,
			}) satisfies Record<
				AngleKey,
				Modele["intern"] | Modele["extern"] | Modele["back"]
			>,
		[modele.intern, modele.extern, modele.back],
	);

	const [angle, setAngle] = useState<AngleKey>("extern");
	const [index, setIndex] = useState(0);

	const slides = useMemo(
		() => slidesFromAngleBlock(angleBlocks[angle], locale),
		[angleBlocks, angle, locale],
	);

	const selectAngle = useCallback((next: AngleKey) => {
		setAngle(next);
		setIndex(0);
	}, []);

	const safeIndex = Math.min(
		Math.max(0, index),
		Math.max(0, slides.length - 1),
	);
	const current = slides[safeIndex] ?? slides[0];

	return (
		<div className="flex min-h-0 w-full flex-col gap-4 lg:min-h-[min(72vh,640px)] lg:flex-row lg:gap-0 lg:divide-x lg:divide-white/8">
			{/* Part A — narrow strip on large screens */}
			<div className="flex w-full shrink-0 flex-row gap-1.5 sm:gap-2 lg:h-full lg:min-h-0 lg:w-14 lg:flex-col lg:gap-1.5 lg:pr-2">
				{ANGLES.map(({ key, labelFr, labelEn, bgIdle, bgActive }) => {
					const active = angle === key;
					const label = tr(labelFr, labelEn);
					return (
						<button
							key={key}
							type="button"
							onClick={() => selectAngle(key)}
							className={`flex min-h-12 flex-1 flex-col items-center justify-center rounded-lg border px-1.5 py-2.5 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-kp-accent transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:px-2 sm:text-[10px] sm:tracking-[0.2em] lg:min-h-0 lg:w-full lg:flex-1 lg:rounded-xl lg:px-0 lg:py-6 lg:text-[8px] lg:leading-tight lg:tracking-[0.22em] ${
								active ? `${bgActive} ring-2` : `${bgIdle} hover:border-white/25 hover:bg-white/5`
							}`}>
							<span className="max-w-[12ch] leading-snug lg:max-w-none lg:[writing-mode:vertical-rl] lg:rotate-180">
								{label}
							</span>
						</button>
					);
				})}
			</div>

			{/* Part B */}
			<div className="flex w-full shrink-0 flex-row gap-2 overflow-x-auto lg:w-1/6 lg:flex-col lg:gap-3 lg:overflow-y-auto lg:px-3 lg:py-1 p-2">
				{slides.map((slide, i) => {
					const selected = i === safeIndex;
					return (
						<button
							key={`${slide.src}-${i}`}
							type="button"
							onClick={() => setIndex(i)}
							className={`relative aspect-4/3 w-22 shrink-0 overflow-hidden rounded-xl border bg-black/30 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kp-gold/55 sm:w-24 lg:w-full ${
								selected
									? "border-kp-gold/55 ring-1 ring-kp-gold/35"
									: "border-white/10 hover:border-kp-gold/30"
							}`}
							aria-current={selected ? "true" : undefined}>
						<Image
							src={slide.src}
							alt={`${name} — ${tr(
								ANGLES.find((a) => a.key === angle)?.labelFr ?? "",
								ANGLES.find((a) => a.key === angle)?.labelEn ?? "",
							)} ${i + 1}`}
							fill
								sizes="120px"
								className="object-cover"
							/>
							<span
								className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-1.5 py-1 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90">
								{String(i + 1).padStart(2, "0")}
							</span>
						</button>
					);
				})}
			</div>

			{/* Part C */}
			<div className="flex w-full min-h-0 shrink-0 flex-col lg:w-1/6 lg:px-3 lg:py-1">
				<p className="mb-2 font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-kp-muted">
					{tr("Description", "Description")}
				</p>
				<div className="min-h-32 flex-1 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 ring-1 ring-white/5 lg:min-h-0">
					<p className="text-pretty text-xs leading-relaxed text-kp-muted md:text-[13px] md:leading-6">
						{current?.text ?? ""}
					</p>
				</div>
			</div>

			{/* Part D */}
			<div className="relative w-full min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-white/12 bg-black/40 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/8 lg:min-w-0 lg:flex-1">
				<div className="relative aspect-video w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:min-h-[min(72vh,640px)]">
					{current ? (
						<Image
							src={current.src}
							alt={`${name} — ${tr("vue détaillée", "detailed view")}`}
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover object-center"
						/>
					) : null}
					<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15" />
					<div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-6">
						<span className="inline-flex rounded-full border border-white/20 bg-black/45 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
							{tr(
								ANGLES.find((a) => a.key === angle)?.labelFr ?? "",
								ANGLES.find((a) => a.key === angle)?.labelEn ?? "",
							)}{" "}
							· {String(safeIndex + 1).padStart(2, "0")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
