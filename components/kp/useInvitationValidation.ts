"use client";

import { useEffect, useMemo, useState } from "react";

export type InvitationState =
  | { phase: "invite-only" }
  | { phase: "loading" }
  | { phase: "valid"; email: string }
  | { phase: "invalid"; reason: string };

type CachedValidation = {
  token: string;
  result: Exclude<InvitationState, { phase: "loading" } | { phase: "invite-only" }>;
};

export function useInvitationValidation(
  token: string | null | undefined,
  active = true
) {
  const [validation, setValidation] = useState<CachedValidation | null>(null);

  const state: InvitationState = useMemo(() => {
    if (!token) return { phase: "invite-only" };
    if (!validation || validation.token !== token) return { phase: "loading" };
    return validation.result;
  }, [token, validation]);

  useEffect(() => {
    if (!active || !token) return;
    if (validation?.token === token) return;

    let cancelled = false;
    fetch(`/api/invitations/validate?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          valid?: boolean;
          email?: string;
          reason?: string;
        };
        if (cancelled) return;
        if (data.valid && data.email) {
          setValidation({
            token,
            result: { phase: "valid", email: data.email },
          });
        } else {
          setValidation({
            token,
            result: { phase: "invalid", reason: data.reason ?? "invalid" },
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setValidation({
            token,
            result: { phase: "invalid", reason: "invalid" },
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [active, token, validation?.token]);

  return state;
}
