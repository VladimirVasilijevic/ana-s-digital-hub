# Newsletter subscribe sekcija (Sender)

## Predlog: gde i kako

Pošto već imaš Sender popup, inline subscribe forma ima smisla kao stalna sekcija na početnoj strani — za posetioce koji zatvore popup ili žele da se prijave odmah.

**Mesto:** nova sekcija „Newsletter" na početnoj strani, između „Besplatno za vas" i „Webinar" (prirodno mesto: posetilac je upravo video besplatne materijale, pa je motivisan da se prijavi). Alternativa: tik iznad futera — lako se pomeri kasnije.

**Izgled:** kartica u postojećem stilu sajta (zaobljena, topla, kao ostale sekcije):
- Naslov, npr. „Prijavi se na newsletter 💌"
- Kratki tekst, npr. „Jednom nedeljno praktični saveti za roditelje — bez spama."
- Sender inline forma (polje za email + dugme) ubačena unutar kartice
- Naslov i podnaslov konfigurisani u admin „Tekstovi" kao i ostale sekcije

## Šta se radi

### U Sender-u (ručno, ti radiš)
1. U Sender nalogu: **Forms → Create form → Inline (embedded)** — ne popup, pošto popup već postoji.
2. Podesi polja (email obavezno, ime opciono), dizajn može osnovni — sajt ga uokviruje svojom karticom.
3. Kopiraj embed kod koji Sender da (mali `<div>` + `<script>` snippet).
4. Pošalji mi taj embed kod ovde u chat (ili ga nalepi u admin ako dodamo polje za to).

### U kodu (ja radim)
1. Nova komponenta `NewsletterSection` — kartica u stilu sajta sa naslovom/tekstom iz admin tekstova i ubačenim Sender embed kodom.
2. Sekcija se renderuje na početnoj samo ako je embed kod podešen (dok ne nalepiš kod, ništa se ne menja na sajtu).
3. Admin: novo polje „Newsletter embed kod" u Podešavanja (ili Tekstovi) gde nalepiš Sender snippet — čuva se u bazu, možeš ga menjati bez mene.
4. Naslov i podnaslov sekcije: nova dva ključa u admin „Tekstovi" (`newsletter.title`, `newsletter.subtitle`).
5. Admin deo `/admin` ne diramo — forma je samo na javnoj strani.

## Napomene
- Popup i inline forma mogu da rade paralelno u Sender-u; prijavljeni korisnik ne mora dva puta.
- Sender embed kod je bezbedan za čuvanje u bazi (javni snippet, bez tajni).
