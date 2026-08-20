import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field, TextareaField } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getSiteTexts, saveSiteTexts, type SiteTexts } from "@/services/siteContent";

export const Route = createFileRoute("/_authenticated/admin/tekstovi")({
  component: TextsPage,
});

type FieldDef = { key: string; label: string; multiline?: boolean };
type Group = { title: string; fields: FieldDef[] };

const groups: Group[] = [
  {
    title: "Hero",
    fields: [
      { key: "hero.name", label: "Ime / naslov" },
      { key: "hero.tagline", label: "Podnaslov", multiline: true },
      { key: "cta.products", label: "Dugme — Proizvodi" },
      { key: "cta.consultations", label: "Dugme — Konsultacije" },
      { key: "cta.free", label: "Dugme — Besplatni sadržaj" },
      { key: "cta.webinar", label: "Dugme — Webinar" },
      { key: "cta.media", label: "Dugme — Gostovanja" },
    ],
  },
  {
    title: "O meni",
    fields: [
      { key: "about.title", label: "Naslov" },
      { key: "about.text", label: "Tekst (jedan pasus po redu)", multiline: true },
      { key: "about.cta_label", label: "Tekst dugmeta" },
      { key: "about.cta_url", label: "Link dugmeta" },
    ],
  },
  {
    title: "Proizvodi",
    fields: [
      { key: "products.title", label: "Naslov sekcije" },
      { key: "products.subtitle", label: "Podnaslov", multiline: true },
    ],
  },
  {
    title: "Konsultacije",
    fields: [
      { key: "consultations.title", label: "Naslov sekcije" },
      { key: "consultations.subtitle", label: "Podnaslov", multiline: true },
      { key: "consultations.card_text", label: "Tekst kartice", multiline: true },
      { key: "consultations.cta_label", label: "Tekst dugmeta" },
    ],
  },
  {
    title: "Besplatni sadržaj",
    fields: [
      { key: "free.title", label: "Naslov sekcije" },
      { key: "free.subtitle", label: "Podnaslov", multiline: true },
    ],
  },
  {
    title: "Webinar",
    fields: [
      { key: "webinar.title", label: "Naslov sekcije" },
      { key: "webinar.register_label", label: "Tekst dugmeta za prijavu" },
      { key: "webinar.empty_title", label: "Naslov kada nema webinara" },
      { key: "webinar.empty_text", label: "Tekst kada nema webinara", multiline: true },
      { key: "webinar.empty_cta", label: "Tekst dugmeta ka Instagramu" },
    ],
  },
  {
    title: "Gostovanja i kontakt",
    fields: [
      { key: "media.title", label: "Naslov sekcije gostovanja" },
      { key: "media.subtitle", label: "Podnaslov", multiline: true },
      { key: "contact.title", label: "Naslov kontakt sekcije" },
      { key: "contact.subtitle", label: "Podnaslov kontakt sekcije", multiline: true },
      { key: "footer.text", label: "Footer — naziv" },
      { key: "footer.copyright", label: "Footer — prava" },
    ],
  },
];

function TextsPage() {
  const queryClient = useQueryClient();
  const [texts, setTexts] = useState<SiteTexts | null>(null);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "texts"],
    queryFn: async () => {
      const values = await getSiteTexts();
      setTexts(values);
      return values;
    },
  });

  const set = (key: string, value: string) =>
    setTexts((current) => (current ? { ...current, [key]: value } : current));

  async function handleSave() {
    if (!texts) return;
    setSaving(true);
    try {
      await saveSiteTexts(texts);
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!texts) return <AdminPage title="Tekstovi">Učitavanje…</AdminPage>;

  return (
    <AdminPage title="Tekstovi" description="Naslovi i opisi na početnoj stranici.">
      <div className="space-y-5">
        {groups.map((group) => (
          <Card key={group.title}>
            <h2 className="text-lg">{group.title}</h2>
            <div className="mt-4 space-y-4">
              {group.fields.map((field) =>
                field.multiline ? (
                  <TextareaField
                    key={field.key}
                    label={field.label}
                    rows={3}
                    value={texts[field.key] ?? ""}
                    onChange={(v) => set(field.key, v)}
                  />
                ) : (
                  <Field
                    key={field.key}
                    label={field.label}
                    value={texts[field.key] ?? ""}
                    onChange={(v) => set(field.key, v)}
                  />
                ),
              )}
            </div>
          </Card>
        ))}
        <Button variant="hero" size="touch" onClick={handleSave} disabled={saving}>
          {saving ? "Čuvanje…" : "Sačuvaj"}
        </Button>
      </div>
    </AdminPage>
  );
}
