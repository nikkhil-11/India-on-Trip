import { z } from "zod";

/**
 * One schema, used by react-hook-form on the client and again inside
 * /api/leads on the server. Never trust the client copy alone.
 */

export const countryCodes = [
  { value: "+91", label: "IN +91" },
  { value: "+971", label: "AE +971" },
  { value: "+1", label: "US +1" },
  { value: "+44", label: "UK +44" },
  { value: "+65", label: "SG +65" },
  { value: "+61", label: "AU +61" },
  { value: "+977", label: "NP +977" },
] as const;

export const travellerCounts = ["1", "2", "3", "4", "5", "6–10", "11–20", "20+"] as const;

export const occupancyOptions = ["Quad Sharing", "Triple Sharing", "Double Sharing"] as const;

/** Grouped <optgroup> options for the "Interested Trip / Package" select. */
export const packageOptionGroups: { label: string; options: string[] }[] = [
  {
    label: "Spiti Valley",
    options: [
      "Winter Spiti Valley Group Trip",
      "4x4 Winter Self-Drive Expedition",
      "Winter Private Customized Trip",
      "Summer Spiti Valley Group Trip",
      "4x4 Summer Self-Drive Expedition",
      "Summer Private Customized Trip",
    ],
  },
  {
    label: "Himachal",
    options: ["Shimla – Manali", "Grand Himachal", "Himachal Private Customized Trip"],
  },
  {
    label: "Weekend Group Trips (2N/3D)",
    options: [
      "Manali – Sissu – Kasol (2N / 3D)",
      "McLeodganj – Triund (2N / 3D)",
      "Jibhi – Jalori Tirthan (2N / 3D)",
      "Kasol – Kheerganga (2N / 3D)",
      "Chopta – Tungnath (2N / 3D)",
      "Solan – Churdhar (2N / 3D)",
    ],
  },
  {
    label: "Weekend Group Trips (3N/4D)",
    options: [
      "Shimla – Kalpa – Chitkul (3N / 4D)",
      "Manali – Solang – Kasol (3N / 4D)",
      "Jibhi – Tirthan – Kasol (3N / 4D)",
      "McLeodganj – Triund – Bir (3N / 4D)",
    ],
  },
  {
    label: "Domestic Trips",
    options: ["Ladakh Tour", "Kerala Tour", "Rajasthan Tour", "Kashmir Tour"],
  },
  {
    label: "Other",
    options: ["Customized Trip — help me choose"],
  },
];

export const CUSTOM_TRIP_OPTION = "Customized Trip — help me choose";

/** Flat list of every selectable package, used to validate an incoming value. */
export const allPackageOptions = packageOptionGroups.flatMap((group) => group.options);

const countryCodeValues = countryCodes.map((item) => item.value) as [string, ...string[]];

export const enquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters).")
      .max(80, "Please use 80 characters or fewer."),

    countryCode: z.enum(countryCodeValues, { message: "Select a country code." }),

    /**
     * Field-level length check so the error still shows when another field is
     * also invalid — zod skips `superRefine` unless the whole object parses.
     * The country-specific rule below then narrows it further.
     */
    mobile: z
      .string()
      .trim()
      .min(1, "Please enter your mobile number.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 6 && digits.length <= 14;
      }, "Enter a mobile number between 6 and 14 digits."),

    packageName: z.string().trim().min(1, "Please choose the trip you are interested in."),

    departureBatch: z.string().trim().max(120).optional().default(""),

    travellerCount: z.string().trim().max(20).optional().default(""),

    occupancy: z.string().trim().max(40).optional().default(""),

    requirements: z.string().trim().max(1200, "Please use 1200 characters or fewer.").optional().default(""),

    consent: z.literal(true, {
      message: "Please agree to be contacted so we can reply to your enquiry.",
    }),

    destination: z.string().trim().max(80).optional().default(""),

    sourcePage: z.string().trim().max(200).optional().default(""),

    /** Honeypot — real people leave this untouched. */
    company: z.string().max(0).optional().default(""),
  })
  .superRefine((value, ctx) => {
    const digits = value.mobile.replace(/\D/g, "");

    if (value.countryCode === "+91") {
      if (!/^[6-9]\d{9}$/.test(digits)) {
        ctx.addIssue({
          code: "custom",
          path: ["mobile"],
          message: "Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.",
        });
      }
      return;
    }

    if (digits.length < 6 || digits.length > 14) {
      ctx.addIssue({
        code: "custom",
        path: ["mobile"],
        message: "Enter a mobile number between 6 and 14 digits.",
      });
    }
  });

export type EnquiryValues = z.input<typeof enquirySchema>;
export type EnquiryParsed = z.output<typeof enquirySchema>;

export const enquiryDefaults: EnquiryValues = {
  fullName: "",
  countryCode: "+91",
  mobile: "",
  packageName: "",
  departureBatch: "",
  travellerCount: "",
  occupancy: "",
  requirements: "",
  consent: false as unknown as true,
  destination: "",
  sourcePage: "",
  company: "",
};
