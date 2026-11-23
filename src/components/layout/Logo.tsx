import Link from "next/link";
import clsx from "clsx";
import { site } from "@/data/site";

/**
 * Stand-in brand mark, drawn inline so the nav stays crisp at every density.
 * The final artwork belongs in /public/logo.svg — swap this for an <Image>
 * once it is supplied.
 */
export default function Logo({
  tone = "light",
  showTagline = true,
  className,
}: {
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";

  // No aria-label on the link: the visible brand name and tagline are its
  // accessible name. Overriding it with shorter text makes the two disagree.
  return (
    <Link href="/" className={clsx("inline-flex items-center gap-3", className)}>
      <span
        className={clsx(
          "grid h-11 w-11 shrink-0 place-items-center rounded-[12px]",
          dark ? "bg-white/12" : "bg-primary",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 44 44" width="30" height="30" fill="none" focusable="false">
          <circle cx="31" cy="14" r="4.6" fill="#FFD400" />
          <path d="M6 33 17 17.5l6.6 9.7 3.6-5.2L37 33z" fill="#FFFFFF" fillOpacity="0.96" />
          <path d="M17 17.5l4.3 6.3-2.4.8-2-1.3-2 1.5-2.1-1z" fill="#EAF1FB" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-[21px] font-extrabold tracking-[-0.02em]",
            dark ? "text-white" : "text-primary",
          )}
        >
          {site.name}
        </span>
        {showTagline ? (
          <span className={clsx("mt-1 text-[11.5px] font-medium", dark ? "text-white/70" : "text-muted")}>
            {site.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
