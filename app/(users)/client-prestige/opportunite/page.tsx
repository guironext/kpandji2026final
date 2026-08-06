"use client";

import { KpPageHeader } from "@/components/kp/KpPageHeader";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function OpportunitePage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow={tr("Espace Prestige", "Prestige area")}
        title={tr("Opportunité", "Opportunity")}
        description={tr(
          "Découvrez les opportunités d’investissement et les projets disponibles dans le programme Prestige.",
          "Discover the investment opportunities and projects available in the Prestige program."
        )}
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          {tr(
            "Aucune opportunité disponible pour le moment. Revenez bientôt pour consulter les dernières offres.",
            "No opportunities available at the moment. Check back soon for the latest offers."
          )}
        </p>
      </div>
    </div>
  );
}
