"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/components/kp/adminStyles";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export type EssaiRequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  models: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
};

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

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

function EssaiRequestModal({
  request,
  onClose,
}: {
  request: EssaiRequestRow;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const { tr } = useLocale();

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
            {tr("Demande d'essai", "Test drive request")}
          </h3>
          <p className="mt-1 font-sans text-sm text-white/55">
            {displayValue(request.name)} · {displayValue(request.models)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <dl className="space-y-4 font-sans text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Téléphone", "Phone")}
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(request.phone)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("E-mail", "Email")}
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(request.email)}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Date souhaitée", "Preferred date")}
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(request.preferredDate)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Créneau", "Time slot")}
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(request.timeSlot)}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Message", "Message")}
            </p>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/35 p-4">
              <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/90">
                {displayValue(request.message)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/8 bg-black/20 px-6 py-4">
          {request.email.trim() ? (
            <a
              href={`mailto:${request.email.trim()}`}
              className={adminSecondaryButtonClass}
            >
              {tr("Écrire", "Email")}
            </a>
          ) : null}
          {request.phone.trim() ? (
            <a
              href={`tel:${request.phone.trim()}`}
              className={adminSecondaryButtonClass}
            >
              {tr("Appeler", "Call")}
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className={adminPrimaryButtonClass}
          >
            {tr("Fermer", "Close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function EssaiRequestRowItem({
  request,
  onDelete,
}: {
  request: EssaiRequestRow;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { tr } = useLocale();

  const openModal = useCallback(() => {
    setOpen(true);
    setRead(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    if (
      !window.confirm(
        tr(
          "Supprimer cette demande d'essai ? Cette action est irréversible.",
          "Delete this test drive request? This action is irreversible."
        )
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/essai-requests/${request.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      onDelete(request.id);
    } catch {
      window.alert(
        tr(
          "Impossible de supprimer cette demande. Réessayez.",
          "Unable to delete this request. Please try again."
        )
      );
      setIsDeleting(false);
    }
  }, [onDelete, request.id, tr]);

  return (
    <tr
      className={`transition-colors duration-300 ${
        read ? "bg-kp-gold/8 hover:bg-kp-gold/12" : "hover:bg-white/2"
      }`}
    >
      <td className="px-4 py-3.5 font-sans text-sm text-white/90">
        {displayValue(request.name)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(request.phone)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(request.models)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(request.preferredDate)}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openModal}
            aria-expanded={open}
            aria-label={
              read
                ? tr("Demande déjà lue", "Request already read")
                : tr("Voir la demande", "View request")
            }
            title={read ? tr("Déjà lu", "Already read") : tr("Voir", "View")}
            className={`${iconButtonClass} ${
              read
                ? "border-kp-gold/45 bg-kp-gold/15 text-kp-gold hover:bg-kp-gold/25"
                : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white"
            }`}
          >
            <IconEye />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={tr("Supprimer la demande", "Delete request")}
            title={tr("Supprimer", "Delete")}
            className={`${iconButtonClass} border-white/15 bg-white/3 text-white/55 hover:border-[#e85d5d]/45 hover:bg-[#e85d5d]/10 hover:text-[#e85d5d]`}
          >
            <IconTrash />
          </button>
        </div>
        {open ? <EssaiRequestModal request={request} onClose={close} /> : null}
      </td>
    </tr>
  );
}

export function EssaiRequestsTable({
  requests: initialRequests,
}: {
  requests: EssaiRequestRow[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const { tr } = useLocale();

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const handleDelete = useCallback((id: string) => {
    setRequests((current) => current.filter((request) => request.id !== id));
  }, []);

  if (requests.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-white/50">
        {tr(
          "Aucune demande d'essai pour le moment.",
          "No test drive requests at the moment."
        )}
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Nom", "Name")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Téléphone", "Phone")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Modèle", "Model")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Date souhaitée", "Preferred date")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Action", "Action")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {requests.map((request) => (
            <EssaiRequestRowItem
              key={request.id}
              request={request}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
