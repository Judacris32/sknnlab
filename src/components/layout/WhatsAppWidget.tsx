"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { getCategory } from "@/data/treatments";
import { getProduct } from "@/data/products";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Builds a pre-filled message that tells the clinic which page the visitor came from. */
function contextMessage(pathname: string) {
  const [, section, slug] = pathname.split("/");
  if (section === "treatments" && slug) {
    const cat = getCategory(slug);
    if (cat) return `Hello SKNN LAB, I'd like to ask about your ${cat.name} treatments.`;
  }
  if (section === "shop" && slug) {
    const p = getProduct(slug);
    if (p) return `Hello SKNN LAB, I'd like to order the ${p.name}.`;
  }
  if (section === "shop") return "Hello SKNN LAB, I'd like to ask about your skincare products.";
  if (section === "book") return "Hello SKNN LAB, I have a question about booking an appointment.";
  return "Hello SKNN LAB, I'd like to make an enquiry.";
}

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const quick = [
    { label: "Ask a question", message: contextMessage(pathname) },
    { label: "Book a consultation", message: "Hello SKNN LAB, I'd like to book a skin consultation." },
    { label: "Order a product", message: "Hello SKNN LAB, I'd like to order a product from your shop." },
  ];
  // de-duplicate when on the shop page
  const options = quick.filter((q, i, arr) => arr.findIndex((x) => x.message === q.message) === i);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with SKNN LAB on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-soft"
          >
            <div className="flex items-center gap-3 bg-deep px-5 py-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#FBF7EF]">
                <Image src="/images/brand/sknn-lab-mark.png" alt="" width={36} height={36} className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <p className="!text-left font-display text-lg leading-tight text-[#F6E9D9]">SKNN LAB</p>
                <p className="!text-left font-sans text-xs text-[#D9C1A4]">Aesthetic Clinic · WhatsApp</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-full text-[#D9C1A4] hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-2xl rounded-tl-sm bg-soft/70 px-4 py-3 font-sans text-[0.93rem] leading-relaxed text-ink">
                Hi there 👋 Ask us anything about treatments, products or availability. We&apos;ll reply on WhatsApp.
              </div>
              <div className="flex flex-col gap-2">
                {options.map((q) => (
                  <a
                    key={q.label}
                    href={whatsappLink(q.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-line px-4 py-3 font-sans text-sm text-ink transition-colors hover:border-primary hover:bg-soft/60"
                  >
                    {q.label}
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
              <p className="!text-center font-sans text-xs text-text/80">
                Prefer to book online?{" "}
                <Link href="/book" className="text-accent underline underline-offset-2 dark:text-primary">
                  Request an appointment
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping2 rounded-full bg-[#25D366]" aria-hidden="true" />}
        <span className="relative">{open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}</span>
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-deep px-4 py-2 font-sans text-xs font-medium tracking-wide text-[#F6E9D9] opacity-0 shadow-soft transition-opacity group-hover:opacity-100 md:block">
            Chat with us
          </span>
        )}
      </button>
    </div>
  );
}
