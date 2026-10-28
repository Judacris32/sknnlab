import { Marquee } from "@/components/motion/Marquee";
import { DropIcon } from "@/components/ui/icons";

const top = ["Hydra Facial", "Chemical Peels", "Microneedling", "Acne Control", "Skin Consultations", "Dermaplaning", "Brightening Facials", "Body Peels"];
const bottom = ["Clearer skin", "Even tone", "Lasting glow", "Smoother texture", "Healthy barrier", "Real confidence"];

export function TreatmentMarquee() {
  return (
    <section aria-label="Treatments we offer" className="relative overflow-hidden bg-primary py-8 md:py-10">
      <Marquee duration={48} className="mask-fade-x">
        {top.map((t) => (
          <span key={t} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-display text-[2.4rem] italic leading-none text-espresso md:text-[3.4rem]">{t}</span>
            <DropIcon className="h-5 w-4 text-espresso/50" />
          </span>
        ))}
      </Marquee>
      <Marquee duration={38} reverse className="mask-fade-x mt-5">
        {bottom.map((t) => (
          <span key={t} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-sans text-sm font-medium uppercase tracking-[0.32em] text-espresso/75">{t}</span>
            <span className="h-1 w-1 rounded-full bg-espresso/50" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
