import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";

type Photo = { src: string; alt: string; pos: string; wide?: boolean };

/** Real photos only: the clinic, the team and real client treatments. */
const spaceAndTeam: Photo[] = [
  { src: "/images/clinic/reception.jpg", alt: "The SKNN LAB reception", pos: "50% 55%", wide: true },
  { src: "/images/founder/bridget-logo-wall.jpg", alt: "Bridget Oshomah in front of the SKNN LAB logo wall", pos: "50% 30%" },
  { src: "/images/clinic/consultation-room.jpg", alt: "A consultation in progress", pos: "50% 55%", wide: true },
  { src: "/images/clinic/reception-call.jpg", alt: "A team member taking a booking at reception", pos: "50% 40%" },
  { src: "/images/clinic/hallway.jpg", alt: "The clinic hallway", pos: "50% 45%" },
  { src: "/images/clinic/product-shelf.jpg", alt: "Skincare products on the clinic shelf", pos: "50% 35%", wide: true },
  { src: "/images/clinic/analysis-scanner.jpg", alt: "A client's skin being scanned", pos: "50% 40%" },
  { src: "/images/founder/bridget-treatment-room.jpg", alt: "Bridget Oshomah in a treatment room", pos: "50% 45%", wide: true },
  { src: "/images/founder/bridget-celebration.jpg", alt: "Celebrating at SKNN LAB", pos: "50% 35%" },
];

const treatmentsInAction: Photo[] = [
  { src: "/images/treatments/microneedling.jpg", alt: "A client during microneedling", pos: "50% 50%" },
  { src: "/images/treatments/microneedling-session.jpg", alt: "A microneedling session at SKNN LAB", pos: "50% 55%", wide: true },
  { src: "/images/treatments/high-frequency.jpg", alt: "High-frequency therapy during a facial", pos: "50% 40%" },
  { src: "/images/founder/bridget-with-client.jpg", alt: "Bridget Oshomah with a client before a treatment", pos: "50% 50%", wide: true },
  { src: "/images/treatments/facial-mask.jpg", alt: "A client with a facial mask", pos: "50% 40%" },
  { src: "/images/clinic/analysis-results.jpg", alt: "Skin analysis results being explained", pos: "50% 35%", wide: true },
  { src: "/images/treatments/microneedling-pen.jpg", alt: "A microneedling pen", pos: "50% 50%" },
];

function Row({ photos, reverse, duration }: { photos: Photo[]; reverse?: boolean; duration: number }) {
  return (
    <Marquee duration={duration} reverse={reverse} className="py-1.5">
      {photos.map((p) => (
        <div
          key={p.src}
          className={`relative mx-2 h-[14rem] shrink-0 overflow-hidden rounded-2xl md:mx-2.5 md:h-[19rem] ${
            p.wide ? "w-[17rem] md:w-[23rem]" : "w-[11rem] md:w-[14.5rem]"
          }`}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 368px, 272px"
            className="object-cover transition-transform duration-1000 ease-lux hover:scale-105"
            style={{ objectPosition: p.pos }}
          />
        </div>
      ))}
    </Marquee>
  );
}

/** Two slow, endless strips of real clinic photography, moving in opposite directions. */
export function PhotoMarquee() {
  return (
    <div className="space-y-4 md:space-y-5">
      <Row photos={spaceAndTeam} duration={80} />
      <Row photos={treatmentsInAction} duration={90} reverse />
    </div>
  );
}
