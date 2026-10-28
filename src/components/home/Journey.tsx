"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    title: "Talk to us",
    text: "Book a consultation in the clinic or online. We look closely at your skin and listen to what you'd like to change.",
  },
  {
    title: "Get your plan",
    text: "We recommend the treatments and products that suit your skin, with honest timelines and clear prices.",
  },
  {
    title: "Begin treatment",
    text: "Relax in a calm, private room while our practitioners work to clinical standards with professional-grade products.",
  },
  {
    title: "Keep your results",
    text: "You leave with a clear aftercare guide and a plan for what comes next, so your progress lasts.",
  },
];

/** The four-step client journey. The connecting line draws itself as you scroll. */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative grid gap-12 md:grid-cols-4 md:gap-8">
      <div className="absolute left-[1.6rem] top-0 h-full w-px bg-line md:left-0 md:top-[1.6rem] md:h-px md:w-full" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scale }}
        className="absolute left-[1.6rem] top-0 h-full w-px origin-top bg-primary md:hidden"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduce ? 1 : scale }}
        className="absolute left-0 top-[1.6rem] hidden h-px w-full origin-left bg-primary md:block"
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-20 md:pl-0"
        >
          <span className="absolute left-0 top-0 grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full border border-primary bg-bg font-display text-xl italic text-accent dark:text-primary md:relative">
            {i + 1}
          </span>
          <h3 className="text-[1.9rem] md:mt-8">{s.title}</h3>
          <p className="mt-3 text-[0.98rem]">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
