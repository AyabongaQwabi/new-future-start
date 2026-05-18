import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL("https://futurestart.co.za"),
  title: {
    default: "Future Start | Student Services And Accommodation Platform",
    template: "%s | Future Start",
  },
  description: "Future Start helps South African tertiary students with accommodation requests, digital books, and campus support.",
  keywords: [
    "Future Start",
    "student accommodation South Africa",
    "tertiary student support",
    "digital books",
    "student services"
],
  authors: [{ name: "Future Start" }],
  creator: "Future Start",
  publisher: "Future Start",
  alternates: {
    canonical: "https://futurestart.co.za",
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: "https://futurestart.co.za",
    siteName: "Future Start",
    title: "Future Start | Student Services And Accommodation Platform",
    description: "Future Start helps South African tertiary students with accommodation requests, digital books, and campus support.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Future Start social preview",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Future Start",
    description: "Future Start helps South African tertiary students with accommodation requests, digital books, and campus support.",
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
        <GoogleAnalytics gaId='G-JL1XZPJG3V' />
      </body>
    </html>
  );
}
