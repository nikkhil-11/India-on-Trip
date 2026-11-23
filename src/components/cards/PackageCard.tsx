import Link from "next/link";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";
import type { PackageCardItem } from "@/types/package";

/**
 * Package tile used by the homepage Spiti row, the destination-page grid and
 * the related-trips row. The whole card is one link, so the arrow chip is
 * decorative rather than a nested button.
 */
export default function PackageCard({
  item,
  className,
  sizes = "(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw",
}: {
  item: PackageCardItem;
  className?: string;
  sizes?: string;
}) {
  const seasonIcon = item.season === "Winter" ? "snow" : "sun";

  return (
    <article
      className={clsx(
        "card-lift group overflow-hidden rounded-lg2 border border-line bg-white shadow-card",
        className,
      )}
    >
      <Link href={item.href} className="flex h-full flex-col">
        <div className="relative h-[208px] shrink-0">
          <PhotoSlot src={item.image} alt={item.title} sizes={sizes} imgClassName="zoom-img" hideLabel />

          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            {item.season ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/94 px-2.5 py-1 text-[12px] font-bold text-primary">
                <Icon name={seasonIcon} size={14} strokeWidth={2} />
                {item.season}
              </span>
            ) : (
              <span />
            )}

            {item.badge ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-2.5 py-1 text-[12px] font-bold text-deep">
                <Icon name={item.badge === "Flexible Plans" ? "sliders" : "clock"} size={14} strokeWidth={2} />
                {item.badge}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[19px] font-extrabold leading-[1.28] text-deep">{item.title}</h3>
          {item.meta ? <p className="mt-2 text-[14px] leading-[1.6] text-muted">{item.meta}</p> : null}

          <div className="mt-5 flex items-center justify-between gap-3 pt-1">
            {item.type ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1.5 text-[12.5px] font-bold text-primary">
                {item.typeIcon ? <Icon name={item.typeIcon} size={15} strokeWidth={2} /> : null}
                {item.type}
              </span>
            ) : (
              <span />
            )}

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
