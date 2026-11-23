import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TripGallery from "@/components/trip/TripGallery";
import TripHeader from "@/components/trip/TripHeader";
import SectionTabs from "@/components/trip/SectionTabs";
import TripStateProvider from "@/components/trip/TripState";
import { IncludedStrip, QuickFacts } from "@/components/trip/sections/QuickFacts";
import OverviewSection from "@/components/trip/sections/OverviewSection";
import ItinerarySection from "@/components/trip/sections/ItinerarySection";
import BatchesSection from "@/components/trip/sections/BatchesSection";
import {
  CancellationPolicy,
  FaqSection,
  InclusionsSection,
  PackingSection,
  RelatedTrips,
  ReviewsSection,
  RouteResponsible,
} from "@/components/trip/sections/StaticSections";
import {
  FinalCta,
  InlineBookingPanel,
  SidebarBookingPanel,
  TripEnquiry,
  TripEnquiryModal,
  TripStickyBar,
} from "@/components/trip/sections/TripSlots";
import { getTrip, tripSlugs } from "@/data/trips";
import { site } from "@/data/site";

export function generateStaticParams() {
  return tripSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/spiti-valley/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return { title: "Trip not found" };

  const description = `${trip.duration} ${trip.type.toLowerCase()} through ${trip.destination}: ${trip.route.join(
    " → ",
  )}. ${trip.about.intro.slice(0, 110)}…`;

  return {
    title: trip.title,
    description,
    alternates: { canonical: `/spiti-valley/${trip.slug}` },
    openGraph: {
      type: "article",
      url: `/spiti-valley/${trip.slug}`,
      title: `${trip.title} | ${site.name}`,
      description,
    },
  };
}

export default async function TripPage({ params }: PageProps<"/spiti-valley/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  /**
   * TouristTrip + FAQPage structured data. Prices and ratings are deliberately
   * omitted — publishing placeholder values as structured data would be a
   * misrepresentation to search engines.
   */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trip.title,
      description: trip.about.intro,
      url: `${site.url}/spiti-valley/${trip.slug}`,
      touristType: trip.type,
      itinerary: {
        "@type": "ItemList",
        numberOfItems: trip.routeStops.length,
        itemListElement: trip.routeStops.map((stop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "TouristDestination", name: stop.name, description: stop.note },
        })),
      },
      provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: trip.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <TripStateProvider trip={trip}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Extra bottom space so the StickyBookingBar never covers content. */}
      <div className="container-page pb-14 pt-6 max-b1100:pb-24">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={trip.destinationHref} className="transition-colors hover:text-primary">
                {trip.destination}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-deep">{trip.shortName}</li>
          </ol>
        </nav>

        <TripGallery images={trip.gallery} title={trip.title} />

        <div className="mt-10 grid gap-10 b1100:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0">
            <TripHeader trip={trip} />
            <QuickFacts facts={trip.facts} />
            <InlineBookingPanel />
            <IncludedStrip items={trip.includedStrip} />

            <SectionTabs />

            <OverviewSection trip={trip} />
            <ItinerarySection trip={trip} />
            <InclusionsSection trip={trip} />
            <BatchesSection />
            <PackingSection trip={trip} />
            <RouteResponsible trip={trip} />
            <CancellationPolicy trip={trip} />
            <FaqSection trip={trip} />
            <ReviewsSection trip={trip} />
            <RelatedTrips trip={trip} />
            <FinalCta />
            <TripEnquiry />
          </div>

          <div className="min-w-0">
            <SidebarBookingPanel />
          </div>
        </div>
      </div>

      <TripStickyBar />
      <TripEnquiryModal />
    </TripStateProvider>
  );
}
