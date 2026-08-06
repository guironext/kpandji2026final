"use client";

import { useUser } from "@clerk/nextjs";
import { KpAccountButton } from "@/components/kp/KpAccountButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { KpClientLoginModal } from "@/components/kp/KpClientLoginModal";
import { KpClientSignUpModal } from "@/components/kp/KpClientSignUpModal";
import { KpLocaleSwitch } from "@/components/kp/KpLocaleSwitch";
import { useLocale } from "@/components/providers/KpLocaleProvider";

type NavItem = {
  label: string;
  href: string;
};

function KpAnimatedLogo() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(true);
  const [showLayout, setShowLayout] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const sequenceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const startLayoutToLogo = useCallback(() => {
    if (sequenceTimeoutRef.current) window.clearTimeout(sequenceTimeoutRef.current);
    // Line draws ~0.55s, text slides finish ~0.18 + 0.85s; hold to read
    const introMs = 550 + 180 + 850;
    const holdMs = 550;
    sequenceTimeoutRef.current = window.setTimeout(() => {
      setShowLayout(false);
      setShowLogo(true);
    }, introMs + holdMs);
  }, []);

  useEffect(() => {
    if (compact || reduceMotion) {
      if (sequenceTimeoutRef.current) window.clearTimeout(sequenceTimeoutRef.current);
      const id = window.setTimeout(() => {
        setShowLayout(false);
        setShowLogo(true);
      }, 0);
      return () => window.clearTimeout(id);
    }
    setShowLogo(false);
    setShowLayout(true);
    startLayoutToLogo();
    return () => {
      if (sequenceTimeoutRef.current) window.clearTimeout(sequenceTimeoutRef.current);
    };
  }, [compact, reduceMotion, startLayoutToLogo]);

  useEffect(() => {
    if (compact || reduceMotion) return;

    const runSequence = () => {
      if (sequenceTimeoutRef.current) window.clearTimeout(sequenceTimeoutRef.current);
      setShowLogo(false);
      setShowLayout(true);
      startLayoutToLogo();
    };

    const interval = window.setInterval(runSequence, 180_000);
    return () => {
      window.clearInterval(interval);
      if (sequenceTimeoutRef.current) window.clearTimeout(sequenceTimeoutRef.current);
    };
  }, [compact, reduceMotion, startLayoutToLogo]);

  const crossDuration = reduceMotion || compact ? 0 : 0.7;
  const easeLux = [0.22, 1, 0.36, 1] as const;

  /** Compact on phone so icons stay reachable; wide only where nav has room. */
  const brandBlockClass =
    "relative isolate shrink-0 h-9 w-[132px] sm:h-10 sm:w-[156px] md:h-[56px] md:w-[min(300px,34vw)] md:min-h-[56px] xl:h-[60px] xl:w-[420px] xl:max-w-[min(420px,calc(100vw-2rem))] xl:min-h-[60px]";

  return (
    <div className={brandBlockClass}>
      <AnimatePresence mode="sync">
        {showLayout && (
          <motion.div
            key="layout"
            className="absolute inset-0 z-0 flex items-center justify-start px-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: { duration: crossDuration, ease: easeLux },
                  }
            }
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeLux }}
          >
            {/* Center vertical line = anchor; Kpandji slides left, taglines slide right */}
            <div className="flex w-full items-center gap-0 sm:gap-1">
              <div className="flex min-h-[52px] min-w-0 flex-1 items-center justify-end pr-2 sm:min-h-[56px] sm:pr-3 md:min-h-[60px] md:pr-4">
                <motion.span
                  className="font-serif text-lg font-semibold tracking-[0.02em] text-white/95 sm:text-xl md:text-2xl"
                  initial={reduceMotion ? false : { opacity: 0, x: 56 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    delay: reduceMotion ? 0 : 0.18,
                    ease: easeLux,
                  }}
                >
                  Kpandji
                </motion.span>
              </div>

              <motion.div
                aria-hidden
                className="h-10 w-px shrink-0 origin-center bg-linear-to-b from-transparent via-white/35 to-transparent sm:h-12 md:h-14"
                initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease: easeLux,
                }}
              />

              <div className="flex min-h-[52px] min-w-0 flex-1 flex-col justify-center pl-2 sm:min-h-[56px] sm:pl-3 md:min-h-[60px] md:pl-4">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -56 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    delay: reduceMotion ? 0 : 0.18,
                    ease: easeLux,
                  }}
                >
                  <p className="font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.18em] text-white/72 sm:text-[11px] md:text-xs">
                    {t.brand.taglineTop}
                  </p>
                  <p className="mt-1 font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.18em] text-white/55 sm:text-[11px] md:text-xs">
                    {t.brand.taglineBottom}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {showLogo && (
          <motion.div
            key="logo"
            className="absolute inset-0 z-10 flex items-center justify-start"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.88, filter: "blur(14px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: easeLux } }
            }
            transition={{
              duration: reduceMotion ? 0 : crossDuration,
              ease: easeLux,
            }}
          >
            <div>
              <motion.div
                className="relative overflow-hidden rounded-sm"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -1.25, 0],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255,255,255,0))",
                          "drop-shadow(0 0 14px rgba(255,255,255,0.12))",
                          "drop-shadow(0 0 0px rgba(255,255,255,0))",
                        ],
                      }
                }
                transition={{
                  duration: 4.2,
                  ease: easeLux,
                  repeat: reduceMotion ? 0 : Infinity,
                  repeatDelay: 0.35,
                  delay: reduceMotion ? 0 : 0.2,
                }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10"
                  initial={reduceMotion ? false : { x: "-120%" }}
                  animate={reduceMotion ? { x: "-120%" } : { x: ["-120%", "120%"] }}
                  transition={{
                    duration: 1.35,
                    ease: easeLux,
                    delay: reduceMotion ? 0 : 0.35,
                    repeat: reduceMotion ? 0 : Infinity,
                    repeatDelay: reduceMotion ? 0 : 4.5,
                  }}
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.12) 55%, transparent 100%)",
                    width: "55%",
                    height: "100%",
                  }}
                />
                <Image
                  src="/logo.png"
                  alt=""
                  width={220}
                  height={62}
                  className="relative h-8 w-auto sm:h-9 md:h-11"
                  priority
                  loading="eager"
                  aria-hidden
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconSearch({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

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

export function KpHeader() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginPrefetch, setLoginPrefetch] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const nav: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.showroom, href: "/showroom" },
    { label: t.nav.privilege, href: "/privilege" },
    { label: t.nav.sav, href: "/sav" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const closeOverlays = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setLoginOpen(false);
    setSignupOpen(false);
  }, []);

  const switchToSignup = useCallback(() => {
    setLoginOpen(false);
    router.push("/sign-up");
  }, [router]);

  const switchToLogin = useCallback(() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }, []);

  const onSignUpRoute = pathname.startsWith("/sign-up");
  const loginModalOpen = loginOpen && isLoaded && !isSignedIn && !onSignUpRoute;
  const inviteToken = searchParams.get("token");
  const signupModalOpen = signupOpen && !isSignedIn;
  const signupPrefetch =
    signupOpen && !!inviteToken && isLoaded && !isSignedIn;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || searchOpen || loginModalOpen || signupModalOpen
        ? "hidden"
        : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen, loginModalOpen, signupModalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlays();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeOverlays]);

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!pathname.startsWith("/sign-up")) return;

    const frame = window.requestAnimationFrame(() => {
      setLoginOpen(false);
      setLoginPrefetch(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isLoaded || isSignedIn) return;
    if (searchParams.get("clientLogin") !== "1") return;

    const frame = window.requestAnimationFrame(() => {
      setSignupOpen(false);
      setLoginOpen(true);
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("clientLogin");
    const nextSearch = params.toString();
    const nextUrl =
      pathname + (nextSearch ? `?${nextSearch}` : "") + window.location.hash;
    // History API avoids "Router action dispatched before initialization" during hydration/HMR.
    window.history.replaceState(window.history.state, "", nextUrl);

    return () => window.cancelAnimationFrame(frame);
  }, [isLoaded, isSignedIn, pathname, searchParams]);

  useEffect(() => {
    if (!isLoaded || isSignedIn) return;
    if (searchParams.get("clientSignup") !== "1") return;

    const frame = window.requestAnimationFrame(() => {
      setLoginOpen(false);
      setSignupOpen(true);
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("clientSignup");
    const nextSearch = params.toString();
    const nextUrl =
      pathname + (nextSearch ? `?${nextSearch}` : "") + window.location.hash;
    window.history.replaceState(window.history.state, "", nextUrl);

    return () => window.cancelAnimationFrame(frame);
  }, [isLoaded, isSignedIn, pathname, searchParams]);

  const barSolid =
    scrolled || menuOpen || searchOpen || loginModalOpen || signupModalOpen;

  return (
    <>
      <header
        className={`kp-header-mount fixed inset-x-0 top-0 z-50 overflow-visible pt-[env(safe-area-inset-top)] transition-[background,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          barSolid
            ? "border-b border-white/10 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-linear-to-b from-black/55 via-black/20 to-transparent"
        }`}
      >
        {/* Utility strip — Mercedes “Group / careers / language” rhythm */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled &&
            !menuOpen &&
            !searchOpen &&
            !loginModalOpen &&
            !signupModalOpen
              ? "grid-rows-[0fr]"
              : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="kp-hide-scrollbar mx-auto flex max-w-[1680px] items-center justify-end gap-3 overflow-x-auto px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white/45 sm:gap-5 sm:px-5 sm:text-[10px] sm:tracking-[0.2em] md:gap-6 md:px-10 md:py-2.5 md:text-sm md:tracking-widest">
              <Link
                href="/kpandji-automobiles"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-white/80"
              >
                {t.utility.automobiles}
              </Link>
              <span className="hidden h-3 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
              <Link
                href="/ecologie"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-white/80"
              >
                {t.utility.ecology}
              </Link>
              <span className="hidden h-3 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
              <Link
                href="/emplois"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-white/80"
              >
                {t.utility.careers}
              </Link>
              <span className="hidden h-3 w-px shrink-0 bg-white/15 md:block" aria-hidden />
              <KpLocaleSwitch className="hidden md:inline-flex" />
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex h-14 max-w-[1680px] items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:h-[84px] md:gap-6 md:px-10">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            aria-label={t.brand.homeAria}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <KpAnimatedLogo />
            </motion.div>
          </Link>

          {/* Center nav — desktop */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 xl:flex xl:items-center xl:gap-1 2xl:gap-2"
            aria-label={t.a11y.mainNav}
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`kp-header-link whitespace-nowrap px-3 py-2 font-sans text-lg font-semibold uppercase tracking-[0.12em] transition-colors 2xl:px-4 ${
                  pathname === item.href
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right icon cluster — Mercedes search / account / menu */}
          <div className="ml-auto flex shrink-0 items-center gap-0 sm:gap-1">
            {scrolled &&
              !menuOpen &&
              !searchOpen &&
              !loginModalOpen &&
              !signupModalOpen && (
                <KpLocaleSwitch className="mr-1 hidden md:inline-flex" />
              )}
            <Link
              href="/essai"
              className="hidden items-center rounded-full border border-white/15 bg-white/6 px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/9 hover:text-white xl:inline-flex"
            >
              {t.actions.bookTrial}
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
              aria-label={t.actions.search}
            >
              <IconSearch />
            </button>
            {isLoaded && isSignedIn ? (
              <div className="hidden sm:flex sm:items-center sm:justify-center">
                <KpAccountButton />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setMenuOpen(false);
                  setLoginPrefetch(true);
                  setLoginOpen(true);
                }}
                onMouseEnter={() => setLoginPrefetch(true)}
                onFocus={() => setLoginPrefetch(true)}
                onTouchStart={() => setLoginPrefetch(true)}
                className="hidden h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:flex"
                aria-label={t.actions.account}
                aria-haspopup="dialog"
              >
                <IconUser />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMenuOpen((v) => !v);
              }}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-white text-black transition-colors hover:bg-white/90 sm:h-11 sm:w-11 xl:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.actions.closeMenu : t.actions.openMenu}
            >
              <span
                className={`block h-px w-[18px] origin-center bg-current transition-[transform,opacity] duration-300 ease-out ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-[18px] origin-center bg-current transition-[transform,opacity] duration-300 ease-out ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Desktop: subtle hairline when solid */}
        <div
          className={`pointer-events-none h-px bg-linear-to-r from-transparent via-white/15 to-transparent transition-opacity duration-500 ${
            barSolid ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <KpClientLoginModal
        open={loginModalOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={switchToSignup}
        prefetch={
          loginPrefetch && isLoaded && !isSignedIn && !onSignUpRoute && !loginModalOpen
        }
      />

      <KpClientSignUpModal
        open={signupModalOpen}
        token={inviteToken}
        onSwitchToLogin={switchToLogin}
        onClose={() => {
          setSignupOpen(false);
          const params = new URLSearchParams(searchParams.toString());
          params.delete("clientSignup");
          params.delete("token");
          const nextSearch = params.toString();
          const nextUrl =
            pathname + (nextSearch ? `?${nextSearch}` : "") + window.location.hash;
          window.history.replaceState(window.history.state, "", nextUrl);
        }}
        prefetch={signupPrefetch}
      />

      {/* Search overlay — full-screen, Mercedes-style focus */}
      <div
        className={`fixed inset-0 z-70 flex flex-col bg-black/96 pt-[env(safe-area-inset-top)] backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-out ${
          searchOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.searchDialog}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5 sm:py-5 md:px-10">
          <label htmlFor={searchId} className="sr-only">
            {t.search.label}
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <IconSearch className="shrink-0 text-white/50" />
            <input
              ref={searchInputRef}
              id={searchId}
              type="search"
              placeholder={t.search.placeholder}
              className="w-full min-w-0 bg-transparent font-sans text-base text-white outline-none placeholder:text-white/35 sm:text-lg md:text-xl"
            />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="ml-3 shrink-0 rounded-full px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white sm:ml-4 sm:px-4"
          >
            {t.actions.close}
          </button>
        </div>
        <div className="mx-auto mt-10 max-w-2xl px-5 text-center sm:mt-16 sm:px-6">
          <p className="font-serif text-xl text-white/90 sm:text-2xl md:text-3xl">
            {t.search.headline}
          </p>
          <p className="mt-3 font-sans text-sm text-white/45">
            {t.search.hint}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:gap-3">
            {t.search.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-full border border-white/15 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-white/35 hover:bg-white/5 sm:px-5 sm:text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-60 xl:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-label={t.actions.closeMenu}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-none flex-col bg-[#060606] shadow-[-24px_0_80px_rgba(0,0,0,0.75)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[420px] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
            <Image
              src="/logo.png"
              alt="KPANDJI"
              width={200}
              height={56}
              className="h-9 w-auto opacity-90 sm:h-11"
              loading="eager"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t.actions.close}
            >
              <span className="block text-2xl leading-none">×</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:py-4">
            {nav.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`kp-mobile-link flex items-center justify-between border-b border-white/6 px-4 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white/5 sm:tracking-[0.22em] ${
                  pathname === item.href ? "text-white" : "text-white/85 hover:text-white"
                }`}
                style={{
                  animationDelay: menuOpen ? `${80 + i * 45}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                <span className="font-serif text-sm tabular-nums text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
            <div className="space-y-3 px-4 pb-4 pt-6">
              {isLoaded && !isSignedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setLoginPrefetch(true);
                    setLoginOpen(true);
                  }}
                  onMouseEnter={() => setLoginPrefetch(true)}
                  onFocus={() => setLoginPrefetch(true)}
                  onTouchStart={() => setLoginPrefetch(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white/30 hover:bg-white/5"
                >
                  <IconUser className="h-4 w-4" />
                  {t.actions.clientSpace}
                </button>
              )}
              {isLoaded && isSignedIn && (
                <KpAccountButton
                  variant="menu"
                  onNavigate={() => setMenuOpen(false)}
                />
              )}
              <Link
                href="/essai"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-white/95"
              >
                {t.actions.bookTrial}
              </Link>
              <div className="flex items-center justify-center pt-2">
                <KpLocaleSwitch size="md" />
              </div>
            </div>
          </div>
          <p className="border-t border-white/10 px-5 py-4 font-sans text-[10px] uppercase tracking-[0.25em] text-white/35 sm:px-6">
            {t.mobile.tagline}
          </p>
        </div>
      </div>
    </>
  );
}
