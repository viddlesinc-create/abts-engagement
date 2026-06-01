import Image from 'next/image';
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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Image
          src={CLIENT_PROFILE.brand.logoUrl}
          alt={`${CLIENT_PROFILE.brand.name} logo`}
          width={596}
          height={245}
          priority
          className="h-12 w-auto md:h-14"
        />
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
