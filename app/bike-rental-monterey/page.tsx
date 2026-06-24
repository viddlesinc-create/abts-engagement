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
import { FH } from '@/lib/booking';

const PAGE_PATH = '/bike-rental-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Monterey Bike Rental',
  description:
    'Rent bikes in Monterey Bay by the hour or day. Beach cruisers, hybrids, and family bikes. Easy online booking. Multiple locations near Cannery Row.',
  alternates: { canonical: PAGE_PATH },
};

const FAQS: Faq[] = [
  {
    question: 'What types of bikes do you offer for rent in Monterey?',
    answer:
      'We offer beach cruisers, hybrid/comfort bikes, e-bikes, 3-person and 6-person surreys, and kids bikes and trailers. Every bike is maintained to tour-ready condition.',
  },
  {
    question: 'How long can I rent a bike?',
    answer:
      'We offer hourly and full-day rentals. Most guests rent for 2–4 hours. Full-day rentals are ideal if you want to tackle the 17 Mile Drive.',
  },
  {
    question: 'Where do I pick up and drop off my rental?',
    answer:
      'Our main location is on Cannery Row in Monterey. Address: 299 Cannery Row, Monterey, CA 93940. Drop-off is at the same location.',
  },
  {
    question: 'Do I need a reservation or can I walk in?',
    answer:
      'Reservations are recommended, especially on weekends and holidays. Walk-ins are welcome based on availability.',
  },
  {
    question: 'Are helmets included with the bike rental?',
    answer: 'Yes, helmets are included with every rental at no extra charge.',
  },
  {
    question: 'Do you offer family bikes or bikes for kids?',
    answer:
      'Yes. We have kids bikes, trailer attachments, and 3-person and 6-person surreys that the whole family can ride together.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Bike Rentals · Monterey, CA',
    title: 'Monterey Bike Rentals — Explore the Coast Your Way',
    subtitle:
      'Beach cruisers, hybrids, e-bikes, and family bikes available by the hour or day. Easy pickup near Cannery Row.',
    pricePill: 'From $13/hour',
    primaryCta: 'Reserve Your Bike →',
    primaryCtaHref: FH.TRAD_BIKE,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Hybrid-Bicycle-Rental-image-2.jpg',
  },
  trustBadges: [
    '⭐ 4.9 stars · 1,400+ Google reviews',
    '🏆 30+ Years on Monterey Bay',
    '👨‍👩‍👧 All Ages Welcome',
    '📅 Open Daily',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Choose Your Bike & Date',
      body: 'Pick your bike type, rental duration, and preferred date online in minutes.',
    },
    {
      num: 2,
      title: 'Pick Up at Cannery Row',
      body: 'Grab your helmet, lock, and route map at our Cannery Row location.',
    },
    {
      num: 3,
      title: 'Ride the Coastal Paths',
      body: "Explore Monterey Bay's stunning scenic paths at your own pace.",
    },
  ],
  ladderHeading: 'Choose Your Experience',
  ladderSubheading:
    'Not sure which to pick? 60% of our guests upgrade to electric once they see the difference.',
  ladder: [
    {
      name: 'Classic Bike Rental',
      subtitle: 'Beach cruiser or hybrid. $13/hr · $45 / 4 hours · $55 / whole day.',
      price: '$13',
      priceUnit: '/hr',
      best: 'Best for: Easy riders, short distances, flat terrain.',
      cta: 'Book Classic →',
      ctaHref: FH.TRAD_BIKE,
    },
    {
      name: 'Electric Bike Rental',
      subtitle: 'Pedal-assist motor. Go twice as far. Handle any hill.',
      price: '$40',
      priceUnit: '/ 2 hours',
      best: 'Most guests choose this. Best for 17 Mile Drive, mixed-ability groups.',
      cta: 'Reserve E-Bike — Most Popular →',
      ctaHref: FH.EBIKE_RENTAL,
      badge: 'Most Popular',
      featured: true,
    },
    {
      name: 'Guided E-Bike Tour',
      subtitle: 'E-bike + expert local guide. The full Monterey story, effortlessly.',
      price: '$75',
      priceUnit: '/person',
      best: 'Best for: First-time visitors who want to see everything.',
      cta: 'Book Guided Tour →',
      ctaHref: FH.EBIKE_17MILE,
      badge: 'Best Experience',
    },
  ],
  included: [
    'Helmet',
    'Route map of Monterey Bay coastal paths',
    'Bike lock',
    'Safety orientation',
  ],
  routesHeading: 'Recommended Routes',
  routes: [
    {
      name: 'Cannery Row to Pacific Grove',
      meta: '5 miles · ~1 hour · Easy',
      body: 'A flat, scenic ride along the coast through the historic Cannery Row district and into charming Pacific Grove.',
    },
    {
      name: '17 Mile Drive',
      meta: '17 miles · Half day · Moderate',
      body: 'Iconic coastal route through Pebble Beach. Lone Cypress, ocean vistas, and dramatic bluffs.',
      chip: 'Best on E-Bike',
    },
    {
      name: 'Lovers Point Beach Loop',
      meta: '3 miles · ~45 min · Easy',
      body: 'A quick, beautiful loop perfect for families or a relaxed morning ride along the Pacific Grove coast.',
    },
  ],
  reviews: [
    {
      stars: 5,
      text: '"Best way to see Monterey! We rented for 3 hours and rode all the way to Pacific Grove. Staff was super helpful. Will definitely be back."',
      author: '— Sarah M., Google Review',
    },
    {
      stars: 5,
      text: '"Perfect for our family of four. Kids loved it and the route map made everything easy. Great value."',
      author: '— James T., TripAdvisor',
    },
    {
      stars: 5,
      text: '"Bikes were in great shape and the team had us set up in minutes. Highly recommend for anyone visiting the area."',
      author: '— Linda K., Google Review',
    },
  ],
  faqs: FAQS,
  faqHeading: 'Bike Rental FAQ',
  upsellLines: [
    'Upgrade to e-bike ($40 / 2 hours)',
    'Book the guided 17 Mile Drive tour ($75/person)',
    'Add an extra hour (+$13)',
  ],
  finalCta: {
    title: 'Book Your Monterey Bike Rental',
    subtitle: 'No experience necessary. All ages welcome. Easy online booking.',
    href: FH.TRAD_BIKE,
  },
};

export default function BikeRentalMontereyPage() {
  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.url}/` },
      { name: 'Bike Rental Monterey', url: PAGE_URL },
    ]),
    bikeRentalServiceSchema({
      pageUrl: PAGE_URL,
      serviceType: 'Bike Rental',
      description:
        'Beach cruisers, hybrids, e-bikes, and family bikes by the hour or day. Pickup at Cannery Row, Monterey.',
      priceFloor: 13,
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
