# IndiaOnTrip

Marketing site for IndiaOnTrip — Spiti Valley, Himachal, weekend group trips and
domestic journeys. Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

Every visitor action leads to an enquiry or WhatsApp. **No booking or payment is
taken anywhere on this site**, by design.

---

## Run it

```bash
npm install
cp .env.example .env.local     # optional — the site runs fine with nothing set
npm run dev                    # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (static export of every page except `/api/leads`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, including the React Compiler rules |
| `npm run test:lead` | POSTs one clearly-marked test enquiry to a running server and prints what each delivery channel did |

> If a rebuild ever serves stale HTML or a 500 on the CSS chunk, delete `.next`
> and build again — Turbopack's persistent cache can hold on to a previous build.

---

## Environment variables

All of these are intentionally **blank** in `.env.example`. With nothing set the
site still works end to end — that is the point.

| Variable | Scope | Effect when empty |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | client | Every WhatsApp CTA falls back to the on-page enquiry form. The form's "Continue on WhatsApp" button is disabled with the note *"WhatsApp number not configured yet"*. Digits only, including country code, no `+` (e.g. `91XXXXXXXXXX`). |
| `NEXT_PUBLIC_PHONE` | client | Booking panel and footer show `[Phone — to be confirmed]` instead of a `tel:` link. |
| `NEXT_PUBLIC_EMAIL` | client | Footer shows `[Email — to be confirmed]`. |
| `LEADS_WEBHOOK_URL` | **server only** | Nothing is forwarded to a CRM. On its own this no longer means DEMO MODE — a WhatsApp alert counts as delivery. |
| `LEAD_WHATSAPP_TO` | **server only** | Falls back to `NEXT_PUBLIC_WHATSAPP_NUMBER`. With neither set, no WhatsApp alert is attempted. Digits only, country code, no `+`. |
| `WHATSAPP_PROVIDER` + its credentials | **server only** | No WhatsApp alert is sent. See [WhatsApp lead alerts](#whatsapp-lead-alerts). |

With **no** delivery channel configured, `/api/leads` replies
`{ ok: false, demo: true }` and the form shows a dashed **DEMO MODE — NOT SENT**
panel with the exact JSON payload. Nothing is delivered and nothing pretends
otherwise.

Never add the `NEXT_PUBLIC_` prefix to `LEADS_WEBHOOK_URL` or to any WhatsApp
credential — it would ship the secret to the browser.

---

## How enquiries flow

1. `EnquiryForm` validates on the client with `components/forms/enquirySchema.ts`.
2. It POSTs to `/api/leads`, which **re-validates with the same zod schema**,
   checks a honeypot field, applies a per-IP rate limit (5 per 10 minutes),
   generates `lead_id` via `crypto.randomUUID()` and stamps `created_at`.
3. `lib/notify` then runs every configured channel **in parallel and
   independently** — a WhatsApp alert to the business number, and the
   `LEADS_WEBHOOK_URL` forward.
4. The visitor sees success when **any** channel accepted the lead, a retryable
   error (HTTP 502, with the "Continue on WhatsApp" fallback) when every
   configured channel failed, and DEMO MODE when none is configured.

A channel that fails while another succeeds is logged as
`[leads] <channel> delivery failed for <lead_id>: …` — the visitor is not shown
an error, because their enquiry did get through, so the server log is the only
trace. Successful responses also carry
`delivery: { whatsapp, webhook }` with `sent` / `skipped` / `failed` per channel.

The payload shape (`types/lead.ts`) is deliberately CRM-agnostic so email
notifications or an admin dashboard can be added behind the same endpoint later.

The in-process rate limiter only covers a single instance. Swap it for Redis or
Upstash if the app is scaled horizontally.

---

## WhatsApp lead alerts

Every submitted enquiry is sent to the business WhatsApp number as a message:

```
*New IndiaOnTrip enquiry*

