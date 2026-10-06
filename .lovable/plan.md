# Popravka dugmeta „Pogledaj primer priručnika”

## Šta sam proverio (danas, 18:27)

- **www.ana-vaspitac.com/saradnja-vrtici**: dugme vodi na `/api/public/primer-prirucnika`, a ta adresa vraća ispravan PDF (6 strana). **Na vašem domenu sada radi.**
- **ana-link-warmth.lovable.app** (Lovable adresa): ista adresa vraća grešku „stranica ne postoji”, jer poslednje izmene još nisu objavljene (Publish) na Lovable-u.
- **Pregled u Lovable editoru**: otvaranje u novom tabu iz pregleda često traži Lovable prijavu ili pokaže praznu/grešku stranu. To nije prava slika sajta.

## Najverovatniji uzrok

1. Testirate u Lovable pregledu ili na lovable.app adresi, koja nije ažurirana, **ili**
2. Pregledač (Brave) i dalje drži staru verziju stranice sa starim linkom.

Dodatni rizik: trenutno rešenje PDF povlači sa lovable.app adrese. Ako se ta adresa ikad promeni ili ugasi, dugme na vašem domenu bi prestalo da radi.

## Koraci za vas (bez izmena koda)

1. Otvorite **https://www.ana-vaspitac.com/saradnja-vrtici** (ne Lovable pregled).
2. Osvežite stranicu bez keša: Ctrl+Shift+R (računar) ili zatvorite tab i otvorite ponovo (telefon).
3. Kliknite „Pogledaj primer priručnika” — PDF treba da se otvori u novom tabu.
4. Ako i dalje ne radi, pošaljite snimak ekrana i adresu iz adresne trake novog taba.

## Šta ću ja popraviti (da radi svuda, trajno)

- PDF primer ću smestiti direktno u sajt (pored postojećih PDF fajlova za besplatne materijale), tako da se otvara sa adrese `www.ana-vaspitac.com/files/primer-postavi-granice.pdf`.
- Dugme će voditi direktno na taj fajl, u novom tabu.
- Tako PDF više ne zavisi od lovable.app adrese i radi isto u pregledu, na lovable.app i na vašem domenu.
- Uklanjam pomoćnu adresu `/api/public/primer-prirucnika` koja više neće biti potrebna.
- Posle toga: Publish u Lovable-u, pa Vercel automatski objavi novu verziju (ili ručno Redeploy).

## Tehnički detalji

- Kopirati 6-stranični PDF u `public/files/primer-postavi-granice.pdf` (isti obrazac kao `besplatan-vodic.pdf`).
- U `src/routes/saradnja-vrtici.tsx` promeniti `href` na `/files/primer-postavi-granice.pdf`.
- Obrisati `src/routes/api/public/primer-prirucnika.ts`; ukloniti Lovable Assets pointer preko `lovable-assets delete`.
- Ažurirati pravilo u `AGENTS.md` (pregled dokumenata kao statički fajl istog domena — radi na Vercel-u bez zavisnosti od Lovable hostinga).
- Proveriti Playwright-om da link vraća `application/pdf` sa 6 strana.
