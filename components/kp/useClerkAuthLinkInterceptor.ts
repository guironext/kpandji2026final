"use client";

import { useEffect, type RefObject } from "react";

type Handlers = {
  onSignup?: () => void;
  onLogin?: () => void;
};

export function useClerkAuthLinkInterceptor(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  handlers: Handlers
) {
  const { onSignup, onLogin } = handlers;

  useEffect(() => {
    if (!active) return;
    const root = containerRef.current;
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link?.href) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.origin);
      } catch {
        return;
      }

      if (
        onSignup &&
        (url.searchParams.get("clientSignup") === "1" ||
          url.pathname === "/sign-up")
      ) {
        e.preventDefault();
        onSignup();
        return;
      }

      if (url.searchParams.get("clientLogin") === "1" && onLogin) {
        e.preventDefault();
        onLogin();
      }
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [active, onLogin, onSignup, containerRef]);
}
