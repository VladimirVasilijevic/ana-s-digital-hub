import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, Card } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

async function loadSummary() {
  const [products, free, webinars, media, user] = await Promise.all([
    supabase.from("products").select("id, is_active"),
    supabase.from("free_resources").select("id, is_active"),
    supabase.from("webinars").select("id, is_active, title"),
    supabase.from("media_appearances").select("id, is_active"),
    supabase.auth.getUser(),
  ]);

  const count = (rows: { is_active: boolean }[] | null) => ({
    total: rows?.length ?? 0,
    active: rows?.filter((r) => r.is_active).length ?? 0,
  });

  return {
    products: count(products.data),
    free: count(free.data),
    webinars: count(webinars.data),
    media: count(media.data),
    activeWebinar: webinars.data?.find((w) => w.is_active)?.title ?? null,
    email: user.data.user?.email ?? "",
  };
}

function Dashboard() {
  const { data } = useQuery({ queryKey: ["admin", "summary"], queryFn: loadSummary });

  const stats = [
    { label: "Proizvodi", value: data?.products, to: "/admin/proizvodi" as const },
    { label: "Besplatni sadržaj", value: data?.free, to: "/admin/besplatno" as const },
    { label: "Webinari", value: data?.webinars, to: "/admin/webinari" as const },
    { label: "Gostovanja", value: data?.media, to: "/admin/mediji" as const },
  ];

  return (
    <AdminPage title="Pregled" description={data?.email ? `Prijavljena: ${data.email}` : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} className="block">
            <Card>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-display text-2xl font-bold text-primary">
                {stat.value ? `${stat.value.active} aktivno` : "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.value ? `${stat.value.total} ukupno` : ""}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <p className="text-[15px] font-medium">Webinar na početnoj</p>
          <p className="mt-1 text-[15px] text-muted-foreground">
            {data?.activeWebinar ?? "Trenutno nema aktivnog webinara."}
          </p>
          <Button asChild variant="soft" size="touch" className="mt-3">
            <Link to="/admin/webinari">Upravljaj webinarima</Link>
          </Button>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="hero" size="touch">
          <Link to="/admin/proizvodi/novi">Novi proizvod</Link>
        </Button>
        <Button asChild variant="quiet" size="touch">
          <Link to="/admin/besplatno/novi">Novi besplatan materijal</Link>
        </Button>
        <Button asChild variant="quiet" size="touch">
          <Link to="/admin/podesavanja">Kontakt i uplata</Link>
        </Button>
      </div>
    </AdminPage>
  );
}
