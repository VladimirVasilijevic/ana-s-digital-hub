import anaPortrait from "@/assets/ana-portrait.jpg";
import { contact } from "./contact";

export const site = {
  title: "Ana Vaspitač — praktični saveti za roditelje",
  tagline: "Vaspitačica i mama. Pretvaram iskustvo iz rada sa decom u praktične savete za roditelje.",
  description:
    "Ana Vaspitač — priručnici, konsultacije i besplatni materijali za roditelje dece do 7 godina. Jednostavni, primenljivi saveti iz svakodnevnog rada sa decom.",
  hero: {
    image: anaPortrait,
    imageAlt: "Ilustracija Ane kako radi kreativnu aktivnost sa detetom (privremena ilustracija)",
  },
  about: {
    title: "Zdravo, ja sam Ana! 👋",
    paragraphs: [
      "Vaspitačica sam i mama, i svakodnevno radim sa decom predškolskog uzrasta.",
      "Sve što naučim u radu sa decom pretvaram u kratke, primenljive savete za roditelje.",
      "Bez teorije i bez osuđivanja — samo ono što zaista pomaže u svakodnevici.",
    ],
    ctaLabel: "Saznaj više o meni →",
    ctaHref: contact.instagramUrl,
  },
} as const;
