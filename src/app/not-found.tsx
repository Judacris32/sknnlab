import Link from "next/link";
import Image from "next/image";
import { DropDivider } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="surface-dark relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-deep px-5 py-32 text-center">
      <Image src="/images/clinic/hallway.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[rgba(30,22,17,0.78)]" />
      <div>
        <p className="eyebrow !text-primary">Error 404</p>
        <h1 className="mt-5 text-5xl !text-white md:text-7xl">
          This page has <em className="font-normal italic text-primary">wandered off</em>
        </h1>
        <DropDivider className="mt-7" />
        <p className="mx-auto mt-6 max-w-md !text-center text-white/80">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/treatments" className="btn btn-light">View treatments</Link>
        </div>
      </div>
    </section>
  );
}
