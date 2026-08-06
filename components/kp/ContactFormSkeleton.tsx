"use client";

import { useLocale } from "@/components/providers/KpLocaleProvider";

export function ContactFormSkeleton() {
  const { tr } = useLocale();
  return (
    <div
      aria-busy="true"
      aria-label={tr("Chargement du formulaire", "Loading the form")}
      className="relative mx-auto max-w-xl lg:mx-0 lg:max-w-none"
      style={{
        boxShadow:
          "0 32px 100px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[32px] bg-linear-to-br from-kp-gold/25 via-kp-gold/5 to-white/5 opacity-80"
      />
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(165deg,rgba(20,20,20,0.92)_0%,rgba(8,8,8,0.88)_45%,rgba(5,5,5,0.94)_100%)] p-6 backdrop-blur-xl md:p-9 lg:p-10">
        <div className="space-y-3 text-center lg:text-left">
          <div className="mx-auto h-3 w-24 animate-pulse rounded bg-white/10 lg:mx-0" />
          <div className="mx-auto h-8 w-48 animate-pulse rounded bg-white/10 lg:mx-0" />
          <div className="mx-auto h-4 w-full max-w-md animate-pulse rounded bg-white/5 lg:mx-0" />
        </div>
        <div className="mt-10 space-y-5">
          <div className="h-12 animate-pulse rounded-xl bg-white/5" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="h-12 animate-pulse rounded-xl bg-white/5" />
            <div className="h-12 animate-pulse rounded-xl bg-white/5" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-28 animate-pulse rounded-full bg-white/5"
              />
            ))}
          </div>
          <div className="h-12 animate-pulse rounded-xl bg-white/5" />
          <div className="h-40 animate-pulse rounded-xl bg-white/5" />
          <div className="h-14 animate-pulse rounded-full bg-kp-gold/20" />
        </div>
      </div>
    </div>
  );
}
