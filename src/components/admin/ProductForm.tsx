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
import { getProduct, saveProduct } from "@/services/products";
import type { Product } from "@/services/types";

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
};

type FormState = typeof empty;

function toForm(product: Product): FormState {
  return {
    title: product.title,
    slug: product.slug,
    short_description: product.short_description,
    detailed_description: product.detailed_description,
    includes: product.includes,
    learn: product.learn,
    purchase_instructions: product.purchase_instructions,
    price_amount: product.price_amount?.toString() ?? "",
    price_currency: product.price_currency,
    image_url: product.image_url,
    is_active: product.is_active,
  };
}

export function ProductForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [ready, setReady] = useState(!id);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "product", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const product = await getProduct(id!);
      if (product) setForm(toForm(product));
      setReady(true);
      return product;
    },
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Naslov je obavezan.");
      return;
    }
    setSaving(true);
    try {
      await saveProduct(id ?? null, {
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
      });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
      navigate({ to: "/admin/proizvodi" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <AdminPage title="Proizvod">Učitavanje…</AdminPage>;
  }

  return (
    <AdminPage title={id ? "Izmena proizvoda" : "Novi proizvod"}>
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <Field
            label="Adresa stranice (slug)"
            hint={`Stranica: /prirucnik/${form.slug || slugify(form.title) || "…"}`}
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
            label="Detaljan opis (stranica proizvoda)"
            rows={5}
            value={form.detailed_description}
            onChange={(v) => set("detailed_description", v)}
          />
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
            label="Slika proizvoda"
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
          <Button variant="quiet" size="touch" onClick={() => navigate({ to: "/admin/proizvodi" })}>
            Otkaži
          </Button>
        </div>
      </Card>
    </AdminPage>
  );
}
