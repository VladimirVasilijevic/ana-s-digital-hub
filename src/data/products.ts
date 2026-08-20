import productGranice from "@/assets/product-granice.jpg";

/**
 * Product catalogue. Add new digital guides, workshops, webinars or
 * services here — the UI renders whatever is enabled.
 */

export type ProductKind = "pdf" | "workshop" | "webinar" | "consultation";

export type Product = {
  slug: string;
  kind: ProductKind;
  emoji?: string;
  title: string;
  shortDescription: string;
  /** Problem the product solves — shown on the sales page. */
  problem?: string;
  /** What the customer receives. */
  includes?: string[];
  /** Examples of what they will learn. */
  learn?: string[];
  price?: { amount: number; currency: string };
  image?: string;
  /** Internal sales page slug, or external/contact CTA. */
  cta: { label: string; to?: string; href?: string };
  /** Digital file delivered manually after payment (never public). */
  deliveredManually?: boolean;
  testimonials?: { name: string; text: string }[];
  enabled: boolean;
};

export const products: Product[] = [
  {
    slug: "postavi-granice-bez-svadje",
    kind: "pdf",
    title: "Postavi granice bez svađe",
    shortDescription:
      "Priručnik u PDF-u sa konkretnim rečenicama i koracima za postavljanje granica bez vike, pretnji i ucena.",
    problem:
      "Svaki dan iste borbe oko oblačenja, ekrana i spavanja? Granice su potrebne i tebi i detetu — samo im treba jasan, miran okvir.",
    includes: [
      "PDF priručnik koji čitaš na telefonu ili štampaš",
      "Gotove rečenice koje možeš odmah da koristiš",
      "Primeri za svakodnevne situacije (obroci, ekrani, spavanje)",
      "Kratke vežbe za roditelje",
    ],
    learn: [
      "Kako da postaviš granicu bez podizanja glasa",
      "Šta da radiš kada dete kaže „neću“",
      "Kako da ostaneš dosledna/dosledan kada je teško",
      "Kako da razlikuješ granicu od kazne",
      "Kako da smiriš situaciju posle burne reakcije",
    ],
    price: { amount: 1490, currency: "RSD" },
    image: productGranice,
    cta: { label: "Pogledaj priručnik →", to: "/prirucnik/postavi-granice-bez-svadje" },

    deliveredManually: true,
    testimonials: [],
    enabled: true,
  },
  {
    slug: "individualne-konsultacije",
    kind: "consultation",
    emoji: "💬",
    title: "Individualne konsultacije",
    shortDescription:
      "Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom i praktični koraci koje možeš odmah da primeniš.",
    cta: { label: "Zakaži konsultacije →", to: "/konsultacije" },
    enabled: true,
  },
];

export const getProducts = () => products.filter((p) => p.enabled);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug && p.enabled);

/** Payment details for bank transfer (placeholder until confirmed). */
export const paymentInfo = {
  recipient: "Ana Vaspitač",
  account: "205-0000000000000-00", // placeholder
  bank: "Banka (placeholder)",
  purpose: "Priručnik — Postavi granice bez svađe",
};
