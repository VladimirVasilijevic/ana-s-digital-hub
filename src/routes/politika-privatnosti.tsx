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
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <h2 className="text-xl text-foreground">Koje podatke prikupljamo</h2>
        <p>
          Sajt ne traži registraciju, ne koristi kolačiće za praćenje i ne prikuplja lične podatke
          posetilaca automatski. Podatke dobijamo samo kada nam se sam/a javiš — porukom na email,
          WhatsApp, Viber ili Instagram, odnosno prijavom preko forme za konsultacije.
        </p>
        <h2 className="text-xl text-foreground">Kako koristimo podatke</h2>
        <p>
          Ime, kontakt i sadržaj poruke koriste se isključivo da bismo odgovorili na tvoj upit,
          zakazali konsultaciju i isporučili naručeni digitalni materijal. Podaci se ne prodaju,
          ne ustupaju trećim licima i ne koriste za reklamne liste.
        </p>
        <h2 className="text-xl text-foreground">Uplate</h2>
        <p>
          Plaćanje se vrši direktnom uplatom na račun preko tvoje banke. Ovaj sajt ne obrađuje i ne
          čuva podatke o platnim karticama niti pristupa tvom bankovnom nalogu. Potvrdu o uplati
          koju pošalješ čuvamo samo dok se porudžbina ne isporuči.
        </p>
        <h2 className="text-xl text-foreground">Čuvanje i tvoja prava</h2>
        <p>
          Prepiska i prijave čuvaju se onoliko koliko je potrebno za isporuku i eventualna dodatna
          pitanja. U svakom trenutku možeš tražiti uvid u podatke koje imamo o tebi, njihovu
          ispravku ili trajno brisanje — dovoljno je da nam pišeš.
        </p>
        <h2 className="text-xl text-foreground">Linkovi ka drugim servisima</h2>
        <p>
          Sajt sadrži linkove ka Instagramu, YouTube-u i Google formama. Za podatke koje ostaviš na
          tim platformama važe njihove politike privatnosti.
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
