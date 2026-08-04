import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { MessageRecusTable } from "@/app/(users)/admin/message-recus/MessageRecusTable";
import { prisma } from "@/lib/db";

export default async function MessageRecusPage() {
  const messages = await prisma.message_Contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = messages.map((message) => ({
    id: message.id,
    nom: message.nom,
    email: message.email,
    telephone: message.telephone,
    sujet: message.sujet,
    texte: message.texte,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Messages reçus"
        description="Consultez tous les messages envoyés depuis le formulaire de contact du site public."
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Messages de contact</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          {messages.length} message
          {messages.length !== 1 ? "s" : ""} — triés par date (plus récents en
          premier).
        </p>

        <MessageRecusTable rows={rows} />
      </section>
    </div>
  );
}
