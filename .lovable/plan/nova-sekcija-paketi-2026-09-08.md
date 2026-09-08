# Nova sekcija „Paketi”

Dodajemo novu sekciju „Paketi” koja se ponaša isto kao postojeće sekcije, bez ikakvih izmena na ostatku sajta.

## Šta ćeš dobiti

- Na početnoj stranici: nova sekcija **Paketi**, odmah **pre** sekcije „Proizvodi”, sa karticama u istom stilu kao proizvodi (slika, naslov, kratak opis, cena, dugme „Saznaj više →”).
- U brzoj navigaciji na vrhu: novo dugme **Paketi**, postavljeno pre dugmeta „Proizvodi”.
- Zasebna stranica svakog paketa (`/paket/naziv-paketa`) sa istim tokom kao stranica priručnika:
  - slika, detaljan opis, „Šta dobijaš”, „Šta ćeš naučiti”
  - **spisak proizvoda koje paket sadrži**, sa linkovima ka tim proizvodima
  - cena, podaci za uplatu sa kopiranjem, koraci: uplata → sačuvaj potvrdu → pošalji potvrdu → šta sledi nakon uplate
- U admin sekciji: nova stavka **Paketi** sa listom, dodavanjem, izmenom, brisanjem, prekidačem „aktivno/neaktivno” i izborom proizvoda koje paket sadrži (čekiranje iz liste postojećih proizvoda).
- U adminu → Tekstovi: naslov i podnaslov sekcije „Paketi” i tekst dugmeta u navigaciji.

Dizajn i ponašanje su preuzeti od postojećih sekcija — ništa staro se ne menja.

## Tehnički deo

Baza (nova migracija):

- Tabela `public.bundles`: `id`, `slug` (unique), `title`, `short_description`, `detailed_description`, `image_url`, `price_amount`, `price_currency`, `includes text[]`, `learn text[]`, `purchase_instructions`, `is_active`, `created_at`, `updated_at`.
- Spojna tabela `public.bundle_products`: `bundle_id`, `product_id`, `position`, PK na paru, `ON DELETE CASCADE`.
- Za obe: `GRANT` (`anon` SELECT, `authenticated` CRUD, `service_role` ALL), RLS uključen, politike po uzoru na `products` (javno čitanje aktivnih, admin sve preko `is_admin()`), i `updated_at` triger `touch_updated_at` na `bundles`.
- Nakon migracije: regeneracija tipova baze.

Kod:

- `src/lib/content.functions.ts`: `getHomeContent` dopunjen učitavanjem aktivnih paketa; novi `getBundleBySlug` koji vraća paket + njegove proizvode.
- `src/services/bundles.ts` + tipovi u `src/services/types.ts` (CRUD za admin, uključujući upis izabranih proizvoda).
- Novi `src/components/BundleCard.tsx` (kopija stila `ProductCard`, link ka `/paket/$slug`).
- Nova ruta `src/routes/paket.$slug.tsx` po uzoru na `prirucnik.$slug.tsx`, uključujući `head()` metapodatke, JSON-LD, `notFoundComponent` i `errorComponent`; koristi `PaymentBlock` i `ContactLinks`.
- `src/routes/index.tsx`: nova `Section id="paketi"` pre `#ponuda` i novo dugme u heroju.
- Admin: `src/components/admin/BundleForm.tsx` i rute `admin.paketi.index.tsx`, `admin.paketi.novi.tsx`, `admin.paketi.$id.tsx`; stavka u admin navigaciji (`admin.tsx`) i kartica na admin pregledu.
- `admin.tekstovi.tsx`: nova grupa polja `bundles.title`, `bundles.subtitle`, `cta.bundles`.
- `src/routes/sitemap[.]xml.ts`: dodavanje `/paket/<slug>` za aktivne pakete.
