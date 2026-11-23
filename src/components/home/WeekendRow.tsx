import clsx from "clsx";
import SectionHeading from "@/components/ui/SectionHeading";
import WeekendTripCard from "@/components/cards/WeekendTripCard";
import type { WeekendTripItem } from "@/types/package";

/** Shared section for the 2N/3D and 3N/4D weekend rows. */
export default function WeekendRow({
  id,
  title,
  subtitle,
  pill,
  items,
  columns,
  tinted = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  pill: string;
  items: WeekendTripItem[];
  /** Desktop column count — 3 for the 2N/3D row, 2 for the longer escapes. */
  columns: 2 | 3;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={clsx("section-y", tinted && "bg-light")}>
      <div className="container-page">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          aside={
            <span className="inline-flex items-center rounded-full bg-yellow px-4 py-2 text-[13px] font-extrabold text-deep">
              {pill}
            </span>
          }
        />

        <div
          className={clsx(
            "mt-10 grid gap-6 max-b760:grid-cols-1",
            columns === 3 ? "grid-cols-3" : "grid-cols-2",
          )}
        >
          {items.map((item) => (
            <WeekendTripCard
              key={item.title}
              item={item}
              sizes={columns === 3 ? "(max-width: 760px) 100vw, 33vw" : "(max-width: 760px) 100vw, 50vw"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
