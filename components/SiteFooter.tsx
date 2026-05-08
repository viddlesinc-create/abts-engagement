import Link from 'next/link';
import { CLIENT_PROFILE } from '@/lib/client-profile';

type Variant = 'reservations' | 'sales';

const PILLAR_LINKS = [
  { href: '/bike-rental-monterey/', label: 'Bike Rental Monterey' },
  { href: '/electric-bike-rental-monterey/', label: 'E-Bike Rental Monterey' },
  { href: '/surrey-bike-rental-monterey/', label: 'Surrey Bike Rental' },
  { href: '/kayak-tours-monterey-bay/', label: 'Kayak Tours Monterey Bay' },
  { href: '/17-mile-drive-bike-tour-monterey/', label: '17-Mile Drive Bike Tour' },
  { href: '/team-building-monterey/', label: 'Team Building Monterey' },
] as const;

export function SiteFooter({ variant = 'reservations' }: { variant?: Variant }) {
  const phone =
    variant === 'sales'
      ? CLIENT_PROFILE.contact.teamBuildingSalesPhone
      : CLIENT_PROFILE.contact.mainPhone;
  const phoneDisplay =
    variant === 'sales'
      ? CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay
      : CLIENT_PROFILE.contact.mainPhoneDisplay;
  const phoneLabel = variant === 'sales' ? 'Group sales' : 'Reservations';

  return (
    <footer className="border-t border-coast/10 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-ink/70">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-ink">{CLIENT_PROFILE.brand.name}</p>
            <p className="mt-2">
              {CLIENT_PROFILE.contact.mainAddress.streetAddress}
              <br />
              {CLIENT_PROFILE.contact.mainAddress.addressLocality},{' '}
              {CLIENT_PROFILE.contact.mainAddress.addressRegion}{' '}
              {CLIENT_PROFILE.contact.mainAddress.postalCode}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-ink/50">{phoneLabel}</p>
            <p>
              <a className="hover:underline" href={`tel:${phone}`} data-intent="phone">
                {phoneDisplay}
              </a>
            </p>
          </div>

          <div>
            <p className="font-medium text-ink">Pillar pages</p>
            <ul className="mt-2 space-y-1">
              {PILLAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className="hover:underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-ink">Booking + main site</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a className="hover:underline" href="https://adventuresbythesea.com/">
                  adventuresbythesea.com
                </a>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href={`mailto:${CLIENT_PROFILE.contact.mainEmail}`}
                >
                  {CLIENT_PROFILE.contact.mainEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-coast/10 pt-6 text-xs">
          © {new Date().getFullYear()} {CLIENT_PROFILE.brand.name}. Serving the Monterey
          Peninsula since {CLIENT_PROFILE.brand.foundingYear}. Built by Berg Boys Digital.
        </p>
      </div>
    </footer>
  );
}
