import type { Metadata } from "next";
import { OpportunitiesPageContent } from "@/components/kp/OpportunitiesPageContent";

export const metadata: Metadata = {
  title: "Opportunités — KPANDJI AUTOMOBILES",
  description:
    "Découvrez Kpandji Sira (flottes institutionnelles) et Kpandji Privilège (diaspora & particuliers) — deux programmes exclusifs KPANDJI AUTOMOBILES.",
  alternates: {
    canonical: "/opportunities",
  },
  openGraph: {
    title: "Opportunités — KPANDJI AUTOMOBILES",
    description:
      "Kpandji Sira pour les flottes, Kpandji Privilège pour la diaspora et les particuliers.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function OpportunitiesPage() {
  return <OpportunitiesPageContent />;
}
