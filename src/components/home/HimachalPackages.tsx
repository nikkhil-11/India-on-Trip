import Button from "@/components/ui/Button";
import DestinationCard from "@/components/cards/DestinationCard";
import { himachalDestinations } from "@/data/packages";

/** Decorative mountain-and-pine scene for the blue intro panel. */
function PanelArt() {
  return (
    <svg
      viewBox="0 0 300 180"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="243" cy="38" r="20" fill="#FFD400" opacity="0.92" />
      <path d="M0 150 52 72l34 50 26-36 58 64H0z" fill="#FFFFFF" opacity="0.16" />
      <path d="M78 150 136 62l40 58 28-40 62 70H78z" fill="#FFFFFF" opacity="0.26" />
      <path d="M136 62l14 20-8 3-6-4-7 5-7-3z" fill="#FFFFFF" opacity="0.85" />
      <path d="M52 72l12 18-7 3-6-4-6 5-6-3z" fill="#FFFFFF" opacity="0.6" />
      {/* Pines */}
      {[22, 48, 268].map((x, index) => (
        <g key={x} transform={`translate(${x} ${index === 2 ? 108 : 116})`}>
          <path d="M8 0 16 18H0z" fill="#FFFFFF" opacity="0.5" />
          <path d="M8 12 18 34H-2z" fill="#FFFFFF" opacity="0.5" />
          <rect x="6.5" y="34" width="3" height="10" fill="#FFFFFF" opacity="0.4" />
        </g>
      ))}
      <path d="M0 150h300v30H0z" fill="#FFFFFF" opacity="0.1" />
    </svg>
  );
}

export default function HimachalPackages() {
  return (
    <section id="himachal-packages" className="section-y bg-light">
      <div className="container-page">
        <div className="grid grid-cols-[340px_1fr] gap-6 max-b960:grid-cols-1">
          <div className="flex flex-col justify-between overflow-hidden rounded-panel bg-primary p-7 text-white shadow-card">
            <div>
              <h2 className="t-h2 !text-white">Himachal Packages</h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-white/85">
                Discover the Best of Himachal with Our Curated Trips.
              </p>
            </div>

            <div className="my-7" aria-hidden="true">
              <PanelArt />
            </div>

            <Button href="#enquiry" variant="primary" size="lg" iconRight="arrow" full>
              Explore Himachal
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-5 max-b1024:grid-cols-2 max-b520:grid-cols-1">
            {himachalDestinations.map((item) => (
              <DestinationCard
                key={item.title}
                item={item}
                heightClassName="h-[420px]"
                sizes="(max-width: 520px) 100vw, (max-width: 1024px) 45vw, 28vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
