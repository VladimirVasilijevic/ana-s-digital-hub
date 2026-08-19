import { Button } from "@/components/ui/button";
import type { FreeMaterial } from "@/data/free-materials";

export function ResourceCard({ resource }: { resource: FreeMaterial }) {
  return (
    <article className="fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg">
      <img
        src={resource.image}
        alt={`Ilustracija — ${resource.title}`}
        loading="lazy"
        width={1024}
        height={768}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="text-lg">{resource.title}</h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
        <Button asChild variant="quiet" size="touch" className="w-full sm:w-auto">
          <a href={resource.cta.href} target="_blank" rel="noopener noreferrer">
            {resource.cta.label}
          </a>
        </Button>
      </div>
    </article>
  );
}
