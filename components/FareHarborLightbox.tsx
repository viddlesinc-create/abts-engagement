'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Opens FareHarbor bookings in a lightbox overlay via the FareHarbor Embed
 * API's `FH.open()`, keeping the user on bookadventuresbythesea.com (so the
 * GA4 session + gclid survive for paid-booking attribution).
 *
 * Why not FareHarbor's built-in `autolightbox=yes`?
 *   autolightbox intercepts the click itself, but first runs a GA4 cross-domain
 *   stitch (the embed cart URL carries `g4=yes`) that calls `getGA4ClientIds`.
 *   On this site that throws:
 *     "getGA4ClientIds … google_tag_manager failed TypeError: Cannot read
 *      properties of undefined (reading 'destination')"
 *   because the GA4 tag (G-W2QRVH1SY8) is not registered in
 *   window.google_tag_manager the way FH expects (only the AW- Ads tag is —
 *   GA4 loads via @next/third-parties, Ads via a separate gtag loader). The
 *   failed handshake aborts the overlay open, so nothing happens on click.
 *   Calling `FH.open()` directly bypasses that path and opens reliably.
 *
 * Interaction with <ConversionTracker />:
 *   ConversionTracker listens in the CAPTURE phase and fires the GA4
 *   `fareharbor_click` event. This component listens in the BUBBLE phase, so
 *   the analytics event fires first, then we preventDefault + open the overlay.
 *
 * Graceful fallback: if window.FH isn't available yet (script blocked/slow),
 * we do NOT preventDefault — the native anchor navigates to fareharbor.com
 * (and gtag's cross-domain linker decorates that real navigation with _gl).
 */

type FhOpenOptions = {
  shortname: string;
  fallback: 'simple';
  fullItems: string;
  flow?: number;
  /**
   * Online booking reference tagged onto bookings that complete inside the FH
   * widget (FH.open's documented `ref` option). We set it to `<slug>:<intent>`
   * so every completed booking carries its source page + CTA intent in the
   * FareHarbor dashboard — closing the attribution loop on the FH side (GA4
   * already has the click via <ConversionTracker />).
   */
  ref?: string;
  view: { item: number };
};

declare global {
  interface Window {
    FH?: { open: (opts: FhOpenOptions) => void; close?: () => void };
  }
}

/**
 * Parse a FareHarbor booking href into FH.open() options.
 * Example href:
 *   https://fareharbor.com/embeds/book/<shortname>/items/<item>/?full-items=yes&flow=<flow>&...
 */
function parseFareHarborHref(href: string): FhOpenOptions | null {
  const match = href.match(/\/embeds\/book\/([^/]+)\/items\/(\d+)\//);
  if (!match) return null;

  let flow: number | undefined;
  let fullItems = 'yes';
  try {
    const params = new URL(href).searchParams;
    const flowRaw = params.get('flow');
    if (flowRaw && /^\d+$/.test(flowRaw)) flow = Number(flowRaw);
    fullItems = params.get('full-items') ?? 'yes';
  } catch {
    // malformed URL — fall back to the path-only values
  }

  return {
    shortname: match[1],
    fallback: 'simple',
    fullItems,
    ...(flow !== undefined ? { flow } : {}),
    view: { item: Number(match[2]) },
  };
}

/**
 * Build the FH `ref` from the current page slug + the clicked CTA's intent.
 * Examples: "bike-rentals-monterey:upgrade", "kayak-tours-monterey-bay:cta".
 * utm_content (if present on the page URL) wins over the slug so paid clicks
 * carry the ad's content tag straight through to the completed booking.
 */
function buildBookingRef(anchor: HTMLAnchorElement): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
  let source = slug;
  try {
    const utmContent = new URL(window.location.href).searchParams.get('utm_content');
    if (utmContent) source = utmContent;
  } catch {
    // malformed location — fall back to slug
  }
  const intent = anchor.dataset.intent ?? 'cta';
  return `${source}:${intent}`;
}

export function FareHarborLightbox(): null {
  const pathname = usePathname();

  // Close any open overlay when the SPA navigates to a new route, so it can't
  // linger over a page it no longer belongs to. FH.close() is a no-op (returns
  // false) when nothing is open. Documented in the Advanced Lightframe API.
  useEffect(() => {
    window.FH?.close?.();
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent): void {
      // Let the browser handle modified clicks (new tab/window) natively.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank') return;

      const href = anchor.getAttribute('href') ?? '';
      if (!href.includes('fareharbor.com/embeds/book/')) return;

      // No FH API yet → let the native navigation happen as a fallback.
      if (typeof window.FH?.open !== 'function') return;

      const opts = parseFareHarborHref(href);
      if (!opts) return;

      const ref = buildBookingRef(anchor);
      if (ref) opts.ref = ref;

      e.preventDefault();
      window.FH.open(opts);
    }

    // Bubble phase: runs after ConversionTracker's capture-phase GA4 event.
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
