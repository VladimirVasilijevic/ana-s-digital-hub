import { createFileRoute } from "@tanstack/react-router";
import { BundleForm } from "@/components/admin/BundleForm";

export const Route = createFileRoute("/_authenticated/admin/paketi/$id")({
  component: EditBundle,
});

function EditBundle() {
  const { id } = Route.useParams();
  return <BundleForm id={id} />;
}
