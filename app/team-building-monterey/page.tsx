import type { Metadata } from 'next';
import { CLIENT_PROFILE } from '@/lib/client-profile';
import {
  breadcrumbSchema,
  faqPageSchema,
  jsonLdScript,
  SITE,
  touristAttractionSchema,
} from '@/lib/schema';
import { ActivityTabs } from '@/components/ActivityTabs';
import { FaqAccordion, type Faq } from '@/components/FaqAccordion';
import { GroupInquiryForm } from '@/components/GroupInquiryForm';
import { StickyCallBar } from '@/components/StickyCallBar';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const PAGE_PATH = '/team-building-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:
    'Corporate Group Activities & Team Building | Monterey Peninsula',
  description:
    'Adventure tours, scavenger hunts, and team-building programs across Carmel, Pebble Beach, Monterey, and Pacific Grove. Trusted by Fortune 500 teams since 1987. Groups of 12–200. Request a quote today.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Corporate Group Activities & Team Building — Monterey Peninsula',
    description:
      'Adventure tours, scavenger hunts, and team-building programs across the Monterey Peninsula. Trusted by Fortune 500 teams since 1987.',
    url: PAGE_URL,
    type: 'website',
  },
};

const ADVENTURE_PROGRAMS = [
  {
    name: 'Monterey Bay Kayak Tour',
    description:
      "Paddling in Monterey Bay is often the highlight of a group's visit. Kayakers can expect to see hundreds of marine mammals as they paddle along the coast between the Monterey Bay Aquarium and Fisherman's Wharf in the kelp forest.",
    badges: ['Otters · Harbor Seals · Sea Lions · Kelp Forest'],
    spec: 'Departs: 299 Cannery Row · Includes: Splash Gear, dry bags, life vests',
  },
  {
    name: 'Pebble Beach Kayak Tour',
    description:
      'Stillwater Cove off the 17th green — paddling with views of The Lodge at Pebble Beach, Pebble Beach Golf Links, Point Lobos, and Carmel Beach.',
    badges: ['Premier · Stillwater Cove · Pebble Beach Resorts venue'],
    spec: 'Includes: Splash Gear, dry bags',
  },
  {
    name: 'Stand Up Paddle Board Tour',
    description:
      'All-skill, first-time-friendly paddling with full lesson and instruction at start. Hosted in Monterey Bay or Stillwater Cove.',
    badges: ['Beginner-friendly · All ages'],
  },
  {
    name: 'Electric Bike Tour',
    description:
      'Explore the coastline of the Monterey Peninsula and world-famous 17-Mile Drive in Pebble Beach with your group. The ride departs from any ABTS location or from your hotel — we deliver bikes to groups via flatbed truck — with stops for wildlife viewing, historical interests, and the sheer beauty of the Central Coast.',
    badges: ['17-Mile Drive · Lone Cypress · Pebble Beach'],
    spec: 'Riders 13+ · 30–40 mile range · 5 levels of pedal assist + throttle',
  },
  {
    name: 'Bike Tour',
    description:
      'Two-hour Monterey Coastal Recreation Trail ride departing from Cannery Row, your hotel, or any ABTS location. Multiple routes for all rider levels.',
    badges: ['Coastal Trail · All levels'],
  },
  {
    name: 'Hiking Tours & Nature Walks',
    description:
      "Have a naturalist join your group for a guided experience. Your guide will point out the wildlife around you — otters, seals, sea lions, migrating whales, and ancient Monterey Cypress. Sea-level shoreline trails, 22+ intertwining paths, all ability levels welcome.",
    badges: ['Otters · Whaler\'s Cove · Monterey Cypress · All abilities'],
  },
] as const;

