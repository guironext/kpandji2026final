import { AdminCountLine } from "@/components/kp/AdminCountLine";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { Tr } from "@/components/kp/Tr";
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
        title={<Tr fr="Écrire au S.A.V." en="Write to support" />}
        description={
          <Tr
            fr="Consultez toutes les demandes envoyées depuis le formulaire public."
            en="View all requests sent from the public form."
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

        <EcrireSavTable rows={rows} />
      </section>
    </div>
  );
}
