import { createFileRoute } from "@tanstack/react-router";
import { WebinarForm } from "@/components/admin/WebinarForm";

export const Route = createFileRoute("/_authenticated/admin/webinari/novi")({
  component: () => <WebinarForm />,
});