const TEAM_BUILDING_PROGRAMS = [
  {
    name: 'Cannery Row · Monterey · Carmel Scavenger Hunts',
    description:
      'Two-hour photo and clue-driven team competition. Customizable start/end at any hotel or restaurant. Photos shared to your team after.',
    category: 'competitive' as const,
  },
  {
    name: 'Beach Olympics',
    description:
      'Our signature competitive group activity — volleyball, coconut bocce, kayak races, sandcastle projects, and more — hosted at any beach or park. All skill and ability levels.',
    category: 'competitive' as const,
  },
  {
    name: 'Challenge by the Sea',
    description:
      'Two-hour real-world problem-solving program built around trust, communication, mutual support, and accountability. Best for work teams.',
    category: 'cooperative' as const,
  },
  {
    name: 'Bike Build for Charity',
    description:
      'Teams build bikes from parts with no instructions, then race them through a cone course. Bikes are donated to Boys & Girls Clubs of Monterey County and The Salvation Army at the end.',
    category: 'initiative' as const,
    badges: ['Giving back · Works for any group size'],
  },
  {
    name: 'Bike Bingo',
    description:
      'Two-hour scenic ride on the Monterey Peninsula with a photo-driven bingo card. Perfect for all skill levels — photos shared after.',
    category: 'initiative' as const,
  },
  {
    name: 'Minute to Win It Games',
    description:
      'The perfect group enhancement before or after any banquet. Short, skill-and-luck team challenges loosely based on the TV format. Indoor or outdoor — we bring the activities to your venue.',
    category: 'competitive' as const,
    badges: ['Indoor-friendly · 1.5–2.5 hours'],
  },
  {
    name: 'Human Bingo (Custom)',
    description:
      'Custom icebreaker designed around your team and event. Built with sales kickoffs and conference openings in mind.',
    category: 'cooperative' as const,
  },
];

const FAQS: Faq[] = [
  {
    question: "What's your minimum group size?",
    answer:
      "Twelve participants is our standard minimum, but we've run programs for as few as six. Tell us your numbers — we'll make it work.",
  },
  {
    question: "What's the maximum group size?",
    answer:
      'Two hundred is our standard cap, but Beach Olympics and Scavenger Hunts have been run for larger groups by request.',
  },
  {
    question: 'Can you customize a program for our team?',
    answer:
      "Yes — we customize routinely, blending portions of multiple programs to fit your team's communication, cooperation, trust, and accountability goals.",
  },
  {
    question: 'Where do programs take place?',
    answer:
      'Across the Monterey Peninsula — Carmel, Pebble Beach, Monterey, and Pacific Grove. We host on beaches, at parks, and on-site at your hotel or property.',
  },
  {
    question: "What's the staffing ratio?",
    answer:
      'One guide per ten participants on every adventure tour, for safety and experience quality.',
  },
  {
    question: "What's included for kayak tours?",
    answer:
      'Splash Gear (waterproof outerwear), dry bags for electronics, life vests, and your guided tour. Tandem kayaks available.',
  },
  {
    question: 'Are e-bike tours available for everyone?',
    answer:
      'Riders must be 13 or older. Most e-bike tours cover 20–25 miles. Each e-bike has a 500W rear-hub motor and 5 levels of pedal assist plus throttle.',
  },
  {
    question: 'How far in advance should we book?',
    answer: `Larger programs (50+) book 4–8 weeks out. Smaller groups can often be accommodated within 1–2 weeks. Call our Sales Dept at ${CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay} to check availability.`,
  },
];

const TRUST_LOGOS = [
  { src: '/logos/google.svg', alt: 'Google — past ABTS group client' },
  { src: '/logos/adobe.png', alt: 'Adobe — past ABTS group client' },
  { src: '/logos/facebook.svg', alt: 'Facebook — past ABTS group client' },
  { src: '/logos/tiktok.svg', alt: 'TikTok — past ABTS group client' },
  { src: '/logos/sap.svg', alt: 'SAP — past ABTS group client' },
  { src: '/logos/thomson-reuters.svg', alt: 'Thomson Reuters — past ABTS group client' },
  { src: '/logos/genentech.svg', alt: 'Genentech — past ABTS group client' },
  { src: '/logos/sysco.png', alt: 'Sysco — past ABTS group client' },
  { src: '/logos/monterey-bay-aquarium.svg', alt: 'Monterey Bay Aquarium — past ABTS group client' },
];

const PILLARS = [
  {
    title: 'Communication',
    body: 'Activities that demand clear, confident exchange under pressure.',
  },
  { title: 'Cooperation', body: 'Challenges only solved when the team moves together.' },
  { title: 'Trust', body: 'Real-stakes problem-solving that builds team chemistry.' },
  {
    title: 'Adventure',
    body: 'Bike, paddle, and explore — every program gets your team outside and moving together.',
  },
];

