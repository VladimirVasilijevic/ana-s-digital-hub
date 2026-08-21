# Ukloniti crticu iz naslova na početnoj stranici

## Zašto se to dešava

Naslov u meta podacima glasi "Ana Vaspitač praktični saveti za roditelje", ali vidljivi naslov (H1) na početnoj stranici je sastavljen iz dva dela: imena iz admin teksta `hero.name` i fiksnog dodatka " — praktični saveti za roditelje". Ta crtica je upisana direktno u kod, zato je i dalje vidiš.

## Izmena

- U `src/routes/index.tsx` (H1, linija 59) ukloniti crticu tako da glasi: `{hero.name} praktični saveti za roditelje`.

Ako želiš da ceo naslov bude izmenjiv iz admina (Tekstovi), mogu umesto toga da uvedem jedan tekstualni ključ za ceo H1 — reci ako to više odgovara.

## Napomena

Google prikazuje keširanu verziju naslova; posle objave i novog deploya može proći nekoliko dana dok se rezultat pretrage ne osveži.
