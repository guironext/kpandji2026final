import type { Metadata } from "next";
import { ContactPageContent } from "@/components/kp/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — KPANDJI AUTOMOBILES",
  description:
    "Écrivez à KPANDJI AUTOMOBILES : renseignements sur la gamme, disponibilité, partenariat ou service après-vente.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — KPANDJI AUTOMOBILES",
    description:
      "Contactez l’équipe KPANDJI pour toute question sur nos véhicules et services.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
