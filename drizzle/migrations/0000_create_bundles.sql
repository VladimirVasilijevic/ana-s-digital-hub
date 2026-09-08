CREATE TABLE public.bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  detailed_description text NOT NULL DEFAULT '',
  image_url text,
  price_amount integer,
  price_currency text NOT NULL DEFAULT 'RSD',
  includes text[] NOT NULL DEFAULT '{}',
  learn text[] NOT NULL DEFAULT '{}',
  purchase_instructions text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.bundles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bundles TO authenticated;
GRANT ALL ON public.bundles TO service_role;

ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads active bundles" ON public.bundles
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "admin reads all bundles" ON public.bundles
  FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "admin writes bundles" ON public.bundles
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE TRIGGER bundles_touch BEFORE UPDATE ON public.bundles
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TABLE public.bundle_products (
  bundle_id uuid NOT NULL REFERENCES public.bundles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  position integer NOT NULL DEFAULT 0,
  PRIMARY KEY (bundle_id, product_id)
);

GRANT SELECT ON public.bundle_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bundle_products TO authenticated;
GRANT ALL ON public.bundle_products TO service_role;

ALTER TABLE public.bundle_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads bundle products" ON public.bundle_products
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin writes bundle products" ON public.bundle_products
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());