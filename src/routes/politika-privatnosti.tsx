import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";

const description = "Politika privatnosti sajta Ana Vaspitač.";

export const Route = createFileRoute("/politika-privatnosti")({
  head: () => ({
    meta: [
      { title: "Politika privatnosti — Ana Vaspitač" },
      { name: "description", content: description },
      { property: "og:title", content: "Politika privatnosti — Ana Vaspitač" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politika-privatnosti" },
    ],
    links: [{ rel: "canonical", href: "/politika-privatnosti" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>
      <h1 className="text-3xl">Politika privatnosti</h1>
      <p className="mt-3 text-sm text-muted-foreground">Privremeni tekst — biće dopunjen.</p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Ovaj sajt ne prikuplja lične podatke posetilaca i ne koristi kolačiće za praćenje.
        </p>
        <p>
          Podaci koje pošalješ putem email-a, WhatsApp-a, Viber-a ili Instagrama koriste se
          isključivo za odgovor na tvoj upit i isporuku naručenog materijala.
        </p>
        <p>
          Za sva pitanja u vezi sa privatnošću piši na{" "}
          <a className="text-primary underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
