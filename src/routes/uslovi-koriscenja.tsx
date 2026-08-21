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
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <h2 className="text-xl text-foreground">Šta nudimo</h2>
        <p>
          Na sajtu se nude digitalni priručnici u PDF formatu, besplatni materijali za preuzimanje,
          webinari i individualne konsultacije sa vaspitačicom Anom.
        </p>
        <h2 className="text-xl text-foreground">Autorska prava</h2>
        <p>
          Sadržaj sajta i digitalni materijali namenjeni su ličnoj upotrebi roditelja i staratelja.
          Nije dozvoljeno dalje deljenje, umnožavanje, objavljivanje ni prodaja materijala bez
          pisane saglasnosti autorke.
        </p>
        <h2 className="text-xl text-foreground">Poručivanje i isporuka</h2>
        <p>
          Plaćanje se vrši uplatom na račun po instrukcijama navedenim na stranici proizvoda. Nakon
          što pošalješ potvrdu o uplati, materijal se šalje ručno na kanal preko kog si se javio/la,
          najčešće u roku od 24 sata, a najkasnije u roku od tri radna dana.
        </p>
        <h2 className="text-xl text-foreground">Reklamacije i povraćaj</h2>
        <p>
          Ako materijal ne stigne ili datoteka ne može da se otvori, javi se i poslaćemo je ponovo
          ili vratiti uplaćeni iznos. Kod digitalnih sadržaja koji su već isporučeni povraćaj novca
          nije moguć iz drugih razloga. Zakazanu konsultaciju možeš pomeriti najkasnije 24 sata
          pre termina.
        </p>
        <h2 className="text-xl text-foreground">Odgovornost</h2>
        <p>
          Saveti na sajtu su edukativnog karaktera i ne zamenjuju stručnu medicinsku, logopedsku ili
          psihološku procenu. Primena saveta je na odgovornost roditelja.
        </p>
        <p>
          Za sva pitanja piši na{" "}
          <a className="text-primary underline" href="mailto:andjelkovski.ana5@gmail.com">
            andjelkovski.ana5@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
