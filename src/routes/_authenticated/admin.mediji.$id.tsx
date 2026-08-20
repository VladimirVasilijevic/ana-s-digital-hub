import { createFileRoute } from "@tanstack/react-router";
import { MediaForm } from "@/components/admin/MediaForm";

export const Route = createFileRoute("/_authenticated/admin/mediji/$id")({
  component: EditMedia,
});

function EditMedia() {
  const { id } = Route.useParams();
  return <MediaForm id={id} />;
}
