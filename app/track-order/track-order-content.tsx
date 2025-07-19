'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Package,
  MapPin,
  Phone,
  Mail,
  User,
  Truck,
  Store,
} from 'lucide-react';

interface Order {
  id: string;
  tracking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  quantity?: number;
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
  updated_at: string;
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending Payment',
  paid: 'Payment Received',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function TrackOrderContent() {
  const searchParams = useSearchParams();
  const trackingFromUrl = searchParams.get('tracking');

  const [trackingNumber, setTrackingNumber] = useState(trackingFromUrl || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-search if tracking number is in URL
  useEffect(() => {
    if (trackingFromUrl) {
      handleSearch();
    }
  }, [trackingFromUrl]);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await fetch(
        `/api/track-order?tracking=${encodeURIComponent(trackingNumber.trim())}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to track order');
      }

      const data = await response.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        throw new Error('Order not found');
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setError(err instanceof Error ? err.message : 'Failed to track order');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Track Your Order
          </h1>
          <p className='text-gray-600'>
            Enter your tracking number to see the status of your order
          </p>
        </div>

        {/* Search Form */}
        <Card>
          <CardContent className='p-6'>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <Input
                  type='text'
                  placeholder='Enter tracking number (e.g., FS20250712-97R2)'
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className='text-lg'
                />
              </div>
              <Button onClick={handleSearch} disabled={loading} size='lg'>
                <Search className='h-4 w-4 mr-2' />
                {loading ? 'Searching...' : 'Track Order'}
              </Button>
            </div>
            {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className='space-y-6'>
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='h-5 w-5' />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-2xl font-bold'>
                      {order.tracking_number}
                    </div>
                    <div className='text-gray-600'>Tracking Number</div>
                  </div>
                  <Badge
                    className={
                      ORDER_STATUS_COLORS[order.status] ||
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </Badge>
                </div>

                <Separator />

                <div className='grid md:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <div className='font-medium text-gray-900'>Order Date</div>
                    <div className='text-gray-600'>
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  <div>
                    <div className='font-medium text-gray-900'>
                      Last Updated
                    </div>
                    <div className='text-gray-600'>
                      {formatDate(order.updated_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className='grid md:grid-cols-2 gap-6'>
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span>
                        Book: "
                        {order.product_name ||
                          'Conquering Your Years in Tertiary Education'}
                        "
                      </span>
                      <span>R{((order.amount || 45000) / 100).toFixed(2)}</span>
                    </div>
                    {order.quantity && order.quantity > 1 && (
                      <div className='flex justify-between text-sm text-gray-600'>
                        <span>Quantity: {order.quantity}</span>
                        <span>×{order.quantity}</span>
                      </div>
                    )}
                    <div className='flex justify-between'>
                      <span>
                        Delivery (
                        {order.delivery_method === 'paxi'
                          ? 'PAXI'
                          : 'Door-to-Door'}
                        )
                      </span>
                      <span>
                        R{((order.delivery_fee || 6000) / 100).toFixed(2)}
                      </span>
                    </div>
                    {order.discount_amount > 0 && (
                      <div className='flex justify-between text-green-600'>
                        <span>Discount ({order.promo_code})</span>
                        <span>
                          -R{(order.discount_amount / 100).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className='flex justify-between font-bold'>
                      <span>Total</span>
                      <span>
                        R
                        {(
                          (order.final_price || order.amount || 45000) / 100
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
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
                          Collection Instructions
                        </div>
                        <div className='text-sm text-blue-700 mt-1'>
                          You will receive an SMS from PEP with collection
                          details when your order is ready for pickup.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                        majork.n07@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                    <Phone className='h-5 w-5 text-green-600' />
                    <div>
                      <div className='font-medium text-sm'>Phone</div>
                      <div className='text-sm text-gray-600'>
                        +27 72 041 9723
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                    <Mail className='h-5 w-5 text-green-600' />
                    <div>
                      <div className='font-medium text-sm'>WhatsApp</div>
                      <div className='text-sm text-gray-600'>
                        +27 72 041 9723
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
