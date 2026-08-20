import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/admin", label: "Pregled", exact: true },
  { to: "/admin/proizvodi", label: "Proizvodi", exact: false },
  { to: "/admin/konsultacije", label: "Konsultacije", exact: false },
  { to: "/admin/besplatno", label: "Besplatni sadržaj", exact: false },
  { to: "/admin/webinari", label: "Webinari", exact: false },
  { to: "/admin/mediji", label: "Gostovanja", exact: false },
  { to: "/admin/podesavanja", label: "Kontakt i uplata", exact: false },
  { to: "/admin/tekstovi", label: "Tekstovi", exact: false },
  { to: "/admin/nalog", label: "Nalog", exact: false },
] as const;

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administracija — Ana Vaspitač" },
      { name: "description", content: "Upravljanje sadržajem sajta Ana Vaspitač." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administracija — Ana Vaspitač" },
      { property: "og:description", content: "Upravljanje sadržajem sajta." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-[15px] font-bold">Administracija</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="quiet" size="sm">
              <Link to="/">Sajt</Link>
            </Button>
            <Button variant="soft" size="sm" onClick={signOut}>
              Odjava
            </Button>
          </div>
        </div>
        <nav className="mx-auto flex w-full max-w-3xl gap-2 overflow-x-auto px-5 pb-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary [&.active]:border-primary [&.active]:bg-primary/10 [&.active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
