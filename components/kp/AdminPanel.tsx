"use client";

import { useCallback, useEffect, useState } from "react";
import {
  adminCardClass,
  adminCardGlow,
  adminFieldClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/components/kp/adminStyles";
import type { AdminUser } from "@/components/kp/adminTypes";

const STATUS_LABEL: Record<AdminUser["status"], string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Refusé",
};

export type { AdminUser } from "@/components/kp/adminTypes";

export function InvitePanel() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"prestige-user" | "admin">("prestige-user");
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setLink(null);
    setCopied(false);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        invitation?: { url?: string };
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Échec de la création.");
        return;
      }
      const url = data.invitation?.url ?? null;
      setLink(url ? new URL(url, window.location.origin).toString() : null);
      setEmail("");
    } catch {
      setError("Impossible de joindre le serveur.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={adminCardClass}>
      <div className={adminCardGlow} aria-hidden />
      <h2 className="font-serif text-2xl text-white">Inviter un membre</h2>
      <p className="mt-2 font-sans text-sm text-white/50">
        Générez un lien d’invitation à transmettre au futur membre.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemple.com"
          className={adminFieldClass()}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "prestige-user" | "admin")}
          className={adminFieldClass()}
        >
          <option value="prestige-user">Membre Prestige</option>
          <option value="admin">Administrateur</option>
        </select>
        <button
          type="submit"
          disabled={busy}
          className={adminPrimaryButtonClass}
        >
          {busy ? "Génération…" : "Générer le lien"}
        </button>
      </form>

      {error && <p className="mt-4 font-sans text-sm text-[#e85d5d]">{error}</p>}

      {link && (
        <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
            Lien d’invitation
          </p>
          <p className="mt-2 break-all font-sans text-sm text-white/80">{link}</p>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(link);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            }}
            className={`mt-3 ${adminSecondaryButtonClass}`}
          >
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
      )}
    </section>
  );
}

export function MembersPanel() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = (await res.json().catch(() => ({}))) as { users?: AdminUser[] };
      setUsers(data.users ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const decide = async (id: string, decision: "approve" | "reject") => {
    setPendingId(id);
    try {
      await fetch(`/api/admin/users/${id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      await load();
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section className={adminCardClass}>
      <div className={adminCardGlow} aria-hidden />
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-white">Membres</h2>
        <button
          type="button"
          onClick={load}
          className={adminSecondaryButtonClass}
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <p className="mt-6 font-sans text-sm text-white/50">Chargement…</p>
      ) : users.length === 0 ? (
        <p className="mt-6 font-sans text-sm text-white/50">
          Aucun membre pour le moment.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-white/8">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl px-2 py-4 transition-colors hover:bg-white/2"
            >
              <div className="min-w-0">
                <p className="truncate font-sans text-sm text-white/90">
                  {u.fullName || u.email}
                </p>
                <p className="truncate font-sans text-xs text-white/45">
                  {u.email} ·{" "}
                  {u.role === "ADMIN" ? "Administrateur" : "Membre Prestige"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    u.status === "APPROVED"
                      ? "bg-[#c9a962]/15 text-[#c9a962]"
                      : u.status === "REJECTED"
                        ? "bg-[#e85d5d]/15 text-[#e85d5d]"
                        : "bg-white/10 text-white/60"
                  }`}
                >
                  {STATUS_LABEL[u.status]}
                </span>

                {u.status === "PENDING" && (
                  <>
                    <button
                      type="button"
                      disabled={pendingId === u.id}
                      onClick={() => decide(u.id, "approve")}
                      className={adminPrimaryButtonClass}
                    >
                      Approuver
                    </button>
                    <button
                      type="button"
                      disabled={pendingId === u.id}
                      onClick={() => decide(u.id, "reject")}
                      className={adminSecondaryButtonClass}
                    >
                      Refuser
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function AdminPanel() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <InvitePanel />
      <MembersPanel />
    </div>
  );
}
