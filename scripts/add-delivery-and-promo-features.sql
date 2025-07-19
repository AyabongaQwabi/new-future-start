-- Add delivery and promo code columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_method TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_speed TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paxi_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_fee INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS promo_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount_amount INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS final_price INTEGER;

-- Create promo_codes table
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
