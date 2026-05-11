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
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID ?? GADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('set', 'linker', { domains: ['adventuresbythesea.com', 'bookadventuresbythesea.com', 'fareharbor.com'] });
                ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ''}
                ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ''}
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
