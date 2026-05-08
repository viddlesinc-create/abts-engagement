import { CLIENT_PROFILE } from '@/lib/client-profile';

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-3 bg-coast-900 px-5 py-3 text-sand shadow-[0_-4px_16px_rgba(0,0,0,0.18)]">
      <p className="text-sm font-medium">Questions? Speak with our sales team:</p>
      <a
        className="text-sm font-bold text-sand underline underline-offset-2"
        href={`tel:${CLIENT_PROFILE.contact.teamBuildingSalesPhone}`}
        data-intent="phone"
      >
        {CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay}
      </a>
      <a
        href="#inquiry"
        className="rounded-md bg-sunset px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-sunset-900"
      >
        Request a Quote
      </a>
    </div>
  );
}
