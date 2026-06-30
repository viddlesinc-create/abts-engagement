'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getClickId, hasTrackingConsent, type ClickIdType } from '@/lib/click-id';

/** Hard cap on the `ref` we send FareHarbor. The click ID leads (see
 *  buildBookingRef), so if FareHarbor truncates its stored reference only the
 *  less-important `source:intent` tail is lost, never the click ID. */
const MAX_REF_LEN = 120;

/** Mode A/B switch (Fix B plan). Mode A (false) = raw click ID in `ref`. Flip to
 *  Mode B only if the validation gate shows FareHarbor truncates the full click
 *  ID — that path POSTs the click ID to a token endpoint and puts a short token
 *  in `ref` instead. Mode B needs a Netlify Function (the site is `output:
 *  'export'`, so a Next.js API route won't run); not built yet. */
const USE_TOKEN = false;

/** One-char type code so the click-ID TYPE travels inside `ref`. The agency-side
 *  upload job reads `ref` off the booking and never sees our cookie, so without
 *  this it couldn't tell a gbraid/wbraid (iOS/privacy) value from a gclid and
 *  would map it to the wrong Google Ads field. */
const TYPE_CODE: Record<ClickIdType, string> = { gclid: 'g', gbraid: 'b', wbraid: 'w' };

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
   * widget (FH.open's documented `ref` option). Base value is `<slug>:<intent>`
   * (source page + CTA intent) for FareHarbor-dashboard attribution. When a
   * Google click ID was captured, it is prepended as `<typecode>.<clickid>~<base>`
   * so the booking can be matched back to the paid click via offline conversion
   * upload. See buildBookingRef() and lib/click-id.ts.
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
 * Build the FH `ref` for the clicked CTA.
 *
 * Base attribution = "<source>:<intent>" (FareHarbor-dashboard origin tagging):
 *   - source = utm_content (if on the page URL) else the page slug, so paid
 *     clicks carry the ad's content tag straight through to the completed booking.
 *   - intent = the clicked CTA's data-intent (else "cta").
 *   Examples: "bike-rentals-monterey:upgrade", "kayak-tours-monterey-bay:cta".
 *
 * When a Google click ID was captured this session (lib/click-id.ts), it is
 * prepended as "<typecode>.<clickid>~<base>" — e.g. "g.Cj0KCQ...~bike:upgrade".
 * The click ID LEADS so a FareHarbor length cap can only truncate the base tail,
 * never the click ID (the value the offline-conversion upload job needs). The
 * type code (g/b/w) lets that job route the value to the right Google Ads field.
 * No-op enrichment when consent is denied or no click ID is present.
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
  const base = `${source}:${intent}`;

  const click = getClickId();
  if (!click || !hasTrackingConsent()) return base;

  // Mode A: raw click ID in `ref`. Mode B (USE_TOKEN) would swap click.id for a
  // short server-resolved token; not built until the validation gate proves
  // FareHarbor truncates the raw value (and it needs a Netlify Function).
  const value = USE_TOKEN ? click.id : click.id;
  const combined = `${TYPE_CODE[click.type]}.${value}~${base}`;
  return combined.slice(0, MAX_REF_LEN);
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
