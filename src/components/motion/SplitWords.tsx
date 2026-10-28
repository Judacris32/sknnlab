"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Splits a line into words that rise from behind a mask.
 * `italic` words (by index) are set in the display italic.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  inView = true,
  italicFrom,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  /** Words from this index onward are set in italic gold. */
  italicFrom?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const animate = { y: "0%", opacity: 1 };
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={
              italicFrom !== undefined && i >= italicFrom
                ? "inline-block font-normal italic text-primary"
                : "inline-block"
            }
            initial={reduce ? false : { y: "105%", opacity: 0 }}
            {...(inView ? { whileInView: animate, viewport: { once: true, margin: "-40px" } } : { animate })}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
