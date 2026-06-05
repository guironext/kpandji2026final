import { currentUser } from "@clerk/nextjs/server";
import {
  ADMIN_ROLE,
  canAccessAdminRoute,
  getUserRoleFromMetadata,
} from "@/lib/auth/roles";
import { AdminPanel } from "@/components/kp/AdminPanel";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/?clientLogin=1&returnTo=/admin");
  }

  const role = getUserRoleFromMetadata(user.publicMetadata);
  if (!canAccessAdminRoute(role)) {
    redirect("/unauthorized");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        Espace {ADMIN_ROLE}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-white">Administration</h1>
      <p className="mt-4 font-sans text-white/60">
        Connecté en tant que {user.primaryEmailAddress?.emailAddress ?? user.id}
      </p>

      <AdminPanel />
    </main>
  );
}
