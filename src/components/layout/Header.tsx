"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import { navLinks, site, utilityLinks } from "@/data/site";
import { track } from "@/lib/track";
import { whatsappEnabled, whatsappHrefOrFallback } from "@/lib/whatsapp";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const waHref = whatsappHrefOrFallback();

  // Escape closes the panel and returns focus to the hamburger.
  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function isActive(href: string) {
    if (href.startsWith("/#") || href === "/") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function onWhatsAppClick() {
    track("whatsapp_click", { source_page: pathname, variant: "header" });
  }

  return (
    <>
      {/* Utility bar — scrolls away while the nav below stays stuck. */}
      <div className="bg-deep text-white">
        <div className="container-page flex h-9 items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <p className="truncate text-[12.5px] text-white/85">{site.utilityMessage}</p>
            <span className="hidden shrink-0 rounded-full bg-yellow px-2.5 py-0.5 text-[11.5px] font-bold text-deep b1000:inline-block">
              {site.promoChip}
            </span>
          </div>

          <nav aria-label="Secondary" className="hidden shrink-0 items-center gap-4 b780:flex">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] text-white/85 transition-colors hover:text-yellow"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white shadow-nav">
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 b960:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative inline-flex h-11 items-center px-3.5 text-[15px] font-semibold transition-colors",
                    active ? "text-deep" : "text-body hover:text-primary",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-[18px] h-[3px] rounded-full bg-yellow" aria-hidden="true" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={waHref}
              onClick={onWhatsAppClick}
              {...(waHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-btn bg-yellow px-3 font-sans text-[15px] font-bold text-deep transition-colors hover:bg-[#F0C800] b520:px-5"
            >
              <Icon name="chat" size={19} strokeWidth={2} />
              {/* Stays in the accessibility tree when the label is hidden at
                  <=520px, so the accessible name always matches the visible
                  text where there is one. */}
              <span className="max-b520:sr-only">WhatsApp Us</span>
              {whatsappEnabled ? null : (
                <span className="sr-only"> — number not configured yet, opens the enquiry form</span>
              )}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-btn border border-line text-deep transition-colors hover:bg-light b960:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!menuOpen}
          className="border-t border-line bg-white b960:hidden"
        >
          <div className="container-page py-3">
            <nav aria-label="Main (mobile)" className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "flex h-[52px] items-center justify-between border-b border-line text-[16px] font-semibold",
                      active ? "text-deep" : "text-body",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      {active ? <span className="h-5 w-[3px] rounded-full bg-yellow" aria-hidden="true" /> : null}
                      {link.label}
                    </span>
                    <Icon name="right" size={18} className="text-primary" />
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-wrap gap-x-5 gap-y-2 py-4">
              {utilityLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13.5px] font-medium text-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <a
              href={waHref}
              onClick={onWhatsAppClick}
              {...(waHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-btn bg-yellow font-sans text-[15px] font-bold text-deep"
            >
              <Icon name="chat" size={19} strokeWidth={2} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
