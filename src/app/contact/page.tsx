import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import ContactEnquiry from "@/components/forms/ContactEnquiry";
import { ADDRESS_LABEL, EMAIL, EMAIL_LABEL, PHONE, PHONE_LABEL, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us — Plan Your Trip",
  description:
    "Send an enquiry to the IndiaOnTrip team. Share your dates and group details and we will come back with options, costs and availability.",
  openGraph: {
    title: `Contact Us | ${site.name}`,
    description: "Tell us your travel plan and our team will get in touch with the best options.",
  },
};

const detailItems: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "phone",
    label: "Call us",
    value: PHONE_LABEL,
    href: PHONE ? `tel:${PHONE.replace(/\s/g, "")}` : undefined,
  },
  {
    icon: "mail",
    label: "Email us",
    value: EMAIL_LABEL,
    href: EMAIL ? `mailto:${EMAIL}` : undefined,
  },
  { icon: "pin", label: "Visit us", value: ADDRESS_LABEL },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-deep py-14">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[13px] text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white">Contact Us</li>
            </ol>
          </nav>

          <p className="t-eyebrow !text-yellow">We&apos;re Here to Help</p>
          <h1 className="t-h1 mt-3 !text-white">Contact IndiaOnTrip</h1>
          <p className="mt-4 max-w-[640px] text-[17px] leading-[1.65] text-white/80">
            Tell us your travel plan and our team will get in touch with the best options. Enquiries only — no payment
            is taken on this page.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 b1100:grid-cols-[1fr_minmax(0,520px)]">
          <div>
            <h2 className="t-h2">Reach the travel team</h2>
            <p className="mt-3 max-w-[560px] text-[16px] leading-[1.65] text-muted">
              Share your dates, group size and the kind of trip you have in mind. We reply with a plan, what is
              included and what it costs — before anything is confirmed.
            </p>

            <ul className="mt-8 space-y-4">
              {detailItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
                    <Icon name={item.icon} size={21} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words font-display text-[17px] font-extrabold text-deep transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="mt-1 block break-words font-display text-[17px] font-extrabold text-deep">
                        {item.value}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-card border border-line bg-light p-5">
              <p className="flex items-start gap-2.5 text-[14px] leading-[1.65] text-body">
                <Icon name="info" size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  About Us, Blogs, Careers, Payments, FAQs, Terms &amp; Conditions and the Privacy Policy are linked
                  here for now — these pages are still to be written.
                </span>
              </p>
            </div>
          </div>

          <div id="enquiry">
            <Suspense
              fallback={
                <div className="rounded-panel border border-line bg-white p-10 shadow-hover">
                  <p className="text-[15px] text-muted">Loading the enquiry form…</p>
                </div>
              }
            >
              <ContactEnquiry />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
