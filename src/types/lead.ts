export type EnquiryChannel = "web_form" | "whatsapp";

export type Lead = {
  /** Generated server-side. Null until the API route has created it. */
  lead_id: string | null;
  customer_name: string;
  mobile_number: string;
  country_code: string;
  destination: string;
  package_name: string;
  departure_batch: string;
  occupancy: string;
  traveller_count: string;
  additional_requirements: string;
  source_page: string;
  enquiry_channel: EnquiryChannel;
  /** ISO timestamp, added server-side. */
  created_at: string;
};

/** Per-channel outcome, surfaced for debugging. `skipped` = not configured. */
export type DeliveryStatus = "sent" | "skipped" | "failed";

export type LeadResponse =
  | {
      ok: true;
      lead_id: string;
      /** At least one channel is `sent`; the others may have been skipped. */
      delivery?: { whatsapp: DeliveryStatus; webhook: DeliveryStatus };
    }
  /** No delivery channel configured — nothing was sent anywhere. */
  | { ok: false; demo: true; lead: Lead }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
