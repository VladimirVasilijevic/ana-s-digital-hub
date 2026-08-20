import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field, ListField, TextareaField, ToggleField } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getConsultationRecord, saveConsultation } from "@/services/consultation";
import type { Consultation } from "@/services/types";

export const Route = createFileRoute("/_authenticated/admin/konsultacije")({
  component: ConsultationSettings,
});

function ConsultationSettings() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Consultation | null>(null);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "consultation"],
    queryFn: async () => {
      const record = await getConsultationRecord();
      setForm(record);
      return record;
    },
  });

  const set = <K extends keyof Consultation>(key: K, value: Consultation[K]) =>
    setForm((current) => (current ? { ...current, [key]: value } : current));

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    try {
      await saveConsultation(form.id, {
        title: form.title,
        short_description: form.short_description,
        detailed_description: form.detailed_description,
        includes: form.includes,
        how_it_works: form.how_it_works,
        form_url: form.form_url,
        price_amount: form.price_amount,
        price_currency: form.price_currency,
        is_active: form.is_active,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!form) return <AdminPage title="Konsultacije">Učitavanje…</AdminPage>;

  return (
    <AdminPage title="Konsultacije" description="Sadržaj stranice /konsultacije.">
      <Card>
        <div className="space-y-4">
          <Field label="Naslov" value={form.title} onChange={(v) => set("title", v)} />
          <TextareaField
            label="Kratak opis (kartica na početnoj)"
            rows={3}
            value={form.short_description}
            onChange={(v) => set("short_description", v)}
          />
          <TextareaField
            label="Detaljan opis"
            rows={5}
            value={form.detailed_description}
            onChange={(v) => set("detailed_description", v)}
          />
          <ListField label="Šta dobijaš" value={form.includes} onChange={(v) => set("includes", v)} />
          <ListField label="Kako izgleda proces" value={form.how_it_works} onChange={(v) => set("how_it_works", v)} />
          <Field
            label="Link ka Google formi"
            value={form.form_url}
            onChange={(v) => set("form_url", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Cena"
              type="number"
              value={form.price_amount?.toString() ?? ""}
              onChange={(v) => set("price_amount", v ? Number(v) : null)}
            />
            <Field label="Valuta" value={form.price_currency} onChange={(v) => set("price_currency", v)} />
          </div>
          <ToggleField label="Prikaži na sajtu" checked={form.is_active} onChange={(v) => set("is_active", v)} />
        </div>
        <Button variant="hero" size="touch" className="mt-5" onClick={handleSave} disabled={saving}>
          {saving ? "Čuvanje…" : "Sačuvaj"}
        </Button>
      </Card>
    </AdminPage>
  );
}
