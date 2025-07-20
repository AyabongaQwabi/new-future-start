import {
  XCircle,
  RefreshCw,
  Phone,
  Mail,
  ArrowLeft,
  CreditCard,
  Wifi,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Navbar from '@/components/navbar';

async function updateFailedOrder(orderId: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      }/api/checkout/failed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to update order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating failed order:', error);
    return null;
  }
}

export default async function CheckoutFailedPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const orderId = searchParams.order_id;

  // Update order status to failed
  if (orderId) {
    await updateFailedOrder(orderId);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50'>
      <Navbar />

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto'>
          {/* Failed Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
              <XCircle className='w-8 h-8 text-red-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Payment Failed 😔
            </h1>
            <p className='text-lg text-gray-600'>
              Don't worry! No charges were made to your account. Let's get this
              sorted out.
            </p>
          </div>

          {/* Common Issues */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertTriangle className='w-5 h-5 text-orange-600' />
                Common Issues & Solutions
              </CardTitle>
              <CardDescription>
                Here are some quick fixes you can try:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start gap-3 p-3 bg-blue-50 rounded-lg'>
                  <CreditCard className='w-5 h-5 text-blue-600 mt-0.5' />
                  <div>
                    <h4 className='font-medium text-blue-900'>Card Issues</h4>
                    <p className='text-sm text-blue-700'>
                      • Check your card details (number, expiry, CVV)
                      <br />• Ensure you have sufficient funds
                      <br />• Try a different card if available
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 bg-green-50 rounded-lg'>
                  <Wifi className='w-5 h-5 text-green-600 mt-0.5' />
                  <div>
                    <h4 className='font-medium text-green-900'>
                      Connection Issues
                    </h4>
                    <p className='text-sm text-green-700'>
                      • Check your internet connection
                      <br />• Try refreshing the page
                      <br />• Clear your browser cache
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 bg-purple-50 rounded-lg'>
                  <AlertTriangle className='w-5 h-5 text-purple-600 mt-0.5' />
                  <div>
                    <h4 className='font-medium text-purple-900'>
                      Bank Security
                    </h4>
                    <p className='text-sm text-purple-700'>
                      • Your bank might have blocked the transaction
                      <br />• Contact your bank to authorize online purchases
                      <br />• Try again after authorization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mb-8'>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 flex-1'
              asChild
            >
              <Link href='/'>
                <RefreshCw className='mr-2 h-4 w-4' />
                Try Again
              </Link>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='flex-1 bg-transparent'
              asChild
            >
              <Link href='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Contact Support */}
          <Card className='bg-gradient-to-r from-purple-50 to-pink-50'>
            <CardHeader>
              <CardTitle>Still Having Issues? We're Here to Help! 🤝</CardTitle>
              <CardDescription>
                Our support team is ready to assist you with your purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2'>
                <Button
                  variant='outline'
                  className='h-auto p-4 bg-transparent'
                  asChild
                >
                  <a href='mailto:info@futurestart.co.za'>
                    <div className='text-center'>
                      <Mail className='w-6 h-6 mx-auto mb-2' />
                      <div className='font-medium'>Email Support</div>
                      <div className='text-sm text-gray-600'>
                        info@futurestart.co.za
                      </div>
                      <div className='text-xs text-gray-500 mt-1'>
                        We'll respond within 24 hours
                      </div>
                    </div>
                  </a>
                </Button>
                <Button
                  variant='outline'
                  className='h-auto p-4 bg-transparent'
                  asChild
                >
                  <a
                    href='https://wa.me/27720419723'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='text-center'>
                      <Phone className='w-6 h-6 mx-auto mb-2' />
                      <div className='font-medium'>WhatsApp Support</div>
                      <div className='text-sm text-gray-600'>
                        +27 72 041 9723
                      </div>
                      <div className='text-xs text-gray-500 mt-1'>
                        Quick response guaranteed
                      </div>
                    </div>
                  </a>
                </Button>
              </div>

              <div className='mt-4 p-4 bg-yellow-50 rounded-lg'>
                <p className='text-sm text-yellow-800'>
                  <strong>💡 Pro Tip:</strong> When contacting support, please
                  mention that your payment failed
                  {orderId && ` and include this reference: ${orderId}`}. This
                  helps us assist you faster!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reassurance */}
          <div className='text-center mt-8 p-6 bg-white rounded-lg shadow-sm'>
            <h3 className='font-bold text-lg mb-2'>
              Don't Give Up on Your Dreams! 🌟
            </h3>
            <p className='text-gray-600'>
              Thousands of students have already transformed their university
              experience with our book. A small payment hiccup won't stop you
              from joining them! Let's get this sorted out together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
