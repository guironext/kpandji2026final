import { desc } from "drizzle-orm";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { VisitorMessagesTable } from "./VisitorMessagesTable";
import { db, visitorMessages } from "@/lib/db";

export default async function EmailVisiteursPage() {
  const messages = await db.query.visitorMessages.findMany({
    orderBy: desc(visitorMessages.createdAt),
  });

  const rows = messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone ?? "",
    subject: message.subject,
    message: message.message,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Emails visiteurs"
        description="Consultez tous les messages envoyés depuis le formulaire de contact public."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Messages reçus</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {messages.length} message
          {messages.length !== 1 ? "s" : ""} — triés par date (plus récents en
          premier).
        </p>

        {messages.length === 0 ? (
          <p className="mt-6 font-sans text-sm text-white/50">
            Aucun message visiteur pour le moment.
          </p>
        ) : (
          <VisitorMessagesTable messages={rows} />
        )}
      </section>
    </div>
  );
}
