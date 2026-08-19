import freeGuide from "@/assets/free-guide.jpg";
import freeWebinar from "@/assets/free-webinar.jpg";
import { contact } from "./contact";

export type FreeMaterial = {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
  enabled: boolean;
};

export const freeMaterials: FreeMaterial[] = [
  {
    id: "besplatan-vodic",
    title: "Besplatan vodič",
    description:
      "Kratak PDF sa 5-minutnim aktivnostima koje smiruju dete i vas — bez posebnog materijala.",
    image: freeGuide,
    cta: { label: "Preuzmi besplatno →", href: contact.instagramUrl },
    enabled: true,
  },
  {
    id: "besplatan-webinar",
    title: "Besplatan webinar",
    description:
      "Online druženje za roditelje: pitanja, odgovori i konkretni primeri iz svakodnevice.",
    image: freeWebinar,
    cta: { label: "Prijavi se →", href: `mailto:${contact.email}?subject=Prijava%20za%20webinar` },
    enabled: true,
  },
];

export const getFreeMaterials = () => freeMaterials.filter((m) => m.enabled);
