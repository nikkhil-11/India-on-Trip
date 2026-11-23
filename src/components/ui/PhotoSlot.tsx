import Image from "next/image";
import clsx from "clsx";
import Icon from "./Icon";

export type PhotoSlotProps = {
  /** Real photo path under /public. Omit to render the brand placeholder. */
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Hides the placeholder caption, e.g. inside small thumbnails. */
  hideLabel?: boolean;
  /** Extra classes applied to the <img> / art so cards can add zoom. */
  imgClassName?: string;
};

/**
 * Photo frame that fills its parent.
 *
 * It positions itself `absolute inset-0`, so the parent must be positioned
 * (`relative`/`absolute`) and must set its own height. That lets callers stack
 * scrims, badges and overlay copy as siblings in normal flow — if this element
 * were `relative` it would consume the full height and push them out of view.
 *
 * While real photography is pending, a missing `src` renders a brand-tinted
 * layered-mountain illustration captioned with the alt text, so every layout
 * looks finished before the shoot lands.
 */
export default function PhotoSlot({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  hideLabel = false,
  imgClassName,
}: PhotoSlotProps) {
  if (src) {
    return (
      <div className={clsx("absolute inset-0 overflow-hidden bg-light", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={clsx("object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx("absolute inset-0 overflow-hidden bg-tint", className)}
      role="img"
      aria-label={`${alt} — photo placeholder`}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className={clsx("absolute inset-0 h-full w-full", imgClassName)}
        aria-hidden="true"
        focusable="false"
      >
        {/* Sky — kept in blues only, so the art never competes with a badge. */}
        <rect width="400" height="300" fill="#EAF1FB" />
        <rect y="120" width="400" height="180" fill="#DCE8F7" />
        {/* Far ridge */}
        <path d="M0 196 70 132l52 44 44-34 70 58 60-40 104 64v76H0z" fill="#9FBEE2" />
        {/* Mid ridge */}
        <path d="M0 232 84 160l58 50 46-30 76 66 136-54v108H0z" fill="#4C83C4" />
        {/* Near ridge */}
        <path d="M0 268 96 196l62 46 50-28 192 70v16H0z" fill="#0757B7" />
        {/* Foreground */}
        <path d="M0 300v-18l130-30 84 26 186-22v44z" fill="#123B70" />
        {/* Snow caps */}
        <path d="M70 132l20 17-11 4-10-6-9 7-10-5z" fill="#FFFFFF" opacity="0.92" />
        <path d="M84 160l18 15-10 4-9-5-8 6-9-4z" fill="#FFFFFF" opacity="0.5" />
      </svg>

      {hideLabel ? null : (
        <span className="absolute bottom-3 left-3 right-3 inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-deep shadow-card">
          <Icon name="camera" size={14} strokeWidth={2} className="text-primary" />
          <span className="truncate">{alt}</span>
        </span>
      )}
    </div>
  );
}
