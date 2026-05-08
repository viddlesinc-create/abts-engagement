/**
 * JSON-LD schema generators. Mirror of abts-engagement/lib/schema.ts.
 *
 * Anti-fabrication rule: aggregateRating is OMITTED unless verified.
 * Phone numbers ship in +1-XXX-XXX-XXXX format. Validate every block at
 * https://search.google.com/test/rich-results before publishing.
 */

import { CLIENT_PROFILE } from './client-profile';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bookadventuresbythesea.com';
const PARENT_BRAND_URL = `https://${CLIENT_PROFILE.brand.domain}`;
const PARENT_BRAND_ID = `${PARENT_BRAND_URL}/#brand`;

type FAQ = { question: string; answer: string };

export function brandLocalBusinessSchema() {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': PARENT_BRAND_ID,
    name: CLIENT_PROFILE.brand.name,
    alternateName: CLIENT_PROFILE.brand.alternateName,
    description: CLIENT_PROFILE.brand.description,
    url: PARENT_BRAND_URL,
    telephone: CLIENT_PROFILE.contact.mainPhone,
    image: `${PARENT_BRAND_URL}${CLIENT_PROFILE.brand.heroImageUrl}`,
    logo: `${PARENT_BRAND_URL}${CLIENT_PROFILE.brand.logoUrl}`,
    priceRange: '$$',
    foundingDate: String(CLIENT_PROFILE.brand.foundingYear),
    founder: [{ '@type': 'Organization', name: CLIENT_PROFILE.owners.foundingFamily }],
    address: {
      '@type': 'PostalAddress',
      ...CLIENT_PROFILE.contact.mainAddress,
    },
    areaServed: CLIENT_PROFILE.serviceArea,
    sameAs: CLIENT_PROFILE.socialProfiles,
  };

  if (CLIENT_PROFILE.aggregateRating) {
    base.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(CLIENT_PROFILE.aggregateRating.ratingValue),
      reviewCount: String(CLIENT_PROFILE.aggregateRating.reviewCount),
      bestRating: String(CLIENT_PROFILE.aggregateRating.bestRating),
    };
  }

  return base;
}

export function faqPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function touristAttractionSchema(args: {
  pageUrl: string;
  name: string;
  description: string;
  telephone: string;
  programs: { name: string; category: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: args.name,
    description: args.description,
    url: args.pageUrl,
    telephone: args.telephone,
    address: {
      '@type': 'PostalAddress',
      ...CLIENT_PROFILE.contact.mainAddress,
    },
    areaServed: CLIENT_PROFILE.serviceArea,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Group & Corporate Programs',
      itemListElement: args.programs.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        category: p.category,
      })),
    },
  };
}

export function bikeRentalServiceSchema(args: {
  pageUrl: string;
  serviceType: string;
  description: string;
  priceFloor: number;
  priceUnit: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: args.serviceType,
    provider: { '@id': PARENT_BRAND_ID },
    areaServed: CLIENT_PROFILE.serviceArea,
    description: args.description,
    url: args.pageUrl,
    offers: {
      '@type': 'Offer',
      price: String(args.priceFloor),
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(args.priceFloor),
        priceCurrency: 'USD',
        unitText: args.priceUnit,
      },
      availability: 'https://schema.org/InStock',
    },
  };
}

export function touristTripSchema(args: {
  pageUrl: string;
  name: string;
  description: string;
  priceFloor: number;
  priceUnit?: string;
  itinerary?: string[];
}) {
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    price: String(args.priceFloor),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  };
  if (args.priceUnit) {
    offer.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: String(args.priceFloor),
      priceCurrency: 'USD',
      unitText: args.priceUnit,
    };
  }
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: args.name,
    description: args.description,
    url: args.pageUrl,
    provider: { '@id': PARENT_BRAND_ID },
    offers: offer,
  };
  if (args.itinerary && args.itinerary.length > 0) {
    schema.itinerary = {
      '@type': 'ItemList',
      itemListElement: args.itinerary,
    };
  }
  return schema;
}

/**
 * Inline JSON-LD as a server-rendered <script> tag. The JSON-LD ships in the
 * prerendered HTML, no client JS required.
 */
export function jsonLdScript(schema: object | object[]) {
  return {
    __html: JSON.stringify(schema),
  };
}

export const SITE = { url: SITE_URL, brandUrl: PARENT_BRAND_URL };
