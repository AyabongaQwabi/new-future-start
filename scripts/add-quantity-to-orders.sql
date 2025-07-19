-- Add quantity column to orders table if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;

-- Update existing orders to have quantity = 1 if null
UPDATE orders 
SET quantity = 1 
WHERE quantity IS NULL;
