"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export default function UnauthorizedPage() {
  const { tr } = useLocale();

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {tr("Accès refusé", "Access denied")}
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">
        {tr(
          "Vous n'avez pas accès à cette page",
          "You don't have access to this page"
        )}
      </h1>
      <p className="mt-4 font-sans text-sm text-white/55">
        {tr(
          "Cette section est réservée à un profil spécifique. Contactez l'administrateur si vous pensez qu'il s'agit d'une erreur.",
          "This section is reserved for a specific profile. Contact the administrator if you believe this is an error."
        )}
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full border border-white/20 px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
      >
        {tr("Retour à l'accueil", "Back to home")}
      </Link>
    </main>
  );
}
