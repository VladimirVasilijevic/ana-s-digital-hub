import { useLoaderData } from "@tanstack/react-router";
import type { ContactSettings } from "@/services/types";

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
};

/** Global content (texts, contact, payment) loaded once by the root route. */
export function useGlobalContent() {
  return useLoaderData({ from: "__root__" });
}

/** Reads an editable text with a safe fallback. */
export function text(texts: Record<string, string>, key: string, fallback = "") {
  const value = texts[key];
  return value === undefined || value === "" ? fallback : value;
}

export function buildContactChannels(contact: ContactSettings | null): ContactChannel[] {
  if (!contact) return [];
  const channels: ContactChannel[] = [];

  if (contact.instagram_url) {
    channels.push({
      id: "instagram",
      label: "Instagram",
      value: contact.instagram_handle || "Instagram",
      href: contact.instagram_url,
    });
  }
  if (contact.whatsapp_number) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: contact.phone,
      href: `https://wa.me/${contact.whatsapp_number.replace(/\D/g, "")}`,
    });
  }
  if (contact.viber_number) {
    channels.push({
      id: "viber",
      label: "Viber",
      value: contact.phone,
      href: `viber://chat?number=%2B${contact.viber_number.replace(/\D/g, "")}`,
    });
  }
  if (contact.email) {
    channels.push({ id: "email", label: "Email", value: contact.email, href: `mailto:${contact.email}` });
  }
  if (contact.facebook_url) {
    channels.push({
      id: "facebook",
      label: "Facebook",
      value: "Facebook",
      href: contact.facebook_url,
    });
  }
  if (contact.phone) {
    channels.push({
      id: "phone",
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    });
  }

  return channels;
}
