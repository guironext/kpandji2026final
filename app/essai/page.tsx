import type { Metadata } from "next";
import { EssaiPageContent } from "@/components/kp/EssaiPageContent";

export const metadata: Metadata = {
  title: "Réserver un essai — KPANDJI AUTOMOBILES",
  description:
    "Demandez un essai routier KPANDJI : choisissez un ou plusieurs modèles et indiquez vos disponibilités.",
  alternates: {
    canonical: "/essai",
  },
  openGraph: {
    title: "Réserver un essai — KPANDJI AUTOMOBILES",
    description:
      "Réservez votre essai routier : sélectionnez les modèles DJETRAN, DJETRAN PLUS ou LATHAYE.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function EssaiPage() {
  return <EssaiPageContent />;
}