const REGIONS = [
  {
    title: 'Carmel',
    body: 'Scavenger hunts and team building programs. Carmel Beach, downtown Carmel, and in-hotel events.',
    img: '/best-scavenger-hunt-photo.jpg',
    alt: 'Team building scavenger hunt in downtown Carmel',
  },
  {
    title: 'Pebble Beach',
    body: 'E-bike tours along the iconic 17-Mile Drive — Lone Cypress, ocean views, and Pebble Beach Golf Links.',
    img: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Private-Pebble-Beach-Kayak-Tour-image-4-e1540829707708.jpg',
    alt: 'Group kayak tour at Stillwater Cove, Pebble Beach',
  },
  {
    title: 'Monterey',
    body: 'Our main hub. Scavenger hunts, kayak tours, bike tours, team building, and outdoor adventure — all departing from Cannery Row.',
    img: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Kayak-Tour-Cover-FH.jpg',
    alt: 'Kayaking in Monterey Bay near Cannery Row',
  },
  {
    title: 'Pacific Grove',
    body: 'E-bikes, coastal tours, Asilomar State Beach, team building, beach olympics, and nature walks along the coast.',
    img: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/17-Mile-Drive-Bicycle-Tour-image-1.jpg',
    alt: 'E-bike tour on 17-Mile Drive through Pacific Grove',
  },
];

const USE_CASES = [
  'Conferences',
  'Sales kickoffs',
  'Incentive trips',
  'Executive offsites',
  'Board retreats',
  'DMC programs',
  'Fortune 500 team-building',
  'Wedding parties',
  'Family reunions',
];

const HERO_BG =
  "https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Private-Pebble-Beach-Kayak-Tour-image-4-e1540829707708.jpg";

