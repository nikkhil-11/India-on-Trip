/**
 * Sends one test enquiry to a running server, so WhatsApp delivery can be
 * verified without filling in the form by hand.
 *
 *   npm run dev                      # in one terminal
 *   npm run test:lead                # in another
 *   npm run test:lead -- https://www.indiaontrip.com
 *
 * The payload is clearly marked as a test in the name and notes, so the message
 * that lands on WhatsApp is never mistaken for a real traveller.
 */

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const url = `${base}/api/leads`;

const payload = {
  fullName: "TEST LEAD — ignore",
  countryCode: "+91",
  mobile: "9999999999",
  packageName: "Winter Spiti Valley Group Trip",
  departureBatch: "12 Dec 2026",
  travellerCount: "2",
  occupancy: "Double Sharing",
  requirements: "Automated delivery test from scripts/test-lead.mjs.",
  consent: true,
  destination: "Spiti Valley",
  sourcePage: "scripts/test-lead.mjs",
  company: "",
};

console.log(`POST ${url}`);

let response;
try {
  response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
} catch (error) {
  console.error(`\nCould not reach ${url}`);
  console.error(error instanceof Error ? error.message : error);
  console.error("\nIs the server running? Try `npm run dev`.");
  process.exit(1);
}

const body = await response.json().catch(() => null);
console.log(`\nHTTP ${response.status}`);
console.log(JSON.stringify(body, null, 2));

if (body?.ok) {
  const whatsapp = body.delivery?.whatsapp;
  console.log(
    whatsapp === "sent"
      ? "\nWhatsApp alert sent — check the handset on LEAD_WHATSAPP_TO."
      : `\nLead accepted, but WhatsApp was "${whatsapp ?? "unknown"}". See the server log.`,
  );
  process.exit(0);
}

if (body?.demo) {
  console.log(
    "\nDEMO MODE — no delivery channel is configured, so nothing was sent.\n" +
      "Set CALLMEBOT_API_KEY (or another provider) in .env.local and restart the server.",
  );
  process.exit(1);
}

console.log("\nDelivery failed. The server log has the provider error.");
process.exit(1);
