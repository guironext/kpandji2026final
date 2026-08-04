import Image from "next/image";

import { SHOWROOM_LCP_SRC } from "@/data/showroom";

export function ShowroomSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Chargement du showroom"
      className="relative overflow-hidden pb-6 pt-[96px] sm:pt-[110px] md:pb-10 md:pt-[132px]"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <span
            className="mx-auto block h-px w-24 bg-linear-to-r from-transparent via-kp-gold/90 to-transparent sm:w-40 md:w-52"
            aria-hidden
          />
          <p className="mt-5 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-kp-muted sm:mt-6 sm:text-[11px] sm:tracking-[0.38em]">
            Découvrez notre
          </p>
          <h1 className="mt-4 font-serif text-[clamp(1.85rem,6.5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-kp-accent sm:mt-5">
            Showroom virtuel
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-[15px]">
            Parcourez nos modèles en images, filtrez extérieur et intérieur, et
            téléchargez les fiches techniques.
          </p>
        </header>

        <div className="mt-8 h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5 sm:mt-10" />

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8 sm:mt-8">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:aspect-video sm:rounded-3xl">
              <Image
                src={SHOWROOM_LCP_SRC}
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 animate-pulse bg-black/25" aria-hidden />
            </div>
            <div className="mt-4 flex gap-2.5 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[72px] w-[108px] shrink-0 animate-pulse rounded-xl bg-white/8 sm:h-[80px] sm:w-[128px]"
                />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="h-[320px] animate-pulse rounded-2xl border border-white/10 bg-white/5 sm:h-[360px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
