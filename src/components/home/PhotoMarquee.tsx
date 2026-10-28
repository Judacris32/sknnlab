import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";

const photos = [
  { src: "/images/clinic/reception.jpg", pos: "50% 55%", w: "w-[22rem] md:w-[30rem]" },
  { src: "/images/founder/bridget-logo-wall.jpg", pos: "50% 30%", w: "w-[15rem] md:w-[19rem]" },
  { src: "/images/treatments/facial-mask.jpg", pos: "50% 40%", w: "w-[15rem] md:w-[19rem]" },
  { src: "/images/clinic/treatment-suite.jpg", pos: "55% 45%", w: "w-[22rem] md:w-[30rem]" },
  { src: "/images/treatments/microneedling-pen.jpg", pos: "50% 50%", w: "w-[15rem] md:w-[19rem]" },
  { src: "/images/clinic/hallway.jpg", pos: "50% 45%", w: "w-[15rem] md:w-[19rem]" },
  { src: "/images/clinic/product-shelf.jpg", pos: "50% 35%", w: "w-[22rem] md:w-[30rem]" },
  { src: "/images/founder/bridget-at-work.jpg", pos: "60% 55%", w: "w-[15rem] md:w-[19rem]" },
  { src: "/images/treatments/hydra-machine.jpg", pos: "50% 40%", w: "w-[15rem] md:w-[19rem]" },
];

/** A slow, endless strip of clinic photography. */
export function PhotoMarquee() {
  return (
    <Marquee duration={70} className="py-2">
      {photos.map((p) => (
        <div key={p.src} className={`relative mx-2.5 h-[18rem] shrink-0 overflow-hidden rounded-2xl md:mx-3 md:h-[24rem] ${p.w}`}>
          <Image src={p.src} alt="" fill sizes="480px" className="object-cover transition-transform duration-1000 ease-lux hover:scale-105" style={{ objectPosition: p.pos }} />
        </div>
      ))}
    </Marquee>
  );
}
