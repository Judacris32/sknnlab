import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { concerns } from "@/data/concerns";
import { getTreatment } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "What would you like to change?" as concern cards.
 * Everything is visible at once: the concern, what it is, and the treatments we
 * recommend for it, each with its price and a Book button. Swipeable on phones.
 */
export function ConcernExplorer() {
  return (
    <div>
      <p className="mb-5 !text-center font-sans text-sm text-text md:hidden">Swipe to see all six concerns →</p>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
        {concerns.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.08} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
            <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-bg shadow-soft transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-primary/60">
              {/* Concern */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
                  className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-105"
                  style={{ objectPosition: c.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,22,17,0.85)] via-[rgba(30,22,17,0.2)] to-transparent" />
                <h3 className="absolute bottom-5 left-6 right-6 text-[2rem] leading-tight !text-white">{c.name}</h3>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="!text-left text-[0.97rem] leading-relaxed">{c.text}</p>

                {/* Recommended treatments */}
                <p className="mt-6 !text-left font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-eyebrow">
                  We recommend
                </p>
                <ul className="mt-3 flex-1 divide-y divide-line border-y border-line">
                  {c.treatments.map((slug) => {
                    const t = getTreatment(slug);
                    if (!t) return null;
                    return (
                      <li key={slug} className="flex items-center justify-between gap-4 py-3.5">
                        <div className="min-w-0">
                          <p className="!text-left font-display text-[1.25rem] leading-tight text-ink">{t.name}</p>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 !text-left font-sans text-sm text-text">
                            <span className="font-medium text-ink">{formatPrice(t.price)}</span>
                            {t.duration && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {t.duration}
                              </span>
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/book?treatment=${slug}`}
                          aria-label={`Book ${t.name}`}
                          className="shrink-0 rounded-full border border-primary px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bg"
                        >
                          Book
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/book?treatment=consultation"
                  className="mt-5 inline-flex items-center gap-2 self-start font-sans text-sm text-accent transition-colors hover:text-ink dark:text-primary"
                >
                  Not sure? Book a consultation <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
