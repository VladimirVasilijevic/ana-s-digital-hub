import { createFileRoute } from "@tanstack/react-router";
import { WebinarForm } from "@/components/admin/WebinarForm";

export const Route = createFileRoute("/_authenticated/admin/webinari/$id")({
  component: EditWebinar,
});

function EditWebinar() {
  const { id } = Route.useParams();
  return <WebinarForm id={id} />;
}
