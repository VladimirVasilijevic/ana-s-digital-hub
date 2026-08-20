import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, Field } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/nalog")({
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function changePassword() {
    if (password.length < 8) {
      toast.error("Lozinka mora imati najmanje 8 karaktera.");
      return;
    }
    if (password !== confirm) {
      toast.error("Lozinke se ne poklapaju.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setPassword("");
    setConfirm("");
    toast.success("Lozinka je promenjena ✓");
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <AdminPage title="Nalog">
      <div className="space-y-5">
        <Card>
          <p className="text-sm text-muted-foreground">Prijavljena/prijavljen kao</p>
          <p className="text-[15px] font-semibold">{email || "…"}</p>
        </Card>

        <Card>
          <h2 className="text-lg">Promena lozinke</h2>
          <div className="mt-4 space-y-4">
            <Field label="Nova lozinka" type="password" value={password} onChange={setPassword} />
            <Field label="Ponovi lozinku" type="password" value={confirm} onChange={setConfirm} />
          </div>
          <Button variant="hero" size="touch" className="mt-5" onClick={changePassword} disabled={saving}>
            {saving ? "Čuvanje…" : "Sačuvaj lozinku"}
          </Button>
        </Card>

        <Card>
          <h2 className="text-lg">Odjava</h2>
          <Button variant="quiet" size="touch" className="mt-4" onClick={signOut}>
            Odjavi se
          </Button>
        </Card>
      </div>
    </AdminPage>
  );
}
