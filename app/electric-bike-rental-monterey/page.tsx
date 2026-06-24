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
import { FH, BOOKING_PHONE_HREF } from '@/lib/booking';

const PAGE_PATH = '/electric-bike-rental-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Electric Bike Rentals in Monterey',
  description:
    'Premium e-bike rentals in Monterey — Rad Power Bikes, Blix, AIMA. Tackle the 17 Mile Drive effortlessly. From $40 / 2 hours. Book online.',
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
      'Our fleet (Rad Power Bikes, Blix, and AIMA with 500W Bafang motors) delivers a 30–40 mile range per charge — more than enough for the full 17 Mile Drive or a day of coastal riding.',
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
      'Riders must be 13 or older to ride an e-bike. Within that, all fitness levels are welcome — the pedal-assist makes hills easy for any rider who is comfortable on a regular bike.',
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
    question: 'Can I take the e-bike on the 17-Mile Drive?',
    answer:
      'Yes — and it is the best way to ride it. The 30–40 mile range easily covers the full 17-Mile Drive loop with energy to spare for stops at Bird Rock, the Lone Cypress, and Pebble Beach.',
  },
  {
    question: 'Can I take the e-bike to Pacific Grove?',
    answer:
      'Yes — Pacific Grove is a short, scenic ride from our Cannery Row location. Ask for our recommended routes at pickup.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Premium E-Bike Rentals · Monterey Bay',
    title: 'Electric Bike Rentals in Monterey — Ride Farther, Explore More',
    subtitle:
      "Premium e-bikes that make the Monterey Peninsula's hills effortless. The 17 Mile Drive, Pacific Grove, and the coastal Recreation Trail — all within reach.",
    pricePill: 'From $40 / 2 hours',
    primaryCta: 'Reserve Your E-Bike →',
    primaryCtaHref: FH.EBIKE_RENTAL,
    backgroundImage: '/ebike-hero-marina.jpg',
    socialProof: '★★★★★  600+ Reviews  ·  Google & TripAdvisor  ·  #1 Outdoor Activity, Pacific Grove',
    urgencyNote: 'Weekends and holidays book fast — reserve your spot early.',
  },
  trustBadges: [
    '⚡ Premium E-Bike Fleet',
    '🔋 30–40 mile range',
    '👥 Riders 13+ on e-bikes',
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
      subtitle: 'You choose the route. We give you the bike, map, and orientation. $40 / 2 hours · $60 / 4 hours · $80 all day.',
      price: '$40',
      priceUnit: '/ 2 hours',
      best: 'Best for confident explorers who know what they want to see.',
      cta: 'Book Self-Guided →',
      ctaHref: FH.EBIKE_RENTAL,
    },
    {
      name: 'Guided 17 Mile Drive E-Bike Tour',
      subtitle: 'Expert guide, all the best stops on the iconic 17 Mile Drive.',
      price: '$75',
      priceUnit: '/person',
      best: 'This is what we recommend for first-time visitors to Monterey.',
      cta: 'Book Guided Tour →',
      ctaHref: FH.EBIKE_17MILE,
      badge: 'Most Popular',
      featured: true,
    },
    {
      name: 'Private E-Bike Experience',
      subtitle: 'Just your group. Private guide. Custom route. No crowds.',
      price: 'Custom',
      best: 'The best way to see Monterey on your terms.',
      cta: '📞 Call to Book Private →',
      ctaHref: BOOKING_PHONE_HREF,
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
  fleet: {
    heading: 'Our E-Bike Fleet',
    subheading:
      "Three premium brands. All rear-hub 500W motors. We'll match you to the right bike at check-in.",
    sharedSpec: '⚡ 500W rear-hub  ·  5 levels + throttle  ·  Max 280 lbs',
    helpLine: "Not sure which bike is right for you? Call us — we'll help you pick:",
    cards: [
      {
        brand: 'Rad Power Bikes',
        icon: '🏔️',
        title: 'Sport & Fat Tire Frames',
        body:
          "Our most popular fleet. Fat tires handle sand, gravel, and pavement equally well. Multiple frame sizes — best for riders 5'4\" and above who want a more active, confident feel.",
      },
      {
        brand: 'Blix',
        icon: '🚲',
        title: 'Step-Thru Frame',
        body:
          'Low-step design — easiest to mount and dismount. Swept-back handlebars and an upright riding position make this the most comfortable option for casual riders, older guests, and anyone who values comfort over speed.',
      },
      {
        brand: 'AIMA',
        icon: '⚙️',
        title: 'Performance Frame',
        body:
          'Built on all Bafang components — the same drivetrain trusted by e-bike enthusiasts worldwide. Smooth, responsive power delivery across all 5 assist levels. Great for riders who want a more connected, performance-oriented ride.',
      },
    ],
  },
  midPageImage: {
    src: '/ebike-coastal-road.jpg',
    alt: 'Rider on an Adventures By The Sea e-bike along the Monterey coastal trail',
  },
  routesHeading: 'Your Monterey Peninsula, Unlocked',
  routes: [
    {
      name: '17 Mile Drive',
      meta: '17 miles · Half day · Moderate',
      body: 'The iconic coastal route. Lone Cypress, Pebble Beach, Stillwater Cove. Challenging on a standard bike — effortless on an e-bike.',
      chip: 'Most Popular',
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
      text: '"Rode the full 17-Mile Drive and still had battery to spare on the way back. Hills were no problem and the bike handled perfectly. Will rent e-bikes exclusively from now on."',
      author: '— Karen S., Google Review',
    },
  ],
  postReviewsCta: {
    heading: 'Ready to Book?',
    subheading: 'Most guests book within 24 hours of visiting this page.',
    buttonLabel: 'Reserve Your E-Bike →',
    buttonHref: FH.EBIKE_RENTAL,
  },
  faqs: FAQS,
  faqHeading: 'E-Bike FAQ',
  upsellLines: [
    'Upgrade to the guided 17 Mile Drive tour ($75/person)',
    'Extend to 4 hours of self-guided riding ($60)',
    'Book a private group ride — call for pricing',
  ],
  finalCta: {
    title: 'Ready to Ride the Whole Peninsula?',
    subtitle: 'Premium e-bikes. Effortless hills. The full Monterey story.',
    href: FH.EBIKE_RENTAL,
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
      priceFloor: 40,
      priceUnit: 'per 2 hours',
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
