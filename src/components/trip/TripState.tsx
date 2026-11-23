"use client";

import { createContext, useContext, useState } from "react";
import type { OccupancyId, Trip } from "@/types/trip";
import { findBatch } from "@/lib/trip";

type TripStateValue = {
  trip: Trip;
  batchId: string | null;
  occupancy: OccupancyId;
  /** Which month's departures the Batches section is showing. */
  month: string;
  modalOpen: boolean;
  selectBatch: (batchId: string | null) => void;
  selectOccupancy: (occupancy: OccupancyId) => void;
  selectMonth: (month: string) => void;
  openModal: () => void;
  closeModal: () => void;
};

const TripStateContext = createContext<TripStateValue | null>(null);

/**
 * Owns the trip page's shared selection. One source of truth keeps the booking
 * panel, the sticky bar, both enquiry forms, the batch rows, the occupancy
 * table and the WhatsApp message in step.
 *
 * Static sections are passed in as `children` so they stay server components.
 */
export default function TripStateProvider({ trip, children }: { trip: Trip; children: React.ReactNode }) {
  const [batchId, setBatchId] = useState<string | null>(null);
  const [occupancy, setOccupancy] = useState<OccupancyId>(trip.pricing.occupancy[0]?.id ?? "quad");
  const [month, setMonth] = useState<string>(trip.batchMonths[0] ?? "");
  const [modalOpen, setModalOpen] = useState(false);

  function selectBatch(nextBatchId: string | null) {
    setBatchId(nextBatchId);

    // Picking a departure in the panel also moves the month filter to match.
    const batch = findBatch(trip, nextBatchId);
    if (batch) setMonth(batch.month);
  }

  const value: TripStateValue = {
    trip,
    batchId,
    occupancy,
    month,
    modalOpen,
    selectBatch,
    selectOccupancy: setOccupancy,
    selectMonth: setMonth,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
  };

  return <TripStateContext.Provider value={value}>{children}</TripStateContext.Provider>;
}

export function useTripState(): TripStateValue {
  const value = useContext(TripStateContext);
  if (!value) throw new Error("useTripState must be used inside <TripStateProvider>.");
  return value;
}
