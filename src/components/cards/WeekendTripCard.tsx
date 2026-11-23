import Link from "next/link";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";
import type { WeekendTripItem } from "@/types/package";

/** Weekend getaway tile for the 2N/3D and 3N/4D rows. */
export default function WeekendTripCard({
  item,
  className,
  sizes = "(max-width: 760px) 100vw, 33vw",
}: {
  item: WeekendTripItem;
  className?: string;
  sizes?: string;
}) {
  return (
    <article
      className={clsx(
        "card-lift group overflow-hidden rounded-lg2 border border-line bg-white shadow-card",
        className,
      )}
    >
      <Link href={item.href} className="flex h-full flex-col">
        <div className="relative h-[180px] shrink-0">
          <PhotoSlot src={item.image} alt={item.title} sizes={sizes} imgClassName="zoom-img" hideLabel />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-yellow px-2.5 py-1 text-[12px] font-bold text-deep">
            <Icon name="clock" size={14} strokeWidth={2} />
            {item.duration}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[18px] font-extrabold leading-[1.3] text-deep">{item.title}</h3>
          {item.meta ? <p className="mt-2 text-[14px] leading-[1.6] text-muted">{item.meta}</p> : null}

          <div className="mt-4 flex items-center justify-between gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary">
              <Icon name="users" size={16} strokeWidth={2} />
              Group trip
            </span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-primary transition-colors duration-200 group-hover:border-yellow group-hover:bg-yellow group-hover:text-deep"
            >
              <Icon name="arrow" size={18} strokeWidth={2} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
