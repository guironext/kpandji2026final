import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SidebarAdmin } from "@/components/kp/SidebarAdmin";
import {
  ADMIN_ROLE,
  canAccessAdminRoute,
  getUserRoleFromMetadata,
} from "@/lib/auth/roles";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect("/?clientLogin=1&returnTo=/admin");
  }

  const role = getUserRoleFromMetadata(user.publicMetadata);
  if (!canAccessAdminRoute(role)) {
    redirect("/unauthorized");
  }

  const userEmail = user.primaryEmailAddress?.emailAddress ?? user.id;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_12%_0%,rgba(201,169,98,0.12),transparent_58%),radial-gradient(820px_520px_at_88%_45%,rgba(255,255,255,0.05),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-size-[72px_72px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-kp-gold/40 to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 sm:px-6 md:flex-row md:gap-10 md:px-10 md:pb-24 lg:px-12">
        <SidebarAdmin userEmail={userEmail} />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                Espace {ADMIN_ROLE}
              </p>
              <p className="mt-1 truncate font-sans text-sm text-white/55">{userEmail}</p>
            </div>
          </div>

          <div className="opacity-0-start animate-fade-up [animation-delay:80ms]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
