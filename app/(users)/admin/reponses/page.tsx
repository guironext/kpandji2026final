"use client";

import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { AdminMessagesInbox } from "@/components/kp/AdminMessagesInbox";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function AdminReponsesPage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={tr("Réponses aux messages", "Message replies")}
        description={tr(
          "Lisez les messages des membres Prestige et répondez depuis votre espace administrateur.",
          "Read messages from Prestige members and reply from your admin area."
        )}
      />
      <AdminMessagesInbox />
    </div>
  );
}
