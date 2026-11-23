import Link from "next/link";
import clsx from "clsx";
import Icon from "./Icon";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Deep Blue sections flip the text to white. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Optional trailing link, e.g. "View All Packages →". */
  action?: { label: string; href: string };
  /** Rendered beside the title, e.g. the "2N / 3D Weekend Trips" pill. */
  aside?: React.ReactNode;
  id?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "left",
  action,
  aside,
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={clsx(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4",
        align === "center" && "flex-col items-center justify-center text-center",
        className,
      )}
    >
      <div className={clsx("max-w-[720px]", align === "center" && "mx-auto")}>
        {eyebrow ? <p className={clsx("t-eyebrow mb-3", dark && "!text-yellow")}>{eyebrow}</p> : null}
        <h2 id={id} className={clsx("t-h2", dark && "!text-white")}>
          {title}
        </h2>
        {subtitle ? (
          <p className={clsx("mt-3 text-[17px] leading-[1.6]", dark ? "text-white/80" : "text-muted")}>{subtitle}</p>
        ) : null}
      </div>

      {aside ?? null}

      {action ? (
        <Link
          href={action.href}
          className={clsx(
            "inline-flex min-h-11 items-center gap-2 text-[15px] font-bold transition-colors",
            dark ? "text-yellow hover:text-white" : "text-primary hover:text-deep",
          )}
        >
          {action.label}
          <Icon name="arrow" size={18} strokeWidth={2} />
        </Link>
      ) : null}
    </div>
  );
}
