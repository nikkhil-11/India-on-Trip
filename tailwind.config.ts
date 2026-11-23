import type { Config } from "tailwindcss";

/**
 * IndiaOnTrip design tokens.
 *
 * This file is the single source of truth for the brand palette, type scale,
 * spacing, radii and shadows. Tailwind v4 consumes it through the
 * `@config "../../tailwind.config.ts"` directive at the top of
 * `src/app/globals.css`.
 *
 * Yellow (#FFD400) is reserved for primary CTAs, duration badges and active
 * tab underlines, and always carries Deep Blue text.
 */
const config: Config = {
  theme: {
    extend: {
      /**
       * The spec pins layout changes to exact pixel widths. These are declared
       * as named screens so they can be used as `b960:` (min-width) and
       * `max-b960:` (max-width) variants alongside Tailwind's defaults.
       */
      screens: {
        b420: "420px",
        b520: "520px",
        b640: "640px",
        b760: "760px",
        b780: "780px",
        b900: "900px",
        b960: "960px",
        b1000: "1000px",
        b1024: "1024px",
        b1100: "1100px",
        b1180: "1180px",
        b1280: "1280px",
      },
      colors: {
        primary: "#0757B7", // links, active states, icons, secondary buttons
        yellow: "#FFD400", // primary CTAs, duration badges, active underlines
        deep: "#123B70", // headings, utility bar, footer, trust band, booking panel
        light: "#F4F7FB", // alternating sections, chips, table headers
        body: "#173B66", // paragraphs, labels
        muted: "#4A6385", // secondary text
        line: "#E3EAF3", // card borders
        field: "#D5E0EE", // input borders at rest
        tint: "#EAF1FB", // icon tiles, category badges
        danger: "#B42318", // errors
        success: "#0E7A45", // confirmations, included items
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Minimum readable size across the site is 12px.
        "2xs": ["12px", { lineHeight: "1.5" }],
        eyebrow: ["13px", { lineHeight: "1.4", letterSpacing: "0.12em", fontWeight: "800" }],
        body: ["15px", { lineHeight: "1.7" }],
        "body-lg": ["17px", { lineHeight: "1.55" }],
        h3: ["18px", { lineHeight: "1.35", fontWeight: "800" }],
        "h3-lg": ["20px", { lineHeight: "1.3", fontWeight: "800" }],
        h2: ["28px", { lineHeight: "1.2", fontWeight: "800" }],
        "h2-lg": ["40px", { lineHeight: "1.12", fontWeight: "800" }],
        h1: ["44px", { lineHeight: "1.1", fontWeight: "800" }],
        display: ["68px", { lineHeight: "1.05", fontWeight: "800" }],
      },
      spacing: {
        // 4 / 8 / 12 / 16 / 24 / 32 / 48 / 88
        "22": "88px",
        section: "88px",
        "section-sm": "56px",
        gutter: "24px",
      },
      borderRadius: {
        btn: "10px", // buttons and inputs
        card: "14px", // compact cards
        lg2: "16px", // package cards
        panel: "18px", // panels, gallery, booking panel
      },
      boxShadow: {
        card: "0 4px 18px rgba(18,59,112,.08)",
        hover: "0 18px 40px rgba(18,59,112,.16)",
        nav: "0 2px 10px rgba(18,59,112,.07)",
        bar: "0 -6px 24px rgba(18,59,112,.12)",
        ring: "0 0 0 3px rgba(7,87,183,.18)",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
};

export default config;
