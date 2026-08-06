import { AdminCountLine } from "@/components/kp/AdminCountLine";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { Tr } from "@/components/kp/Tr";
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
        title={<Tr fr="Demandes d'essai" en="Test drive requests" />}
        description={
          <Tr
            fr="Consultez toutes les demandes d'essai soumises depuis la page publique."
            en="View all test drive requests submitted from the public site."
          />
        }
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">
          <Tr fr="Demandes reçues" en="Received requests" />
        </h2>
        <AdminCountLine
          count={requests.length}
          singular={{
            fr: "{n} demande — triée par date (plus récentes en premier).",
            en: "{n} request — sorted by date (most recent first).",
          }}
          plural={{
            fr: "{n} demandes — triées par date (plus récentes en premier).",
            en: "{n} requests — sorted by date (most recent first).",
          }}
        />

        {requests.length === 0 ? (
          <p className="mt-6 font-sans text-sm text-white/50">
            <Tr
              fr="Aucune demande d'essai pour le moment."
              en="No test drive requests at the moment."
            />
          </p>
        ) : (
          <EssaiRequestsTable requests={rows} />
        )}
      </section>
    </div>
  );
}
