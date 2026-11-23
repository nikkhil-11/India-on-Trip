"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import ItineraryDay from "../ItineraryDay";
import type { Trip } from "@/types/trip";

export default function ItinerarySection({ trip }: { trip: Trip }) {
  // Day 0 is open by default.
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([trip.days[0]?.n ?? 0]));

  function toggleDay(n: number) {
    setOpenDays((current) => {
      const next = new Set(current);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  const hasPdf = Boolean(trip.itineraryPdf);

  return (
    <section id="itinerary" className="spy-section mt-14">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <h2 className="t-h2">Itinerary</h2>
          <p className="mt-2 text-[15px] text-muted">
            {trip.days.length} days · {trip.duration} · {trip.routeStops[0]?.name} to{" "}
            {trip.routeStops[trip.routeStops.length - 1]?.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOpenDays(new Set(trip.days.map((day) => day.n)))}
            className="inline-flex h-11 items-center gap-2 rounded-btn border border-line bg-white px-4 text-[13.5px] font-bold text-deep transition-colors hover:bg-light"
          >
            <Icon name="plus" size={16} strokeWidth={2.2} />
            Expand All
          </button>
          <button
            type="button"
            onClick={() => setOpenDays(new Set())}
            className="inline-flex h-11 items-center gap-2 rounded-btn border border-line bg-white px-4 text-[13.5px] font-bold text-deep transition-colors hover:bg-light"
          >
            <Icon name="minus" size={16} strokeWidth={2.2} />
            Collapse All
          </button>

          {hasPdf ? (
            <a
              href={trip.itineraryPdf}
              download
              className="inline-flex h-11 items-center gap-2 rounded-btn bg-yellow px-4 text-[13.5px] font-bold text-deep transition-colors hover:bg-[#F0C800]"
            >
              <Icon name="download" size={16} strokeWidth={2.2} />
              Download Itinerary PDF
            </a>
          ) : (
            <span className="inline-flex flex-col">
              <button
                type="button"
                disabled
                className="inline-flex h-11 items-center gap-2 rounded-btn border border-field bg-white px-4 text-[13.5px] font-bold text-muted opacity-65"
              >
                <Icon name="download" size={16} strokeWidth={2.2} />
                Download Itinerary PDF
              </button>
              <span className="mt-1 text-[12px] text-muted">PDF not uploaded yet</span>
            </span>
          )}
        </div>
      </div>

      <ol className="mt-8 space-y-4">
        {trip.days.map((day, index) => (
          <ItineraryDay
            key={day.n}
            day={day}
            open={openDays.has(day.n)}
            onToggle={() => toggleDay(day.n)}
            isLast={index === trip.days.length - 1}
            uid={trip.slug}
          />
        ))}
      </ol>
    </section>
  );
}
