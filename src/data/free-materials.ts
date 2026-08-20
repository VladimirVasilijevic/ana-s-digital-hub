import freeGuide from "@/assets/free-guide.jpg";
import freeMaterijal from "@/assets/free-materijal.jpg";

export type FreeMaterial = {
  id: string;
  title: string;
  description: string;
  image: string;
  /** "download" renders a real download button, "link" opens an external page. */
  kind: "download" | "link";
  cta: { label: string; href: string; /** Suggested filename for downloads. */ fileName?: string };
  /** Small label shown on the card (e.g. "PDF · 8 strana"). */
  meta?: string;
  enabled: boolean;
};

export const freeMaterials: FreeMaterial[] = [
  {
    id: "besplatan-vodic",
    title: "Besplatan vodič",
    description:
      "Kratak PDF sa 5-minutnim aktivnostima koje smiruju dete i vas — bez posebnog materijala.",
    image: freeGuide,
    kind: "download",
    meta: "PDF · primer",
    cta: {
      label: "Preuzmi besplatno →",
      href: "/files/besplatan-vodic.pdf",
      fileName: "besplatan-vodic.pdf",
    },
    enabled: true,
  },
  {
    id: "besplatan-materijal",
    title: "Besplatni materijal za roditelje",
    description:
      "Radni listovi za štampu: kartice sa rečenicama i mala tabela navika za nedelju dana.",
    image: freeMaterijal,
    kind: "download",
    meta: "PDF za štampu · primer",
    cta: {
      label: "Preuzmi besplatno →",
      href: "/files/materijal-za-roditelje.pdf",
      fileName: "materijal-za-roditelje.pdf",
    },
    enabled: true,
  },
];

export const getFreeMaterials = () => freeMaterials.filter((m) => m.enabled);
