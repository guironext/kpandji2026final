"use client";

import { KpPageHeader } from "@/components/kp/KpPageHeader";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function SouscriptionPage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow={tr("Espace Prestige", "Prestige area")}
        title={tr("Souscription", "Subscription")}
        description={tr(
          "Consultez et gérez votre adhésion au programme Prestige KPANDJI.",
          "View and manage your membership in the KPANDJI Prestige program."
        )}
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          {tr(
            "Votre espace de souscription sera bientôt disponible.",
            "Your subscription area will be available soon."
          )}
        </p>
      </div>
    </div>
  );
}
