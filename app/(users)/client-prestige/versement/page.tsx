import { KpPageHeader } from "@/components/kp/KpPageHeader";

export default function VersementPage() {
  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow="Espace Prestige"
        title="Versement"
        description="Suivez l’historique de vos versements et les reversements de revenus locatifs."
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          Aucun versement enregistré pour le moment.
        </p>
      </div>
    </div>
  );
}
