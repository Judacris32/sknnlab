import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Treatment } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";

/** A refined menu row: name and description on the left, duration, price and booking on the right. */
export function TreatmentRow({ t }: { t: Treatment }) {
  return (
    <article className="group relative grid gap-4 border-b border-line py-8 transition-colors duration-500 md:grid-cols-12 md:items-center md:gap-8">
      <div className="pointer-events-none absolute inset-y-0 -left-4 -right-4 -z-10 rounded-2xl bg-soft/0 transition-colors duration-500 group-hover:bg-soft/50 md:-left-6 md:-right-6" />
      <div className="md:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[1.75rem] leading-tight md:text-[2rem]">{t.name}</h3>
          {t.note && (
            <span className="rounded-full border border-primary/60 px-3 py-0.5 font-sans text-[0.68rem] font-medium tracking-wide text-eyebrow">
              {t.note}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-[0.98rem]">{t.summary}</p>
      </div>
      <div className="flex items-center justify-between gap-6 md:col-span-5 md:justify-end">
        <div className="flex items-center gap-6 font-sans">
          {t.duration && (
            <span className="inline-flex items-center gap-1.5 text-sm text-text">
              <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {t.duration}
            </span>
          )}
          <span className="font-display text-2xl text-ink">{formatPrice(t.price)}</span>
        </div>
        <Link
          href={`/book?treatment=${t.slug}`}
          aria-label={`Book ${t.name}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary text-ink transition-all duration-500 ease-lux hover:bg-primary hover:text-on-primary group-hover:rotate-45"
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}
