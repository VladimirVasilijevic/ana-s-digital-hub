import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, EmptyState, RowActions } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { listWebinars, setWebinarActive, deleteWebinar } from "@/services/webinars";

export const Route = createFileRoute("/_authenticated/admin/webinari/")({
  component: WebinarList,
});

function WebinarList() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({ queryKey: ["admin", "webinars"], queryFn: listWebinars });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "webinars"] });

  const toggle = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => setWebinarActive(id, active),
    onSuccess: () => { toast.success("Sačuvano ✓"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteWebinar(id),
    onSuccess: () => { toast.success("Obrisano."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage
      title="Webinari"
      description="Samo jedan webinar može biti aktivan na početnoj."
      actions={
        <Button asChild variant="hero" size="touch">
          <Link to="/admin/webinari/novi">Novi webinar</Link>
        </Button>
      }
    >
      {isLoading ? (
        <EmptyState text="Učitavanje…" />
      ) : !items?.length ? (
        <EmptyState text="Još nema webinara." />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Card>
                <p className="text-[15px] font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {[item.event_date, item.event_time].filter(Boolean).join(" · ") || "Bez termina"}
                  {item.registration_url ? "" : " · nema link za prijavu"}
                </p>
                <RowActions>
                  <div className="mt-3 flex items-center gap-2">
                    <Switch checked={item.is_active} onCheckedChange={(active) => toggle.mutate({ id: item.id, active })} />
                    <span className="text-sm text-muted-foreground">{item.is_active ? "Aktivan" : "Neaktivan"}</span>
                  </div>
                  <Button asChild variant="quiet" size="sm" className="mt-3">
                    <Link to="/admin/webinari/$id" params={{ id: item.id }}>Izmeni</Link>
                  </Button>
                  <Button
                    variant="quiet"
                    size="sm"
                    className="mt-3 text-destructive"
                    onClick={() => { if (confirm(`Obrisati „${item.title}“?`)) remove.mutate(item.id); }}
                  >
                    Obriši
                  </Button>
                </RowActions>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
