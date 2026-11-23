import clsx from "clsx";

/**
 * Single inline-SVG line-icon set for the whole site.
 * Grid 24, stroke 1.8, round caps and joins, no fills.
 */
const icons = {
  mountain: (
    <>
      <path d="M2.5 19.5 9 8l4.2 7 2.3-3.6 5.9 8.1z" />
      <path d="M7 19.5h14" />
    </>
  ),
  temple: (
    <>
      <path d="M4 9.5 12 4l8 5.5" />
      <path d="M6.5 9.5v10M17.5 9.5v10" />
      <path d="M3 19.5h18" />
      <path d="M10 19.5V15a2 2 0 0 1 4 0v4.5" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2.5v19M2.5 12h19" />
      <path d="M5.2 5.2l13.6 13.6M18.8 5.2 5.2 18.8" />
      <path d="M9 4.5 12 7l3-2.5M9 19.5 12 17l3 2.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
      <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1" />
      <path d="M18 14.9c2.1.6 3.5 2.2 3.5 4.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.2-5.8 7.5-5.8s7.5 2.2 7.5 5.8" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 15.5v-2.2l2-5A2 2 0 0 1 7.4 7h9.2a2 2 0 0 1 1.9 1.3l2 5v2.2" />
      <path d="M3.5 13.3h17" />
      <path d="M3.5 15.5h17v2.2h-2.8M6.3 17.7H3.5v-2.2" />
      <circle cx="7" cy="17.7" r="1.8" />
      <circle cx="17" cy="17.7" r="1.8" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h8M16 17h4" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="14" cy="17" r="2" />
    </>
  ),
  arrow: <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />,
  left: <path d="M19.5 12h-15M11 5.5 4.5 12 11 18.5" />,
  right: <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />,
  down: <path d="M12 4.5v15M5.5 13l6.5 6.5L18.5 13" />,
  pin: (
    <>
      <path d="M12 21.5c4-4.4 6.5-7.6 6.5-11a6.5 6.5 0 0 0-13 0c0 3.4 2.5 6.6 6.5 11z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.4 2.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  shield: <path d="M12 2.8l7.5 2.7v5.6c0 4.5-3 8.1-7.5 10.1-4.5-2-7.5-5.6-7.5-10.1V5.5z" />,
  tag: (
    <>
      <path d="M12.6 3.2H20a.8.8 0 0 1 .8.8v7.4a2 2 0 0 1-.6 1.4l-7 7a2 2 0 0 1-2.8 0l-6-6a2 2 0 0 1 0-2.8l7-7a2 2 0 0 1 1.2-.8z" />
      <circle cx="16.6" cy="7.4" r="1.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.6 13.8 7.2 21l4.8-2.6 4.8 2.6-1.4-7.2" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="2.6" y="13.4" width="4" height="6" rx="1.8" />
      <rect x="17.4" y="13.4" width="4" height="6" rx="1.8" />
      <path d="M19.5 19.4v.6a2.5 2.5 0 0 1-2.5 2.5h-2.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4z" />
    </>
  ),
  star: <path d="M12 3.2l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.8l6.2-.9z" />,
  chat: <path d="M20.5 12.6c0 3.9-3.8 7-8.5 7-1 0-2-.15-2.9-.4l-5.6 1.9 1.6-4.4a6.4 6.4 0 0 1-1.6-4.1c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7z" />,
  phone: (
    <path d="M7.4 3.6 9.6 8 7.7 9.9a13.8 13.8 0 0 0 6.4 6.4l1.9-1.9 4.4 2.2v3.2a1.6 1.6 0 0 1-1.8 1.6C10.4 20.5 3.5 13.6 2.6 5.4A1.6 1.6 0 0 1 4.2 3.6z" />
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="M3.4 7.2 12 13l8.6-5.8" />
    </>
  ),
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  check: <path d="M4.5 12.8l4.8 4.7L19.5 7" />,
  alert: (
    <>
      <path d="M10.6 3.9 2.9 17.4A1.6 1.6 0 0 0 4.3 19.9h15.4a1.6 1.6 0 0 0 1.4-2.5L13.4 3.9a1.6 1.6 0 0 0-2.8 0z" />
      <path d="M12 9v4" />
      <path d="M12 16.2h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="M15.8 15.8 21 21" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 6.5C6.6 7.8 5 10.2 5 13.3c0 2.6 1.4 4.2 3.4 4.2 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.8.1.3-1.6 1.4-2.9 3-3.7z" />
      <path d="M19.5 6.5c-2.9 1.3-4.5 3.7-4.5 6.8 0 2.6 1.4 4.2 3.4 4.2 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.8-2.9-.3 0-.6 0-.8.1.3-1.6 1.4-2.9 3-3.7z" />
    </>
  ),
  camera: (
    <>
      <path d="M2.8 9.2A2.4 2.4 0 0 1 5.2 6.8h1.9l1.4-2.2h7l1.4 2.2h1.9a2.4 2.4 0 0 1 2.4 2.4v8a2.4 2.4 0 0 1-2.4 2.4H5.2a2.4 2.4 0 0 1-2.4-2.4z" />
      <circle cx="12" cy="13" r="3.6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.2 8.8 15.6 12l-5.4 3.2z" />
    </>
  ),
  thumb: (
    <>
      <path d="M7.5 20.5V10.2l3.6-6.7a2 2 0 0 1 2.8 2.5l-1.3 3.4h5.1a2 2 0 0 1 2 2.4l-1.3 6.4a2.4 2.4 0 0 1-2.4 1.9z" />
      <rect x="2.8" y="10.2" width="4.7" height="10.3" rx="1.4" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19.5V7M3 12.5h18v7M21 19.5v-4" />
      <path d="M7 12.5V9.8h5.6a2 2 0 0 1 2 2v.7" />
      <circle cx="7.4" cy="10.2" r="0.6" />
    </>
  ),
  bag: (
    <>
      <rect x="3.2" y="7.5" width="17.6" height="13" rx="2.4" />
      <path d="M8.6 7.5V5.8a3.4 3.4 0 0 1 6.8 0v1.7" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="18" cy="18" r="2.6" />
      <path d="M8.6 6h5.4a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h5.4" />
    </>
  ),
  send: <path d="M21 3.5 2.8 10.4l7 2.8 2.8 7z M21 3.5 9.8 13.2" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2" />
      <path d="M12 7.9h.01" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3.5v7a2.5 2.5 0 0 0 5 0v-7M9.5 13v7.5" />
      <path d="M17 3.5v17M17 3.5c1.9.6 3 2 3 4s-1.1 3.4-3 4" />
    </>
  ),
  fire: (
    <>
      <path d="M12 21.5c3.6 0 6.2-2.4 6.2-5.8 0-4.6-4.3-6.2-4.3-11.2-3 1.6-4.6 4.2-4.6 6.6 0 1.1.3 2 .8 2.9-1.2-.4-2-1.3-2.4-2.6a6.6 6.6 0 0 0-1.9 4.3c0 3.4 2.6 5.8 6.2 5.8z" />
    </>
  ),
  download: <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4 18.5v1a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-1" />,
  leaf: (
    <>
      <path d="M4.5 19.5c-1.5-7 2.5-13 15.5-15 1.5 9.5-3.5 15-10 15-2 0-4-.5-5.5-1z" />
      <path d="M4.5 19.5C7 14 11 10.8 16.5 9" />
    </>
  ),
  heart: <path d="M12 20.5C6.5 17 3 13.9 3 10.1A4.6 4.6 0 0 1 12 8a4.6 4.6 0 0 1 9 2.1c0 3.8-3.5 6.9-9 10.4z" />,
  recycle: (
    <>
      <path d="M8.1 4.9 12 11.2H4.2l2-3.2" />
      <path d="M16 4.9h-5.6l3.9 6.3 3.5-6.3" />
      <path d="M19.8 11.2 16 17.6h4.1" />
      <path d="M9.9 19.5h7.8l-2-3.4M4.2 11.2 2 15l2.2 3.8h4" />
    </>
  ),
  store: (
    <>
      <path d="M3.5 9.5h17v10a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M2.5 9.5 4.8 4.2h14.4l2.3 5.3" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  shirt: (
    <>
      <path d="M8.8 3.5 4 6.2l1.6 4 2-.9v11.2h8.8V9.3l2 .9 1.6-4-4.8-2.7" />
      <path d="M8.8 3.5a3.2 3.2 0 0 0 6.4 0" />
    </>
  ),
  boot: (
    <>
      <path d="M6.5 3.5h3.8v9.3c0 .8.4 1.5 1.1 1.9l5.3 2.8c1.1.6 1.8 1.7 1.8 2.9H6.5z" />
      <path d="M6.5 16.5h5.6" />
    </>
  ),
  pill: (
    <>
      <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-45 12 12)" />
      <path d="M8.7 8.7 15.3 15.3" />
    </>
  ),
  idcard: (
    <>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2.4" />
      <circle cx="8.5" cy="10.6" r="2.1" />
      <path d="M5.2 16.1c.5-1.5 1.8-2.3 3.3-2.3s2.8.8 3.3 2.3" />
      <path d="M14.8 9.8h4M14.8 13.4h4" />
    </>
  ),
  signal: (
    <>
      <path d="M4 20v-4.2M9.3 20v-7.4M14.7 20v-10.6M20 20V5.6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.4" />
      <circle cx="8.6" cy="10" r="1.8" />
      <path d="M3.6 17.4 9 12.6l3.6 3.2 3.2-2.6 4.6 3.9" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  thermo: (
    <>
      <path d="M14.4 13.9V5.4a2.4 2.4 0 0 0-4.8 0v8.5a4.2 4.2 0 1 0 4.8 0z" />
      <path d="M12 9.6v6.6" />
    </>
  ),
  expand: <path d="M9 3.8H3.8V9M15 3.8h5.2V9M9 20.2H3.8V15M15 20.2h5.2V15" />,
  lock: (
    <>
      <rect x="4.4" y="10.4" width="15.2" height="10.2" rx="2.4" />
      <path d="M8.2 10.4V7.8a3.8 3.8 0 0 1 7.6 0v2.6" />
      <path d="M12 14.4v2.4" />
    </>
  ),
  loader: <path d="M12 3.2v3.6M12 17.2v3.6M3.2 12h3.6M17.2 12h3.6M5.8 5.8l2.5 2.5M15.7 15.7l2.5 2.5M18.2 5.8l-2.5 2.5M8.3 15.7l-2.5 2.5" />,
  flag: (
    <>
      <path d="M5.8 21V3.6M5.8 4.4h11.4l-2 4 2 4H5.8" />
    </>
  ),
  cross: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
    </>
  ),
  checkcircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.2 12.3 11 15l5-5.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
} as const;

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  /** Rendered width and height in px. */
  size?: number;
  className?: string;
  strokeWidth?: number;
  /**
   * When set the icon becomes a labelled image for screen readers.
   * Leave undefined for decorative icons that sit next to text.
   */
  title?: string;
};

export default function Icon({ name, size = 24, className, strokeWidth = 1.8, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {icons[name]}
    </svg>
  );
}
