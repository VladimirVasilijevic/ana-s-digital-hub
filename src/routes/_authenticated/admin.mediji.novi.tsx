import { createFileRoute } from "@tanstack/react-router";
import { MediaForm } from "@/components/admin/MediaForm";

export const Route = createFileRoute("/_authenticated/admin/mediji/novi")({
  component: () => <MediaForm />,
});
