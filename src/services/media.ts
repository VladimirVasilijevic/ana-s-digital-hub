import { supabase } from "@/integrations/supabase/client";
import type { MediaAppearance, MediaAppearanceInput } from "./types";

export async function listMedia(): Promise<MediaAppearance[]> {
  const { data, error } = await supabase
    .from("media_appearances")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getMedia(id: string): Promise<MediaAppearance | null> {
  const { data, error } = await supabase.from("media_appearances").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveMedia(id: string | null, input: MediaAppearanceInput) {
  const query = id
    ? supabase.from("media_appearances").update(input).eq("id", id).select().single()
    : supabase.from("media_appearances").insert(input).select().single();
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function setMediaActive(id: string, isActive: boolean) {
  const { error } = await supabase.from("media_appearances").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

export async function deleteMedia(id: string) {
  const { error } = await supabase.from("media_appearances").delete().eq("id", id);
  if (error) throw error;
}
