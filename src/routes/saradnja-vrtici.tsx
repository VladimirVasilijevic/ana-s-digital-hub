import { createFileRoute, Link } from "@tanstack/react-router";
import anaAbout from "@/assets/ana-about.jpg";
import productGranice from "@/assets/product-granice.jpg";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGlobalContent } from "@/lib/site-data";

export const Route = createFileRoute("/saradnja-vrtici")({
  head: () => ({
    meta: [
      { title: "Saradnja sa vrtićima | Ana Vaspitač" },
      {
        name: "description",
        content:
          "Praktična podrška roditeljima kroz vrtić. Saznajte kako funkcioniše Mesečni roditeljski paket Ana Vaspitač i model saradnje sa vrtićima.",
      },
      { property: "og:title", content: "Saradnja sa vrtićima | Ana Vaspitač" },
      {
        property: "og:description",
        content:
          "Praktična podrška roditeljima kroz vrtić. Saznajte kako funkcioniše Mesečni roditeljski paket Ana Vaspitač i model saradnje sa vrtićima.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/saradnja-vrtici" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.ana-vaspitac.com/saradnja-vrtici" }],
  }),
  component: SaradnjaVrticiPage,
});

function SaradnjaVrticiPage() {
  const { contact } = useGlobalContent();
  const email = contact?.email || "kontakt@ana-vaspitac.com";
  const instagramHandle = contact?.instagram_handle || "@ana_vaspitac";

  return (
    <main>
      {/* 1. HERO */}
      <section className="px-5 pb-12 pt-10 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Saradnja sa vrtićima
          </p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Praktična podrška roditeljima — kroz vaš vrtić.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Saradnja za vrtiće koji žele da svojim roditeljima ponude konkretne smernice za
            svakodnevne izazove sa decom, bez dodatnog opterećenja za svoj tim.
          </p>
          <nav
            aria-label="Glavne akcije"
            className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button asChild variant="hero" size="touchLg" className="w-full sm:w-auto">
              <a href="#paket">Želim da saznam više</a>
            </Button>
            <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
              <a href="#kontakt-cta">Zakaži razgovor</a>
            </Button>
          </nav>
          <p className="mt-5 text-sm text-muted-foreground">
            Mesečni roditeljski paket · Digitalni priručnici · Jednostavna implementacija
          </p>
        </div>
      </section>

      {/* 2. KO STOJI IZA PRIRUČNIKA? */}
      <Section id="o-ani" tone="muted" title="Ko stoji iza priručnika?">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.4fr]">
          <img
            src={anaAbout}
            alt="Ana Vasilijević, master vaspitač"
            loading="lazy"
            width={768}
            height={896}
            className="mx-auto w-40 rounded-2xl object-cover sm:w-52 md:w-full md:max-w-xs"
          />
          <div>
            <div className="space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Ja sam Ana Vasilijević, master vaspitač i više od 10 godina radim sa decom i
                roditeljima.
              </p>
              <p>Iskustvo sam sticala kroz rad u privatnom, državnom i međunarodnom sistemu.</p>
              <p>
                Kroz projekat Ana Vaspitač svoje iskustvo pretvaram u praktične priručnike
                namenjene roditeljima dece ranog i predškolskog uzrasta.
              </p>
            </div>
            <blockquote className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="font-semibold">Ideja nije da roditeljima dam još jedan tekst koji će pročitati.</p>
              <p className="mt-2 text-[15px] text-muted-foreground">
                Ideja je da dobiju konkretan odgovor na pitanje:
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">„Dobro, a šta sada da uradim?“</p>
            </blockquote>
            <Button asChild variant="soft" size="touch" className="mt-5 w-full sm:w-auto">
              <Link to="/">Pogledaj Ana Vaspitač</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 3. ŠTA JE MESEČNI RODITELJSKI PAKET? */}
      <Section id="paket" title="Jedan konkretan priručnik svakog meseca.">
        <div className="max-w-2xl space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Mesečni roditeljski paket je jednostavan model saradnje između Ane Vaspitač i vrtića.
          </p>
          <p>
            Roditelji vašeg vrtića svakog meseca dobijaju jedan praktičan digitalni priručnik koji
            obrađuje konkretnu temu iz svakodnevnog života sa decom.
          </p>
          <p className="font-medium text-foreground">Teme nisu teorijske.</p>
          <p>
            Priručnici su napravljeni tako da roditelj nakon čitanja zna šta može da uradi u
            konkretnoj situaciji.
          </p>
        </div>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Svakog meseca
        </h3>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Nova tema",
            "Praktičan digitalni priručnik",
            "Konkretne smernice",
            "Roditelj koristi sadržaj kada mu je potreban",
          ].map((step, i) => (
            <li
              key={step}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="text-sm font-bold text-primary">0{i + 1}</span>
              <p className="mt-2 text-[15px] font-medium leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. TEME */}
      <Section
        tone="muted"
        title="O čemu roditelji mogu da čitaju?"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Granice",
              text: "Kako postaviti granicu, a sačuvati odnos sa detetom.",
            },
            {
              title: "Emocije",
              text: "Kako reagovati kada dete ima velike emocije i burne reakcije.",
            },
            {
              title: "Samostalnost",
              text: "Kako podržati dete da postepeno radi više stvari samostalno.",
            },
            {
              title: "Rutine",
              text: "Svakodnevne situacije poput oblačenja, jela, izlaska iz kuće i saradnje.",
            },
            {
              title: "Adaptacija",
              text: "Praktična podrška roditeljima tokom adaptacije na vrtić.",
            },
          ].map((topic) => (
            <li
              key={topic.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <h3 className="font-semibold">{topic.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{topic.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Ove teme su primeri. Teme se mogu menjati prema potrebama roditelja.
        </p>
      </Section>

      {/* 5. ŠTA RODITELJ DOBIJA? */}
      <Section title="Šta roditelj dobija?">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Jedan novi priručnik svakog meseca",
            "Konkretne smernice za svakodnevne situacije",
            "Primere rečenica i načina reagovanja",
            "Sadržaj koji može da otvori na telefonu kada mu zatreba",
          ].map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <span aria-hidden="true" className="text-lg font-bold text-primary">
                ✓
              </span>
              <span className="text-[15px] font-medium leading-snug">{benefit}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[15px] text-muted-foreground">
          Bez dodatnih predavanja, obaveza i traženja informacija po internetu.
        </p>
      </Section>

      {/* 6. ŠTA VRTIĆ DOBIJA? */}
      <Section tone="muted" title="Šta vaš vrtić dobija?">
        <p className="max-w-2xl rounded-2xl border border-primary/30 bg-card p-5 text-lg font-semibold leading-snug shadow-soft">
          Praktična podrška roditeljima bez dodatnog opterećenja za vaš tim.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Dodatnu vrednost za roditelje",
              text: "Roditeljima nudite praktičnu podršku koja je povezana sa periodom odrastanja njihovog deteta.",
            },
            {
              title: "Dodatni prihod",
              text: "Vrtić ostvaruje prihod od svakog roditelja koji se uključi u paket.",
            },
            {
              title: "Bez kreiranja sadržaja",
              text: "Ana priprema priručnike i sadržaj.",
            },
            {
              title: "Jednostavnu implementaciju",
              text: "Vrtić samo informiše roditelje o mogućnosti i prosleđuje im način prijave.",
            },
          ].map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{benefit.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. KAKO FUNKCIONIŠE? */}
      <Section title="Kako saradnja izgleda u praksi?">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Dogovor",
              text: "Dogovaramo model saradnje i način komunikacije sa roditeljima.",
            },
            {
              title: "Preporuka roditeljima",
              text: "Vrtić roditeljima predstavlja Mesečni roditeljski paket.",
            },
            {
              title: "Roditelj se prijavljuje",
              text: "Roditelj bira da li želi da se uključi u paket.",
            },
            {
              title: "Priručnik svakog meseca",
              text: "Ana priprema i dostavlja digitalni priručnik roditeljima.",
            },
          ].map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="text-sm font-bold text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[15px] text-muted-foreground">
          Vrtić ne mora da kreira sadržaj niti da organizuje dodatne radionice.
        </p>
      </Section>

      {/* 8. CENA I MODEL SARADNJE */}
      <Section tone="muted" title="Jednostavan model saradnje">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-4xl font-bold sm:text-5xl">1.000 RSD</p>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">mesečno po roditelju</p>
          <dl className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
            <div className="flex items-center justify-between gap-4 py-1.5">
              <dt className="text-[15px] text-muted-foreground">Ana Vaspitač</dt>
              <dd className="text-[15px] font-semibold">600 RSD</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5">
              <dt className="text-[15px] text-muted-foreground">Vrtić</dt>
              <dd className="text-[15px] font-semibold">400 RSD</dd>
            </div>
          </dl>
          <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Roditelj plaća 1.000 RSD mesečno i svakog meseca dobija novi digitalni priručnik.
            </p>
            <p>Od tog iznosa 600 RSD pripada Ani Vaspitač, a 400 RSD vrtiću.</p>
          </div>
        </div>
      </Section>

      {/* 9. KONKRETAN PRIMER */}
      <Section title="Kako to izgleda na konkretnom primeru?">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { parents: 20 },
            { parents: 50 },
            { parents: 100 },
          ].map(({ parents }) => (
            <li
              key={parents}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
            >
              <p className="text-lg font-semibold">{parents} roditelja</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {parents} × 400 RSD
              </p>
              <p className="mt-2 font-semibold text-primary">
                = {(parents * 400).toLocaleString("sr-RS")} RSD mesečno za vrtić
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Primer je informativan i zavisi od broja roditelja koji se uključe u paket.
        </p>
      </Section>

      {/* 10. ZAŠTO OVAJ MODEL? */}
      <Section
        tone="muted"
        title="Roditeljima često ne treba još informacija. Treba im odgovor na pitanje: šta sada?"
      >
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Roditelji dece ranog i predškolskog uzrasta svakodnevno se susreću sa situacijama za
            koje ne postoji jedno univerzalno rešenje.
          </p>
          <p className="text-lg font-medium leading-relaxed text-foreground">
            Granice.
            <br />
            Velike emocije.
            <br />
            Odbijanje.
            <br />
            Rutine.
            <br />
            Samostalnost.
            <br />
            Adaptacija.
          </p>
          <p>
            Zato su priručnici napravljeni tako da budu praktični i dostupni onda kada roditelju
            zaista zatrebaju.
          </p>
        </div>
      </Section>

      {/* 11. KAKO IZGLEDA JEDAN PRIRUČNIK? */}
      <Section title="Kako izgleda jedan priručnik?">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="mx-auto w-full max-w-xs">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img
                src={productGranice}
                alt="Priručnik „Postavi granice bez svađe“ — naslovna strana"
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="border-t border-border px-5 py-4">
                <p className="text-[15px] font-semibold">Postavi granice bez svađe</p>
                <p className="mt-1 text-sm text-muted-foreground">Digitalni priručnik · PDF</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Jedan od priručnika namenjen je roditeljima koji žele da nauče kako da postave jasnu
              granicu, ostanu smireni i sačuvaju odnos sa detetom.
            </p>
            <Button asChild variant="hero" size="touch" className="mt-5 w-full sm:w-auto">
              <Link to="/prirucnik/postavi-granice-bez-svadje">Pogledaj primere priručnika</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 12. FAQ */}
      <Section tone="muted" title="Najčešća pitanja">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5 shadow-soft">
          {[
            {
              q: "Da li vrtić mora da kreira bilo kakav sadržaj?",
              a: "Ne. Sadržaj i priručnike priprema Ana Vaspitač.",
            },
            {
              q: "Da li svi roditelji moraju da se uključe?",
              a: "Ne. Roditelji se uključuju dobrovoljno.",
            },
            {
              q: "Kako roditelji dobijaju priručnik?",
              a: "Digitalno, tako da sadržaj mogu da otvore direktno na telefonu.",
            },
            {
              q: "Da li vrtić mora da organizuje dodatne radionice?",
              a: "Ne. Model je zamišljen kao jednostavna digitalna podrška roditeljima.",
            },
            {
              q: "Da li možemo da dogovorimo teme prema potrebama naših roditelja?",
              a: "Da. Teme se mogu planirati u skladu sa najčešćim izazovima roditelja dece uzrasta koji pohađaju vaš vrtić.",
            },
            {
              q: "Kako možemo da počnemo saradnju?",
              a: "Pošaljite upit ili zakažite kratak razgovor sa Anom kako bismo prošli kroz model i dogovorili sledeće korake.",
            },
          ].map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-border last:border-b-0">
              <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* 13. FINALNI CTA */}
      <Section id="kontakt-cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl">
            Da li bi ovakav vid podrške bio koristan roditeljima vašeg vrtića?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Volela bih da vam predstavim model i čujem kako ovakva saradnja izgleda iz perspektive
            vašeg vrtića.
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="hero" size="touchLg" className="w-full sm:w-auto">
              <a href={`mailto:${email}?subject=Razgovor — saradnja sa vrtićem`}>
                Zakaži kratak razgovor
              </a>
            </Button>
            <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
              <a href={`mailto:${email}?subject=Upit — saradnja sa vrtićem`}>Pošalji upit</a>
            </Button>
          </div>
          <div className="mt-8 space-y-1 text-[15px] text-muted-foreground">
            <p className="font-semibold text-foreground">Ana Vasilijević</p>
            <p>Master vaspitač</p>
            <p>Ana Vaspitač</p>
            <p>ana-vaspitac.com</p>
            {contact?.instagram_url ? (
              <p>
                Instagram:{" "}
                <a
                  href={contact.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {instagramHandle}
                </a>
              </p>
            ) : (
              <p>Instagram: {instagramHandle}</p>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
