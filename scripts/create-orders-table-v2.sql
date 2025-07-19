-- Drop and recreate orders table with correct constraints
DROP TABLE IF EXISTS order_tracking;
DROP TABLE IF EXISTS orders;

-- Create orders table with proper nullable fields
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  checkout_id TEXT, -- Made nullable since we create order before checkout
  payment_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'pending',
  product_name TEXT NOT NULL,
  tracking_number TEXT,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  -- Delivery fields
  delivery_method TEXT CHECK (delivery_method IN ('paxi', 'door_to_door')),
  delivery_speed TEXT CHECK (delivery_speed IN ('pep_9_days', 'pep_5_days')),
  paxi_code TEXT,
  delivery_address TEXT,
  delivery_fee INTEGER DEFAULT 0,
  -- Promo fields
  promo_code TEXT,
  discount_amount INTEGER DEFAULT 0,
  final_price INTEGER
);

-- Create indexes for faster queries
CREATE INDEX idx_orders_checkout_id ON orders(checkout_id) WHERE checkout_id IS NOT NULL;
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_tracking_number ON orders(tracking_number) WHERE tracking_number IS NOT NULL;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create order_tracking table for status history
CREATE TABLE order_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT -- admin user who made the change
);

CREATE INDEX idx_order_tracking_order_id ON order_tracking(order_id);

-- Create promo_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS promo_codes (
  code TEXT PRIMARY KEY,
  discount_amount INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  usage_limit INTEGER,
  times_used INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample promo codes
INSERT INTO promo_codes (code, discount_amount, is_active, usage_limit, expires_at) VALUES
('STUDENT10', 1000, TRUE, 100, '2025-12-31 23:59:59'),
('WELCOME20', 2000, TRUE, 50, '2025-12-31 23:59:59'),
('SAVE50', 5000, TRUE, 25, '2025-12-31 23:59:59')
ON CONFLICT (code) DO NOTHING;
