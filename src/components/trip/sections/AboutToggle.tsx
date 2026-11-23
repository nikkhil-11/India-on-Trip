"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";

/**
 * Read more / less for the trip intro.
 *
 * The extra paragraphs are always rendered and only hidden with CSS, so search
 * engines still see the full text.
 */
export default function AboutToggle({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={clsx("space-y-4 overflow-hidden transition-[max-height]", expanded ? "mt-4 max-h-[1200px]" : "max-h-0")}
        aria-hidden={!expanded}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[15.5px] leading-[1.75] text-body">
            {paragraph}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-[14.5px] font-bold text-primary transition-colors hover:text-deep"
      >
        {expanded ? "Read less" : "Read more"}
        <Icon
          name="down"
          size={17}
          strokeWidth={2.2}
          className={clsx("transition-transform", expanded && "rotate-180")}
        />
      </button>
    </>
  );
}
