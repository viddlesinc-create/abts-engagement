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

const PAGE_PATH = '/17-mile-drive-bike-tour-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: '17 Mile Drive Bike Tour Monterey | Guided E-Bike Tours',
  description:
    'Guided e-bike tour of the 17 Mile Drive — Lone Cypress, Bird Rock, Pebble Beach. All hills handled by pedal-assist. 2.5 hours, 20–25 miles. From $75/person.',
  alternates: { canonical: PAGE_PATH },
};

const FAQS: Faq[] = [
  {
    question: 'How long does the 17 Mile Drive bike tour take?',
    answer:
      'Approximately 2.5 hours total — 20–25 miles of riding plus photo and story stops at every major landmark.',
  },
  {
    question: 'Do I need to be in good shape for this tour?',
    answer:
      'No. The tour is on 500W e-bikes (Rad Power Bikes, Blix, or AIMA — all Bafang components) with 5 levels of pedal-assist plus throttle. Hills that would be hard on a regular bike are effortless. Riders up to 280 lbs.',
  },
  {
    question: "What if I haven't ridden a bike in years?",
    answer:
      'E-bikes ride like regular bikes with motor assistance. Full pre-tour orientation provided.',
  },
  {
    question: 'Is the 17 Mile Drive open to bikes?',
    answer:
      'Yes. Cyclists and pedestrians enter the 17 Mile Drive toll road for free. Only motor vehicles pay the toll.',
  },
  {
    question: 'What happens if it rains?',
    answer: 'We monitor conditions and reschedule at no charge if weather is unsafe.',
  },
  {
    question: 'Are children allowed on the tour?',
    answer:
      'Ages 13+ on their own e-bike. Younger children in child seat or trailer with parent — confirm with us at booking.',
  },
  {
    question: 'How do I get to the meeting location?',
    answer:
      'We meet at 299 Cannery Row, Monterey. The Monterey Bay Aquarium parking garage is one block away (~$15/day), plus street parking and city garages within 5 minutes.',
  },
  {
    question: 'Is the tour beginner-friendly?',
    answer:
      'Yes — first-time visitors are our most common guests. The e-bike + guide combination removes both the fitness and navigation barriers.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Guided E-Bike Tour · 17 Mile Drive',
    title: '17 Mile Drive Bike Tour — Pebble Beach by E-Bike, Effortless',
    subtitle:
      'Pebble Beach. Lone Cypress. Bird Rock. The most photographed coastline in California, on premium 500W e-bikes with an expert local guide. Every hill effortless. Every photo stop, intentional.',
    pricePill: 'From $75/person',
    primaryCta: 'Book the Guided Tour →',
    primaryCtaHref: FH.EBIKE_17MILE,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/17-Mile-Drive-Bicycle-Tour-image-1.jpg',
  },
  trustBadges: [
    '⏱ 2.5 hours total · 20–25 miles',
    '⚡ 500W e-bikes · 5 assist levels',
    '👨‍🏫 Expert local guide',
    '📸 Stops at every landmark',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Meet at Cannery Row',
      body: 'Arrive at 299 Cannery Row 15 minutes before tour. Brief, helmet, e-bike orientation.',
    },
    {
      num: 2,
      title: 'Ride the 17 Mile Drive',
      body: 'Through Pacific Grove and into 17 Mile Drive — Bird Rock, Lone Cypress, Pebble Beach Lodge.',
    },
    {
      num: 3,
      title: 'Photo Stops + Local Stories',
      body: 'Your guide stops at every major landmark with the history, the geology, and the best photo angles.',
    },
  ],
  ladderHeading: 'Choose Your 17 Mile Drive Experience',
  ladderSubheading:
    'The guided tour is what we recommend for first-time visitors. Self-guided is for repeat riders who know the route.',
  ladder: [
    {
      name: 'Self-Guided E-Bike',
      subtitle: 'Rent the e-bike, get the route map, ride at your own pace. $35 / 2 hours · $60 / 4 hours.',
      price: '$35',
      priceUnit: '/ 2 hours',
      best: 'Best for: Confident riders who want full schedule control.',
      cta: 'Book Self-Guided →',
      ctaHref: FH.EBIKE_RENTAL,
    },
    {
      name: 'Guided 17 Mile Drive Tour',
      subtitle: 'Expert guide, 2.5 hours, all the best stops with local stories.',
      price: '$75',
      priceUnit: '/person',
      best: 'Best for: First-time visitors, anyone who wants the full Monterey story.',
      cta: 'Book Guided Tour →',
      ctaHref: FH.EBIKE_17MILE,
      badge: 'Most Popular',
      featured: true,
    },
    {
      name: 'Private Group Tour',
      subtitle: 'Just your group. Private guide. Custom pace, custom photo stops.',
      price: 'Custom',
      best: 'Best for: Families, special occasions, corporate groups.',
      cta: '📞 Call to Book Private',
      ctaHref: BOOKING_PHONE_HREF,
      badge: 'Best Experience',
    },
  ],
  included: [
    'Premium e-bike (500W, 5 assist levels)',
    'Expert local guide for the full tour',
    'Helmet and lock',
    '17 Mile Drive toll (cyclists are free)',
    'Photo stops at every major landmark',
  ],
  routesHeading: 'What You Will See',
  routes: [
    {
      name: 'Bird Rock & Seal Rock',
      meta: 'Mile 4 · Sea lions, seals, harbor seals',
      body: "Hundreds of barking sea lions on the rocks just offshore. The largest seabird haulout on the central coast.",
      chip: 'Wildlife',
    },
    {
      name: 'The Lone Cypress',
      meta: 'Mile 9 · The most photographed tree in California',
      body: '250-year-old Monterey Cypress on a granite outcrop. The icon of Pebble Beach Company.',
      chip: 'Iconic',
    },
    {
      name: 'Pebble Beach Lodge & Stillwater Cove',
      meta: 'Mile 12 · 18th green of Pebble Beach Golf Links',
      body: 'Coastal kayakers in Stillwater Cove, the famous 18th green, and the Pebble Beach Lodge.',
      chip: 'Premium',
    },
  ],
  reviews: [
    {
      stars: 5,
      text: '"Best half-day we spent in California. The e-bike made every hill nothing. Our guide was like riding with a local friend."',
      author: '— Marc D., Google Review',
    },
    {
      stars: 5,
      text: '"I was nervous because I haven\'t biked in 10 years. By mile 2 I was confident, by mile 5 I was loving it. The guide kept it fun."',
      author: '— Susan K., TripAdvisor',
    },
    {
      stars: 5,
      text: '"The Lone Cypress photo stop is worth the price of the tour. Plus we saw harbor seals at Bird Rock. Will do this every time we visit."',
      author: '— Brian W., Google Review',
    },
  ],
  faqs: FAQS,
  faqHeading: '17 Mile Drive Bike Tour FAQ',
  upsellLines: [
    'Add an extra hour of self-guided riding after the tour',
    'Upgrade to private group tour — call for pricing',
    'Combine with a Pebble Beach kayak tour ($85/person)',
  ],
  finalCta: {
    title: 'Book the 17 Mile Drive Bike Tour',
    subtitle: 'The most photographed coastline in California, on an e-bike, with an expert guide.',
    href: FH.EBIKE_17MILE,
  },
};

export default function SeventeenMileDrivePage() {
  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.url}/` },
      { name: '17 Mile Drive Bike Tour', url: PAGE_URL },
    ]),
    touristTripSchema({
      pageUrl: PAGE_URL,
      name: '17 Mile Drive E-Bike Tour',
      description:
        'Guided 2.5-hour, 20–25 mile e-bike tour of the 17 Mile Drive through Pebble Beach. All hills handled by pedal-assist.',
      priceFloor: 75,
      priceUnit: 'per person',
      itinerary: ['Cannery Row meet point', 'Bird Rock', 'Lone Cypress', 'Pebble Beach Lodge', 'Stillwater Cove'],
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
