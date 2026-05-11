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
 *      OR any link tagged with `data-fh-book`. Navigation is deferred until
 *      the tag fires.
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

      // FareHarbor booking click — defer navigation, fire conversion.
      if (isFhUrl || isFhAttr) {
        // Skip if the user is intentionally opening in a new tab/window.
        const newTab =
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.button !== 0 ||
          anchor.target === '_blank';

        if (newTab) {
          // Fire-and-forget; the new tab will navigate itself.
          trackConversion({
            type: 'booking',
            ga4Event: 'fareharbor_click',
            ga4Params: { link_url: anchor.href },
          });
          return;
        }

        e.preventDefault();
        trackConversion({
          type: 'booking',
          navigateTo: anchor.href,
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

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
