import type { Metadata } from "next";
import { AccessoiresBoutique } from "@/components/kp/AccessoiresBoutique";

export const metadata: Metadata = {
  title: "Accessoires — KPANDJI AUTOMOBILES",
  description:
    "Accessoires d’origine et équipements KPANDJI : barres de toit, protections, housses et plus. Commande et devis en ligne par e-mail.",
  alternates: {
    canonical: "/accessoires",
  },
  openGraph: {
    title: "Accessoires — KPANDJI AUTOMOBILES",
    description:
      "Boutique accessoires : demandez un devis ou passez commande par e-mail. Qualité constructeur.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function AccessoiresPage() {
  return (
    <div className="min-h-screen bg-kp-bg">
      <main className="relative mt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_10%,rgba(201,169,98,0.08),transparent_60%),radial-gradient(900px_600px_at_82%_60%,rgba(255,255,255,0.04),transparent_62%)]"
        />
        <AccessoiresBoutique />
      </main>
    </div>
  );
}
