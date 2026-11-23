"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";

/**
 * FAQ accordion. The answer stays in the DOM (hidden with the `hidden`
 * attribute) so search engines still index it.
 */
export default function FaqItem({
  question,
  answer,
  uid,
}: {
  question: string;
  answer: string;
  uid: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `${uid}-panel`;
  const buttonId = `${uid}-button`;

  return (
    <li className="overflow-hidden rounded-card border border-line bg-white">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-4 p-4 text-left"
        >
          <span className="flex-1 font-display text-[16px] font-extrabold leading-[1.4] text-deep">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={clsx(
              "grid h-9 w-9 shrink-0 place-items-center rounded-btn transition-colors",
              open ? "bg-yellow text-deep" : "bg-tint text-primary",
            )}
          >
            <Icon name={open ? "minus" : "plus"} size={18} strokeWidth={2.2} />
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="border-t border-line p-4">
        <p className="text-[14.5px] leading-[1.7] text-body">{answer}</p>
      </div>
    </li>
  );
}
