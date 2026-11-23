"use client";

import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import BatchRow from "../BatchRow";
import { useTripState } from "../TripState";
import { batchesByMonth, priceLabel } from "@/lib/trip";

export default function BatchesSection() {
  const { trip, batchId, occupancy, month, selectBatch, selectOccupancy, selectMonth } = useTripState();

  const grouped = batchesByMonth(trip);
  const monthBatches = grouped[month] ?? [];

  return (
    <section id="batches" className="spy-section mt-14">
      <h2 className="t-h2">Batches &amp; Pricing</h2>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#FFF8D6] px-3.5 py-2 text-[13px] font-bold text-[#5C4600]">
        <Icon name="info" size={16} strokeWidth={2} />
        Sample batches — replace with confirmed departures
      </p>

      {/* Month filter */}
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {trip.batchMonths.map((option) => {
          const count = grouped[option]?.length ?? 0;
          const active = option === month;
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => selectMonth(option)}
                aria-pressed={active}
                className={clsx(
                  "inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-[14px] font-bold transition-colors",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-field bg-white text-body hover:border-primary hover:text-primary",
                )}
              >
                {option}
                <span className={active ? "text-white/75" : "text-muted"}>({count})</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid grid-cols-2 gap-4 max-b760:grid-cols-1">
        {monthBatches.map((batch) => (
          <BatchRow
            key={batch.id}
            batch={batch}
            price={priceLabel(trip, batch.id, occupancy)}
            selected={batch.id === batchId}
            onSelect={() => selectBatch(batch.id)}
          />
        ))}
      </ul>

      {/* Occupancy pricing */}
      <div className="mt-10 overflow-x-auto rounded-panel border border-line">
        <table className="w-full min-w-[460px] border-collapse text-left">
          <caption className="bg-white px-5 pt-5 text-left font-display text-[16px] font-extrabold text-deep">
            Occupancy pricing · per person
          </caption>
          <thead>
            <tr className="bg-light">
              <th scope="col" className="px-5 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-muted">
                Occupancy
              </th>
              <th scope="col" className="px-5 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-muted">
                Per person
              </th>
              <th scope="col" className="px-5 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-muted">
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {trip.pricing.occupancy.map((row) => {
              const selected = row.id === occupancy;
              const inputId = `${trip.slug}-occ-${row.id}`;
              return (
                <tr key={row.id} className={clsx("border-t border-line", selected && "bg-tint/60")}>
                  <th scope="row" className="px-5 py-4 text-[14.5px] font-bold text-deep">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-[14.5px] font-bold text-deep">
                    {priceLabel(trip, batchId, row.id)}
                  </td>
                  <td className="px-5 py-4">
                    <label
                      htmlFor={inputId}
                      className={clsx(
                        "inline-flex h-11 cursor-pointer items-center gap-2 rounded-btn border px-3.5 text-[13.5px] font-bold transition-colors",
                        selected
                          ? "border-primary bg-primary text-white"
                          : "border-field bg-white text-primary hover:bg-tint",
                      )}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={`${trip.slug}-occupancy-table`}
                        checked={selected}
                        onChange={() => selectOccupancy(row.id)}
                        className="sr-only"
                      />
                      {selected ? <Icon name="check" size={15} strokeWidth={2.4} /> : null}
                      {selected ? "Selected" : "Select"}
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-line bg-light">
              <th scope="row" className="px-5 py-3.5 text-[13.5px] font-bold text-deep">
                GST
              </th>
              <td colSpan={2} className="px-5 py-3.5 text-[13.5px] font-semibold text-body">
                {trip.pricing.gst}
              </td>
            </tr>
            <tr className="border-t border-line bg-light">
              <th scope="row" className="px-5 py-3.5 text-[13.5px] font-bold text-deep">
                Booking amount
              </th>
              <td colSpan={2} className="px-5 py-3.5 text-[13.5px] font-semibold text-body">
                {trip.pricing.booking}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-3 text-[12.5px] text-muted">
        Selecting a departure or occupancy here updates the enquiry form — no payment is taken on this site.
      </p>
    </section>
  );
}