Name: Ankit Rastogi
Phone: +91 98765 43210
Trip: Winter Spiti Valley Group Trip
Destination: Spiti Valley
Batch: 12 Dec 2026
Travellers: 4
Occupancy: Triple Sharing
Notes: Need a pickup from Delhi
Page: /spiti-valley/winter-spiti-valley-group-trip

Reply: https://wa.me/919876543210
Received: 23 Nov 2026, 7:42 pm IST
Ref: 3f9a1c2d
```

Tapping the `Reply:` link opens a chat with the traveller, so answering a lead is
one tap from the alert. Empty fields are left out entirely.

Set the recipient once, then **one** provider. `WHATSAPP_PROVIDER` forces a
choice; left empty, the first provider with credentials present is used.

### Option 1 — CallMeBot (free, ~2 minutes, no account)

Best for getting alerts working today. **CallMeBot's free tier is for personal
use**, and it is a third party relaying your lead text — move to option 2 or 4
once the volume justifies it.

1. From the handset that should receive alerts, WhatsApp the message
   `I allow callmebot to send me messages` to **+34 644 51 95 23**.
2. The bot replies with an API key. Put it in `.env.local` as `CALLMEBOT_API_KEY`.
3. Restart the server, then run `npm run test:lead`.

If no key arrives within a couple of minutes, CallMeBot asks you to retry after
24 hours.

### Option 2 — Meta WhatsApp Cloud API (official, free, recommended)

Meta's free test number sends to up to **5 verified recipients**, which is all an
owner alert needs. No payment method, no monthly fee.

**A. Create the app and get the test number**

1. [developers.facebook.com/apps](https://developers.facebook.com/apps) → **Create App**.
2. Name and email → use case **Connect with customers through WhatsApp** → Next.
3. Pick or create a business portfolio → Next → **Create app**.
4. On Quickstart, click **Start using the API** to open **API Setup**.
5. Connect or create a Messaging (WhatsApp Business) account.
6. In **API Setup**, note two values:
   - **Phone number ID** under the test *From* number → `WHATSAPP_PHONE_NUMBER_ID`
   - the **Messaging account ID** (WABA ID), needed when creating the template.

**B. Verify the number that receives alerts**

In **API Setup**, add `+91 85449 93278` as a **To** recipient. Meta sends it a
code; enter it. Until a number is verified here, the test number cannot message
it at all.

**C. Create the template**

Free-form text only reaches a number that messaged you in the **last 24 hours**,
so alerts need a template or they will silently stop a day later.

In **WhatsApp Manager → Message templates → Create template**: category
**Utility**, language **English**, name `new_lead`. Body:

```
New IndiaOnTrip enquiry.
Name: {{1}}
Phone: {{2}}
Trip: {{3}}
Batch: {{4}}
Travellers: {{5}}
Open the website inbox to reply.
```

Then set `WHATSAPP_TEMPLATE_NAME=new_lead` and
`WHATSAPP_TEMPLATE_FIELDS=name,phone,trip,batch,travellers`.

Review is automatic and usually quick; Meta allows itself up to 24 hours. Two
habits that avoid a rejection: never start or end the body with a placeholder,
and give Meta sample values when it asks.

Available fields for `WHATSAPP_TEMPLATE_FIELDS`, in any order: `name`, `phone`,
`trip`, `destination`, `batch`, `travellers`, `occupancy`, `notes`, `page`,
`summary`, `received`, `ref`. Leave it empty and the template is assumed to take
a single `{{1}}` holding the whole summary line.

`lib/notify/leadMessage.ts` prepares values to Meta's rules: newlines and tabs
flattened, empty values sent as `N/A`, anything over 900 characters trimmed.

**D. Token**

The token on the API Setup page expires within hours — fine for a first test,
useless in production. For a permanent one: **Business Settings → Users → System
users** → add a system user (Admin) → assign it the app and the WhatsApp
Business Account → **Generate new token** with `whatsapp_business_messaging`,
`whatsapp_business_management` and `business_management`.

**Copy it immediately — Meta shows it exactly once.** Put it in
`WHATSAPP_CLOUD_TOKEN`, never anywhere with a `NEXT_PUBLIC_` prefix.

**E. Test**

```bash
npm run dev
npm run test:lead     # in a second terminal
```

### Option 3 — Twilio WhatsApp

`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and `TWILIO_WHATSAPP_FROM` (digits
only; the sandbox number is `14155238886`). Useful for testing because the
sandbox accepts free-form text after a one-line opt-in. Production sends are
subject to the same 24-hour-window rule as option 2.

