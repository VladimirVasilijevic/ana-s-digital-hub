# Tehnički SEO – bez ijedne vizuelne promene

Kanonski domen: `https://www.ana-vaspitac.com` (apex se već preusmerava na www). Dizajn, raspored, boje, komponente i tokovi ostaju netaknuti — menjaju se samo metapodaci, strukturirani podaci, sitemap i robots.

## Šta se popravlja

**1. Apsolutni kanonski URL-ovi i og:url**
Trenutno su `canonical` i `og:url` relativni (`/`, `/konsultacije`, `/prirucnik/...`). Google ih tumači, ali pouzdanije je apsolutno. Uvodi se jedna deljena konstanta `SITE_URL` i koristi na svim javnim rutama: `/`, `/konsultacije`, `/prirucnik/$slug`, `/politika-privatnosti`, `/uslovi-koriscenja`.

**2. Jedinstveni naslovi i opisi**
Naslovi se usklađuju sa traženim stilom, prirodno i bez keyword stuffinga:
- Početna: `Ana Vaspitač | Saveti za roditelje, priručnici i konsultacije`
- Konsultacije: `Konsultacije za roditelje | Ana Vaspitač`
- Priručnik (dinamički, iz baze): `{naziv} | Priručnik za roditelje | Ana Vaspitač`
- Pravne stranice ostaju kakve jesu (već su jedinstvene).

**3. og:image i twitter:image**
Nijedna stranica ih trenutno nema. Dodaju se apsolutni URL-ovi:
- stranica priručnika koristi sliku tog proizvoda iz baze,
- početna i konsultacije koriste postojeći logo/hero (`/icon-512.png`).
Napomena: Facebook, Viber i WhatsApp keširaju stare preglede — osvežavaju se preko njihovog debug alata.

**4. Product JSON-LD (ispravke koje je GSC prijavio)**
- `brand` postaje `{ "@type": "Brand", "name": "Ana Vaspitač" }` (sada je `Person`).
- dodaje se `image` sa apsolutnim, javno dostupnim URL-om slike proizvoda.
- `offers` dobija `priceCurrency: "RSD"`, `availability`, `url`, i `itemCondition`/`category` samo ako su tačni.
- Ocene, recenzije, SKU, dostava i povraćaj se NE izmišljaju — ta upozorenja u GSC-u ostaju i to je ispravno za digitalni PDF.

**5. sitemap.xml**
Već postoji i dinamički vuče aktivne proizvode iz baze. Ostaje na www domenu; proverava se da ne uključuje `/admin`, `/auth` ni neaktivne proizvode i da radi kad je baza nedostupna.

**6. robots.txt**
Dodaje se `Disallow: /admin` i `Disallow: /auth` u sva postojeća pravila, uz zadržan `Sitemap:` red. Zaštita ostaje na Supabase autentikaciji — robots je samo signal za pretraživače.

**7. noindex na privatnim rutama**
`/auth` i `/admin` već imaju `noindex, nofollow`. Proverava se da ga nasleđuju i sve podrute admina.

**8. Semantika i slike**
- Provera da svaka javna stranica ima tačno jedan `H1` i logičan niz `H2`/`H3` (bez vizuelnih izmena).
- Provera `alt` tekstova, `width`/`height` i `loading="lazy"` na slikama ispod preloma; alt za proizvode u formatu `Priručnik {naziv} — Ana Vaspitač`.

**9. Buduća `/saveti` sekcija**
Ništa se ne gradi, ali se sitemap i konstanta domena postavljaju tako da dodavanje `/saveti/...` ruta kasnije traži samo novi fajl rute i jedan unos u sitemap.

## Šta se NE dira
Dizajn i stilovi, admin UI, Supabase logika i RLS, Sender popup, Vercel Analytics, postojeći URL-ovi (`/prirucnik/...` ostaje — promena na `/proizvodi/...` bi razbila već indeksirane linkove bez stvarne SEO koristi).

## Tehnički detalji
- Nova konstanta `SITE_URL` u `src/data/site.ts`, uvezena u sve `head()` blokove i u `sitemap[.]xml.ts`.
- `head()` na `/prirucnik/$slug` gradi metapodatke iz `loaderData` — novi proizvodi automatski dobijaju ispravan SEO.
- Apsolutni URL slike: postojeći `mediaUrl()` + prefiks `SITE_URL` kada vrati relativnu putanju.

## Provera pre kraja
Build prolazi, izgled stranica identičan, `/sitemap.xml` i `/robots.txt` vraćaju ispravan sadržaj, `/admin` radi i nije indeksabilan, Product JSON-LD validan, bez novih grešaka u konzoli.
