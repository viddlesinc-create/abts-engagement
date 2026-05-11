import type { Metadata } from 'next';
import {
  breadcrumbSchema,
  faqPageSchema,
  jsonLdScript,
  SITE,
  touristTripSchema,
} from '@/lib/schema';
import { PillarPage, type PillarPageProps } from '@/components/PillarPage';
import type { Faq } from '@/components/FaqAccordion';

const PAGE_PATH = '/kayak-tours-monterey-bay/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const FH_BOOK =
  'https://fareharbor.com/embeds/book/adventuresbythesea-canneryrow/items/84523/calendar/?ref=https://adventuresbythesea.com&back=https://adventuresbythesea.com/cannery-row/';

export const metadata: Metadata = {
  title:
    'Kayak Tours Monterey Bay | Pebble Beach, Cannery Row & Lovers Point',
  description:
    'Guided kayak tours launching from Pebble Beach, Cannery Row, and Lovers Point. Paddle with sea otters and harbor seals. Daily departures. From $69.55/person.',
  alternates: { canonical: PAGE_PATH },
};

const FAQS: Faq[] = [
  {
    question: 'Do I need kayaking experience to join a guided tour?',
    answer:
      "No experience is required. Our guides lead the whole paddle, handle safety, and give you a full briefing before you launch. If you've never been in a kayak, the guided tour is the best possible introduction.",
  },
  {
    question: 'What wildlife can I expect to see on a Monterey Bay kayak tour?',
    answer:
      'Monterey Bay is home to sea otters, harbor seals, brown pelicans, cormorants, and sea lions. Wildlife sightings are very common but never guaranteed — our guides know exactly where to look.',
  },
  {
    question: 'What is the difference between the three tour locations?',
    answer:
      'Pebble Beach (Stillwater Cove) offers paddling in the heart of 17 Mile Drive with iconic scenery — our most scenic and premium tour. Cannery Row launches from the heart of Monterey with excellent sea otter and harbor seal sightings. Lovers Point in Pacific Grove is a quieter, scenic launch with beautiful coastal bluffs and kelp beds.',
  },
  {
    question: 'How long is the guided kayak tour?',
    answer: 'All public tours are 2 hours. Private tours are custom duration — contact us to arrange.',
  },
  {
    question: 'What is included in the guided tour price?',
    answer:
      'Everything: kayak, paddle, Coast Guard-approved life jacket, splash gear, water bottle, safety briefing, and your expert guide throughout the paddle.',
  },
  {
    question: 'What should I wear and bring on a kayak tour?',
    answer:
      "Wear clothes you don't mind getting wet and bring sunscreen. We provide splash gear, a water bottle, life jackets, and all paddling gear. Leave valuables in your car.",
  },
  {
    question: 'Are double kayaks available for couples or families?',
    answer:
      'Yes, tandem (double) kayaks are available on all tours. Great for couples, parents with children, or anyone who prefers to paddle together.',
  },
  {
    question: 'What happens if conditions are too rough on our tour day?',
    answer:
      'Safety is our priority. If conditions are unsafe, we will contact you and work with you to reschedule at no charge.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Guided Kayak Tours · Monterey Bay',
    title: 'Kayak Tours of Monterey Bay — Paddle With Otters and Harbor Seals',
    subtitle:
      'Expert-guided 2-hour tours launching daily from three iconic locations. All skill levels welcome. No experience needed.',
    pricePill: 'From $69.55/person',
    primaryCta: 'Book a Kayak Tour →',
    primaryCtaHref: FH_BOOK,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Kayak-Tour-Cover-FH.jpg',
  },
  trustBadges: [
    '🦦 Sea otters · harbor seals · sea lions',
    '👨‍🏫 Expert guides · all skill levels',
    '🚣 3 launch locations',
    '⏱ 2-hour tours daily',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Choose Your Launch',
      body: 'Pebble Beach (Stillwater Cove), Cannery Row, or Lovers Point — each has its own character.',
    },
    {
      num: 2,
      title: 'Gear Up at the Beach',
      body: 'Splash gear, life jacket, paddle, and a 10-minute briefing from your guide before you launch.',
    },
    {
      num: 3,
      title: 'Paddle With the Wildlife',
      body: 'Two hours on the water, guided through kelp beds and sea otter rafts to wherever the wildlife is that day.',
    },
  ],
  ladderHeading: 'Pick Your Tour',
  ladderSubheading:
    'All three tours are guided, 2 hours, and beginner-friendly. Pick by what you want to see.',
  ladder: [
    {
      name: 'Cannery Row Tour',
      subtitle: 'Launch from the heart of Monterey. Best sea-otter density anywhere on the bay.',
      price: '$69.55',
      priceUnit: '/person',
      best: 'Best for: First-time paddlers, photographers, classic Monterey experience.',
      cta: 'Book Cannery Row →',
      ctaHref: FH_BOOK,
    },
    {
      name: 'Pebble Beach (Stillwater Cove)',
      subtitle: 'Paddle in the heart of 17 Mile Drive. Pebble Beach Golf Links as backdrop.',
      price: '$84.55',
      priceUnit: '/person',
      best: 'Most scenic option. Premium experience.',
      cta: 'Book Pebble Beach →',
      ctaHref: FH_BOOK,
      badge: 'Most Scenic',
      featured: true,
    },
    {
      name: 'Lovers Point Tour',
      subtitle: 'Quieter launch with coastal bluffs and kelp beds. Perfect for nervous paddlers.',
      price: '$69.55',
      priceUnit: '/person',
      best: 'Best for: Families, mellow paddle, fewer crowds.',
      cta: 'Book Lovers Point →',
      ctaHref: FH_BOOK,
    },
  ],
  included: [
    'Single or tandem kayak',
    'Coast Guard-approved life jacket',
    'Splash gear (waterproof outerwear)',
    'Paddle',
    'Water bottle',
    'Expert guide for the full 2 hours',
  ],
  reviews: [
    {
      stars: 5,
      text: '"Saw 30+ otters in one paddle. The guide knew exactly where to take us. My 8-year-old still talks about it."',
      author: '— Rachel B., Google Review',
    },
    {
      stars: 5,
      text: '"Pebble Beach tour was magical — paddling under Pebble Beach Golf Links. Worth the upgrade."',
      author: '— Greg P., TripAdvisor',
    },
    {
      stars: 5,
      text: '"First time in a kayak ever. The guide made it easy and safe. Cannot recommend enough."',
      author: '— Allison M., Google Review',
    },
  ],
  faqs: FAQS,
  faqHeading: 'Kayak Tour FAQ',
  upsellLines: [
    'Upgrade to the Pebble Beach (Stillwater Cove) tour ($84.55/person)',
    'Add a tandem kayak for couples or parent-child paddles',
    'Book a private tour — call for custom pricing',
  ],
  finalCta: {
    title: 'Book Your Monterey Bay Kayak Tour',
    subtitle: 'Daily departures. All gear included. No experience required.',
    href: FH_BOOK,
  },
};

export default function KayakToursMontereyBayPage() {
  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.url}/` },
      { name: 'Kayak Tours Monterey Bay', url: PAGE_URL },
    ]),
    touristTripSchema({
      pageUrl: PAGE_URL,
      name: 'Monterey Bay Kayak Tour',
      description:
        'Expert-guided 2-hour kayak tours from Cannery Row, Pebble Beach (Stillwater Cove), and Lovers Point.',
      priceFloor: 69.55,
      priceUnit: 'per person',
      itinerary: ['Cannery Row launch', 'Pebble Beach (Stillwater Cove) launch', 'Lovers Point launch'],
    }),
    faqPageSchema(FAQS),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemaBlocks)}
      />
      <PillarPage data={DATA} />
    </>
  );
}
