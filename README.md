# Ana's Digital Hub

# Ana Vaspitač — Instagram Landing Website

## 1. Project goal

Build a new, modern, mobile-first website for **Ana Vaspitač**.

The website will be the primary link in Ana's Instagram bio, so the main goal is **clarity and speed**.

A person coming from Instagram should understand within a few seconds:

1. Who Ana is and what she does
2. What they can buy from her
3. What free resources are available
4. Where they may have seen Ana before
5. How to contact and follow her

This should **not** feel like a traditional corporate website.

It should feel like a natural extension of Ana's Instagram profile: **warm, professional, personal, simple and easy to navigate.**

Existing website:

**https://ana-vaspitac.com**

Instagram:

**@ana_vaspitac**

Before implementing the design, inspect the existing website and Instagram presence and use them as the source of truth for the existing brand identity, visual style, logo, photography, colors, tone of voice and existing content.

Do not invent a completely different brand identity.

At the same time, do not simply copy the existing website. Reorganize and simplify the content according to the structure described below.

---

# 2. Important design principle

The website should answer five questions immediately:

### WHO?

Who is Ana and what does she do?

### WHAT?

What can I buy or book?

### FREE?

What can I get for free?

### TRUST?

Where have I seen Ana before?

### CONTACT?

How can I reach or follow Ana?

The visitor should not have to read long paragraphs to understand the website.

**Keep copy short and scannable.**

---

# 3. Visual direction

Use the existing Ana Vaspitač brand identity as the foundation.

Primary visual direction:

* White background
* Ana's existing green as the primary accent color
* Modern, clean typography
* Very readable font
* Generous whitespace
* Minimal visual clutter
* Elegant buttons
* Simple cards
* Warm but professional feeling
* Personal rather than corporate

Use the existing logo and photography from the current website where appropriate.

The green color should be derived from the existing Ana Vaspitač branding/logo rather than introducing an unrelated green.

### Avoid

* Large blocks of text
* Complex navigation
* Excessive decoration
* Excessive animations
* Corporate-looking layouts
* Large hero carousels
* Unnecessary gradients
* Too many colors
* Visual clutter
* Excessive icons
* Huge sections that require unnecessary scrolling

Use **very subtle animations only**, such as small fade/slide effects or hover states.

The design should feel calm and polished.

---

# 4. Mobile-first

Mobile is the highest priority.

Most visitors will arrive from Instagram on a phone.

Design the mobile version first.

On mobile:

* No horizontal scrolling
* Large enough touch targets
* Comfortable spacing
* Short text
* Images optimized for mobile
* Important CTAs visible immediately
* Fast loading
* Easy one-handed navigation
* Avoid unnecessarily tall sections

Desktop should be a responsive enhancement of the mobile design, not the other way around.

---

# 5. Main page structure

The homepage should have this exact high-level order:

1. Hero
2. Short About section
3. Products & Services
4. Free Resources
5. Where You May Have Seen Ana
6. Social / Contact
7. Footer

Keep the entire experience simple and scrollable.

Do not create a complicated navigation menu.

---

# 6. HERO SECTION

The first screen is extremely important.

Show:

* Ana Vaspitač logo
* Ana's photograph
* Name: **Ana Vaspitač**
* One short sentence explaining what Ana does

Use the existing wording from the current website/profile where appropriate.

Immediately below this, show the most important CTAs.

Initial CTAs:

### "Priručnik „Postavi granice bez svađe“"

This should lead to the product/sales page.

### "Konsultacije sa Anom"

This should lead to the consultation/contact flow.

### "Besplatni sadržaji"

This should scroll to the free resources section.

These buttons should be highly visible without requiring significant scrolling.

Do not add a sticky mobile CTA bar at this stage.

---

# 7. ABOUT ANA

Section title:

**Zdravo, ja sam Ana! 👋**

Keep this section short.

Use Ana's existing content as the source and rewrite/restructure it if necessary so it contains only approximately 3–4 short sentences.

The tone should be:

* warm
* personal
* approachable
* professional

It should communicate that Ana is an educator/mother who works with children and translates her knowledge and experience into practical advice for parents.

Do not make this look like a CV.

Include Ana's photograph.

Add a small CTA:

**"Saznaj više o meni →"**

For now this can link to Ana's Instagram profile / relevant existing content.

---

# 8. PRODUCTS & SERVICES

Section title:

**Kako mogu da ti pomognem?**

This is one of the most important sections.

Use a clean card-based layout.

Initial content:

## Product

### Postavi granice bez svađe

Add a short description of what the guide helps parents with.

CTA:

**Pogledaj priručnik →**

This opens a dedicated product/sales page.

## Service

### 💬 Individualne konsultacije

Add a short description.

CTA:

