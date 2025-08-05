import { Suspense } from 'react';
import VerifyTicketContent from '@/components/verify-ticket-content';
import VerifyTicketLoading from '@/components/verify-ticket-loading';

export default function VerifyTicketPage() {
  return (
    <Suspense fallback={<VerifyTicketLoading />}>
      <VerifyTicketContent />
    </Suspense>
  );
}
