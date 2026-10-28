"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

const filters = ["All", "Cleanse", "Treat", "Hydrate", "Protect"] as const;

export function ShopGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list: Product[] = active === "All" ? products : products.filter((p) => p.category === active);
  return (
    <>
      <div role="tablist" aria-label="Filter products" className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors",
              active === f
                ? "border-primary bg-primary text-on-primary"
                : "border-line text-ink hover:border-primary",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
