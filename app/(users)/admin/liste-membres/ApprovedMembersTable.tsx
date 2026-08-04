"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { adminPrimaryButtonClass } from "@/components/kp/adminStyles";

export type ApprovedMemberRow = {
  id: string;
  clerkUserId: string;
  email: string;
  fullName: string;
  phone: string;
  residenceCountry: string;
  role: "ADMIN" | "PRESTIGE_USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  invitationId: string;
  approvedAt: string;
  approvedBy: string;
  createdAt: string;
  updatedAt: string;
};

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const ROLE_LABEL: Record<ApprovedMemberRow["role"], string> = {
  ADMIN: "Administrateur",
  PRESTIGE_USER: "Membre Prestige",
};

const STATUS_LABEL: Record<ApprovedMemberRow["status"], string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Refusé",
};

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconTrash({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function displayValue(value: string) {
  return value.trim() || "—";
}

function formatDate(iso: string) {
  if (!iso.trim()) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function MemberDetailModal({
  member,
  onClose,
}: {
  member: ApprovedMemberRow;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const timer = window.setTimeout(() => panelRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/88 p-4 backdrop-blur-md transition-colors duration-300"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[min(85vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-kp-gold/25 bg-[#121218] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(201,169,98,0.08)]"
      >
        <div className="border-b border-white/8 bg-kp-gold/10 px-6 py-5">
          <h3 id={titleId} className="font-serif text-xl text-white">
            Fiche membre
          </h3>
          <p className="mt-1 font-sans text-sm text-white/55">
            {displayValue(member.fullName || member.email)} ·{" "}
            {ROLE_LABEL[member.role]}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <dl className="space-y-4 font-sans text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Nom complet
              </dt>
              <dd className="mt-1 text-white/85">
                {displayValue(member.fullName)}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  E-mail
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(member.email)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Téléphone
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(member.phone)}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Pays de résidence
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(member.residenceCountry)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Statut
                </dt>
                <dd className="mt-1 text-white/85">
                  {STATUS_LABEL[member.status]}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Approuvé le
                </dt>
                <dd className="mt-1 text-white/85">
                  {formatDate(member.approvedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Approuvé par
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(member.approvedBy)}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Créé le
                </dt>
                <dd className="mt-1 text-white/85">
                  {formatDate(member.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Mis à jour le
                </dt>
                <dd className="mt-1 text-white/85">
                  {formatDate(member.updatedAt)}
                </dd>
              </div>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Identifiants
              </dt>
              <dd className="mt-2 space-y-1 rounded-xl border border-white/10 bg-black/35 p-3 font-mono text-xs text-white/70">
                <p>
                  <span className="text-white/45">ID : </span>
                  {member.id}
                </p>
                <p className="break-all">
                  <span className="text-white/45">Clerk : </span>
                  {member.clerkUserId}
                </p>
                {member.invitationId.trim() ? (
                  <p className="break-all">
                    <span className="text-white/45">Invitation : </span>
                    {member.invitationId}
                  </p>
                ) : null}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/8 bg-black/20 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className={adminPrimaryButtonClass}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ApprovedMemberRowItem({
  member,
  onDelete,
}: {
  member: ApprovedMemberRow;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    const label = member.fullName.trim() || member.email.trim() || "ce membre";
    if (
      !window.confirm(
        `Supprimer ${label} ? Cette action est irréversible et supprimera aussi le compte Clerk associé.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/users/${member.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Delete failed");
      }

      onDelete(member.id);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Impossible de supprimer ce membre. Réessayez.";
      window.alert(message);
      setIsDeleting(false);
    }
  }, [member.email, member.fullName, member.id, onDelete]);

  return (
    <tr className="transition-colors duration-300 hover:bg-white/2">
      <td className="px-4 py-3.5 font-sans text-sm text-white/90">
        {displayValue(member.fullName)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(member.email)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(member.phone)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(member.residenceCountry)}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openModal}
            aria-expanded={open}
            aria-label="Voir le membre"
            title="Voir"
            className={`${iconButtonClass} border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white`}
          >
            <IconEye />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="Supprimer le membre"
            title="Supprimer"
            className={`${iconButtonClass} border-white/15 bg-white/3 text-white/55 hover:border-[#e85d5d]/45 hover:bg-[#e85d5d]/10 hover:text-[#e85d5d]`}
          >
            <IconTrash />
          </button>
        </div>
        {open ? <MemberDetailModal member={member} onClose={close} /> : null}
      </td>
    </tr>
  );
}

export function ApprovedMembersTable({
  members: initialMembers,
}: {
  members: ApprovedMemberRow[];
}) {
  const [members, setMembers] = useState(initialMembers);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const handleDelete = useCallback((id: string) => {
    setMembers((current) => current.filter((member) => member.id !== id));
  }, []);

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Nom
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              E-mail
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Téléphone
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Pays
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {members.map((member) => (
            <ApprovedMemberRowItem
              key={member.id}
              member={member}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
