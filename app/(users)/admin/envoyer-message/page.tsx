import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { AdminSendMessage } from "@/components/kp/AdminSendMessage";

export default function AdminEnvoyerMessagePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Envoyer un message"
        description="Contactez directement un membre Prestige approuvé."
      />
      <AdminSendMessage />
    </div>
  );
}
