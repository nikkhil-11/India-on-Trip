"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PhotoSlot from "@/components/ui/PhotoSlot";

type GalleryImage = { src?: string; alt: string };

/**
 * One set of image nodes that restyles across three layouts:
 *  - <=760px  full-bleed scroll-snap carousel, 280px tall, all 7 photos
 *  - 760-899  2fr 1fr grid, 3 photos visible
 *  - >=900    2fr 1fr 1fr grid over two 230px rows, 5 photos visible
 *
 * "View All Photos" opens a native <dialog>, which gives us the focus trap,
 * Escape handling and backdrop for free.
 */
export default function TripGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(0);

  const total = images.length;

  function openLightbox(index: number) {
    setLightbox(index);
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Move focus to the close button rather than whatever happens to be first.
    requestAnimationFrame(() => closeRef.current?.focus());
  }

  function step(delta: number) {
    setLightbox((current) => (current + delta + total) % total);
  }

  function onRailScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const width = rail.clientWidth || 1;
    setSlide(Math.min(total - 1, Math.max(0, Math.round(rail.scrollLeft / width))));
  }

  function scrollToSlide(index: number) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: index * rail.clientWidth, behavior: "smooth" });
  }

  /** Grid placement for the first five photos; the rest are carousel-only. */
  const placement = [
    "b760:col-start-1 b760:row-start-1 b760:row-span-2",
    "b760:col-start-2 b760:row-start-1",
    "b760:col-start-2 b760:row-start-2",
    "b760:col-start-3 b760:row-start-1 b760:max-b900:hidden",
    "b760:col-start-3 b760:row-start-2 b760:max-b900:hidden",
  ];

  return (
    <section aria-label={`${title} photos`} className="relative">
      <div
        ref={railRef}
        onScroll={onRailScroll}
        className={clsx(
          "-mx-6 flex h-[280px] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "b760:mx-0 b760:grid b760:h-auto b760:gap-3 b760:overflow-visible",
          "b760:grid-cols-[2fr_1fr_1fr] b760:grid-rows-[230px_230px] b760:max-b900:grid-cols-[2fr_1fr]",
        )}
      >
        {images.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            onClick={() => openLightbox(index)}
            aria-label={`Open photo ${index + 1} of ${total}: ${image.alt}`}
            className={clsx(
              "group relative w-screen shrink-0 snap-center overflow-hidden",
              "b760:w-auto b760:shrink b760:rounded-panel",
              index > 4 && "b760:hidden",
              placement[index],
            )}
          >
            <PhotoSlot
              src={image.src}
              alt={image.alt}
              sizes={index === 0 ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 25vw"}
              priority={index === 0}
              imgClassName="zoom-img"
              hideLabel={index !== 0}
            />
          </button>
        ))}
      </div>

      {/* Desktop/tablet entry point into the lightbox. */}
      <button
        type="button"
        onClick={() => openLightbox(0)}
        className="absolute bottom-4 right-4 hidden h-11 items-center gap-2 rounded-btn bg-white px-4 font-sans text-[14px] font-bold text-deep shadow-card transition-colors hover:bg-light b760:inline-flex"
      >
        <Icon name="image" size={18} strokeWidth={2} />
        View All Photos ({total})
      </button>

      {/* Carousel controls, mobile only. */}
      <div className="mt-3 flex items-center justify-between gap-4 b760:hidden">
        <ul className="flex items-center gap-1">
          {images.map((image, index) => (
            <li key={image.alt}>
              <button
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Show photo ${index + 1} of ${total}`}
                aria-current={index === slide ? "true" : undefined}
                className="grid h-11 w-11 place-items-center"
              >
                <span
                  className={clsx(
                    "block h-2.5 rounded-full transition-all duration-300",
                    index === slide ? "w-6 bg-primary" : "w-2.5 bg-field",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openLightbox(slide)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-btn border border-line bg-white px-3.5 font-sans text-[13.5px] font-bold text-deep"
        >
          <Icon name="expand" size={16} strokeWidth={2} />
          {slide + 1} / {total}
        </button>
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setLightbox(0)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        aria-label={`${title} photo gallery`}
        className="m-auto max-h-[94vh] w-[min(1100px,94vw)] rounded-panel bg-white p-0 backdrop:bg-deep/60"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <p className="font-display text-[15px] font-extrabold text-deep">
            Photo {lightbox + 1} <span className="text-muted">of {total}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close photo gallery"
            className="grid h-11 w-11 place-items-center rounded-btn border border-line text-deep transition-colors hover:bg-light"
          >
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="relative h-[min(58vh,520px)] bg-light">
          <PhotoSlot
            src={images[lightbox]?.src}
            alt={images[lightbox]?.alt ?? ""}
            sizes="(max-width: 1100px) 94vw, 1100px"
          />

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-deep shadow-card transition-colors hover:bg-light"
          >
            <Icon name="left" size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-yellow text-deep shadow-card transition-colors hover:bg-[#F0C800]"
          >
            <Icon name="right" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-[14px] text-body">{images[lightbox]?.alt}</p>

          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => (
              <li key={image.alt}>
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  aria-label={`Show photo ${index + 1}: ${image.alt}`}
                  aria-current={index === lightbox ? "true" : undefined}
                  className={clsx(
                    "relative h-14 w-20 overflow-hidden rounded-btn border-2 transition-colors",
                    index === lightbox ? "border-primary" : "border-transparent hover:border-field",
                  )}
                >
                  <PhotoSlot src={image.src} alt={image.alt} sizes="80px" hideLabel />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </section>
  );
}
