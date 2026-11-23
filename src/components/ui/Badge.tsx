import clsx from "clsx";
import Icon, { type IconName } from "./Icon";

export type BadgeTone =
  /** Duration badges only — yellow always carries Deep Blue text. */
  | "yellow"
  /** Category / attribute badges. */
  | "tint"
  | "deep"
  | "white"
  | "success"
  | "warn"
  | "grey"
  | "sample";

const tones: Record<BadgeTone, string> = {
  yellow: "bg-yellow text-deep",
  tint: "bg-tint text-primary",
  deep: "bg-deep text-white",
  white: "bg-white text-deep border border-line",
  success: "bg-[#E7F5EC] text-[#0E6B3D]",
  warn: "bg-[#FFF4D6] text-[#7A5200]",
  grey: "bg-[#EEF1F5] text-muted",
  sample: "bg-[#FFF8D6] text-[#5C4600]",
};

export type BadgeProps = {
  tone?: BadgeTone;
  icon?: IconName;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

/** Pill-shaped label. Pills are for badges only — never for buttons. */
export default function Badge({ tone = "tint", icon, size = "md", className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-sans font-bold",
        size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
        tones[tone],
        className,
      )}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 14 : 16} strokeWidth={2} /> : null}
      {children}
    </span>
  );
}
