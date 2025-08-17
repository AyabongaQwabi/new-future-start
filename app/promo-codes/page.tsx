import { Metadata } from 'next'
import PromoCodeVerifier from '@/components/promo-code-verifier'

export const metadata: Metadata = {
  title: 'Promo Code Verification - Future Start',
  description: 'Verify your promo codes and see discount details for Future Start services.',
}

export default function PromoCodesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Promo Code Verification
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your promo code below to verify its validity and see the discount details.
            </p>
          </div>

          {/* Main Content */}
          <PromoCodeVerifier />
        </div>
      </div>
    </div>
  )
} 