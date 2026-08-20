CREATE POLICY "content readable" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'content');
CREATE POLICY "admin uploads content" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content' AND public.is_admin());
CREATE POLICY "admin updates content" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'content' AND public.is_admin()) WITH CHECK (bucket_id = 'content' AND public.is_admin());
CREATE POLICY "admin deletes content" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'content' AND public.is_admin());