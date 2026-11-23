import Link from "next/link";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";
import type { DestinationItem } from "@/types/package";

/**
 * Full-bleed photo card with a bottom scrim. Used at 420px in the Himachal
 * row, 440px in the Domestic row and 300px in the "Best Places" rail.
 */
export default function DestinationCard({
  item,
  className,
  heightClassName = "h-[420px]",
  sizes = "(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw",
  compact = false,
}: {
  item: DestinationItem;
  className?: string;
  heightClassName?: string;
  sizes?: string;
  /** Tighter padding and type for the 240x300 rail cards. */
  compact?: boolean;
}) {
  return (
    <article className={clsx("card-lift group relative overflow-hidden rounded-panel shadow-card", heightClassName, className)}>
      <Link href={item.href} className="block h-full w-full">
        <PhotoSlot src={item.image} alt={item.title} sizes={sizes} imgClassName="zoom-img" hideLabel />
        <span className="scrim-tb absolute inset-0" aria-hidden="true" />

        {item.badge ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-yellow px-2.5 py-1 text-[12px] font-bold text-deep">
            <Icon name={item.badge === "Flexible Plans" ? "sliders" : "clock"} size={14} strokeWidth={2} />
            {item.badge}
          </span>
        ) : null}

        <div className={clsx("absolute inset-x-0 bottom-0", compact ? "p-4" : "p-5")}>
          <h3
            className={clsx(
              "font-display font-extrabold !text-white",
              compact ? "text-[17px] leading-[1.25]" : "text-[22px] leading-[1.2]",
            )}
          >
            {item.title}
          </h3>
          {item.text ? (
            <p className={clsx("mt-2 leading-[1.55] text-white/82", compact ? "text-[13px]" : "text-[14px]")}>
              {item.text}
            </p>
          ) : null}

          {compact ? null : (
            <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold text-yellow">
              Explore
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/45 text-white transition-colors duration-200 group-hover:border-yellow group-hover:bg-yellow group-hover:text-deep"
              >
                <Icon name="arrow" size={17} strokeWidth={2} />
              </span>
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
