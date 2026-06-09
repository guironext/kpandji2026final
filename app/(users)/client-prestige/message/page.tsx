import { KpPageHeader } from "@/components/kp/KpPageHeader";

export default function MessagePage() {
  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow="Espace Prestige"
        title="Message"
        description="Échangez avec l’équipe KPANDJI et consultez vos conversations."
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          Aucun message pour le moment. Vous pourrez bientôt contacter l’équipe depuis cet
          espace.
        </p>
      </div>
    </div>
  );
}
