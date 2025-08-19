'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Ticket, Plus, Minus } from 'lucide-react';

const TICKET_PRICE = 40000; // R400 in cents

interface TicketFormData {
  purchaserName: string;
  purchaserSurname: string;
  purchaserEmail: string;
  purchaserPhone: string;
  quantity: number;
}

export default function BookLaunchTicketButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TicketFormData>({
    purchaserName: '',
    purchaserSurname: '',
    purchaserEmail: '',
    purchaserPhone: '',
    quantity: 1,
  });

  const handleInputChange = (
    field: keyof TicketFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleQuantityChange = (increment: boolean) => {
    setFormData((prev) => ({
      ...prev,
      quantity: increment
        ? Math.min(prev.quantity + 1, 10)
        : Math.max(prev.quantity - 1, 1),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.purchaserName.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.purchaserSurname.trim()) {
      setError('Surname is required');
      return false;
    }
    if (!formData.purchaserEmail.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.purchaserPhone.trim()) {
      setError('Phone number is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.purchaserEmail)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/;
    if (!phoneRegex.test(formData.purchaserPhone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handlePurchase = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const totalAmount = TICKET_PRICE * formData.quantity;

      const response = await fetch('/api/create-ticket-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalAmount,
          ticketPrice: TICKET_PRICE,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || 'Failed to create ticket checkout'
        );
      }

      if (data.success && data.redirectUrl) {
        // Redirect to Yoco payment page
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('Invalid response from payment service');
      }
    } catch (error) {
      console.error('Ticket purchase error:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      setIsLoading(false);
    }
  };

  const totalPrice = (TICKET_PRICE * formData.quantity) / 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-full px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all'
        >
          <Ticket className='mr-2 h-6 w-6' />
          🎟️ Get Launch Tickets!
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center'>
            🎉 Book Launch Event Tickets
          </DialogTitle>
          <DialogDescription className='text-center'>
            Join us for the official launch of "Conquering Your Years in
            Tertiary Education"
          </DialogDescription>
        </DialogHeader>

        {/* Event Details */}
        <div className='bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-6'>
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <Calendar className='h-5 w-5 text-orange-600' />
              <div>
                <p className='font-bold text-orange-800'>📅 Date & Time</p>
                <p className='text-orange-700'>Friday, 4 October 2025</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <MapPin className='h-5 w-5 text-red-600' />
              <div>
                <p className='font-bold text-red-800'>📍 Venue</p>
                <p className='text-red-700'>Eyethu Centre, Soweto</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Ticket className='h-5 w-5 text-purple-600' />
              <div>
                <p className='font-bold text-purple-800'>💰 Price</p>
                <p className='text-purple-700'>R400 per ticket</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-4'>
            <div className='text-red-800 text-sm'>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Purchase Form */}
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='purchaserName'>Name *</Label>
              <Input
                id='purchaserName'
                type='text'
                placeholder='Enter your name'
                value={formData.purchaserName}
                onChange={(e) =>
                  handleInputChange('purchaserName', e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='purchaserSurname'>Surname *</Label>
              <Input
                id='purchaserSurname'
                type='text'
                placeholder='Enter your surname'
                value={formData.purchaserSurname}
                onChange={(e) =>
                  handleInputChange('purchaserSurname', e.target.value)
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor='purchaserEmail'>Email Address *</Label>
            <Input
              id='purchaserEmail'
              type='email'
              placeholder='your.email@example.com'
              value={formData.purchaserEmail}
              onChange={(e) =>
                handleInputChange('purchaserEmail', e.target.value)
              }
              required
            />
          </div>

          <div>
            <Label htmlFor='purchaserPhone'>Phone Number *</Label>
            <Input
              id='purchaserPhone'
              type='tel'
              placeholder='+27 12 345 6789'
              value={formData.purchaserPhone}
              onChange={(e) =>
                handleInputChange('purchaserPhone', e.target.value)
              }
              required
            />
          </div>

          {/* Quantity Selector */}
          <div>
            <Label>Number of Tickets</Label>
            <div className='flex items-center gap-4 mt-2'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => handleQuantityChange(false)}
                disabled={formData.quantity <= 1}
              >
                <Minus className='h-4 w-4' />
              </Button>
              <span className='text-xl font-bold px-4'>
                {formData.quantity}
              </span>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => handleQuantityChange(true)}
                disabled={formData.quantity >= 10}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            <p className='text-sm text-gray-600 mt-1'>
              Maximum 10 tickets per purchase
            </p>
          </div>

          {/* Price Summary */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='flex justify-between items-center'>
              <span className='text-lg'>
                Total ({formData.quantity} ticket
                {formData.quantity > 1 ? 's' : ''})
              </span>
              <span className='text-2xl font-bold text-green-600'>
                R{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-6 rounded-full shadow-lg'
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <Ticket className='mr-2 h-5 w-5' />
                Purchase {formData.quantity} Ticket
                {formData.quantity > 1 ? 's' : ''} - R{totalPrice.toFixed(2)}
              </>
            )}
          </Button>
        </div>

        <div className='text-center text-sm text-gray-600 mt-4'>
          <p>🔒 Secure payment powered by Yoco</p>
          <p>
            📱 You'll receive your ticket(s) with QR code via email after
            payment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