**Zakaži konsultacije →**

This should provide easy access to contact Ana.

Support both:

* WhatsApp
* Instagram

Do not attempt to create pre-filled Instagram DM messages.

WhatsApp may use a normal direct WhatsApp link.

---

# 9. PRODUCT ARCHITECTURE

The product system should be designed so that the current product is only the first product.

The initial product is:

**Postavi granice bez svađe**

However, the architecture should make it easy to add future:

* digital guides
* PDFs
* workshops
* webinars
* seminars
* consultations
* other digital products

Do not hard-code the entire product section around a single product.

Create a reusable product/card structure.

For the first iteration, products can be stored in a simple centralized data structure rather than a database.

For example, use a clean data layer such as:

`src/data/products`

The exact implementation is up to you.

The important requirement is:

**Do not duplicate product information throughout the application.**

The product data should have a single source of truth.

---

# 10. PRODUCT / SALES PAGE

Create a dedicated sales page for:

**Postavi granice bez svađe**

Keep it minimalist.

It should contain:

1. Product title
2. Cover image
3. Short explanation of the problem it solves
4. What the customer receives
5. Several examples of what they will learn
6. Price
7. Clear purchase CTA
8. Space for future testimonials

Do NOT create a very long sales page.

The visitor should understand the product quickly.

---

# 11. PAYMENT / ORDER FLOW

This website targets the Serbian market.

There will be **no online card payment system in the first version**.

Customers will pay by bank transfer.

After payment, Ana will manually send the PDF to the customer through an appropriate communication channel such as:

* Email
* Instagram
* WhatsApp
* Viber
* other social channels

The product page should therefore contain a very clear and visually clean explanation of how purchasing works.

Example structure:

### Kako da poručiš?

**1. Uplati iznos na račun**

Display the payment information in a clean format.

**2. Sačuvaj potvrdu o uplati**

**3. Pošalji potvrdu Ani**

Provide contact buttons:

* WhatsApp
* Viber
* Email
* Instagram

**4. Ana ti šalje PDF**

Make this process extremely easy to understand.

Include a well-formatted payment information block with:

* Recipient
* Bank account
* Amount
* Payment purpose

Use placeholder payment information for now if the real information is not available.

Include a **"Kopiraj podatke"** functionality where useful.

Do not implement payment processing yet.

---

# 12. PDF HANDLING

The PDF itself should NOT be publicly accessible from the website.

The first version should only present the product and explain the purchase process.

The actual PDF will be manually sent by Ana after payment confirmation.

However, structure the application so that PDF-based digital products can be supported in the future.

---

# 13. FREE RESOURCES

Section title:

**Besplatno za vas 🎁**

This section should contain free resources for parents.

Examples:

* Free PDF guide
* Free webinar
* Useful parenting materials
* Other future free resources

Each resource should be represented by a reusable card containing:

* Title
* Short description
* Image or simple illustration
* CTA

Examples:

**Besplatan vodič**
"Preuzmi besplatno →"

**Besplatan webinar**
"Prijavi se →"

The architecture should make it easy to add additional free resources later.

Use a centralized data structure such as:

`src/data/free-materials`

Do not hard-code individual cards directly into the page component.

---

# 14. MEDIA / TRUST SECTION

Section title:

**Gde ste me mogli videti?**

This should be a relatively small section.

The purpose is to build trust.

For the first version, use the existing available product/brand imagery or placeholders where appropriate.

Structure this as a reusable section that can later contain:

* TV appearances
* Podcasts
* Online portals
* Interviews
* Articles
* Other media appearances

Each item should support:

* Image/logo
* Name
* Link to the original appearance/article/video

Keep the visual presentation subtle.

Do not make this section dominate the page.

---

# 15. CONTACT & SOCIAL MEDIA

Near the bottom of the page:

### **Pratimo se i tamo 👋**

Provide clear links for:

* Instagram
* Facebook
* Email
* Phone
* WhatsApp
* Viber

Use recognizable icons and/or clean buttons.

The contact information should be centralized in one data structure, for example:

`src/data/contact`

This will make it easy to change contact details later.

Do not hard-code contact information in multiple components.

---

# 16. FUTURE CONTENT MANAGEMENT

The first version does NOT need a database or admin panel.

Do not introduce Supabase or another backend CMS in this iteration.

However, the architecture must make future expansion easy.

The next iteration may introduce:

* Supabase
* Email/password authentication
* Admin dashboard
* Product management
* Free resource management
* Media appearance management
* Contact information management
* Image uploads
* PDF uploads

Design the current data layer so it can later be replaced by a backend data source without rewriting the entire UI.

For example:

`UI → data/service layer → current static data`

Later:

`UI → data/service layer → Supabase`

The UI components should not depend directly on hard-coded content.

