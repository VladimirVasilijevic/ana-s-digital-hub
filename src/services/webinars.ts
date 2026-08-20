import { supabase } from "@/integrations/supabase/client";
import type { Webinar, WebinarInput } from "./types";

export async function listWebinars(): Promise<Webinar[]> {
  const { data, error } = await supabase
    .from("webinars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getWebinar(id: string): Promise<Webinar | null> {
  const { data, error } = await supabase.from("webinars").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveWebinar(id: string | null, input: WebinarInput) {
  const query = id
    ? supabase.from("webinars").update(input).eq("id", id).select().single()
    : supabase.from("webinars").insert(input).select().single();
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Only one webinar can be the active one on the homepage. */
export async function setWebinarActive(id: string, isActive: boolean) {
  if (isActive) {
    const { error: offError } = await supabase
      .from("webinars")
      .update({ is_active: false })
      .neq("id", id);
    if (offError) throw offError;
  }
  const { error } = await supabase.from("webinars").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

export async function deleteWebinar(id: string) {
  const { error } = await supabase.from("webinars").delete().eq("id", id);
  if (error) throw error;
}