### Option 4 — Your own relay

Set `WHATSAPP_WEBHOOK_URL` and the route POSTs
`{ to, text, lead }` to it — enough to drive n8n, Make, Zapier, AiSensy,
Interakt, WATI or an in-house service. Add `WHATSAPP_WEBHOOK_AUTH` (and
optionally `WHATSAPP_WEBHOOK_AUTH_HEADER`) if the endpoint needs a credential.

### Behaviour worth knowing

- Each send gets **two attempts**, retried only on a timeout, a network fault, a
  429 or a 5xx. A 4xx is a configuration problem and is not retried.
- Each attempt times out after 8 seconds, so a dead provider cannot hold the
  visitor's form hostage.
- Free-text fields are whitespace-collapsed before they go into the message, so
  a traveller cannot inject fake `Label:` lines into the alert.
- `lib/notify` is server-only — it is imported by `/api/leads` and nothing else.

---

## Adding another trip

The trip page renders entirely from one `Trip` object, and no trip component
contains trip-specific copy. To publish a new itinerary:

1. Add `src/data/trips/<slug>.ts` exporting a `Trip`.
2. Import and list it in `src/data/trips/index.ts`.
3. Add the slug to `AVAILABLE_TRIP_SLUGS` in `src/data/trip-slugs.ts`.

`generateStaticParams` then picks it up automatically, and package cards switch
from pointing at `/contact?package=…` to the real trip page. If steps 2 and 3
disagree the build fails with an explicit error rather than shipping dead links.

---

## Placeholders to replace before launch

Everything below is a **visible bracketed placeholder or a clearly labelled
sample**. Nothing here is invented business data — replace each one with
confirmed information.

