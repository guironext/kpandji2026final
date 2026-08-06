"use client";

import { useLocale } from "@/components/providers/KpLocaleProvider";

export type VisitorEmailRow = {
  id: string;
  email: string;
  createdAt: string;
};

function formatDate(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function VisitorEmailsTable({ emails }: { emails: VisitorEmailRow[] }) {
  const { tr, locale } = useLocale();

  if (emails.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-white/50">
        {tr(
          "Aucun e-mail visiteur pour le moment.",
          "No visitor emails at the moment."
        )}
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("E-mail", "Email")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Date d'inscription", "Sign-up date")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {emails.map((row) => (
            <tr key={row.id} className="transition-colors duration-300 hover:bg-white/2">
              <td className="px-4 py-3.5 font-sans text-sm text-white/85">
                <a
                  href={`mailto:${row.email}`}
                  className="break-all text-kp-gold/90 transition-colors hover:text-kp-gold"
                >
                  {row.email}
                </a>
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 font-sans text-sm text-white/55">
                {formatDate(row.createdAt, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
