-- Check if promo_codes table exists and has data
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'promo_codes'
ORDER BY ordinal_position;

-- Check existing promo codes
SELECT * FROM promo_codes;

-- If no data exists, insert some test promo codes
INSERT INTO promo_codes (code, discount_amount, discount_type, description, active, max_uses, times_used, expires_at, created_at, updated_at)
VALUES 
  ('SAVE50', 5000, 'fixed', 'Save R50 on your order', true, 100, 0, '2025-12-31', NOW(), NOW()),
  ('STUDENT10', 1000, 'fixed', 'Student discount - R10 off', true, 500, 0, '2025-12-31', NOW(), NOW()),
  ('WELCOME25', 2500, 'fixed', 'Welcome discount - R25 off', true, 200, 0, '2025-12-31', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;
