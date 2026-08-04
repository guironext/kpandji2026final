import { KpPageHeader } from "@/components/kp/KpPageHeader";

export default function SouscriptionPage() {
  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow="Espace Prestige"
        title="Souscription"
        description="Consultez et gérez votre adhésion au programme Prestige KPANDJI."
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          Votre espace de souscription sera bientôt disponible.
        </p>
      </div>
    </div>
  );
}
