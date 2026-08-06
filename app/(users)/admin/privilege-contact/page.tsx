import { AdminCountLine } from "@/components/kp/AdminCountLine";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { Tr } from "@/components/kp/Tr";
import { PrivilegeContactTable } from "@/app/(users)/admin/privilege-contact/PrivilegeContactTable";
import { prisma } from "@/lib/db";

export default async function PrivilegeContactPage() {
  const contacts = await prisma.privilegeContact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    country: contact.country,
    city: contact.city,
    phone: contact.phone,
    email: contact.email,
    createdAt: contact.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={<Tr fr="Contact Privilégié" en="Privileged contact" />}
        description={
          <Tr
            fr="Consultez toutes les demandes de contact privilégié soumises depuis le site public."
            en="View all privileged contact requests submitted from the public site."
          />
        }
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">
          <Tr fr="Contacts reçus" en="Received contacts" />
        </h2>
        <AdminCountLine
          count={contacts.length}
          singular={{
            fr: "{n} contact — trié par date (plus récents en premier).",
            en: "{n} contact — sorted by date (most recent first).",
          }}
          plural={{
            fr: "{n} contacts — triés par date (plus récents en premier).",
            en: "{n} contacts — sorted by date (most recent first).",
          }}
        />

        <PrivilegeContactTable rows={rows} />
      </section>
    </div>
  );
}
