import type { Metadata } from "next";
import EcologyPageContent from "@/components/kp/EcologyPageContent";

export const metadata: Metadata = {
  title: "ECO KPANDJI — Développement durable — KPANDJI AUTOMOBILES",
  description:
    "ECO KPANDJI : assemblage local, partenariats ONG pour le reboisement et éco-conception adaptée au Grand Abidjan.",
  alternates: { canonical: "/ecologie" },
  openGraph: {
    title: "ECO KPANDJI — KPANDJI AUTOMOBILES",
    description:
      "Excellence technologique, responsabilité environnementale et progrès social au bénéfice de la jeunesse ivoirienne.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function EcologiePage() {
  return <EcologyPageContent />;
}
