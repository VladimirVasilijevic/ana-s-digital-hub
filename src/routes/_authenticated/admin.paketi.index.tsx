import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, EmptyState, RowActions } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { listBundles, setBundleActive, deleteBundle } from "@/services/bundles";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/_authenticated/admin/paketi/")({
  component: BundlesList,
});

function BundlesList() {
  const queryClient = useQueryClient();
  const { data: bundles, isLoading } = useQuery({
    queryKey: ["admin", "bundles"],
    queryFn: listBundles,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "bundles"] });

  const toggle = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => setBundleActive(id, active),
    onSuccess: () => {
      toast.success("Sačuvano ✓");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteBundle(id),
    onSuccess: () => {
      toast.success("Obrisano.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage
      title="Paketi"
      description="Kombinacije više proizvoda prikazane na početnoj."
      actions={
        <Button asChild variant="hero" size="touch">
          <Link to="/admin/paketi/novi">Novi paket</Link>
        </Button>
      }
    >
      {isLoading ? (
        <EmptyState text="Učitavanje…" />
      ) : !bundles?.length ? (
        <EmptyState text="Još nema paketa." />
      ) : (
        <ul className="space-y-3">
          {bundles.map((bundle) => (
            <li key={bundle.id}>
              <Card>
                <div className="flex gap-4">
                  {mediaUrl(bundle.image_url) ? (
                    <img
                      src={mediaUrl(bundle.image_url)}
                      alt=""
                      className="h-16 w-20 shrink-0 rounded-lg object-cover"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{bundle.title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {bundle.price_amount
                        ? formatPrice({
                            amount: bundle.price_amount,
                            currency: bundle.price_currency,
                          })
                        : "Bez cene"}{" "}
                      · /{bundle.slug}
                    </p>
                  </div>
                </div>
                <RowActions>
                  <div className="mt-3 flex items-center gap-2">
                    <Switch
                      checked={bundle.is_active}
                      onCheckedChange={(active) => toggle.mutate({ id: bundle.id, active })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {bundle.is_active ? "Vidljivo" : "Sakriveno"}
                    </span>
                  </div>
                  <Button asChild variant="quiet" size="sm" className="mt-3">
                    <Link to="/admin/paketi/$id" params={{ id: bundle.id }}>
                      Izmeni
                    </Link>
                  </Button>
                  <Button
                    variant="quiet"
                    size="sm"
                    className="mt-3 text-destructive"
                    onClick={() => {
                      if (confirm(`Obrisati „${bundle.title}“?`)) remove.mutate(bundle.id);
                    }}
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
