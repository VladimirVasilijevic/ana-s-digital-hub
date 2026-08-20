import type { MediaAppearance } from "@/data/media";

export function MediaCard({ item }: { item: MediaAppearance }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="fade-up group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={`Naslovna slika — ${item.title}`}
          loading="lazy"
          width={480}
          height={360}
          className="aspect-video w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-11 w-16 items-center justify-center rounded-xl bg-card/90 shadow-soft transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          YouTube{item.source ? ` · ${item.source}` : ""}
        </p>
        <h3 className="text-base leading-snug group-hover:text-primary">{item.title}</h3>
        {item.note ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        ) : null}
      </div>
    </a>
  );
}
