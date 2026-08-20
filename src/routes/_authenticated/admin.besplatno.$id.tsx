import { createFileRoute } from "@tanstack/react-router";
import { FreeResourceForm } from "@/components/admin/FreeResourceForm";

export const Route = createFileRoute("/_authenticated/admin/besplatno/$id")({
  component: EditFreeResource,
});

function EditFreeResource() {
  const { id } = Route.useParams();
  return <FreeResourceForm id={id} />;
}
