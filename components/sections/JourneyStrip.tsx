import { HeartbeatDivider } from "@/components/decor/HeartbeatDivider";
import { StickerImage } from "@/components/decor/StickerImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  image: string;
}

export interface JourneyStripProps {
  steps: JourneyStep[];
}

/** "Your 12 weeks, start to scrubs" — a numbered chapter strip: horizontal on desktop, a rail on mobile. */
export function JourneyStrip({ steps }: JourneyStripProps) {
  return (
    <section className="bg-navy-soft py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <h2 className="max-w-2xl text-h2 font-display text-navy">Your 12 weeks, start to scrubs.</h2>
        </Reveal>

        {/* Desktop: horizontal chapter strip with an EKG line running beneath */}
        <Reveal className="mt-12 hidden lg:block">
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-navy font-display text-lg font-semibold text-navy">
                  {step.number}
                </span>
                <StickerImage
                  src={step.image}
                  alt=""
                  sizes="220px"
                  rotate={step.number % 2 === 0 ? 2 : -2}
                  className="h-28 w-full"
                />
                <h3 className="text-h4 font-display text-navy">{step.title}</h3>
                <p className="text-body-sm text-primary-700">{step.description}</p>
              </div>
            ))}
          </div>
          <HeartbeatDivider className="mt-8" />
        </Reveal>

        {/* Mobile/tablet: vertical rail */}
        <Reveal className="mt-10 flex flex-col gap-8 lg:hidden">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-navy font-display text-base font-semibold text-navy">
                  {step.number}
                </span>
                {i < steps.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-navy/20" />}
              </div>
              <div className={cn("flex flex-1 gap-4 pb-2", i === steps.length - 1 && "pb-0")}>
                <div className="min-w-0 flex-1">
                  <h3 className="text-h4 font-display text-navy">{step.title}</h3>
                  <p className="mt-1 text-body-sm text-primary-700">{step.description}</p>
                </div>
                <StickerImage src={step.image} alt="" sizes="96px" rotate={i % 2 === 0 ? -2 : 2} className="h-20 w-20 shrink-0" />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
