"use client";

import { useCallback, useEffect, useState } from "react";

type AdminUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: "ADMIN" | "PRESTIGE_USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

const STATUS_LABEL: Record<AdminUser["status"], string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Refusé",
};

function fieldClass() {
  return "w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30";
}

function InvitePanel() {
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
    <section className="rounded-sm border border-white/10 bg-white/2 p-7">
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
          className={fieldClass()}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "prestige-user" | "admin")}
          className={fieldClass()}
        >
          <option value="prestige-user">Membre Prestige</option>
          <option value="admin">Administrateur</option>
        </select>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90 disabled:opacity-50"
        >
          {busy ? "Génération…" : "Générer le lien"}
        </button>
      </form>

      {error && <p className="mt-4 font-sans text-sm text-[#e85d5d]">{error}</p>}

      {link && (
        <div className="mt-5 rounded-sm border border-white/10 bg-black/40 p-4">
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
            className="mt-3 inline-flex rounded-full border border-white/20 px-5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 transition hover:border-white/40 hover:bg-white/5"
          >
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
      )}
    </section>
  );
}

function MembersPanel() {
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
    <section className="rounded-sm border border-white/10 bg-white/2 p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-white">Membres</h2>
        <button
          type="button"
          onClick={load}
          className="rounded-full border border-white/15 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
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
              className="flex flex-wrap items-center justify-between gap-4 py-4"
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
                      className="rounded-full bg-white px-5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white/90 disabled:opacity-50"
                    >
                      Approuver
                    </button>
                    <button
                      type="button"
                      disabled={pendingId === u.id}
                      onClick={() => decide(u.id, "reject")}
                      className="rounded-full border border-white/20 px-5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/40 disabled:opacity-50"
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
