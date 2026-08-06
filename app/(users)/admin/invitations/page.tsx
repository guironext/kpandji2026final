"use client";

import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { InvitePanel } from "@/components/kp/AdminPanel";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function AdminInvitationsPage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={tr("Invitations", "Invitations")}
        description={tr(
          "Créez des liens d’invitation pour de nouveaux administrateurs ou membres Prestige.",
          "Create invitation links for new administrators or Prestige members."
        )}
      />
      <InvitePanel />
    </div>
  );
}
