"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export const tripSections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "exclusions", label: "Exclusions" },
  { id: "batches", label: "Batches" },
  { id: "packing", label: "Things to Pack" },
  { id: "faqs", label: "FAQs" },
] as const;

/**
 * Sticky in-page navigation with an IntersectionObserver scroll-spy.
 *
 * The tabs are plain anchors, so jumping to a section works without JS —
 * `scroll-behavior` and `scroll-margin-top` do the positioning, and the
 * reduced-motion media query turns the smooth scroll off.
 *
 * Active state is the *first* visible section in document order. That is what
 * keeps Inclusions highlighted when Inclusions and Exclusions sit side by side
 * on desktop and are therefore both on screen.
 */
export default function SectionTabs() {
  const [activeId, setActiveId] = useState<string>(tripSections[0].id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();

    const elements = tripSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }

        const first = tripSections.find((section) => visible.get(section.id));
        if (first) setActiveId(first.id);
      },
      // Ignores the band hidden behind the header + tab bar, and treats only
      // the upper part of the viewport as "current".
      { rootMargin: "-150px 0px -55% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Keep the active tab in view on narrow screens.
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(`[data-tab="${activeId}"]`);
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  return (
    <nav
      aria-label="Trip sections"
      className="sticky top-[76px] z-40 -mx-6 border-b border-line bg-white px-6"
    >
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tripSections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                data-tab={section.id}
                aria-current={active ? "true" : undefined}
                className={clsx(
                  "relative flex h-[52px] items-center px-4 text-[14.5px] font-bold transition-colors",
                  active ? "text-deep" : "text-muted hover:text-primary",
                )}
              >
                {section.label}
                {active ? (
                  <span className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-yellow" aria-hidden="true" />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
