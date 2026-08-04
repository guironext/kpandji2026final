"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";

const POSTER_SRC = "/models/djet/poster.png";



export default function Poster() {
  const reduceMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start 90%", "end 20%"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    reduceMotion ? [1, 1, 1] : [1.09, 1, 1.028],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["5%", "-4%"],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["1%", "-11%"],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 1],
    reduceMotion ? [1, 1, 1] : [0.96, 1, 0.98],
  );
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduceMotion ? [1, 1, 1] : [0.92, 1, 1.05],
  );
  const stripClip = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduceMotion
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(8% 4% 10% 4%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <section
      className="relative isolate overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,rgba(8,8,8,0.94)_0%,rgba(5,5,5,0.98)_42%,rgba(6,11,18,0.96)_100%)] py-[clamp(3.5rem,9vw,7rem)]"
      aria-labelledby="kp-poster-heading -mt-[clamp(3.5rem,9vw,7rem)] md:-mt-[clamp(4.5rem,11vw,8.5rem)]" 
    >
      {/* Depth layers */}
      <div
        className="kp-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay md:opacity-[0.17]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.55, 0.35],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(1000px 580px at 50% -15%, rgba(201,169,98,0.12), transparent 58%), radial-gradient(820px 520px at 12% 95%, rgba(255,255,255,0.03), transparent 55%), radial-gradient(720px 480px at 88% 88%, rgba(201,169,98,0.05), transparent 58%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(380px,78vw)] -translate-x-1/2 bg-linear-to-r from-transparent via-kp-gold/45 to-transparent"
      />

     

      {/* Full-bleed cinematic strip */}
      <div ref={stripRef} className="relative mt-[clamp(2.75rem,7vw,4.25rem)] w-full">
        <motion.div
          className="relative mx-auto w-full max-w-none px-0"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Bloom */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[min(92vw,820px)] w-[110%] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[45%] bg-[radial-gradient(closest-side,rgba(201,169,98,0.24),transparent_68%)] blur-[56px]"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.45, 0.72, 0.45],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative mx-auto w-full perspective-distant"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    rotateX: 0.6,
                    rotateY: -0.4,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    rotateX: 0,
                    rotateY: 0,
                  }
            }
          >
            <div className="relative w-full px-px pt-px shadow-[0_28px_100px_-20px_rgba(0,0,0,0.82),0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* Top sheen line */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
              />

              <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(16,17,20,0.95)_0%,rgba(8,9,11,1)_100%)] ring-1 ring-white/8">
                {/* Corner brackets */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-4 z-20 size-8 border-l border-t border-kp-gold/35 md:left-6 md:top-6 md:size-10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-4 z-20 size-8 border-r border-t border-kp-gold/35 md:right-6 md:top-6 md:size-10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 left-4 z-20 size-8 border-b border-l border-kp-gold/25 md:bottom-6 md:left-6 md:size-10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-4 z-20 size-8 border-b border-r border-kp-gold/25 md:bottom-6 md:right-6 md:size-10"
                />

                <motion.div
                  className="relative isolate block w-full overflow-hidden bg-[radial-gradient(120%_95%_at_50%_50%,rgba(28,30,34,0.5)_0%,rgba(6,7,9,1)_75%)]"
                  style={
                    reduceMotion
                      ? undefined
                      : {
                          clipPath: stripClip,
                        }
                  }
                >
                  <motion.div
                    className="relative w-full will-change-transform"
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            scale: imageScale,
                            y: imageY,
                          }
                    }
                  >
                    <Image
                      src={POSTER_SRC}
                      alt="Affiche KPANDJI DJET — silhouette et signature lumineuse"
                      width={3284}
                      height={1312}
                      sizes="100vw"
                      className="relative z-0 block h-auto w-full max-w-none object-contain object-center align-top"
                      priority
                    />
                  </motion.div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(4,5,6,0.35)_0%,transparent_26%,transparent_74%,rgba(4,5,6,0.28)_100%)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(90%_70%_at_50%_50%,transparent_45%,rgba(0,0,0,0.2)_100%)]"
                  />

                  {!reduceMotion && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-3 overflow-hidden"
                    >
                      <div
                        className="absolute inset-y-[10%] left-[-45%] w-[50%] skew-x-[-13deg] bg-linear-to-r from-transparent via-white/8 to-transparent opacity-80"
                        style={{
                          animation:
                            "kp-light-sweep 13s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                          animationDelay: "1.5s",
                        }}
                      />
                    </div>
                  )}

                  {/* Sky scrim — keeps tagline readable on bright poster clouds */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-[6%] top-[10%] z-11 h-[min(38vw,340px)] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.78)_0%,rgba(248,250,252,0.52)_48%,transparent_72%)] blur-[1px] md:inset-x-[10%] md:top-[11%]"
                  />

                  <motion.div
                    className="pointer-events-none absolute inset-x-0 top-[22%] z-20 mx-auto max-w-[min(98vw,1320px)] px-4 text-center will-change-transform md:top-[24%] md:px-6"
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            y: textY,
                            opacity: textOpacity,
                            scale: textScale,
                          }
                    }
                  >
                    <motion.span
                      className="block font-serif text-[clamp(2.35rem,7.2vw,5.5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#143328] [text-shadow:0_1px_0_rgba(255,255,255,0.95),0_2px_28px_rgba(255,255,255,0.65)]"
                      initial={reduceMotion ? false : { opacity: 0, y: 48, filter: "blur(12px)" }}
                      whileInView={
                        reduceMotion
                          ? undefined
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      La force d&apos;une racine,
                    </motion.span>

                    <motion.span
                      className="mt-2 block md:mt-3"
                      initial={reduceMotion ? false : { opacity: 0, y: 56, filter: "blur(14px)" }}
                      whileInView={
                        reduceMotion
                          ? undefined
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 1.05,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <motion.span
                        className="inline-block font-serif text-[clamp(2.65rem,8vw,6.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#f6a709] [text-shadow:0_1px_0_rgba(255,255,255,0.9),0_3px_32px_rgba(255,255,255,0.55)]"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                color: ["#6b5324", "#8a6f35", "#6b5324"],
                              }
                        }
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        l&apos;élan d&apos;une nation
                      </motion.span>
                    </motion.span>

                    <motion.span
                      aria-hidden
                      className="mx-auto mt-6 block h-px w-[min(320px,78vw)] bg-linear-to-r from-transparent via-[#6b5324]/75 to-transparent md:mt-7"
                      initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                      whileInView={
                        reduceMotion ? undefined : { scaleX: 1, opacity: 1 }
                      }
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer rail */}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal
          delayMs={90}
          className="mt-[clamp(2.25rem,5vw,3rem)] flex flex-col items-center gap-6"
        >
          <motion.div
            aria-hidden
            className="h-px w-[min(200px,55vw)] bg-linear-to-r from-transparent via-white/18 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                k: "Signature",
                v: "Ligne lumineuse et identité KPANDJI.",
              },
              {
                k: "Proportions",
                v: "Composition panoramique, respiration premium.",
              },
              {
                k: "Finition",
                v: "Contrastes doux, grain subtil, profondeur.",
              },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-center ring-1 ring-white/5 backdrop-blur-sm"
              >
                <div className="text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase">
                  {item.k}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-white/78">{item.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
