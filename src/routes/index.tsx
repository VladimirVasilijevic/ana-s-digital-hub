import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { ResourceCard } from "@/components/ResourceCard";
import { ContactLinks } from "@/components/ContactLinks";
import { site } from "@/data/site";
import { getProducts } from "@/data/products";
import { getFreeMaterials } from "@/data/free-materials";
import { getMediaAppearances } from "@/data/media";
import { contact } from "@/data/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ana Vaspitač — praktični saveti za roditelje" },
      { name: "description", content: site.description },
      { property: "og:title", content: "Ana Vaspitač — praktični saveti za roditelje" },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ana Vaspitač",
          jobTitle: "Vaspitačica",
          description: site.tagline,
          sameAs: [contact.instagramUrl],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const products = getProducts();
  const freeMaterials = getFreeMaterials();
  const media = getMediaAppearances();

  return (
    <main>
      {/* HERO */}
      <section className="px-5 pb-12 pt-8 sm:pt-12">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="fade-up flex flex-col items-center text-center md:items-start md:text-left">
            <img
              src={logo}
              alt="Ručni rad — vaspitačica Ana, logo"
              width={96}
              height={96}
              className="h-16 w-16"
            />
            <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">Ana Vaspitač</h1>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
              <Button asChild variant="hero" size="touchLg" className="w-full sm:w-auto">
                <Link to="/prirucnik/$slug" params={{ slug: "postavi-granice-bez-svadje" }}>
                  Priručnik „Postavi granice bez svađe“
                </Link>
              </Button>

              <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
                <Link to="/konsultacije">Konsultacije sa Anom</Link>
              </Button>
              <Button asChild variant="soft" size="touchLg" className="w-full sm:w-auto">
                <a href="#besplatno">Besplatni sadržaji</a>
              </Button>
            </div>
          </div>

          <div className="fade-up order-first md:order-none">
            <img
              src={site.hero.image}
              alt={site.hero.imageAlt}
              width={1024}
              height={1024}
              fetchPriority="high"
              className="mx-auto w-full max-w-sm rounded-3xl bg-secondary object-cover md:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="o-meni" tone="muted">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
          <img
            src={site.about.image}
            alt={site.about.imageAlt}
            loading="lazy"
            width={768}
            height={896}
            className="mx-auto w-40 rounded-2xl object-cover sm:w-52 md:w-full md:max-w-xs"
          />

          <div>
            <h2 className="text-2xl sm:text-3xl">{site.about.title}</h2>
            <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              {site.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Button asChild variant="link" className="mt-3 h-auto p-0 text-[15px] font-semibold">
              <a href={site.about.ctaHref} target="_blank" rel="noopener noreferrer">
                {site.about.ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* PRODUCTS & SERVICES */}
      <Section
        id="ponuda"
        title="Kako mogu da ti pomognem?"
        subtitle="Praktični materijali i podrška za svakodnevne roditeljske situacije."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* FREE RESOURCES */}
      <Section
        id="besplatno"
        tone="muted"
        title="Besplatno za vas 🎁"
        subtitle="Materijali koje možeš odmah da preuzmeš i primeniš."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {freeMaterials.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </Section>

      {/* MEDIA / TRUST */}
      <Section id="mediji" title="Gde ste me mogli videti?">
        {media.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {media.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-border bg-card p-4 text-center text-sm"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="mx-auto mb-2 h-10 object-contain"
                  />
                ) : null}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-card p-5 text-[15px] text-muted-foreground">
            Uskoro — gostovanja, podkasti i tekstovi biće dodati ovde.
          </p>
        )}
      </Section>

      {/* CONTACT & SOCIAL */}
      <Section id="kontakt" tone="muted" title="Pratimo se i tamo 👋">
        <ContactLinks />
      </Section>
    </main>
  );
}
