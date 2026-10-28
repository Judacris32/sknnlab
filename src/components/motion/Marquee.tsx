import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Seamless infinite marquee. Content is duplicated once; the track slides by half its width. */
export function Marquee({
  children,
  reverse,
  duration = 40,
  className,
  trackClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn("flex w-max shrink-0", reverse ? "animate-marquee-rev" : "animate-marquee", trackClassName)}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
