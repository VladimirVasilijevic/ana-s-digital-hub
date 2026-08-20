import { createFileRoute } from "@tanstack/react-router";
import { FreeResourceForm } from "@/components/admin/FreeResourceForm";

export const Route = createFileRoute("/_authenticated/admin/besplatno/novi")({
  component: () => <FreeResourceForm />,
});
