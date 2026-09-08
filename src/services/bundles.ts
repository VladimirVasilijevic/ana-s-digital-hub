import { supabase } from "@/integrations/supabase/client";
import type { Bundle, BundleInput } from "./types";

export async function listBundles(): Promise<Bundle[]> {
  const { data, error } = await supabase
    .from("bundles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBundle(
  id: string,
): Promise<{ bundle: Bundle; productIds: string[] } | null> {
  const { data, error } = await supabase.from("bundles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const { data: links, error: linkError } = await supabase
    .from("bundle_products")
    .select("product_id, position")
    .eq("bundle_id", id)
    .order("position", { ascending: true });
  if (linkError) throw linkError;

  return { bundle: data, productIds: (links ?? []).map((l) => l.product_id) };
}

export async function saveBundle(
  id: string | null,
  input: BundleInput,
  productIds: string[],
): Promise<Bundle> {
  const query = id
    ? supabase.from("bundles").update(input).eq("id", id).select().single()
    : supabase.from("bundles").insert(input).select().single();
  const { data, error } = await query;
  if (error) throw error;

  const bundleId = data.id;
  const { error: deleteError } = await supabase
    .from("bundle_products")
    .delete()
    .eq("bundle_id", bundleId);
  if (deleteError) throw deleteError;

  if (productIds.length) {
    const { error: insertError } = await supabase.from("bundle_products").insert(
      productIds.map((productId, index) => ({
        bundle_id: bundleId,
        product_id: productId,
        position: index,
      })),
    );
    if (insertError) throw insertError;
  }

  return data;
}

export async function setBundleActive(id: string, isActive: boolean) {
  const { error } = await supabase.from("bundles").update({ is_active: isActive }).eq("id", id);
  if (error) throw error;
}

export async function deleteBundle(id: string) {
  const { error } = await supabase.from("bundles").delete().eq("id", id);
  if (error) throw error;
}
