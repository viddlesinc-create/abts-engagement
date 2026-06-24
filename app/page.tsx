import type { Metadata } from 'next';
import Link from 'next/link';
import { CLIENT_PROFILE } from '@/lib/client-profile';
import { breadcrumbSchema, jsonLdScript, SITE } from '@/lib/schema';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const PAGE_PATH = '/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:
    'Adventures by the Sea — Bikes, E-Bikes, Kayaks & Group Programs on the Monterey Peninsula',
  description: CLIENT_PROFILE.brand.description,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Adventures by the Sea — Monterey Peninsula',
    description: CLIENT_PROFILE.brand.description,
    url: PAGE_URL,
    type: 'website',
  },
};

type Pillar = {
  href: string;
  title: string;
  sub: string;
  priceLine: string;
  ladderLine?: string;
  cta: string;
};

const PILLARS: Pillar[] = [
  {
    href: '/bike-rental-monterey/',
    title: 'Bike Rental Monterey',
    sub: '6 pickup locations · cruisers, hybrids, family bikes — by the hour or day.',
    priceLine: 'From $13/hr',
    ladderLine: 'Climb hills effortlessly — upgrade to e-bike from $40 / 2 hours.',
    cta: 'Browse bikes',
  },
  {
    href: '/electric-bike-rental-monterey/',
    title: 'Electric Bike Rental Monterey',
    sub: '500W e-bikes · 5 levels of pedal-assist + throttle. Riders 13+.',
    priceLine: 'From $40 / 2 hours',
    ladderLine: 'Best for 17-Mile Drive — book the guided e-bike tour from $75/person.',
    cta: 'See e-bike fleet',
  },
  {
    href: '/surrey-bike-rental-monterey/',
    title: 'Surrey Bike Rental Monterey',
    sub: '3- and 6-person surreys · Portola Hotel + Cannery Row pickup.',
    priceLine: 'From $75 / 2 hours',
    ladderLine: 'Pair with e-bikes for the adults — split the family across both.',
    cta: 'Book a surrey',
  },
  {
    href: '/kayak-tours-monterey-bay/',
    title: 'Kayak Tours Monterey Bay',
    sub: 'Guided sea lion, sea otter, and harbor seal tours · Cannery Row and Pebble Beach launches.',
    priceLine: 'From $65/person',
    ladderLine: 'Step up to a private guided tour — quote on request.',
    cta: 'View tour times',
  },
  {
    href: '/17-mile-drive-bike-tour-monterey/',
    title: '17-Mile Drive Bike Tour',
    sub: 'Self-guided or guided e-bike tour along the Pebble Beach coastline. 2.5 hours · 20–25 miles.',
    priceLine: 'Guided e-bike tour from $75/person',
    cta: 'Plan the tour',
  },
  {
    href: '/team-building-monterey/',
    title: 'Monterey Team Building',
    sub: 'Beach Olympics for groups of 15–400 · custom corporate retreats.',
    priceLine: 'Custom quote',
    cta: 'Request a quote',
  },
];

const LADDER = [
  { rung: '1', label: 'Cruiser / Hybrid', price: '$13/hr' },
  { rung: '2', label: 'E-Bike (500W, 5 PAS)', price: '$40 / 2 hours' },
  { rung: '3', label: '17-Mile Drive E-Bike Tour', price: '$75/person' },
];

export default function HomePage() {
  const schemaBlocks = [
    breadcrumbSchema([{ name: 'Home', url: PAGE_URL }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemaBlocks)}
      />
      <SiteHeader variant="reservations" />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative isolate overflow-hidden bg-coast-900 text-sand"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,58,92,0.78), rgba(42,77,110,0.72)), url('https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/11/Cannery-Row.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <p className="text-xs uppercase tracking-widest text-sand/70">
              {CLIENT_PROFILE.brand.alternateName} · bookadventuresbythesea.com
            </p>
            <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
              Adventures by the Sea — guides and gear, since {CLIENT_PROFILE.brand.foundingYear}.
            </h1>
            <p className="mt-6 max-w-prose text-lg text-sand/85">
              Five locations across Monterey, Pacific Grove, and Pebble Beach. Bikes, e-bikes,
              kayak tours, surreys, and the only Monterey outfitter that runs Beach Olympics for
              up to {CLIENT_PROFILE.groupCapacity.beachOlympicsMax} people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pillars"
                className="inline-flex items-center rounded-lg bg-sunset px-5 py-3 font-medium text-white transition hover:bg-sunset-900"
              >
                See all 6 experiences
              </a>
              <a
                href={`tel:${CLIENT_PROFILE.contact.mainPhone}`}
                data-intent="phone"
                className="inline-flex items-center rounded-lg border border-sand/40 px-5 py-3 font-medium transition hover:bg-sand/10"
              >
                {CLIENT_PROFILE.contact.mainPhoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* AOV ladder band */}
        <section className="border-y border-coast/15 bg-sand/40">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <p className="text-xs uppercase tracking-widest text-coast/70">The Bike Ladder</p>
            <h2 className="mt-2 text-2xl md:text-3xl">
              Pick your ride — every step up unlocks more coastline.
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {LADDER.map((step) => (
                <li
                  key={step.rung}
                  className="rounded-2xl border border-coast/15 bg-white p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-coast-900 text-sm text-sand">
                      {step.rung}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-medium">{step.label}</p>
                  <p className="mt-1 text-coast">{step.price}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink/70">
              Most riders rent a cruiser, then upgrade to an e-bike on day two — or skip ahead
              and book the guided 17-Mile Drive e-bike tour. The hills are real; the e-bike is
              the answer.
            </p>
          </div>
        </section>

        {/* 6 pillar showcase */}
        <section id="pillars" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-16">
          <h2 className="text-3xl">All 6 landing pages</h2>
          <p className="mt-2 text-ink/70">
            Each page is built for a specific Google Ads campaign and a specific moment in your
            trip.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PILLARS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-coast/15 bg-white p-6 transition hover:border-coast/40 hover:shadow-md"
              >
                <h3 className="text-2xl">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.sub}</p>
                <p className="mt-3 font-medium text-coast">{p.priceLine}</p>
                {p.ladderLine ? (
                  <p className="mt-2 text-sm text-sunset">↑ {p.ladderLine}</p>
                ) : null}
                <p className="mt-4 text-sm font-medium underline-offset-4 group-hover:underline">
                  {p.cta} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer band */}
        <section className="bg-coast-900 text-sand">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-sand/70">Reservations</p>
              <a
                href={`tel:${CLIENT_PROFILE.contact.mainPhone}`}
                data-intent="phone"
                className="mt-1 block text-2xl font-medium transition hover:text-sunset"
              >
                {CLIENT_PROFILE.contact.mainPhoneDisplay}
              </a>
            </div>
            <a
              href="https://adventuresbythesea.com/"
              className="inline-flex items-center rounded-lg bg-sunset px-5 py-3 font-medium text-white transition hover:bg-sunset-900"
            >
              Book on FareHarbor
            </a>
          </div>
        </section>
      </main>
      <SiteFooter variant="reservations" />
    </>
  );
}
