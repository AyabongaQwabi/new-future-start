'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Info, Percent, Calendar, Users, Clock, Hash } from 'lucide-react'
import { toast } from 'sonner'

const promoCodeSchema = z.object({
  code: z.string().min(1, 'Promo code is required').max(50, 'Promo code is too long'),
})

type PromoCodeForm = z.infer<typeof promoCodeSchema>

interface PromoCodeResult {
  valid: boolean
  code: string
  discount: number
  discountAmount: number
  description: string
  message?: string
  // Additional details from Supabase
  usage_limit?: number
  times_used?: number
  expires_at?: string
  created_at?: string
  is_active?: boolean
}

export default function PromoCodeVerifier() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PromoCodeResult | null>(null)
  const [recentCodes, setRecentCodes] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromoCodeForm>({
    resolver: zodResolver(promoCodeSchema),
  })

  const onSubmit = async (data: PromoCodeForm) => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: data.code }),
      })

      const resultData = await response.json()

      if (response.ok) {
        setResult(resultData)
        // Add to recent codes if not already there
        if (!recentCodes.includes(data.code.toUpperCase())) {
          setRecentCodes(prev => [data.code.toUpperCase(), ...prev.slice(0, 4)])
        }
        toast.success('Promo code verified successfully!')
      } else {
        setResult({
          valid: false,
          code: data.code,
          discount: 0,
          discountAmount: 0,
          description: '',
          message: resultData.message,
        })
        toast.error(resultData.message || 'Failed to verify promo code')
      }
    } catch (error) {
      console.error('Error verifying promo code:', error)
      setResult({
        valid: false,
        code: data.code,
        discount: 0,
        discountAmount: 0,
        description: '',
        message: 'Network error. Please try again.',
      })
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setResult(null)
    reset()
  }

  const handleRecentCodeClick = (code: string) => {
    reset({ code })
    handleSubmit(onSubmit)({ code })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatExpiryStatus = (expiresAt: string) => {
    if (!expiresAt) return { status: 'No expiry', color: 'bg-gray-100 text-gray-700' }
    
    const expiryDate = new Date(expiresAt)
    const currentDate = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) {
      return { status: 'Expired', color: 'bg-red-100 text-red-700' }
    } else if (daysUntilExpiry <= 7) {
      return { status: `Expires in ${daysUntilExpiry} days`, color: 'bg-orange-100 text-orange-700' }
    } else {
      return { status: `Expires in ${daysUntilExpiry} days`, color: 'bg-green-100 text-green-700' }
    }
  }

  const formatUsageStatus = (timesUsed: number, usageLimit: number) => {
    if (!usageLimit || usageLimit === 0) return { status: 'Unlimited', color: 'bg-blue-100 text-blue-700' }
    
    const percentage = Math.round((timesUsed / usageLimit) * 100)
    if (percentage >= 90) {
      return { status: `${timesUsed}/${usageLimit} (${percentage}%)`, color: 'bg-red-100 text-red-700' }
    } else if (percentage >= 70) {
      return { status: `${timesUsed}/${usageLimit} (${percentage}%)`, color: 'bg-orange-100 text-orange-700' }
    } else {
      return { status: `${timesUsed}/${usageLimit} (${percentage}%)`, color: 'bg-green-100 text-green-700' }
    }
  }

  return (
    <div className="space-y-8">
      {/* Promo Code Input Form */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Enter Promo Code
          </CardTitle>
          <CardDescription>
            Type in your promo code and click verify to check its validity and discount details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code</Label>
              <div className="flex gap-3">
                <Input
                  id="code"
                  placeholder="Enter your promo code (e.g., MSMS001)"
                  className="flex-1 text-lg font-mono tracking-wider"
                  {...register('code')}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading} className="px-8">
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
              {errors.code && (
                <p className="text-sm text-red-600">{errors.code.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Codes */}
      {recentCodes.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recently Verified Codes</CardTitle>
            <CardDescription>Click on a code to verify it again</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentCodes.map((code, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={() => handleRecentCodeClick(code)}
                >
                  {code}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className={`shadow-lg border-0 ${
          result.valid 
            ? 'bg-green-50/80 border-green-200' 
            : 'bg-red-50/80 border-red-200'
        } backdrop-blur-sm`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              {result.valid ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <CardTitle className={result.valid ? 'text-green-800' : 'text-red-800'}>
                {result.valid ? 'Valid Promo Code!' : 'Invalid Promo Code'}
              </CardTitle>
            </div>
            <CardDescription className={result.valid ? 'text-green-700' : 'text-red-700'}>
              {result.valid ? result.description : result.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.valid ? (
              <div className="space-y-6">
                {/* Main Discount Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-100 rounded-lg">
                    <Percent className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Discount Amount</p>
                      <p className="text-3xl font-bold text-green-900">
                        R{(result.discount / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-100 rounded-lg">
                    <Hash className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-800">Code</p>
                      <p className="text-2xl font-mono font-bold text-blue-900">
                        {result.code}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Usage Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Usage Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Usage Limit:</span>
                        <Badge variant="outline" className="font-mono">
                          {result.usage_limit ? result.usage_limit : 'Unlimited'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Times Used:</span>
                        <Badge variant="outline" className="font-mono">
                          {result.times_used || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={formatUsageStatus(result.times_used || 0, result.usage_limit || 0).color}>
                          {formatUsageStatus(result.times_used || 0, result.usage_limit || 0).status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Date Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Created:</span>
                        <span className="text-sm font-medium text-gray-800">
                          {formatDate(result.created_at || '')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Expires:</span>
                        <Badge className={formatExpiryStatus(result.expires_at || '').color}>
                          {formatExpiryStatus(result.expires_at || '').status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Status:</span>
                        <Badge className={result.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {result.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    This promo code is valid and ready to use!
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/checkout'} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-red-700 mb-4">{result.message}</p>
                <Button variant="outline" onClick={handleClear}>
                  Try Another Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* How It Works */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>How Promo Code Verification Works</CardTitle>
          <CardDescription>
            Learn how our promo code system works and what you can expect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Enter Code</h3>
              <p className="text-sm text-gray-600">
                Type your promo code in the input field above
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Verification</h3>
              <p className="text-sm text-gray-600">
                Get immediate validation and detailed discount information
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Apply Discount</h3>
              <p className="text-sm text-gray-600">
                Use your valid code during checkout
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 