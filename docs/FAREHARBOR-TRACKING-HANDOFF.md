# FareHarbor Lightbox + Booking Conversion — Handoff & Current State

**Repo:** `viddlesinc-create/abts-engagement` (Next.js 15 App Router, `output: 'export'`, deployed to Netlify → `bookadventuresbythesea.com`)
**Last updated:** 2026-06-18
**Status:** Lightbox ✅ shipped & live. Booking conversion ✅ verified & wired. One optional cleanup + one optional refactor remain.

---

## TL;DR

FareHarbor booking CTAs used to do a full-page redirect to `fareharbor.com`, which broke Google Ads attribution (GA4 session + `gclid` didn't survive the cross-domain jump). They now open a **FareHarbor lightbox** that keeps the user on `bookadventuresbythesea.com`. Verified live on multiple LPs, and a real test booking confirmed the **GA4 `purchase` event fires** end-to-end. Google Ads conversions are now set so the reliable GA4-import drives bidding.

---

## What shipped (all merged to `main`, live)

- **PR #1** — first pass at the lightbox (loaded FareHarbor `?autolightbox=yes`; removed `ConversionTracker`'s self-redirect; moved its listener to capture phase).
- **PR #2** — `autolightbox` did NOT open on this site (GA4 handshake bug, see below), so it was replaced with an explicit **`FH.open()`** call in `components/FareHarborLightbox.tsx`. This is the working approach.
- **PR #3** — this handoff doc.

### Key files
- `app/layout.tsx` — loads FareHarbor Embed API `https://fareharbor.com/embeds/api/v1/` (**no** `autolightbox`) + mounts `<ConversionTracker />` and `<FareHarborLightbox />`.
- `components/FareHarborLightbox.tsx` — bubble-phase click handler → `FH.open({ shortname, fallback:'simple', fullItems, flow, view:{ item } })`, parsed from the booking anchor href. Modified clicks / missing `window.FH` fall back to native navigation.
- `components/ConversionTracker.tsx` — capture-phase delegated listener; fires GA4 `fareharbor_click` (engagement, NOT a conversion) + `phone`/`form` Google Ads conversions.
- `lib/booking.ts` — centralized FareHarbor URLs + `google-conversion-id`/`label` (defaults via `||`, bare-numeric id).
- `lib/analytics.ts` — GA4_ID `G-W2QRVH1SY8`, GADS_ID `AW-18137623591`, per-page conversion catalog + `trackConversion()`.

---

## Why autolightbox failed (root cause, for context)

FareHarbor `autolightbox` runs a GA4 cross-domain stitch (embed cart URL carries `g4=yes` → `getGA4ClientIds`) that throws `Cannot read properties of undefined (reading 'destination')`, because the GA4 tag `G-W2QRVH1SY8` is **not registered in `window.google_tag_manager`** the way FH expects (only the `AW-` Ads tag is — GA4 loads via `@next/third-parties`, Ads via a separate gtag loader). The failed handshake aborts the overlay open. `FH.open()` bypasses that path. (See optional Task B.)

---

## Verified working (2026-06-18)

- **Lightbox:** clicking book CTAs on `/kayak-tours-monterey-bay/` and `/surrey-bike-rental-monterey/` opens the FareHarbor overlay; top URL stays on the LP; correct item loads (kayak 84529, surrey 84525); `fareharbor_click` fires; no console errors.
- **Booking conversion:** a real test booking produced, in GA4 (property **Book ABTS**, `G-W2QRVH1SY8`), a **`purchase` key event** (+ Purchasers audience, Confirmation page views). Historical GA4 also shows **72 purchases / $8,458 in 30 days** — FareHarbor's GA4 integration reliably emits `purchase`, and the lightbox does not break it.
- **Google Ads account `2300908750` (Berg Boys Digital; owns tag `AW-18137623591`):** conversion labels in code all map to real, enabled actions:
  - Reservations phone `0274COCYkbUcEKfY2MhD` → **Rental Call From Wesbsite** (firing)
  - Groups phone `a44MCJr2_rYcEKfY2MhD` → **Click to call - Groups LP**
  - Groups form → **Book ABTS (web) groups_lp_form_submit**
  - Booking `oTDhCPXG2rYcEKfY2MhD` → **FareHarbor Booking Complete**

### Conversion primary/secondary — FINAL state (set 2026-06-18)
| Conversion action | ID | Type | Primary? |
|---|---|---|---|
| **Book ABTS (web) purchase** | 7628632947 | GA4-import (PURCHASE) | **PRIMARY** ✅ (drives bidding) |
| FareHarbor Booking Complete | 7630922613 | gtag/WEBPAGE (PURCHASE) | Secondary (observation) |

Rationale: the GA4-import is the reliable, lightbox-safe booking signal; the gtag "FareHarbor Booking Complete" depends on embed params that `FH.open()` drops, so it was demoted to avoid an unreliable/duplicate bidding signal. The demote was done via the Ads API; the promote of the GA4-import had to be done in the **Google Ads UI** (GA4-imported actions are read-only via API).

---

## Remaining items

### A. (Optional cleanup) Decide the fate of "FareHarbor Booking Complete"
It's now Secondary, so harmless. Options: leave it as a secondary/observation metric (fine), or remove it to avoid confusion. The embed `google-conversion-id`/`label` params in `lib/booking.ts` now only matter for the no-JS fallback path; you can keep or strip them. No urgency.

### B. (Optional refactor — user chose to SKIP for now) Consolidate the dual gtag loader
The site loads `gtag.js` twice (GA4 via `@next/third-parties`, Ads via a manual `<Script>` in `app/layout.tsx`), which is why `G-W2QRVH1SY8` isn't in `window.google_tag_manager` and why FH `autolightbox` broke. Fixing it (single `gtag.js` configuring both `G-…` and `AW-…`, remove `<GoogleAnalytics>`) would let FareHarbor's native autolightbox/GA4 stitch work again. NOT required — `FH.open()` works. If pursued: verify both `window.google_tag_manager['G-W2QRVH1SY8']` and `['AW-18137623591']` exist, GA4 pageviews still fire, and `trackConversion()` phone/form conversions still fire. Touches analytics loading — test in GA4 Realtime.

---

## Verify end-to-end
- `npm install && npm run typecheck && npm run build` must pass.
- `npm run dev`, open `/kayak-tours-monterey-bay/`, click a book CTA → overlay opens, URL stays on the LP, `window.dataLayer` gets `fareharbor_click`.
- Conversion truth lives in **GA4** (Realtime/DebugView → `purchase` key event) and, for ad-driven bookings, in **Google Ads → "Book ABTS (web) purchase"** (reporting lag hours).
- Do NOT push directly to `main` — open a PR. Do NOT add a `/* -> /index.html` catch-all or change schema/canonicals/trailing slashes. Do NOT change GA4/Ads measurement IDs.
