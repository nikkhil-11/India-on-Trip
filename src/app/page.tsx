import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import SpitiPackages from "@/components/home/SpitiPackages";
import HimachalPackages from "@/components/home/HimachalPackages";
import WeekendRow from "@/components/home/WeekendRow";
import DomesticTrips from "@/components/home/DomesticTrips";
import WhyTravel from "@/components/home/WhyTravel";
import Recognitions from "@/components/home/Recognitions";
import ReviewCarousel from "@/components/home/ReviewCarousel";
import BookingSteps from "@/components/home/BookingSteps";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { weekendTrips2N3D, weekendTrips3N4D } from "@/data/packages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Spiti Valley, Himachal & Weekend Group Trips",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${site.name} — Spiti Valley, Himachal & Weekend Group Trips`,
    description: site.description,
  },
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <SpitiPackages />
      <HimachalPackages />

      <WeekendRow
        id="weekend-trips"
        title="Weekend Group Trips"
        subtitle="Short Getaways, Big Experiences – Perfect for Friends, Couples & Solo Travellers."
        pill="2N / 3D Weekend Trips"
        items={weekendTrips2N3D}
        columns={3}
      />

      <WeekendRow
        id="longer-weekend-escapes"
        title="Longer Weekend Escapes"
        subtitle="A little more time in the mountains – ideal for a long weekend."
        pill="3N / 4D Weekend Trips"
        items={weekendTrips3N4D}
        columns={2}
        tinted
      />

      <DomesticTrips />
      <WhyTravel />
      <Recognitions />

      <section id="enquiry" className="section-y bg-light">
        <div className="container-page grid gap-10 b1100:grid-cols-[1fr_440px]">
          <div className="min-w-0">
            <ReviewCarousel />

            <div className="mt-14">
              <BookingSteps />
            </div>
          </div>

          <div className="min-w-0">
            <div className="b1100:sticky b1100:top-24">
              <EnquiryForm variant="sidebar" sourcePage="/" uid="home-sidebar" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
