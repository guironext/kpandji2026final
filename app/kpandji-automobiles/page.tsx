import type { Metadata } from "next";
import BrandPageContent from "@/components/kp/BrandPageContent";

export const metadata: Metadata = {
  title: "Kpandji Automobiles — KPANDJI AUTOMOBILES",
  description:
    "Découvrez KPANDJI Automobiles : notre histoire, notre vision et l’engagement d’une équipe au service de la mobilité en Côte d’Ivoire et en Afrique.",
  alternates: {
    canonical: "/kpandji-automobiles",
  },
  openGraph: {
    title: "Kpandji Automobiles — KPANDJI AUTOMOBILES",
    description:
      "L’entreprise derrière KPANDJI AUTOMOBILES : ingénierie, assemblage et service client.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function KpandjiAutomobilesPage() {
  return <BrandPageContent />;
}
