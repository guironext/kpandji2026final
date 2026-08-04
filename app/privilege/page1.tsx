import type { Metadata } from "next";
import { PrestigePrivilege } from "@/components/kp/PrestigePrivilege";

export const metadata: Metadata = {
  title: "Prestige — Programme diaspora — KPANDJI AUTOMOBILES",
  description:
    "Programme Prestige : achetez votre véhicule KPANDJI depuis l’étranger, récupérez-le à votre arrivée en Côte d’Ivoire ou confiez sa location à KPANDJI et percevez les revenus.",
  alternates: { canonical: "/privilege" },
  openGraph: {
    title: "Prestige — KPANDJI AUTOMOBILES",
    description:
      "La diaspora au volant : investir dans un véhicule KPANDJI depuis l’étranger, avec deux options d’usage à distance.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function PrivilegePage() {
  return <PrestigePrivilege />;
}
