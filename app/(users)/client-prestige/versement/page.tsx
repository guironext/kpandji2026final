"use client";

import { KpPageHeader } from "@/components/kp/KpPageHeader";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function VersementPage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow={tr("Espace Prestige", "Prestige area")}
        title={tr("Versement", "Payment")}
        description={tr(
          "Suivez l’historique de vos versements et les reversements de revenus locatifs.",
          "Track the history of your payments and rental income payouts."
        )}
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          {tr(
            "Aucun versement enregistré pour le moment.",
            "No payments recorded at the moment."
          )}
        </p>
      </div>
    </div>
  );
}
