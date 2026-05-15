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
import { FH, BOOKING_PHONE_HREF } from '@/lib/booking';

const PAGE_PATH = '/kayak-tours-monterey-bay/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:
    'Kayak Tours Monterey Bay | Sea Lions, Sea Otters & Harbor Seals',
  description:
    'Guided kayak tours launching from Cannery Row and Pebble Beach. Paddle with sea lions, sea otters, and harbor seals. Daily departures. From $65/person.',
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
      'We always see sea lions, harbor seals, and otters on this route. Monterey Bay is also home to brown pelicans, cormorants, and the occasional dolphin or whale offshore — our guides know exactly where to look.',
  },
  {
    question: 'What is the difference between the two launch locations?',
    answer:
      'Cannery Row launches from the heart of Monterey with excellent sea otter, harbor seal, and sea lion density — our most popular tour. Pebble Beach (Stillwater Cove) is the premium option: paddling in the heart of 17 Mile Drive with iconic scenery and the lighthouse as backdrop.',
  },
  {
    question: 'Are there age restrictions on the Pebble Beach tour?',
    answer:
      'Recommended age: no younger children on the Pebble Beach (Stillwater Cove) tour. The cove can be choppier than Cannery Row. The Cannery Row tour is the better fit for families with small kids.',
  },
  {
    question: 'How long is the guided kayak tour?',
    answer: 'All public tours are 2 hours. Private tours are custom duration — contact us to arrange.',
  },
  {
    question: 'What is included in the guided tour price?',
    answer:
      'Everything: kayak, paddle, Coast Guard-approved life jacket, splash gear, dry bag, safety briefing, and your expert guide throughout the paddle. We also offer a changing room before and after your tour.',
  },
  {
    question: 'What should I wear and bring on a kayak tour?',
    answer:
      "Wear clothes you don't mind getting wet and bring sunscreen. We provide splash gear, dry bag, life jackets, and all paddling gear. A changing room is available before and after the tour. Leave valuables in your car.",
  },
  {
    question: 'Are double kayaks available for couples or families?',
    answer:
      'Yes, tandem (double) kayaks are available on all tours. Great for couples, parents with children, or anyone who prefers to paddle together. Great for dogs, too.',
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
    title: 'Monterey Bay Kayak Tours — Sea Lions, Sea Otters & Harbor Seals',
    subtitle:
      'Expert-guided 2-hour tours launching daily from Cannery Row and Pebble Beach. All skill levels welcome. No experience needed.',
    pricePill: 'From $65/person',
    primaryCta: 'Ready to Paddle →',
    primaryCtaHref: FH.KAYAK_CANNERY,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Kayak-Tour-Cover-FH.jpg',
  },
  trustBadges: [
    '🦁 Sea lions · sea otters · harbor seals',
    '👨‍🏫 Expert guides · all skill levels',
    '🚣 2 launch locations + private tours',
    '⏱ 2-hour tours daily',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Choose Your Launch',
      body: 'Cannery Row in the heart of Monterey, or Pebble Beach (Stillwater Cove) inside 17 Mile Drive — each has its own character.',
    },
    {
      num: 2,
      title: 'Gear Up at the Beach',
      body: 'Splash gear, life jacket, paddle, and a 10-minute briefing from your guide before you launch. We also offer a changing room before and after your incredible experience.',
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
      subtitle: 'Launch from the heart of Monterey. Best sea-lion and sea-otter density anywhere on the bay.',
      price: '$65',
      priceUnit: '/person',
      best: 'Best for: First-time paddlers, photographers, classic Monterey experience.',
      cta: 'Book Cannery Row →',
      ctaHref: FH.KAYAK_CANNERY,
    },
    {
      name: 'Pebble Beach (Stillwater Cove)',
      subtitle: 'Explore the cove that surrounds the iconic Pebble Beach golf course.',
      price: '$85',
      priceUnit: '/person',
      best: 'Most scenic option. Premium experience.',
      cta: 'Book Pebble Beach →',
      ctaHref: FH.KAYAK_PEBBLE,
      badge: 'Most Scenic',
      featured: true,
    },
    {
      name: 'Private Tour',
      subtitle: 'Just your group. Private guide. Custom launch, custom pace.',
      price: 'Call',
      best: 'Best for: Families, special occasions, groups who want their own paddle.',
      cta: '📞 Call to Book Private',
      ctaHref: BOOKING_PHONE_HREF,
    },
  ],
  included: [
    'Single or tandem kayak',
    'Coast Guard-approved life jacket',
    'Splash gear (waterproof outerwear)',
    'Paddle',
    'Dry bag',
    'Changing room before and after your tour',
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
      text: '"Pebble Beach tour was magical — paddling the cove with the lighthouse in view. Worth the upgrade."',
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
    'Upgrade to the Pebble Beach (Stillwater Cove) tour ($85/person)',
    'Add a tandem kayak for couples, parent-child paddles, or dogs',
    'Book a private tour — call for custom pricing',
  ],
  finalCta: {
    title: 'Book Your Monterey Bay Kayak Tour',
    subtitle: 'Daily departures. All gear included. No experience required.',
    href: FH.KAYAK_CANNERY,
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
        'Expert-guided 2-hour kayak tours from Cannery Row and Pebble Beach (Stillwater Cove). See sea lions, sea otters, and harbor seals.',
      priceFloor: 65,
      priceUnit: 'per person',
      itinerary: ['Cannery Row launch', 'Pebble Beach (Stillwater Cove) launch', 'Private tour by request'],
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
