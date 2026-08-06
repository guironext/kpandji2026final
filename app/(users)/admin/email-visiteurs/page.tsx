import { AdminCountLine } from "@/components/kp/AdminCountLine";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { Tr } from "@/components/kp/Tr";
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
        title={<Tr fr="Emails visiteurs" en="Visitor emails" />}
        description={
          <Tr
            fr="Consultez toutes les adresses e-mail collectées depuis le site public."
            en="View all email addresses collected from the public site."
          />
        }
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">
          <Tr fr="E-mails collectés" en="Collected emails" />
        </h2>
        <AdminCountLine
          count={visitorEmails.length}
          singular={{
            fr: "{n} adresse — triée par date (plus récentes en premier).",
            en: "{n} address — sorted by date (most recent first).",
          }}
          plural={{
            fr: "{n} adresses — triées par date (plus récentes en premier).",
            en: "{n} addresses — sorted by date (most recent first).",
          }}
        />

        <VisitorEmailsTable emails={rows} />
      </section>
    </div>
  );
}
