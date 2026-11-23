"use client";

import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import { PRICE_PLACEHOLDER } from "@/lib/format";
import type { BatchStatus, TripBatch } from "@/types/trip";

const statusStyles: Record<BatchStatus, string> = {
  Available: "bg-[#E7F5EC] text-[#0E6B3D]",
  "Filling Fast": "bg-[#FFF4D6] text-[#7A5200]",
  "Sold Out": "bg-[#EEF1F5] text-muted",
};

export default function BatchRow({
  batch,
  price,
  selected,
  onSelect,
}: {
  batch: TripBatch;
  /** Already formatted, or the ₹[Price] placeholder. */
  price: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const soldOut = batch.status === "Sold Out";

  return (
    <li
      className={clsx(
        "flex flex-wrap items-center justify-between gap-4 rounded-card bg-white p-4 transition-colors",
        selected ? "border-2 border-primary" : "border border-line",
        soldOut && "opacity-70",
      )}
    >
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[15px] font-extrabold text-deep">
          {batch.start}
          <span aria-hidden="true" className="font-normal text-muted">
            →
          </span>
          {batch.end}
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className={clsx("rounded-full px-2.5 py-1 text-[11.5px] font-bold", statusStyles[batch.status])}>
            {batch.status}
          </span>
          <span className="text-[12.5px] text-muted">
            From, per person <span className="font-bold text-deep">{price || PRICE_PLACEHOLDER}</span>
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={onSelect}
        disabled={soldOut}
        aria-pressed={selected}
        className={clsx(
          "inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-btn px-4 font-sans text-[14px] font-bold transition-colors",
          soldOut && "cursor-not-allowed bg-[#EEF1F5] text-muted",
          !soldOut && selected && "bg-primary text-white",
          !soldOut && !selected && "border border-primary bg-white text-primary hover:bg-tint",
        )}
      >
        {soldOut ? (
          "Sold Out"
        ) : selected ? (
          <>
            <Icon name="check" size={16} strokeWidth={2.4} />
            Selected
          </>
        ) : (
          "Select"
        )}
      </button>
    </li>
  );
}
