import { supabase } from "@/integrations/supabase/client";
import type { FreeResource, FreeResourceInput } from "./types";

export async function listFreeResources(): Promise<FreeResource[]> {
  const { data, error } = await supabase
    .from("free_resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getFreeResource(id: string): Promise<FreeResource | null> {
  const { data, error } = await supabase.from("free_resources").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveFreeResource(id: string | null, input: FreeResourceInput) {
  const query = id
    ? supabase.from("free_resources").update(input).eq("id", id).select().single()
    : supabase.from("free_resources").insert(input).select().single();
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function setFreeResourceActive(id: string, isActive: boolean) {
  const { error } = await supabase.from("free_resources").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

export async function deleteFreeResource(id: string) {
  const { error } = await supabase.from("free_resources").delete().eq("id", id);
  if (error) throw error;
}
