-- Make checkout_id nullable since we create the order before getting the checkout ID from Yoco
ALTER TABLE orders ALTER COLUMN checkout_id DROP NOT NULL;

-- Also make payment_id nullable if it isn't already
ALTER TABLE orders ALTER COLUMN payment_id DROP NOT NULL;

-- Update the unique constraint to allow nulls
DROP INDEX IF EXISTS idx_orders_checkout_id;
CREATE INDEX idx_orders_checkout_id ON orders(checkout_id) WHERE checkout_id IS NOT NULL;
