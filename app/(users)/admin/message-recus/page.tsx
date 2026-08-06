import { AdminCountLine } from "@/components/kp/AdminCountLine";
import { AdminPageHeader } from "@/components/kp/AdminPageHeader";
import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";
import { Tr } from "@/components/kp/Tr";
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
        title={<Tr fr="Messages reçus" en="Received messages" />}
        description={
          <Tr
            fr="Consultez tous les messages envoyés depuis le formulaire de contact du site public."
            en="View all messages sent from the public site's contact form."
          />
        }
      />

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">
          <Tr fr="Messages de contact" en="Contact messages" />
        </h2>
        <AdminCountLine
          count={messages.length}
          singular={{
            fr: "{n} message — trié par date (plus récents en premier).",
            en: "{n} message — sorted by date (most recent first).",
          }}
          plural={{
            fr: "{n} messages — triés par date (plus récents en premier).",
            en: "{n} messages — sorted by date (most recent first).",
          }}
        />

        <MessageRecusTable rows={rows} />
      </section>
    </div>
  );
}
