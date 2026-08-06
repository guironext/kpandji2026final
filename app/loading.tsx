export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-kp-bg pt-[110px] md:pt-[132px]">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border border-white/15 border-t-kp-gold"
        />
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          KPANDJI
        </p>
      </div>
    </div>
  );
}
