# Handoff — Remaining FareHarbor / Google Ads tracking work

**Repo:** `viddlesinc-create/abts-engagement` (Next.js 15 App Router, `output: 'export'`, deployed to Netlify → `bookadventuresbythesea.com`)
**Audience:** a fresh Claude Cowork session (assume no memory of prior work)
**Status of the core work:** DONE and live. This doc covers only the two follow-ups.

---

## Background (what already shipped)

FareHarbor booking CTAs used to do a full-page redirect to `fareharbor.com`, which broke Google Ads attribution (the GA4 session + `gclid` didn't survive the cross-domain jump — and the old `window.location.href` redirect bypassed gtag's linker so `_gl` was never written).

Two PRs fixed this:
- **PR #1** — converted CTAs toward a FareHarbor lightbox (loaded `?autolightbox=yes`, removed `ConversionTracker`'s self-redirect, moved its listener to the capture phase).
- **PR #2** — `autolightbox` turned out NOT to open on this site (see Issue #2 below), so it was replaced with an explicit `FH.open()` call in `components/FareHarborLightbox.tsx`. Bookings now open in an overlay and the top URL stays on `bookadventuresbythesea.com`. Verified live on the kayak and surrey LPs.

Key files:
- `app/layout.tsx` — loads FareHarbor Embed API `https://fareharbor.com/embeds/api/v1/` (NO `autolightbox`) + mounts `<ConversionTracker />` and `<FareHarborLightbox />`.
- `components/FareHarborLightbox.tsx` — click handler → `FH.open({ shortname, fallback:'simple', fullItems, flow, view:{ item } })`, parsed from the anchor href.
- `components/ConversionTracker.tsx` — capture-phase delegated click listener; fires GA4 `fareharbor_click` (a click engagement event, NOT a conversion) + the `phone`/`form` Google Ads conversions.
- `lib/analytics.ts` — GA4_ID `G-W2QRVH1SY8`, GADS_ID `AW-18137623591`, per-page conversion catalog + `trackConversion()`.
- `lib/booking.ts` — centralized FareHarbor URLs + `google-conversion-id`/`label` params.

---

## TASK 1 — Make completed bookings count as a Google Ads conversion (PRIORITY: HIGH if running paid search)

### The problem
`fareharbor_click` only measures that the booking overlay was *opened* — not that a booking was *paid/completed*. The completed-booking event happens inside FareHarbor's widget, so FareHarbor must report it. There are two mechanisms; only one works with the current lightbox:

- **Embed params** (`google-conversion-id` / `google-conversion-label` on the booking URL, set in `lib/booking.ts`): present on the hrefs, BUT `FH.open()` (the lightbox path) does NOT forward them. They only fire on the rare no-JS fallback (native navigation). **Do not rely on this for the lightbox.**
- **GA4 → Google Ads import** (FareHarbor's recommended method, works with the lightbox because the session stays on-page): FareHarbor emits a GA4 `purchase` event into `G-W2QRVH1SY8`; you mark it as a conversion in GA4 and import it into Google Ads.

### What to do (mostly dashboard work — needs human/account access)
1. **FareHarbor Dashboard → Analytics integrations:** confirm a Google Analytics 4 integration is configured to send `purchase`/booking events to measurement ID **`G-W2QRVH1SY8`**. (FareHarbor help: "Tracking conversions in Google Ads using GA4".)
2. **GA4 (`G-W2QRVH1SY8`) admin:** confirm the booking `purchase` event arrives (Realtime / DebugView during a test booking) and mark it as a **key event (conversion)**.
3. **Google Ads (`AW-18137623591`):** link GA4 ↔ Google Ads and **import** the GA4 booking conversion. Set it as the primary booking conversion; keep `fareharbor_click` as a secondary/observation metric only (importing the click would train bidding on clickers, not bookers).
4. **Test booking:** make one real booking (or a FareHarbor test booking) and confirm the conversion records in GA4 and in Google Ads. Verify the `gclid`/session is intact (i.e. it attributes to the paid click).

### Decision to confirm with the owner (Frank)
- Keep the embed `google-conversion-id`/`label` params at all (only useful for the no-JS fallback)? They currently default to `18137623591` / `oTDhCPXG2rYcEKfY2MhD` in `lib/booking.ts` via `||` (Netlify env vars are intentionally empty). NOTE: FareHarbor's `google-conversion-id` expects the **bare numeric** Ads ID (`18137623591`), not `AW-…` — verify if you keep this path.

### Available tooling
- The session has a Google Ads MCP (account `AW-18137623591` / `230-090-8750`) — usable to inspect existing conversion actions and confirm the import landed. GA4 admin and the FareHarbor dashboard are NOT MCP-accessible here and need the owner's login.

---

## TASK 2 — Consolidate the dual gtag loader (PRIORITY: LOW / optional)

### The problem
The site loads `gtag.js` twice: GA4 via `@next/third-parties` `<GoogleAnalytics>` (end of `<body>`) and Google Ads via a hand-written `<Script>` in `<head>` (`app/layout.tsx`). Result: the GA4 tag `G-W2QRVH1SY8` does NOT register in `window.google_tag_manager` the way FareHarbor expects (only `AW-18137623591` does). That is exactly why FareHarbor's `autolightbox` broke — its `getGA4ClientIds` threw `Cannot read properties of undefined (reading 'destination')`, aborting the overlay open.

### Why it's optional
PR #2 sidesteps this entirely with `FH.open()`. The lightbox works. This task only matters if you want FareHarbor's *native* GA4 cross-domain stitch / `autolightbox` to work again, or just want a cleaner single-loader setup.

### What to do (code, ~1 file, test carefully)
1. In `app/layout.tsx`, load a single `gtag.js` and configure BOTH ids, e.g.:
   ```html
   <Script src="https://www.googletagmanager.com/gtag/js?id=G-W2QRVH1SY8" strategy="afterInteractive" />
   <Script id="gtag-init" strategy="afterInteractive">{`
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-W2QRVH1SY8', { anonymize_ip: true });
     gtag('config', 'AW-18137623591');
   `}</Script>
   ```
   and REMOVE `<GoogleAnalytics gaId={GA4_ID} />` (and its import) so GA4 isn't loaded twice.
2. Verify in the browser that BOTH `window.google_tag_manager['G-W2QRVH1SY8']` and `['AW-18137623591']` exist, GA4 pageviews still fire, and `trackConversion()` (phone/form) still fires the Ads `conversion` (`send_to`).
3. OPTIONAL after this: you could switch `app/layout.tsx` back to `?autolightbox=yes` and remove `components/FareHarborLightbox.tsx` — but only if you confirm the FareHarbor overlay opens AND `fareharbor_click` still fires. The current `FH.open()` approach is known-good, so there's little reason to revert it.

### Risk
Touches analytics loading. The CLAUDE.md / task constraints say to treat GA4/Ads config carefully. Do not change measurement IDs. Verify GA4 Realtime still receives events after the change.

---

## How to verify either task end-to-end
- `npm install && npm run typecheck && npm run build` must pass.
- `npm run dev`, open `/kayak-tours-monterey-bay/`, click "Ready to Paddle":
  - Overlay opens, browser URL stays on the LP.
  - `window.dataLayer` gets `fareharbor_click`.
  - For Task 2: check `window.google_tag_manager` keys in the console.
- For Task 1: a real/test booking + GA4 DebugView + Google Ads conversions screen.
- Do NOT push directly to `main` — open a PR. Do NOT add a `/* -> /index.html` catch-all or change schema/canonicals/trailing slashes.
