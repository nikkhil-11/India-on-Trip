"use client";

import Icon from "@/components/ui/Icon";
import type { Trip } from "@/types/trip";

/** Builds the packing list as a .txt file in the browser — no server round-trip. */
export default function DownloadPackingList({ trip }: { trip: Trip }) {
  function download() {
    const lines = [
      `${trip.title} — Packing List`,
      `${trip.duration} · ${trip.route[0]} to ${trip.route[trip.route.length - 1]}`,
      "",
      ...trip.packing.flatMap((group) => [
        group.title.toUpperCase(),
        ...group.items.map((item) => `  [ ] ${item}`),
        "",
      ]),
      "Generated from indiaontrip.com — confirm specifics with your trip captain.",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${trip.slug}-packing-list.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex h-11 items-center gap-2 rounded-btn border border-line bg-white px-4 text-[13.5px] font-bold text-deep transition-colors hover:bg-light"
    >
      <Icon name="download" size={16} strokeWidth={2.2} />
      Download Packing List
    </button>
  );
}
