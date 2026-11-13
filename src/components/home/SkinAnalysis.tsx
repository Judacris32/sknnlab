import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";

/** The four photos follow the order of a real skin analysis. */
const steps = [
  {
    src: "/images/clinic/analysis-scanner.jpg",
    alt: "A client's skin being mapped by a 3D skin analyser",
    pos: "50% 40%",
    caption: "Scan",
  },
  {
    src: "/images/clinic/analysis-handheld.jpg",
    alt: "A SKNN LAB specialist examining a client's skin with a handheld scanner",
    pos: "50% 45%",
    caption: "Look closer",
  },
  {
    src: "/images/clinic/analysis-results.jpg",
    alt: "A SKNN LAB specialist explaining scan results to a client",
    pos: "50% 35%",
    caption: "Explain",
  },
  {
    src: "/images/clinic/analysis-consult.jpg",
    alt: "A SKNN LAB specialist noting a client's concerns during a consultation",
    pos: "50% 40%",
    caption: "Plan",
  },
];

const promises = [
  "Technology that sees what the eye can't",
  "Every result explained in plain words",
  "A plan built on what your skin actually needs",
];

function Photo({ step, index, offset }: { step: (typeof steps)[number]; index: number; offset: number }) {
  return (
    <Parallax offset={offset} className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
      <Image
        src={step.src}
        alt={step.alt}
        fill
        sizes="(min-width: 1024px) 28vw, 45vw"
        className="scale-110 object-cover"
        style={{ objectPosition: step.pos }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(30,22,17,0.7)] to-transparent" />
      <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-bg/90 py-1.5 pl-1.5 pr-4 font-sans text-sm font-medium text-ink backdrop-blur">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-on-primary">{index + 1}</span>
        {step.caption}
      </span>
    </Parallax>
  );
}

/** "Inside a SKNN LAB skin analysis": shows how the clinic works, to build trust before booking. */
export function SkinAnalysis() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
      {/* Photos, in the order of the process */}
      <div className="order-2 grid grid-cols-2 gap-4 lg:order-1 lg:col-span-7">
        <div className="space-y-4">
          <Photo step={steps[0]} index={0} offset={20} />
          <Photo step={steps[2]} index={2} offset={30} />
        </div>
        <div className="mt-14 space-y-4">
          <Photo step={steps[1]} index={1} offset={40} />
          <Photo step={steps[3]} index={3} offset={50} />
        </div>
      </div>

      {/* Text */}
      <div className="order-1 lg:order-2 lg:col-span-5">
        <Reveal y={12}>
          <p className="eyebrow !text-left">Our process</p>
        </Reveal>
        <h2 className="mt-5 text-[2.8rem] leading-[1.02] sm:text-6xl">
          <SplitWords text="Inside a SKNN LAB skin analysis" italicFrom={4} />
        </h2>
        <Reveal delay={0.15}>
          <div className="mt-8 h-px w-16 bg-primary" />
          <p className="mt-8">
            Before we recommend a single treatment, we take a close, careful look at your skin. We map it with a 3D skin analyser and a handheld scanner, then sit with you and explain every result, so you understand your skin as well as we do.
          </p>
          <ul className="mt-8 space-y-3.5">
            {promises.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-[0.98rem] leading-relaxed text-ink">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link href="/book?treatment=skin-analysis" className="btn btn-primary mt-10">
            Book a face analysis <ArrowRight className="arrow h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
