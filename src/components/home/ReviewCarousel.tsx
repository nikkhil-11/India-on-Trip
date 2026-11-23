"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import ReviewCard from "@/components/cards/ReviewCard";
import { sampleReviews } from "@/data/home";

/** One review at a time, advanced only by the prev/next buttons. */
export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const total = sampleReviews.length;
  const review = sampleReviews[index]!;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="t-h2">What Our Travellers Say</h2>
          <p className="mt-2 text-[15px] text-muted">
            Sample placeholder — real reviews will replace these cards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="mr-1 font-display text-[14px] font-extrabold text-muted" aria-live="polite">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-primary transition-colors hover:bg-light"
          >
            <Icon name="left" size={19} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-full border border-transparent bg-yellow text-deep transition-colors hover:bg-[#F0C800]"
          >
            <Icon name="right" size={19} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ReviewCard
          key={index}
          name={review.name}
          initials={review.initials}
          city={review.city}
          dest={review.dest}
          text={review.text}
          sampleLabel="Sample placeholder"
          showStars
        />
      </div>
    </div>
  );
}
