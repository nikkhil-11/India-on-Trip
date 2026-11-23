"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

/** Checklist card with a live "n / m packed" counter. */
export default function PackingGroup({
  title,
  icon,
  items,
  uid,
}: {
  title: string;
  icon: IconName;
  items: string[];
  uid: string;
}) {
  const [packed, setPacked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setPacked((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="rounded-panel border border-line bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2.5 font-display text-[18px] font-extrabold text-deep">
          <span className="grid h-10 w-10 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
            <Icon name={icon} size={20} />
          </span>
          {title}
        </h3>

        <p className="shrink-0 rounded-full bg-light px-3 py-1.5 text-[12.5px] font-bold text-muted" role="status">
          {packed.size} / {items.length} packed
        </p>
      </div>

      <ul className="mt-5 space-y-1">
        {items.map((item, index) => {
          const id = `${uid}-${index}`;
          return (
            <li key={item}>
              <label
                htmlFor={id}
                className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5 text-[14.5px] leading-[1.55] text-body"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={packed.has(index)}
                  onChange={() => toggle(index)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
                />
                <span className={packed.has(index) ? "text-muted line-through" : undefined}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
