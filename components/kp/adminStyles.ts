export const adminCardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kp-elevated/30 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-white/12 md:p-7";

export const adminCardGlow =
  "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-kp-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100";

export function adminFieldClass() {
  return "w-full rounded-xl border border-white/[0.11] bg-black/40 px-4 py-3.5 font-sans text-[15px] text-kp-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 transition-[border-color,box-shadow] duration-200 focus:border-kp-gold/45 focus:outline-none focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,169,98,0.12)]";
}

export const adminLabelClass =
  "mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38";

export const adminPrimaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-kp-gold px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_16px_40px_-12px_rgba(201,169,98,0.45)] transition-colors duration-300 hover:bg-[#d4b56e] disabled:opacity-50";

export const adminSecondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:border-white/40 hover:bg-white/5 disabled:opacity-50";
