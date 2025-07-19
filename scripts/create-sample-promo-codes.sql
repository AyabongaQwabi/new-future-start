-- Create sample promo codes for testing
INSERT INTO promo_codes (
  code,
  description,
  discount_type,
  discount_amount,
  min_order_amount,
  max_uses,
  times_used,
  active,
  expires_at,
  created_at,
  updated_at
) VALUES 
(
  'WELCOME10',
  'Welcome discount - R10 off your first order',
  'fixed',
  1000, -- R10 in cents
  0,
  100,
  0,
  true,
  '2025-12-31 23:59:59',
  NOW(),
  NOW()
),
(
  'STUDENT20',
  'Student discount - R20 off for students',
  'fixed',
  2000, -- R20 in cents
  0,
  50,
  0,
  true,
  '2025-06-30 23:59:59',
  NOW(),
  NOW()
),
(
  'SAVE5',
  'Save R5 on any order',
  'fixed',
  500, -- R5 in cents
  0,
  200,
  0,
  true,
  '2025-03-31 23:59:59',
  NOW(),
  NOW()
),
(
  'NEWUSER',
  'New user discount - R15 off',
  'fixed',
  1500, -- R15 in cents
  0,
  75,
  0,
  true,
  '2025-09-30 23:59:59',
  NOW(),
  NOW()
),
(
  'BULK25',
  'Bulk order discount - R25 off',
  'fixed',
  2500, -- R25 in cents
  40000, -- Minimum R400 order
  25,
  0,
  true,
  '2025-08-31 23:59:59',
  NOW(),
  NOW()
)
ON CONFLICT (code) DO NOTHING;
