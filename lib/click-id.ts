/**
 * Google click-ID capture + persistence (ABTS "Fix B" offline attribution).
 *
 * WHY THIS EXISTS
 *   The FareHarbor booking completes inside an iframe, so ~96% of paid bookings
 *   can't be tied back to the Google Ads click that drove them. This util
 *   captures the click ID on landing, persists it for 90 days, and exposes it so
 *   the booking handler can carry it into FareHarbor's `ref` (online booking
 *   reference). An agency-side job later reads `ref` off each new booking and
 *   uploads it to the Google Ads offline conversion action (deterministic
 *   click -> booking attribution). See PLAN-fareharbor-ref-and-close history /
 *   the Fix B plan for the full pipeline.
 *
 * SCOPE
 *   Capture + persist + read only. The carry-into-ref step lives in
 *   components/FareHarborLightbox.tsx (buildBookingRef). This module is plain TS
 *   (no React), SSR-safe, and never throws — storage access is wrapped because
 *   Safari private mode / cookie-blocked contexts can throw on write.
 *
 * THREE CLICK-ID FLAVORS (Google)
 *   gclid  — standard web click ID.
 *   gbraid — iOS app -> web (privacy-preserving), set when no gclid is available.
 *   wbraid — web -> app (privacy-preserving). gbraid/wbraid must be uploaded to
 *            their OWN Google Ads fields, never merged with hashed PII — which is
 *            why we persist the TYPE alongside the value and encode it into `ref`.
 */

const STORAGE_KEY = '_abts_click';
const NINETY_DAYS_SEC = 90 * 24 * 60 * 60; // 7,776,000
const NINETY_DAYS_MS = NINETY_DAYS_SEC * 1000;
/** Hard cap on the stored value so a malformed URL can't bloat the cookie/ref. */
const MAX_VALUE_LEN = 200;

export type ClickIdType = 'gclid' | 'gbraid' | 'wbraid';

export type ClickId = {
  id: string;
  type: ClickIdType;
};

/** Persisted shape: { v: value, t: type, ts: capture-time-ms }. Kept terse to
 *  stay well under cookie size limits. */
type StoredClickId = {
  v: string;
  t: ClickIdType;
  ts: number;
};

/**
 * Consent gate. Defaults to GRANTED — matching the site's current posture (GA4 +
 * Ads tags already fire unconditionally; US small-biz, no CMP). Forward-compatible:
 * if a consent layer is added later it only needs to set
 * `window.__abts_consent = 'denied'` (or flip it on `gtag('consent', ...)`) and
 * capture + carry both stop. Returns false ONLY on an explicit denial signal.
 */
export function hasTrackingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if ((window as { __abts_consent?: string }).__abts_consent === 'denied') {
      return false;
    }
  } catch {
    // ignore — default to granted below
  }
  return true;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    const prefix = `${name}=`;
    for (const part of document.cookie.split('; ')) {
      if (part.startsWith(prefix)) {
        return decodeURIComponent(part.slice(prefix.length));
      }
    }
  } catch {
    // document.cookie can throw in sandboxed iframes — treat as absent
  }
  return null;
}

function writeCookie(name: string, value: string, maxAgeSec: number): void {
  if (typeof document === 'undefined') return;
  try {
    const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; SameSite=Lax${secure}`;
  } catch {
    // cookie-blocked context — localStorage fallback still applies
  }
}

function persist(record: StoredClickId): void {
  const json = JSON.stringify(record);
  writeCookie(STORAGE_KEY, json, NINETY_DAYS_SEC);
  try {
    window.localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // private mode / quota — cookie is the source of truth anyway
  }
}

/**
 * Pull the gclid out of Google's first-party `_gcl_aw` cookie when the URL param
 * is absent (e.g. user landed earlier in the session, navigated, then booked).
 * Format: `GCL.<timestamp>.<gclid>`. The gclid itself can contain dots, so take
 * EVERYTHING after the second segment — not just the last dot-segment, which
 * would clip a dotted value.
 */
function readGclAwFallback(): string | null {
  const raw = readCookie('_gcl_aw');
  if (!raw) return null;
  const parts = raw.split('.');
  if (parts.length < 3) return null;
  const id = parts.slice(2).join('.');
  return id || null;
}

/**
 * Capture the click ID on the current page load and persist it (90-day window).
 *
 * Priority: a click ID present on the URL always wins (newer click overwrites the
 * stored one). If the URL has none, fall back to `_gcl_aw` — but only when nothing
 * is already stored, so we don't clobber a fresher first-party capture. No-op when
 * consent is denied or when called server-side.
 */
export function captureClickId(): void {
  if (typeof window === 'undefined') return;
  if (!hasTrackingConsent()) return;

  let params: URLSearchParams | null = null;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = null;
  }

  // URL params, in preference order. gclid is the common case; gbraid/wbraid are
  // the privacy-preserving iOS/app variants Google sends when gclid is unavailable.
  const order: ClickIdType[] = ['gclid', 'gbraid', 'wbraid'];
  if (params) {
    for (const type of order) {
      const value = params.get(type);
      if (value) {
        persist({ v: value.slice(0, MAX_VALUE_LEN), t: type, ts: Date.now() });
        return;
      }
    }
  }

  // No URL param — only seed from _gcl_aw if we have nothing stored yet.
  if (getClickId() === null) {
    const fallback = readGclAwFallback();
    if (fallback) {
      persist({ v: fallback.slice(0, MAX_VALUE_LEN), t: 'gclid', ts: Date.now() });
    }
  }
}

function parseStored(json: string | null): StoredClickId | null {
  if (!json) return null;
  try {
    const obj = JSON.parse(json) as Partial<StoredClickId>;
    if (
      obj &&
      typeof obj.v === 'string' &&
      obj.v.length > 0 &&
      (obj.t === 'gclid' || obj.t === 'gbraid' || obj.t === 'wbraid') &&
      typeof obj.ts === 'number'
    ) {
      return { v: obj.v, t: obj.t, ts: obj.ts };
    }
  } catch {
    // malformed — treat as absent
  }
  return null;
}

/**
 * Read back the persisted click ID, or null if absent / expired (90 days).
 * Cookie is the source of truth; localStorage is a fallback for the case where
 * the cookie was dropped but storage survived.
 */
export function getClickId(): ClickId | null {
  if (typeof window === 'undefined') return null;

  let record = parseStored(readCookie(STORAGE_KEY));
  if (!record) {
    try {
      record = parseStored(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      record = null;
    }
  }
  if (!record) return null;

  if (Date.now() - record.ts > NINETY_DAYS_MS) return null;
  return { id: record.v, type: record.t };
}
