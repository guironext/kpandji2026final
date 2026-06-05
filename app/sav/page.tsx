import type { Metadata } from "next";
import { ServiceApresVente } from "@/components/kp/ServiceApresVente";

export const metadata: Metadata = {
  title: "Service après vente — KPANDJI AUTOMOBILES",
  description:
    "Entretien, pièces d’origine, garantie et accompagnement S.A.V. pour votre véhicule KPANDJI. Découvrez notre atelier en Côte d’Ivoire.",
  alternates: {
    canonical: "/sav",
  },
  openGraph: {
    title: "Service après vente — KPANDJI AUTOMOBILES",
    description:
      "Entretien, pièces d’origine et garantie. L’équipe S.A.V. KPANDJI à votre service.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function SavPage() {
  return (
    <div className="min-h-screen bg-kp-bg">
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_10%,rgba(201,169,98,0.08),transparent_60%),radial-gradient(900px_600px_at_82%_60%,rgba(255,255,255,0.04),transparent_62%)]"
        />
        <div
          aria-hidden
          className="kp-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
        />
        <ServiceApresVente />
      </main>
    </div>
  );
}
