-- helpers
CREATE TABLE public.admin_emails (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_emails TO authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email) VALUES ('andjelkovski.ana5@gmail.com');

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

CREATE POLICY "admins read admin emails" ON public.admin_emails
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  detailed_description text NOT NULL DEFAULT '',
  image_url text,
  price_amount integer,
  price_currency text NOT NULL DEFAULT 'RSD',
  includes text[] NOT NULL DEFAULT '{}',
  learn text[] NOT NULL DEFAULT '{}',
  purchase_instructions text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active products" ON public.products FOR SELECT TO anon, authenticated USING (is_active OR public.is_admin());
CREATE POLICY "admin writes products" ON public.products FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- consultation (singleton)
CREATE TABLE public.consultation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  detailed_description text NOT NULL DEFAULT '',
  includes text[] NOT NULL DEFAULT '{}',
  how_it_works text[] NOT NULL DEFAULT '{}',
  price_amount integer,
  price_currency text NOT NULL DEFAULT 'RSD',
  form_url text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultation TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultation TO authenticated;
GRANT ALL ON public.consultation TO service_role;
ALTER TABLE public.consultation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads consultation" ON public.consultation FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin writes consultation" ON public.consultation FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER consultation_touch BEFORE UPDATE ON public.consultation FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- free resources
CREATE TABLE public.free_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  meta text,
  image_url text,
  file_url text,
  external_url text,
  cta_label text NOT NULL DEFAULT 'Preuzmi besplatno →',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.free_resources TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.free_resources TO authenticated;
GRANT ALL ON public.free_resources TO service_role;
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active free resources" ON public.free_resources FOR SELECT TO anon, authenticated USING (is_active OR public.is_admin());
CREATE POLICY "admin writes free resources" ON public.free_resources FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER free_resources_touch BEFORE UPDATE ON public.free_resources FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- webinars
CREATE TABLE public.webinars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  event_date text,
  event_time text,
  image_url text,
  registration_url text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.webinars TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.webinars TO authenticated;
GRANT ALL ON public.webinars TO service_role;
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active webinars" ON public.webinars FOR SELECT TO anon, authenticated USING (is_active OR public.is_admin());
CREATE POLICY "admin writes webinars" ON public.webinars FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER webinars_touch BEFORE UPDATE ON public.webinars FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- media appearances
CREATE TABLE public.media_appearances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  source text,
  image_url text,
  url text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_appearances TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_appearances TO authenticated;
GRANT ALL ON public.media_appearances TO service_role;
ALTER TABLE public.media_appearances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active media" ON public.media_appearances FOR SELECT TO anon, authenticated USING (is_active OR public.is_admin());
CREATE POLICY "admin writes media" ON public.media_appearances FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER media_touch BEFORE UPDATE ON public.media_appearances FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- contact settings (singleton)
CREATE TABLE public.contact_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  whatsapp_number text NOT NULL DEFAULT '',
  viber_number text NOT NULL DEFAULT '',
  instagram_handle text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.contact_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_settings TO authenticated;
GRANT ALL ON public.contact_settings TO service_role;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads contact settings" ON public.contact_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin writes contact settings" ON public.contact_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER contact_settings_touch BEFORE UPDATE ON public.contact_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- payment settings (singleton)
CREATE TABLE public.payment_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL DEFAULT '',
  account text NOT NULL DEFAULT '',
  bank text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_settings TO authenticated;
GRANT ALL ON public.payment_settings TO service_role;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads payment settings" ON public.payment_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin writes payment settings" ON public.payment_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER payment_settings_touch BEFORE UPDATE ON public.payment_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- site content key/value
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin writes site content" ON public.site_content FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- seed: products
INSERT INTO public.products (slug, title, short_description, detailed_description, image_url, price_amount, includes, learn, created_at)
VALUES
('postavi-granice-bez-svadje', 'Postavi granice bez svađe',
 'Priručnik u PDF-u sa konkretnim rečenicama i koracima za postavljanje granica bez vike, pretnji i ucena.',
 '<p>Svaki dan iste borbe oko oblačenja, ekrana i spavanja? Granice su potrebne i tebi i detetu — samo im treba jasan, miran okvir.</p>',
 'asset:product-granice', 1490,
 ARRAY['PDF priručnik koji čitaš na telefonu ili štampaš','Gotove rečenice koje možeš odmah da koristiš','Primeri za svakodnevne situacije (obroci, ekrani, spavanje)','Kratke vežbe za roditelje'],
 ARRAY['Kako da postaviš granicu bez podizanja glasa','Šta da radiš kada dete kaže „neću“','Kako da ostaneš dosledna/dosledan kada je teško','Kako da razlikuješ granicu od kazne','Kako da smiriš situaciju posle burne reakcije'],
 now() - interval '2 days'),
('5-minuta-igre', '5 minuta igre',
 'Kratke ideje za igru koje staju u pet minuta — za dane kada nema vremena, a povezanost je potrebna.',
 '<p>Dan prođe u obavezama i uveče ostane osećaj da niste stigli da se stvarno igrate. Pet minuta pune pažnje je dovoljno da dete oseti da ste tu.</p>',
 'asset:product-igra', 990,
 ARRAY['PDF sa idejama za igru od pet minuta','Aktivnosti bez posebnog materijala','Predlozi za jutro, popodne i pred spavanje'],
 ARRAY['Kako da se povežeš sa detetom i kada je dan pretrpan','Kako da igra ostane kratka, a da ipak „radi“','Šta da radiš kada dete ne želi da prekine igru'],
 now() - interval '1 day');

