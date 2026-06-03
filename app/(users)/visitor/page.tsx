import { currentUser } from "@clerk/nextjs/server";
import {
  VISITOR_ROLE,
  canAccessVisitorRoute,
  getUserRoleFromMetadata,
} from "@/lib/auth/roles";
import { redirect } from "next/navigation";

export default async function VisitorPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/?clientLogin=1&returnTo=/visitor");
  }

  const role = getUserRoleFromMetadata(user.publicMetadata);
  if (!canAccessVisitorRoute(role)) {
    redirect("/unauthorized");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:px-10">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        Espace {VISITOR_ROLE}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-white">Espace visiteur</h1>
      <p className="mt-4 font-sans text-white/60">
        Connecté en tant que {user.primaryEmailAddress?.emailAddress ?? user.id}
      </p>
    </main>
  );
}
