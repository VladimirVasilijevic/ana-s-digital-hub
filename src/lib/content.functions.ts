import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Texts, contact and payment settings — needed on every page. */
export const getGlobalContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [site, contact, payment] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    supabase.from("contact_settings").select("*").limit(1).maybeSingle(),
    supabase.from("payment_settings").select("*").limit(1).maybeSingle(),
  ]);

  const texts: Record<string, string> = {};
  for (const row of site.data ?? []) texts[row.key] = row.value;

  return { texts, contact: contact.data ?? null, payment: payment.data ?? null };
});

/** Everything the homepage renders. */
export const getHomeContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [products, freeResources, webinar, media, consultation] = await Promise.all([
    supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    supabase.from("free_resources").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    supabase
      .from("webinars")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("media_appearances").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    supabase.from("consultation").select("*").limit(1).maybeSingle(),
  ]);

  return {
    products: products.data ?? [],
    freeResources: freeResources.data ?? [],
    webinar: webinar.data ?? null,
    media: media.data ?? [],
    consultation: consultation.data ?? null,
  };
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    return product ?? null;
  });

export const getConsultation = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient().from("consultation").select("*").limit(1).maybeSingle();
  return data ?? null;
});
