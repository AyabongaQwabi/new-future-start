import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = "https://www.futurestart.co.za"
const SITE_TITLE = "Future Start Excellence Academy | FutureReady Short Courses"
const SITE_DESCRIPTION =
  "Future Start Excellence Academy offers FutureReady online short courses in South Africa — operations, project management, cost management, entrepreneurship, and AI productivity — plus mentoring and coaching for unemployed youth, graduates, professionals, and entrepreneurs."

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Future Start Excellence Academy",
  url: SITE_URL,
  logo: `${SITE_URL}/newlogo.png`,
  description: SITE_DESCRIPTION,
  email: "programmes@futurestart.co.za",
  areaServed: "ZA",
  sameAs: [
    "https://whatsapp.com/channel/0029VbBVlOr9WtCC1ab9Bv11",
    "https://www.tiktok.com/@officialfuturesta",
    "https://www.instagram.com/official_futurestart1/",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Future Start Excellence Academy",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Future Start" }],
  creator: "Future Start",
  publisher: "Future Start",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: SITE_URL,
    siteName: "Future Start Excellence Academy",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Future Start Excellence Academy",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export default function RootLayout({


  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en-ZA'><body className={inter.className}>
        {children}
        <Toaster position='bottom-right' />
        <GoogleAnalytics gaId='G-B6C06JGW6S' />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
