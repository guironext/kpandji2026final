import type { Metadata } from "next";
import Sira from "@/components/kp/Sira";

export const metadata: Metadata = {
  title: "Kpandji Sira — Offre flotte institutionnelle — KPANDJI AUTOMOBILES",
  description:
    "Kpandji Sira : partenariat sur mesure pour acquérir une flotte de véhicules KPANDJI. Tarifs préférentiels et accompagnement de la conception à la livraison.",
  alternates: { canonical: "/sira" },
  openGraph: {
    title: "Kpandji Sira — KPANDJI AUTOMOBILES",
    description:
      "Flottes institutionnelles : modèles exclusifs, tarifs préférentiels et accompagnement complet.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function SiraPage() {
  return (
    <div className="min-h-screen bg-kp-bg">
      <Sira />
    </div>
  );
}
