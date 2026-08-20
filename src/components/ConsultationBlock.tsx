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
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold">Kako da zakažeš?</h3>
        <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          {steps.map((step, index) => (
            <li key={step}>
              {index + 1}. {step}
            </li>
          ))}
        </ol>

        {consultation?.form_url ? (
          <Button asChild variant="hero" size="touchLg" className="mt-5 w-full">
            <a href={consultation.form_url} target="_blank" rel="noopener noreferrer">
              Zakaži konsultacije →
            </a>
          </Button>
        ) : null}

        <p className="mt-6 text-[15px] text-muted-foreground">Potvrdu o uplati pošalji ovde:</p>
        <div className="mt-3">
          <ContactLinks only={["whatsapp", "viber", "email", "instagram"]} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Informacije za uplatu</h3>
        <div className="mt-3">
          <PaymentBlock price={price} purpose={consultation?.title ?? "Konsultacije"} />
        </div>
      </div>
    </div>
  );
}
