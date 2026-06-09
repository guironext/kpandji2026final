"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminUser } from "@/components/kp/adminTypes";
import { adminFieldClass } from "@/components/kp/adminStyles";
import {
  adminCardClass,
  adminCardGlow,
  adminLabelClass,
  adminPrimaryButtonClass,
} from "@/components/kp/adminStyles";

export function AdminSendMessage() {
  const [members, setMembers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipientId, setRecipientId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = (await res.json().catch(() => ({}))) as { users?: AdminUser[] };
      const approvedPrestige = (data.users ?? []).filter(
        (u) => u.role === "PRESTIGE_USER" && u.status === "APPROVED"
      );
      setMembers(approvedPrestige);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (members.length > 0 && !recipientId) {
      setRecipientId(members[0].id);
    }
  }, [members, recipientId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      // API endpoint to be wired when outbound messaging is persisted.
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      setSuccess("Message préparé pour envoi (connexion API à venir).");
      setSubject("");
      setBody("");
    } catch {
      setError("Impossible d’envoyer le message.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={adminCardClass}>
      <div className={adminCardGlow} aria-hidden />
      <h2 className="font-serif text-2xl text-white">Message à un membre Prestige</h2>
      <p className="mt-2 font-sans text-sm text-white/50">
        Rédigez un message destiné à un membre approuvé de l’espace Prestige.
      </p>

      {loading ? (
        <p className="mt-8 font-sans text-sm text-white/50">Chargement…</p>
      ) : members.length === 0 ? (
        <p className="mt-8 font-sans text-sm text-white/45">
          Aucun membre Prestige approuvé disponible pour le moment.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-message-recipient" className={adminLabelClass}>
              Destinataire
            </label>
            <select
              id="admin-message-recipient"
              required
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className={adminFieldClass()}
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName || m.email} ({m.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="admin-message-subject" className={adminLabelClass}>
              Objet
            </label>
            <input
              id="admin-message-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet du message"
              className={adminFieldClass()}
            />
          </div>

          <div>
            <label htmlFor="admin-message-body" className={adminLabelClass}>
              Message
            </label>
            <textarea
              id="admin-message-body"
              required
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Votre message…"
              className={`${adminFieldClass()} min-h-[180px] resize-y`}
            />
          </div>

          <button type="submit" disabled={busy} className={adminPrimaryButtonClass}>
            {busy ? "Envoi…" : "Envoyer le message"}
          </button>
        </form>
      )}

      {error && <p className="mt-4 font-sans text-sm text-[#e85d5d]">{error}</p>}
      {success && <p className="mt-4 font-sans text-sm text-kp-gold">{success}</p>}
    </section>
  );
}
