"use client";

import { useEffect, useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Icon, { type IconName } from "@/components/ui/Icon";
import {
  countryCodes,
  enquiryDefaults,
  enquirySchema,
  occupancyOptions,
  packageOptionGroups,
  travellerCounts,
  type EnquiryValues,
} from "./enquirySchema";
import type { Lead, LeadResponse } from "@/types/lead";
import { shortDestination } from "@/lib/format";
import { track } from "@/lib/track";
import {
  buildWhatsAppMessage,
  WHATSAPP_NUMBER,
  whatsappEnabled as envWhatsappEnabled,
} from "@/lib/whatsapp";

export type EnquiryFormVariant = "sidebar" | "inline" | "page" | "modal";

export type EnquiryFormProps = {
  variant?: EnquiryFormVariant;
  destination?: string;
  packageName?: string;
  selectedBatch?: string;
  selectedOccupancy?: "Quad Sharing" | "Triple Sharing" | "Double Sharing" | "";
  travellerCount?: string;
  sourcePage?: string;
  submitLabel?: string;
  whatsappEnabled?: boolean;
  batchOptions?: string[];
  heading?: string;
  uid?: string;
};

type Status = "idle" | "loading" | "success" | "error" | "demo";

/** Destinations where the Himalayan wording is accurate. */
const HIMALAYAN = ["spiti", "himachal", "ladakh", "kashmir", "uttarakhand"];

const variantStyles: Record<
  EnquiryFormVariant,
  { pad: string; heading: string; topBorder: string; shadow: string }
> = {
  sidebar: {
    pad: "p-[22px]",
    heading: "text-[22px]",
    topBorder: "border-t-4 border-t-yellow",
    shadow: "shadow-card",
  },
  inline: {
    pad: "p-9 max-b640:p-6",
    heading: "text-[30px] max-b640:text-[24px]",
    topBorder: "border-t-[5px] border-t-yellow",
    shadow: "shadow-card",
  },
  page: {
    pad: "p-10 max-b640:p-6",
    heading: "text-[32px] max-b640:text-[26px]",
    topBorder: "border-t-[5px] border-t-yellow",
    shadow: "shadow-hover",
  },
  modal: {
    pad: "p-8 max-b640:p-5",
    heading: "text-[26px] max-b640:text-[22px]",
    topBorder: "",
    shadow: "shadow-card",
  },
};

const INPUT_CLASS =
  "h-[50px] w-full rounded-btn border-[1.5px] border-field bg-white px-3.5 text-[15px] text-body outline-none transition-[border-color,box-shadow] focus:border-primary focus:shadow-ring aria-invalid:border-danger";

export default function EnquiryForm({
  variant = "inline",
  destination,
  packageName,
  selectedBatch,
  selectedOccupancy,
  travellerCount,
  sourcePage,
  submitLabel = "Send My Trip Enquiry",
  whatsappEnabled = envWhatsappEnabled,
  batchOptions,
  heading,
  uid,
}: EnquiryFormProps) {
  const reactId = useId();
  const scope = (uid ?? reactId).replace(/[^a-zA-Z0-9_-]/g, "");
  const fieldId = (name: string) => `${scope}-${name}`;
  const errorId = (name: string) => `${scope}-${name}-error`;

  const styles = variantStyles[variant];
  const [status, setStatus] = useState<Status>("idle");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [demoLead, setDemoLead] = useState<Lead | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  /**
   * The outcome panel sits above the fields, so bring it into view — otherwise
   * someone submitting from the bottom of a long form sees nothing happen.
   * Looked up by id rather than held in a ref, so the submit handler never
   * closes over a ref React could read during render.
   */
  function revealStatus() {
    requestAnimationFrame(() =>
      document.getElementById(`${scope}-status`)?.scrollIntoView({ block: "nearest" }),
    );
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, submitCount },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      ...enquiryDefaults,
      packageName: packageName ?? "",
      departureBatch: selectedBatch ?? "",
      occupancy: selectedOccupancy ?? "",
      travellerCount: travellerCount ?? "",
      destination: destination ?? "",
      sourcePage: sourcePage ?? "",
    },
    mode: "onTouched",
  });

  // Keep the form in step with the trip page's shared batch / occupancy state.
  useEffect(() => {
    if (packageName !== undefined) setValue("packageName", packageName);
  }, [packageName, setValue]);

  useEffect(() => {
    if (selectedBatch !== undefined) setValue("departureBatch", selectedBatch);
  }, [selectedBatch, setValue]);

  useEffect(() => {
    if (selectedOccupancy !== undefined)
      setValue("occupancy", selectedOccupancy);
  }, [selectedOccupancy, setValue]);

  useEffect(() => {
    if (travellerCount !== undefined)
      setValue("travellerCount", travellerCount);
  }, [travellerCount, setValue]);

  const errorCount = Object.keys(errors).length;
  const loading = status === "loading";

  const computedHeading =
    heading ??
    (destination
      ? `Let's Plan Your ${shortDestination(destination)} Adventure!`
      : "Plan Your Next Trip");

  const isHimalayan = destination
    ? HIMALAYAN.some((key) => destination.toLowerCase().includes(key))
    : false;
  const subtext = destination
    ? `Share a few details about your trip. Our travel expert will help you plan the perfect ${
        isHimalayan ? "Himalayan experience" : "trip"
      }.`
    : "Tell us your travel plan and our team will get in touch with the best options.";

  // Watched for the WhatsApp hand-off message and the success confirmation.
  const [
    waName,
    waPackage,
    waBatch,
    waTravellers,
    mobileValue,
    countryCodeValue,
  ] = useWatch({
    control,
    name: [
      "fullName",
      "packageName",
      "departureBatch",
      "travellerCount",
      "mobile",
      "countryCode",
    ],
  });

  const waHref =
    whatsappEnabled && WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          buildWhatsAppMessage({
            name: waName,
            packageName: waPackage,
            destination,
            batch: waBatch,
            travellers: waTravellers,
          }),
        )}`
      : undefined;

  async function onSubmit(values: EnquiryValues) {
    setStatus("loading");
    setServerError(null);
    track("enquiry_submit_attempt", {
      source_page: sourcePage,
      variant,
      package_name: values.packageName,
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          destination: destination ?? "",
          sourcePage: sourcePage ?? "",
        }),
      });

      const payload = (await response.json()) as LeadResponse;

      if ("ok" in payload && payload.ok) {
        setLeadId(payload.lead_id);
        setStatus("success");
        revealStatus();
        track("enquiry_submit_success", {
          source_page: sourcePage,
          variant,
          package_name: values.packageName,
          lead_id: payload.lead_id,
        });
        return;
      }

      if ("demo" in payload && payload.demo) {
        setDemoLead(payload.lead);
        setStatus("demo");
        revealStatus();
        return;
      }

      setServerError("error" in payload ? payload.error : null);
      setStatus("error");
      revealStatus();
      track("enquiry_submit_error", {
        source_page: sourcePage,
        variant,
        package_name: values.packageName,
      });
    } catch {
      setStatus("error");
      revealStatus();
      track("enquiry_submit_error", {
        source_page: sourcePage,
        variant,
        package_name: values.packageName,
      });
    }
  }

  return (
    <section
      className={clsx(
        "rounded-panel border border-line bg-white",
        styles.pad,
        styles.topBorder,
        styles.shadow,
      )}
      aria-labelledby={fieldId("heading")}
    >
      <h2
        id={fieldId("heading")}
        className={clsx(
          "font-display font-extrabold leading-[1.15] text-deep",
          styles.heading,
        )}
      >
        {computedHeading}
      </h2>
      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-muted">{subtext}</p>

      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-2 text-[13px] font-semibold text-primary">
        <Icon name="headset" size={17} strokeWidth={2} />
        Personalized trip assistance from our travel team.
      </p>

      <div id={`${scope}-status`}>
        {status === "success" ? (
          <SuccessPanel
            leadId={leadId}
            phone={`${countryCodeValue} ${mobileValue}`}
            packageName={waPackage}
          />
        ) : null}

        {status === "demo" && demoLead ? <DemoPanel lead={demoLead} /> : null}

        {status === "error" ? (
          <div
            role="alert"
            className="mt-5 rounded-btn border border-danger/35 bg-[#FDF3F2] p-4"
          >
            <p className="flex items-start gap-2 text-[14px] font-semibold text-danger">
              <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
              <span>
                We couldn&apos;t send your enquiry. Please check your connection
                and try again — your details are still here. You can also
                continue on WhatsApp.
                {serverError ? (
                  <span className="mt-1 block font-normal">
                    ({serverError})
                  </span>
                ) : null}
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {submitCount > 0 && errorCount > 0 ? (
        <div
          role="alert"
          className="mt-5 rounded-btn border border-danger/35 bg-[#FDF3F2] p-4"
        >
          <p className="flex items-center gap-2 text-[14px] font-bold text-danger">
            <Icon name="alert" size={18} className="shrink-0" />
            Please fix {errorCount} highlighted{" "}
            {errorCount === 1 ? "field" : "fields"}
          </p>
        </div>
      ) : null}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        aria-busy={loading}
        className="mt-6"
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          }}
        >
          {/* Honeypot — visually and programmatically hidden from real users. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={fieldId("company")}>Company</label>
            <input
              id={fieldId("company")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>

          <Field
            label="Full Name"
            icon="user"
            htmlFor={fieldId("fullName")}
            required
            error={errors.fullName?.message}
            errorId={errorId("fullName")}
          >
            <input
              id={fieldId("fullName")}
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className={INPUT_CLASS}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={
                errors.fullName ? errorId("fullName") : undefined
              }
              {...register("fullName")}
            />
          </Field>

          <Field
            label="Mobile Number"
            icon="phone"
            htmlFor={fieldId("mobile")}
            required
            error={errors.mobile?.message ?? errors.countryCode?.message}
            errorId={errorId("mobile")}
          >
            <div className="flex gap-2">
              <SelectShell className="w-[112px] shrink-0">
                <select
                  id={fieldId("countryCode")}
                  aria-label="Country code"
                  className={clsx(INPUT_CLASS, "pr-9")}
                  {...register("countryCode")}
                >
                  {countryCodes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </SelectShell>
              <input
                id={fieldId("mobile")}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="Mobile number"
                className={INPUT_CLASS}
                aria-invalid={errors.mobile ? true : undefined}
                aria-describedby={errors.mobile ? errorId("mobile") : undefined}
                {...register("mobile")}
              />
            </div>
          </Field>

          <Field
            label="Interested Trip / Package"
            icon="compass"
            htmlFor={fieldId("packageName")}
            required
            error={errors.packageName?.message}
            errorId={errorId("packageName")}
          >
            <SelectShell>
              <select
                id={fieldId("packageName")}
                className={clsx(INPUT_CLASS, "pr-9")}
                aria-invalid={errors.packageName ? true : undefined}
                aria-describedby={
                  errors.packageName ? errorId("packageName") : undefined
                }
                {...register("packageName")}
              >
                <option value="">Select a trip</option>
                {packageOptionGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </SelectShell>
          </Field>

          <Field
            label="Departure Batch"
            icon="calendar"
            htmlFor={fieldId("departureBatch")}
            optional
          >
            {batchOptions && batchOptions.length > 0 ? (
              <SelectShell>
                <select
                  id={fieldId("departureBatch")}
                  className={clsx(INPUT_CLASS, "pr-9")}
                  {...register("departureBatch")}
                >
                  <option value="">Not decided yet</option>
                  {batchOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </SelectShell>
            ) : (
              <input
                id={fieldId("departureBatch")}
                type="text"
                placeholder="Preferred travel dates"
                className={INPUT_CLASS}
                {...register("departureBatch")}
              />
            )}
          </Field>

          <Field
            label="Number of Travellers"
            icon="users"
            htmlFor={fieldId("travellerCount")}
            optional
          >
            <SelectShell>
              <select
                id={fieldId("travellerCount")}
                className={clsx(INPUT_CLASS, "pr-9")}
                {...register("travellerCount")}
              >
                <option value="">Select</option>
                {travellerCounts.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <Field
            label="Accommodation Preference"
            icon="bed"
            htmlFor={fieldId("occupancy")}
            optional
          >
            <SelectShell>
              <select
                id={fieldId("occupancy")}
                className={clsx(INPUT_CLASS, "pr-9")}
                {...register("occupancy")}
              >
                <option value="">No preference</option>
                {occupancyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <div className="col-span-full">
            <Field
              label="Additional Requirements"
              icon="chat"
              htmlFor={fieldId("requirements")}
              optional
              error={errors.requirements?.message}
              errorId={errorId("requirements")}
            >
              <textarea
                id={fieldId("requirements")}
                rows={3}
                placeholder="Anything we should know — group type, pace, food preferences, add-ons."
                className={clsx(
                  INPUT_CLASS,
                  "h-auto min-h-[104px] resize-y py-3 leading-[1.6]",
                )}
                aria-invalid={errors.requirements ? true : undefined}
                aria-describedby={
                  errors.requirements ? errorId("requirements") : undefined
                }
                {...register("requirements")}
              />
            </Field>
          </div>

          <div className="col-span-full">
            <label
              htmlFor={fieldId("consent")}
              className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-[13.5px] leading-[1.6] text-body"
            >
              <input
                id={fieldId("consent")}
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={
                  errors.consent ? errorId("consent") : undefined
                }
                {...register("consent")}
              />
              <span>
                I agree to be contacted by IndiaOnTrip about this enquiry and
                accept the Privacy Policy.
                <span className="ml-1 text-danger" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </span>
            </label>
            {errors.consent?.message ? (
              <FieldError
                id={errorId("consent")}
                message={errors.consent.message}
              />
            ) : null}
          </div>

          <div className="col-span-full mt-1 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-btn bg-yellow font-sans text-[16px] font-bold text-deep transition-colors hover:bg-[#F0C800] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Icon
                    name="loader"
                    size={19}
                    strokeWidth={2}
                    className="animate-spin"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Icon name="send" size={19} strokeWidth={2} />
                  {submitLabel}
                </>
              )}
            </button>

            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("whatsapp_click", {
                    source_page: sourcePage,
                    variant,
                    package_name: waPackage,
                  })
                }
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-btn border border-primary bg-white font-sans text-[16px] font-bold text-primary transition-colors hover:bg-tint"
              >
                <Icon name="chat" size={19} strokeWidth={2} />
                Continue on WhatsApp
              </a>
            ) : (
              <div>
                <button
                  type="button"
                  disabled
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-btn border border-field bg-white font-sans text-[16px] font-bold text-muted opacity-60"
                >
                  <Icon name="chat" size={19} strokeWidth={2} />
                  Continue on WhatsApp
                </button>
                <p className="mt-2 text-center text-[12.5px] text-muted">
                  WhatsApp number not configured yet
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[12.5px] leading-[1.6] text-muted">
          <Icon
            name="lock"
            size={15}
            className="mt-0.5 shrink-0 text-primary"
          />
          No ID, address or payment details needed. We only use your details to
          respond to this enquiry.
        </p>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  label,
  icon,
  htmlFor,
  required = false,
  optional = false,
  error,
  errorId,
  children,
}: {
  label: string;
  icon: IconName;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-deep"
      >
        <Icon name={icon} size={15} strokeWidth={2} className="text-primary" />
        {label}
        {required ? (
          <>
            <span className="text-danger" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        ) : null}
        {optional ? (
          <span className="font-medium text-muted">(optional)</span>
        ) : null}
      </label>
      {children}
      {error && errorId ? <FieldError id={errorId} message={error} /> : null}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-[12.5px] font-semibold text-danger"
    >
      <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

/** Adds the chevron back to selects, which have appearance:none globally. */
function SelectShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("relative", className)}>
      {children}
      <Icon
        name="down"
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary"
      />
    </div>
  );
}

function SuccessPanel({
  leadId,
  phone,
  packageName,
}: {
  leadId: string | null;
  phone: string;
  packageName?: string;
}) {
  return (
    <div
      role="status"
      className="mt-5 rounded-btn border border-success/35 bg-[#EEF8F2] p-4"
    >
      <p className="flex items-start gap-2 text-[15px] font-bold text-success">
        <Icon name="checkcircle" size={19} className="mt-0.5 shrink-0" />
        Thank you! Your trip enquiry has been received.
      </p>
      <p className="mt-2 pl-7 text-[14px] leading-[1.6] text-body">
        Our travel team will contact you on {phone}
        {packageName ? ` with options for ${packageName}` : ""}.
      </p>
      {leadId ? (
        <p className="mt-2 pl-7 text-[12px] text-muted">Reference: {leadId}</p>
      ) : null}
    </div>
  );
}

function DemoPanel({ lead }: { lead: Lead }) {
  return (
    <div className="mt-5 rounded-btn border-2 border-dashed border-[#E0C64B] bg-[#FFF8D6] p-4">
      <p className="inline-flex items-center gap-2 rounded-full bg-[#5C4600] px-2.5 py-1 text-[11.5px] font-extrabold tracking-[0.06em] text-[#FFF8D6]">
        <Icon name="alert" size={14} strokeWidth={2} />
        DEMO MODE — NOT SENT
      </p>
      <p className="mt-3 text-[14px] leading-[1.65] text-[#5C4600]">
        No enquiry endpoint is configured yet, so nothing was delivered to
        anyone. Set{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-[13px]">
          LEADS_WEBHOOK_URL
        </code>{" "}
        in the environment to start forwarding real enquiries. Your details
        below have been kept in the form.
      </p>
      <details className="mt-3">
        <summary className="cursor-pointer text-[13px] font-bold text-[#5C4600]">
          View the payload that would have been sent
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded-btn bg-white/80 p-3 text-[12px] leading-[1.6] text-deep">
          {JSON.stringify(lead, null, 2)}
        </pre>
      </details>
    </div>
  );
}
