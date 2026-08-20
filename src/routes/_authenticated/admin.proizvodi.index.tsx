import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPage, Card, EmptyState, RowActions } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { listProducts, setProductActive, deleteProduct } from "@/services/products";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/_authenticated/admin/proizvodi/")({
  component: ProductsList,
});

function ProductsList() {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: listProducts,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

  const toggle = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => setProductActive(id, active),
    onSuccess: () => {
      toast.success("Sačuvano ✓");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Obrisano.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage
      title="Proizvodi"
      description="Priručnici i drugi materijali prikazani na početnoj."
      actions={
        <Button asChild variant="hero" size="touch">
          <Link to="/admin/proizvodi/novi">Novi proizvod</Link>
        </Button>
      }
    >
      {isLoading ? (
        <EmptyState text="Učitavanje…" />
      ) : !products?.length ? (
        <EmptyState text="Još nema proizvoda." />
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id}>
              <Card>
                <div className="flex gap-4">
                  {mediaUrl(product.image_url) ? (
                    <img
                      src={mediaUrl(product.image_url)}
                      alt=""
                      className="h-16 w-20 shrink-0 rounded-lg object-cover"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{product.title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {product.price_amount
                        ? formatPrice({
                            amount: product.price_amount,
                            currency: product.price_currency,
                          })
                        : "Bez cene"}{" "}
                      · /{product.slug}
                    </p>
                  </div>
                </div>
                <RowActions>
                  <div className="mt-3 flex items-center gap-2">
                    <Switch
                      checked={product.is_active}
                      onCheckedChange={(active) => toggle.mutate({ id: product.id, active })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {product.is_active ? "Vidljivo" : "Sakriveno"}
                    </span>
                  </div>
                  <Button asChild variant="quiet" size="sm" className="mt-3">
                    <Link to="/admin/proizvodi/$id" params={{ id: product.id }}>
                      Izmeni
                    </Link>
                  </Button>
                  <Button
                    variant="quiet"
                    size="sm"
                    className="mt-3 text-destructive"
                    onClick={() => {
                      if (confirm(`Obrisati „${product.title}“?`)) remove.mutate(product.id);
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
