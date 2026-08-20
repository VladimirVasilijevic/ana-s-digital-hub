import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContent } from "@/lib/site-data";
import { formatPrice } from "@/lib/format";

function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return { copiedId, copy };
}

export function PaymentBlock({
  price,
  purpose,
}: {
  price?: { amount: number; currency: string } | undefined;
  purpose?: string | undefined;
}) {
  const { copiedId, copy } = useCopy();
  const { payment } = useGlobalContent();

  const rows = [
    { id: "primalac", label: "Primalac", value: payment?.recipient ?? "—" },
    { id: "racun", label: "Broj računa", value: payment?.account ?? "—" },
    { id: "banka", label: "Banka", value: payment?.bank ?? "—" },
    { id: "iznos", label: "Iznos", value: price ? formatPrice(price) : "—" },
    { id: "svrha", label: "Svrha uplate", value: purpose ?? "Uplata" },
  ].filter((row) => row.value && row.value !== "—" ? true : row.id === "iznos" || row.id === "svrha");

  const allText = rows.map((r) => `${r.label}: ${r.value}`).join("\n");

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
      <ul className="divide-y divide-border">
        {rows.map((row) => {
          const isCopied = copiedId === row.id;
          return (
            <li key={row.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{row.label}</p>
                <p className="truncate text-[15px] font-medium">{row.value}</p>
              </div>
              <Button
                variant="quiet"
                size="sm"
                className="h-10 shrink-0 px-3 text-xs"
                aria-label={`Kopiraj: ${row.label}`}
                onClick={() => copy(row.id, row.value)}
              >
                {isCopied ? "Kopirano ✓" : "Kopiraj"}
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="soft"
        size="touch"
        className="mt-4 w-full"
        onClick={() => copy("all", allText)}
      >
        {copiedId === "all" ? "Kopirano ✓" : "Kopiraj sve podatke"}
      </Button>
      {payment?.note ? (
        <p className="mt-3 text-xs text-muted-foreground">{payment.note}</p>
      ) : null}
    </div>
  );
}
