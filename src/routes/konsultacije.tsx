import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ConsultationBlock } from "@/components/ConsultationBlock";
import { getConsultation } from "@/lib/content.functions";
import { formatPrice } from "@/lib/format";

const description =
  "Individualne konsultacije sa Anom Vaspitač — razgovor jedan na jedan, konkretni koraci i jasno uputstvo za prijavu i uplatu.";

export const Route = createFileRoute("/konsultacije")({
  loader: () => getConsultation(),
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
  errorComponent: () => (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 text-center">
      <p className="text-[15px] text-muted-foreground">
        Sadržaj trenutno nije dostupan. Pokušaj ponovo za koji trenutak.
      </p>
    </main>
  ),
});

function Konsultacije() {
  const consultation = Route.useLoaderData();

  const includes =
    consultation?.includes && consultation.includes.length > 0
      ? consultation.includes
      : [
          "Razgovor o konkretnoj situaciji, ne o teoriji",
          "Pitanja koja pomažu da se vidi šta je iza ponašanja deteta",
          "Predlog koraka koje možeš da probaš već isti dan",
          "Prostor za tvoja pitanja i nedoumice",
        ];

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>

      <h1 className="text-3xl leading-tight">
        {consultation?.title ?? "💬 Individualne konsultacije"}
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
        {consultation?.detailed_description ||
          consultation?.short_description ||
          "Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom."}
      </p>

      <section className="mt-8">
        <h2 className="text-xl">Šta možeš da očekuješ</h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-primary">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {consultation?.price_amount != null ? (
        <section className="mt-8 rounded-2xl bg-muted p-5 text-center">
          <p className="text-sm text-muted-foreground">Cena</p>
          <p className="font-display text-3xl font-extrabold text-primary">
            {formatPrice({
              amount: consultation.price_amount,
              currency: consultation.price_currency,
            })}
          </p>
          <Button asChild variant="hero" size="touchLg" className="mt-4 w-full">
            <a href="#prijava">Zakaži konsultacije</a>
          </Button>
        </section>
      ) : null}

      <section id="prijava" className="mt-10 scroll-mt-20">
        <h2 className="text-xl">Prijava i uplata</h2>
        <div className="mt-4">
          <ConsultationBlock consultation={consultation} />
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
          Nakon što Ana dobije potvrdu o uplati, javlja ti se sa predlogom termina — najčešće u roku
          od 24h.
        </p>
      </section>
    </main>
  );
}
