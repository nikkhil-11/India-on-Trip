import clsx from "clsx";
import Icon from "@/components/ui/Icon";

export type ReviewCardProps = {
  name: string;
  initials: string;
  city: string;
  dest: string;
  text: string;
  /**
   * Every review on the site is a sample until real ones are collected, so the
   * label is always rendered — only its wording changes.
   */
  sampleLabel?: string;
  /** Homepage carousel shows a star row, explicitly marked as a placeholder. */
  showStars?: boolean;
  className?: string;
};

export default function ReviewCard({
  name,
  initials,
  city,
  dest,
  text,
  sampleLabel = "[Sample – Replace with Real Reviews]",
  showStars = false,
  className,
}: ReviewCardProps) {
  return (
    <figure
      className={clsx(
        "flex h-full flex-col rounded-panel border border-line bg-white p-6 shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Icon name="quote" size={26} className="text-tint" strokeWidth={1.6} />
        <span className="rounded-full bg-[#FFF8D6] px-2.5 py-1 text-[11.5px] font-bold text-[#5C4600]">
          {sampleLabel}
        </span>
      </div>

      {showStars ? (
        <p className="mt-4 flex items-center gap-1.5 text-primary">
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Icon key={index} name="star" size={16} strokeWidth={1.8} />
            ))}
          </span>
          <span className="text-[12px] font-bold text-muted">(placeholder rating — not a real score)</span>
        </p>
      ) : null}

      <blockquote className="mt-4 flex-1 text-[15px] leading-[1.7] text-body">{text}</blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tint font-display text-[15px] font-extrabold text-primary"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-[15px] font-extrabold text-deep">{name}</span>
          <span className="block truncate text-[13px] text-muted">
            {city} · {dest}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
