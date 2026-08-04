"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Children, type ReactNode, isValidElement, useRef } from "react";

function ParallaxSection({
  children,
  depth,
  flip,
}: {
  children: ReactNode;
  depth: number;
  flip: 1 | -1;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion || depth === 0
      ? [0, 0, 0]
      : [flip * depth * 36, 0, -flip * depth * 36],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion || depth === 0
      ? [0, 0, 0]
      : [depth * 14, 0, -depth * 14],
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
}

type HomeParallaxProps = {
  children: ReactNode;
  /**
   * When true, each section gets a subtle x/y drift wrapper.
   * Disable for sticky-heavy sections (sticky + transform ancestors can conflict).
   */
  enableSectionParallax?: boolean;
};

/**
 * Home parallax v2: whole-page scroll progress drives diagonal “orbit” on
 * fixed glows; each band gets alternating horizontal drift + light vertical
 * motion (no section scale — keeps sticky scenes like Parala reliable).
 */
export function HomeParallax({
  children,
  enableSectionParallax = true,
}: HomeParallaxProps) {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  const aY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -18]);
  const aX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 42]);
  const bY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 26]);
  const bX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -52]);
  const cY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 10]);
  const cX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 20]);
  const cScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.07]);

  const items = Children.toArray(children).filter(isValidElement);
  const depthPattern = [0, 0.9, 1, 1.2, 0.95, 1.15, 1, 1.05];

  return (
    <motion.main ref={mainRef} className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_10%,rgba(201,169,98,0.08),transparent_60%),radial-gradient(900px_600px_at_82%_60%,rgba(255,255,255,0.04),transparent_62%)]"
        style={{ x: aX, y: aY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_95%_55%_at_50%_-15%,rgba(201,169,98,0.07),transparent_55%)]"
        style={{ x: bX, y: bY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-[-15%] -z-10 bg-[radial-gradient(ellipse_75%_45%_at_88%_92%,rgba(255,255,255,0.04),transparent_58%)]"
        style={{ x: cX, y: cY, scale: cScale }}
      />

      {items.map((child, i) => {
        const k =
          isValidElement(child) && child.key != null
            ? child.key
            : `kp-home-parallax-${i}`;
        const flip: 1 | -1 = i % 2 === 0 ? 1 : -1;
        if (!enableSectionParallax) return <div key={k}>{child}</div>;
        return (
          <ParallaxSection key={k} depth={depthPattern[i] ?? 1} flip={flip}>
            {child}
          </ParallaxSection>
        );
      })}
    </motion.main>
  );
}
