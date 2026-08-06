"use client";

import { KpPageHeader } from "@/components/kp/KpPageHeader";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function MessagePage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow={tr("Espace Prestige", "Prestige area")}
        title={tr("Message", "Message")}
        description={tr(
          "Échangez avec l’équipe KPANDJI et consultez vos conversations.",
          "Chat with the KPANDJI team and view your conversations."
        )}
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          {tr(
            "Aucun message pour le moment. Vous pourrez bientôt contacter l’équipe depuis cet espace.",
            "No messages at the moment. You'll soon be able to contact the team from this area."
          )}
        </p>
      </div>
    </div>
  );
}
