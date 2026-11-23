"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";
import Button from "@/components/ui/Button";
import { heroSlides } from "@/data/home";

/**
 * Three crossfading hero slides. Deliberately never autoplays — advancing is
 * always a user action, via the dots or the prev/next buttons.
 */
export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const total = heroSlides.length;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section
      className="relative h-[640px] overflow-hidden bg-deep max-b640:h-[600px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured trips"
    >
      {heroSlides.map((slide, slideIndex) => {
        const active = slideIndex === index;

        return (
          <div
            key={slide.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${total}: ${slide.title}`}
            aria-hidden={!active}
            inert={!active}
            className={clsx(
              "absolute inset-0 transition-opacity duration-[600ms] ease-brand",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <PhotoSlot
              src={slide.image}
              alt={slide.imageAlt}
              sizes="100vw"
              priority={slideIndex === 0}
              hideLabel
            />
            <span className="scrim-lr absolute inset-0" aria-hidden="true" />

            <div className="container-page relative flex h-full flex-col justify-center pb-28 max-b640:pb-24 max-b640:pt-6">
              <div className="max-w-[660px]">
                <p className="inline-block rounded-full bg-yellow px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-deep max-b640:text-[11px] max-b640:tracking-[0.06em]">
                  {slide.eyebrow}
                </p>

                <h1 className="t-display mt-5 !text-white max-b640:mt-3.5">{slide.title}</h1>

                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-white/85 max-b640:mt-3 max-b640:text-[15px]">
                  {slide.text}
                </p>

                <ul className="mt-7 grid grid-cols-2 gap-2.5 max-b640:mt-5 b640:flex b640:flex-wrap">
                  {slide.chips.map((chip) => (
                    <li
                      key={chip.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/14 px-3 py-2 text-[13px] font-semibold text-white backdrop-blur-[2px]"
                    >
                      <Icon name={chip.icon} size={16} strokeWidth={2} className="text-yellow" />
                      {chip.label}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3 max-b640:mt-6">
                  <Button href={slide.cta.href} variant="primary" size="xl">
                    {slide.cta.label}
                  </Button>
                  {/* Hidden on mobile. The wrapper owns the `hidden` so it
                      cannot collide with Button's own `inline-flex`. */}
                  <span className="hidden b640:inline-flex">
                    <Button href={slide.secondaryHref} variant="ghost" size="xl">
                      View Packages
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="container-page pointer-events-none absolute inset-x-0 bottom-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="pointer-events-auto flex items-center gap-4">
            <ul className="flex items-center gap-2">
              {heroSlides.map((slide, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <li key={slide.title}>
                    <button
                      type="button"
                      onClick={() => setIndex(slideIndex)}
                      aria-label={`Show slide ${slideIndex + 1}: ${slide.title}`}
                      aria-current={active ? "true" : undefined}
                      className="grid h-11 min-w-11 place-items-center px-0.5"
                    >
                      <span
                        className={clsx(
                          "block h-2.5 rounded-full transition-all duration-300",
                          active ? "w-8 bg-yellow" : "w-2.5 bg-white/55",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="font-display text-[14px] font-extrabold text-white/90" aria-live="polite">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-white/50">/ {String(total).padStart(2, "0")}</span>
            </p>
          </div>

          <div className="pointer-events-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-deep transition-colors hover:bg-light"
            >
              <Icon name="left" size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid h-12 w-12 place-items-center rounded-full bg-yellow text-deep transition-colors hover:bg-[#F0C800]"
            >
              <Icon name="right" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