---

# 17. FUTURE ADMIN REQUIREMENTS

Do not implement this now, but keep the architecture ready for an admin panel where Ana can eventually:

### Products

* Add product
* Edit product
* Change price
* Change description
* Change image
* Change link
* Enable/disable product

### Free resources

* Add resource
* Edit resource
* Upload PDF
* Upload image
* Change link
* Enable/disable resource

### Media

* Add appearance
* Upload image/logo
* Add title
* Add URL
* Edit/remove appearance

### Contact

* Change Instagram
* Change Facebook
* Change email
* Change phone
* Change WhatsApp
* Change Viber

Future authentication should use:

**Email + password**

But do not build authentication in this first iteration.

---

# 18. FOOTER

Keep the footer minimal.

Include:

* Small Ana Vaspitač logo
* Ana Vaspitač
* Copyright
* Privacy Policy
* Terms of Use

Privacy Policy and Terms can initially be simple placeholder pages/links if the final content is not yet available.

---

# 19. SEO

Implement basic SEO from the beginning.

Include:

* Appropriate page title
* Meta description
* Semantic HTML
* Correct heading hierarchy
* Descriptive image alt text
* Open Graph metadata where appropriate
* Mobile-friendly layout
* Fast loading
* Good URL structure

The site is primarily Serbian.

Do not build multilingual functionality now.

However, do not make the architecture impossible to extend to other languages in the future.

---

# 20. Performance

Performance is important because users will arrive from Instagram on mobile networks.

Optimize:

* Image sizes
* Image formats
* Lazy loading where appropriate
* Font loading
* JavaScript bundle size
* Unnecessary dependencies

Avoid adding libraries unless they provide a real benefit.

---

# 21. Code quality / architecture

Keep the project simple.

**Do not introduce unnecessary complexity.**

Prefer:

* reusable components
* centralized content/data
* clear folder structure
* simple data models
* reusable product cards
* reusable resource cards
* reusable CTA buttons
* responsive components

Avoid:

* unnecessary state management libraries
* unnecessary backend
* unnecessary abstractions
* excessive dependencies
* complicated routing
* complicated design systems
* over-engineering

The application should be easy for another developer to understand and extend.

---

# 22. Responsive behavior

Mobile:

* Single-column layout where appropriate
* Large touch targets
* Short content
* Comfortable spacing
* Optimized images
* Clear CTAs

Tablet:

* Gradually introduce two-column layouts where useful

Desktop:

* Use whitespace generously
* Keep content width controlled
* Avoid excessively wide text blocks
* Product/resource cards can use grids
* Preserve the clean mobile-first hierarchy

---

# 23. Content rules

Use the existing website and Instagram as the primary source for real content.

Do not invent facts about Ana.

Do not invent professional qualifications, media appearances, products, testimonials or achievements.

If content is missing, use clearly marked placeholder content rather than fabricated information.

Keep text concise.

The site should feel like:

> "A parent has arrived here from Instagram and immediately understands what Ana does and what they can do next."

---

# 24. User journey

The ideal journey is:

**Instagram**

↓

**Ana Vaspitač landing page**

↓

Visitor immediately understands who Ana is

↓

Visitor chooses:

**Product** → Product page → Purchase instructions → Payment → Send confirmation → Receive PDF

OR

**Consultation** → Contact Ana

OR

**Free resources** → Free material

OR

**Social media** → Follow/contact Ana

There should be no unnecessary steps between the visitor and the action they came to perform.

---

# 25. Most important design principle

The final website should feel like a **beautiful, simplified extension of Ana's Instagram profile**, not like a large traditional website.

Think:

**Personal + warm + professional + minimal + trustworthy + easy to use.**

The visitor should understand the website in seconds.

---

# 26. Implementation priority

Prioritize the first iteration in this order:

1. Mobile-first homepage
2. Clear hero and CTAs
3. Product section
4. Product/sales page
5. Bank-transfer purchase instructions
6. Consultation/contact links
7. Free resources section
8. Media/trust section
9. Social/contact section
10. Footer
11. Responsive desktop version
12. SEO and performance
13. Clean centralized data architecture for future CMS/admin

Build the first version so it can be launched quickly.

Do not delay the launch by implementing future functionality that is not required now.

---

# 27. Final instruction

Before coding, inspect:

* `https://ana-vaspitac.com`
* Instagram profile `@ana_vaspitac`

Use them to understand the existing brand.

Then build the new website according to this specification.

**Do not simply reproduce the existing site.**

Create a cleaner, shorter, more modern and mobile-first experience while preserving Ana Vaspitač's existing visual identity and personality.

The final result should be production-quality, fast, responsive and easy to extend.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/35c1e937-66fb-455d-bbaa-08bc3470ef32).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
