import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, EmptyState, RowActions } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { listMedia, setMediaActive, deleteMedia } from "@/services/media";

export const Route = createFileRoute("/_authenticated/admin/mediji/")({
  component: MediaList,
});

function MediaList() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({ queryKey: ["admin", "media"], queryFn: listMedia });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "media"] });

  const toggle = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => setMediaActive(id, active),
    onSuccess: () => { toast.success("Sačuvano ✓"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => { toast.success("Obrisano."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage
      title="Gostovanja"
      description="Sekcija „Gde ste me mogli videti?“."
      actions={
        <Button asChild variant="hero" size="touch">
          <Link to="/admin/mediji/novi">Novo gostovanje</Link>
        </Button>
      }
    >
      {isLoading ? (
        <EmptyState text="Učitavanje…" />
      ) : !items?.length ? (
        <EmptyState text="Još nema gostovanja." />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Card>
                <p className="text-[15px] font-semibold">{item.title}</p>
                <p className="truncate text-sm text-muted-foreground">{item.source || item.url}</p>
                <RowActions>
                  <div className="mt-3 flex items-center gap-2">
                    <Switch checked={item.is_active} onCheckedChange={(active) => toggle.mutate({ id: item.id, active })} />
                    <span className="text-sm text-muted-foreground">{item.is_active ? "Vidljivo" : "Sakriveno"}</span>
                  </div>
                  <Button asChild variant="quiet" size="sm" className="mt-3">
                    <Link to="/admin/mediji/$id" params={{ id: item.id }}>Izmeni</Link>
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
