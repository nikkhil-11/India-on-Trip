/**
 * Lightweight analytics bridge.
 *
 * Events are pushed to `window.dataLayer` (for GTM) and also dispatched as an
 * `iot:lead-event` CustomEvent so any other listener can pick them up without
 * us committing to a specific analytics vendor.
 */
export type TrackEvent =
  | "enquiry_cta_click"
  | "enquiry_submit_attempt"
  | "enquiry_submit_success"
  | "enquiry_submit_error"
  | "whatsapp_click";

export type TrackDetail = {
  source_page?: string;
  variant?: string;
  package_name?: string;
  /** Which CTA opened the enquiry flow. */
  cta?: "booking_panel" | "mobile_bar" | "final_banner";
  lead_id?: string | null;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, detail: TrackDetail = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...detail };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  window.dispatchEvent(new CustomEvent("iot:lead-event", { detail: payload }));
}
