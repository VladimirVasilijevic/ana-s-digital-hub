import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export type Product = Tables["products"]["Row"];
export type ProductInput = Tables["products"]["Insert"];
export type Consultation = Tables["consultation"]["Row"];
export type FreeResource = Tables["free_resources"]["Row"];
export type FreeResourceInput = Tables["free_resources"]["Insert"];
export type Webinar = Tables["webinars"]["Row"];
export type WebinarInput = Tables["webinars"]["Insert"];
export type MediaAppearance = Tables["media_appearances"]["Row"];
export type MediaAppearanceInput = Tables["media_appearances"]["Insert"];
export type ContactSettings = Tables["contact_settings"]["Row"];
export type PaymentSettings = Tables["payment_settings"]["Row"];

export type Price = { amount: number; currency: string };
