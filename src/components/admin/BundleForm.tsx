import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AdminPage,
  Card,
  Field,
  FileField,
  ListField,
  TextareaField,
  ToggleField,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getBundle, saveBundle } from "@/services/bundles";
import { listProducts } from "@/services/products";
import type { Bundle } from "@/services/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const empty = {
  title: "",
  slug: "",
  short_description: "",
  detailed_description: "",
  includes: [] as string[],
  learn: [] as string[],
  purchase_instructions: "",
  price_amount: "",
  price_currency: "RSD",
  image_url: null as string | null,
  is_active: true,
  include_consultation: false,
};

type FormState = typeof empty;

function toForm(bundle: Bundle): FormState {
  return {
    title: bundle.title,
    slug: bundle.slug,
    short_description: bundle.short_description,
    detailed_description: bundle.detailed_description,
    includes: bundle.includes,
    learn: bundle.learn,
    purchase_instructions: bundle.purchase_instructions,
    price_amount: bundle.price_amount?.toString() ?? "",
    price_currency: bundle.price_currency,
    image_url: bundle.image_url,
    is_active: bundle.is_active,
    include_consultation: bundle.include_consultation,
  };
}

export function BundleForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [ready, setReady] = useState(!id);
  const [saving, setSaving] = useState(false);

  const { data: products } = useQuery({ queryKey: ["admin", "products"], queryFn: listProducts });

  useQuery({
    queryKey: ["admin", "bundle", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const result = await getBundle(id!);
      if (result) {
        setForm(toForm(result.bundle));
        setProductIds(result.productIds);
      }
      setReady(true);
      return result;
    },
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleProduct = (productId: string) =>
    setProductIds((current) =>
      current.includes(productId)
        ? current.filter((p) => p !== productId)
        : [...current, productId],
    );

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Naslov je obavezan.");
      return;
    }
    setSaving(true);
    try {
      await saveBundle(
        id ?? null,
        {
          title: form.title.trim(),
          slug: (form.slug.trim() || slugify(form.title)).trim(),
          short_description: form.short_description,
          detailed_description: form.detailed_description,
          includes: form.includes,
          learn: form.learn,
          purchase_instructions: form.purchase_instructions,
          price_amount: form.price_amount ? Number(form.price_amount) : null,
          price_currency: form.price_currency || "RSD",
          image_url: form.image_url,
          is_active: form.is_active,
          include_consultation: form.include_consultation,
        },
        productIds,
      );
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
      navigate({ to: "/admin/paketi" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <AdminPage title="Paket">Učitavanje…</AdminPage>;
  }

  return (
    <AdminPage title={id ? "Izmena paketa" : "Novi paket"}>
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <Field
            label="Adresa stranice (slug)"
            hint={`Stranica: /paket/${form.slug || slugify(form.title) || "…"}`}
            value={form.slug}
            onChange={(v) => set("slug", v)}
          />
          <TextareaField
            label="Kratak opis (kartica na početnoj)"
            rows={3}
            value={form.short_description}
            onChange={(v) => set("short_description", v)}
          />
          <TextareaField
            label="Detaljan opis (stranica paketa)"
            rows={5}
            value={form.detailed_description}
            onChange={(v) => set("detailed_description", v)}
          />

          <div>
            <p className="text-sm font-medium">Proizvodi u paketu</p>
            <div className="mt-2 space-y-2 rounded-xl border border-border p-3">
              {!products?.length ? (
                <p className="text-sm text-muted-foreground">Još nema proizvoda.</p>
              ) : (
                products.map((product) => (
                  <label key={product.id} className="flex items-center gap-3 text-[15px]">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-[hsl(var(--primary))]"
                      checked={productIds.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                    />
                    <span>{product.title}</span>
                  </label>
                ))
              )}
              <label className="flex items-center gap-3 border-t border-border pt-2 text-[15px]">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[hsl(var(--primary))]"
                  checked={form.include_consultation}
                  onChange={() => set("include_consultation", !form.include_consultation)}
                />
                <span>Uključi konsultaciju</span>
              </label>
            </div>
          </div>


          <ListField label="Šta dobijaš" value={form.includes} onChange={(v) => set("includes", v)} />
          <ListField label="Šta ćeš naučiti" value={form.learn} onChange={(v) => set("learn", v)} />
          <TextareaField
            label="Uputstvo nakon uplate"
            rows={3}
            value={form.purchase_instructions}
            onChange={(v) => set("purchase_instructions", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Cena"
              type="number"
              value={form.price_amount}
              onChange={(v) => set("price_amount", v)}
            />
            <Field
              label="Valuta"
              value={form.price_currency}
              onChange={(v) => set("price_currency", v)}
            />
          </div>
          <FileField
            label="Slika paketa"
            folder="products"
            value={form.image_url}
            onChange={(v) => set("image_url", v)}
          />
          <ToggleField
            label="Prikaži na sajtu"
            checked={form.is_active}
            onChange={(v) => set("is_active", v)}
          />
        </div>

        <div className="mt-5 flex gap-2">
          <Button variant="hero" size="touch" onClick={handleSave} disabled={saving}>
            {saving ? "Čuvanje…" : "Sačuvaj"}
          </Button>
          <Button variant="quiet" size="touch" onClick={() => navigate({ to: "/admin/paketi" })}>
            Otkaži
          </Button>
        </div>
      </Card>
    </AdminPage>
  );
}
