import Link from "next/link";
import Icon from "@/components/ui/Icon";
import PackageCard from "@/components/cards/PackageCard";
import ReviewCard from "@/components/cards/ReviewCard";
import InclusionCard from "../InclusionCard";
import PackingGroup from "../PackingGroup";
import FaqItem from "../FaqItem";
import RouteTimeline from "../RouteTimeline";
import DownloadPackingList from "./DownloadPackingList";
import { rowStyles } from "@/components/ui/rows";
import type { Trip } from "@/types/trip";

export function InclusionsSection({ trip }: { trip: Trip }) {
  return (
    <section id="inclusions" className="spy-section mt-14">
      <h2 className="t-h2">Inclusions &amp; Exclusions</h2>

      <div className="mt-6 grid grid-cols-2 gap-6 max-b760:grid-cols-1">
        <InclusionCard title="What's included" items={trip.inclusions} tone="included" />
        <InclusionCard id="exclusions" title="What's not included" items={trip.exclusions} tone="excluded" />
      </div>
    </section>
  );
}

export function PackingSection({ trip }: { trip: Trip }) {
  return (
    <section id="packing" className="spy-section mt-14">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <h2 className="t-h2">Things to Pack</h2>
          <p className="mt-2 text-[15px] text-muted">Tick items off as you pack — nothing is saved or sent.</p>
        </div>
        <DownloadPackingList trip={trip} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 max-b760:grid-cols-1">
        {trip.packing.map((group) => (
          <PackingGroup
            key={group.title}
            title={group.title}
            icon={group.icon}
            items={group.items}
            uid={`${trip.slug}-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
          />
        ))}
      </div>
    </section>
  );
}

export function RouteResponsible({ trip }: { trip: Trip }) {
  return (
    <section className="mt-14">
      <RouteTimeline stops={trip.routeStops} />

      <h2 className="t-h2 mt-12">Responsible Travel</h2>
      <ul className="mt-6 grid grid-cols-5 gap-4 max-b900:grid-cols-2 max-b420:grid-cols-1">
        {trip.responsible.map((item) => (
          <li key={item.text} className="rounded-card border border-line bg-white p-5 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
              <Icon name={item.icon} size={20} />
            </span>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-body">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CancellationPolicy({ trip }: { trip: Trip }) {
  return (
    <section className="mt-14">
      <h2 className="t-h2">Cancellation Policy</h2>

      <div className="mt-6 overflow-x-auto rounded-panel border border-line">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <caption className="bg-white px-5 pt-5 text-left text-[13.5px] text-muted">
            Periods and refunds are placeholders until the policy is confirmed.
          </caption>
          <thead>
            <tr className="bg-light">
              <th scope="col" className="px-5 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-muted">
                Period
              </th>
              <th scope="col" className="px-5 py-3 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-muted">
                Refund
              </th>
            </tr>
          </thead>
          <tbody>
            {trip.cancellationPolicy.rows.map((row) => (
              <tr key={row.period} className="border-t border-line">
                <th scope="row" className="px-5 py-4 text-[14px] font-semibold text-deep">
                  {row.period}
                </th>
                <td className="px-5 py-4 text-[14px] font-bold text-deep">{row.refund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href={trip.cancellationPolicy.link}
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-[14.5px] font-bold text-primary transition-colors hover:text-deep"
      >
        Read the complete cancellation policy
        <Icon name="arrow" size={17} strokeWidth={2} />
      </Link>
    </section>
  );
}

export function FaqSection({ trip }: { trip: Trip }) {
  return (
    <section id="faqs" className="spy-section mt-14">
      <h2 className="t-h2">Frequently Asked Questions</h2>

      <ul className="mt-6 space-y-3">
        {trip.faqs.map((faq, index) => (
          <FaqItem key={faq.q} question={faq.q} answer={faq.a} uid={`${trip.slug}-faq-${index}`} />
        ))}
      </ul>
    </section>
  );
}

export function ReviewsSection({ trip }: { trip: Trip }) {
  return (
    <section className="mt-14">
      <h2 className="t-h2">Traveller Reviews</h2>
      <p className="mt-2 text-[15px] text-muted">
        Placeholders only — no ratings are shown until real reviews are collected.
      </p>

      <div className={`mt-6 ${rowStyles.reviews.container}`}>
        {trip.reviews.map((review, index) => (
          <ReviewCard
            key={`${review.name}-${index}`}
            name={review.name}
            initials={review.initials}
            city={review.city}
            dest={review.dest}
            text={review.text}
            className={rowStyles.reviews.item}
          />
        ))}
      </div>
    </section>
  );
}

export function RelatedTrips({ trip }: { trip: Trip }) {
  return (
    <section className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 className="t-h2">More Ways to Explore {trip.destination.replace(/\s*Valley\s*/i, "")}</h2>
        <Link
          href={trip.destinationHref}
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-primary transition-colors hover:text-deep"
        >
          View All Packages
          <Icon name="arrow" size={18} strokeWidth={2} />
        </Link>
      </div>

      <div className={`mt-6 ${rowStyles.related.container}`}>
        {trip.relatedTrips.map((item) => (
          <PackageCard
            key={item.title}
            item={item}
            className={rowStyles.related.item}
            sizes="(max-width: 640px) 80vw, (max-width: 1280px) 45vw, 23vw"
          />
        ))}
      </div>
    </section>
  );
}
