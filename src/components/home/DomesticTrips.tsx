import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/cards/DestinationCard";
import { rowStyles } from "@/components/ui/rows";
import { domesticDestinations } from "@/data/packages";

export default function DomesticTrips() {
  return (
    <section id="domestic-trips" className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Beyond the Himalayas"
          title="Domestic Trips"
          subtitle="Explore Incredible India Beyond the Himalayas."
        />

        <div className={`mt-10 ${rowStyles.domestic.container}`}>
          {domesticDestinations.map((item) => (
            <DestinationCard
              key={item.title}
              item={item}
              className={rowStyles.domestic.item}
              heightClassName="h-[440px]"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 48vw, 24vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
