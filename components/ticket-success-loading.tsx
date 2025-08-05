export default function TicketSuccessLoading() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>Processing your ticket...</p>
      </div>
    </div>
  );
}
