import type { Trip } from "@/types/trip";
import { spitiPackagesExcept } from "../packages";

/**
 * Winter Spiti Valley Group Trip.
 *
 * Anything the business has not confirmed is a visible bracketed placeholder —
 * prices, GST, booking amount, batch dates, drive times, distances, meals, max
 * altitude, refund percentages, monthly temperatures and snow levels, several
 * FAQ answers, and all three reviews. Replace those, not the surrounding copy.
 */
export const winterSpitiValleyGroupTrip: Trip = {
  title: "Winter Spiti Valley Group Trip",
  slug: "winter-spiti-valley-group-trip",
  destination: "Spiti Valley",
  destinationHref: "/spiti-valley",
  shortName: "Winter Group Trip",
  season: "Winter",
  type: "Group Trip",
  duration: "7N / 8D",

  route: ["Delhi", "Shimla", "Sarahan", "Chitkul", "Tabo", "Kaza", "Kalpa", "Delhi"],
  routeStops: [
    { name: "Delhi", note: "Pickup" },
    { name: "Shimla", note: "Hill capital" },
    { name: "Sarahan", note: "Bhimakali temple" },
    { name: "Chitkul", note: "Baspa valley" },
    { name: "Tabo", note: "996 CE monastery" },
    { name: "Kaza", note: "Spiti base" },
    { name: "Kalpa", note: "Kinner Kailash views" },
    { name: "Delhi", note: "Drop" },
  ],

  gallery: [
    { alt: "Snow-covered Spiti valley with a hilltop monastery" },
    { alt: "Winter village and monastery" },
    { alt: "Snowfall over the Baspa valley pines" },
    { alt: "Winter road through Kinnaur" },
    { alt: "Dusk over Kalpa and Kinner Kailash" },
    { alt: "Partly frozen Spiti river" },
    { alt: "High village under a clear winter sky" },
  ],

  facts: [
    { icon: "clock", label: "Duration", value: "7N / 8D" },
    { icon: "pin", label: "Pickup & Drop", value: "Delhi – Delhi" },
    { icon: "users", label: "Trip Type", value: "Group Trip" },
    { icon: "mountain", label: "Max Altitude", value: "[~4,500 m — confirm]" },
    { icon: "heart", label: "Best For", value: "Snow, culture & road-trip lovers" },
  ],

  includedStrip: [
    { icon: "compass", label: "Explorations" },
    { icon: "utensils", label: "Meals" },
    { icon: "car", label: "Transfers" },
    { icon: "fire", label: "Bonfire" },
    { icon: "bed", label: "Stays" },
  ],

  trust: ["Verified local trip captain", "Small group experiences", "On-trip assistance"],

  about: {
    heading: "About Winter Spiti",
    intro:
      "In winter, Spiti Valley becomes a white, silent high-altitude desert. With the summer passes closed, the journey follows the old Hindustan–Tibet road through Kinnaur — along the Sutlej, past apple orchards, deep gorges and temple towns — before climbing into Spiti.",
    more: [
      "It is the quiet season: streams freeze, monasteries such as Key, Dhankar and Tabo sit under fresh snow, and homestays keep warm with traditional stoves. Days are often clear and bright, while nights drop far below freezing.",
      "Snowfall can affect roads at short notice, so winter trips need flexible planning, warm layers and time to acclimatise. Taking the Kinnaur route gains height gradually on the way to Kaza — a gentler way into the high valley.",
    ],
  },

  highlights: [
    "Drive the Hindustan–Tibet road through Kinnaur along the Sutlej",
    "Chitkul, one of the last villages before the Tibet border",
    "Nako village and its high-altitude lake",
    "Tabo Monastery, founded in 996 CE",
    "Dhankar Monastery, perched above the Spiti–Pin confluence",
    "Key Monastery and the high villages of Kibber and Chicham",
    "Langza's Buddha statue and Hikkim's high-altitude post office",
    "Sunrise over the Kinner Kailash range from Kalpa",
  ],

  months: [
    {
      name: "November",
      temp: "[Temperature range]",
      snow: "[Snow level]",
      text: "Early winter — crisp, clear days and the first snow on the higher slopes.",
    },
    {
      name: "December",
      temp: "[Temperature range]",
      snow: "[Snow level]",
      text: "Deep winter sets in; streams start to freeze and villages turn white.",
    },
    {
      name: "January",
      temp: "[Temperature range]",
      snow: "[Snow level]",
      text: "Usually the coldest month — heavy snow and the classic white Spiti.",
    },
    {
      name: "February",
      temp: "[Temperature range]",
      snow: "[Snow level]",
      text: "Snow-covered landscapes with slightly longer, brighter days.",
    },
  ],

  places: [
    { name: "Chitkul", text: "Last village on the old trade route" },
    { name: "Nako", text: "High village beside a small lake" },
    { name: "Gue", text: "Home of a centuries-old mummy" },
    { name: "Tabo", text: "Monastery founded in 996 CE" },
    { name: "Dhankar", text: "Cliff-top monastery and fort" },
    { name: "Langza", text: "Fossil village and giant Buddha" },
    { name: "Komic", text: "Among the highest villages by road" },
    { name: "Hikkim", text: "High-altitude post office" },
    { name: "Key", text: "Spiti's iconic hilltop monastery" },
    { name: "Chicham", text: "Village by a dramatic high bridge" },
    { name: "Kibber", text: "High village near a wildlife sanctuary" },
    { name: "Kalpa", text: "Orchards facing Kinner Kailash" },
  ],

  altitude: {
    title: "Travelling at high altitude",
    points: [
      "This trip goes from the Sutlej valley to villages around Kaza at roughly 3,600 m and higher points near 4,500 m [confirm per itinerary]. Winter nights can fall well below –15 °C.",
      "Climb gradually, drink plenty of water, rest on arrival and avoid alcohol and smoking during the first days. Tell your trip captain straight away about headache, nausea, dizziness or breathlessness — descending is the most reliable treatment for altitude sickness.",
      "If you have a heart, lung or blood-pressure condition, are pregnant, or take regular medication, speak to your doctor before booking.",
    ],
    note: "General guidance only — verify with a medical professional before travel.",
  },

  itineraryPdf: "",

  days: [
    {
      n: 0,
      title: "Delhi — overnight journey to Shimla",
      summary: "Evening pickup in Delhi and an overnight drive towards the hills.",
      details:
        "Evening pickup in Delhi and an overnight drive towards the hills. [Pickup point and reporting time — confirm.]",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Overnight journey",
      meals: "[Confirm]",
    },
    {
      n: 1,
      title: "Shimla → Sarahan",
      summary: "Morning in Shimla, then down to the Sutlej and up to Sarahan.",
      details:
        "Reach Shimla in the morning and freshen up [confirm]. Continue past Narkanda into the Sutlej valley and climb to Sarahan, home of the Bhimakali temple, by evening.",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Sarahan",
      meals: "[Confirm]",
    },
    {
      n: 2,
      title: "Sarahan → Chitkul",
      summary: "Into Kinnaur and the Baspa valley.",
      details:
        "Drive through Kinnaur on the Hindustan–Tibet road, then up the Baspa valley via Sangla to Chitkul. Evening walk around the village and bonfire [confirm].",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Chitkul",
      meals: "[Confirm]",
    },
    {
      n: 3,
      title: "Chitkul → Tabo via Nako",
      summary: "The road climbs into the cold desert.",
      details:
        "Follow the Sutlej towards Spiti, stop at Nako village and its lake, enter Spiti at Sumdo and visit the mummy at Gue on the way to Tabo [subject to road conditions].",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Tabo",
      meals: "[Confirm]",
    },
    {
      n: 4,
      title: "Tabo → Kaza via Dhankar",
      summary: "Ancient monasteries above the Spiti river.",
      details:
        "Explore Tabo Monastery, then drive up to Dhankar's cliff-top monastery overlooking the Spiti–Pin confluence before reaching Kaza.",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Kaza",
      meals: "[Confirm]",
    },
    {
      n: 5,
      title: "Key, Kibber & Chicham",
      summary: "Spiti's iconic monastery and high villages.",
      details:
        "Visit Key Monastery, continue to Kibber and the Chicham bridge, and return to Kaza for the night.",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Kaza",
      meals: "[Confirm]",
    },
    {
      n: 6,
      title: "Langza, Hikkim & Komic",
      summary: "Fossils, a giant Buddha and a high post office.",
      details:
        "Drive up to Langza and its Buddha statue, send a postcard from Hikkim and visit Komic, among the highest villages reachable by road.",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Kaza",
      meals: "[Confirm]",
    },
    {
      n: 7,
      title: "Kaza → Kalpa",
      summary: "Back through Kinnaur to apple-orchard country.",
      details: "Retrace the Spiti valley and drive to Kalpa, facing the Kinner Kailash range.",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Kalpa",
      meals: "[Confirm]",
    },
    {
      n: 8,
      title: "Kalpa → Delhi",
      summary: "Sunrise over Kinner Kailash and the journey home.",
      details:
        "Catch the morning light on the Kinner Kailash range, then begin the long drive back via Shimla to Delhi, arriving late night or early next morning [confirm].",
      drive: "[Confirm]",
      distance: "[Confirm]",
      stay: "Overnight journey",
      meals: "[Confirm]",
    },
  ],

  inclusions: [
    "Stays — [type and sharing basis: confirm]",
    "Meals — [which meals: confirm]",
    "Transfers Delhi to Delhi — [vehicle: confirm]",
    "Explorations as per the itinerary",
    "Bonfire — [nights: confirm]",
    "[Trip captain and other inclusions from the package sheet]",
  ],

  exclusions: [
    "[Exclusion from the package sheet]",
    "[Exclusion from the package sheet]",
    "[Exclusion from the package sheet]",
    "[Exclusion from the package sheet]",
  ],

  pricing: {
    fromPrice: null,
    oldPrice: null,
    offer: "[Seasonal offer]",
    occupancy: [
      { id: "quad", label: "Quad Sharing", short: "Quad", price: null },
      { id: "triple", label: "Triple Sharing", short: "Triple", price: null },
      { id: "double", label: "Double Sharing", short: "Double", price: null },
    ],
    gst: "[GST %]",
    booking: "[Booking amount]",
  },

  batchMonths: ["Nov", "Dec", "Jan", "Feb", "Mar"],

  /** Sample departures — replace every date and status with the real calendar. */
  batches: [
    { id: "nov-1", month: "Nov", start: "[DD] Nov 2026", end: "[DD] Nov 2026", status: "Available", prices: null },
    { id: "nov-2", month: "Nov", start: "[DD] Nov 2026", end: "[DD] Nov 2026", status: "Filling Fast", prices: null },
    { id: "dec-1", month: "Dec", start: "[DD] Dec 2026", end: "[DD] Dec 2026", status: "Available", prices: null },
    { id: "dec-2", month: "Dec", start: "[DD] Dec 2026", end: "[DD] Dec 2026", status: "Sold Out", prices: null },
    { id: "jan-1", month: "Jan", start: "[DD] Jan 2027", end: "[DD] Jan 2027", status: "Filling Fast", prices: null },
    { id: "jan-2", month: "Jan", start: "[DD] Jan 2027", end: "[DD] Jan 2027", status: "Available", prices: null },
    { id: "feb-1", month: "Feb", start: "[DD] Feb 2027", end: "[DD] Feb 2027", status: "Available", prices: null },
    { id: "feb-2", month: "Feb", start: "[DD] Feb 2027", end: "[DD] Feb 2027", status: "Available", prices: null },
    { id: "mar-1", month: "Mar", start: "[DD] Mar 2027", end: "[DD] Mar 2027", status: "Available", prices: null },
    { id: "mar-2", month: "Mar", start: "[DD] Mar 2027", end: "[DD] Mar 2027", status: "Sold Out", prices: null },
  ],

  packing: [
    {
      title: "Clothing",
      icon: "shirt",
      items: [
        "Thermal inner layers (2 sets)",
        "Fleece or woollen sweater",
        "Down jacket rated for sub-zero",
        "Waterproof outer layer",
        "Woollen cap, neck warmer and gloves",
        "Woollen socks (several pairs)",
      ],
    },
    {
      title: "Footwear",
      icon: "boot",
      items: [
        "Insulated, waterproof boots with good grip",
        "Spare pair of warm socks",
        "Slippers or sandals for stays",
        "Gaiters or shoe covers for snow",
      ],
    },
    {
      title: "Documents & Essentials",
      icon: "idcard",
      items: [
        "Government photo ID (original and copies)",
        "Cash — ATMs are limited",
        "Power bank and charging cables",
        "UV-protection sunglasses",
        "Insulated water bottle",
        "Headlamp or torch",
      ],
    },
    {
      title: "Medicines & Toiletries",
      icon: "pill",
      items: [
        "Personal prescription medicines",
        "Basic first-aid kit",
        "Altitude medication only on a doctor's advice",
        "Sunscreen and lip balm",
        "Moisturiser and cold cream",
        "Wet wipes and hand sanitiser",
      ],
    },
  ],

  responsible: [
    { icon: "recycle", text: "Avoid single-use plastic — carry a refillable bottle" },
    { icon: "temple", text: "Respect local traditions and monastery etiquette" },
    { icon: "store", text: "Support local homestays, cafés and artisans" },
    { icon: "leaf", text: "Leave no trace — protect a fragile environment" },
    { icon: "mountain", text: "Acclimatise and travel responsibly at altitude" },
  ],

  cancellationPolicy: {
    rows: [
      { period: "[30+ days before departure — confirm]", refund: "[Placeholder]" },
      { period: "[15–29 days before departure — confirm]", refund: "[Placeholder]" },
      { period: "[7–14 days before departure — confirm]", refund: "[Placeholder]" },
      { period: "[Less than 7 days or no-show — confirm]", refund: "[Placeholder]" },
    ],
    link: "/contact",
  },

  faqs: [
    {
      q: "Are permits required?",
      a: "Indian citizens generally do not need a permit for this route; foreign nationals need an Inner Line Permit for the restricted stretch near the border. [Confirm current rules and who arranges permits.]",
    },
    {
      q: "Will mobile networks work?",
      a: "Coverage is limited; expect no signal on long stretches; larger places such as Kaza usually have some connectivity on selected networks. [Confirm which networks work.]",
    },
    {
      q: "Are ATMs available?",
      a: "Only a few ATMs exist in the valley and they can be unreliable in winter; carry enough cash. [Confirm.]",
    },
    {
      q: "What is Acute Mountain Sickness?",
      a: "AMS is the body's reaction to lower oxygen at high altitude. Common signs are headache, nausea, tiredness, dizziness and poor sleep. Climbing gradually and staying hydrated help; if symptoms get worse, rest and descend, and seek medical help.",
    },
    { q: "What happens if roads are closed?", a: "[Confirm the policy.]" },
    { q: "Is the trip suitable for solo female travellers?", a: "[Confirm.]" },
    { q: "Is there an age limit?", a: "[Confirm.]" },
    {
      q: "Which month is best for visiting Spiti?",
      a: "For deep snow, December to February; November and March are usually milder with fewer road disruptions. [Confirm against your departure calendar.]",
    },
  ],

  reviews: [
    {
      name: "[Traveller Name]",
      initials: "TN",
      city: "[City]",
      dest: "Winter Spiti Valley",
      text: "[Sample review text — replace with a real traveller review. Nothing on this card is a genuine quote.]",
    },
    {
      name: "[Traveller Name]",
      initials: "TN",
      city: "[City]",
      dest: "Winter Spiti Valley",
      text: "[Sample review text — replace with a real traveller review. Nothing on this card is a genuine quote.]",
    },
    {
      name: "[Traveller Name]",
      initials: "TN",
      city: "[City]",
      dest: "Winter Spiti Valley",
      text: "[Sample review text — replace with a real traveller review. Nothing on this card is a genuine quote.]",
    },
  ],

  relatedTrips: spitiPackagesExcept(["Winter Group Trip", "4x4 Summer Self-Drive Expedition"]),

  cta: {
    heading: "Ready for Spiti in Winter?",
    text: "Let's plan your next Himalayan adventure.",
  },

  enquiryConfig: {
    packageName: "Winter Spiti Valley Group Trip",
    sourcePage: "/spiti-valley/winter-spiti-valley-group-trip",
  },
};
