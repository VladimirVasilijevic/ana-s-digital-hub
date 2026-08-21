import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { ResourceCard } from "@/components/ResourceCard";
import { ContactLinks } from "@/components/ContactLinks";
import { MediaCard } from "@/components/MediaCard";

import { site } from "@/data/site";
import { getHomeContent } from "@/lib/content.functions";
import { text, useGlobalContent } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/")({
  loader: () => getHomeContent(),
  head: () => ({
    meta: [
      { title: "Ana Vaspitač praktični saveti za roditelje" },
      { name: "description", content: site.description },
      { property: "og:title", content: "Ana Vaspitač praktični saveti za roditelje" },
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
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { products, freeResources, webinar, media, consultation } = Route.useLoaderData();
  const { texts, contact } = useGlobalContent();

  const activeWebinar = webinar && webinar.registration_url ? webinar : null;
  const webinarImage = mediaUrl(webinar?.image_url);
  const webinarDate = [webinar?.event_date, webinar?.event_time].filter(Boolean).join(" · ");

  return (
    <main>
      {/* HERO */}
      <section className="px-5 pb-12 pt-8 sm:pt-12">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="fade-up flex flex-col items-center text-center md:items-start md:text-left">
            <img src={logo} alt="Ručni rad — vaspitačica Ana, logo" width={96} height={96} className="h-16 w-16" />
            <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">
              {text(texts, "hero.name", "Ana Vaspitač")} praktični saveti za roditelje
            </h1>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">
              {text(texts, "hero.tagline", site.tagline)}
            </p>

            <nav
              aria-label="Brza navigacija"
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start"
            >
              <Button asChild variant="hero" size="touchLg" className="w-full sm:w-auto">
                <a href="#ponuda">{text(texts, "cta.products", "Proizvodi")}</a>
              </Button>
              <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
                <a href="#konsultacije">{text(texts, "cta.consultations", "Konsultacije")}</a>
              </Button>
              <Button asChild variant="soft" size="touchLg" className="w-full sm:w-auto">
                <a href="#besplatno">{text(texts, "cta.free", "Besplatni sadržaj")}</a>
              </Button>
              <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
                <a href="#webinar">{text(texts, "cta.webinar", "Webinar")}</a>
              </Button>
              <Button asChild variant="quiet" size="touchLg" className="w-full sm:w-auto">
                <a href="#mediji">{text(texts, "cta.media", "Gde ste me mogli videti?")}</a>
              </Button>
            </nav>
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
            src={mediaUrl(text(texts, "about.image")) ?? site.about.image}
            alt={site.about.imageAlt}
            loading="lazy"
            width={768}
            height={896}
            className="mx-auto w-40 rounded-2xl object-cover sm:w-52 md:w-full md:max-w-xs"
          />

          <div>
            <h2 className="text-2xl sm:text-3xl">{text(texts, "about.title", site.about.title)}</h2>
            <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              {text(texts, "about.text", site.about.paragraphs.join("\n"))
                .split("\n")
                .filter(Boolean)
                .map((p) => (
                  <p key={p}>{p}</p>
                ))}
            </div>
            {contact?.instagram_url ? (
              <Button asChild variant="link" className="mt-3 h-auto p-0 text-[15px] font-semibold">
                <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer">
                  {site.about.ctaLabel}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </Section>

      {/* PRODUCTS & SERVICES */}
      <Section
        id="ponuda"
        title={text(texts, "products.title", "Kako mogu da ti pomognem?")}
        subtitle={text(
          texts,
          "products.subtitle",
          "Praktični materijali i podrška za svakodnevne roditeljske situacije.",
        )}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* CONSULTATIONS */}
      <Section
        id="konsultacije"
        tone="muted"
        title={text(texts, "consultations.title", "💬 Individualne konsultacije")}
        subtitle={
          consultation?.short_description ?? "Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom."
        }
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Zajedno pravimo plan koji možeš da primeniš odmah. Na stranici konsultacija su svi detalji: kako izgleda
            razgovor, cena, prijava preko forme i podaci za uplatu.
          </p>
          <Button asChild variant="hero" size="touch" className="mt-4 w-full sm:w-auto">
            <Link to="/konsultacije">Saznaj više →</Link>
          </Button>
        </div>
      </Section>

      {/* FREE RESOURCES */}
      <Section
        id="besplatno"
        title={text(texts, "free.title", "Besplatno za vas 🎁")}
        subtitle={text(texts, "free.subtitle", "Materijali koje možeš odmah da preuzmeš i primeniš.")}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {freeResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </Section>

      {/* WEBINAR */}
      <Section
        id="webinar"
        tone="muted"
        title={text(texts, "webinar.title", "Webinar")}
        {...(activeWebinar ? { subtitle: activeWebinar.description } : {})}
      >
        {activeWebinar ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {webinarImage ? (
              <img
                src={webinarImage}
                alt={`Ilustracija — ${activeWebinar.title}`}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/7]"
              />
            ) : null}
            <div className="p-5">
              <h3 className="text-lg font-semibold">{activeWebinar.title}</h3>
              {webinarDate ? <p className="mt-1 text-[15px] text-muted-foreground">{webinarDate}</p> : null}
              <Button asChild variant="hero" size="touchLg" className="mt-4 w-full sm:w-auto">
                <a href={activeWebinar.registration_url!} target="_blank" rel="noopener noreferrer">
                  Prijavi se →
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-5">
            <p className="text-[15px] font-medium">Trenutno nema aktivnih webinara.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Pratite Anu na Instagramu kako biste saznali kada bude najavljen novi webinar.
            </p>
            {contact?.instagram_url ? (
              <Button asChild variant="soft" size="touch" className="mt-4 w-full sm:w-auto">
                <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer">
                  Prati na Instagramu →
                </a>
              </Button>
            ) : null}
          </div>
        )}
      </Section>

      {/* MEDIA / TRUST */}
      <Section
        id="mediji"
        title={text(texts, "media.title", "Gde ste me mogli videti?")}
        subtitle={text(texts, "media.subtitle", "Gostovanja i razgovori — klik otvara video.")}
      >
        {media.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <li key={item.id} className="h-full">
                <MediaCard item={item} />
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
      <Section id="kontakt" tone="muted" title={text(texts, "contact.title", "Pratimo se i tamo 👋")}>
        <ContactLinks />
      </Section>
    </main>
  );
}
