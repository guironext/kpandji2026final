import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        Accès refusé
      </p>
      <h1 className="mt-3 font-serif text-3xl text-white">
        Vous n&apos;avez pas accès à cette page
      </h1>
      <p className="mt-4 font-sans text-sm text-white/55">
        Cette section est réservée à un profil spécifique. Contactez
        l&apos;administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une
        erreur.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full border border-white/20 px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
