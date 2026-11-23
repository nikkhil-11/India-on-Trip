"use client";

import Icon from "@/components/ui/Icon";
import { track } from "@/lib/track";
import { batchLabel, findBatch, occupancyLabel, priceLabel } from "@/lib/trip";
import { whatsappEnabled, whatsappHrefOrFallback } from "@/lib/whatsapp";
import type { OccupancyId, Trip } from "@/types/trip";

/**
 * Fixed bottom bar shown below 1100px, where the sticky BookingPanel sidebar
 * is hidden. Mirrors the panel's price, batch and occupancy.
 */
export default function StickyBookingBar({
  trip,
  batchId,
  occupancy,
  onEnquire,
}: {
  trip: Trip;
  batchId: string | null;
  occupancy: OccupancyId;
  onEnquire: () => void;
}) {
  const batch = findBatch(trip, batchId);
  const price = priceLabel(trip, batchId, occupancy);

  const waHref = whatsappHrefOrFallback(
    {
      packageName: trip.enquiryConfig.packageName,
      destination: trip.destination,
      batch: batch ? batchLabel(batch) : undefined,
    },
    "#trip-enquiry",
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white shadow-bar b1100:hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="min-w-0">
          <p className="font-display text-[17px] font-extrabold leading-none text-deep">
            From {price} <span className="text-[13px] font-semibold text-muted">/person</span>
          </p>
          <p className="mt-1.5 truncate text-[12.5px] text-muted">
            {batch ? batchLabel(batch) : "No departure selected"} · {occupancyLabel(trip, occupancy)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={waHref}
            onClick={() =>
              track("whatsapp_click", {
                source_page: trip.enquiryConfig.sourcePage,
                variant: "mobile_bar",
                package_name: trip.enquiryConfig.packageName,
              })
            }
            {...(waHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={whatsappEnabled ? "Chat with us on WhatsApp" : "WhatsApp not configured — go to the enquiry form"}
            className="grid h-12 w-12 place-items-center rounded-btn border border-primary text-primary transition-colors hover:bg-tint"
          >
            <Icon name="chat" size={21} strokeWidth={2} />
          </a>

          <button
            type="button"
            onClick={() => {
              track("enquiry_cta_click", {
                cta: "mobile_bar",
                source_page: trip.enquiryConfig.sourcePage,
                package_name: trip.enquiryConfig.packageName,
              });
              onEnquire();
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-yellow px-5 font-sans text-[15px] font-bold text-deep transition-colors hover:bg-[#F0C800]"
          >
            <Icon name="send" size={18} strokeWidth={2} />
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}
