import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="SKNN LAB Aesthetic Clinic — home" className={cn("relative block shrink-0", className)}>
      <Image
        src="/images/brand/sknn-lab-logo-720.png"
        alt="SKNN LAB Aesthetic Clinic"
        width={720}
        height={284}
        priority={priority}
        className="h-full w-auto"
        sizes="200px"
      />
    </Link>
  );
}
