import { supabase } from "@/integrations/supabase/client";

export type SiteTexts = Record<string, string>;

export async function getSiteTexts(): Promise<SiteTexts> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const texts: SiteTexts = {};
  for (const row of data ?? []) texts[row.key] = row.value;
  return texts;
}

export async function saveSiteTexts(values: SiteTexts) {
  const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
  if (error) throw error;
}
