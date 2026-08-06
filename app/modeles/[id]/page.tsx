import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModeleById, MODELES } from "@/data/modeles";
import { ModeleDetailContent } from "@/components/kp/ModeleDetailContent";

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
		description: modele.description.fr.slice(0, 160),
		alternates: { canonical: `/modeles/${modele.id}` },
		openGraph: {
			title: `${modele.name} — KPANDJI Automobiles`,
			description: modele.description.fr.slice(0, 160),
			type: "website",
			locale: "fr_FR",
			images: [{ url: modele.media.topImage, alt: modele.name }],
		},
	};
}

export default async function ModeleDetailPage({ params }: Props) {
	const { id } = await params;
	const modele = getModeleById(id);
	if (!modele) {
		notFound();
	}

	const index = MODELES.findIndex((m) => m.id === modele.id);
	const prev = index > 0 ? MODELES[index - 1] : null;
	const next =
		index >= 0 && index < MODELES.length - 1 ? MODELES[index + 1] : null;

	return <ModeleDetailContent modele={modele} prev={prev} next={next} />;
}
