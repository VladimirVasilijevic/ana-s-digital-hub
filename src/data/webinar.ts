/**
 * Webinar state. Kada Ana ima aktivan webinar, samo postavi `active: true`
 * i dodaj `registrationUrl` — UI se ne menja.
 */
export type Webinar = {
  title: string;
  description: string;
  /** Prijava (Google forma, Instagram post, event stranica…). */
  registrationUrl?: string;
  /** Npr. "12. septembar, 20h · online". */
  when?: string;
  active: boolean;
};

export const webinar: Webinar = {
  title: "Webinar za roditelje",
  description:
    "Online druženje uživo: pitanja, odgovori i konkretni primeri iz svakodnevice sa decom do 7 godina.",
  active: false,
};

export const getActiveWebinar = () =>
  webinar.active && webinar.registrationUrl ? webinar : null;
