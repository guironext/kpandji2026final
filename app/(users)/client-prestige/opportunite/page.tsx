import { KpPageHeader } from "@/components/kp/KpPageHeader";

export default function OpportunitePage() {
  return (
    <div className="space-y-10">
      <KpPageHeader
        eyebrow="Espace Prestige"
        title="Opportunité"
        description="Découvrez les opportunités d’investissement et les projets disponibles dans le programme Prestige."
      />
      <div className="rounded-sm border border-white/10 bg-white/2 p-7">
        <p className="font-sans text-sm text-white/55">
          Aucune opportunité disponible pour le moment. Revenez bientôt pour consulter les
          dernières offres.
        </p>
      </div>
    </div>
  );
}