### Brand and contact
- [ ] `public/logo.svg` — real logo artwork (the header currently draws an inline stand-in; see `components/layout/Logo.tsx`)
- [ ] `NEXT_PUBLIC_PHONE` — replaces `[Phone — to be confirmed]`
- [ ] `NEXT_PUBLIC_EMAIL` — replaces `[Email — to be confirmed]`
- [ ] Office address — `ADDRESS_LABEL` in `src/data/site.ts`, currently `[Office address]`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] A WhatsApp alert provider — `LEAD_WHATSAPP_TO` is set to `918544993278` in `.env.local`, but no provider credential is filled in yet, so the form is still in DEMO MODE. See [WhatsApp lead alerts](#whatsapp-lead-alerts)
- [ ] Social links — `socialLinks` in `src/data/site.ts`, all `href: "#"`
- [ ] Business credentials line — `[Other verified business credentials]` in `src/data/site.ts`
- [ ] `site.url` in `src/data/site.ts` — used by canonical URLs, Open Graph, sitemap and robots

### Photography
- [ ] All photos. Every image is a `PhotoSlot` with no `src`, rendering a brand-tinted mountain illustration captioned with its alt text. Drop files into `public/images/` and set `src` on:
  - `heroSlides[].image` (`src/data/home.ts`) — 3 hero slides
  - `spitiPackages[].image`, `himachalDestinations[].image`, `weekendTrips2N3D[].image`, `weekendTrips3N4D[].image`, `domesticDestinations[].image` (`src/data/packages.ts`)
  - `gallery[].src` (7 photos), `places[].src` (12), `days[].media[].src` in each trip data file
- [ ] Recognition logos — four dashed "Official logo" slots in `components/home/Recognitions.tsx`

### Winter Spiti trip data (`src/data/trips/winter-spiti-valley-group-trip.ts`)
- [ ] `pricing.fromPrice`, `pricing.oldPrice` and each `occupancy[].price` — all `null`, shown as `₹[Price]` / `₹[Old Price]`
- [ ] `pricing.gst` — `[GST %]`
- [ ] `pricing.booking` — `[Booking amount]`
- [ ] `pricing.offer` — `[Seasonal offer]`
- [ ] `batches` — 10 sample departures dated `[DD] Nov 2026` … `[DD] Mar 2027`, with sample statuses. The UI labels them *"Sample batches — replace with confirmed departures"*. Add real `prices` per batch if they vary by departure.
- [ ] `days[].drive`, `days[].distance`, `days[].meals` — every one is `[Confirm]` across all 9 days
- [ ] Day 0 pickup point and reporting time — `[Pickup point and reporting time — confirm.]`
- [ ] `facts` — Max Altitude `[~4,500 m — confirm]`
- [ ] `inclusions` — stay type and sharing basis, which meals, vehicle, bonfire nights, and `[Trip captain and other inclusions from the package sheet]`
- [ ] `exclusions` — all four are `[Exclusion from the package sheet]`
- [ ] `cancellationPolicy.rows` — four `[… — confirm]` periods, every refund `[Placeholder]`; point `link` at the real policy page
- [ ] `faqs` — answers marked `[Confirm…]`: permits, mobile networks, ATMs, road closures, solo female travellers, age limit, best month
- [ ] `months[].temp` and `months[].snow` — `[Temperature range]` / `[Snow level]` for Nov–Feb
- [ ] `reviews` — three `[Traveller Name]` / `[City]` samples labelled *"[Sample – Replace with Real Reviews]"*
- [ ] `itineraryPdf` — empty string, so the download button is disabled with *"PDF not uploaded yet"*

### Other content
- [ ] Homepage testimonials — `sampleReviews` in `src/data/home.ts`, all bracketed and labelled *"Sample placeholder"*, with the star row explicitly marked *"(placeholder rating — not a real score)"*
- [ ] Spiti explainer cards — `[Confirm stops per itinerary.]` and `[Add your season dates.]` in `src/data/spiti.ts`
- [ ] Package durations — `[Duration]` on the three Spiti cards whose itineraries are not written yet (`src/data/packages.ts`)
- [ ] About Us, Blogs, Careers, Payments, FAQs, Terms & Conditions and Privacy Policy pages — these links all currently route to `/contact`

---

## Verified in this build

- `npm run build` passes with no type errors; `npm run lint` is clean.
- Lighthouse (mobile, headless Chrome) on `/`, `/spiti-valley`, `/contact` and
  `/spiti-valley/winter-spiti-valley-group-trip`:
  **accessibility 100, SEO 100, best practices 100**.
- No horizontal overflow at 390px on any page.
- Keyboard-only paths checked: mobile menu (`aria-expanded`, Escape returns focus
  to the hamburger), section tabs, itinerary and FAQ accordions, gallery lightbox
  (native `<dialog>` focus trap, arrow keys, Escape) and the modal enquiry form.
- With no env vars set: the form returns the DEMO MODE panel and keeps its values,
  and every WhatsApp CTA falls back to the enquiry form.

## Notes on the stack

- Tailwind v4 reads the brand tokens from `tailwind.config.ts` through the
  `@config` directive at the top of `src/app/globals.css`. Spec'd breakpoints
  (420 / 520 / 640 / 760 / 780 / 900 / 960 / 1000 / 1024 / 1100 / 1180 / 1280)
  are named screens, used as `b960:` and `max-b960:`.
- `PhotoSlot` positions itself `absolute inset-0`, so its parent must be
  positioned and must set a height. That lets scrims, badges and overlay copy sit
  as siblings in normal flow.
- When passing a `display` utility to `Button`, put it on a wrapper element —
  Tailwind's source order, not the class string, decides between it and the
  component's own `inline-flex`.
- Server components by default; `'use client'` only on the slider, filters,
  gallery, tabs, accordions, booking state, forms and modal.
