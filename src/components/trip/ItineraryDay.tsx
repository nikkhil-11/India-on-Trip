"use client";

import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";
import type { ItineraryDayData } from "@/types/trip";

/** One accordion row on the itinerary timeline. */
export default function ItineraryDay({
  day,
  open,
  onToggle,
  isLast,
  uid,
}: {
  day: ItineraryDayData;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
  uid: string;
}) {
  const panelId = `${uid}-day-${day.n}-panel`;
  const buttonId = `${uid}-day-${day.n}-button`;

  const meta: { icon: Parameters<typeof Icon>[0]["name"]; label: string; value: string }[] = [
    { icon: "clock", label: "Drive", value: day.drive },
    { icon: "route", label: "Distance", value: day.distance },
    { icon: "bed", label: "Overnight", value: day.stay },
    { icon: "utensils", label: "Meals", value: day.meals },
  ];

  return (
    <li className="relative pl-16 max-b640:pl-14">
      {/* Timeline rail */}
      {isLast ? null : (
        <span
          aria-hidden="true"
          className="absolute left-[21px] top-11 h-[calc(100%-20px)] w-0.5 bg-line max-b640:left-[21px]"
        />
      )}

      <span
        aria-hidden="true"
        className={clsx(
          "absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border-2 font-display text-[13px] font-extrabold transition-colors",
          open ? "border-primary bg-primary text-white" : "border-line bg-white text-primary",
        )}
      >
        D{day.n}
      </span>

      <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
        <h3>
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center gap-4 p-4 text-left"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                Day {day.n}
              </span>
              <span className="mt-1 block font-display text-[16.5px] font-extrabold leading-[1.3] text-deep">
                {day.title}
              </span>
              <span className="mt-1 block text-[13.5px] leading-[1.55] text-muted">{day.summary}</span>
            </span>

            <span
              aria-hidden="true"
              className={clsx(
                "grid h-9 w-9 shrink-0 place-items-center rounded-btn transition-colors",
                open ? "bg-yellow text-deep" : "bg-tint text-primary",
              )}
            >
              <Icon name={open ? "minus" : "plus"} size={18} strokeWidth={2.2} />
            </span>
          </button>
        </h3>

        <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="border-t border-line p-4">
          <p className="text-[14.5px] leading-[1.7] text-body">{day.details}</p>

          <dl className="mt-4 grid grid-cols-4 gap-3 max-b760:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label} className="rounded-btn bg-light p-3">
                <dt className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.06em] text-muted">
                  <Icon name={item.icon} size={14} strokeWidth={2} className="text-primary" />
                  {item.label}
                </dt>
                <dd className="mt-1 text-[13.5px] font-bold text-deep">{item.value}</dd>
              </div>
            ))}
          </dl>

          {day.media && day.media.length > 0 ? (
            <ul className="mt-4 grid grid-cols-3 gap-3 max-b640:grid-cols-2">
              {day.media.map((image) => (
                <li key={image.alt} className="relative h-[130px] overflow-hidden rounded-btn">
                  <PhotoSlot
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width: 640px) 45vw, 220px"
                    hideLabel
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}
