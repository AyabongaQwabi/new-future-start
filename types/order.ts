export interface Order {
  id: string
  created_at: string
  updated_at: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  product_name: string
  amount: number
  status: OrderStatus
  payment_status: string
  checkout_id?: string
  tracking_number?: string
  notes?: string
  // New delivery fields
  delivery_method?: "paxi" | "door_to_door"
  delivery_speed?: "pep_9_days" | "pep_5_days"
  paxi_code?: string
  delivery_address?: string
  delivery_fee: number
  // New promo fields
  promo_code?: string
  discount_amount: number
  final_price: number
}

export interface OrderTracking {
  id: string
  order_id: string
  status: string
  notes?: string
  created_at: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

export interface DeliveryDetails {
  method: "paxi" | "door_to_door"
  speed?: "pep_9_days" | "pep_5_days"
  paxiCode?: string
  address?: string
  fee: number
}

export interface PromoCode {
  code: string
  discount_amount: number
  is_active: boolean
  usage_limit?: number
  times_used: number
  expires_at?: string
}

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled"

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending Payment",
  paid: "Payment Received",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}
