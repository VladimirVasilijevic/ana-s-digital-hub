import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field, FileField, TextareaField, ToggleField } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getWebinar, saveWebinar, setWebinarActive } from "@/services/webinars";
import type { Webinar } from "@/services/types";

const empty = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  registration_url: "",
  image_url: null as string | null,
  is_active: false,
};

type FormState = typeof empty;

function toForm(webinar: Webinar): FormState {
  return {
    title: webinar.title,
    description: webinar.description,
    event_date: webinar.event_date ?? "",
    event_time: webinar.event_time ?? "",
    registration_url: webinar.registration_url ?? "",
    image_url: webinar.image_url,
    is_active: webinar.is_active,
  };
}

export function WebinarForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);
  const [ready, setReady] = useState(!id);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "webinar", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const webinar = await getWebinar(id!);
      if (webinar) setForm(toForm(webinar));
      setReady(true);
      return webinar;
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
      const saved = await saveWebinar(id ?? null, {
        title: form.title.trim(),
        description: form.description,
        event_date: form.event_date || null,
        event_time: form.event_time || null,
        registration_url: form.registration_url || null,
        image_url: form.image_url,
        is_active: false,
      });
      // Only one webinar may be active on the homepage.
      await setWebinarActive(saved.id, form.is_active);
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
      navigate({ to: "/admin/webinari" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) return <AdminPage title="Webinar">Učitavanje…</AdminPage>;

  return (
    <AdminPage title={id ? "Izmena webinara" : "Novi webinar"}>
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <TextareaField label="Opis" rows={4} value={form.description} onChange={(v) => set("description", v)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Datum" placeholder="12. septembar" value={form.event_date} onChange={(v) => set("event_date", v)} />
            <Field label="Vreme" placeholder="20h · online" value={form.event_time} onChange={(v) => set("event_time", v)} />
          </div>
          <Field
            label="Link za prijavu"
            hint="Bez linka webinar se ne prikazuje na početnoj."
            value={form.registration_url}
            onChange={(v) => set("registration_url", v)}
          />
          <FileField label="Slika" folder="media" value={form.image_url} onChange={(v) => set("image_url", v)} />
          <ToggleField
            label="Aktivan na početnoj"
            hint="Samo jedan webinar može biti aktivan."
            checked={form.is_active}
            onChange={(v) => set("is_active", v)}
          />
        </div>

        <div className="mt-5 flex gap-2">
          <Button variant="hero" size="touch" onClick={handleSave} disabled={saving}>
            {saving ? "Čuvanje…" : "Sačuvaj"}
          </Button>
          <Button variant="quiet" size="touch" onClick={() => navigate({ to: "/admin/webinari" })}>
            Otkaži
          </Button>
        </div>
      </Card>
    </AdminPage>
  );
}