export default function TeamBuildingMontereyPage() {
  const phone = CLIENT_PROFILE.contact.teamBuildingSalesPhone;
  const phoneDisplay = CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay;

  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.brandUrl}/` },
      { name: 'Group Programs', url: PAGE_URL },
    ]),
    touristAttractionSchema({
      pageUrl: PAGE_URL,
      name: 'Adventures By The Sea — Group & Corporate Programs',
      description:
        'Corporate group activities and team building across the Monterey Peninsula. Trusted by Fortune 500 teams since 1987.',
      telephone: phone,
      programs: [
        ...ADVENTURE_PROGRAMS.map((p) => ({ name: p.name, category: 'Adventure' })),
        ...TEAM_BUILDING_PROGRAMS.map((p) => ({ name: p.name, category: 'TeamBuilding' })),
      ],
    }),
    faqPageSchema(FAQS),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemaBlocks)}
      />
      <SiteHeader variant="sales" />
      <main className="flex-1">

      {/* HERO */}
      <section className="relative isolate overflow-hidden text-sand">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(26,58,92,0.88), rgba(42,77,110,0.78)), url('${HERO_BG}')` }}
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <span className="inline-block rounded-full border border-sand/30 bg-sand/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-widest">
            ⚓ Corporate Group Programs · Monterey Peninsula, CA
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
            Corporate Group Activities &amp; Team Building on the Monterey Peninsula
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base/relaxed text-sand/90 md:text-lg">
            Adventure tours, scavenger hunts, and team-building programs hosted across Carmel,
            Pebble Beach, Monterey, and Pacific Grove. Trusted by Fortune 500 teams, DMCs, and
            incentive planners since {CLIENT_PROFILE.brand.foundingYear}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#inquiry"
              data-intent="bundle"
              className="rounded-lg bg-sunset px-7 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
            >
              Request a Group Quote
            </a>
            <a
              href={`tel:${phone}`}
              data-intent="phone"
              className="rounded-lg border-2 border-sand/50 bg-white/10 px-7 py-3.5 text-base font-semibold text-sand transition-colors hover:bg-white/20"
            >
              Call Sales Dept · {phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-xs opacity-75">Sales hours · {CLIENT_PROFILE.contact.salesHours}</p>
        </div>
      </section>

      {/* HEADLINE EXPERIENCE — LARGE-GROUP E-BIKE TOURS */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sunset">
              The Headline Experience
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">
              Large-Group E-Bike Tours — Everyone Rides Together
            </h2>
            <p className="mt-4 max-w-prose text-ink/70">
              We specialize in large-group e-bike tours, so the whole team rides side by side and
              takes in the beauty of the Monterey Peninsula together — no one left behind, no one
              waiting.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                {
                  h: 'One Pace, One Group',
                  p: 'Pedal assist keeps strong and casual riders together — nobody falls behind on the climbs.',
                },
                {
                  h: 'Iconic Peninsula Views',
                  p: '17-Mile Drive, the Lone Cypress, and the Pebble Beach coastline — all from the saddle.',
                },
                {
                  h: 'Built for 10–100+',
                  p: 'Guided group rides scaled for corporate teams, incentive groups, and full-company offsites.',
                },
              ].map((item) => (
                <li
                  key={item.h}
                  className="rounded-xl border border-ink/10 bg-sand/40 p-4"
                >
                  <p className="font-bold text-coast-900">{item.h}</p>
                  <p className="mt-1 text-sm text-ink/70">{item.p}</p>
                </li>
              ))}
            </ul>

            <a
              href="#inquiry"
              data-intent="ebike"
              className="mt-7 inline-block rounded-lg bg-sunset px-7 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
            >
              Request a Group E-Bike Quote
            </a>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-coast-900 shadow-xl">
            <img
              src="https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Electric-Bike-Rental-image-1.jpg"
              alt="Large group e-bike tour riding together along the Monterey Peninsula coastline"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-ink/10 bg-sand/60 px-6 py-10 text-center">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink/50">
          Trusted by Meeting Planners At
        </p>
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 items-center justify-items-center gap-x-10 gap-y-8">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo.src} className="flex h-12 w-full items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-9 max-w-full object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset">Our Philosophy</p>
          <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">
            Programs Built On Four Pillars
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-ink/10 bg-sand/30 p-7 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-coast/10 font-display text-2xl text-coast">
                  {p.title.charAt(0)}
                </div>
                <h3 className="text-base font-bold text-coast-900">{p.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-lg font-semibold text-coast-900">
            No two groups run the same program. Every experience is built around your team's goals
            — not pulled off a shelf.
          </p>
        </div>
      </section>

      {/* GEOGRAPHIC FOOTPRINT */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset">
            Where We Operate
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">
            Activities Across the Monterey Peninsula
          </h2>
          <p className="mt-3 max-w-prose text-ink/70">
            Activities are hosted on beaches, at parks, and on-site at hotels and properties around
            the Monterey Peninsula.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r) => (
              <article
                key={r.title}
                className="overflow-hidden rounded-xl border border-ink/10 bg-white"
              >
                <div className="h-40 overflow-hidden bg-coast-900">
                  <img
                    src={r.img}
                    alt={r.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-coast-900">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITY SHOWCASE — TABS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-sunset">What We Offer</p>
            <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">
              Choose Your Group Experience
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-ink/70">
              Two paths — pick one or combine them. We staff every program at one guide per ten
              participants.
            </p>
          </div>
          <div className="mt-12">
            <ActivityTabs
              tabs={[
                { id: 'adventure', label: 'Adventure', programs: [...ADVENTURE_PROGRAMS] },
                { id: 'teambuilding', label: 'Team Building', programs: TEAM_BUILDING_PROGRAMS },
              ]}
            />
          </div>
        </div>
      </section>

      {/* GROUP SIZE BAND */}
      <section className="bg-sand/60 py-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">
            Built for Groups of Any Size
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Stat
              num={`${CLIENT_PROFILE.groupCapacity.standardMin}–${CLIENT_PROFILE.groupCapacity.standardMax}`}
              label="Standard group range"
              desc="Most programs run comfortably across this range."
            />
            <Stat
              num="Handful to Hundreds"
              label="No group too big or small"
              desc="We've run scavenger hunts for 6 and Beach Olympics for 200+."
              small
            />
            <Stat
              num={CLIENT_PROFILE.groupCapacity.guideRatio}
              label="Guide-to-participant ratio"
              desc="On every adventure program, for safety and experience quality."
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE STACKING */}
      <section className="bg-coast-900 py-16 text-center text-sand">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Want the Full Monterey Experience?
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-3xl" aria-hidden>
            <span title="Bike tour">🚴</span>
            <span className="text-sunset">+</span>
            <span title="Kayak tour">🛶</span>
            <span className="text-sunset">+</span>
            <span title="Beach Olympics">🏖️</span>
          </div>
          <p className="mx-auto mt-6 max-w-prose text-sand/80">
            Combine activities across days or stack two in one — most multi-day programs blend an
            adventure tour with a team-building session for maximum impact.
          </p>
          <a
            href="#inquiry"
            data-intent="bundle"
            className="mt-8 inline-block rounded-lg bg-sunset px-7 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
          >
            Build Your Bundle →
          </a>
        </div>
      </section>

      {/* WILDLIFE / VISUAL BEAUTY */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset">Why Monterey</p>
          <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">
            The Beauty of the Peninsula Is Part of the Program
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: '/sea-otters-monterey-bay.webp', cap: 'Sea Otters · Monterey Bay', alt: 'Raft of sea otters floating in Monterey Bay with kayakers in the background' },
              { src: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Kayak-3-FH.jpg', cap: 'Monterey Bay Coast', alt: 'Group kayaking near harbor seals along the Monterey coastline' },
              { src: '/point-lobos-hike.jpg', cap: 'Point Lobos · State Reserve', alt: 'Kayaking through the kelp forest at Pebble Beach' },
              { src: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Kayak-ABTS.jpg', cap: 'Harbor Seals · Cannery Row', alt: 'Panoramic view of Monterey Bay from a group kayak tour' },
              { src: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/17-Mile-Drive-Bicycle-Tour-image-1.jpg', cap: '17-Mile Drive · Pebble Beach', alt: 'Group bike tour along the iconic 17-Mile Drive in Pebble Beach' },
              { src: 'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Private-Pebble-Beach-Kayak-Tour-image-3.jpg', cap: 'Stillwater Cove · Pebble Beach', alt: 'Coastal cliffs and sea views near Point Lobos State Reserve' },
            ].map((cell) => (
              <figure key={cell.src} className="relative overflow-hidden rounded-xl">
                <img
                  src={cell.src}
                  alt={cell.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coast-900/85 to-transparent p-3 text-sm font-semibold text-sand">
                  {cell.cap}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-prose text-center text-sm italic text-ink/60">
            Our planners tell us their groups remember the otters and the views as much as the
            program itself.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-white py-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset">Who We Serve</p>
          <h2 className="mt-2 text-3xl font-extrabold text-coast-900 md:text-4xl">What We Host</h2>
          <ul className="mt-9 flex flex-wrap justify-center gap-3">
            {USE_CASES.map((u) => (
              <li
                key={u}
                className="rounded-full border border-ink/10 bg-sand/40 px-5 py-2 text-sm font-medium text-coast-900"
              >
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-sunset">
            Common Questions
          </p>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-coast-900 md:text-4xl">
            Common Questions from Planners
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section id="inquiry" className="bg-coast-900 py-20 text-sand">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl bg-coast/40 p-8 ring-1 ring-sand/10">
            <h2 className="font-display text-3xl">Call Our Sales Dept</h2>
            <a
              href={`tel:${phone}`}
              data-intent="phone"
              className="mt-4 block font-display text-4xl font-extrabold text-sunset hover:underline md:text-5xl"
            >
              {phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-sand/80">Mon–Fri · 9a–5p PT</p>
            <p className="mt-5 text-sm leading-relaxed text-sand/80">
              Talk to a real planner. Tell us your group size, dates, and what kind of energy
              you're going for — we'll send you a custom program in 24 hours.
            </p>
          </div>
          <div className="text-ink">
            <GroupInquiryForm />
          </div>
        </div>
      </section>

      <StickyCallBar />
      {/* Spacer so sticky bar doesn't cover the footer */}
      <div className="h-20" aria-hidden />
      </main>
      <SiteFooter variant="sales" />
    </>
  );
}

function Stat({
  num,
  label,
  desc,
  small,
}: {
  num: string;
  label: string;
  desc: string;
  small?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display font-extrabold leading-none text-coast-900 ${
          small ? 'text-2xl' : 'text-5xl'
        }`}
      >
        {num}
      </div>
      <div className="mt-3 text-xs font-bold uppercase tracking-wider text-sunset">{label}</div>
      <div className="mt-2 text-sm text-ink/70">{desc}</div>
    </div>
  );
}
