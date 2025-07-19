-- Update promo code usage tracking to handle string-based times_used
UPDATE promo_codes 
SET times_used = COALESCE(times_used::text, '0')
WHERE times_used IS NULL;

-- Ensure is_active is properly set as string
UPDATE promo_codes 
SET is_active = CASE 
  WHEN is_active::text = 'true' OR is_active::text = 't' OR is_active::text = '1' THEN 'true'
  ELSE 'false'
END;

-- Check current promo codes structure
SELECT 
  code,
  discount_amount,
  is_active,
  usage_limit,
  times_used,
  expires_at,
  created_at
FROM promo_codes
ORDER BY created_at DESC;
