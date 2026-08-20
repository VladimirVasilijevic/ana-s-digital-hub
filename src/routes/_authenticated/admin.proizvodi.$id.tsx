import { createFileRoute } from "@tanstack/react-router";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/_authenticated/admin/proizvodi/$id")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  return <ProductForm id={id} />;
}
