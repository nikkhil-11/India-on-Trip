import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import {
  ADDRESS_LABEL,
  EMAIL,
  EMAIL_LABEL,
  PHONE,
  PHONE_LABEL,
  businessCredentials,
  copyright,
  footerDestinations,
  quickLinks,
  socialLinks,
} from "@/data/site";
import { weekendTrips2N3D, weekendTrips3N4D } from "@/data/packages";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 font-display text-[15px] font-extrabold text-white">{children}</h3>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="flex min-h-[30px] items-center text-[14px] text-white/72 transition-colors hover:text-yellow"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-deep text-white">
      <div className="container-page py-14">
        <div className="grid grid-cols-5 gap-x-8 gap-y-10 max-b1024:grid-cols-3 max-b640:grid-cols-2 max-b420:grid-cols-1">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.7] text-white/72">
              Curated group trips, self-drive expeditions and private journeys across the Himalaya and
              beyond — planned by a team that travels these routes.
            </p>
            <ul className="mt-5 flex gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={`${social.label} — link to be confirmed`}
                    className="grid h-11 w-11 place-items-center rounded-btn border border-white/22 text-white/85 transition-colors hover:border-yellow hover:text-yellow"
                  >
                    <Icon name={social.icon} size={19} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Top Destinations</ColumnHeading>
            <ul>
              {footerDestinations.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Weekend Trips (2N/3D)</ColumnHeading>
            <ul>
              {weekendTrips2N3D.map((trip) => (
                <FooterLink key={trip.title} href={trip.href}>
                  {trip.title}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Weekend Trips (3N/4D)</ColumnHeading>
            <ul>
              {weekendTrips3N4D.map((trip) => (
                <FooterLink key={trip.title} href={trip.href}>
                  {trip.title}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul>
              {quickLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>

            <h3 className="mb-4 mt-7 font-display text-[15px] font-extrabold text-white">Contact Us</h3>
            <ul className="space-y-2.5 text-[14px] text-white/72">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" size={17} className="mt-0.5 shrink-0 text-yellow" />
                {PHONE ? (
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="transition-colors hover:text-yellow">
                    {PHONE_LABEL}
                  </a>
                ) : (
                  <span>{PHONE_LABEL}</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" size={17} className="mt-0.5 shrink-0 text-yellow" />
                {EMAIL ? (
                  <a href={`mailto:${EMAIL}`} className="break-all transition-colors hover:text-yellow">
                    {EMAIL_LABEL}
                  </a>
                ) : (
                  <span>{EMAIL_LABEL}</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-yellow" />
                <span>{ADDRESS_LABEL}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/14">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-[13px] text-white/65">
          <p>{copyright}</p>
          <p>{businessCredentials}</p>
        </div>
      </div>
    </footer>
  );
}
