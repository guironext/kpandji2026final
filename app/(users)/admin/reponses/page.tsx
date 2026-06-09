import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { AdminMessagesInbox } from "@/components/kp/AdminMessagesInbox";

export default function AdminReponsesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Réponses aux messages"
        description="Lisez les messages des membres Prestige et répondez depuis votre espace administrateur."
      />
      <AdminMessagesInbox />
    </div>
  );
}
