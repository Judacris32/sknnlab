import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, fromPrice, treatmentsIn } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/** Treatment categories as photo cards: two feature cards, then three. */
export function CategoryGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {categories.map((c, i) => {
        const count = treatmentsIn(c.slug).length;
        const price = fromPrice(c.slug);
        const feature = i < 2;
        return (
          <Reveal key={c.slug} delay={i * 0.07} className={feature ? "lg:col-span-3" : "lg:col-span-2"}>
            <Link
              href={`/treatments/${c.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-primary/60 hover:shadow-soft dark:bg-soft/40"
            >
              <div className={`relative overflow-hidden ${feature ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes={feature ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
                  className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-105"
                  style={{ objectPosition: c.imagePosition }}
                />
                <span className="absolute left-5 top-5 rounded-full bg-bg/90 px-3.5 py-1.5 font-sans text-xs font-medium text-ink backdrop-blur">
                  {count} {count === 1 ? "treatment" : "treatments"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[2rem] leading-tight md:text-[2.2rem]">{c.name}</h3>
                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 ease-lux group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-[0.97rem]">{c.short}</p>
                <p className="mt-5 border-t border-line pt-4 !text-left font-sans text-sm font-medium text-eyebrow">
                  {price !== null ? `From ${formatPrice(price)}` : "Priced at consultation"}
                </p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
