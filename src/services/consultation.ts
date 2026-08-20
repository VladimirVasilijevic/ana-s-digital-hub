import { supabase } from "@/integrations/supabase/client";
import type { Consultation } from "./types";

export async function getConsultationRecord(): Promise<Consultation | null> {
  const { data, error } = await supabase.from("consultation").select("*").limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveConsultation(id: string, input: Partial<Consultation>) {
  const { error } = await supabase.from("consultation").update(input).eq("id", id);
  if (error) throw error;
}
