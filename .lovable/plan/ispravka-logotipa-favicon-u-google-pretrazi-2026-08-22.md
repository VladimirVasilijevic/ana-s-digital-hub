# Ispravka logotipa (favicon) u Google pretrazi

## Problem
Fajl `public/favicon.ico` uopšte nije slika — to je HTML stranica starog Firebase sajta koja je greškom završila pod tim imenom. Kada Google (i pretraživači) pokušaju da učitaju ikonicu, dobiju nevažeći fajl, pa prikazuju sivi/generički globus umesto Aninog logotipa.

## Šta ću uraditi
1. Napraviti pravu ikonicu iz postojećeg logotipa (`src/assets/logo.png`):
   - `public/favicon.ico` (zameniti neispravni fajl)
   - `public/favicon-32x32.png`, `public/favicon-16x16.png`
   - `public/apple-touch-icon.png` (180x180)
   - `public/icon-512.png` za Google rezultate na mobilnom
2. Povezati te ikonice u `<head>` u `src/routes/__root.tsx` (icon, apple-touch-icon, sizes).
3. Dodati `Organization` JSON-LD na početnu stranicu sa poljem `logo` koje pokazuje na `https://www.ana-vaspitac.com/icon-512.png` — Google ovo koristi kao izvor logotipa u rezultatima.

## Tehnički detalji
- Ikonice se generišu skaliranjem `logo.png` na kvadratni format sa belom podlogom (Google zahteva kvadratnu ikonicu, min. 48x48, deljivu sa 48).
- Ikonice idu u `public/` da bi bile dostupne na root putanji (`/favicon.ico`), što Google traži.
- JSON-LD se dodaje u `head()` rute `src/routes/index.tsx`, pored postojećih meta tagova.

## Napomena o vremenu
Nakon objave i redeploy-a na Vercel, Google ne menja ikonicu odmah — potrebno je da ponovo obiđe (crawl) početnu stranicu, što obično traje od nekoliko dana do par nedelja. Ikonica u tabu browsera će se videti odmah.
