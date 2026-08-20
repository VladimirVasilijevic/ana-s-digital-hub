import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field, TextareaField } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import {
  getContactSettings,
  getPaymentSettings,
  saveContactSettings,
  savePaymentSettings,
} from "@/services/settings";
import type { ContactSettings, PaymentSettings } from "@/services/types";

export const Route = createFileRoute("/_authenticated/admin/podesavanja")({
  component: SettingsPage,
});

function SettingsPage() {
  const queryClient = useQueryClient();
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [payment, setPayment] = useState<PaymentSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const [c, p] = await Promise.all([getContactSettings(), getPaymentSettings()]);
      setContact(c);
      setPayment(p);
      return { c, p };
    },
  });

  const setC = <K extends keyof ContactSettings>(key: K, value: ContactSettings[K]) =>
    setContact((current) => (current ? { ...current, [key]: value } : current));
  const setP = <K extends keyof PaymentSettings>(key: K, value: PaymentSettings[K]) =>
    setPayment((current) => (current ? { ...current, [key]: value } : current));

  async function handleSave() {
    if (!contact || !payment) return;
    setSaving(true);
    try {
      await Promise.all([
        saveContactSettings(contact.id, {
          email: contact.email,
          phone: contact.phone,
          whatsapp_number: contact.whatsapp_number,
          viber_number: contact.viber_number,
          instagram_handle: contact.instagram_handle,
          instagram_url: contact.instagram_url,
          facebook_url: contact.facebook_url,
          location: contact.location,
        }),
        savePaymentSettings(payment.id, {
          recipient: payment.recipient,
          account: payment.account,
          bank: payment.bank,
          note: payment.note,
        }),
      ]);
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Sačuvano ✓");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Čuvanje nije uspelo.");
    } finally {
      setSaving(false);
    }
  }

  if (!contact || !payment) return <AdminPage title="Kontakt i uplata">Učitavanje…</AdminPage>;

  return (
    <AdminPage title="Kontakt i uplata" description="Podaci koji se prikazuju na celom sajtu.">
      <div className="space-y-5">
        <Card>
          <h2 className="text-lg">Kontakt</h2>
          <div className="mt-4 space-y-4">
            <Field label="Email" value={contact.email} onChange={(v) => setC("email", v)} />
            <Field label="Telefon" value={contact.phone} onChange={(v) => setC("phone", v)} />
            <Field label="WhatsApp broj" hint="Npr. 381601234567" value={contact.whatsapp_number} onChange={(v) => setC("whatsapp_number", v)} />
            <Field label="Viber broj" value={contact.viber_number} onChange={(v) => setC("viber_number", v)} />
            <Field label="Instagram korisničko ime" value={contact.instagram_handle} onChange={(v) => setC("instagram_handle", v)} />
            <Field label="Instagram link" value={contact.instagram_url} onChange={(v) => setC("instagram_url", v)} />
            <Field label="Facebook link" value={contact.facebook_url} onChange={(v) => setC("facebook_url", v)} />
            <Field label="Lokacija" value={contact.location} onChange={(v) => setC("location", v)} />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg">Podaci za uplatu</h2>
          <div className="mt-4 space-y-4">
            <Field label="Primalac" value={payment.recipient} onChange={(v) => setP("recipient", v)} />
            <Field label="Račun" value={payment.account} onChange={(v) => setP("account", v)} />
            <Field label="Banka" value={payment.bank} onChange={(v) => setP("bank", v)} />
            <TextareaField label="Napomena" rows={3} value={payment.note} onChange={(v) => setP("note", v)} />
          </div>
        </Card>

        <Button variant="hero" size="touch" onClick={handleSave} disabled={saving}>
          {saving ? "Čuvanje…" : "Sačuvaj"}
        </Button>
      </div>
    </AdminPage>
  );
}
