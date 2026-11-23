import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import type { Trip } from "@/types/trip";

export default function TripHeader({ trip }: { trip: Trip }) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge tone="tint" icon={trip.season === "Winter" ? "snow" : "sun"}>
          {trip.season}
        </Badge>
        <Badge tone="tint" icon="users">
          {trip.type}
        </Badge>
        <Badge tone="yellow" icon="clock">
          {trip.duration}
        </Badge>
      </div>

      <h1 className="t-h1 mt-4">{trip.title}</h1>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold text-body">
        <Icon name="route" size={18} className="shrink-0 text-primary" />
        {trip.route.map((stop, index) => (
          <span key={`${stop}-${index}`} className="flex items-center gap-2">
            {stop}
            {index < trip.route.length - 1 ? (
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            ) : null}
          </span>
        ))}
      </p>
    </header>
  );
}
