import { Button } from "@/components/ui/button";
import { buildContactChannels, useGlobalContent } from "@/lib/site-data";

export function ContactLinks({
  only,
  variant = "quiet",
}: {
  only?: string[];
  variant?: "quiet" | "soft" | "hero";
}) {
  const { contact } = useGlobalContent();
  const channels = buildContactChannels(contact).filter((c) => !only || only.includes(c.id));

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {channels.map((channel) => (
        <li key={channel.id}>
          <Button asChild variant={variant} size="touch" className="w-full justify-between">
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <span>{channel.label}</span>
              <span className="text-sm font-normal text-muted-foreground">{channel.value}</span>
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}
