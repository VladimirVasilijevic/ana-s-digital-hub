import { supabase } from "@/integrations/supabase/client";
import type { ContactSettings, PaymentSettings } from "./types";

export async function getContactSettings(): Promise<ContactSettings | null> {
  const { data, error } = await supabase.from("contact_settings").select("*").limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveContactSettings(id: string, input: Partial<ContactSettings>) {
  const { error } = await supabase.from("contact_settings").update(input).eq("id", id);
  if (error) throw error;
}

export async function getPaymentSettings(): Promise<PaymentSettings | null> {
  const { data, error } = await supabase.from("payment_settings").select("*").limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

export async function savePaymentSettings(id: string, input: Partial<PaymentSettings>) {
  const { error } = await supabase.from("payment_settings").update(input).eq("id", id);
  if (error) throw error;
}
