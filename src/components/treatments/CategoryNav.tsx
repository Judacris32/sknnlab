"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/treatments";
import { getLenis } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/utils";

/** Sticky category tabs that follow your position on the menu. */
export function CategoryNav() {
  const [active, setActive] = useState<string>(categories[0].slug);
  const navRef = useRef<HTMLElement>(null);

  // Keep the active tab in view when the tabs scroll sideways on smaller screens.
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!nav || !tab || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: tab.offsetLeft - nav.clientWidth / 2 + tab.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -150 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[80px] z-30 border-b border-line/70 bg-bg/90 backdrop-blur-xl">
      <nav ref={navRef} aria-label="Treatment categories" className="no-scrollbar container relative overflow-x-auto py-3">
        <div className="mx-auto flex w-max gap-1">
          {categories.map((c) => (
          <button
            key={c.slug}
            data-cat={c.slug}
            type="button"
            onClick={() => jump(c.slug)}
            aria-current={active === c.slug ? "true" : undefined}
            className={cn(
              "relative shrink-0 rounded-full px-5 py-2.5 font-sans text-[0.78rem] font-medium tracking-wide transition-colors",
              active === c.slug ? "text-on-primary" : "text-ink hover:text-accent dark:hover:text-primary",
            )}
          >
            {active === c.slug && (
              <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <span className="relative">{c.name}</span>
          </button>
        ))}
        </div>
      </nav>
    </div>
  );
}
