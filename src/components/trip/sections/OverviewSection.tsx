import Icon from "@/components/ui/Icon";
import WeatherCard from "@/components/cards/WeatherCard";
import DestinationCard from "@/components/cards/DestinationCard";
import { rowStyles } from "@/components/ui/rows";
import AboutToggle from "./AboutToggle";
import type { Trip } from "@/types/trip";

export default function OverviewSection({ trip }: { trip: Trip }) {
  return (
    <section id="overview" className="spy-section mt-14">
      <h2 className="t-h2">{trip.about.heading}</h2>
      <p className="mt-4 text-[15.5px] leading-[1.75] text-body">{trip.about.intro}</p>
      <AboutToggle paragraphs={trip.about.more} />

      <h3 className="mt-12 font-display text-[22px] font-extrabold text-deep">Trip Highlights</h3>
      <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3.5 max-b760:grid-cols-1">
        {trip.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-body">
            <Icon name="check" size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-success" />
            {highlight}
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-display text-[22px] font-extrabold text-deep">{trip.season} Weather</h3>
      <p className="mt-2 text-[14px] text-muted">
        Temperatures and snow levels are placeholders until confirmed figures are supplied.
      </p>
      <div className="mt-5 grid grid-cols-4 gap-4 max-b900:grid-cols-2">
        {trip.months.map((month) => (
          <WeatherCard
            key={month.name}
            name={month.name}
            temp={month.temp}
            snow={month.snow}
            text={month.text}
          />
        ))}
      </div>

      <h3 className="mt-12 font-display text-[22px] font-extrabold text-deep">Best Places to Visit</h3>
      <div className={`mt-5 ${rowStyles.places.container}`}>
        {trip.places.map((place) => (
          <DestinationCard
            key={place.name}
            item={{ title: place.name, text: place.text, href: "#trip-enquiry", image: place.src }}
            className={rowStyles.places.item}
            heightClassName="h-[300px]"
            sizes="240px"
            compact
          />
        ))}
      </div>

      {/* High-altitude advisory */}
      <div className="mt-12 rounded-panel bg-[#FFF8D6] p-6 text-[#5C4600] max-b640:p-5">
        <h3 className="flex items-center gap-2.5 font-display text-[19px] font-extrabold !text-[#5C4600]">
          <Icon name="alert" size={21} strokeWidth={2} />
          {trip.altitude.title}
        </h3>

        <ul className="mt-4 space-y-3">
          {trip.altitude.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[14.5px] leading-[1.7]">
              <Icon name="info" size={18} className="mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-4 border-t border-[#5C4600]/20 pt-3.5 text-[13px] font-bold">{trip.altitude.note}</p>
      </div>
    </section>
  );
}
