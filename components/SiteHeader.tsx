import Link from 'next/link';
import { CLIENT_PROFILE } from '@/lib/client-profile';

type Variant = 'reservations' | 'sales';

export function SiteHeader({ variant = 'reservations' }: { variant?: Variant }) {
  const phone =
    variant === 'sales'
      ? CLIENT_PROFILE.contact.teamBuildingSalesPhone
      : CLIENT_PROFILE.contact.mainPhone;
  const phoneDisplay =
    variant === 'sales'
      ? CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay
      : CLIENT_PROFILE.contact.mainPhoneDisplay;

  return (
    <header className="bg-coast-900 text-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight">
          {CLIENT_PROFILE.brand.name}
        </Link>
        <a
          href={`tel:${phone}`}
          className="text-sm font-medium hover:underline"
          data-intent="phone"
        >
          ☎ {phoneDisplay}
        </a>
      </div>
    </header>
  );
}
