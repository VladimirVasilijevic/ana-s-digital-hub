import { Button } from "@/components/ui/button";
import { ContactLinks } from "@/components/ContactLinks";
import { PaymentBlock } from "@/components/PaymentBlock";
import { services } from "@/data/contact";

/**
 * Consultation flow: Google forma → uplata → potvrda Ani.
 * Reused on the home page section and on /konsultacije.
 */
export function ConsultationBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold">Kako da zakažeš?</h3>
        <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          <li>1. Popuni kratku prijavu preko forme.</li>
          <li>2. Uplati iznos na račun (podaci su desno / ispod).</li>
          <li>3. Pošalji potvrdu o uplati Ani.</li>
          <li>4. Ana ti javlja predlog termina.</li>
        </ol>

        <Button asChild variant="hero" size="touchLg" className="mt-5 w-full">
          <a href={services.consultationFormUrl} target="_blank" rel="noopener noreferrer">
            Zakaži konsultacije →
          </a>
        </Button>

        <p className="mt-6 text-[15px] text-muted-foreground">Potvrdu o uplati pošalji ovde:</p>
        <div className="mt-3">
          <ContactLinks only={["whatsapp", "viber", "email", "instagram"]} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Informacije za uplatu</h3>
        <div className="mt-3">
          <PaymentBlock
            price={services.consultationPrice}
            purpose={services.consultationPurpose}
          />
        </div>
      </div>
    </div>
  );
}
