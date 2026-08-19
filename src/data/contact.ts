/**
 * Single source of truth for all contact details.
 * Later this can be swapped for a backend source without touching the UI.
 */

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  enabled: boolean;
};

export const contact = {
  name: "Ana Vaspitač",
  brand: "Ručni rad — vaspitačica Ana",
  email: "kontakt@ana-vaspitac.com", // placeholder
  phone: "+381 60 000 0000", // placeholder
  whatsappNumber: "381600000000", // placeholder
  viberNumber: "381600000000", // placeholder
  instagramHandle: "@ana_vaspitac",
  instagramUrl: "https://www.instagram.com/ana_vaspitac/",
  facebookUrl: "https://www.facebook.com/", // placeholder
  location: "Beograd, Srbija",
} as const;

export const contactChannels: ContactChannel[] = [
  {
    id: "instagram",
    label: "Instagram",
    value: contact.instagramHandle,
    href: contact.instagramUrl,
    enabled: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: contact.phone,
    href: `https://wa.me/${contact.whatsappNumber}`,
    enabled: true,
  },
  {
    id: "viber",
    label: "Viber",
    value: contact.phone,
    href: `viber://chat?number=%2B${contact.viberNumber}`,
    enabled: true,
  },
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    enabled: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Ana Vaspitač",
    href: contact.facebookUrl,
    enabled: true,
  },
  {
    id: "phone",
    label: "Telefon",
    value: contact.phone,
    href: `tel:+${contact.whatsappNumber}`,
    enabled: true,
  },
];
