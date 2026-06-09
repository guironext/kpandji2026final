import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { VisitorEmailsTable } from "./VisitorEmailsTable";
import { prisma } from "@/lib/db";

export default async function EmailVisiteursPage() {
  const visitorEmails = await prisma.visitorEmail.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = visitorEmails.map((entry) => ({
    id: entry.id,
    email: entry.email,
    createdAt: entry.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Emails visiteurs"
        description="Consultez toutes les adresses e-mail collectées depuis le site public."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">E-mails collectés</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {visitorEmails.length} adresse
          {visitorEmails.length !== 1 ? "s" : ""} — triées par date (plus
          récentes en premier).
        </p>

        <VisitorEmailsTable emails={rows} />
      </section>
    </div>
  );
}
