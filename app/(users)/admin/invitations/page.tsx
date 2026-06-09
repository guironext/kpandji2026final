import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { InvitePanel } from "@/components/kp/AdminPanel";

export default function AdminInvitationsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Invitations"
        description="Créez des liens d’invitation pour de nouveaux administrateurs ou membres Prestige."
      />
      <InvitePanel />
    </div>
  );
}
