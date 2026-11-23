/**
 * Shared class strings for card rows that turn into swipe rails on small
 * screens.
 *
 * Written mobile-first on purpose: the rail is the base state and the grid is
 * layered on at the breakpoint, so the `grid` utility always wins over `flex`
 * in the generated CSS without needing `!important`.
 *
 * Pair `container` on the wrapper with `item` on each card.
 */
const RAIL_BASE =
  "flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export const rowStyles = {
  /** Spiti packages: 3 / 2 at <=1024 / rail at <=640. */
  packages: {
    container: `${RAIL_BASE} b640:mx-0 b640:grid b640:grid-cols-2 b640:gap-6 b640:overflow-visible b640:px-0 b1024:grid-cols-3`,
    item: "w-[80%] shrink-0 snap-start b640:w-auto",
  },

  /** Domestic trips: 4 / 2 at <=1024 / rail at <=640. */
  domestic: {
    container: `${RAIL_BASE} b640:mx-0 b640:grid b640:grid-cols-2 b640:gap-6 b640:overflow-visible b640:px-0 b1024:grid-cols-4`,
    item: "w-[80%] shrink-0 snap-start b640:w-auto",
  },

  /** Related trips: 4 / 2 at <=1280 / rail at <=640. */
  related: {
    container: `${RAIL_BASE} b640:mx-0 b640:grid b640:grid-cols-2 b640:gap-6 b640:overflow-visible b640:px-0 b1280:grid-cols-4`,
    item: "w-[80%] shrink-0 snap-start b640:w-auto",
  },

  /** Traveller reviews: 3 columns, rail at <=900. */
  reviews: {
    container: `${RAIL_BASE} b900:mx-0 b900:grid b900:grid-cols-3 b900:gap-6 b900:overflow-visible b900:px-0`,
    item: "w-[86%] shrink-0 snap-start b900:w-auto",
  },

  /** "Best Places to Visit" rail — always a rail, 240x300 cards. */
  places: {
    container: `${RAIL_BASE}`,
    item: "w-[240px] shrink-0 snap-start",
  },
} as const;
