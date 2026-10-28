import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DropDivider } from "./icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";

/**
 * Centered section header used across the site:
 * small gold label → large serif title (words rise in) → droplet divider → short intro.
 */
export function SectionHeader({
  eyebrow,
  title,
  italicFrom,
  subtitle,
  light,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  /** Words from this index onward are set in gold italic (use sparingly). */
  italicFrom?: number;
  subtitle?: ReactNode;
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <p className={cn("eyebrow", light && "!text-gold")}>{eyebrow}</p>
        </Reveal>
      )}
      <Tag
        className={cn(
          "mt-5 text-[2.6rem] leading-[1.02] sm:text-[3.4rem] md:text-[4.2rem]",
          light && "!text-cream",
        )}
      >
        <SplitWords text={title} italicFrom={italicFrom} />
      </Tag>
      <Reveal y={10} delay={0.2}>
        <DropDivider className="mt-7" />
      </Reveal>
      {subtitle && (
        <Reveal y={16} delay={0.25}>
          <p
            className={cn(
              "mx-auto mt-6 max-w-xl !text-center text-[1.05rem] leading-relaxed [hyphens:manual] md:text-lg",
              light ? "text-sand" : "text-text",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
