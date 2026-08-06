"use client";

import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { MembersPanel } from "@/components/kp/AdminPanel";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function AdminMembresPage() {
  const { tr } = useLocale();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={tr("Validation des membres", "Member approval")}
        description={tr(
          "Approuvez ou refusez les nouvelles demandes d’accès à l’espace privé KPANDJI.",
          "Approve or reject new access requests to the KPANDJI private area."
        )}
      />
      <MembersPanel pendingOnly />
    </div>
  );
}
