import type { Metadata } from "next";
import { PrestigePrivilege } from "@/components/kp/PrestigePrivilege";

export const metadata: Metadata = {
  title: "Kpandji Privilège — Programme diaspora & investissement — KPANDJI AUTOMOBILES",
  description:
    "Offre exclusive Kpandji Privilège : acquérez votre véhicule neuf depuis la diaspora ou en Côte d'Ivoire. Paiement flexible, conciergerie, flotte élite et revenus locatifs.",
  alternates: { canonical: "/privilege" },
  openGraph: {
    title: "Kpandji Privilège — KPANDJI AUTOMOBILES",
    description:
      "Véhicule premium, paiement échelonné 6 à 24 mois, gardiennage diaspora et option flotte élite rentable.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function PrivilegePage() {
  return <PrestigePrivilege />;
}
