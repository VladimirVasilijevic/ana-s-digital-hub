import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ConsultationBlock } from "@/components/ConsultationBlock";

const description =
  "Individualne konsultacije sa Anom Vaspitač — razgovor jedan na jedan, konkretni koraci i jasno uputstvo za uplatu.";

export const Route = createFileRoute("/konsultacije")({
  head: () => ({
    meta: [
      { title: "Konsultacije sa Anom — Ana Vaspitač" },
      { name: "description", content: description },
      { property: "og:title", content: "Konsultacije sa Anom — Ana Vaspitač" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/konsultacije" },
    ],
    links: [{ rel: "canonical", href: "/konsultacije" }],
  }),
  component: Konsultacije,
});

function Konsultacije() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>
      <h1 className="text-3xl">💬 Individualne konsultacije</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom. Zajedno pravimo plan
        koji možeš da primeniš odmah, u svojoj svakodnevici.
      </p>

      <div className="mt-8">
        <ConsultationBlock />
      </div>
    </main>
  );
}

