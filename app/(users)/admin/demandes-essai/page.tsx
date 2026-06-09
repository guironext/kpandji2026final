import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { EssaiRequestsTable } from "./EssaiRequestsTable";
import { getModeleById } from "@/data/modeles";
import { prisma } from "@/lib/db";

function formatModelNames(modelIds: string[]) {
  if (modelIds.length === 0) return "—";

  return modelIds
    .map((id) => getModeleById(id)?.name ?? id)
    .join(", ");
}

export default async function DemandesEssaiPage() {
  const requests = await prisma.essaiRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = requests.map((request) => ({
    id: request.id,
    name: request.name,
    email: request.email,
    phone: request.phone,
    models: formatModelNames(request.modelIds as string[]),
    preferredDate: request.preferredDate ?? "",
    timeSlot: request.timeSlot ?? "",
    message: request.message ?? "",
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Demandes d'essai"
        description="Consultez toutes les demandes d'essai soumises depuis la page publique."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Demandes reçues</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {requests.length} demande
          {requests.length !== 1 ? "s" : ""} — triées par date (plus récentes
          en premier).
        </p>

        {requests.length === 0 ? (
          <p className="mt-6 font-sans text-sm text-white/50">
            Aucune demande d&apos;essai pour le moment.
          </p>
        ) : (
          <EssaiRequestsTable requests={rows} />
        )}
      </section>
    </div>
  );
}
