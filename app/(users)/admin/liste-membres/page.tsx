import { desc, eq } from "drizzle-orm";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { db, users, UserStatus } from "@/lib/db";

function displayValue(value: string | null | undefined) {
  return value?.trim() || "—";
}

export default async function ListeMembresPage() {
  const approvedMembers = await db.query.users.findMany({
    where: eq(users.status, UserStatus.APPROVED),
    orderBy: desc(users.approvedAt),
    columns: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      residenceCountry: true,
    },
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Liste des membres"
        description="Consultez tous les membres approuvés de l’espace privé KPANDJI."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Membres approuvés</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {approvedMembers.length} membre
          {approvedMembers.length !== 1 ? "s" : ""} approuvé
          {approvedMembers.length !== 1 ? "s" : ""}.
        </p>

        {approvedMembers.length === 0 ? (
          <p className="mt-6 font-sans text-sm text-white/50">
            Aucun membre approuvé pour le moment.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Nom
                  </th>
                  <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Numéro
                  </th>
                  <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Pays
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {approvedMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-white/2"
                  >
                    <td className="px-4 py-3.5 font-sans text-sm text-white/90">
                      {displayValue(member.fullName || member.email)}
                    </td>
                    <td className="px-4 py-3.5 font-sans text-sm text-white/70">
                      {displayValue(member.phone)}
                    </td>
                    <td className="px-4 py-3.5 font-sans text-sm text-white/70">
                      {displayValue(member.residenceCountry)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
