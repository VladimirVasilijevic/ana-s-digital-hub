import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";

const description = "Uslovi korišćenja sajta i digitalnih materijala Ane Vaspitač.";

export const Route = createFileRoute("/uslovi-koriscenja")({
  head: () => ({
    meta: [
      { title: "Uslovi korišćenja — Ana Vaspitač" },
      { name: "description", content: description },
      { property: "og:title", content: "Uslovi korišćenja — Ana Vaspitač" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/uslovi-koriscenja" },
    ],
    links: [{ rel: "canonical", href: "/uslovi-koriscenja" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>
      <h1 className="text-3xl">Uslovi korišćenja</h1>
      <p className="mt-3 text-sm text-muted-foreground">Privremeni tekst — biće dopunjen.</p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Sadržaj sajta i digitalni materijali namenjeni su ličnoj upotrebi roditelja i
          staratelja. Nije dozvoljeno dalje deljenje, umnožavanje ili prodaja materijala.
        </p>
        <p>
          Saveti na sajtu su edukativnog karaktera i ne zamenjuju stručnu medicinsku ili
          psihološku procenu.
        </p>
        <p>
          Plaćanje se vrši uplatom na račun, a materijal se šalje ručno nakon potvrde uplate.
          Za pitanja piši na{" "}
          <a className="text-primary underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
