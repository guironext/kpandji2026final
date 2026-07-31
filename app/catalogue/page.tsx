import type { Metadata } from "next";
import Catalogue from "@/components/kp/Catalogue";

export const metadata: Metadata = {
  title: "Catalogue 2026 — KPANDJI AUTOMOBILES",
  description:
    "Consultez et téléchargez le catalogue KPANDJI 2026 : gamme, tarifs et documentation.",
  alternates: {
    canonical: "/catalogue",
  },
  openGraph: {
    title: "Catalogue 2026 — KPANDJI AUTOMOBILES",
    description:
      "Consultez et téléchargez le catalogue KPANDJI 2026.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function CataloguePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-kp-bg text-white">
      <main className="relative w-full overflow-hidden">
        <Catalogue />
      </main>
    </div>
  );
}
