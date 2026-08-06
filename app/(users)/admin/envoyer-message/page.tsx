"use client";

import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { AdminSendMessage } from "@/components/kp/AdminSendMessage";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function AdminEnvoyerMessagePage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={tr("Envoyer un message", "Send a message")}
        description={tr(
          "Contactez directement un membre Prestige approuvé.",
          "Directly contact an approved Prestige member."
        )}
      />
      <AdminSendMessage />
    </div>
  );
}