-- seed: consultation
INSERT INTO public.consultation (title, short_description, detailed_description, includes, how_it_works, price_amount, form_url)
VALUES ('💬 Individualne konsultacije',
 'Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom.',
 'Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom. Zajedno pravimo plan koji možeš da primeniš odmah, u svojoj svakodnevici — bez opštih saveta.',
 ARRAY['Razgovor o konkretnoj situaciji, ne o teoriji','Pitanja koja pomažu da se vidi šta je iza ponašanja deteta','Predlog koraka koje možeš da probaš već isti dan','Prostor za tvoja pitanja i nedoumice'],
 ARRAY['Online razgovor (video poziv) ili telefonom, po dogovoru.','Termin se dogovara nakon prijave i uplate.','Posle razgovora dobijaš kratak podsetnik sa dogovorenim koracima.'],
 3500, 'https://docs.google.com/forms/d/e/EXAMPLE-CONSULTATION/viewform');

-- seed: free resources
INSERT INTO public.free_resources (title, description, meta, image_url, file_url, cta_label, created_at)
VALUES
('Besplatan vodič','Kratak PDF sa 5-minutnim aktivnostima koje smiruju dete i vas — bez posebnog materijala.','PDF · primer','asset:free-guide','/files/besplatan-vodic.pdf','Preuzmi besplatno →', now() - interval '2 days'),
('Besplatni materijal za roditelje','Radni listovi za štampu: kartice sa rečenicama i mala tabela navika za nedelju dana.','PDF za štampu · primer','asset:free-materijal','/files/materijal-za-roditelje.pdf','Preuzmi besplatno →', now() - interval '1 day');

-- seed: media
INSERT INTO public.media_appearances (title, description, source, image_url, url, created_at)
VALUES
('„Tehnologija kao alat, ne kao bebisiterka“','Razgovor o ekranima, granicama i roditeljstvu bez osuđivanja.','Riđa izvrtica','https://i.ytimg.com/vi/oNq5jxuZudE/hqdefault.jpg','https://www.youtube.com/watch?v=oNq5jxuZudE', now() - interval '3 days'),
('Primer: gostovanje u podkastu','Placeholder — zameni pravim YouTube linkom kada bude potvrđen.','Primer kartice','https://i.ytimg.com/vi/oNq5jxuZudE/hqdefault.jpg','https://www.youtube.com/watch?v=oNq5jxuZudE', now() - interval '2 days'),
('Primer: TV/YouTube emisija','Placeholder — zameni pravim YouTube linkom kada bude potvrđen.','Primer kartice','https://i.ytimg.com/vi/oNq5jxuZudE/hqdefault.jpg','https://www.youtube.com/watch?v=oNq5jxuZudE', now() - interval '1 day');

-- seed: settings
INSERT INTO public.contact_settings (email, phone, whatsapp_number, viber_number, instagram_handle, instagram_url, facebook_url, location)
VALUES ('kontakt@ana-vaspitac.com','+381 60 000 0000','381600000000','381600000000','@ana_vaspitac','https://www.instagram.com/ana_vaspitac/','https://www.facebook.com/','Beograd, Srbija');

INSERT INTO public.payment_settings (recipient, account, bank, note)
VALUES ('Ana Vaspitač','205-0000000000000-00','Banka (placeholder)','Podaci za uplatu su privremeni dok ne budu potvrđeni.');

-- seed: site content
INSERT INTO public.site_content (key, value) VALUES
('hero.name','Ana Vaspitač'),
('hero.tagline','Vaspitačica i mama. Pretvaram iskustvo iz rada sa decom u praktične savete za roditelje.'),
('cta.products','Proizvodi'),
('cta.consultations','Konsultacije'),
('cta.free','Besplatni sadržaj'),
('cta.webinar','Webinar'),
('cta.media','Gde ste me mogli videti?'),
('about.title','Zdravo, ja sam Ana! 👋'),
('about.text','Vaspitačica sam i mama, i svakodnevno radim sa decom predškolskog uzrasta.
Sve što naučim u radu sa decom pretvaram u kratke, primenljive savete za roditelje.
Bez teorije i bez osuđivanja — samo ono što zaista pomaže u svakodnevici.'),
('about.cta_label','Saznaj više o meni →'),
('about.cta_url','https://www.instagram.com/ana_vaspitac/'),
('products.title','Kako mogu da ti pomognem?'),
('products.subtitle','Praktični materijali i podrška za svakodnevne roditeljske situacije.'),
('consultations.title','💬 Individualne konsultacije'),
('consultations.subtitle','Razgovor jedan na jedan o konkretnoj situaciji sa tvojim detetom.'),
('consultations.card_text','Zajedno pravimo plan koji možeš da primeniš odmah. Na stranici konsultacija su svi detalji: kako izgleda razgovor, cena, prijava preko forme i podaci za uplatu.'),
('consultations.cta_label','Saznaj više →'),
('free.title','Besplatno za vas 🎁'),
('free.subtitle','Materijali koje možeš odmah da preuzmeš i primeniš.'),
('webinar.title','Webinar'),
('webinar.empty_title','Trenutno nema aktivnih webinara.'),
('webinar.empty_text','Pratite Anu na Instagramu kako biste saznali kada bude najavljen novi webinar.'),
('webinar.empty_cta','Prati na Instagramu →'),
('webinar.register_label','Prijavi se →'),
('media.title','Gde ste me mogli videti?'),
('media.subtitle','Gostovanja i razgovori — klik otvara video na YouTube-u.'),
('contact.title','Pratimo se i tamo 👋'),
('contact.subtitle',''),
('footer.text','Ana Vaspitač'),
('footer.copyright','Sva prava zadržana.');