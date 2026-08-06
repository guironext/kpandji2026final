"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/KpLocaleProvider";

const images = [
  {
    src: "/models/para/pic.jpg",
    alt: "KPANDJI — parallax layer 1",
  },
  {
    src: "/models/para/pic1.jpg",
    alt: "KPANDJI — parallax layer 2",
  },
  {
    src: "/models/para/pic2.jpg",
    alt: "KPANDJI — parallax layer 3",
  },
  {
    src: "/models/para/pic3.png",
    alt: "KPANDJI — parallax layer 4",
  },
];

export default function Parala() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { tr, locale } = useLocale();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Finish the story before user leaves the section.
  const p = useTransform(scrollYProgress, [0, 0.82], [0, 1]);

  const sectionBg = useTransform(p, [0, 0.45, 1], ["#050505", "#071018", "#050505"]);
  const tintA = useTransform(p, [0, 0.5, 1], [0.18, 0.06, 0.14]);
  const tintB = useTransform(p, [0, 0.5, 1], [0.06, 0.18, 0.08]);

  // Background pan/zoom
  const bgY = useTransform(p, [0, 1], ["0%", "6%"]);
  const bgScale = useTransform(p, [0, 1], [1.06, 1.16]);
  const bgOpacity = useTransform(p, [0, 0.12, 0.22], [0.0, 0.92, 1]);
  const bgBlur = useTransform(p, [0, 0.14, 0.24], [18, 6, 0]);
  const bgBright = useTransform(p, [0, 0.18], [0.82, 1]);
  const bgContrast = useTransform(p, [0, 0.18], [1.06, 1.12]);

  // Floating frames (different depths)
  const f1x = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [-90, 70]);
  const f1y = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [80, -40]);
  const f1r = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [-6, 3]);

  const f2x = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [110, -60]);
  const f2y = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [30, -70]);
  const f2r = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [5, -2]);

  const f3x = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [-40, 40]);
  const f3y = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [120, -110]);
  const f3r = useTransform(p, [0, 1], reduceMotion ? [0, 0] : [2, -4]);

  const slideOutTop = useTransform(p, [0.72, 0.92, 1], [0, -120, -260]);
  const framesOpacity = useTransform(p, [0.08, 0.18], [0, 1]);

  // Quote reveal
  const endOpacity = useTransform(p, [0.72, 0.88], [0, 1]);
  const endY = useTransform(p, [0.72, 0.88], [22, 0]);
  const endBlur = useTransform(p, [0.72, 0.88], [12, 0]);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Parallax reveal"
      className="relative isolate"
      style={{ backgroundColor: sectionBg, position: "relative" }}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative h-[220vh] py-14 sm:h-[260vh] sm:py-16">
          <div className="sticky top-14 sm:top-20">
            <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-black/20 shadow-[0_26px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-[74vh] sm:min-h-[560px]">
              {/* Background image */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{
                  y: bgY,
                  scale: bgScale,
                  opacity: bgOpacity,
                  filter: useTransform([bgBlur, bgBright, bgContrast], ([b, br, c]) => {
                    return `blur(${b}px) brightness(${br}) contrast(${c})`;
                  }),
                }}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover object-[50%_40%]"
                />
              </motion.div>

              {/* Cinematic tints */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{
                  opacity: tintA,
                  background:
                    "radial-gradient(900px 600px at 18% 20%, rgba(201,169,98,0.85), transparent 60%)",
                }}
              />
              <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{
                  opacity: tintB,
                  background:
                    "radial-gradient(1000px 720px at 82% 62%, rgba(138,180,248,0.85), transparent 62%)",
                }}
              />

              {/* Floating frames */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: framesOpacity }}
              >
                {/* Desktop / tablet */}
                <div className="absolute inset-0 hidden sm:block perspective-distant">
                  <motion.div
                    className="absolute left-[6%] top-[14%] w-[52%] max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                    style={{
                      x: f1x,
                      y: useTransform([f1y, slideOutTop], ([a, b]) => (a as number) + (b as number)),
                      rotateZ: f1r,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative aspect-16/10 w-full">
                      <Image
                        src={images[1].src}
                        alt={images[1].alt}
                        fill
                        sizes="(max-width: 1024px) 80vw, 560px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute right-[7%] top-[22%] w-[38%] max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                    style={{
                      x: f2x,
                      y: useTransform([f2y, slideOutTop], ([a, b]) => (a as number) + (b as number)),
                      rotateZ: f2r,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative aspect-4/5 w-full">
                      <Image
                        src={images[2].src}
                        alt={images[2].alt}
                        fill
                        sizes="(max-width: 1024px) 60vw, 440px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-[14%] left-1/2 w-[62%] max-w-[720px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                    style={{
                      x: f3x,
                      y: f3y,
                      rotateZ: f3r,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative aspect-21/9 w-full">
                      <Image
                        src={images[3].src}
                        alt={images[3].alt}
                        fill
                        sizes="(max-width: 1024px) 90vw, 720px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Mobile montage */}
                <div className="absolute inset-x-0 bottom-5 px-5 sm:hidden">
                  <div className="grid grid-cols-3 gap-3">
                    {[images[1], images[2], images[3]].map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_16px_42px_rgba(0,0,0,0.55)]"
                      >
                        <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Grain + vignette */}
              <div aria-hidden className="pointer-events-none absolute inset-0 kp-grain opacity-[0.55]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -160px 220px rgba(0,0,0,0.65), inset 0 90px 160px rgba(0,0,0,0.30)",
                }}
              />

              {/* End quote */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
                style={{
                  opacity: endOpacity,
                  y: endY,
                  filter: useTransform(endBlur, (v) => `blur(${v}px)`),
                }}
              >
                <div className="relative flex max-w-3xl flex-col items-center justify-center px-5 text-center sm:px-8">
                  <div className="w-full max-w-xl rounded-[22px] border border-white/12 bg-black/35 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(201,169,98,0.08)] backdrop-blur-md sm:px-12 sm:py-12">
                    <div aria-hidden className="mx-auto mb-7 flex w-full max-w-[200px] items-center gap-3">
                      <span className="h-px flex-1 bg-linear-to-r from-transparent via-kp-gold/45 to-kp-gold/20" />
                      <span className="size-1.5 shrink-0 rounded-full bg-kp-gold/90 shadow-[0_0_14px_rgba(201,169,98,0.45)]" />
                      <span className="h-px flex-1 bg-linear-to-l from-transparent via-kp-gold/45 to-kp-gold/20" />
                    </div>

                    <p
                      className="mt-7 font-serif text-[clamp(32px,3.2vw,48px)] font-medium leading-[1.08] tracking-[-0.02em] text-balance text-kp-accent [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
                      lang={locale}
                    >
                      <span className="block sm:inline">
                        {tr("La force d'une racine,", "The strength of a root,")}
                      </span>{" "}
                      <span className="mt-1 block text-white/95 sm:mt-0 sm:inline">
                        {tr("l'élan d'une nation", "the drive of a nation")}
                      </span>
                    </p>
                    <div
                      aria-hidden
                      className="mx-auto mt-8 h-px w-16 bg-linear-to-r from-transparent via-kp-gold/40 to-transparent opacity-80"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
