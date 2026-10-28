"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { categories } from "@/data/treatments";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { InstagramIcon } from "@/components/ui/icons";

/**
 * Floating pill navigation.
 * Over the hero it sits as frosted glass; once you scroll it turns solid and tightens up.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeHref = nav.find((n) => isActive(n.href))?.href ?? null;
  const pillHref = hovered ?? activeHref;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux", solid ? "pt-3" : "pt-5")}>
      <div className="container flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          className={cn(
            "flex items-center rounded-full px-4 transition-all duration-500 ease-lux",
            solid ? "h-[3.6rem] border border-line/70 bg-bg/85 shadow-soft backdrop-blur-xl" : "h-16 border border-transparent",
          )}
        >
          <Logo priority className={cn("transition-all duration-500", solid ? "h-10" : "h-12 md:h-14")} />
        </div>

        {/* Desktop pill nav */}
        <nav
          aria-label="Main"
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "hidden items-center rounded-full border p-1.5 transition-all duration-500 ease-lux lg:flex",
            solid
              ? "border-line/70 bg-bg/85 shadow-soft backdrop-blur-xl"
              : "border-white/25 bg-white/10 backdrop-blur-md",
          )}
        >
          <ul className="flex items-center">
            {nav.map((item) => {
              const active = isActive(item.href);
              const showPill = pillHref === item.href;
              const isTreatments = item.href === "/treatments";
              return (
                <li
                  key={item.href}
                  className={cn("relative", isTreatments && "group")}
                  onMouseEnter={() => setHovered(item.href)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 flex items-center gap-1 rounded-full px-5 py-2.5 font-sans text-[0.8rem] font-medium tracking-[0.06em] transition-colors duration-300",
                      showPill
                        ? active
                          ? "text-on-primary"
                          : solid
                            ? "text-ink"
                            : "text-espresso"
                        : solid
                          ? "text-ink/80 hover:text-ink"
                          : "text-white/90",
                    )}
                  >
                    {showPill && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          active ? "bg-primary" : solid ? "bg-soft" : "bg-white/90",
                        )}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                    {isTreatments && <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />}
                  </Link>

                  {isTreatments && (
                    <div className="invisible absolute left-1/2 top-full w-[21rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-[1.5rem] border border-line/70 bg-bg p-2 shadow-soft">
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/treatments/${c.slug}`}
                              className="group/item flex items-center justify-between rounded-2xl px-4 py-3 font-sans text-[0.95rem] text-ink transition-colors hover:bg-soft"
                            >
                              {c.name}
                              <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover/item:rotate-45" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-line/60 pt-1">
                          <Link href="/treatments" className="block rounded-2xl px-4 py-3 font-sans text-sm font-medium text-eyebrow hover:bg-soft">
                            Full menu and prices
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full p-1.5 transition-all duration-500 ease-lux",
            solid ? "border border-line/70 bg-bg/85 shadow-soft backdrop-blur-xl" : "border border-white/25 bg-white/10 backdrop-blur-md",
          )}
        >
          <ThemeToggle
            className={cn(
              "!h-10 !w-10 border-0",
              solid ? "text-ink hover:bg-soft" : "text-white hover:bg-white/15",
            )}
          />
          <Link href="/book" className="btn btn-primary hidden !px-6 !py-3 sm:inline-flex">
            Book now
          </Link>
          <button
            type="button"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full lg:hidden",
              solid ? "text-ink hover:bg-soft" : "text-white hover:bg-white/15",
            )}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 overflow-y-auto bg-bg pt-28 lg:hidden"
          >
            <div className="container flex min-h-full flex-col pb-28">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-full border px-6 py-4 font-display text-[1.9rem] leading-none transition-colors",
                        isActive(item.href) ? "border-primary bg-primary text-on-primary" : "border-line text-ink",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 !text-left font-sans text-sm font-medium text-eyebrow">Treatments</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/treatments/${c.slug}`} className="rounded-full bg-soft px-4 py-2.5 font-sans text-sm text-ink">
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link href="/book" className="btn btn-primary mt-8 w-full">
                Book an appointment <ArrowRight className="arrow h-4 w-4" />
              </Link>
              <div className="mt-auto flex items-center justify-center gap-6 pt-10 font-sans text-sm text-text">
                <a href={`tel:${site.contact.phones[0].tel}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> {site.contact.phones[0].display}
                </a>
                <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <InstagramIcon className="h-4 w-4 text-primary" /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
