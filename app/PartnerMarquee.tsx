import Image from "next/image";

const logos = [
  { src: "/logos/amca.png", alt: "American Medical Certification Association", width: 399, height: 126 },
  { src: "/logos/pearson-vue.png", alt: "Pearson VUE Authorized Testing Site", width: 666, height: 371 },
  { src: "/logos/maxlab.png", alt: "MaxLab", width: 901, height: 312 },
];

const sequence = Array.from({ length: 6 }, () => logos).flat();

function MarqueeSequence({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {sequence.map((logo, i) => (
        <div key={i} className="flex shrink-0 items-center px-10 md:px-14">
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-8 w-auto grayscale transition-[filter] duration-300 hover:grayscale-0 md:h-10"
          />
        </div>
      ))}
    </div>
  );
}

export function PartnerMarquee() {
  return (
    <div className="v4-scope marquee-strip overflow-hidden border-b border-[var(--color-v4-line)] bg-white py-10">
      <div className="marquee-track flex w-max">
        <MarqueeSequence />
        <MarqueeSequence ariaHidden />
      </div>
    </div>
  );
}
