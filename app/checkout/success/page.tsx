'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  Package,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  User,
  Truck,
  Store,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';

interface Order {
  id: string;
  tracking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  quantity: number;
  amount: number;
  delivery_fee: number;
  discount_amount: number;
  final_price: number;
  delivery_method: string;
  delivery_speed?: string;
  paxi_code?: string;
  delivery_address?: string;
  promo_code?: string;
  status: string;
  payment_status: string;
  created_at: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const fetchAndUpdateOrder = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching order with ID:', orderId);

        // First, fetch the order
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Order data received:', data);

        let orderData = data.success ? data.order : data.order || data;

        // Update the order status to "paid" and payment_status to "completed"
        console.log('Updating order status to paid...');
        const updateResponse = await fetch(`/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'paid',
            payment_status: 'completed',
            updated_at: new Date().toISOString(),
          }),
        });

        if (updateResponse.ok) {
          const updatedData = await updateResponse.json();
          console.log('Order status updated successfully');
          orderData = updatedData.order || orderData;
          // Update the local order data with new status
          orderData.status = 'paid';
          orderData.payment_status = 'completed';
        } else {
          console.warn(
            'Failed to update order status, but continuing with display'
          );
        }

        setOrder(orderData);

        // Send thank you email
        try {
          console.log('Sending thank you email...');
          const emailResponse = await fetch('/api/send-thank-you-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerName: orderData.customer_name,
              customerEmail: orderData.customer_email,
              trackingNumber: orderData.tracking_number,
              quantity: orderData.quantity || 1,
              totalAmount: orderData.final_price,
              deliveryMethod: orderData.delivery_method,
              paxiCode: orderData.paxi_code,
              deliveryAddress: orderData.delivery_address,
              promoCode: orderData.promo_code,
              discountAmount: orderData.discount_amount,
            }),
          });

          if (emailResponse.ok) {
            console.log('Thank you email sent successfully');
            setEmailSent(true);
          } else {
            console.warn('Failed to send thank you email');
          }
        } catch (emailError) {
          console.error('Error sending thank you email:', emailError);
        }
      } catch (err) {
        console.error('Error fetching/updating order:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto'></div>
              <p className='mt-4 text-gray-600'>
                Processing your order and sending confirmation...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50'>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <Card className='border-red-200'>
              <CardContent className='p-6 text-center'>
                <div className='text-red-600 mb-4'>
                  <Package className='h-12 w-12 mx-auto' />
                </div>
                <h2 className='text-xl font-semibold text-red-800 mb-2'>
                  Order Not Found
                </h2>
                <p className='text-red-600 mb-2'>Order ID: {orderId}</p>
                <p className='text-red-600 mb-4'>Error: {error}</p>
                <Button asChild>
                  <Link href='/'>Return to Home</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pricing properly
  const bookPrice = 45000; // R450 in cents per book
  const quantity = order.quantity || 1;
  const totalBookPrice = bookPrice * quantity;
  const deliveryFee = order.delivery_fee || 6000; // R60 in cents
  const discountAmount = order.discount_amount || 0;
  const totalAmount =
    order.final_price || totalBookPrice + deliveryFee - discountAmount;

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto space-y-6'>
          {/* Success Header */}
          <Card className='border-green-200 bg-green-50'>
            <CardContent className='p-6 text-center'>
              <div className='text-green-600 mb-4'>
                <CheckCircle className='h-16 w-16 mx-auto' />
              </div>
              <h1 className='text-3xl font-bold text-green-800 mb-2'>
                Payment Successful!
              </h1>
              <p className='text-green-700 text-lg'>
                Thank you for your purchase. Your order has been confirmed.
              </p>
              {emailSent && (
                <p className='text-green-600 text-sm mt-2'>
                  📧 Confirmation email sent to {order.customer_email}
                </p>
              )}
            </CardContent>
          </Card>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='h-5 w-5' />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='text-sm text-blue-600 font-medium'>
                    Tracking Number
                  </div>
                  <div className='text-2xl font-bold text-blue-800'>
                    {order.tracking_number}
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>
                      Book{quantity > 1 ? 's' : ''}: "
                      {order.product_name ||
                        'Conquering Your Years in Tertiary Education'}
                      " × {quantity}
                    </span>
                    <span>R{(totalBookPrice / 100).toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>
                      Delivery (
                      {order.delivery_method === 'paxi'
                        ? 'PAXI'
                        : 'Door-to-Door'}
                      )
                    </span>
                    <span>R{(deliveryFee / 100).toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className='flex justify-between text-green-600'>
                      <span>Discount ({order.promo_code})</span>
                      <span>-R{(discountAmount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className='flex justify-between font-bold text-lg'>
                    <span>Total Paid</span>
                    <span>R{(totalAmount / 100).toFixed(2)}</span>
                  </div>
                </div>

                <Badge
                  variant='secondary'
                  className='bg-green-100 text-green-800'
                >
                  Payment Received
                </Badge>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-blue-600 font-semibold'>
                      {order.customer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className='font-medium'>{order.customer_name}</div>
                    <div className='text-sm text-gray-600'>
                      {order.customer_email}
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <Phone className='h-4 w-4 text-gray-400' />
                  <span>{order.customer_phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                {order.delivery_method === 'paxi' ? (
                  <Store className='h-5 w-5' />
                ) : (
                  <Truck className='h-5 w-5' />
                )}
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <div className='text-sm font-medium text-gray-600'>
                    Delivery Method
                  </div>
                  <div className='capitalize'>
                    {order.delivery_method === 'paxi'
                      ? 'PAXI Collection'
                      : 'Door-to-Door Delivery'}
                  </div>
                </div>

                {order.delivery_method === 'paxi' && order.paxi_code && (
                  <div>
                    <div className='text-sm font-medium text-gray-600'>
                      PEP Store Code
                    </div>
                    <div className='font-mono text-lg'>{order.paxi_code}</div>
                  </div>
                )}

                {order.delivery_method === 'door_to_door' &&
                  order.delivery_address && (
                    <div>
                      <div className='text-sm font-medium text-gray-600'>
                        Delivery Address
                      </div>
                      <div>{order.delivery_address}</div>
                    </div>
                  )}
              </div>

              {order.delivery_method === 'paxi' && (
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='flex items-start gap-2'>
                    <MapPin className='h-5 w-5 text-blue-600 mt-0.5' />
                    <div>
                      <div className='font-medium text-blue-800'>
                        PAXI Collection Instructions
                      </div>
                      <div className='text-sm text-blue-700 mt-1'>
                        You will receive an SMS from PEP with your collection
                        details once your order is ready for pickup at your
                        selected PEP store.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-blue-600 font-semibold text-sm'>
                      1
                    </span>
                  </div>
                  <div>
                    <div className='font-medium'>Order Processing</div>
                    <div className='text-sm text-gray-600'>
                      Your order is being prepared for shipment (1-2 business
                      days)
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-blue-600 font-semibold text-sm'>
                      2
                    </span>
                  </div>
                  <div>
                    <div className='font-medium'>Shipping</div>
                    <div className='text-sm text-gray-600'>
                      {order.delivery_method === 'paxi'
                        ? `Your book${
                            quantity > 1 ? 's' : ''
                          } will be sent to your selected PEP store`
                        : `Your book${
                            quantity > 1 ? 's' : ''
                          } will be shipped to your delivery address`}
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-blue-600 font-semibold text-sm'>
                      3
                    </span>
                  </div>
                  <div>
                    <div className='font-medium'>
                      {order.delivery_method === 'paxi'
                        ? 'Collection Ready'
                        : 'Delivery'}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {order.delivery_method === 'paxi'
                        ? "You'll receive an SMS when your book is ready for collection (3-5 business days)"
                        : 'Your book will be delivered to your address (3-7 business days)'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-3 gap-4'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <Mail className='h-5 w-5 text-blue-600' />
                  <div>
                    <div className='font-medium text-sm'>Email</div>
                    <div className='text-sm text-gray-600'>
                      info@futurestart.co.za
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <Phone className='h-5 w-5 text-green-600' />
                  <div>
                    <div className='font-medium text-sm'>Phone</div>
                    <div className='text-sm text-gray-600'>+27 72 041 9723</div>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <MessageCircle className='h-5 w-5 text-green-600' />
                  <div>
                    <div className='font-medium text-sm'>WhatsApp</div>
                    <div className='text-sm text-gray-600'>+27 72 041 9723</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='bg-blue-600 hover:bg-blue-700'>
              <Link href={`/track-order?tracking=${order.tracking_number}`}>
                <Package className='h-4 w-4 mr-2' />
                Track Your Order
              </Link>
            </Button>
            <Button asChild variant='outline' size='lg'>
              <Link href='/'>Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
