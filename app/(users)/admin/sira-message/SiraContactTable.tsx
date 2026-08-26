"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/components/kp/adminStyles";
import { useLocale } from "@/components/providers/KpLocaleProvider";

export type SiraContactRow = {
  id: string;
  name: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  createdAt: string;
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

function SiraContactModal({
  row,
  onClose,
}: {
  row: SiraContactRow;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const { tr, locale } = useLocale();

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

  const emailTrim = row.email.trim();
  const phoneTrim = row.phone.trim();

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
            {tr("Contact SIRA", "SIRA contact")}
          </h3>
          <p className="mt-1 font-sans text-sm text-white/55">
            {displayValue(row.name)} · {formatDate(row.createdAt, locale)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <dl className="space-y-4 font-sans text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {tr("Nom", "Name")}
              </dt>
              <dd className="mt-1 text-white/85">{displayValue(row.name)}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Pays", "Country")}
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(row.country)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Ville", "City")}
                </dt>
                <dd className="mt-1 text-white/85">{displayValue(row.city)}</dd>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("Téléphone", "Phone")}
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(row.phone)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {tr("E-mail", "Email")}
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(row.email)}
                </dd>
              </div>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {tr("Date de soumission", "Submission date")}
              </dt>
              <dd className="mt-1 text-white/85">
                {formatDate(row.createdAt, locale)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/8 bg-black/20 px-6 py-4">
          {emailTrim ? (
            <a href={`mailto:${emailTrim}`} className={adminSecondaryButtonClass}>
              {tr("Écrire", "Email")}
            </a>
          ) : null}
          {phoneTrim ? (
            <a href={`tel:${phoneTrim}`} className={adminSecondaryButtonClass}>
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

function SiraContactRowItem({
  row,
  onDelete,
}: {
  row: SiraContactRow;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { tr, locale } = useLocale();

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
          "Supprimer ce contact SIRA ? Cette action est irréversible.",
          "Delete this SIRA contact? This action is irreversible."
        )
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/sira-contact/${row.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      onDelete(row.id);
    } catch {
      window.alert(
        tr(
          "Impossible de supprimer ce contact. Réessayez.",
          "Unable to delete this contact. Please try again."
        )
      );
      setIsDeleting(false);
    }
  }, [onDelete, row.id, tr]);

  return (
    <tr
      className={`transition-colors duration-300 ${
        read ? "bg-kp-gold/8 hover:bg-kp-gold/12" : "hover:bg-white/2"
      }`}
    >
      <td className="px-4 py-3.5 font-sans text-sm text-white/90">
        {displayValue(row.name)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(row.country)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(row.city)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(row.email)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-sans text-sm text-white/55">
        {formatDate(row.createdAt, locale)}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openModal}
            aria-expanded={open}
            aria-label={
              read
                ? tr("Contact déjà lu", "Contact already read")
                : tr("Voir le contact", "View contact")
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
            aria-label={tr("Supprimer le contact", "Delete contact")}
            title={tr("Supprimer", "Delete")}
            className={`${iconButtonClass} border-white/15 bg-white/3 text-white/55 hover:border-[#e85d5d]/45 hover:bg-[#e85d5d]/10 hover:text-[#e85d5d]`}
          >
            <IconTrash />
          </button>
        </div>
        {open ? <SiraContactModal row={row} onClose={close} /> : null}
      </td>
    </tr>
  );
}

export function SiraContactTable({
  rows: initialRows,
}: {
  rows: SiraContactRow[];
}) {
  const [rows, setRows] = useState(initialRows);
  const { tr } = useLocale();

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleDelete = useCallback((id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  }, []);

  if (rows.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-white/50">
        {tr("Aucun contact SIRA pour le moment.", "No SIRA contacts at the moment.")}
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Nom", "Name")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Pays", "Country")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Ville", "City")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("E-mail", "Email")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Date", "Date")}
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {tr("Action", "Action")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {rows.map((row) => (
            <SiraContactRowItem key={row.id} row={row} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
