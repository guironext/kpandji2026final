"use client";

import { useState } from "react";
import { adminFieldClass } from "@/components/kp/adminStyles";
import {
  adminCardClass,
  adminCardGlow,
  adminPrimaryButtonClass,
} from "@/components/kp/adminStyles";

type InboxMessage = {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string;
  receivedAt: string;
  replied: boolean;
};

export function AdminMessagesInbox() {
  const [messages] = useState<InboxMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  const submitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setBusy(true);
    setFeedback(null);
    try {
      // API endpoint to be wired when messaging is persisted.
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      setFeedback("Réponse enregistrée (connexion API à venir).");
      setReply("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Messages reçus</h2>
        <p className="mt-2 font-sans text-sm text-white/50">
          Consultez et répondez aux messages des membres Prestige.
        </p>

        {messages.length === 0 ? (
          <p className="mt-8 font-sans text-sm text-white/45">
            Aucun message pour le moment. Les demandes des membres Prestige
            apparaîtront ici.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-white/8">
            {messages.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(m.id);
                    setReply("");
                    setFeedback(null);
                  }}
                  className={`w-full rounded-xl px-3 py-4 text-left transition hover:bg-white/3 ${
                    selectedId === m.id ? "bg-kp-gold/10 ring-1 ring-kp-gold/25" : ""
                  }`}
                >
                  <p className="font-sans text-sm text-white/90">{m.subject}</p>
                  <p className="mt-1 font-sans text-xs text-white/45">
                    {m.fromName} · {m.fromEmail}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={adminCardClass}>
        <div className={adminCardGlow} aria-hidden />
        <h2 className="font-serif text-2xl text-white">Répondre</h2>

        {!selected ? (
          <p className="mt-6 font-sans text-sm text-white/45">
            Sélectionnez un message pour rédiger une réponse.
          </p>
        ) : (
          <>
            <div className="mt-6 rounded-xl border border-white/8 bg-black/30 p-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                Message original
              </p>
              <p className="mt-2 font-sans text-sm text-white/85">{selected.body}</p>
            </div>

            <form onSubmit={submitReply} className="mt-6 space-y-4">
              <textarea
                required
                rows={6}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Votre réponse…"
                className={`${adminFieldClass()} resize-y min-h-[140px]`}
              />
              <button
                type="submit"
                disabled={busy}
                className={adminPrimaryButtonClass}
              >
                {busy ? "Envoi…" : "Envoyer la réponse"}
              </button>
            </form>

            {feedback && (
              <p className="mt-4 font-sans text-sm text-kp-gold">{feedback}</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
