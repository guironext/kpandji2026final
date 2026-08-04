import Image from "next/image";

const heroChipClass =
  "inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:px-3.5 sm:tracking-[0.2em]";

export type EmploisPageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  chips: readonly string[];
};

export function EmploisPageHero({
  kicker,
  title,
  description,
  chips,
}: EmploisPageHeroProps) {
  return (
    <header className="mx-auto w-full max-w-6xl">
      <div
        className="relative isolate -mx-4 flex min-h-[min(78svh,640px)] w-[calc(100%+2rem)] max-w-none flex-col items-center justify-center overflow-hidden rounded-b-[28px] border border-white/10 border-t-transparent shadow-[0_36px_100px_-40px_rgba(0,0,0,0.92)] sm:mx-0 sm:min-h-[min(70svh,600px)] sm:w-full sm:rounded-3xl sm:border-white/11 sm:border-t md:min-h-[min(62svh,560px)]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/models/plus/pic3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div className="absolute inset-0 bg-kp-bg/65" />
          <div className="absolute inset-0 bg-linear-to-br from-black/65 via-black/35 to-black/78" />
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-kp-gold/12 to-transparent opacity-90" />
          <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px]" />
        </div>

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 py-14 text-center sm:px-8 sm:py-16 md:px-12 md:py-17">
          <span
            className="h-px w-24 shrink-0 bg-linear-to-r from-transparent via-kp-gold to-transparent opacity-95 sm:w-32 md:w-40"
            aria-hidden
          />
          <p className="mt-6 max-w-prose font-sans text-[10px] font-semibold uppercase leading-relaxed tracking-[0.38em] text-white/58 sm:text-[11px] sm:tracking-[0.42em]">
            {kicker}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-balance font-serif text-[clamp(2.05rem,4.8vw+0.5rem,3.65rem)] font-medium leading-[1.04] tracking-[-0.03em] text-kp-accent sm:mt-5">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-[1.7] text-white/68 sm:mt-6 sm:text-[15px] md:leading-[1.72]">
            {description}
          </p>
          <div
            className="mt-9 flex max-w-xl flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-2.5 md:max-w-none"
            role="list"
            aria-label="Points clés">
            {chips.map((label) => (
              <span key={label} className={heroChipClass} role="listitem">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-kp-gold shadow-[0_0_12px_rgba(201,169,98,0.45)]"
                  aria-hidden
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
