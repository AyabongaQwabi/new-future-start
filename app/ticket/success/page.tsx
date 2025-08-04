'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Download,
  Share2,
  Calendar,
  MapPin,
  Ticket,
} from 'lucide-react';
import QRCode from 'qrcode';

interface TicketData {
  id: string;
  ticket_number: string;
  purchaser_name: string;
  purchaser_surname: string;
  purchaser_email: string;
  quantity: number;
  total_amount: number;
  verification_token: string;
  qr_code_data: string;
  event_date: string;
  event_venue: string;
}

export default function TicketSuccessPage() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticket_id');

  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ticketId) {
      fetchTicketData();
    }
  }, [ticketId]);

  const fetchTicketData = async () => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`);
      const data = await response.json();

      if (data.success && data.ticket) {
        setTicket(data.ticket);

        // Update payment status to paid
        await fetch(`/api/tickets/${ticketId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_status: 'paid' }),
        });

        // Generate QR code
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || 'https://futurestart.co.za';
        const verifyUrl = `${baseUrl}/verify-ticket?token=${data.ticket.verification_token}`;
        const qrCode = await QRCode.toDataURL(verifyUrl);
        setQrCodeUrl(qrCode);
      } else {
        setError('Ticket not found');
      }
    } catch (err) {
      console.error('Error fetching ticket:', err);
      setError('Failed to load ticket information');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && ticket) {
      try {
        await navigator.share({
          title: 'Book Launch Ticket',
          text: `I got my ticket for the Book Launch! Ticket #${ticket.ticket_number}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const downloadTicket = () => {
    if (!ticket || !qrCodeUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1000;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#f97316';
    ctx.fillRect(0, 0, canvas.width, 120);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BOOK LAUNCH TICKET', canvas.width / 2, 50);
    ctx.font = '20px Arial';
    ctx.fillText(
      'Conquering Your Years in Tertiary Education',
      canvas.width / 2,
      85
    );

    // Ticket details
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';

    const details = [
      `Ticket #: ${ticket.ticket_number}`,
      `Name: ${ticket.purchaser_name} ${ticket.purchaser_surname}`,
      `Quantity: ${ticket.quantity} ticket${ticket.quantity > 1 ? 's' : ''}`,
      `Date: Friday, 4 October 2024`,
      `Venue: ${ticket.event_venue}`,
      `Total: R${(ticket.total_amount / 100).toFixed(2)}`,
    ];

    details.forEach((detail, index) => {
      ctx.fillText(detail, 50, 180 + index * 40);
    });

    // QR Code
    const qrImg = new Image();
    qrImg.onload = () => {
      ctx.drawImage(qrImg, (canvas.width - 200) / 2, 450, 200, 200);

      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Scan this QR code at the event', canvas.width / 2, 680);

      // Download
      const link = document.createElement('a');
      link.download = `ticket-${ticket.ticket_number}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    qrImg.src = qrCodeUrl;
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4'></div>
          <p>Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Card className='max-w-md'>
          <CardContent className='p-6 text-center'>
            <p className='text-red-600 mb-4'>{error || 'Ticket not found'}</p>
            <Button asChild>
              <Link href='/'>Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <Card className='shadow-2xl'>
          <CardHeader className='bg-gradient-to-r from-orange-500 to-red-500 text-white text-center'>
            <div className='flex justify-center mb-4'>
              <CheckCircle className='h-16 w-16' />
            </div>
            <CardTitle className='text-2xl'>
              🎉 Ticket Purchase Successful!
            </CardTitle>
            <p className='text-orange-100'>Your ticket has been confirmed</p>
          </CardHeader>

          <CardContent className='p-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                Book Launch Event
              </h2>
              <p className='text-xl text-gray-600'>
                Conquering Your Years in Tertiary Education
              </p>
            </div>

            {/* Event Details */}
            <div className='bg-gray-50 p-6 rounded-lg mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-3'>
                  <Calendar className='h-5 w-5 text-orange-600' />
                  <div>
                    <p className='font-bold'>Date</p>
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

            {/* Ticket Details */}
            <div className='border-2 border-dashed border-gray-300 p-6 rounded-lg mb-6'>
              <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-600'>
                  #{ticket.ticket_number}
                </p>
                <p className='text-gray-600'>Ticket Number</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div>
                  <p className='font-bold'>Name</p>
                  <p>
                    {ticket.purchaser_name} {ticket.purchaser_surname}
                  </p>
                </div>
                <div>
                  <p className='font-bold'>Quantity</p>
                  <p>
                    {ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}
                  </p>
                </div>
                <div>
                  <p className='font-bold'>Email</p>
                  <p>{ticket.purchaser_email}</p>
                </div>
                <div>
                  <p className='font-bold'>Total Paid</p>
                  <p className='text-green-600 font-bold'>
                    R{(ticket.total_amount / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* QR Code */}
              {qrCodeUrl && (
                <div className='text-center'>
                  <img
                    src={qrCodeUrl || '/placeholder.svg'}
                    alt='Ticket QR Code'
                    className='mx-auto mb-4'
                    width={200}
                    height={200}
                  />
                  <p className='text-sm text-gray-600'>
                    Present this QR code at the event entrance
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                onClick={downloadTicket}
                className='flex-1 bg-transparent'
                variant='outline'
              >
                <Download className='mr-2 h-4 w-4' />
                Download Ticket
              </Button>
              <Button
                onClick={handleShare}
                className='flex-1 bg-transparent'
                variant='outline'
              >
                <Share2 className='mr-2 h-4 w-4' />
                Share
              </Button>
              <Button
                asChild
                className='flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              >
                <Link href='/'>
                  <Ticket className='mr-2 h-4 w-4' />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Important Notes */}
            <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
              <h4 className='font-bold text-blue-800 mb-2'>
                📋 Important Notes:
              </h4>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• Keep this ticket safe - you'll need it for entry</li>
                <li>• Arrive 30 minutes before the event starts</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Screenshots of the QR code are acceptable</li>
                <li>
                  • Contact us if you have any questions: majork.n07@gmail.com
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
