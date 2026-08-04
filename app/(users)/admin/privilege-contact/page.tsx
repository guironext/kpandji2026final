import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
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
        title="Contact Privilégié"
        description="Consultez toutes les demandes de contact privilégié soumises depuis le site public."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Contacts reçus</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {contacts.length} contact
          {contacts.length !== 1 ? "s" : ""} — triés par date (plus récents en
          premier).
        </p>

        <PrivilegeContactTable rows={rows} />
      </section>
    </div>
  );
}
