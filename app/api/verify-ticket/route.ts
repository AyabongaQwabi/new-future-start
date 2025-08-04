import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const { data: ticket, error } = await supabase!
      .from('tickets')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (error || !ticket) {
      console.error('Ticket verification error:', error);
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket: ticket,
    });
  } catch (error) {
    console.error('Error verifying ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, action } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    if (action === 'mark_used') {
      const { data: ticket, error } = await supabase!
        .from('tickets')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('verification_token', token)
        .select()
        .single();

      if (error) {
        console.error('Error marking ticket as used:', error);
        return NextResponse.json(
          { error: 'Failed to update ticket' },
          { status: 500 }
        );
      }

      // Log the scan
      await supabase!.from('ticket_scans').insert({
        ticket_id: ticket.id,
        scanned_by: 'system',
        scan_location: 'event_entrance',
        notes: 'Ticket marked as used via verification link',
      });

      return NextResponse.json({
        success: true,
        ticket: ticket,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing ticket verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
