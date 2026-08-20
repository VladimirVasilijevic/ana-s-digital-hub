import { Button } from "@/components/ui/button";
import { ContactLinks } from "@/components/ContactLinks";
import { PaymentBlock } from "@/components/PaymentBlock";
import type { Consultation } from "@/services/types";

/**
 * Consultation flow: Google forma → uplata → potvrda Ani.
 * Reused on the home page section and on /konsultacije.
 */
export function ConsultationBlock({ consultation }: { consultation: Consultation | null }) {
  const steps =
    consultation?.how_it_works && consultation.how_it_works.length > 0
      ? consultation.how_it_works
      : [
          "Popuni kratku prijavu preko forme.",
          "Uplati iznos na račun.",
          "Pošalji potvrdu o uplati Ani.",
          "Ana ti javlja predlog termina.",
        ];

  const price =
    consultation?.price_amount != null
      ? { amount: consultation.price_amount, currency: consultation.price_currency }
      : undefined;

  return (
    <div>
      <h3 className="text-lg font-semibold">Kako da zakažeš?</h3>

      <ol className="mt-4 space-y-5">
        <li>
          <h4 className="text-base font-semibold">1. {steps[0]}</h4>
          {consultation?.form_url ? (
            <Button asChild variant="hero" size="touchLg" className="mt-3 w-full">
              <a href={consultation.form_url} target="_blank" rel="noopener noreferrer">
                Zakaži konsultacije →
              </a>
            </Button>
          ) : null}
        </li>

        <li>
          <h4 className="text-base font-semibold">2. Uplati iznos na račun</h4>
          <div className="mt-3">
            <PaymentBlock price={price} purpose={consultation?.title ?? "Konsultacije"} />
          </div>
        </li>

        <li>
          <h4 className="text-base font-semibold">3. Pošalji potvrdu o uplati Ani</h4>
          <div className="mt-3">
            <ContactLinks only={["whatsapp", "viber", "email", "instagram"]} />
          </div>
        </li>

        <li>
          <h4 className="text-base font-semibold">4. Ana ti javlja predlog termina</h4>
          <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
            {steps[3] ?? "Ana ti javlja predlog termina."}
          </p>
        </li>
      </ol>
    </div>
  );
}

