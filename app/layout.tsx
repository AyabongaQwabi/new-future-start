import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Future Start - Conquering Your Years in Tertiary Education',
  description:
    'Your comprehensive guide to navigating university life successfully. Avoid common pitfalls and graduate with excellence.',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster position='bottom-right' />
        <GoogleAnalytics gaId='G-JL1XZPJG3V' />
      </body>
    </html>
  );
}
