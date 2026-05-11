import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
  robots: { index: true, follow: true },
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
        {(GA4_ID || GADS_ID) ? (
          <>
            {/*
              Load gtag.js with the Google Ads (AW-) ID, not the GA4 (G-) ID.
              Reason: brand-new GA4 properties take 24-48h to propagate to
              Google's tag CDN; until then, gtag/js?id=G-XXXX returns HTTP 404
              and the entire tag library fails to load. The AW- endpoint
              serves the same gtag.js script. The GA4 property still gets
              registered via the gtag('config', G-XXXX) call below — the ID
              in the script src is just a CDN cache key, not a config.
            */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID ?? GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('set', 'linker', { domains: ['adventuresbythesea.com', 'bookadventuresbythesea.com', 'fareharbor.com'] });
                ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ''}
                ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ''}
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col">
        <ConversionTracker />
        {children}
      </body>
    </html>
  );
}
