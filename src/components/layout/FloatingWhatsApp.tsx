"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import { track } from "@/lib/track";
import { whatsappEnabled, whatsappHrefOrFallback } from "@/lib/whatsapp";

/**
 * 58px yellow circle, bottom-right on every page.
 *
 * On trip pages below 1100px it is hidden, because the StickyBookingBar takes
 * over that corner of the screen.
 */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const href = whatsappHrefOrFallback();
  const isTripPage = /^\/spiti-valley\/[^/]+$/.test(pathname);

  return (
    <a
      href={href}
      onClick={() => track("whatsapp_click", { source_page: pathname, variant: "floating" })}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={
        whatsappEnabled ? "Chat with us on WhatsApp" : "WhatsApp number not configured yet — go to the enquiry form"
      }
      className={clsx(
        "fixed bottom-6 right-6 z-40 grid h-[58px] w-[58px] place-items-center rounded-full bg-yellow text-deep shadow-hover transition-colors hover:bg-[#F0C800]",
        isTripPage && "max-b1100:hidden",
      )}
    >
      <Icon name="chat" size={27} strokeWidth={1.9} />
    </a>
  );
}
