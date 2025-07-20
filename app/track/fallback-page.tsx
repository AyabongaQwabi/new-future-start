'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function FallbackTrackingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-lg'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <Image
                src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2020.11.24-aiRSvS4nTzPtzOlvrrO8NPFtkZKU0Y.jpeg'
                alt='Future Start Logo'
                width={150}
                height={50}
                className='h-10 w-auto'
              />
            </Link>
          </div>
          <nav className='hidden md:flex gap-6'>
            <Link
              href='/'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Home
            </Link>
            <Link
              href='/#services'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Services
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Contact
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-12 max-w-4xl'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <div className='inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4'>
            📦 ORDER TRACKING
          </div>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
            Track Your Order 🚀
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            We're setting up the tracking system. Please check back soon!
          </p>
        </div>

        {/* Service Unavailable Message */}
        <Card className='bg-yellow-50 border-yellow-200 max-w-2xl mx-auto'>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <AlertCircle className='h-12 w-12 text-yellow-500' />
            </div>
            <CardTitle className='text-2xl text-yellow-800'>
              Service Temporarily Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center space-y-4'>
            <p className='text-yellow-700'>
              Our order tracking system is currently being set up. Don't worry -
              your order is safe and being processed!
            </p>
            <div className='space-y-3'>
              <p className='text-sm text-yellow-600'>
                In the meantime, you can contact us directly for order updates:
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                <Button asChild className='bg-yellow-600 hover:bg-yellow-700'>
                  <a href='mailto:info@futurestart.co.za'>📧 Email Us</a>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  className='border-yellow-600 text-yellow-600 bg-transparent'
                >
                  <a
                    href='https://wa.me/27720419723'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    💬 WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className='pt-4'>
              <Button
                onClick={() => window.location.reload()}
                variant='outline'
                className='border-yellow-600 text-yellow-600'
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className='mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0'>
          <CardContent className='p-8 text-center'>
            <h3 className='text-2xl font-bold mb-4'>Need Immediate Help? 🤝</h3>
            <p className='mb-6 text-blue-100'>
              Our team is here to help with any questions about your order!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                variant='outline'
                className='border-white text-blue-600 hover:bg-white/20 bg-transparent'
                asChild
              >
                <a href='mailto:info@futurestart.co.za'>📧 Email Support</a>
              </Button>
              <Button
                variant='outline'
                className='border-white text-blue-600 hover:bg-white/20 bg-transparent'
                asChild
              >
                <a
                  href='https://wa.me/27720419723'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  💬 WhatsApp Us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
