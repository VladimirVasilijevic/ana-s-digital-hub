import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Prijava — Ana Vaspitač" },
      { name: "description", content: "Prijava u administraciju sajta Ana Vaspitač." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Prijava — Ana Vaspitač" },
      { property: "og:description", content: "Prijava u administraciju sajta." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "forgot" | "reset";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase returns here with a recovery session after the reset e-mail.
    if (window.location.hash.includes("type=recovery")) setMode("reset");
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && !window.location.hash.includes("type=recovery")) {
        navigate({ to: "/admin", replace: true });
      }
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) throw error;
        toast.success("Poslali smo ti mejl sa linkom za resetovanje lozinke.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Lozinka je promenjena.");
        navigate({ to: "/admin", replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Došlo je do greške.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-col px-5 py-12">
      <img src={logo} alt="Ana Vaspitač logo" width={56} height={56} className="h-14 w-14" />
      <h1 className="mt-4 text-2xl">
        {mode === "login" ? "Prijava" : mode === "forgot" ? "Zaboravljena lozinka" : "Nova lozinka"}
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        {mode === "login"
          ? "Pristup administraciji sajta."
          : mode === "forgot"
            ? "Unesi mejl i poslaćemo ti link za resetovanje."
            : "Postavi novu lozinku za svoj nalog."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode !== "reset" ? (
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== "forgot" ? (
          <div className="space-y-1.5">
            <Label htmlFor="password">{mode === "reset" ? "Nova lozinka" : "Lozinka"}</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "reset" ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}

        <Button type="submit" variant="hero" size="touchLg" className="w-full" disabled={loading}>
          {loading
            ? "Sačekaj…"
            : mode === "login"
              ? "Prijavi se"
              : mode === "forgot"
                ? "Pošalji link"
                : "Sačuvaj lozinku"}
        </Button>
      </form>

      {mode === "login" ? (
        <Button
          variant="link"
          className="mt-3 h-auto self-start p-0 text-sm"
          onClick={() => setMode("forgot")}
        >
          Zaboravljena lozinka?
        </Button>
      ) : mode === "forgot" ? (
        <Button
          variant="link"
          className="mt-3 h-auto self-start p-0 text-sm"
          onClick={() => setMode("login")}
        >
          ← Nazad na prijavu
        </Button>
      ) : null}

      <Button asChild variant="link" className="mt-6 h-auto self-start p-0 text-sm">
        <Link to="/">← Nazad na sajt</Link>
      </Button>
    </main>
  );
}
