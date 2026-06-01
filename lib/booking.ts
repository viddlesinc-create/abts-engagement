// Centralized FareHarbor booking URLs.
// Every page imports its specific SKU URL from here — do NOT inline FareHarbor
// URLs in page files (that's how every page ended up linking to the same sheet).

const CANNERY = 'https://fareharbor.com/embeds/book/adventuresbythesea-canneryrow/items';
const STILLWATER = 'https://fareharbor.com/embeds/book/adventuresbythesea-stillwatercove/items';
const QS = '?full-items=yes';

// FareHarbor fires the Google Ads conversion natively when a booking COMPLETES
// inside the FH widget, by reading these params off the embed URL. The click
// itself is only a GA4 engagement event (see components/ConversionTracker.tsx);
// the real Ads conversion is owned by FH.
const FH_CONV_ID = process.env.NEXT_PUBLIC_FH_CONV_ID ?? '';
const FH_CONV_LABEL = process.env.NEXT_PUBLIC_FH_CONV_LABEL ?? '';
const GA =
  FH_CONV_ID && FH_CONV_LABEL
    ? `&google-conversion-id=${FH_CONV_ID}&google-conversion-label=${FH_CONV_LABEL}`
    : '';

export const FH = {
  TRAD_BIKE:     `${CANNERY}/84523/${QS}&flow=56536${GA}`,
  EBIKE_RENTAL:  `${CANNERY}/84526/${QS}&flow=56536${GA}`,
  EBIKE_17MILE:  `${CANNERY}/84532/${QS}&flow=56538${GA}`,
  SURREY:        `${CANNERY}/84525/${QS}&flow=56527${GA}`, // 3 + 6 person — party size chosen at checkout
  KAYAK_CANNERY: `${CANNERY}/84529/${QS}&flow=56538${GA}`, // Public Kayak Tour
  KAYAK_PEBBLE:  `${STILLWATER}/85839/${QS}&flow=56148${GA}`,
  KAYAK_PRIVATE: `${CANNERY}/85106/${QS}&flow=56538${GA}`,
} as const;

export const BOOKING_PHONE_HREF = 'tel:+18313721807';
