# Konsultacija kao deo paketa

Uz izbor proizvoda, u paketu će moći da se uključi i konsultacija.

## Šta ćeš dobiti

- U adminu, na formi paketa (novi i izmena), ispod spiska proizvoda: polje za čekiranje **„Uključi konsultaciju”**.
- Na stranici paketa, konsultacija se prikazuje **u istom spisku sa proizvodima** — ista kartica po izgledu (naslov, kratak opis, cena, „Saznaj više →”), sa linkom na stranicu konsultacija.
- Ako konsultacija nije uključena ili je isključena na sajtu, ne prikazuje se nigde.
- Sve ostalo ostaje nepromenjeno: cena paketa, podaci za uplatu, koraci nakon uplate, izgled sekcije „Paketi”.

## Tehnički deo

Baza (nova, aditivna migracija):

- `public.bundles`: nova kolona `include_consultation boolean NOT NULL DEFAULT false`.
- Bez izmena politika i grantova (postojeće važe za celu tabelu). Nakon migracije se regenerišu tipovi baze.

Kod:

- `src/components/admin/BundleForm.tsx`: novo polje u stanju forme i `ToggleField` „Uključi konsultaciju” ispod liste proizvoda; vrednost se šalje kroz `saveBundle`.
- `src/services/types.ts` / `src/services/bundles.ts`: bez strukturnih izmena — nova kolona dolazi kroz generisane tipove.
- `src/lib/content.functions.ts` → `getBundleBySlug`: kada je `include_consultation` tačno, dodatno učitava red iz `consultation` (samo ako je `is_active`) i vraća ga uz proizvode.
- `src/routes/paket.$slug.tsx`: konsultacija se renderuje kao poslednja kartica u istom grid-u sa proizvodima, koristeći postojeći stil kartice i link ka `/konsultacije`.
