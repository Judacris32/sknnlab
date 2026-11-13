import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { menuFor, type CategorySlug, type Treatment } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentRow } from "@/components/ui/TreatmentRow";

/** A compact price-list row, for menus like waxing where every item is self-explanatory. */
function PriceRow({ t }: { t: Treatment }) {
  return (
    <li className="group flex items-center gap-4 border-b border-line py-4">
      <div className="min-w-0 flex-1">
        <p className="!text-left font-display text-[1.3rem] leading-tight text-ink md:text-[1.4rem]">{t.name}</p>
        {(t.duration || t.note) && (
          <p className="mt-1 !text-left font-sans text-xs text-text">{[t.duration, t.note].filter(Boolean).join(" · ")}</p>
        )}
      </div>
      <span className="shrink-0 whitespace-nowrap font-display text-xl text-ink">{formatPrice(t.price)}</span>
      <Link
        href={`/book?treatment=${t.slug}`}
        aria-label={`Book ${t.name}`}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/70 text-ink transition-all duration-500 ease-lux hover:bg-primary hover:text-on-primary group-hover:rotate-45"
      >
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </li>
  );
}

/**
 * The full menu for one category. Long menus are split into labelled groups;
 * treatments with a description get a full row, the rest a compact two-column price list.
 */
export function TreatmentMenu({ category }: { category: CategorySlug }) {
  const sections = menuFor(category);

  return (
    <div className="space-y-14">
      {sections.map(({ group, items }) => {
        const full = items.filter((t) => t.summary);
        const compact = items.filter((t) => !t.summary);
        return (
          <div key={group?.name ?? "menu"}>
            {group && (
              <Reveal y={12} className="mb-1">
                <h3 className="flex items-center gap-4 font-sans text-[0.74rem] font-medium uppercase tracking-[0.22em] text-eyebrow">
                  {group.name}
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </h3>
                {group.intro && <p className="mt-3 max-w-2xl !text-left text-[0.97rem]">{group.intro}</p>}
              </Reveal>
            )}

            {full.length > 0 && (
              <div className={group ? "" : "border-t border-line"}>
                {full.map((t, i) => (
                  <Reveal key={t.slug} delay={Math.min(i, 4) * 0.05} y={20}>
                    <TreatmentRow t={t} />
                  </Reveal>
                ))}
              </div>
            )}

            {compact.length > 0 && (
              <Reveal y={16}>
                <ul className={`grid md:grid-cols-2 md:gap-x-10 ${full.length ? "mt-4" : "mt-2"}`}>
                  {compact.map((t) => (
                    <PriceRow key={t.slug} t={t} />
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        );
      })}
    </div>
  );
}
