"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/components/kp/adminStyles";

export type VisitorMessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
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

function formatDate(iso: string) {
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

function VisitorMessageModal({
  message,
  onClose,
}: {
  message: VisitorMessageRow;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
            Message visiteur
          </h3>
          <p className="mt-1 font-sans text-sm text-white/55">
            {displayValue(message.subject)} · {formatDate(message.createdAt)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <dl className="space-y-4 font-sans text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Nom
              </dt>
              <dd className="mt-1 text-white/85">{displayValue(message.name)}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  E-mail
                </dt>
                <dd className="mt-1 break-all text-white/85">
                  {displayValue(message.email)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Téléphone
                </dt>
                <dd className="mt-1 text-white/85">
                  {displayValue(message.phone)}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Message
            </p>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/35 p-4">
              <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/90">
                {displayValue(message.message)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/8 bg-black/20 px-6 py-4">
          {message.email.trim() ? (
            <a
              href={`mailto:${message.email.trim()}?subject=${encodeURIComponent(`Re: ${message.subject.trim()}`)}`}
              className={adminSecondaryButtonClass}
            >
              Répondre
            </a>
          ) : null}
          {message.phone.trim() ? (
            <a
              href={`tel:${message.phone.trim()}`}
              className={adminSecondaryButtonClass}
            >
              Appeler
            </a>
          ) : null}
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

function VisitorMessageRowItem({
  message,
  onDelete,
}: {
  message: VisitorMessageRow;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        "Supprimer ce message ? Cette action est irréversible."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/visitor-messages/${message.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      onDelete(message.id);
    } catch {
      window.alert("Impossible de supprimer ce message. Réessayez.");
      setIsDeleting(false);
    }
  }, [message.id, onDelete]);

  return (
    <tr
      className={`transition-colors duration-300 ${
        read ? "bg-kp-gold/8 hover:bg-kp-gold/12" : "hover:bg-white/2"
      }`}
    >
      <td className="px-4 py-3.5 font-sans text-sm text-white/90">
        {displayValue(message.name)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(message.email)}
      </td>
      <td className="px-4 py-3.5 font-sans text-sm text-white/70">
        {displayValue(message.subject)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-sans text-sm text-white/55">
        {formatDate(message.createdAt)}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openModal}
            aria-expanded={open}
            aria-label={read ? "Message déjà lu" : "Voir le message"}
            title={read ? "Déjà lu" : "Voir"}
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
            aria-label="Supprimer le message"
            title="Supprimer"
            className={`${iconButtonClass} border-white/15 bg-white/3 text-white/55 hover:border-[#e85d5d]/45 hover:bg-[#e85d5d]/10 hover:text-[#e85d5d]`}
          >
            <IconTrash />
          </button>
        </div>
        {open ? (
          <VisitorMessageModal message={message} onClose={close} />
        ) : null}
      </td>
    </tr>
  );
}

export function VisitorMessagesTable({
  messages: initialMessages,
}: {
  messages: VisitorMessageRow[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleDelete = useCallback((id: string) => {
    setMessages((current) => current.filter((message) => message.id !== id));
  }, []);

  if (messages.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-white/50">
        Aucun message visiteur pour le moment.
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Nom
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              E-mail
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Sujet
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Date
            </th>
            <th className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {messages.map((message) => (
            <VisitorMessageRowItem
              key={message.id}
              message={message}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
