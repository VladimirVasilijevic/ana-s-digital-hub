import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ContactLinks } from "@/components/ContactLinks";
import { PaymentBlock } from "@/components/PaymentBlock";
import { getBundleBySlug } from "@/lib/content.functions";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/paket/$slug")({
  loader: async ({ params }) => {
    const result = await getBundleBySlug({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Paket nije pronađen — Ana Vaspitač" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { bundle } = loaderData;
    const title = `${bundle.title} — Ana Vaspitač`;
    return {
      meta: [
        { title },
        { name: "description", content: bundle.short_description },
        { property: "og:title", content: title },
        { property: "og:description", content: bundle.short_description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/paket/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/paket/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: bundle.title,
            description: bundle.detailed_description || bundle.short_description,
            brand: { "@type": "Person", name: "Ana Vaspitač" },
            url: `https://www.ana-vaspitac.com/paket/${params.slug}`,
            ...(bundle.price_amount != null
              ? {
                  offers: {
                    "@type": "Offer",
                    price: String(bundle.price_amount),
                    priceCurrency: bundle.price_currency ?? "RSD",
                    availability: "https://schema.org/InStock",
                    url: `https://www.ana-vaspitac.com/paket/${params.slug}`,
                  },
                }
              : {}),
          }),
        },
      ],
    };
  },
  component: BundlePage,
  notFoundComponent: () => (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 text-center">
      <h1 className="text-2xl">Paket nije pronađen</h1>
      <Button asChild variant="soft" size="touch" className="mt-5">
        <Link to="/">Nazad na početnu</Link>
      </Button>
    </main>
  ),
  errorComponent: () => (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 text-center">
      <p className="text-[15px] text-muted-foreground">
        Sadržaj trenutno nije dostupan. Pokušaj ponovo za koji trenutak.
      </p>
    </main>
  ),
});

function BundlePage() {
  const { bundle, products, consultation } = Route.useLoaderData();
  const image = mediaUrl(bundle.image_url);
  const price =
    bundle.price_amount != null
      ? { amount: bundle.price_amount, currency: bundle.price_currency }
      : undefined;

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>

      <h1 className="text-3xl leading-tight">{bundle.title}</h1>

      {image ? (
        <img
          src={image}
          alt={`Naslovna ilustracija paketa ${bundle.title}`}
          width={1024}
          height={768}
          className="mt-5 w-full rounded-2xl object-cover"
        />
      ) : null}

      {bundle.detailed_description ? (
        <p className="mt-5 whitespace-pre-line text-[16px] leading-relaxed text-muted-foreground">
          {bundle.detailed_description}
        </p>
      ) : null}

      {products.length ? (
        <section className="mt-8">
          <h2 className="text-xl">Šta paket sadrži</h2>
          <ul className="mt-3 space-y-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <h3 className="text-base font-semibold">{product.title}</h3>
                {product.short_description ? (
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                    {product.short_description}
                  </p>
                ) : null}
                <Button asChild variant="link" className="mt-1 h-auto p-0 text-[15px] font-semibold">
                  <Link to="/prirucnik/$slug" params={{ slug: product.slug }}>
                    Pogledaj detalje →
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {bundle.includes.length ? (
        <section className="mt-8">
          <h2 className="text-xl">Šta dobijaš</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            {bundle.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {bundle.learn.length ? (
        <section className="mt-8">
          <h2 className="text-xl">Šta ćeš naučiti</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            {bundle.learn.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {price ? (
        <section className="mt-8 rounded-2xl bg-muted p-5 text-center">
          <p className="text-sm text-muted-foreground">Cena paketa</p>
          <p className="font-display text-3xl font-extrabold text-primary">{formatPrice(price)}</p>
          <Button asChild variant="hero" size="touchLg" className="mt-4 w-full">
            <a href="#porudzbina">Poruči paket</a>
          </Button>
        </section>
      ) : null}

      <section id="porudzbina" className="mt-10 scroll-mt-20">
        <h2 className="text-xl">Kako da poručiš?</h2>

        <ol className="mt-4 space-y-5">
          <li>
            <h3 className="text-base font-semibold">1. Uplati iznos na račun</h3>
            <div className="mt-3">
              <PaymentBlock price={price} purpose={bundle.title} />
            </div>
          </li>
          <li>
            <h3 className="text-base font-semibold">2. Sačuvaj potvrdu o uplati</h3>
            <p className="mt-1 text-[15px] text-muted-foreground">
              Slika ili PDF potvrde iz banke / mobilne aplikacije.
            </p>
          </li>
          <li>
            <h3 className="text-base font-semibold">3. Pošalji potvrdu Ani</h3>
            <div className="mt-3">
              <ContactLinks only={["whatsapp", "viber", "email", "instagram"]} />
            </div>
          </li>
          <li>
            <h3 className="text-base font-semibold">4. Ana ti šalje materijale</h3>
            <p className="mt-1 whitespace-pre-line text-[15px] text-muted-foreground">
              {bundle.purchase_instructions ||
                "Paket stiže na kanal preko kog si poslao/la potvrdu, najčešće u roku od 24h."}
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
