/**
 * CLIENT_PROFILE — typed export of every fact the schema generators, pages,
 * and conversion-tracking code consume. Mirror of abts-engagement/lib/client-profile.ts
 * so when the two repos are merged this file is byte-identical.
 */

export const CLIENT_PROFILE = {
  brand: {
    name: 'Adventures by the Sea',
    alternateName: 'ABTS',
    domain: 'adventuresbythesea.com',
    foundingYear: 1987,
    yearsOperating: 38,
    description:
      'Family-owned bike, e-bike, kayak, and SUP rentals on the Monterey Peninsula since 1987. Six locations across Monterey, Pacific Grove, and Pebble Beach.',
    logoUrl: '/images/abts-logo.svg',
    heroImageUrl: '/images/hero-cannery-row.jpg',
  },

  owners: {
    current: ['Kyle Wareham', 'Liz Wareham'],
    sinceYear: 2018,
    foundingFamily: 'Knight family (Frank Knight)',
    family: 'Daughter Harper',
  },

  contact: {
    mainPhone: '+1-831-372-1807',
    mainPhoneDisplay: '831-372-1807',
    teamBuildingSalesPhone: '+1-831-648-7236',
    teamBuildingSalesPhoneDisplay: '831-648-7236',
    mainEmail: 'sales@adventuresbythesea.com',
    teamBuildingEmail: 'kyle@adventuresbythesea.com',
    mainAddress: {
      streetAddress: '299 Cannery Row',
      addressLocality: 'Monterey',
      addressRegion: 'CA',
      postalCode: '93940',
      addressCountry: 'US',
    },
    hoursGeneral: '9:00am – Sunset',
    salesHours: 'Mon–Fri 9a–5p PT',
  },

  socialProfiles: [
    'https://www.facebook.com/AdventuresbytheSea',
    'https://www.instagram.com/adventuresbythesea/',
    'https://www.tripadvisor.com/Attraction_Review-g32737-d2253933-Reviews-Adventures_by_the_Sea-Monterey_Monterey_County_California.html',
    'https://www.yelp.com/biz/adventures-by-the-sea-monterey-2',
    'https://www.youtube.com/channel/UCYeSPH8a3APvyebaWDoSu3Q',
  ],

  serviceArea: ['Monterey, CA', 'Pacific Grove, CA', 'Pebble Beach, CA', 'Carmel, CA'],

  pricingFloors: {
    traditionalBikeRental: 27.82,
    eBikeRental: 42.8,
    kayakRental: 42.8,
    paddleBoardRental: 37.45,
    publicKayakTour: 69.55,
    surreyRental: 77.04,
    eBike17MileDriveTour: 80.25,
    verifiedDate: '2026-05-01',
  },

  groupCapacity: {
    standardMin: 12,
    standardMax: 200,
    beachOlympicsMin: 15,
    beachOlympicsMax: 400,
    challengeBySeaMax: 50,
    guideRatio: '1:10',
  },

  formspreeEndpoint: 'https://formspree.io/f/mdabzeqy',

  aggregateRating: null as null | {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    sourcePlatform: string;
    verifiedDate: string;
  },
} as const;

export type ClientProfile = typeof CLIENT_PROFILE;
