import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field, FileField, TextareaField, ToggleField } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getMedia, saveMedia } from "@/services/media";
import type { MediaAppearance } from "@/services/types";

const empty = {
  title: "",
  description: "",
  source: "",
  url: "",
  image_url: null as string | null,
  is_active: true,
};

type FormState = typeof empty;

function toForm(item: MediaAppearance): FormState {
  return {
    title: item.title,
    description: item.description,
    source: item.source ?? "",
    url: item.url,
    image_url: item.image_url,
    is_active: item.is_active,
  };
}

export function MediaForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [ready, setReady] = useState(!id);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "media", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const item = await getMedia(id!);
      if (item) setForm(toForm(item));
      setReady(true);
      return item;
    },
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSave() {
    if (!form.title.trim() || !form.url.trim()) {
      toast.error("Naslov i link su obavezni.");
      return;
    }
    setSaving(true);
    try {
      await saveMedia(id ?? null, {
        title: form.title.trim(),
        description: form.description,
        source: form.source || null,
        url: form.url.trim(),
        image_url: form.image_url,
        is_active: form.is_active,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
      navigate({ to: "/admin/mediji" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) return <AdminPage title="Gostovanje">Učitavanje…</AdminPage>;

  return (
    <AdminPage title={id ? "Izmena gostovanja" : "Novo gostovanje"}>
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <Field label="Kanal / emisija" value={form.source} onChange={(v) => set("source", v)} />
          <Field
            label="Link (YouTube)"
            hint="Ako je YouTube link, sličica se preuzima automatski."
            value={form.url}
            onChange={(v) => set("url", v)}
          />
          <TextareaField label="Kratak opis" rows={3} value={form.description} onChange={(v) => set("description", v)} />
          <FileField label="Sličica (opciono)" folder="media" value={form.image_url} onChange={(v) => set("image_url", v)} />
          <ToggleField label="Prikaži na sajtu" checked={form.is_active} onChange={(v) => set("is_active", v)} />
        </div>

        <div className="mt-5 flex gap-2">
          <Button variant="hero" size="touch" onClick={handleSave} disabled={saving}>
            {saving ? "Čuvanje…" : "Sačuvaj"}
          </Button>
          <Button variant="quiet" size="touch" onClick={() => navigate({ to: "/admin/mediji" })}>
            Otkaži
          </Button>
        </div>
      </Card>
    </AdminPage>
  );
}
