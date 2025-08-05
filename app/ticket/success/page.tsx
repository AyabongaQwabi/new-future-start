import { Suspense } from 'react';
import TicketSuccessContent from '@/components/ticket-success-content';
import TicketSuccessLoading from '@/components/ticket-success-loading';

export default function TicketSuccessPage() {
  return (
    <Suspense fallback={<TicketSuccessLoading />}>
      <TicketSuccessContent />
    </Suspense>
  );
}
