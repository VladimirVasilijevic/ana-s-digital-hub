import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AdminPage,
  Card,
  Field,
  FileField,
  TextareaField,
  ToggleField,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getFreeResource, saveFreeResource } from "@/services/freeContent";
import type { FreeResource } from "@/services/types";

const empty = {
  title: "",
  description: "",
  meta: "",
  cta_label: "Preuzmi besplatno →",
  image_url: null as string | null,
  file_url: null as string | null,
  external_url: "",
  is_active: true,
};

type FormState = typeof empty;

function toForm(resource: FreeResource): FormState {
  return {
    title: resource.title,
    description: resource.description,
    meta: resource.meta ?? "",
    cta_label: resource.cta_label,
    image_url: resource.image_url,
    file_url: resource.file_url,
    external_url: resource.external_url ?? "",
    is_active: resource.is_active,
  };
}

export function FreeResourceForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [ready, setReady] = useState(!id);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "free", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const resource = await getFreeResource(id!);
      if (resource) setForm(toForm(resource));
      setReady(true);
      return resource;
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
      await saveFreeResource(id ?? null, {
        title: form.title.trim(),
        description: form.description,
        meta: form.meta || null,
        cta_label: form.cta_label || "Preuzmi besplatno →",
        image_url: form.image_url,
        file_url: form.file_url,
        external_url: form.external_url || null,
        is_active: form.is_active,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
      navigate({ to: "/admin/besplatno" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) return <AdminPage title="Materijal">Učitavanje…</AdminPage>;

  return (
    <AdminPage title={id ? "Izmena materijala" : "Novi besplatan materijal"}>
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <TextareaField
            label="Opis"
            rows={3}
            value={form.description}
            onChange={(v) => set("description", v)}
          />
          <Field
            label="Oznaka"
            hint="Npr. „PDF · 8 strana“."
            value={form.meta}
            onChange={(v) => set("meta", v)}
          />
          <Field label="Tekst dugmeta" value={form.cta_label} onChange={(v) => set("cta_label", v)} />
          <FileField
            label="Slika"
            folder="free-content"
            value={form.image_url}
            onChange={(v) => set("image_url", v)}
          />
          <FileField
            label="Fajl za preuzimanje (PDF)"
            folder="free-content"
            accept=".pdf,application/pdf"
            preview={false}
            value={form.file_url}
            onChange={(v) => set("file_url", v)}
          />
          <Field
            label="Ili spoljni link"
            hint="Koristi se ako fajl nije otpremljen."
            value={form.external_url}
            onChange={(v) => set("external_url", v)}
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
          <Button variant="quiet" size="touch" onClick={() => navigate({ to: "/admin/besplatno" })}>
            Otkaži
          </Button>
        </div>
      </Card>
    </AdminPage>
  );
}
