"use client";

import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { track } from "@/lib/track";
import { batchLabel, findBatch, priceLabel } from "@/lib/trip";
import { whatsappEnabled, whatsappHrefOrFallback } from "@/lib/whatsapp";
import { PHONE, PHONE_LABEL } from "@/data/site";
import type { OccupancyId, Trip } from "@/types/trip";

export type BookingPanelProps = {
  trip: Trip;
  batchId: string | null;
  occupancy: OccupancyId;
  onBatchChange: (batchId: string | null) => void;
  onOccupancyChange: (occupancy: OccupancyId) => void;
  onEnquire: () => void;
  /** Distinguishes the sticky sidebar copy from the inline mobile copy. */
  uid: string;
};

export default function BookingPanel({
  trip,
  batchId,
  occupancy,
  onBatchChange,
  onOccupancyChange,
  onEnquire,
  uid,
}: BookingPanelProps) {
  const batch = findBatch(trip, batchId);
  const price = priceLabel(trip, batchId, occupancy);
  const oldPrice = trip.pricing.oldPrice === null ? "₹[Old Price]" : formatPrice(trip.pricing.oldPrice);

  const waHref = whatsappHrefOrFallback(
    {
      packageName: trip.enquiryConfig.packageName,
      destination: trip.destination,
      batch: batch ? batchLabel(batch) : undefined,
    },
    "#trip-enquiry",
  );

  return (
    <aside className="on-deep rounded-panel bg-deep p-6 text-white" aria-labelledby={`${uid}-panel-heading`}>
      <h2 id={`${uid}-panel-heading`} className="sr-only">
        Enquire about this trip
      </h2>

      <p className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/65">Starting from</p>
      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-display text-[32px] font-extrabold leading-none text-white">{price}</span>
        <span className="text-[14px] text-white/60 line-through">{oldPrice}</span>
      </p>
      <p className="mt-1 text-[13px] text-white/70">per person</p>

      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-[12.5px] font-bold text-yellow">
        <Icon name="tag" size={14} strokeWidth={2} />
        {trip.pricing.offer}
      </p>

      {/* Departure batch */}
      <div className="mt-6">
        <label htmlFor={`${uid}-batch`} className="mb-1.5 block text-[13px] font-bold text-white">
          Departure batch
        </label>
        <div className="relative">
          <select
            id={`${uid}-batch`}
            value={batchId ?? ""}
            onChange={(event) => onBatchChange(event.target.value || null)}
            className="h-[50px] w-full rounded-btn border-[1.5px] border-white/25 bg-white px-3.5 pr-9 text-[14.5px] font-semibold text-deep outline-none transition-colors focus:border-yellow"
          >
            <option value="">Select a departure</option>
            {trip.batches.map((option) => (
              <option key={option.id} value={option.id} disabled={option.status === "Sold Out"}>
                {batchLabel(option)}
                {option.status === "Sold Out" ? " — Sold Out" : ` — ${option.status}`}
              </option>
            ))}
          </select>
          <Icon
            name="down"
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary"
          />
        </div>
      </div>

      {/* Occupancy */}
      <fieldset className="mt-5">
        <legend className="mb-1.5 text-[13px] font-bold text-white">Occupancy</legend>
        <div className="flex gap-1 rounded-btn bg-white/12 p-1">
          {trip.pricing.occupancy.map((option) => {
            const selected = option.id === occupancy;
            return (
              <label
                key={option.id}
                className={clsx(
                  "flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[7px] text-[13.5px] font-bold transition-colors",
                  selected ? "bg-white text-deep" : "text-white/80 hover:bg-white/10",
                )}
              >
                <input
                  type="radio"
                  name={`${uid}-occupancy`}
                  value={option.id}
                  checked={selected}
                  onChange={() => onOccupancyChange(option.id)}
                  className="sr-only"
                />
                {option.short}
                <span className="sr-only"> Sharing</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Selected departure */}
      <div className="mt-5 rounded-btn border border-white/18 bg-white/8 p-3.5">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/60">Selected departure</p>
        {batch ? (
          <p className="mt-1.5 text-[14px] font-semibold text-white">
            {batch.start} → {batch.end}
            <span className="text-white/60"> · {batch.status}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-[14px] text-white/70">No departure selected yet</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          track("enquiry_cta_click", {
            cta: "booking_panel",
            source_page: trip.enquiryConfig.sourcePage,
            package_name: trip.enquiryConfig.packageName,
          });
          onEnquire();
        }}
        className="mt-5 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-btn bg-yellow font-sans text-[16px] font-bold text-deep transition-colors hover:bg-[#F0C800]"
      >
        <Icon name="send" size={19} strokeWidth={2} />
        Send Enquiry
      </button>

      <a
        href={waHref}
        onClick={() =>
          track("whatsapp_click", {
            source_page: trip.enquiryConfig.sourcePage,
            variant: "booking_panel",
            package_name: trip.enquiryConfig.packageName,
          })
        }
        {...(waHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-3 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-btn border border-white/55 font-sans text-[16px] font-bold text-white transition-colors hover:bg-white/12"
      >
        <Icon name="chat" size={19} strokeWidth={2} />
        WhatsApp Us
      </a>
      {whatsappEnabled ? null : (
        <p className="mt-2 text-center text-[12px] text-white/60">
          WhatsApp number not configured — this opens the enquiry form
        </p>
      )}

      {PHONE ? (
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className="mt-4 flex min-h-11 items-center justify-center gap-2 text-[14px] font-bold text-yellow transition-colors hover:text-white"
        >
          <Icon name="phone" size={17} strokeWidth={2} />
          {PHONE_LABEL}
        </a>
      ) : (
        <p className="mt-4 flex min-h-11 items-center justify-center gap-2 text-[14px] font-semibold text-white/70">
          <Icon name="phone" size={17} strokeWidth={2} />
          Call {PHONE_LABEL}
        </p>
      )}

      <ul className="mt-5 space-y-2.5 border-t border-white/14 pt-5">
        {trip.trust.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-white/85">
            <Icon name="checkcircle" size={17} className="mt-0.5 shrink-0 text-yellow" />
            {point}
          </li>
        ))}
      </ul>

      <p className="mt-5 flex items-start gap-2 rounded-btn bg-white/8 p-3 text-[12.5px] leading-[1.55] text-white/75">
        <Icon name="lock" size={15} className="mt-0.5 shrink-0 text-yellow" />
        Enquiry only — no payment is taken on this page.
      </p>
    </aside>
  );
}
