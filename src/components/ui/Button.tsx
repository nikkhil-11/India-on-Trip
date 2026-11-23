import Link from "next/link";
import clsx from "clsx";
import Icon, { type IconName } from "./Icon";

export type ButtonVariant =
  /** Yellow fill, Deep Blue text. Reserved for primary CTAs. */
  | "primary"
  /** Primary blue fill, white text. */
  | "secondary"
  /** Primary blue outline on light surfaces. */
  | "outline"
  /** White outline for use on Deep Blue surfaces. */
  | "outlineLight"
  /** Translucent white, used on photo scrims. */
  | "ghost"
  /** White fill with a hairline border. */
  | "white";

/** All sizes clear the 44px minimum touch target. */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-yellow text-deep hover:bg-[#F0C800] border border-transparent",
  secondary: "bg-primary text-white hover:bg-[#064a9d] border border-transparent",
  outline: "bg-white text-primary border border-primary hover:bg-tint",
  outlineLight: "bg-transparent text-white border border-white/55 hover:bg-white/12",
  ghost: "bg-white/14 text-white border border-white/45 hover:bg-white/24 backdrop-blur-[2px]",
  white: "bg-white text-deep border border-line hover:bg-light",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-[54px] px-6 text-[16px]",
  xl: "h-14 px-7 text-[17px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  full?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes({ variant = "primary", size = "md", full, className }: CommonProps) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-btn font-sans font-bold leading-none",
    "transition-colors duration-200 disabled:opacity-55",
    variants[variant],
    sizes[size],
    full && "w-full",
    className,
  );
}

/**
 * Renders a real <button> unless `href` is supplied, in which case it renders a
 * link — internal paths and in-page anchors go through next/link.
 */
export default function Button(props: ButtonProps) {
  const { variant, size, iconLeft, iconRight, full, className, children } = props;
  const cls = classes({ variant, size, full, className });
  const iconSize = size === "sm" ? 18 : 20;

  const inner = (
    <>
      {iconLeft ? <Icon name={iconLeft} size={iconSize} /> : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const anchorProps = stripCommon(rest) as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={cls} {...anchorProps}>
        {inner}
      </Link>
    );
  }

  const buttonProps = stripCommon(props) as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={props.type ?? "button"} className={cls} {...buttonProps}>
      {inner}
    </button>
  );
}

const OWN_PROPS = new Set(["variant", "size", "iconLeft", "iconRight", "full", "className", "children", "href"]);

/** Keeps only the native DOM attributes so they can be spread onto the element. */
function stripCommon(props: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => !OWN_PROPS.has(key)));
}
