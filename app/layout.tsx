import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { CLIENT_PROFILE } from '@/lib/client-profile';
import { brandLocalBusinessSchema, jsonLdScript } from '@/lib/schema';
import { GA4_ID, GADS_ID } from '@/lib/analytics';
import { ConversionTracker } from '@/components/ConversionTracker';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bookadventuresbythesea.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Adventures by the Sea — Bikes, E-Bikes, Kayaks, and Group Programs on the Monterey Peninsula',
    template: '%s | Adventures by the Sea',
  },
  description: CLIENT_PROFILE.brand.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: CLIENT_PROFILE.brand.name,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3a5c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Habibi&family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(brandLocalBusinessSchema())}
        />
        {GADS_ID ? (
          <>
            {/*
              Google Ads (AW-) gtag loader. GA4 is handled by
              <GoogleAnalytics> from @next/third-parties below.
              We keep this block so that Google Ads conversion events
              fired from <ConversionTracker /> still have a gtag config.
            */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gads-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('set', 'linker', { domains: ['adventuresbythesea.com', 'bookadventuresbythesea.com', 'fareharbor.com'] });
                gtag('config', '${GADS_ID}');
              `}
            </Script>
          </>
        ) : null}
        {/*
          FareHarbor Embed API (autolightbox). Loaded globally so it persists
          across client route transitions; it binds a delegated click listener
          that intercepts any <a href="https://fareharbor.com/embeds/book/...">
          and opens the booking in a LIGHTBOX overlay instead of navigating the
          top window. Keeping the user on bookadventuresbythesea.com preserves
          the GA4 session + gclid for paid-booking attribution.
        */}
        <Script
          src="https://fareharbor.com/embeds/api/v1/?autolightbox=yes"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ConversionTracker />
        {children}
        {GA4_ID ? <GoogleAnalytics gaId={GA4_ID} /> : null}
      </body>
    </html>
  );
}
