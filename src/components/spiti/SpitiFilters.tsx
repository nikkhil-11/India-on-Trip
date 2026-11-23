"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import PackageCard from "@/components/cards/PackageCard";
import { spitiPackages } from "@/data/packages";
import {
  seasonFilters,
  travelTypeFilters,
  type SeasonFilter,
  type TravelTypeFilter,
} from "@/data/spiti";

/** Maps a travel-type chip onto the `type` field on each package card. */
const TYPE_MATCH: Record<Exclude<TravelTypeFilter, "All">, string> = {
  Group: "Group Trip",
  "Self-Drive": "Self-Drive",
  Private: "Private",
};

function Chip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={clsx(
        "inline-flex h-11 items-center rounded-full border px-4 text-[14px] font-bold transition-colors",
        pressed
          ? "border-primary bg-primary text-white"
          : "border-field bg-white text-body hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}

export default function SpitiFilters() {
  const [season, setSeason] = useState<SeasonFilter>("All");
  const [travelType, setTravelType] = useState<TravelTypeFilter>("All");

  const filtered = useMemo(
    () =>
      spitiPackages.filter((item) => {
        const seasonOk = season === "All" || item.season === season;
        const typeOk = travelType === "All" || item.type === TYPE_MATCH[travelType];
        return seasonOk && typeOk;
      }),
    [season, travelType],
  );

  const filtersActive = season !== "All" || travelType !== "All";

  function clearFilters() {
    setSeason("All");
    setTravelType("All");
  }

  return (
    <>
      <section aria-label="Filter packages" className="border-y border-line bg-light py-6">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 inline-flex items-center gap-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-muted">
                <Icon name="snow" size={15} strokeWidth={2} className="text-primary" />
                Season
              </span>
              {seasonFilters.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  pressed={season === option}
                  onClick={() => setSeason(option)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 inline-flex items-center gap-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-muted">
                <Icon name="sliders" size={15} strokeWidth={2} className="text-primary" />
                Travel type
              </span>
              {travelTypeFilters.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  pressed={travelType === option}
                  onClick={() => setTravelType(option)}
                />
              ))}
            </div>
          </div>

          <p className="mt-5 text-[14px] font-semibold text-body" role="status">
            Showing {filtered.length} of {spitiPackages.length} Spiti Valley packages
          </p>
        </div>
      </section>

      <section className="section-y" aria-labelledby="spiti-results-heading">
        <div className="container-page">
          {/* Keeps the heading order h1 -> h2 -> card h3 intact. */}
          <h2 id="spiti-results-heading" className="sr-only">
            Spiti Valley packages
          </h2>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 max-b1024:grid-cols-2 max-b640:grid-cols-1">
              {filtered.map((item) => (
                <PackageCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-panel border border-line bg-light p-10 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-primary" aria-hidden="true">
                <Icon name="search" size={22} />
              </span>
              <h2 className="mt-4 font-display text-[20px] font-extrabold text-deep">
                No packages match these filters
              </h2>
              <p className="mx-auto mt-2 max-w-[420px] text-[15px] leading-[1.6] text-muted">
                Try a different season or travel type — or clear the filters to see all six Spiti Valley packages.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-yellow px-6 font-sans text-[15px] font-bold text-deep transition-colors hover:bg-[#F0C800]"
              >
                <Icon name="close" size={18} strokeWidth={2} />
                Clear filters
              </button>
            </div>
          )}

          {filtersActive && filtered.length > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-8 inline-flex h-11 items-center gap-2 text-[14px] font-bold text-primary transition-colors hover:text-deep"
            >
              <Icon name="close" size={16} strokeWidth={2} />
              Clear filters
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
}
