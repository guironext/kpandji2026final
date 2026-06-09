import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { MembersPanel } from "@/components/kp/AdminPanel";

export default function AdminMembresPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Validation des membres"
        description="Approuvez ou refusez les nouvelles demandes d’accès à l’espace privé KPANDJI."
      />
      <MembersPanel />
    </div>
  );
}
