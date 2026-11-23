import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import PhotoSlot from "@/components/ui/PhotoSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import SpitiFilters from "@/components/spiti/SpitiFilters";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { aboutSpiti, spitiPage } from "@/data/spiti";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Spiti Valley Packages — Group, Self-Drive & Private Trips",
  description:
    "Six ways to travel Spiti Valley: winter and summer group trips, 4x4 self-drive expeditions and private customised journeys through Himachal's high-altitude cold desert.",
  alternates: { canonical: "/spiti-valley" },
  openGraph: {
    url: "/spiti-valley",
    title: `Spiti Valley Packages | ${site.name}`,
    description:
      "Group trips, 4x4 self-drive expeditions and private journeys through Spiti Valley.",
  },
};

export default function SpitiValleyPage() {
  return (
    <>
      <section className="relative h-[400px] bg-deep">
        <PhotoSlot alt={spitiPage.bannerAlt} sizes="100vw" priority hideLabel />
        <span className="scrim-lr absolute inset-0" aria-hidden="true" />

        <div className="container-page relative flex h-full flex-col justify-center">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[13px] text-white/75">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white">Spiti Valley</li>
            </ol>
          </nav>

          <h1 className="t-h1 !text-white">{spitiPage.title}</h1>
          <p className="mt-4 max-w-[580px] text-[17px] leading-[1.6] text-white/85 max-b640:text-[15px]">
            {spitiPage.subtitle}
          </p>

          <div className="mt-7">
            <Button href="#spiti-enquiry" variant="primary" size="lg" iconRight="arrow">
              Plan Your Spiti Trip
            </Button>
          </div>
        </div>
      </section>

      <SpitiFilters />

      <section className="section-y bg-light">
        <div className="container-page">
          <SectionHeading
            eyebrow="Know Before You Go"
            title="About Spiti Valley"
            subtitle="The basics, with anything unconfirmed left clearly marked."
          />

          <ul className="mt-10 grid grid-cols-3 gap-6 max-b900:grid-cols-1">
            {aboutSpiti.map((item) => (
              <li key={item.title} className="rounded-panel border border-line bg-white p-6 shadow-card">
                <span
                  className="grid h-11 w-11 place-items-center rounded-btn bg-tint text-primary"
                  aria-hidden="true"
                >
                  <Icon name={item.icon} size={21} />
                </span>
                <h3 className="mt-4 font-display text-[18px] font-extrabold leading-[1.3] text-deep">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="spiti-enquiry" className="section-y">
        <div className="container-page grid gap-10 b1100:grid-cols-[1fr_440px]">
          <div className="min-w-0">
            <h2 className="t-h2">Not sure which Spiti trip fits?</h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.7] text-muted">
              Tell us when you want to travel and who is coming along. We will suggest the season and travel style
              that suits your group, and share what each option includes before anything is confirmed.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                "Winter travels via Shimla and Kinnaur; summer opens the Manali side over high passes.",
                "Group trips run on fixed departures; private trips move at your pace.",
                "Self-drive expeditions are for your own 4x4, with route support from our team.",
                "Enquiry only — no payment is taken anywhere on this site.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] leading-[1.65] text-body">
                  <Icon name="checkcircle" size={19} className="mt-0.5 shrink-0 text-success" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="b1100:sticky b1100:top-24">
              <EnquiryForm
                variant="sidebar"
                destination="Spiti Valley"
                sourcePage="/spiti-valley"
                uid="spiti-sidebar"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
