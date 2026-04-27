-- Create orders table for Flow payments
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    commerce_order TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL, -- 'products', 'booking', 'vestuario'
    payment_type TEXT NOT NULL, -- 'full', 'advance'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'rejected', 'cancelled'
    amount DECIMAL(10,2) NOT NULL,
    email TEXT NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    notes TEXT,
    items JSONB, -- list of items purchased/booked
    flow_status INTEGER,
    flow_order INTEGER,
    flow_token TEXT,
    payment_media TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (since creating a payment doesn't require login)
CREATE POLICY "Allow anonymous inserts" ON public.orders FOR INSERT TO anon WITH CHECK (true);

-- Only allow service role to update orders (webhook)
-- Frontend will poll status using the API
