"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useMemo } from "react";
import {
  getApprovalStatusFromMetadata,
  getUserRoleFromMetadata,
} from "@/lib/auth/roles";
import { accountHomePathForMember } from "@/lib/auth/routes";

type KpAccountButtonProps = {
  onNavigate?: () => void;
  className?: string;
  variant?: "icon" | "menu";
};

function IconUser({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="9" r="3.5" />
      <path d="M6 19.5c0-3 2.5-5 6-5s6 2 6 5" />
    </svg>
  );
}

export function KpAccountButton({
  onNavigate,
  className,
  variant = "icon",
}: KpAccountButtonProps) {
  const { user } = useUser();

  const accountHref = useMemo(() => {
    const metadata = user?.publicMetadata as Record<string, unknown> | undefined;
    const role = getUserRoleFromMetadata(metadata);
    const status = getApprovalStatusFromMetadata(metadata);
    return accountHomePathForMember(role, status);
  }, [user?.publicMetadata]);

  const avatar =
    user?.imageUrl ? (
      // eslint-disable-next-line @next/next/no-img-element -- Clerk-hosted avatar URL
      <img
        src={user.imageUrl}
        alt=""
        className={
          variant === "menu"
            ? "h-4 w-4 rounded-full object-cover"
            : "h-8 w-8 rounded-full object-cover"
        }
      />
    ) : (
      <IconUser className={variant === "menu" ? "h-4 w-4" : undefined} />
    );

  return (
    <Link
      href={accountHref}
      onClick={onNavigate}
      className={
        className ??
        (variant === "menu"
          ? "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white/30 hover:bg-white/5"
          : "flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-white/85 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-white hover:ring-white/30")
      }
      aria-label="Accéder à mon espace"
    >
      {avatar}
      {variant === "menu" ? "Mon espace" : null}
    </Link>
  );
}
