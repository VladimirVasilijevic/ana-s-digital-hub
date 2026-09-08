import { createFileRoute } from "@tanstack/react-router";
import { BundleForm } from "@/components/admin/BundleForm";

export const Route = createFileRoute("/_authenticated/admin/paketi/novi")({
  component: () => <BundleForm />,
});
