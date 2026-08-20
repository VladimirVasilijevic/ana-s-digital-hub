REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;

DROP POLICY IF EXISTS "public reads active products" ON public.products;
CREATE POLICY "public reads active products" ON public.products FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "admin reads all products" ON public.products FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public reads active free resources" ON public.free_resources;
CREATE POLICY "public reads active free resources" ON public.free_resources FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "admin reads all free resources" ON public.free_resources FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public reads active media" ON public.media_appearances;
CREATE POLICY "public reads active media" ON public.media_appearances FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "admin reads all media" ON public.media_appearances FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public reads active webinars" ON public.webinars;
CREATE POLICY "public reads active webinars" ON public.webinars FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "admin reads all webinars" ON public.webinars FOR SELECT TO authenticated USING (public.is_admin());