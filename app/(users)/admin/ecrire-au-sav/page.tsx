import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { EcrireSavTable } from "./EcrireSavTable";
import { prisma } from "@/lib/db";

export default async function EcrireAuSavPage() {
  const requests = await prisma.ecrireSav.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = requests.map((request) => ({
    id: request.id,
    name: request.name,
    contact: request.contact,
    modeleVehicule: request.modeleVehicule,
    panne: request.panne,
    localisation: request.localisation,
    createdAt: request.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Écrire au S.A.V."
        description="Consultez toutes les demandes envoyées depuis le formulaire public."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Demandes reçues</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {requests.length} demande
          {requests.length !== 1 ? "s" : ""} — triées par date (plus récentes
          en premier).
        </p>

        <EcrireSavTable rows={rows} />
      </section>
    </div>
  );
}
