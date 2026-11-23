"use client";

import { useSearchParams } from "next/navigation";
import EnquiryForm from "./EnquiryForm";
import { allPackageOptions } from "./enquirySchema";

/**
 * Reads `?package=` so a card that has no trip page of its own still lands the
 * visitor on a prefilled enquiry. Only values that exist in the select are
 * accepted, so the query string cannot inject arbitrary text.
 */
export default function ContactEnquiry() {
  const params = useSearchParams();
  const requested = params.get("package") ?? "";
  const packageName = allPackageOptions.includes(requested) ? requested : "";

  return (
    <EnquiryForm
      variant="page"
      packageName={packageName}
      sourcePage="/contact"
      uid="contact-page"
      submitLabel="Send My Trip Enquiry"
    />
  );
}
