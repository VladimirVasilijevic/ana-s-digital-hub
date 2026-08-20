import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ContactLinks } from "@/components/ContactLinks";
import { PaymentBlock } from "@/components/PaymentBlock";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/prirucnik/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Priručnik nije pronađen — Ana Vaspitač" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.title} — Ana Vaspitač`;
    return {
      meta: [
        { title },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/prirucnik/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/prirucnik/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <Button asChild variant="link" className="mb-4 h-auto p-0 text-sm">
        <Link to="/">← Nazad na početnu</Link>
      </Button>

      <h1 className="text-3xl leading-tight">{product.title}</h1>

      {product.image ? (
        <img
          src={product.image}
          alt={`Naslovna ilustracija priručnika ${product.title}`}
          width={1024}
          height={768}
          className="mt-5 w-full rounded-2xl object-cover"
        />
      ) : null}

      {product.problem ? (
        <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">{product.problem}</p>
      ) : null}

      {product.includes?.length ? (
        <section className="mt-8">
          <h2 className="text-xl">Šta dobijaš</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            {product.includes.map((item) => (
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

      {product.learn?.length ? (
        <section className="mt-8">
          <h2 className="text-xl">Šta ćeš naučiti</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            {product.learn.map((item) => (
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

      {product.price ? (
        <section className="mt-8 rounded-2xl bg-muted p-5 text-center">
          <p className="text-sm text-muted-foreground">Cena</p>
          <p className="font-display text-3xl font-extrabold text-primary">
            {formatPrice(product.price)}
          </p>
          <Button asChild variant="hero" size="touchLg" className="mt-4 w-full">
            <a href="#porudzbina">Poruči priručnik</a>
          </Button>
        </section>
      ) : null}

      <section id="porudzbina" className="mt-10 scroll-mt-20">
        <h2 className="text-xl">Kako da poručiš?</h2>

        <ol className="mt-4 space-y-5">
          <li>
            <h3 className="text-base font-semibold">1. Uplati iznos na račun</h3>
            <div className="mt-3">
              <PaymentBlock price={product.price} purpose={product.title} />
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
            <h3 className="text-base font-semibold">4. Ana ti šalje PDF</h3>
            <p className="mt-1 text-[15px] text-muted-foreground">
              Priručnik stiže na kanal preko kog si poslao/la potvrdu, najčešće u roku od 24h.
            </p>
          </li>
        </ol>
      </section>

      {product.testimonials?.length ? (
        <section className="mt-10">
          <h2 className="text-xl">Iskustva roditelja</h2>
          <ul className="mt-3 space-y-3">
            {product.testimonials.map((t) => (
              <li key={t.name} className="rounded-2xl border border-border bg-card p-4 text-[15px]">
                <p className="text-muted-foreground">„{t.text}“</p>
                <p className="mt-2 font-medium">{t.name}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
