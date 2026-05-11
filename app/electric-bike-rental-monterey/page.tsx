import type { Metadata } from 'next';
import {
  bikeRentalServiceSchema,
  breadcrumbSchema,
  faqPageSchema,
  jsonLdScript,
  SITE,
} from '@/lib/schema';
import { PillarPage, type PillarPageProps } from '@/components/PillarPage';
import type { Faq } from '@/components/FaqAccordion';

const PAGE_PATH = '/electric-bike-rental-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const FH_BOOK =
  'https://fareharbor.com/embeds/book/adventuresbythesea-canneryrow/items/84523/calendar/?ref=https://adventuresbythesea.com&back=https://adventuresbythesea.com/cannery-row/';

export const metadata: Metadata = {
  title: 'Electric Bike Rentals in Monterey',
  description:
    'Premium e-bike rentals in Monterey — Rad Power Bikes, Blix, AIMA. Tackle the 17 Mile Drive effortlessly. From $42.80/hr. Book online.',
  alternates: { canonical: PAGE_PATH },
};

const FAQS: Faq[] = [
  {
    question: 'Do I need experience to ride an electric bike?',
    answer:
      "No. Electric bikes ride like regular bikes — you just have motor assistance when you need it. We'll give you a quick orientation before you head out, and you'll feel confident within the first minute.",
  },
  {
    question: 'How far can I ride on a single battery charge?',
    answer:
      'Our fleet (Rad Power Bikes, Blix, and AIMA with 500W Bafang motors) offers ample range for the 17 Mile Drive or a full day of coastal riding — more than enough for any route we recommend.',
  },
  {
    question: 'Can I ride the 17 Mile Drive on an e-bike?',
    answer:
      'Yes — and we highly recommend it. The 17 Mile Drive has significant hills that make it challenging on a standard bike. An e-bike makes the full route accessible for all fitness levels.',
  },
  {
    question: 'What is the difference between your regular bikes and e-bikes?',
    answer:
      "E-bikes have a pedal-assist motor that reduces effort on hills and flats. You still pedal, but the motor amplifies your input. They're heavier but significantly more versatile on Monterey's terrain.",
  },
  {
    question: 'What age and fitness level are e-bikes appropriate for?',
    answer:
      'Our e-bikes are suitable for riders of all ages and fitness levels. We recommend them for anyone who wants to cover more ground, tackle hills, or has physical limitations that make standard cycling difficult.',
  },
  {
    question: 'How do I control the pedal-assist level?',
    answer:
      "E-bikes have 5 assist levels controlled by a handlebar display. Level 1 is light assist; Level 5 is maximum. We'll walk you through it at pickup.",
  },
  {
    question: 'Is the 17 Mile Drive toll road accessible by e-bike?',
    answer:
      'Yes, cyclists and pedestrians access the 17 Mile Drive toll road for free. Only motor vehicles pay the toll.',
  },
  {
    question: 'Can I take the e-bike to Carmel or Pacific Grove?',
    answer:
      'Yes. Both are accessible from our Cannery Row location. Ask for our recommended routes at pickup.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Premium E-Bike Rentals · Monterey Bay',
    title: 'Electric Bike Rentals in Monterey — Ride Farther, Explore More',
    subtitle:
      "Premium e-bikes that make the Monterey Peninsula's hills effortless. The 17 Mile Drive, Pacific Grove, and the coastal Recreation Trail — all within reach.",
    pricePill: 'From $42.80/hour',
    primaryCta: 'Reserve Your E-Bike →',
    primaryCtaHref: FH_BOOK,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Electric-Bike-Rental-image-1.jpg',
  },
  trustBadges: [
    '⚡ Premium E-Bike Fleet',
    '🔋 Up to 30 miles per charge',
    '👥 All Ages & Fitness Levels',
    '✓ No Experience Needed',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Pick Your Tour or Self-Guided Rental',
      body: 'Self-guided e-bike, the iconic 17 Mile Drive guided tour, or a private custom ride.',
    },
    {
      num: 2,
      title: 'Quick Orientation at Cannery Row',
      body: '5-minute walkthrough of pedal assist, brakes, and the route map. You\'ll feel confident in minutes.',
    },
    {
      num: 3,
      title: 'Cover the Whole Peninsula',
      body: 'Ride twice as far as you would on a standard rental — and arrive feeling great, not wrecked.',
    },
  ],
  ladderHeading: 'Choose Your Electric Bike Experience',
  ladderSubheading:
    'All three options use our premium e-bike fleet. The difference is how far you want to go — and whether you want a guide.',
  ladder: [
    {
      name: 'E-Bike Rental — Self-Guided',
      subtitle: 'You choose the route. We give you the bike, map, and orientation.',
      price: '$42.80',
      priceUnit: '/hr',
      best: 'Best for confident explorers who know what they want to see.',
      cta: 'Book Self-Guided →',
      ctaHref: FH_BOOK,
    },
    {
      name: 'Guided 17 Mile Drive E-Bike Tour',
      subtitle: 'Expert guide, all the best stops on the iconic 17 Mile Drive.',
      price: '$80.25',
      priceUnit: '/person',
      best: 'This is what we recommend for first-time visitors to Monterey.',
      cta: 'Book Guided Tour →',
      ctaHref: FH_BOOK,
      badge: 'Most Popular',
      featured: true,
    },
    {
      name: 'Private E-Bike Experience',
      subtitle: 'Just your group. Private guide. Custom route. No crowds.',
      price: 'Custom',
      best: 'The best way to see Monterey on your terms.',
      cta: '📞 Call to Book Private →',
      ctaHref: 'tel:+18313721807',
      badge: 'Best Experience',
    },
  ],
  included: [
    'Premium e-bike (500W motor, 5 assist levels)',
    'Helmet',
    'Bike lock',
    'Route map of Monterey + 17 Mile Drive',
    'Pre-ride orientation',
    'Charged battery — full day range',
  ],
  routesHeading: 'Your Monterey Peninsula, Unlocked',
  routes: [
    {
      name: '17 Mile Drive',
      meta: '17 miles · Half day · Moderate',
      body: 'The iconic coastal route. Lone Cypress, Pebble Beach, Stillwater Cove. Challenging on a standard bike — effortless on an e-bike.',
      chip: 'Most Popular',
    },
    {
      name: 'Carmel-by-the-Sea',
      meta: '12 miles round trip · 2–3 hr · Moderate',
      body: 'Through Pacific Grove and along Asilomar to downtown Carmel — coastal bluffs, beach overlooks, and shopping.',
    },
    {
      name: 'Coastal Recreation Trail',
      meta: 'As far as you want · Easy',
      body: 'Cannery Row to Castroville on the bayfront trail — flat, paved, and scenic the entire way.',
    },
  ],
  reviews: [
    {
      stars: 5,
      text: '"I\'m 65 and haven\'t biked in years. The e-bike made the entire 17 Mile Drive possible. I\'m so glad I upgraded — best decision of the trip."',
      author: '— Barbara W., Google Review',
    },
    {
      stars: 5,
      text: '"Came with friends who have wildly different fitness levels. E-bikes meant we all stayed together the whole ride. Worth every penny extra."',
      author: '— David M., TripAdvisor',
    },
    {
      stars: 5,
      text: '"Did the ride to Carmel and back. Hills were no problem and the bike handled perfectly. Will rent e-bikes exclusively from now on."',
      author: '— Karen S., Google Review',
    },
  ],
  faqs: FAQS,
  faqHeading: 'E-Bike FAQ',
  upsellLines: [
    'Upgrade to the guided 17 Mile Drive tour ($80.25/person)',
    'Add an extra hour of self-guided riding ($42.80)',
    'Book a private group ride — call for pricing',
  ],
  finalCta: {
    title: 'Ready to Ride the Whole Peninsula?',
    subtitle: 'Premium e-bikes. Effortless hills. The full Monterey story.',
    href: FH_BOOK,
  },
};

export default function ElectricBikeRentalMontereyPage() {
  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.url}/` },
      { name: 'Electric Bike Rental Monterey', url: PAGE_URL },
    ]),
    bikeRentalServiceSchema({
      pageUrl: PAGE_URL,
      serviceType: 'Electric Bike Rental',
      description:
        'Premium e-bikes (Rad Power, Blix, AIMA) with 500W motors and 5 levels of pedal-assist. Pickup at Cannery Row, Monterey.',
      priceFloor: 42.8,
      priceUnit: 'per hour',
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
