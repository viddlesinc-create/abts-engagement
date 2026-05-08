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

const PAGE_PATH = '/surrey-bike-rental-monterey/';
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const FH_BOOK =
  'https://fareharbor.com/embeds/book/adventuresbythesea-canneryrow/items/84523/calendar/?ref=https://adventuresbythesea.com&back=https://adventuresbythesea.com/cannery-row/';

export const metadata: Metadata = {
  title:
    'Surrey Bike Rental Monterey | 3 & 6 Person Surreys at Portola Hotel + Cannery Row | Adventures By The Sea',
  description:
    'Rent a 3-person or 6-person surrey bike on the Monterey Peninsula. Pick up at Portola Hotel or Cannery Row. The whole family in one ride. From $77.04/hr.',
  alternates: { canonical: PAGE_PATH },
};

const FAQS: Faq[] = [
  {
    question: 'How many people can ride a surrey?',
    answer:
      'We rent two surrey models — a 3-person surrey and a 6-person surrey. Adults pedal in front, additional riders sit on the back bench. No 4-person surrey.',
  },
  {
    question: 'Do kids need to be a certain age to ride in the surrey?',
    answer: 'No minimum age. Kids of any age ride in the back seats with parents pedaling.',
  },
  {
    question: 'Is the surrey hard to pedal?',
    answer:
      "It's slower than a regular bike but flat and easy on the Recreation Trail. Two adults pedaling share the work.",
  },
  {
    question: 'Where can I take a surrey?',
    answer:
      'The Monterey Recreation Trail near Cannery Row and Portola Hotel. Surreys are not designed for the 17 Mile Drive.',
  },
  {
    question: 'Where do I pick up the surrey?',
    answer:
      'Two locations: Portola Hotel (210 Alvarado Street, Monterey) — our highest-volume surrey rental — and Cannery Row (299 Cannery Row, Monterey).',
  },
  {
    question: 'How long can I rent a surrey?',
    answer: 'Hourly rentals starting at 1 hour. Most families book 2 hours.',
  },
  {
    question: 'Is a helmet required?',
    answer:
      'Adults are recommended to wear helmets. Kids under 18 in California must wear helmets — included free.',
  },
  {
    question: 'Can my dog ride in the surrey?',
    answer: 'Small dogs can ride in the front basket if comfortable. Confirm with our team at pickup.',
  },
];

const DATA: PillarPageProps = {
  hero: {
    eyebrow: 'Family Surrey Rentals · Monterey, CA',
    title: 'Surrey Bike Rentals in Monterey — The Whole Family in One Ride',
    subtitle:
      "3-person and 6-person surreys. Everyone pedals (or doesn't). All ages, all fitness levels. The Recreation Trail and Monterey coast in one shared experience.",
    pricePill: 'From $77.04/hour',
    primaryCta: 'Reserve a Surrey →',
    primaryCtaHref: FH_BOOK,
    backgroundImage:
      'https://adventuresbythesea.com/wp-content/uploads/sites/1900/2018/10/Surrey-Rental-image-1.jpg',
  },
  trustBadges: [
    '👨‍👩‍👧‍👦 All Ages Welcome',
    '📍 Portola Hotel + Cannery Row',
    '🚲 3 or 6 person models',
    '🐕 Dogs OK in front basket',
  ],
  howItWorks: [
    {
      num: 1,
      title: 'Pick 3-person or 6-person',
      body: 'Adults pedal in front, kids and additional riders relax on the bench in back.',
    },
    {
      num: 2,
      title: 'Pick Up at Portola Hotel or Cannery Row',
      body: 'Quick safety brief and route map at either location. Helmets included for kids.',
    },
    {
      num: 3,
      title: 'Ride the Recreation Trail',
      body: "Flat, paved coastal trail — no hills. Two adults share the pedaling. Everyone's together.",
    },
  ],
  ladderHeading: 'Pick Your Surrey',
  ladder: [
    {
      name: '3-Person Surrey',
      subtitle: 'Two adults pedal up front, one rider on the back bench.',
      price: '$77.04',
      priceUnit: '/hr',
      best: 'Best for: Couples + 1 child, or 3 adults sharing the ride.',
      cta: 'Book 3-Person →',
      ctaHref: FH_BOOK,
    },
    {
      name: '6-Person Surrey',
      subtitle: 'Two adults pedal, four ride in back. Whole family covered.',
      price: 'Call',
      best: 'Best for: Families of 4–6, multi-generational groups.',
      cta: '📞 Call for Availability',
      ctaHref: 'tel:+18313721807',
      badge: 'Most Popular',
      featured: true,
    },
    {
      name: 'Combine With Bikes',
      subtitle: 'Adults pedal regular bikes alongside the kids in the surrey.',
      price: 'Mix',
      best: 'Best for: Mixed-age groups where some riders want their own ride.',
      cta: 'Book a Mix →',
      ctaHref: FH_BOOK,
    },
  ],
  included: [
    'Surrey bike (3 or 6 person)',
    'Helmets for all riders under 18',
    'Route map of the Recreation Trail',
    'Safety orientation',
    'Front basket for bags or small dogs',
  ],
  routesHeading: 'Surrey-Friendly Routes',
  routes: [
    {
      name: 'Cannery Row Loop',
      meta: '2 miles · ~1 hour · Easy',
      body: 'Down Cannery Row, past the Aquarium, along the Recreation Trail to Lovers Point and back.',
    },
    {
      name: 'Pacific Grove Coastline',
      meta: '5 miles · ~2 hour · Easy',
      body: 'Cannery Row to Lovers Point, then continue along the Pacific Grove coast for ocean views.',
      chip: 'Family Favorite',
    },
    {
      name: 'Portola → Custom House Plaza',
      meta: '1.5 miles · ~45 min · Easy',
      body: 'Pedal from Portola Hotel down to the historic waterfront, Fisherman\'s Wharf, and back.',
    },
  ],
  reviews: [
    {
      stars: 5,
      text: '"Best part of our family trip. Grandma rode in back, kids took turns pedaling. We laughed the whole way to Lovers Point."',
      author: '— Maria F., Google Review',
    },
    {
      stars: 5,
      text: '"6-person surrey was perfect for the cousins. Easy to pedal once you get going. We\'ll be back next year."',
      author: '— Tony R., TripAdvisor',
    },
    {
      stars: 5,
      text: '"Picked up at Portola Hotel — couldn\'t have been easier. Staff loaded the kids in and we were off in 5 minutes."',
      author: '— Jennifer L., Google Review',
    },
  ],
  faqs: FAQS,
  faqHeading: 'Surrey Rental FAQ',
  upsellLines: [
    'Add an extra hour ($77.04)',
    'Add a regular bike for the older kid (+$27.82/hr)',
    'Book a guided photo session along the route',
  ],
  finalCta: {
    title: 'Reserve Your Family Surrey',
    subtitle: 'Pick up at Portola Hotel or Cannery Row. All ages welcome.',
    href: FH_BOOK,
  },
};

export default function SurreyBikeRentalMontereyPage() {
  const schemaBlocks = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE.url}/` },
      { name: 'Surrey Bike Rental Monterey', url: PAGE_URL },
    ]),
    bikeRentalServiceSchema({
      pageUrl: PAGE_URL,
      serviceType: 'Surrey Bike Rental',
      description:
        '3-person and 6-person surreys for families. Pickup at Portola Hotel and Cannery Row, Monterey.',
      priceFloor: 77.04,
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
