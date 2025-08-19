import { type NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error('Supabase not configured - missing environment variables');
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          details: 'Database connection not available. Please contact support.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    console.log('Received ticket checkout request:', body);

    const {
      purchaserName,
      purchaserSurname,
      purchaserEmail,
      purchaserPhone,
      quantity = 1,
      totalAmount,
      ticketPrice = 40000, // R400 in cents
    } = body;

    // Validate required fields
    if (
      !purchaserName ||
      !purchaserSurname ||
      !purchaserEmail ||
      !purchaserPhone
    ) {
      return NextResponse.json(
        {
          error: 'Missing required information',
          details: 'Name, surname, email, and phone are required',
        },
        { status: 400 }
      );
    }

    // Validate quantity
    if (!quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        {
          error: 'Invalid quantity',
          details: 'Quantity must be between 1 and 10',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(purchaserEmail)) {
      return NextResponse.json(
        {
          error: 'Invalid email',
          details: 'Please enter a valid email address',
        },
        { status: 400 }
      );
    }

    // Generate ticket number and verification token
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomSuffix = Math.random().toString(36).substr(2, 6).toUpperCase();
    const ticketNumber = `BL${year}${month}${day}-${randomSuffix}`;

    const verificationToken = `${ticketNumber}-${Math.random()
      .toString(36)
      .substr(2, 12)}`;

    // Create QR code data
    const qrCodeData = {
      ticket_number: ticketNumber,
      name: `${purchaserName} ${purchaserSurname}`,
      quantity: quantity,
      event: 'Book Launch - Conquering Your Years in Tertiary Education',
      date: '2025-10-04',
      venue: 'Eyethu Centre, Soweto',
      verification_token: verificationToken,
    };

    // Create ticket in database first (without checkout_id)
    const ticketData = {
      ticket_number: ticketNumber,
      purchaser_name: purchaserName,
      purchaser_surname: purchaserSurname,
      purchaser_email: purchaserEmail.toLowerCase(),
      purchaser_phone: purchaserPhone,
      quantity: quantity,
      total_amount: totalAmount,
      payment_status: 'pending',
      verification_token: verificationToken,
      qr_code_data: JSON.stringify(qrCodeData),
      event_date: '2025-10-04',
      event_venue: 'Eyethu Centre, Soweto',
    };

    console.log('Creating ticket with data:', ticketData);

    const { data: ticket, error: ticketError } = await supabase!
      .from('tickets')
      .insert(ticketData)
      .select()
      .single();

    if (ticketError) {
      console.error('Error creating ticket:', ticketError);
      return NextResponse.json(
        { error: 'Failed to create ticket', details: ticketError.message },
        { status: 500 }
      );
    }

    console.log(
      'Ticket created successfully:',
      ticket.id,
      'Ticket Number:',
      ticketNumber
    );

    // Create Yoco checkout
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://futurestart.co.za';

    const yocoPayload = {
      amount: totalAmount,
      currency: 'ZAR',
      cancelUrl: `${baseUrl}/ticket/cancelled?ticket_id=${ticket.id}`,
      successUrl: `${baseUrl}/ticket/success?ticket_id=${ticket.id}`,
      failureUrl: `${baseUrl}/ticket/failed?ticket_id=${ticket.id}`,
      metadata: {
        ticketId: ticket.id,
        ticketNumber: ticketNumber,
        purchaserEmail: purchaserEmail,
        quantity: quantity.toString(),
        eventType: 'book_launch',
      },
      lineItems: [
        {
          displayName: `Book Launch Ticket${
            quantity > 1 ? `s (${quantity})` : ''
          } - Oct 4, 2025`,
          quantity: quantity,
          pricingDetails: {
            price: ticketPrice,
          },
        },
      ],
      subtotalAmount: totalAmount,
      totalTaxAmount: 0,
      totalDiscount: 0,
    };

    console.log('Creating Yoco checkout with payload:', yocoPayload);

    const yocoResponse = await fetch(
      'https://payments.yoco.com/api/checkouts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `ticket-${ticket.id}-${Date.now()}`,
        },
        body: JSON.stringify(yocoPayload),
      }
    );

    console.log('Yoco response status:', yocoResponse.status);

    if (!yocoResponse.ok) {
      const yocoError = await yocoResponse.text();
      console.error('Yoco API error:', yocoError);

      // Update ticket status to cancelled
      await supabase!
        .from('tickets')
        .update({
          payment_status: 'cancelled',
          notes: 'Payment setup failed',
        })
        .eq('id', ticket.id);

      return NextResponse.json(
        {
          error: 'Payment setup failed',
          details: 'Unable to create payment session. Please try again.',
          yocoError: yocoError,
        },
        { status: 500 }
      );
    }

    const yocoData = await yocoResponse.json();
    console.log('Yoco checkout created:', {
      id: yocoData.id,
      redirectUrl: yocoData.redirectUrl,
    });

    // Update ticket with checkout ID
    const { error: updateError } = await supabase!
      .from('tickets')
      .update({ checkout_id: yocoData.id })
      .eq('id', ticket.id);

    if (updateError) {
      console.error('Error updating ticket with checkout_id:', updateError);
      // Don't fail the request for this, but log it
    }

    return NextResponse.json({
      success: true,
      ticketId: ticket.id,
      ticketNumber: ticketNumber,
      checkoutId: yocoData.id,
      redirectUrl: yocoData.redirectUrl,
      verificationToken: verificationToken,
    });
  } catch (error) {
    console.error('Ticket checkout API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
