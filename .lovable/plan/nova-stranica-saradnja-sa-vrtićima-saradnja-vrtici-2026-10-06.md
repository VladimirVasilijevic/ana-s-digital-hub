# Nova stranica „Saradnja sa vrtićima" (/saradnja-vrtici)

B2B stranica za direktore vrtića, po detaljnoj specifikaciji iz priloženog dokumenta. Bez redizajna postojećeg sajta — samo dodavanje.

## Šta se dodaje

### 1. Nova ruta: `src/routes/saradnja-vrtici.tsx`

Jedna samostalna stranica sa 13 sekcija iz specifikacije, redosledom:

1. **Hero** — naslov „Praktična podrška roditeljima — kroz vaš vrtić.", podnaslov, CTA „Želim da saznam više" (smooth scroll na sekciju 3, `#paket`) i „Zakaži razgovor" (scroll na finalni CTA, `#kontakt-cta`). Ispod CTA dugmadi red: „Mesečni roditeljski paket · Digitalni priručnici · Jednostavna implementacija".
2. **Ko stoji iza priručnika?** — tekst o Ani + istaknuti citat „Dobro, a šta sada da uradim?", CTA „Pogledaj Ana Vaspitač" → `/`. Koristi postojeću sliku `ana-about.jpg`.
3. **Šta je mesečni roditeljski paket?** (`id="paket"`) — objašnjenje + proces „SVAKOG MESECA" 01–04 (horizontalno na desktopu, vertikalno na mobilnom).
4. **Teme** — 5 kartica (Granice, Emocije, Samostalnost, Rutine, Adaptacija) + napomena da su teme primeri.
5. **Šta roditelj dobija?** — 4 prednosti sa ✓ + zatvarajuća rečenica.
6. **Šta vrtić dobija?** — naglašena poruka „Praktična podrška roditeljima bez dodatnog opterećenja za vaš tim." + 4 jednake kartice (Dodatna vrednost za roditelje, Dodatni prihod, Bez kreiranja sadržaja, Jednostavnu implementaciju). „Dodatni prihod" NE ističe se vizuelno.
7. **Kako funkcioniše?** — 4-korakovna vertikalna/horizontalna vremenska linija (Dogovor → Preporuka → Prijava → Priručnik) + rečenica da vrtić ne kreira sadržaj.
8. **Cena i model saradnje** — 1.000 RSD mesečno po roditelju, raspodela 600/400 RSD manje istaknuta. Bez agresivne prodajne terminologije.
9. **Konkretan primer** — samo tri statična primera: 20 × 400 = 8.000, 50 × 400 = 20.000, 100 × 400 = 40.000 RSD + informativna napomena. Bez kalkulatora (odluka korisnika).
10. **Zašto ovaj model?** — editorial ton, lista situacija (Granice. Velike emocije. Odbijanje. Rutine. Samostalnost. Adaptacija.).
11. **Kako izgleda jedan priručnik?** — prikaz postojećeg priručnika „Postavi granice bez svađe" sa realnom slikom `product-granice.jpg` (telefon/dokument mockup, ne otkriva plaćeni PDF). CTA „Pogledaj primere priručnika" → postojeća stranica priručnika `/prirucnik/postavi-granice-bez-svade`.
12. **FAQ** — 6 pitanja iz specifikacije u pristupačnom akordeonu (postojeći shadcn Accordion ako postoji u `src/components/ui/`, inače native `details/summary`).
13. **Finalni CTA** (`id="kontakt-cta"`) — naslov „Da li bi ovakav vid podrške bio koristan roditeljima vašeg vrtića?", primarni CTA „Zakaži kratak razgovor" → `mailto:kontakt@ana-vaspitac.com`, sekundarni „Pošalji upit" → isti email (odluka korisnika: email direktno). Ispod: Ana Vasilijević, Master vaspitač, Ana Vaspitač, ana-vaspitac.com, Instagram @ana_vaspitac (podaci iz postojećeg centralnog `contact` izvora preko `useGlobalContent`).

### 2. SEO i head

- `head()` na ruti: title „Saradnja sa vrtićima | Ana Vaspitač", opis po specifikaciji, og:title/og:description, og:type website, twitter:card, canonical `https://www.ana-vaspitac.com/saradnja-vrtici`.
- Jedan H1 (hero naslov), semantički redosled naslova.

### 3. Početna stranica — teaser sekcija i navigacija (odluka korisnika)

- U hero brzu navigaciju dodato dugme **„Saradnja sa vrtićima"** → `<a href="#saradnja">` (smooth scroll, isto ponašanje kao ostala dugmad).
- Nova kratka teaser sekcija `id="saradnja"` na početnoj (pre kontakt sekcije): kratak opis ponude za vrtiće (2–3 rečenice, glavna poruka „Dajete roditeljima praktičnu podršku bez dodatnog opterećenja za vaš tim.") + dugme **„Saznaj više"** → `Link` na `/saradnja-vrtici`.
- Dizajn identičan postojećim sekcijama početne (ista `Section` kartica/ton).

### 4. Sitemap

- `src/routes/sitemap[.]xml.ts`: dodati statičan unos `/saradnja-vrtici` (changefreq monthly, priority 0.7).

## Šta se koristi postojeće

- `Section`, `Button`, `SiteHeader`, `SiteFooter`, `ContactLinks` (po potrebi) — bez izmena.
- Tipografija, boje, radius i razmaci iz postojećeg `src/styles.css` (bez novih boja/gradijenata).
- Slike: `ana-about.jpg`, `product-granice.jpg`, `logo.png` — postojeći asseti, lazy-load ispod folda.
- Kontakt podaci iz centralnog izvora (`site-data` / `contact`), ne duplicirani.
- Bez novih biblioteka. Bez admin/CMS izmena — tekstovi su statični po specifikaciji (zadržano doslovno wording, srpska latinična slova č ć š ž đ).

## Pravila

- Ne diraju se postojeće stranice, proizvodi, cene, rute (osim opisanih dodataka na početnoj i sitemap-u).
- Bez lažnih svedočanstava, statistika, partnera, countdown-a, popup-a.
- Ne izlaže se sadržaj plaćenog PDF-a.
- Mobile-first, bez horizontalnog skrolovanja, dostupnost (semantika, fokus stanja, tastatura za FAQ).

## Verifikacija

- `/saradnja-vrtici` učitava se direktno i osvežavanje radi.
- Početna i ostale rute rade; oba hero CTA rada; „Saznaj više" vodi na novu stranicu.
- Mobile 360px bez overflow-a (Playwright screenshot).
- Računice tačne: 20×400=8.000, 50×400=20.000, 100×400=40.000.
- Build prolazi; sitemap sadrži novu stranicu.
