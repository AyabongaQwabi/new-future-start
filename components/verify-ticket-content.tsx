'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  User,
  Ticket,
} from 'lucide-react';

interface TicketData {
  id: string;
  ticket_number: string;
  purchaser_name: string;
  purchaser_surname: string;
  quantity: number;
  event_date: string;
  event_venue: string;
  is_verified: boolean;
  verified_at: string | null;
  payment_status: string;
}

export default function VerifyTicketContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (token) {
      verifyTicket();
    } else {
      setError('No verification token provided');
      setLoading(false);
    }
  }, [token]);

  const verifyTicket = async () => {
    try {
      const response = await fetch(
        `/api/verify-ticket?token=${encodeURIComponent(token!)}`
      );
      const data = await response.json();

      if (data.success && data.ticket) {
        setTicket(data.ticket);
      } else {
        setError(data.error || 'Invalid ticket');
      }
    } catch (err) {
      console.error('Error verifying ticket:', err);
      setError('Failed to verify ticket');
    } finally {
      setLoading(false);
    }
  };

  const markAsUsed = async () => {
    if (!ticket || verifying) return;

    setVerifying(true);
    try {
      const response = await fetch('/api/verify-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          action: 'mark_used',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setTicket((prev) =>
          prev
            ? {
                ...prev,
                is_verified: true,
                verified_at: new Date().toISOString(),
              }
            : null
        );
      }
    } catch (err) {
      console.error('Error marking ticket as used:', err);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4'></div>
          <p>Verifying ticket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <Card className='shadow-2xl'>
          {error ? (
            <CardContent className='p-8 text-center'>
              <XCircle className='h-16 w-16 text-red-500 mx-auto mb-4' />
              <h2 className='text-2xl font-bold text-red-600 mb-2'>
                Invalid Ticket
              </h2>
              <p className='text-gray-600 mb-4'>{error}</p>
              <p className='text-sm text-gray-500'>
                Please contact support if you believe this is an error.
              </p>
            </CardContent>
          ) : ticket ? (
            <>
              <CardHeader
                className={`text-white text-center ${
                  ticket.payment_status === 'paid'
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                }`}
              >
                <div className='flex justify-center mb-4'>
                  {ticket.payment_status === 'paid' ? (
                    <CheckCircle className='h-16 w-16' />
                  ) : (
                    <XCircle className='h-16 w-16' />
                  )}
                </div>
                <CardTitle className='text-2xl'>
                  {ticket.payment_status === 'paid'
                    ? '✅ Valid Ticket'
                    : '❌ Invalid Ticket'}
                </CardTitle>
                <p
                  className={
                    ticket.payment_status === 'paid'
                      ? 'text-green-100'
                      : 'text-gray-100'
                  }
                >
                  {ticket.payment_status === 'paid'
                    ? 'This ticket is valid for entry'
                    : 'Payment not completed'}
                </p>
              </CardHeader>

              <CardContent className='p-8'>
                <div className='text-center mb-6'>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                    Book Launch Event
                  </h3>
                  <p className='text-lg text-gray-600'>
                    Conquering Your Years in Tertiary Education
                  </p>
                </div>

                {/* Ticket Details */}
                <div className='bg-gray-50 p-6 rounded-lg mb-6'>
                  <div className='text-center mb-4'>
                    <p className='text-2xl font-bold text-orange-600'>
                      #{ticket.ticket_number}
                    </p>
                    <p className='text-gray-600'>Ticket Number</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-center gap-3'>
                      <User className='h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-bold'>Ticket Holder</p>
                        <p>
                          {ticket.purchaser_name} {ticket.purchaser_surname}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Ticket className='h-5 w-5 text-purple-600' />
                      <div>
                        <p className='font-bold'>Quantity</p>
                        <p>
                          {ticket.quantity} ticket
                          {ticket.quantity > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Calendar className='h-5 w-5 text-orange-600' />
                      <div>
                        <p className='font-bold'>Event Date</p>
                        <p>Friday, 4 October 2024</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <MapPin className='h-5 w-5 text-red-600' />
                      <div>
                        <p className='font-bold'>Venue</p>
                        <p>{ticket.event_venue}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                {ticket.payment_status === 'paid' && (
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      ticket.is_verified
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-green-50 border border-green-200'
                    }`}
                  >
                    <div className='text-center'>
                      {ticket.is_verified ? (
                        <>
                          <XCircle className='h-8 w-8 text-red-600 mx-auto mb-2' />
                          <p className='font-bold text-red-800'>Already Used</p>
                          <p className='text-sm text-red-600'>
                            This ticket was scanned on{' '}
                            {new Date(ticket.verified_at!).toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <>
                          <CheckCircle className='h-8 w-8 text-green-600 mx-auto mb-2' />
                          <p className='font-bold text-green-800'>
                            Ready for Entry
                          </p>
                          <p className='text-sm text-green-600'>
                            This ticket has not been used yet
                          </p>
                          <Button
                            onClick={markAsUsed}
                            disabled={verifying}
                            className='mt-4 bg-green-600 hover:bg-green-700'
                          >
                            {verifying ? 'Processing...' : 'Mark as Used'}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className='text-center text-sm text-gray-600'>
                  <p>For support, contact: majork.n07@gmail.com</p>
                </div>
              </CardContent>
            </>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
