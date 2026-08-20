import { useState } from "react";
import { Button } from "@/components/ui/button";
import { paymentInfo } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function PaymentBlock({
  price,
  purpose,
}: {
  price?: { amount: number; currency: string } | undefined;
  purpose?: string | undefined;
}) {
  const [copied, setCopied] = useState(false);

  const rows = [
    { label: "Primalac", value: paymentInfo.recipient },
    { label: "Račun", value: paymentInfo.account },
    { label: "Banka", value: paymentInfo.bank },
    { label: "Iznos", value: price ? formatPrice(price) : "—" },
    { label: "Svrha uplate", value: purpose ?? paymentInfo.purpose },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rows.map((r) => `${r.label}: ${r.value}`).join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <dl className="divide-y divide-border text-[15px]">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-wrap justify-between gap-2 py-2">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      <Button variant="soft" size="touch" className="mt-4 w-full" onClick={copy}>
        {copied ? "Kopirano ✓" : "Kopiraj podatke"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Podaci za uplatu su privremeni dok ne budu potvrđeni.
      </p>
    </div>
  );
}
