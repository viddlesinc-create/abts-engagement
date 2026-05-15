// Centralized FareHarbor booking URLs.
// Every page imports its specific SKU URL from here — do NOT inline FareHarbor
// URLs in page files (that's how every page ended up linking to the same sheet).

const CANNERY = 'https://fareharbor.com/embeds/book/adventuresbythesea-canneryrow/items';
const STILLWATER = 'https://fareharbor.com/embeds/book/adventuresbythesea-stillwatercove/items';
const QS = '?full-items=yes';

export const FH = {
  TRAD_BIKE:     `${CANNERY}/84523/${QS}&flow=56536`,
  EBIKE_RENTAL:  `${CANNERY}/84526/${QS}&flow=56536`,
  EBIKE_17MILE:  `${CANNERY}/84532/${QS}&flow=56538`,
  SURREY:        `${CANNERY}/84525/${QS}&flow=56527`, // 3 + 6 person — party size chosen at checkout
  KAYAK_CANNERY: `${CANNERY}/84529/${QS}&flow=56538`, // Public Kayak Tour
  KAYAK_PEBBLE:  `${STILLWATER}/85839/${QS}&flow=56148`,
  KAYAK_PRIVATE: `${CANNERY}/85106/${QS}&flow=56538`,
} as const;

export const BOOKING_PHONE_HREF = 'tel:+18313721807';
