"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Loader2, Search, Eye, Edit, Package, TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Order, OrderStatus } from "@/types/order"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/types/order"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateNotes, setUpdateNotes] = useState("")

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    paid: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const loadOrders = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setOrders(data || [])
      calculateStats(data || [])
    } catch (err) {
      console.error("Error loading orders:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (ordersData: Order[]) => {
    const stats = ordersData.reduce(
      (acc, order) => {
        acc.total++
        acc[order.status as keyof typeof acc]++
        if (
          order.status === "paid" ||
          order.status === "processing" ||
          order.status === "shipped" ||
          order.status === "delivered"
        ) {
          acc.totalRevenue += order.amount
        }
        return acc
      },
      {
        total: 0,
        pending: 0,
        paid: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        refunded: 0,
        totalRevenue: 0,
      },
    )

    setStats(stats)
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.includes(searchTerm),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(true)
    try {
      // Update order status
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === "shipped" && { shipped_at: new Date().toISOString() }),
          ...(newStatus === "delivered" && { delivered_at: new Date().toISOString() }),
        })
        .eq("id", orderId)

      if (updateError) throw updateError

      // Add tracking entry
      const { error: trackingError } = await supabase.from("order_tracking").insert({
        order_id: orderId,
        status: newStatus,
        notes: updateNotes || `Status updated to ${ORDER_STATUS_LABELS[newStatus]}`,
        created_by: "admin",
      })

      if (trackingError) throw trackingError

      // Refresh orders
      await loadOrders()
      setSelectedOrder(null)
      setUpdateNotes("")
    } catch (err) {
      console.error("Error updating order:", err)
      alert("Failed to update order status")
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold">{stats.delivered}</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by email, name, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-mono text-sm">#{order.id.slice(-8)}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-gray-600">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{order.product_name}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{formatPrice(order.amount)}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{formatDate(order.created_at)}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Order ID</Label>
                                    <p className="font-mono">{order.id}</p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Badge className={ORDER_STATUS_COLORS[order.status]}>
                                      {ORDER_STATUS_LABELS[order.status]}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label>Customer Name</Label>
                                    <p>{order.customer_name}</p>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <p>{order.customer_email}</p>
                                  </div>
                                  <div>
                                    <Label>Phone</Label>
                                    <p>{order.customer_phone || "N/A"}</p>
                                  </div>
                                  <div>
                                    <Label>Amount</Label>
                                    <p className="font-medium">{formatPrice(order.amount)}</p>
                                  </div>
                                  <div>
                                    <Label>Created</Label>
                                    <p>{formatDate(order.created_at)}</p>
                                  </div>
                                  <div>
                                    <Label>Updated</Label>
                                    <p>{formatDate(order.updated_at)}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Order Status</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Current Status</Label>
                                  <Badge className={ORDER_STATUS_COLORS[order.status]}>
                                    {ORDER_STATUS_LABELS[order.status]}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>New Status</Label>
                                  <Select
                                    onValueChange={(value) => {
                                      if (selectedOrder) {
                                        updateOrderStatus(selectedOrder.id, value as OrderStatus)
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select new status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="paid">Paid</SelectItem>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="shipped">Shipped</SelectItem>
                                      <SelectItem value="delivered">Delivered</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                      <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Notes (Optional)</Label>
                                  <Textarea
                                    value={updateNotes}
                                    onChange={(e) => setUpdateNotes(e.target.value)}
                                    placeholder="Add any notes about this status change..."
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
