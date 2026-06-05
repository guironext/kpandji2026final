import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  APPROVAL_APPROVED,
  APPROVAL_REJECTED,
  canAccessPrestigeRoute,
  getApprovalStatusFromMetadata,
  getUserRoleFromMetadata,
} from "@/lib/auth/roles";

export default async function ClientPrestigePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/?clientLogin=1&returnTo=/client-prestige");
  }

  const metadata = user.publicMetadata as Record<string, unknown>;
  const role = getUserRoleFromMetadata(metadata);
  const status = getApprovalStatusFromMetadata(metadata);

  if (!canAccessPrestigeRoute(role, status)) {
    // Awaiting approval → send back to the waiting room; otherwise refuse.
    if (status !== APPROVAL_APPROVED && status !== APPROVAL_REJECTED) {
      redirect("/onboarding");
    }
    redirect("/unauthorized");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        Espace Prestige
      </p>
      <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">
        Bienvenue dans votre espace
      </h1>
      <p className="mt-4 max-w-xl font-sans text-white/60">
        Connecté en tant que{" "}
        {user.primaryEmailAddress?.emailAddress ?? user.id}. Vous avez désormais
        accès au programme Prestige réservé à la diaspora KPANDJI.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <div className="rounded-sm border border-white/10 bg-white/2 p-7">
          <h2 className="font-serif text-2xl text-white">Mes véhicules</h2>
          <p className="mt-3 font-sans text-sm text-white/55">
            Suivez vos commandes et la disponibilité de vos véhicules.
          </p>
        </div>
        <div className="rounded-sm border border-white/10 bg-white/2 p-7">
          <h2 className="font-serif text-2xl text-white">Revenus locatifs</h2>
          <p className="mt-3 font-sans text-sm text-white/55">
            Consultez les revenus générés par la mise en location de votre
            véhicule.
          </p>
        </div>
      </div>
    </main>
  );
}
