'use client';

import { useEffect } from 'react';
import { trackConversion } from '@/lib/analytics';

/**
 * Global click-delegation conversion tracker.
 *
 * Listens at document level (one listener for the whole app) and fires
 * the Google Ads conversion when the user clicks:
 *
 *   1. A FareHarbor booking link — `<a href="https://fareharbor.com/embeds/book/...">`
 *      OR any link tagged with `data-fh-book`. We do NOT preventDefault or
 *      navigate for these — the FareHarbor Embed API (autolightbox, loaded in
 *      app/layout.tsx) intercepts the same click and opens the booking in a
 *      lightbox overlay, keeping the user on this domain so the GA4 session +
 *      gclid survive. We only fire the GA4 engagement event here.
 *      NOTE: this is a GA4 engagement event (`fareharbor_click`) only — the
 *      real Google Ads "Booking Complete" conversion is fired by FareHarbor
 *      itself when checkout completes, via the `google-conversion-id` and
 *      `google-conversion-label` params appended to FH embed URLs in
 *      lib/booking.ts. Do not import `fareharbor_click` as a conversion in
 *      Google Ads — it would inflate counts and train bidding on clickers,
 *      not bookers.
 *
 *   2. A phone link — `<a href="tel:...">`. The dialer opens immediately;
 *      no navigation deferral needed.
 *
 * This component is mounted once from app/layout.tsx and renders nothing.
 * Adding new tracked elements anywhere in the app does NOT require touching
 * this file — just use the URL pattern or data attribute above.
 */
export function ConversionTracker(): null {
  useEffect(() => {
    function handleClick(e: MouseEvent): void {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const anchor = t.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const isFhUrl = href.includes('fareharbor.com/embeds/book/');
      const isFhAttr = anchor.hasAttribute('data-fh-book');
      const isPhone = href.startsWith('tel:');

      // FareHarbor booking click — fire the GA4 engagement event ONLY.
      // Do NOT preventDefault and do NOT navigate: FareHarbor's autolightbox
      // (app/layout.tsx) intercepts this same click and opens the lightbox,
      // keeping the user on this domain. If the FH script ever fails to load,
      // the native anchor href still navigates as a graceful fallback (and is
      // then decorated by gtag's cross-domain linker).
      if (isFhUrl || isFhAttr) {
        trackConversion({
          type: 'booking',
          ga4Event: 'fareharbor_click',
          ga4Params: { link_url: anchor.href },
        });
        return;
      }

      // Phone click — fire conversion, dialer handles the rest.
      if (isPhone) {
        trackConversion({
          type: 'phone',
          ga4Event: 'phone_click',
          ga4Params: { phone_number: href.replace('tel:', '') },
        });
        return;
      }
    }

    // Capture phase: our GA4 event fires BEFORE FareHarbor's autolightbox
    // handler, so `fareharbor_click` is recorded even if FH stops propagation.
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
