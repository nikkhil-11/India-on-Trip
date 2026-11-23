import { formatPrice } from "./format";
import type { OccupancyId, Trip, TripBatch } from "@/types/trip";

/** Human label for a departure, e.g. "[DD] Nov 2026 → [DD] Nov 2026". */
export function batchLabel(batch: TripBatch): string {
  return `${batch.start} → ${batch.end}`;
}

/** Departures a traveller can still enquire about. */
export function openBatches(trip: Trip): TripBatch[] {
  return trip.batches.filter((batch) => batch.status !== "Sold Out");
}

export function findBatch(trip: Trip, batchId: string | null): TripBatch | undefined {
  if (!batchId) return undefined;
  return trip.batches.find((batch) => batch.id === batchId);
}

/**
 * Most specific price wins: the batch override, then the occupancy row, then
 * the trip's "from" price. Null all the way down means nothing is confirmed
 * yet and the UI shows the ₹[Price] placeholder.
 */
export function resolvePrice(trip: Trip, batchId: string | null, occupancy: OccupancyId): number | null {
  const batch = findBatch(trip, batchId);
  const batchPrice = batch?.prices?.[occupancy];
  if (typeof batchPrice === "number") return batchPrice;

  const row = trip.pricing.occupancy.find((item) => item.id === occupancy);
  if (typeof row?.price === "number") return row.price;

  return trip.pricing.fromPrice;
}

export function priceLabel(trip: Trip, batchId: string | null, occupancy: OccupancyId): string {
  return formatPrice(resolvePrice(trip, batchId, occupancy));
}

export function occupancyLabel(trip: Trip, occupancy: OccupancyId): string {
  return trip.pricing.occupancy.find((item) => item.id === occupancy)?.label ?? "";
}

/** Groups batches by month for the month-filtered Batches section. */
export function batchesByMonth(trip: Trip): Record<string, TripBatch[]> {
  return trip.batches.reduce<Record<string, TripBatch[]>>((accumulator, batch) => {
    (accumulator[batch.month] ??= []).push(batch);
    return accumulator;
  }, {});
}
