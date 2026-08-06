import type { Metadata } from "next";
import { EmploisPageContent } from "@/components/kp/EmploisPageContent";

export const metadata: Metadata = {
title: "Candidatures — KPANDJI AUTOMOBILES",
  description:
    "Envoyez votre candidature à KPANDJI AUTOMOBILES : parcours, compétences et CV joignez à votre message à notre équipe RH.",
  alternates: {
    canonical: "/emplois",
  },
  openGraph: {
    title: "Candidatures — KPANDJI AUTOMOBILES",
    description:
      "Postulez auprès de KPANDJI AUTOMOBILES : formulaire guidé puis envoi par e-mail avec votre CV.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function EmploisCandidaturePage() {
  return <EmploisPageContent />;
}
