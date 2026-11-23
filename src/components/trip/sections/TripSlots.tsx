"use client";

import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import BookingPanel from "../BookingPanel";
import EnquiryModal from "../EnquiryModal";
import StickyBookingBar from "@/components/layout/StickyBookingBar";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { useTripState } from "../TripState";
import { batchLabel, occupancyLabel, openBatches } from "@/lib/trip";
import { track } from "@/lib/track";
import { whatsappEnabled, whatsappHrefOrFallback } from "@/lib/whatsapp";

/** Field id of the inline form's Name input, focused by the final CTA. */
const INLINE_FORM_UID = "trip-inline";

function useFormProps() {
  const { trip, batchId, occupancy } = useTripState();
  const batch = trip.batches.find((item) => item.id === batchId);

  return {
    destination: trip.destination,
    packageName: trip.enquiryConfig.packageName,
    sourcePage: trip.enquiryConfig.sourcePage,
    selectedBatch: batch ? batchLabel(batch) : "",
    selectedOccupancy: occupancyLabel(trip, occupancy) as
      | "Quad Sharing"
      | "Triple Sharing"
      | "Double Sharing"
      | "",
    batchOptions: openBatches(trip).map(batchLabel),
  };
}

/** Sticky sidebar panel — hidden below 1100px. */
export function SidebarBookingPanel() {
  const state = useTripState();

  return (
    <div className="sticky top-24 max-b1100:hidden">
      <BookingPanel
        trip={state.trip}
        batchId={state.batchId}
        occupancy={state.occupancy}
        onBatchChange={state.selectBatch}
        onOccupancyChange={state.selectOccupancy}
        onEnquire={state.openModal}
        uid="sidebar"
      />
    </div>
  );
}

/** The same panel, rendered inline under the quick facts below 1100px. */
export function InlineBookingPanel() {
  const state = useTripState();

  return (
    <div className="mt-8 b1100:hidden">
      <BookingPanel
        trip={state.trip}
        batchId={state.batchId}
        occupancy={state.occupancy}
        onBatchChange={state.selectBatch}
        onOccupancyChange={state.selectOccupancy}
        onEnquire={state.openModal}
        uid="inline"
      />
    </div>
  );
}

export function TripStickyBar() {
  const state = useTripState();

  return (
    <StickyBookingBar
      trip={state.trip}
      batchId={state.batchId}
      occupancy={state.occupancy}
      onEnquire={state.openModal}
    />
  );
}

export function TripEnquiryModal() {
  const { modalOpen, closeModal } = useTripState();
  const formProps = useFormProps();

  return (
    <EnquiryModal
      open={modalOpen}
      onClose={closeModal}
      formProps={{ ...formProps, uid: "trip-modal" }}
    />
  );
}

/** Deep Blue closing banner. */
export function FinalCta() {
  const { trip } = useTripState();

  const waHref = whatsappHrefOrFallback(
    { packageName: trip.enquiryConfig.packageName, destination: trip.destination },
    "#trip-enquiry",
  );

  function goToForm() {
    track("enquiry_cta_click", {
      cta: "final_banner",
      source_page: trip.enquiryConfig.sourcePage,
      package_name: trip.enquiryConfig.packageName,
    });

    document.getElementById("trip-enquiry")?.scrollIntoView({ block: "start" });
    // preventScroll keeps the section heading in view rather than jumping the
    // input to the top of the viewport.
    document.getElementById(`${INLINE_FORM_UID}-fullName`)?.focus({ preventScroll: true });
  }

  return (
    <section className="mt-14 rounded-panel bg-deep p-9 max-b640:p-6">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[30px] font-extrabold leading-[1.15] !text-white max-b640:text-[24px]">
            {trip.cta.heading}
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-white/80">{trip.cta.text}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={goToForm}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-btn bg-yellow px-7 font-sans text-[16px] font-bold text-deep transition-colors hover:bg-[#F0C800]"
          >
            <Icon name="send" size={19} strokeWidth={2} />
            Send Enquiry
          </button>

          <a
            href={waHref}
            onClick={() =>
              track("whatsapp_click", {
                source_page: trip.enquiryConfig.sourcePage,
                variant: "final_banner",
                package_name: trip.enquiryConfig.packageName,
              })
            }
            {...(waHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={clsx(
              "inline-flex h-14 items-center justify-center gap-2 rounded-btn border border-white/55 px-7 font-sans text-[16px] font-bold text-white transition-colors hover:bg-white/12",
            )}
            aria-label={whatsappEnabled ? "WhatsApp Us" : "WhatsApp not configured — go to the enquiry form"}
          >
            <Icon name="chat" size={19} strokeWidth={2} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/** Inline enquiry form at the foot of the page. */
export function TripEnquiry() {
  const formProps = useFormProps();

  return (
    <section id="trip-enquiry" className="spy-section mt-14 max-w-[920px]">
      <EnquiryForm {...formProps} variant="inline" uid={INLINE_FORM_UID} />
    </section>
  );
}
