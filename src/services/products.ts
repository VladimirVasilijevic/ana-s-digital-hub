import { supabase } from "@/integrations/supabase/client";
import type { Product, ProductInput } from "./types";

export async function listProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveProduct(id: string | null, input: ProductInput): Promise<Product> {
  const query = id
    ? supabase.from("products").update(input).eq("id", id).select().single()
    : supabase.from("products").insert(input).select().single();
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function setProductActive(id: string, isActive: boolean) {
  const { error } = await supabase.from("products").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
