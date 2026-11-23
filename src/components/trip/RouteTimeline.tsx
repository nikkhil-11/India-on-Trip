import Icon from "@/components/ui/Icon";
import type { Trip } from "@/types/trip";

/**
 * Route stops joined by a dashed line — horizontal on desktop, vertical at
 * <=760px. The first and last stops are flagged in yellow.
 */
export default function RouteTimeline({ stops }: { stops: Trip["routeStops"] }) {
  const lastIndex = stops.length - 1;

  return (
    <div className="rounded-panel bg-deep p-7 max-b640:p-5">
      <h2 className="font-display text-[22px] font-extrabold !text-white">Route</h2>
      <p className="mt-2 text-[14.5px] text-white/70">
        {stops[0]?.name} to {stops[lastIndex]?.name} · {stops.length} stops
      </p>

      <ol className="relative mt-8 flex justify-between gap-2 max-b760:flex-col max-b760:gap-6">
        {/* Dashed connector */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[13px] border-t-2 border-dashed border-white/25 max-b760:left-[13px] max-b760:right-auto max-b760:top-0 max-b760:h-full max-b760:border-l-2 max-b760:border-t-0"
        />

        {stops.map((stop, index) => {
          const endpoint = index === 0 || index === lastIndex;

          return (
            <li
              key={`${stop.name}-${index}`}
              className="relative flex flex-1 flex-col items-center text-center max-b760:flex-row max-b760:items-start max-b760:gap-4 max-b760:text-left"
            >
              <span
                aria-hidden="true"
                className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                  endpoint ? "bg-yellow text-deep" : "border-2 border-white/45 bg-deep text-white"
                }`}
              >
                {endpoint ? <Icon name="flag" size={14} strokeWidth={2.2} /> : null}
              </span>

              <span className="mt-3 max-b760:mt-0">
                <span className="block font-display text-[14.5px] font-extrabold !text-white">{stop.name}</span>
                <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/65">{stop.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
